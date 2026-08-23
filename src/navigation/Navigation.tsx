import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MapPin,
  Navigation as NavigationIcon,
  LocateFixed,
  Route,
  Footprints,
  RefreshCw,
} from "lucide-react";

import {
  getCurrentPosition,
  watchPosition,
  clearPositionWatch,
} from "./gps";

import {
  offlineMapNodes,
  offlineMapPaths,
  offlinePlaces,
} from "./mapData";

import {
  calculateWalkingRoute,
  findNearestNode,
  formatDistance,
  formatWalkingTime,
} from "./routeEngine";

import type {
  MapNode,
  RouteResult,
} from "./mapTypes";

import "../styles/navigation.css";

/*
 * =========================================================
 * BEMBATRANSLATE
 * OFFLINE NAVIGATION
 *
 * GPS + Offline Map Data + Offline Route Engine
 *
 * No online map service is required for this layer.
 * =========================================================
 */

type GPSPosition = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

function Navigation() {
  const [
    position,
    setPosition,
  ] = useState<GPSPosition | null>(null);

  const [
    gpsError,
    setGpsError,
  ] = useState("");

  const [
    gpsLoading,
    setGpsLoading,
  ] = useState(true);

  const [
    destinationId,
    setDestinationId,
  ] = useState(
    offlinePlaces[0]?.id ?? "",
  );

  const [
    route,
    setRoute,
  ] = useState<RouteResult | null>(
    null,
  );

  const [
    calculating,
    setCalculating,
  ] = useState(false);

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState<Date | null>(null);

  /*
   * -------------------------------------------------------
   * Nearest map node
   * -------------------------------------------------------
   */

  const nearestNode = useMemo(() => {
    if (!position) {
      return null;
    }

    return findNearestNode(
      position.latitude,
      position.longitude,
      offlineMapNodes,
    );
  }, [position]);

  /*
   * -------------------------------------------------------
   * Destination
   * -------------------------------------------------------
   */

  const destination = useMemo(() => {
    return (
      offlinePlaces.find(
        (place) =>
          place.id === destinationId,
      ) ?? null
    );
  }, [destinationId]);

  /*
   * -------------------------------------------------------
   * Start GPS
   * -------------------------------------------------------
   */

  useEffect(() => {
    let watchId:
      | number
      | null = null;

    let mounted = true;

    async function startGPS() {
      setGpsLoading(true);
      setGpsError("");

      try {
        const current =
          await getCurrentPosition();

        if (!mounted) {
          return;
        }

        setPosition({
          latitude:
            current.coords.latitude,
          longitude:
            current.coords.longitude,
          accuracy:
            current.coords.accuracy,
        });

        setLastUpdated(
          new Date(),
        );

        /*
         * Keep tracking the person.
         */
        watchId = await watchPosition(
          (nextPosition) => {
            if (!mounted) {
              return;
            }

            setPosition({
              latitude:
                nextPosition.coords
                  .latitude,

              longitude:
                nextPosition.coords
                  .longitude,

              accuracy:
                nextPosition.coords
                  .accuracy,
            });

            setLastUpdated(
              new Date(),
            );
          },

          (error) => {
            if (!mounted) {
              return;
            }

            setGpsError(
              error.message ||
                "Unable to track your location.",
            );
          },
        );
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unable to get your location.";

        setGpsError(message);
      } finally {
        if (mounted) {
          setGpsLoading(false);
        }
      }
    }

    void startGPS();

    return () => {
      mounted = false;

      if (watchId !== null) {
        clearPositionWatch(
          watchId,
        );
      }
    };
  }, []);

  /*
   * -------------------------------------------------------
   * Calculate route
   * -------------------------------------------------------
   */

  const calculateRoute = () => {
    if (
      !nearestNode ||
      !destination
    ) {
      return;
    }

    setCalculating(true);

    /*
     * Small timeout keeps the interface responsive
     * while the route calculation is performed.
     */
    window.setTimeout(() => {
      const result =
        calculateWalkingRoute(
          nearestNode,
          destination,
          offlineMapNodes,
          offlineMapPaths,
        );

      setRoute(result);
      setCalculating(false);
    }, 50);
  };

  /*
   * -------------------------------------------------------
   * Recalculate route when GPS moves
   * -------------------------------------------------------
   */

  useEffect(() => {
    if (
      !position ||
      !destination ||
      !route
    ) {
      return;
    }

    /*
     * Once a route exists, refresh it from the
     * user's new nearest node.
     */
    const nearest =
      findNearestNode(
        position.latitude,
        position.longitude,
        offlineMapNodes,
      );

    if (!nearest) {
      return;
    }

    const updatedRoute =
      calculateWalkingRoute(
        nearest,
        destination,
        offlineMapNodes,
        offlineMapPaths,
      );

    if (updatedRoute) {
      setRoute(updatedRoute);
    }
  }, [
    position,
    destination,
  ]);

  /*
   * -------------------------------------------------------
   * Center on current location
   * -------------------------------------------------------
   */

  const refreshLocation = async () => {
    setGpsLoading(true);
    setGpsError("");

    try {
      const current =
        await getCurrentPosition();

      setPosition({
        latitude:
          current.coords.latitude,
        longitude:
          current.coords.longitude,
        accuracy:
          current.coords.accuracy,
      });

      setLastUpdated(
        new Date(),
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to get your location.";

      setGpsError(message);
    } finally {
      setGpsLoading(false);
    }
  };

  /*
   * -------------------------------------------------------
   * Render
   * -------------------------------------------------------
   */

  return (
    <section className="navigation-page">

      {/* -------------------------------------------------
          HEADER
      ------------------------------------------------- */}

      <div className="navigation-header">

        <div>
          <span className="navigation-eyebrow">
            OFFLINE NAVIGATION
          </span>

          <h1>
            Find your way
          </h1>

          <p>
            GPS navigation without
            internet.
          </p>
        </div>

        <div className="navigation-status">
          <span />
          Offline
        </div>

      </div>

      {/* -------------------------------------------------
          MAP AREA
      ------------------------------------------------- */}

      <div className="offline-map">

        <div className="map-grid" />

        {/* Route line */}

        {route && (
          <div className="route-preview">

            {route.nodes.map(
              (node, index) => (
                <div
                  key={node.id}
                  className="route-node"
                  style={{
                    left: `${
                      20 +
                      index *
                        (60 /
                          Math.max(
                            1,
                            route.nodes
                              .length -
                              1,
                          ))
                    }%`,

                    top: `${
                      72 -
                      index * 12
                    }%`,
                  }}
                >
                  {index === 0 ? (
                    <span className="route-start">
                      <LocateFixed
                        size={18}
                      />
                    </span>
                  ) : index ===
                    route.nodes.length -
                      1 ? (
                    <span className="route-destination">
                      <MapPin
                        size={18}
                      />
                    </span>
                  ) : (
                    <span className="route-point" />
                  )}
                </div>
              ),
            )}

            <div className="route-line" />

          </div>
        )}

        {/* Current position */}

        {position && (
          <div
            className="current-location"
            title="Your current location"
          >
            <span />
          </div>
        )}

        {/* Map label */}

        <div className="map-label">
          <NavigationIcon size={13} />
          Offline map
        </div>

        {/* GPS accuracy */}

        {position?.accuracy !==
          undefined && (
          <div className="accuracy-label">
            Accuracy ±
            {Math.round(
              position.accuracy,
            )}
            m
          </div>
        )}

        {/* Recenter button */}

        <button
          className="recenter-button"
          onClick={refreshLocation}
          disabled={gpsLoading}
          aria-label="Update location"
        >
          {gpsLoading ? (
            <RefreshCw
              size={19}
              className="spin"
            />
          ) : (
            <LocateFixed
              size={19}
            />
          )}
        </button>

      </div>

      {/* -------------------------------------------------
          GPS STATUS
      ------------------------------------------------- */}

      <div className="gps-status-card">

        <div className="gps-status-icon">
          <LocateFixed size={17} />
        </div>

        <div>
          <strong>
            {gpsLoading
              ? "Finding your location..."
              : position
                ? "Location found"
                : "Location unavailable"}
          </strong>

          {position ? (
            <span>
              {position.latitude.toFixed(
                6,
              )}
              {" • "}
              {position.longitude.toFixed(
                6,
              )}
            </span>
          ) : (
            <span>
              GPS is required for
              live navigation.
            </span>
          )}
        </div>

      </div>

      {/* -------------------------------------------------
          ERROR
      ------------------------------------------------- */}

      {gpsError && (
        <div className="navigation-error">
          <strong>
            GPS problem
          </strong>

          <span>
            {gpsError}
          </span>
        </div>
      )}

      {/* -------------------------------------------------
          DESTINATION
      ------------------------------------------------- */}

      <div className="destination-card">

        <div className="destination-heading">
          <div>
            <span>
              DESTINATION
            </span>

            <strong>
              Where do you want to go?
            </strong>
          </div>

          <MapPin size={18} />
        </div>

        <select
          value={destinationId}
          onChange={(event) => {
            setDestinationId(
              event.target.value,
            );

            setRoute(null);
          }}
        >
          {offlinePlaces.map(
            (place) => (
              <option
                key={place.id}
                value={place.id}
              >
                {place.name}
              </option>
            ),
          )}
        </select>

        <button
          className="route-button"
          onClick={calculateRoute}
          disabled={
            !position ||
            !destination ||
            calculating
          }
        >
          <Route size={17} />

          {calculating
            ? "Calculating route..."
            : "Find walking route"}
        </button>

      </div>

      {/* -------------------------------------------------
          ROUTE RESULT
      ------------------------------------------------- */}

      {route && (
        <div className="route-result">

          <div className="route-result-header">

            <div>
              <span className="navigation-eyebrow">
                ROUTE FOUND
              </span>

              <h2>
                Walking route
              </h2>
            </div>

            <Footprints
              size={22}
            />

          </div>

          <div className="route-stats">

            <div>
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
              <strong>
                {formatWalkingTime(
                  route.estimatedWalkingSeconds,
                )}
              </strong>

              <span>
                Walking time
              </span>
            </div>

            <div>
              <strong>
                {route.nodes.length}
              </strong>

              <span>
                Path points
              </span>
            </div>

          </div>

          <div className="route-instruction">

            <Footprints size={17} />

            <div>
              <strong>
                Follow the highlighted
                route.
              </strong>

              <span>
                Your position will update
                automatically as you move.
              </span>
            </div>

          </div>

        </div>
      )}

      {/* -------------------------------------------------
          DEBUG / DEVELOPMENT INFORMATION
      ------------------------------------------------- */}

      <div className="navigation-info">

        <div>
          <span>
            Offline map nodes
          </span>

          <strong>
            {offlineMapNodes.length}
          </strong>
        </div>

        <div>
          <span>
            Walking paths
          </span>

          <strong>
            {offlineMapPaths.length}
          </strong>
        </div>

        <div>
          <span>
            Destinations
          </span>

          <strong>
            {offlinePlaces.length}
          </strong>
        </div>

      </div>

      {lastUpdated && (
        <p className="location-updated">
          GPS updated{" "}
          {lastUpdated.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            },
          )}
        </p>
      )}

    </section>
  );
}

export default Navigation;
