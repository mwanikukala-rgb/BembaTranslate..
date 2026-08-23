/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION
   GPS + OFFLINE WALKING ROUTES
   ========================================================= */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Compass,
  Crosshair,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  RefreshCw,
  Route,
  Footprints,
  AlertCircle,
} from "lucide-react";

import {
  getCurrentPosition,
  watchPosition,
  clearPositionWatch,
} from "./gps";

import {
  mapNodes,
  mapPaths,
} from "./mapData";

import type {
  GPSPosition,
  MapNode,
  RouteResult,
} from "./mapTypes";

import {
  calculateWalkingRoute,
  findNearestNode,
  formatDistance,
  formatWalkingTime,
} from "./routeEngine";

import "../styles/global.css";

/* =========================================================
   PROPS
   ========================================================= */

type NavigationProps = {
  onBack?: () => void;
};

/* =========================================================
   HELPERS
   ========================================================= */

function formatAccuracy(
  accuracy: number,
): string {
  if (!Number.isFinite(accuracy)) {
    return "Unknown";
  }

  return `${Math.round(accuracy)} m`;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Navigation({
  onBack,
}: NavigationProps) {
  const [position, setPosition] =
    useState<GPSPosition | null>(null);

  const [gpsLoading, setGpsLoading] =
    useState(false);

  const [gpsError, setGpsError] =
    useState("");

  const [tracking, setTracking] =
    useState(false);

  const [destinationId, setDestinationId] =
    useState("");

  const [route, setRoute] =
    useState<RouteResult | null>(null);

  const [routeError, setRouteError] =
    useState("");

  /* =======================================================
     DESTINATIONS
  ======================================================= */

  const destinations = useMemo(() => {
    return mapNodes.filter(
      (node) =>
        node.type === "building" ||
        node.type === "landmark" ||
        node.type === "entrance",
    );
  }, []);

  /* =======================================================
     SELECTED DESTINATION
  ======================================================= */

  const destination = useMemo(() => {
    if (!destinationId) {
      return null;
    }

    return (
      mapNodes.find(
        (node) =>
          node.id === destinationId,
      ) ?? null
    );
  }, [destinationId]);

  /* =======================================================
     CURRENT MAP NODE
  ======================================================= */

  const currentNode = useMemo(() => {
    if (!position) {
      return null;
    }

    return findNearestNode(
      position.latitude,
      position.longitude,
      mapNodes,
    );
  }, [position]);

  /* =======================================================
     GET CURRENT LOCATION
  ======================================================= */

  const locateUser = async () => {
    setGpsLoading(true);
    setGpsError("");

    try {
      const nextPosition =
        await getCurrentPosition();

      setPosition(nextPosition);
    } catch (error) {
      console.error(
        "Unable to get current location:",
        error,
      );

      setGpsError(
        "Unable to get your current location. Please make sure GPS/location is enabled.",
      );
    } finally {
      setGpsLoading(false);
    }
  };

  /* =======================================================
     START GPS TRACKING
  ======================================================= */

  const startTracking = () => {
    if (tracking) {
      return;
    }

    setGpsError("");
    setTracking(true);

    const success = (
      nextPosition: GPSPosition,
    ) => {
      setPosition(nextPosition);
    };

    const error = (
      error: GeolocationPositionError,
    ) => {
      console.error(
        "GPS tracking error:",
        error,
      );

      setGpsError(
        "GPS tracking could not continue. Check that location is enabled.",
      );

      setTracking(false);
    };

    watchPosition(
      success,
      error,
    );
  };

  /* =======================================================
     STOP GPS TRACKING
  ======================================================= */

  const stopTracking = () => {
    clearPositionWatch();
    setTracking(false);
  };

  /* =======================================================
     INITIAL LOCATION
  ======================================================= */

  useEffect(() => {
    locateUser();

    return () => {
      clearPositionWatch();
    };
  }, []);

  /* =======================================================
     CALCULATE ROUTE
  ======================================================= */

  const calculateRoute = () => {
    setRouteError("");
    setRoute(null);

    if (!position) {
      setRouteError(
        "Your current location is not available yet.",
      );

      return;
    }

    if (!destination) {
      setRouteError(
        "Please select a destination.",
      );

      return;
    }

    if (!currentNode) {
      setRouteError(
        "Your location is outside the available offline map.",
      );

      return;
    }

    if (
      currentNode.id ===
      destination.id
    ) {
      setRoute({
        nodes: [currentNode],
        distanceMeters: 0,
        estimatedWalkingSeconds: 0,
      });

      return;
    }

    const calculatedRoute =
      calculateWalkingRoute(
        currentNode,
        destination,
        mapNodes,
        mapPaths,
      );

    if (!calculatedRoute) {
      setRouteError(
        "No walking route was found between your location and the selected destination.",
      );

      return;
    }

    setRoute(
      calculatedRoute,
    );
  };

  /* =======================================================
     AUTOMATIC ROUTE UPDATE
  ======================================================= */

  useEffect(() => {
    if (
      position &&
      destination
    ) {
      calculateRoute();
    }
  }, [
    position,
    destination,
  ]);

  /* =======================================================
     CLEAR ROUTE
  ======================================================= */

  const clearRoute = () => {
    setRoute(null);
    setRouteError("");
    setDestinationId("");
  };

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
          onClick={() => {
            if (onBack) {
              onBack();
            }
          }}
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="navigation-title">

          <div className="navigation-title-icon">
            <NavigationIcon
              size={18}
            />
          </div>

          <div>
            <strong>
              Offline Navigation
            </strong>

            <span>
              GPS • Walking routes
            </span>
          </div>

        </div>

        <div className="navigation-offline">
          <span />
          Offline
        </div>

      </header>

      {/* =================================================
          MAP AREA
      ================================================= */}

      <div className="offline-map">

        <div className="map-grid" />

        <div className="map-compass">
          <Compass size={17} />
          <span>N</span>
        </div>

        <div className="map-label map-label-top">
          OFFLINE ZAMBIA MAP
        </div>

        {/* CURRENT LOCATION */}

        {position && (
          <div
            className="user-location-marker"
            title="Your current location"
          >
            <div className="user-location-pulse" />

            <div className="user-location-dot">
              <LocateFixed
                size={15}
              />
            </div>
          </div>
        )}

        {/* ROUTE */}

        {route &&
          route.nodes.length > 0 && (
            <div className="route-preview">

              <Route size={16} />

              <span>
                Route ready
              </span>

            </div>
          )}

        {!position && (
          <div className="map-center-message">

            <MapPin size={27} />

            <strong>
              Waiting for GPS
            </strong>

            <span>
              Your position will appear
              here when location is available.
            </span>

          </div>
        )}

        {position && (
          <div className="map-location-label">

            <Crosshair size={14} />

            <span>
              You are here
            </span>

          </div>
        )}

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="navigation-content">

        {/* GPS STATUS */}

        <div className="gps-status-card">

          <div className="gps-status-icon">
            <LocateFixed size={18} />
          </div>

          <div className="gps-status-text">

            <strong>
              {position
                ? "Location found"
                : "Finding your location"}
            </strong>

            <span>
              {position
                ? `Accuracy: ${formatAccuracy(
                    position.accuracy,
                  )}`
                : gpsLoading
                  ? "Requesting GPS location..."
                  : "Location unavailable"}
            </span>

          </div>

          <button
            type="button"
            className="gps-refresh-button"
            onClick={locateUser}
            disabled={gpsLoading}
            aria-label="Refresh location"
          >
            <RefreshCw
              size={16}
              className={
                gpsLoading
                  ? "spin"
                  : ""
              }
            />
          </button>

        </div>

        {/* GPS ERROR */}

        {gpsError && (
          <div className="navigation-error">

            <AlertCircle size={16} />

            <span>
              {gpsError}
            </span>

          </div>
        )}

        {/* TRACKING */}

        <div className="tracking-card">

          <div>

            <strong>
              Live GPS tracking
            </strong>

            <span>
              Follow your movement while
              walking.
            </span>

          </div>

          <button
            type="button"
            className={
              tracking
                ? "tracking-button active"
                : "tracking-button"
            }
            onClick={() => {
              if (tracking) {
                stopTracking();
              } else {
                startTracking();
              }
            }}
          >
            {tracking
              ? "Tracking"
              : "Start"}
          </button>

        </div>

        {/* DESTINATION */}

        <div className="navigation-section-title">

          <div>
            <strong>
              Where do you want to go?
            </strong>

            <span>
              Choose an offline destination
            </span>
          </div>

          <Footprints size={18} />

        </div>

        <div className="destination-select">

          <MapPin size={17} />

          <select
            value={destinationId}
            onChange={(event) => {
              setDestinationId(
                event.target.value,
              );
              setRoute(null);
              setRouteError("");
            }}
          >
            <option value="">
              Select destination
            </option>

            {destinations.map(
              (node) => (
                <option
                  key={node.id}
                  value={node.id}
                >
                  {node.name}
                </option>
              ),
            )}

          </select>

        </div>

        {/* DESTINATION INFO */}

        {destination && (
          <div className="destination-card">

            <div className="destination-icon">
              <MapPin size={17} />
            </div>

            <div>

              <strong>
                {destination.name}
              </strong>

              <span>
                Offline map destination
              </span>

            </div>

          </div>
        )}

        {/* ROUTE BUTTON */}

        <button
          type="button"
          className="calculate-route-button"
          onClick={calculateRoute}
          disabled={
            !position ||
            !destination ||
            gpsLoading
          }
        >
          <Route size={18} />

          {position
            ? "Show walking route"
            : "Waiting for GPS"}
        </button>

        {/* ROUTE ERROR */}

        {routeError && (
          <div className="navigation-error">

            <AlertCircle size={16} />

            <span>
              {routeError}
            </span>

          </div>
        )}

        {/* ROUTE RESULT */}

        {route && (
          <div className="route-result-card">

            <div className="route-result-header">

              <div>
                <span>
                  WALKING ROUTE
                </span>

                <strong>
                  {destination?.name ??
                    "Destination"}
                </strong>
              </div>

              <button
                type="button"
                onClick={clearRoute}
                className="route-clear-button"
              >
                Clear
              </button>

            </div>

            <div className="route-summary">

              <div>

                <Route size={16} />

                <strong>
                  {formatDistance(
                    route.distanceMeters,
                  )}
                </strong>

                <span>
                  Distance
                </span>

              </div>

              <div>

                <Footprints size={16} />

                <strong>
                  {formatWalkingTime(
                    route.estimatedWalkingSeconds,
                  )}
                </strong>

                <span>
                  Walking
                </span>

              </div>

            </div>

            {/* ROUTE STEPS */}

            <div className="route-steps">

              <div className="route-steps-title">
                <strong>
                  Follow this route
                </strong>

                <span>
                  {route.nodes.length} points
                </span>
              </div>

              {route.nodes.map(
                (
                  node: MapNode,
                  index: number,
                ) => (
                  <div
                    key={`${node.id}-${index}`}
                    className="route-step"
                  >

                    <div className="route-step-number">
                      {index + 1}
                    </div>

                    <div className="route-step-line">
                      <strong>
                        {index === 0
                          ? "Start here"
                          : index ===
                              route.nodes
                                .length -
                                1
                            ? "You have arrived"
                            : node.name}
                      </strong>

                      <span>
                        {node.name}
                      </span>
                    </div>

                  </div>
                ),
              )}

            </div>

          </div>
        )}

        {/* OFFLINE INFORMATION */}

        <div className="navigation-info">

          <div className="navigation-info-icon">
            <NavigationIcon
              size={16}
            />
          </div>

          <div>

            <strong>
              Designed for offline use
            </strong>

            <span>
              GPS can determine your
              position without mobile
              internet. The walking route
              is calculated from map data
              stored inside the application.
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}
