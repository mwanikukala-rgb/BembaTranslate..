import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ArrowLeft, LocateFixed, MapPin, Navigation as NavigationIcon, RefreshCw, Route } from "lucide-react";
import { clearLocationWatch, getCurrentLocation, watchLocation, type GPSLocation, type GPSWatchId } from "./gps";
import { zambiaOfflineMap } from "./mapData";
import { calculateBearing, bearingToDirection, estimateWalkingTime, findNearestNode, findRoute, formatDistance } from "./routeEngine";
import type { MapNode, RouteResult } from "./mapTypes";

type NavigationProps = { onBack?: () => void };

const ZAMBIA_CENTER: [number, number] = [27.85, -13.13];

/* Online first: this proves the real map/GPS layer works. Replace the raster
   source with bundled PMTiles when the offline Zambia map package is added. */
const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

const coords = (node: MapNode): [number, number] => [node.longitude, node.latitude];

export default function Navigation({ onBack }: NavigationProps) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const userMarker = useRef<Marker | null>(null);
  const destinationMarker = useRef<Marker | null>(null);
  const watchRef = useRef<GPSWatchId | null>(null);

  const [location, setLocation] = useState<GPSLocation | null>(null);
  const [destination, setDestination] = useState<MapNode | null>(null);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState("");

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

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

    map.on("load", () => {
      map.addSource("bemba-route", {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } },
      });
      map.addLayer({
        id: "bemba-route-line",
        type: "line",
        source: "bemba-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#d4af5a", "line-width": 5, "line-opacity": 0.92 },
      });
      setMapReady(true);
    });

    mapRef.current = map;
    return () => {
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
      el.innerHTML = `<span class="real-map-user-pulse"></span><span class="real-map-user-dot"></span>`;
      userMarker.current = new maplibregl.Marker({ element: el }).setLngLat(lngLat).addTo(map);
    } else {
      userMarker.current.setLngLat(lngLat);
    }

    if (tracking) map.easeTo({ center: lngLat, duration: 450, essential: true });
  }, [location, tracking, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    destinationMarker.current?.remove();
    destinationMarker.current = null;
    if (!destination) return;

    const el = document.createElement("div");
    el.className = "real-map-destination-marker";
    el.innerHTML = `<span class="real-map-destination-pin"><span></span></span>`;
    destinationMarker.current = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(coords(destination))
      .setPopup(new maplibregl.Popup({ offset: 18, closeButton: false }).setText(destination.name))
      .addTo(map);

    map.easeTo({ center: coords(destination), zoom: Math.max(map.getZoom(), 12), duration: 650, essential: true });
  }, [destination, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const source = map.getSource("bemba-route") as GeoJSONSource | undefined;
    if (!source) return;

    const line = route?.nodes.map(coords) ?? [];
    source.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: line } });

    if (line.length > 1) {
      const bounds = line.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(line[0], line[0]));
      map.fitBounds(bounds, { padding: 55, maxZoom: 15, duration: 600 });
    }
  }, [route, mapReady]);

  const locateUser = async () => {
    setLoading(true); setError("");
    try {
      const current = await getCurrentLocation();
      setLocation(current);
      mapRef.current?.easeTo({ center: [current.longitude, current.latitude], zoom: 15, duration: 650, essential: true });
    } catch (err) {
      console.error(err);
      setError("Unable to get your location. Please enable GPS/location permission.");
    } finally { setLoading(false); }
  };

  const startTracking = async () => {
    setError("");
    try {
      const current = await getCurrentLocation();
      setLocation(current);
      if (watchRef.current !== null) await clearLocationWatch(watchRef.current);
      watchRef.current = await watchLocation(
        next => setLocation(next),
        err => { console.error(err); setError("GPS tracking stopped."); setTracking(false); },
      );
      setTracking(true);
      mapRef.current?.easeTo({ center: [current.longitude, current.latitude], zoom: 15, duration: 650, essential: true });
    } catch (err) {
      console.error(err); setTracking(false);
      setError("Unable to start GPS tracking. Check your location permission.");
    }
  };

  const stopTracking = async () => {
    if (watchRef.current !== null) {
      try { await clearLocationWatch(watchRef.current); } catch (err) { console.error(err); }
      watchRef.current = null;
    }
    setTracking(false);
  };

  useEffect(() => () => {
    if (watchRef.current !== null) clearLocationWatch(watchRef.current).catch(console.error);
  }, []);

  const calculateRouteTo = (node: MapNode) => {
    if (!location) { setRoute(null); setError("Get your current location first."); return; }
    const nearest = findNearestNode(zambiaOfflineMap, location.latitude, location.longitude);
    if (!nearest) { setRoute(null); setError("No offline map point is available near your location."); return; }
    const newRoute = findRoute(zambiaOfflineMap, nearest.id, node.id);
    if (!newRoute) { setRoute(null); setError("No offline route is available between these locations yet."); return; }
    setRoute(newRoute); setError("");
  };

  const chooseDestination = (node: MapNode) => { setDestination(node); calculateRouteTo(node); };
  const recalculateRoute = () => { if (destination && location) calculateRouteTo(destination); };

  const directionText = () => {
    if (!location || !route || route.nodes.length < 2) return "Select a destination";
    const next = route.nodes[1];
    const bearing = calculateBearing(location.latitude, location.longitude, next.latitude, next.longitude);
    return `Head ${bearingToDirection(bearing)}`;
  };

  const nodes = zambiaOfflineMap.nodes;

  return (
    <section className="navigation-page" aria-label="Offline navigation">
      <header className="navigation-header">
        <button type="button" className="navigation-back" onClick={onBack} aria-label="Back"><ArrowLeft size={20} /></button>
        <div className="navigation-title"><span>Offline navigation</span><h1>Find your way</h1><p>GPS navigation with offline routes.</p></div>
        <div className="navigation-offline-badge"><span />Offline</div>
      </header>

      <div className="navigation-status-card">
        <div className="navigation-status-icon"><LocateFixed size={19} /></div>
        <div className="navigation-status-text">
          <strong>{tracking ? "GPS tracking active" : location ? "GPS location ready" : "GPS tracking inactive"}</strong>
          <span>{location ? `Accuracy ±${Math.round(location.accuracy)} m` : "Location not available"}</span>
        </div>
        <span className={tracking || location ? "gps-status-dot active" : "gps-status-dot"} />
      </div>

      <div className="navigation-controls">
        <button type="button" className="navigation-primary-button" onClick={locateUser} disabled={loading}><LocateFixed size={17} />{loading ? "Locating..." : "My location"}</button>
        {!tracking ? <button type="button" className="navigation-secondary-button" onClick={startTracking}><NavigationIcon size={17} />Start tracking</button> : <button type="button" className="navigation-secondary-button" onClick={stopTracking}>Stop tracking</button>}
      </div>

      {error && <div className="navigation-error" role="alert">{error}</div>}

      <div className="offline-map-card real-map-card">
        <div ref={mapEl} className="real-map-container" aria-label="Interactive Zambia map" />
        {!mapReady && <div className="real-map-loading"><LocateFixed size={26} /><strong>Loading map...</strong><span>Preparing the interactive map.</span></div>}
      </div>

      {route && <div className="route-summary">
        <div className="route-summary-main"><div className="route-icon"><Route size={18} /></div><div><strong>{directionText()}</strong><span>{formatDistance(route.distance)} · {estimateWalkingTime(route.distance)} min walk</span></div></div>
        <button type="button" className="route-refresh" onClick={recalculateRoute} aria-label="Recalculate route"><RefreshCw size={17} /></button>
      </div>}

      <div className="navigation-destinations">
        <div className="navigation-section-heading"><div><span>Offline places</span><h2>Choose a destination</h2></div><small>{nodes.length}</small></div>
        <div className="navigation-place-list">
          {nodes.map(node => <button key={node.id} type="button" className={destination?.id === node.id ? "navigation-place selected" : "navigation-place"} onClick={() => chooseDestination(node)}>
            <div className="place-main"><div className="place-icon"><MapPin size={17} /></div><div className="place-text"><strong>{node.name}</strong><small>{node.type ?? "Offline place"}</small></div></div>
            {destination?.id === node.id && <span className="selected-label">Selected</span>}
          </button>)}
        </div>
      </div>

      <div className="navigation-offline-notice"><div className="offline-notice-icon"><NavigationIcon size={18} /></div><div><strong>Map + GPS connected</strong><span>The interactive map and phone GPS are now connected. The next layer is bundling Zambia map tiles for true offline maps and replacing the online tile source.</span></div></div>
    </section>
  );
}
