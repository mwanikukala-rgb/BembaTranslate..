import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  RefreshCw,
  Route,
  Search,
  X,
} from "lucide-react";
import {
  clearLocationWatch,
  getCurrentLocation,
  watchLocation,
  type GPSLocation,
  type GPSWatchId,
} from "./gps";
import { zambiaOfflineMap } from "./mapData";

type NavigationProps = { onBack?: () => void };

const ZAMBIA_CENTER: [number, number] = [27.85, -13.13];

/*
 * OpenFreeMap vector map.
 * No API key or billing is required.
 *
 * Destination search uses OpenStreetMap Nominatim and road routing uses
 * the public OSRM service. The existing map remains unchanged.
 */
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

type Destination = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type?: string;
  source: "local" | "search";
};

type RoadRoute = {
  coordinates: [number, number][];
  distance: number;
  duration: number;
};

const coords = (destination: Destination): [number, number] => [
  destination.longitude,
  destination.latitude,
];

export default function Navigation({ onBack }: NavigationProps) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const userMarker = useRef<Marker | null>(null);
  const destinationMarker = useRef<Marker | null>(null);
  const watchRef = useRef<GPSWatchId | null>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchAbortRef = useRef<AbortController | null>(null);

  const [location, setLocation] = useState<GPSLocation | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [route, setRoute] = useState<RoadRoute | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routing, setRouting] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState("");

  const nodes = zambiaOfflineMap.nodes;

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapEl.current,
      style: MAP_STYLE,
      center: ZAMBIA_CENTER,
      zoom: 5.4,
      minZoom: 3,
      maxZoom: 19,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      "top-right",
    );

    map.on("load", () => {
      map.addSource("bemba-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [] },
        },
      });

      map.addLayer({
        id: "bemba-route-line",
        type: "line",
        source: "bemba-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#d4af5a",
          "line-width": 5,
          "line-opacity": 0.92,
        },
      });

      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      searchAbortRef.current?.abort();
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      userMarker.current?.remove();
      destinationMarker.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !location) return;

    const lngLat: [number, number] = [location.longitude, location.latitude];

    if (!userMarker.current) {
      const el = document.createElement("div");
      el.className = "real-map-user-marker";
      el.innerHTML =
        `<span class="real-map-user-pulse"></span><span class="real-map-user-dot"></span>`;
      userMarker.current = new maplibregl.Marker({ element: el })
        .setLngLat(lngLat)
        .addTo(map);
    } else {
      userMarker.current.setLngLat(lngLat);
    }

    if (tracking) {
      map.easeTo({
        center: lngLat,
        duration: 450,
        essential: true,
      });
    }
  }, [location, tracking, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    destinationMarker.current?.remove();
    destinationMarker.current = null;

    if (!destination) return;

    const el = document.createElement("div");
    el.className = "real-map-destination-marker";
    el.innerHTML =
      `<span class="real-map-destination-pin"><span></span></span>`;

    destinationMarker.current = new maplibregl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(coords(destination))
      .setPopup(
        new maplibregl.Popup({
          offset: 18,
          closeButton: false,
        }).setText(destination.name),
      )
      .addTo(map);
  }, [destination, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const source = map.getSource("bemba-route") as GeoJSONSource | undefined;
    if (!source) return;

    const line = route?.coordinates ?? [];

    source.setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: line,
      },
    });

    if (line.length > 1) {
      const bounds = line.reduce(
        (b, c) => b.extend(c),
        new maplibregl.LngLatBounds(line[0], line[0]),
      );

      map.fitBounds(bounds, {
        padding: { top: 110, bottom: 160, left: 35, right: 35 },
        maxZoom: 15,
        duration: 600,
      });
    }
  }, [route, mapReady]);

  const locateUser = async () => {
    setLoading(true);
    setError("");

    try {
      const current = await getCurrentLocation();
      setLocation(current);

      mapRef.current?.easeTo({
        center: [current.longitude, current.latitude],
        zoom: 15,
        duration: 650,
        essential: true,
      });

      if (destination) {
        await calculateRoadRoute(destination, current);
      }
    } catch {
      setError(
        "Unable to get your location. Please enable GPS/location permission.",
      );
    } finally {
      setLoading(false);
    }
  };

  const startTracking = async () => {
    setError("");

    try {
      const current = await getCurrentLocation();
      setLocation(current);

      if (watchRef.current !== null) {
        await clearLocationWatch(watchRef.current);
      }

      watchRef.current = await watchLocation(
        next => {
          setLocation(next);

          if (destination) {
            void calculateRoadRoute(destination, next);
          }
        },
        err => {
          console.error(err);
          setError("GPS tracking stopped.");
          setTracking(false);
        },
      );

      setTracking(true);

      mapRef.current?.easeTo({
        center: [current.longitude, current.latitude],
        zoom: 15,
        duration: 650,
        essential: true,
      });

      if (destination) {
        await calculateRoadRoute(destination, current);
      }
    } catch {
      setTracking(false);
      setError(
        "Unable to start GPS tracking. Check your location permission.",
      );
    }
  };

  const stopTracking = async () => {
    if (watchRef.current !== null) {
      try {
        await clearLocationWatch(watchRef.current);
      } catch {
        // Cleanup failure is non-fatal.
      }

      watchRef.current = null;
    }

    setTracking(false);
  };

  useEffect(
    () => () => {
      if (watchRef.current !== null) {
        clearLocationWatch(watchRef.current).catch(console.error);
      }
    },
    [],
  );

  const calculateRoadRoute = async (
    target: Destination,
    start: GPSLocation | null = location,
  ) => {
    if (!start) {
      setRoute(null);
      setError("Tap My location first so a route can be calculated.");
      return;
    }

    setRouting(true);
    setError("");

    try {
      const url =
        `${OSRM_URL}/${start.longitude},${start.latitude};` +
        `${target.longitude},${target.latitude}` +
        "?overview=full&geometries=geojson&steps=true";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Routing request failed: ${response.status}`);
      }

      const data = (await response.json()) as {
        code?: string;
        routes?: Array<{
          distance: number;
          duration: number;
          geometry?: {
            coordinates: [number, number][];
          };
        }>;
      };

      const firstRoute = data.routes?.[0];

      if (
        data.code !== "Ok" ||
        !firstRoute?.geometry?.coordinates?.length
      ) {
        throw new Error("No road route found.");
      }

      setRoute({
        coordinates: firstRoute.geometry.coordinates,
        distance: firstRoute.distance,
        duration: firstRoute.duration,
      });
    } catch (routeError) {
      console.error(routeError);

      setRoute(null);
      setError(
        "A road route could not be found. Check the destination or try again.",
      );
    } finally {
      setRouting(false);
    }
  };

  const localSearch = (query: string): Destination[] => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return [];

    return nodes
      .filter(node => {
        const haystack =
          `${node.name} ${node.type ?? ""}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 5)
      .map(node => ({
        id: `local-${node.id}`,
        name: node.name,
        latitude: node.latitude,
        longitude: node.longitude,
        type: node.type ?? "Saved place",
        source: "local" as const,
      }));
  };

  const searchDestinations = async (query: string) => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      searchAbortRef.current?.abort();
      setSearchResults([]);
      setSearching(false);
      return;
    }

    const localResults = localSearch(trimmed);

    setSearchResults(localResults);
    setSearching(true);
    searchAbortRef.current?.abort();

    const controller = new AbortController();
    searchAbortRef.current = controller;

    try {
      const params = new URLSearchParams({
        q: `${trimmed}, Zambia`,
        format: "json",
        limit: "6",
        addressdetails: "1",
      });

      const response = await fetch(
        `${NOMINATIM_URL}?${params.toString()}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Search request failed: ${response.status}`);
      }

      const data = (await response.json()) as Array<{
        place_id: number;
        display_name: string;
        lat: string;
        lon: string;
        type?: string;
      }>;

      const remoteResults: Destination[] = data.map(item => ({
        id: `search-${item.place_id}`,
        name: item.display_name.split(",")[0]?.trim() || item.display_name,
        latitude: Number(item.lat),
        longitude: Number(item.lon),
        type: item.type ?? "Place",
        source: "search",
      }));

      const merged = [...localResults, ...remoteResults].filter(
        (item, index, all) =>
          all.findIndex(
            other =>
              Math.abs(other.latitude - item.latitude) < 0.0001 &&
              Math.abs(other.longitude - item.longitude) < 0.0001,
          ) === index,
      );

      setSearchResults(merged.slice(0, 7));
    } catch (searchError) {
      if ((searchError as Error).name !== "AbortError") {
        console.error(searchError);
        setSearchResults(localResults);
      }
    } finally {
      if (!controller.signal.aborted) setSearching(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setError("");

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    searchTimerRef.current = setTimeout(() => {
      void searchDestinations(value);
    }, 350);
  };

  const chooseDestination = (item: Destination) => {
    setDestination(item);
    setSearchQuery(item.name);
    setSearchResults([]);
    setError("");

    mapRef.current?.easeTo({
      center: coords(item),
      zoom: Math.max(mapRef.current.getZoom(), 13),
      duration: 650,
      essential: true,
    });

    if (location) {
      void calculateRoadRoute(item, location);
    } else {
      setError("Destination selected. Tap My location to build the route.");
    }
  };

  const clearDestination = () => {
    setDestination(null);
    setRoute(null);
    setSearchQuery("");
    setSearchResults([]);
    setError("");
  };

  const formatRouteDistance = (meters: number) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(meters >= 10000 ? 0 : 1)} km`;
  };

  const formatRouteTime = (seconds: number) => {
    const minutes = Math.max(1, Math.round(seconds / 60));

    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    return remaining ? `${hours} hr ${remaining} min` : `${hours} hr`;
  };

  return (
    <section className="navigation-page" aria-label="Navigation">
      <header className="navigation-header">
        <button
          type="button"
          className="navigation-back"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="navigation-title">
          <span>Navigation</span>
          <h1>Find your way</h1>
          <p>Search places and get a road route.</p>
        </div>

        <div className="navigation-offline-badge">
          <span />
          Map
        </div>
      </header>

      <div className="navigation-search-card">
        <div className="navigation-search-row">
          <Search size={18} />
          <input
            value={searchQuery}
            onChange={event => handleSearchChange(event.target.value)}
            placeholder="Search destination"
            aria-label="Search destination"
            autoComplete="off"
          />

          {searchQuery && (
            <button
              type="button"
              className="navigation-search-clear"
              onClick={clearDestination}
              aria-label="Clear destination search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {(searchResults.length > 0 || searching) && (
          <div className="navigation-search-results">
            {searching && (
              <div className="navigation-search-status">Searching places...</div>
            )}

            {searchResults.map(item => (
              <button
                key={item.id}
                type="button"
                className="navigation-search-result"
                onClick={() => chooseDestination(item)}
              >
                <span className="place-icon">
                  <MapPin size={16} />
                </span>

                <span className="navigation-search-result-text">
                  <strong>{item.name}</strong>
                  <small>{item.type ?? "Place"}</small>
                </span>

                <NavigationIcon size={16} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="navigation-status-card">
        <div className="navigation-status-icon">
          <LocateFixed size={19} />
        </div>

        <div className="navigation-status-text">
          <strong>
            {tracking
              ? "GPS tracking active"
              : location
                ? "GPS location ready"
                : "Location not set"}
          </strong>

          <span>
            {location
              ? `Accuracy ±${Math.round(location.accuracy)} m`
              : "Set your starting point for directions"}
          </span>
        </div>

        <span
          className={
            tracking || location
              ? "gps-status-dot active"
              : "gps-status-dot"
          }
        />
      </div>

      <div className="navigation-controls">
        <button
          type="button"
          className="navigation-primary-button"
          onClick={locateUser}
          disabled={loading}
        >
          <LocateFixed size={17} />
          {loading ? "Locating..." : "My location"}
        </button>

        {!tracking ? (
          <button
            type="button"
            className="navigation-secondary-button"
            onClick={startTracking}
          >
            <NavigationIcon size={17} />
            Start tracking
          </button>
        ) : (
          <button
            type="button"
            className="navigation-secondary-button"
            onClick={stopTracking}
          >
            Stop tracking
          </button>
        )}
      </div>

      {error && (
        <div className="navigation-error" role="alert">
          {error}
        </div>
      )}

      <div className="offline-map-card real-map-card">
        <div
          ref={mapEl}
          className="real-map-container"
          aria-label="Interactive Zambia map"
        />

        {!mapReady && (
          <div className="real-map-loading">
            <LocateFixed size={26} />
            <strong>Loading map...</strong>
            <span>Preparing the interactive map.</span>
          </div>
        )}

        {routing && (
          <div className="navigation-map-loading">
            <Route size={17} />
            Calculating route...
          </div>
        )}

        {destination && (
          <div className="navigation-map-destination">
            <div>
              <small>DESTINATION</small>
              <strong>{destination.name}</strong>
            </div>

            <button
              type="button"
              onClick={clearDestination}
              aria-label="Clear selected destination"
            >
              <X size={17} />
            </button>
          </div>
        )}
      </div>

      {route && destination && (
        <div className="route-summary">
          <div className="route-summary-main">
            <div className="route-icon">
              <Route size={18} />
            </div>

            <div>
              <strong>{destination.name}</strong>
              <span>
                {formatRouteDistance(route.distance)} ·{" "}
                {formatRouteTime(route.duration)} by road
              </span>
            </div>
          </div>

          <button
            type="button"
            className="route-refresh"
            onClick={() => void calculateRoadRoute(destination)}
            disabled={routing}
            aria-label="Recalculate route"
          >
            <RefreshCw size={17} />
          </button>
        </div>
      )}
    </section>
  );
}
