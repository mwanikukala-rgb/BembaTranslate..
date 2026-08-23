/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION
   CLEAN MOBILE UI
   ========================================================= */

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  RefreshCw,
  Route,
  Search,
  SquareArrowOutUpRight,
} from "lucide-react";

import {
  clearLocationWatch,
  getCurrentLocation,
  watchLocation,
  type GPSLocation,
  type GPSWatchId,
} from "./gps";

import {
  zambiaOfflineMap,
} from "./mapData";

import {
  calculateBearing,
  bearingToDirection,
  findNearestNode,
  findRoute,
  formatDistance,
  estimateWalkingTime,
} from "./routeEngine";

import type {
  MapNode,
  RouteResult,
} from "./mapTypes";

type NavigationProps = {
  onBack?: () => void;
};

export default function Navigation({
  onBack,
}: NavigationProps) {
  const [location, setLocation] =
    useState<GPSLocation | null>(null);

  const [destination, setDestination] =
    useState<MapNode | null>(null);

  const [route, setRoute] =
    useState<RouteResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [tracking, setTracking] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const watchIdRef =
    useRef<GPSWatchId | null>(null);

  /* =======================================================
     CURRENT LOCATION
     ======================================================= */

  const locateUser = async () => {
    setLoading(true);
    setError("");

    try {
      const current =
        await getCurrentLocation();

      setLocation(current);
    } catch (err) {
      console.error(
        "Location error:",
        err,
      );

      setError(
        "Unable to get your location. Please enable GPS/location permission.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     START TRACKING
     ======================================================= */

  const startTracking = async () => {
    setError("");

    try {
      const current =
        await getCurrentLocation();

      setLocation(current);

      if (
        watchIdRef.current !== null
      ) {
        await clearLocationWatch(
          watchIdRef.current,
        );

        watchIdRef.current = null;
      }

      const watchId =
        await watchLocation(
          (nextLocation) => {
            setLocation(nextLocation);
          },
          (gpsError) => {
            console.error(
              "GPS tracking error:",
              gpsError,
            );

            setError(
              "GPS tracking stopped.",
            );
          },
        );

      watchIdRef.current = watchId;

      setTracking(true);
    } catch (err) {
      console.error(
        "Tracking error:",
        err,
      );

      setTracking(false);

      setError(
        "Unable to start GPS tracking. Check your location permission.",
      );
    }
  };

  /* =======================================================
     STOP TRACKING
     ======================================================= */

  const stopTracking = async () => {
    if (
      watchIdRef.current !== null
    ) {
      try {
        await clearLocationWatch(
          watchIdRef.current,
        );
      } catch (err) {
        console.error(err);
      }

      watchIdRef.current = null;
    }

    setTracking(false);
  };

  /* =======================================================
     CLEANUP
     ======================================================= */

  useEffect(() => {
    return () => {
      if (
        watchIdRef.current !== null
      ) {
        clearLocationWatch(
          watchIdRef.current,
        ).catch(console.error);

        watchIdRef.current = null;
      }
    };
  }, []);

  /* =======================================================
     DESTINATION
     ======================================================= */

  const chooseDestination = (
    node: MapNode,
  ) => {
    setDestination(node);
    setError("");

    if (!location) {
      setRoute(null);

      setError(
        "Get your current location first.",
      );

      return;
    }

    const nearest =
      findNearestNode(
        zambiaOfflineMap,
        location.latitude,
        location.longitude,
      );

    if (!nearest) {
      setRoute(null);

      setError(
        "No offline map point is available near your location.",
      );

      return;
    }

    const newRoute =
      findRoute(
        zambiaOfflineMap,
        nearest.id,
        node.id,
      );

    if (!newRoute) {
      setRoute(null);

      setError(
        "No offline route is available between these locations yet.",
      );

      return;
    }

    setRoute(newRoute);
  };

  /* =======================================================
     RECALCULATE
     ======================================================= */

  const recalculateRoute = () => {
    if (
      !location ||
      !destination
    ) {
      return;
    }

    const nearest =
      findNearestNode(
        zambiaOfflineMap,
        location.latitude,
        location.longitude,
      );

    if (!nearest) {
      setRoute(null);

      setError(
        "Could not find a nearby offline map point.",
      );

      return;
    }

    const newRoute =
      findRoute(
        zambiaOfflineMap,
        nearest.id,
        destination.id,
      );

    setRoute(newRoute);

    if (!newRoute) {
      setError("No route found.");
    } else {
      setError("");
    }
  };

  /* =======================================================
     DIRECTION
     ======================================================= */

  const getDirectionText = (): string => {
    if (
      !location ||
      !route ||
      route.nodes.length < 2
    ) {
      return "Select a destination";
    }

    const nextNode =
      route.nodes[1];

    const bearing =
      calculateBearing(
        location.latitude,
        location.longitude,
        nextNode.latitude,
        nextNode.longitude,
      );

    return `Head ${bearingToDirection(
      bearing,
    )}`;
  };

  /* =======================================================
     DESTINATIONS
     ======================================================= */

  const availableNodes =
    zambiaOfflineMap.nodes;

  const filteredNodes =
    availableNodes.filter(
      (node) =>
        node.name
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="navigation-page">

      {/* =================================================
          HEADER
         ================================================= */}

      <header className="navigation-header">

        <button
          type="button"
          className="navigation-back"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="navigation-header-text">
          <span>
            OFFLINE NAVIGATION
          </span>

          <h1>
            Find your way
          </h1>
        </div>

        <div className="navigation-header-badge">
          <span />
          Offline
        </div>

      </header>

      {/* =================================================
          MAP
         ================================================= */}

      <div className="navigation-map-card">

        <div className="navigation-map-top">

          <div>
            <span className="navigation-map-label">
              OFFLINE MAP
            </span>

            <strong>
              {location
                ? "Your position"
                : "Location not found"}
            </strong>
          </div>

          <button
            type="button"
            onClick={locateUser}
            disabled={loading}
            className="map-locate-button"
            aria-label="Find my location"
          >
            <LocateFixed
              size={17}
            />
          </button>

        </div>

        <div className="offline-map">

          <div className="map-grid" />

          <div className="map-road map-road-one" />
          <div className="map-road map-road-two" />
          <div className="map-road map-road-three" />

          {location && (
            <div className="user-location">
              <span className="location-pulse" />
              <span className="location-dot" />
            </div>
          )}

          {route &&
            route.nodes.map(
              (
                node,
                index,
              ) => (
                <div
                  key={node.id}
                  className={
                    index ===
                    route.nodes.length - 1
                      ? "route-destination"
                      : "route-node"
                  }
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${65 - index * 13}%`,
                  }}
                >
                  {index ===
                    route.nodes.length - 1 && (
                    <MapPin
                      size={25}
                    />
                  )}
                </div>
              ),
            )}

          {!location && (
            <div className="map-empty">

              <div className="map-empty-icon">
                <LocateFixed
                  size={23}
                />
              </div>

              <strong>
                Your location
              </strong>

              <span>
                Tap the location
                button to find
                yourself.
              </span>

            </div>
          )}

          {location && (
            <div className="map-location-label">
              <LocateFixed
                size={13}
              />
              You are here
            </div>
          )}

        </div>

      </div>

      {/* =================================================
          GPS STATUS
         ================================================= */}

      <div className="navigation-gps-card">

        <div className="gps-status-icon">
          <LocateFixed
            size={18}
          />
        </div>

        <div className="gps-status-content">

          <div className="gps-status-heading">

            <strong>
              GPS location
            </strong>

            <span
              className={
                tracking
                  ? "gps-live"
                  : "gps-idle"
              }
            >
              <span />
              {tracking
                ? "Tracking"
                : "Ready"}
            </span>

          </div>

          <p>
            {location
              ? `Accuracy ±${Math.round(
                  location.accuracy,
                )} m`
              : "Location not available"}
          </p>

        </div>

        <button
          type="button"
          className="gps-main-button"
          onClick={
            tracking
              ? stopTracking
              : startTracking
          }
        >
          {tracking
            ? "Stop"
            : "Start"}
        </button>

      </div>

      {/* =================================================
          ERROR
         ================================================= */}

      {error && (
        <div className="navigation-error">

          <div>
            <strong>
              GPS notice
            </strong>

            <span>
              {error}
            </span>
          </div>

        </div>
      )}

      {/* =================================================
          ROUTE SUMMARY
         ================================================= */}

      {route && (
        <div className="route-summary">

          <div className="route-summary-icon">
            <Route size={18} />
          </div>

          <div className="route-summary-content">

            <span>
              ROUTE READY
            </span>

            <strong>
              {getDirectionText()}
            </strong>

            <small>
              {formatDistance(
                route.distance,
              )}
              {" · "}
              {estimateWalkingTime(
                route.distance,
              )}{" "}
              min walk
            </small>

          </div>

          <button
            type="button"
            onClick={
              recalculateRoute
            }
            aria-label="Recalculate route"
            className="route-refresh"
          >
            <RefreshCw
              size={16}
            />
          </button>

        </div>
      )}

      {/* =================================================
          DESTINATION
         ================================================= */}

      <div className="navigation-destinations">

        <div className="navigation-section-title">

          <div>
            <span>
              DESTINATION
            </span>

            <h2>
              Where do you want to go?
            </h2>
          </div>

          <span className="destination-count">
            {availableNodes.length}
          </span>

        </div>

        {/* SEARCH */}

        <div className="navigation-search">

          <Search
            size={17}
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search offline places..."
            aria-label="Search offline places"
          />

        </div>

        {/* PLACE LIST */}

        <div className="navigation-place-list">

          {filteredNodes.map(
            (node) => (
              <button
                key={node.id}
                type="button"
                className={
                  destination?.id ===
                  node.id
                    ? "navigation-place selected"
                    : "navigation-place"
                }
                onClick={() =>
                  chooseDestination(
                    node,
                  )
                }
              >

                <div className="place-main">

                  <div className="place-icon">
                    <MapPin
                      size={17}
                    />
                  </div>

                  <span className="place-text">

                    <strong>
                      {node.name}
                    </strong>

                    <small>
                      {node.type ??
                        "Offline place"}
                    </small>

                  </span>

                </div>

                {destination?.id ===
                  node.id ? (
                  <span className="selected-label">
                    Selected
                  </span>
                ) : (
                  <SquareArrowOutUpRight
                    size={15}
                    className="place-arrow"
                  />
                )}

              </button>
            ),
          )}

          {filteredNodes.length ===
            0 && (
            <div className="navigation-no-results">
              <Search size={20} />
              <strong>
                No places found
              </strong>
              <span>
                Try another search.
              </span>
            </div>
          )}

        </div>

      </div>

      {/* =================================================
          OFFLINE NOTICE
         ================================================= */}

      <div className="navigation-offline-notice">

        <div className="offline-notice-icon">
          <NavigationIcon
            size={17}
          />
        </div>

        <div>
          <strong>
            Navigation works offline
          </strong>

          <span>
            Map points and walking
            routes are stored inside
            BembaTranslate. No internet
            connection is required.
          </span>
        </div>

      </div>

    </section>
  );
}
