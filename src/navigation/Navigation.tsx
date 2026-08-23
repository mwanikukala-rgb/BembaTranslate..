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
  clearPositionWatch,
  getCurrentPosition,
  watchPosition,
  type GPSLocation,
} from "./gps";

import {
  zambiaOfflineMap,
  getNearestMapNode,
} from "./mapData";

import {
  calculateBearing,
  findNearestNode,
  findRoute,
  formatDistance,
  bearingToDirection,
} from "./routeEngine";

import type {
  MapNode,
  RouteResult,
} from "./mapTypes";

type NavigationProps = {
  onBack?: () => void;
};

function Navigation({
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

  const [error, setError] =
    useState("");

  const [tracking, setTracking] =
    useState(false);

  const watchIdRef =
    useRef<number | null>(null);

  /* ------------------------------------------------------
     Get current location
  ------------------------------------------------------ */

  const locateUser = async () => {
    setLoading(true);
    setError("");

    try {
      const current =
        await getCurrentPosition();

      setLocation(current);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to get your location. Please enable GPS/location permission.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------
     Start live GPS tracking
  ------------------------------------------------------ */

  const startTracking = async () => {
    setError("");

    try {
      const current =
        await getCurrentPosition();

      setLocation(current);

      const watchId =
        await watchPosition(
          (
            nextPosition: GPSLocation,
          ) => {
            setLocation(nextPosition);
          },
          (gpsError: unknown) => {
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
        Number(watchId);

      setTracking(true);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to start GPS tracking. Check your location permission.",
      );
    }
  };

  /* ------------------------------------------------------
     Stop GPS tracking
  ------------------------------------------------------ */

  const stopTracking = async () => {
    if (
      watchIdRef.current !== null
    ) {
      try {
        await clearPositionWatch(
          watchIdRef.current,
        );
      } catch (err) {
        console.error(err);
      }

      watchIdRef.current = null;
    }

    setTracking(false);
  };

  /* ------------------------------------------------------
     Cleanup
  ------------------------------------------------------ */

  useEffect(() => {
    return () => {
      if (
        watchIdRef.current !== null
      ) {
        clearPositionWatch(
          watchIdRef.current,
        ).catch(console.error);
      }
    };
  }, []);

  /* ------------------------------------------------------
     Select destination
  ------------------------------------------------------ */

  const chooseDestination = (
    node: MapNode,
  ) => {
    setDestination(node);
    setError("");

    if (!location) {
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

  /* ------------------------------------------------------
     Recalculate route
  ------------------------------------------------------ */

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
      setError(
        "No route found.",
      );
    } else {
      setError("");
    }
  };

  /* ------------------------------------------------------
     Navigation instruction
  ------------------------------------------------------ */

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

  /* ------------------------------------------------------
     Render
  ------------------------------------------------------ */

  return (
    <section className="navigation-page">

      {/* Header */}

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
          <span>
            OFFLINE NAVIGATION
          </span>

          <h1>
            Find your way
          </h1>
        </div>

      </div>

      {/* Status */}

      <div className="navigation-status">

        <div className="navigation-status-icon">
          <LocateFixed size={18} />
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

      {/* Offline Map */}

      <div className="offline-map">

        <div className="map-grid" />

        {/* User */}

        {location && (
          <div className="user-location">

            <span className="location-pulse" />

            <span className="location-dot" />

          </div>
        )}

        {/* Route */}

        {route &&
          route.nodes.map(
            (
              node: MapNode,
              index: number,
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
                  top: `${
                    65 - index * 13
                  }%`,
                }}
              >
                {index ===
                  route.nodes.length - 1 && (
                  <MapPin size={25} />
                )}
              </div>
            ),
          )}

        {!location && (
          <div className="map-empty">

            <Locate
