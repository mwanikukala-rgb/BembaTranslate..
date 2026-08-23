/* =========================================================
   BEMBATRANSLATE
   CLEAN OFFLINE NAVIGATION
   Mobile-first • GPS • Offline routes
   ========================================================= */

import { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  RefreshCw,
  Route,
} from "lucide-react";

import {
  clearLocationWatch,
  getCurrentLocation,
  watchLocation,
  type GPSLocation,
  type GPSWatchId,
} from "./gps";

import { zambiaOfflineMap } from "./mapData";

import {
  calculateBearing,
  bearingToDirection,
  estimateWalkingTime,
  findNearestNode,
  findRoute,
  formatDistance,
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

  const watchIdRef =
    useRef<GPSWatchId | null>(null);

  /* =======================================================
     GET CURRENT LOCATION
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
     START GPS TRACKING
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
          (gpsError: unknown) => {
            console.error(
              "GPS tracking error:",
              gpsError,
            );

            setError(
              "GPS tracking stopped.",
            );

            setTracking(false);
          },
        );

      watchIdRef.current =
        watchId;

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
     STOP GPS TRACKING
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
     CALCULATE ROUTE
     ======================================================= */

  const calculateRouteTo = (
    node: MapNode,
  ) => {
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
    setError("");
  };

  /* =======================================================
     SELECT DESTINATION
     ======================================================= */

  const chooseDestination = (
    node: MapNode,
  ) => {
    setDestination(node);

    calculateRouteTo(node);
  };

  /* =======================================================
     RECALCULATE
     ======================================================= */

  const recalculateRoute = () => {
    if (
      !destination ||
      !location
    ) {
      return;
    }

    calculateRouteTo(
      destination,
    );
  };

  /* =======================================================
     CURRENT DIRECTION
     ======================================================= */

  const getDirectionText =
    (): string => {
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
     AVAILABLE DESTINATIONS
     ======================================================= */

  const availableNodes =
    zambiaOfflineMap.nodes;

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="navigation-page">

      {/* HEADER */}

      <header className="navigation-header">

        <button
          type="button"
          className="navigation-back"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="navigation-title">

          <span>
            OFFLINE NAVIGATION
          </span>

          <h1>
            Find your way
          </h1>

          <p>
            GPS navigation with
            offline routes.
          </p>

        </div>

        <div className="navigation-offline-badge">
          <span />
          Offline
        </div>

      </header>

      {/* GPS STATUS */}

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
                : "GPS tracking inactive"}
          </strong>

          <span>
            {location
              ? `Accuracy ±${Math.round(
                  location.accuracy,
                )} m`
              : "Location not available"}
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

      {/* GPS CONTROLS */}

      <div className="navigation-controls">

        <button
          type="button"
          className="navigation-primary-button"
          onClick={locateUser}
          disabled={loading}
        >
          <LocateFixed size={17} />

          {loading
            ? "Locating..."
            : "My location"}
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

      {/* ERROR */}

      {error && (
        <div className="navigation-error">
          {error}
        </div>
      )}

      {/* MAP */}

      <div className="offline-map-card">

        <div className="offline-map-grid" />

        {location && (
          <div
            className="map-user-location"
            aria-label="Your location"
          >
            <span className="location-pulse" />
            <span className="location-dot" />
          </div>
        )}

        {route &&
          route.nodes.map(
            (node, index) => (
              <div
                key={node.id}
                className={
                  index ===
                  route.nodes.length - 1
                    ? "map-route-destination"
                    : "map-route-node"
                }
                style={{
                  left: `${18 + index * 20}%`,
                  top: `${68 - index * 12}%`,
                }}
              >
                {index ===
                  route.nodes.length - 1 && (
                  <MapPin size={24} />
                )}
              </div>
            ),
          )}

        {!location && (
          <div className="map-placeholder">

            <LocateFixed size={30} />

            <strong>
              GPS location
            </strong>

            <span>
              Tap “My location”
              to find your position.
            </span>

          </div>
        )}

        {location && !route && (
          <div className="map-location-label">
            <span />
            Your location
          </div>
        )}

      </div>

      {/* ROUTE SUMMARY */}

      {route && (
        <div className="route-summary">

          <div className="route-summary-main">

            <div className="route-icon">
              <Route size={18} />
            </div>

            <div>
              <strong>
                {getDirectionText()}
              </strong>

              <span>
                {formatDistance(
                  route.distance,
                )}
                {" · "}
                {estimateWalkingTime(
                  route.distance,
                )}
                {" min walk"}
              </span>
            </div>

          </div>

          <button
            type="button"
            className="route-refresh"
            onClick={
              recalculateRoute
            }
            aria-label="Recalculate route"
          >
            <RefreshCw size={17} />
          </button>

        </div>
      )}

      {/* DESTINATIONS */}

      <div className="navigation-destinations">

        <div className="navigation-section-heading">

          <div>
            <span>
              OFFLINE PLACES
            </span>

            <h2>
              Choose a destination
            </h2>
          </div>

          <small>
            {availableNodes.length}
          </small>

        </div>

        <div className="navigation-place-list">

          {availableNodes.map(
            (node) => (
              <button
                key={node.id}
                type="button"
                className={
                  destination?.id === node.id
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
                    <MapPin size={17} />
                  </div>

                  <div className="place-text">

                    <strong>
                      {node.name}
                    </strong>

                    <small>
                      {node.type ??
                        "Offline place"}
                    </small>

                  </div>

                </div>

                {destination?.id ===
                  node.id && (
                  <span className="selected-label">
                    Selected
                  </span>
                )}

              </button>
            ),
          )}

        </div>
      </div>

      {/* OFFLINE NOTICE */}

      <div className="navigation-offline-notice">

        <div className="offline-notice-icon">
          <NavigationIcon size={18} />
        </div>

        <div>

          <strong>
            Works offline
          </strong>

          <span>
            Map points and route
            calculations are stored
            inside BembaTranslate.
            Internet is not required.
          </span>

        </div>

      </div>

    </section>
  );
}
