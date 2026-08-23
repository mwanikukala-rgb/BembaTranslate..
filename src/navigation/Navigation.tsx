/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION
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
  const [
    location,
    setLocation,
  ] =
    useState<GPSLocation | null>(
      null,
    );

  const [
    destination,
    setDestination,
  ] =
    useState<MapNode | null>(
      null,
    );

  const [
    route,
    setRoute,
  ] =
    useState<RouteResult | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    tracking,
    setTracking,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  const watchIdRef =
    useRef<GPSWatchId | null>(
      null,
    );

  /* =======================================================
     CURRENT LOCATION
     ======================================================= */

  const locateUser =
    async () => {
      setLoading(true);
      setError("");

      try {
        const current =
          await getCurrentLocation();

        setLocation(
          current,
        );

        setError("");
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

  const startTracking =
    async () => {
      setError("");

      try {
        const current =
          await getCurrentLocation();

        setLocation(
          current,
        );

        if (
          watchIdRef.current !==
          null
        ) {
          await clearLocationWatch(
            watchIdRef.current,
          );

          watchIdRef.current =
            null;
        }

        const watchId =
          await watchLocation(
            (
              nextLocation,
            ) => {
              setLocation(
                nextLocation,
              );
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

        watchIdRef.current =
          watchId;

        setTracking(
          true,
        );
      } catch (err) {
        console.error(
          "Tracking error:",
          err,
        );

        setTracking(
          false,
        );

        setError(
          "Unable to start GPS tracking. Check your location permission.",
        );
      }
    };

  /* =======================================================
     STOP TRACKING
     ======================================================= */

  const stopTracking =
    async () => {
      if (
        watchIdRef.current !==
        null
      ) {
        try {
          await clearLocationWatch(
            watchIdRef.current,
          );
        } catch (err) {
          console.error(
            err,
          );
        }

        watchIdRef.current =
          null;
      }

      setTracking(
        false,
      );
    };

  /* =======================================================
     CLEANUP
     ======================================================= */

  useEffect(() => {
    return () => {
      if (
        watchIdRef.current !==
        null
      ) {
        clearLocationWatch(
          watchIdRef.current,
        ).catch(
          console.error,
        );

        watchIdRef.current =
          null;
      }
    };
  }, []);

  /* =======================================================
     DESTINATION
     ======================================================= */

  const chooseDestination =
    (
      node: MapNode,
    ) => {
      setDestination(
        node,
      );

      setError("");

      if (!location) {
        setRoute(
          null,
        );

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
        setRoute(
          null,
        );

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
        setRoute(
          null,
        );

        setError(
          "No offline route is available between these locations yet.",
        );

        return;
      }

      setRoute(
        newRoute,
      );
    };

  /* =======================================================
     RECALCULATE
     ======================================================= */

  const recalculateRoute =
    () => {
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
        setRoute(
          null,
        );

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

      setRoute(
        newRoute,
      );

      if (!newRoute) {
        setError(
          "No route found.",
        );
      } else {
        setError("");
      }
    };

  /* =======================================================
     DIRECTION
     ======================================================= */

  const getDirectionText =
    (): string => {
      if (
        !location ||
        !route ||
        route.nodes.length <
          2
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
     DESTINATION LIST
     ======================================================= */

  const availableNodes =
    zambiaOfflineMap.nodes;

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="navigation-page">
      {/* HEADER */}

      <div className="navigation-header">
        <button
          type="button"
          className="navigation-back"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft
            size={19}
          />
        </button>

        <div>
          <span>
            OFFLINE NAVIGATION
          </span>

          <h1>
            Find your way
          </h1>
        </div>
      </div>

      {/* STATUS */}

      <div className="navigation-status">
        <div className="navigation-status-icon">
          <LocateFixed
            size={18}
          />
        </div>

        <div>
          <strong>
            {tracking
              ? "GPS tracking active"
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
      </div>

      {/* GPS CONTROLS */}

      <div className="navigation-controls">
        <button
          type="button"
          onClick={
            locateUser
          }
          disabled={
            loading
          }
        >
          <LocateFixed
            size={17}
          />

          {loading
            ? "Locating..."
            : "My location"}
        </button>

        {!tracking ? (
          <button
            type="button"
            onClick={
              startTracking
            }
          >
            <NavigationIcon
              size={17}
            />

            Start tracking
          </button>
        ) : (
          <button
            type="button"
            onClick={
              stopTracking
            }
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

      {/* OFFLINE MAP */}

      <div className="offline-map">
        <div className="map-grid" />

        {/* USER LOCATION */}

        {location && (
          <div className="user-location">
            <span className="location-pulse" />
            <span className="location-dot" />
          </div>
        )}

        {/* ROUTE */}

        {route &&
          route.nodes.map(
            (
              node,
              index,
            ) => (
              <div
                key={
                  node.id
                }
                className={
                  index ===
                  route.nodes.length -
                    1
                    ? "route-destination"
                    : "route-node"
                }
                style={{
                  left: `${20 +
                    index * 20}%`,
                  top: `${65 -
                    index * 13}%`,
                }}
              >
                {index ===
                  route.nodes.length -
                    1 && (
                  <MapPin
                    size={25}
                  />
                )}
              </div>
            ),
          )}

        {!location && (
          <div className="map-empty">
            <LocateFixed
              size={28}
            />

            <strong>
              GPS location
            </strong>

            <span>
              Tap “My location”
              to find your
              position.
            </span>
          </div>
        )}
      </div>

      {/* ROUTE INFORMATION */}

      {route && (
        <div className="route-summary">
          <div>
            <Route
              size={18}
            />

            <div>
              <strong>
                {getDirectionText()}
              </strong>

              <span>
                {formatDistance(
                  route.distance,
                )}{" "}
                ·{" "}
                {estimateWalkingTime(
                  route.distance,
                )}{" "}
                min walk
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={
              recalculateRoute
            }
            aria-label="Recalculate route"
          >
            <RefreshCw
              size={17}
            />
          </button>
        </div>
      )}

      {/* DESTINATIONS */}

      <div className="navigation-destinations">
        <div className="navigation-section-title">
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
                key={
                  node.id
                }
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
                <div>
                  <MapPin
                    size={17}
                  />

                  <span>
                    <strong>
                      {
                        node.name
                      }
                    </strong>

                    <small>
                      {node.type ??
                        "offline place"}
                    </small>
                  </span>
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
        <NavigationIcon
          size={18}
        />

        <div>
          <strong>
            Works offline
          </strong>

          <span>
            The map points and
            route calculations
            are stored inside
            BembaTranslate.
            Internet is not
            required for these
            offline routes.
          </span>
        </div>
      </div>
    </section>
  );
}
