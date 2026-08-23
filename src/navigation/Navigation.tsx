import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  RefreshCw,
  Search,
} from "lucide-react";

import {
  getCurrentLocation,
  watchLocation,
  clearLocationWatch,
  type GPSPosition,
} from "./gps";

import {
  calculateRoute,
  estimateWalkingTime,
  formatDistance,
  getDirectionText,
} from "./routeEngine";

import {
  mapNodes,
} from "./mapData";

import type {
  Coordinate,
  MapNode,
} from "./mapTypes";

type NavigationProps = {
  onBack?: () => void;
};

function Navigation({
  onBack,
}: NavigationProps) {
  const [position, setPosition] =
    useState<GPSPosition | null>(null);

  const [destination, setDestination] =
    useState<MapNode | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [tracking, setTracking] =
    useState(false);

  const [routeStarted, setRouteStarted] =
    useState(false);

  useEffect(() => {
    return () => {
      clearLocationWatch();
    };
  }, []);

  const filteredNodes = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return mapNodes.slice(0, 30);
    }

    return mapNodes
      .filter((node: MapNode) =>
        node.name
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 30);
  }, [search]);

  const currentCoordinate: Coordinate | null =
    position
      ? {
          latitude: position.latitude,
          longitude: position.longitude,
        }
      : null;

  const route = useMemo(() => {
    if (
      !currentCoordinate ||
      !destination
    ) {
      return null;
    }

    return calculateRoute(
      currentCoordinate,
      destination.coordinate,
      mapNodes
    );
  }, [
    currentCoordinate,
    destination,
  ]);

  const locateMe = async () => {
    setLoading(true);
    setError("");

    try {
      const result =
        await getCurrentLocation();

      setPosition(result);
      setTracking(true);
    } catch (locationError) {
      const message =
        locationError instanceof Error
          ? locationError.message
          : "Unable to get your location.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const startTracking = async () => {
    setError("");

    try {
      const firstPosition =
        await getCurrentLocation();

      setPosition(firstPosition);
      setTracking(true);

      clearLocationWatch();

      watchLocation(
        (nextPosition: GPSPosition) => {
          setPosition(nextPosition);
        },
        (locationError: string) => {
          setError(locationError);
        }
      );
    } catch (locationError) {
      const message =
        locationError instanceof Error
          ? locationError.message
          : "GPS is unavailable.";

      setError(message);
    }
  };

  const stopTracking = () => {
    clearLocationWatch();
    setTracking(false);
  };

  const selectDestination = (
    node: MapNode
  ) => {
    setDestination(node);
    setRouteStarted(false);
    setError("");
  };

  const beginRoute = () => {
    if (!destination) {
      return;
    }

    setRouteStarted(true);

    if (!tracking) {
      void startTracking();
    }
  };

  return (
    <section className="navigation-page">

      <div className="navigation-header">

        <button
          type="button"
          className="navigation-back"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <span className="eyebrow">
            OFFLINE NAVIGATION
          </span>

          <h1>
            Find your way
          </h1>

          <p>
            GPS guidance without internet.
          </p>
        </div>

      </div>

      <div className="navigation-status">

        <div className="navigation-status-icon">
          <LocateFixed size={17} />
        </div>

        <div>
          <strong>
            {tracking
              ? "GPS tracking active"
              : "GPS not started"}
          </strong>

          <span>
            {position
              ? `${position.latitude.toFixed(
                  5
                )}, ${position.longitude.toFixed(
                  5
                )}`
              : "Tap Locate Me to find your position"}
          </span>
        </div>

      </div>

      <div className="navigation-map">

        <div className="map-grid" />

        <div className="map-label map-label-top">
          OFFLINE MAP
        </div>

        {route && route.nodes.length > 0 && (
          <div className="route-line">
            {route.nodes.map(
              (
                node: MapNode,
                index: number
              ) => (
                <span
                  key={node.id}
                  className="route-node"
                  style={{
                    left: `${
                      20 +
                      index *
                        (60 /
                          Math.max(
                            route.nodes.length -
                              1,
                            1
                          ))
                    }%`,
                    top: `${
                      65 -
                      index * 25
                    }%`,
                  }}
                />
              )
            )}
          </div>
        )}

        {position && (
          <div className="user-location-marker">
            <span />
          </div>
        )}

        {destination && (
          <div className="destination-marker">
            <MapPin size={26} />
          </div>
        )}

        <div className="map-center-message">

          {!position ? (
            <>
              <LocateFixed size={28} />

              <strong>
                Your location will appear here
              </strong>

              <span>
                GPS works without mobile data.
              </span>
            </>
          ) : (
            <>
              <NavigationIcon size={28} />

              <strong>
                You are here
              </strong>

              <span>
                Select a destination below.
              </span>
            </>
          )}

        </div>

      </div>

      <div className="navigation-controls">

        <button
          type="button"
          className="gps-button"
          onClick={() => {
            void locateMe();
          }}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw
              size={17}
              className="spin"
            />
          ) : (
            <LocateFixed size={17} />
          )}

          {loading
            ? "Locating..."
            : "Locate Me"}
        </button>

        {tracking ? (
          <button
            type="button"
            className="secondary-gps-button"
            onClick={stopTracking}
          >
            Stop GPS
          </button>
        ) : (
          <button
            type="button"
            className="secondary-gps-button"
            onClick={() => {
              void startTracking();
            }}
          >
            Start Tracking
          </button>
        )}

      </div>

      {error && (
        <div className="navigation-error">
          {error}
        </div>
      )}

      <div className="destination-section">

        <div className="navigation-section-title">
          <div>
            <h2>
              Where do you want to go?
            </h2>

            <p>
              Choose an offline map location.
            </p>
          </div>
        </div>

        <div className="navigation-search">

          <Search size={17} />

          <input
            value={search}
            onChange={(event) => {
              setSearch(
                event.target.value
              );
            }}
            placeholder="Search destination..."
          />

        </div>

        <div className="destination-list">

          {filteredNodes.map(
            (node: MapNode) => {
              const selected =
                destination?.id === node.id;

              return (
                <button
                  type="button"
                  key={node.id}
                  className={
                    selected
                      ? "destination-card selected"
                      : "destination-card"
                  }
                  onClick={() =>
                    selectDestination(node)
                  }
                >
                  <div className="destination-icon">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <strong>
                      {node.name}
                    </strong>

                    <span>
                      Offline map location
                    </span>
                  </div>

                </button>
              );
            }
          )}

          {filteredNodes.length === 0 && (
            <div className="navigation-empty">
              No offline location found.
            </div>
          )}

        </div>

      </div>

      {destination && (
        <div className="route-card">

          <div className="route-card-header">

            <div className="route-card-icon">
              <NavigationIcon size={18} />
            </div>

            <div>
              <span>
                DESTINATION
              </span>

              <strong>
                {destination.name}
              </strong>
            </div>

          </div>

          {route ? (
            <>

              <div className="route-summary">

                <div>
                  <span>
                    Distance
                  </span>

                  <strong>
                    {formatDistance(
                      route.distance
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Walking time
                  </span>

                  <strong>
                    {estimateWalkingTime(
                      route.distance
                    )}{" "}
                    min
                  </strong>
                </div>

              </div>

              {route.nodes.length >=
                2 && (
                <div className="direction-card">

                  <NavigationIcon
                    size={20}
                  />

                  <div>
                    <strong>
                      {getDirectionText(
                        route.nodes[0]
                          .coordinate,
                        route.nodes[
                          route.nodes.length -
                            1
                        ].coordinate
                      )}
                    </strong>

                    <span>
                      Follow the offline
                      route shown on the
                      map.
                    </span>
                  </div>

                </div>
              )}

              <button
                type="button"
                className="start-route-button"
                onClick={beginRoute}
              >
                <NavigationIcon
                  size={17}
                />

                {routeStarted
                  ? "Navigation Active"
                  : "Start Navigation"}
              </button>

            </>
          ) : (
            <div className="route-unavailable">
              Move closer to a mapped
              location to calculate a route.
            </div>
          )}

        </div>
      )}

      <div className="navigation-note">

        <strong>
          Offline navigation
        </strong>

        <span>
          GPS can determine your position
          without internet. The roads and
          places themselves must be packaged
          inside the application for offline
          routing.
        </span>

      </div>

    </section>
  );
}

export default Navigation;
