import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Crosshair,
  LocateFixed,
  Map,
  Navigation as NavigationIcon,
  RefreshCw,
  Signal,
  StopCircle,
} from "lucide-react";

import {
  GPSLocation,
  getCurrentLocation,
  requestLocationPermission,
  stopWatchingLocation,
  watchLocation,
} from "./gps";

type NavigationProps = {
  onBack?: () => void;
};

function formatCoordinate(value: number) {
  return value.toFixed(6);
}

function formatAccuracy(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (value < 1000) {
    return `${Math.round(value)} m`;
  }

  return `${(value / 1000).toFixed(2)} km`;
}

function formatSpeed(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return "0 km/h";
  }

  return `${(value * 3.6).toFixed(1)} km/h`;
}

function formatHeading(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  const index =
    Math.round(value / 45) % 8;

  return `${directions[index]} (${Math.round(
    value
  )}°)`;
}

export default function Navigation({
  onBack,
}: NavigationProps) {
  const [location, setLocation] =
    useState<GPSLocation | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [tracking, setTracking] =
    useState(false);

  const [error, setError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState("");

  const watchId =
    useRef<string | null>(null);

  /*
   * Stop GPS tracking when the navigation
   * component leaves the screen.
   */
  useEffect(() => {
    return () => {
      if (watchId.current) {
        void stopWatchingLocation(
          watchId.current
        );

        watchId.current = null;
      }
    };
  }, []);

  /*
   * Get one GPS position.
   */
  const locateMe = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await requestLocationPermission();

      const current =
        await getCurrentLocation();

      setLocation(current);

      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to get your location. Make sure GPS/location is enabled and permission has been allowed."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Start continuous GPS tracking.
   */
  const startTracking = async () => {
    if (tracking) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await requestLocationPermission();

      /*
       * Get an immediate position first so
       * the user does not have to wait for
       * the watcher.
       */
      try {
        const current =
          await getCurrentLocation();

        setLocation(current);

        setLastUpdated(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
      } catch {
        /*
         * The watcher may still succeed even
         * if the first position fails.
         */
      }

      const id = await watchLocation(
        (nextLocation) => {
          setLocation(nextLocation);

          setLastUpdated(
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
        },
        (watchError) => {
          console.error(
            "GPS watcher error:",
            watchError
          );

          setError(
            "GPS tracking encountered a problem."
          );
        }
      );

      watchId.current = id;
      setTracking(true);
    } catch (err) {
      console.error(err);

      setError(
        "Location permission is required for GPS navigation."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Stop continuous tracking.
   */
  const stopTracking = async () => {
    if (!watchId.current) {
      setTracking(false);
      return;
    }

    try {
      await stopWatchingLocation(
        watchId.current
      );
    } catch (err) {
      console.error(err);
    }

    watchId.current = null;
    setTracking(false);
  };

  /*
   * Re-centre / refresh location.
   */
  const refreshLocation = async () => {
    await locateMe();
  };

  return (
    <section className="navigation-page">

      {/* ==================================================
          TOP BAR
      ================================================== */}

      <div className="navigation-header">

        <div className="navigation-header-left">

          {onBack && (
            <button
              className="navigation-back-button"
              onClick={onBack}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <div className="navigation-title-icon">
            <NavigationIcon size={18} />
          </div>

          <div>
            <span className="navigation-eyebrow">
              OFFLINE NAVIGATION
            </span>

            <strong>
              Find your way
            </strong>
          </div>

        </div>

        <div className="navigation-status">

          <span
            className={
              tracking
                ? "gps-status-dot active"
                : "gps-status-dot"
            }
          />

          {tracking
            ? "Tracking"
            : "GPS ready"}

        </div>

      </div>

      {/* ==================================================
          MAP AREA
      ================================================== */}

      <div className="navigation-map">

        <div className="map-background">

          {/* Decorative grid */}

          <div className="map-grid" />

          {/* Roads */}

          <div className="map-road map-road-1" />
          <div className="map-road map-road-2" />
          <div className="map-road map-road-3" />
          <div className="map-road map-road-4" />
          <div className="map-road map-road-5" />

          {/* Parks / land */}

          <div className="map-area map-area-1">
            GREEN AREA
          </div>

          <div className="map-area map-area-2">
            OPEN LAND
          </div>

          {/* Map labels */}

          <span className="map-label label-1">
            Zambia
          </span>

          <span className="map-label label-2">
            Your location
          </span>

          <span className="map-label label-3">
            Offline map
          </span>

          {/* User position */}

          {location && (
            <div
              className="user-location-marker"
              title="Your current location"
            >
              <div className="location-pulse" />

              <div className="location-marker">
                <LocateFixed
                  size={18}
                />
              </div>
            </div>
          )}

          {!location && (
            <div className="map-placeholder">

              <Map size={34} />

              <strong>
                Offline map ready
              </strong>

              <span>
                Your position will appear
                here when GPS is available.
              </span>

            </div>
          )}

        </div>

        {/* Map controls */}

        <div className="map-controls">

          <button
            onClick={refreshLocation}
            disabled={loading}
            aria-label="Locate me"
          >
            {loading ? (
              <RefreshCw
                size={18}
                className="spin"
              />
            ) : (
              <Crosshair size={18} />
            )}
          </button>

        </div>

        {/* Map information */}

        <div className="map-badge">

          <span className="map-badge-dot" />

          <span>
            Offline map
          </span>

        </div>

      </div>

      {/* ==================================================
          LOCATION INFORMATION
      ================================================== */}

      <div className="navigation-content">

        <div className="navigation-section-heading">

          <div>
            <span>
              CURRENT POSITION
            </span>

            <strong>
              Where am I?
            </strong>
          </div>

          <Signal
            size={17}
            className={
              location
                ? "signal-good"
                : ""
            }
          />

        </div>

        {error && (
          <div className="navigation-error">

            <strong>
              GPS unavailable
            </strong>

            <span>
              {error}
            </span>

          </div>
        )}

        <div className="location-card">

          <div className="location-main">

            <div className="location-icon">
              <LocateFixed size={20} />
            </div>

            <div>

              <span>
                GPS position
              </span>

              <strong>
                {location
                  ? "Location found"
                  : "Waiting for GPS"}
              </strong>

            </div>

          </div>

          <div
            className={
              location
                ? "accuracy-badge good"
                : "accuracy-badge"
            }
          >
            {location
              ? formatAccuracy(
                  location.accuracy
                )
              : "No fix"}
          </div>

        </div>

        {/* Coordinates */}

        <div className="coordinates-card">

          <div className="coordinate-item">

            <span>
              LATITUDE
            </span>

            <strong>
              {location
                ? formatCoordinate(
                    location.latitude
                  )
                : "—"}
            </strong>

          </div>

          <div className="coordinate-divider" />

          <div className="coordinate-item">

            <span>
              LONGITUDE
            </span>

            <strong>
              {location
                ? formatCoordinate(
                    location.longitude
                  )
                : "—"}
            </strong>

          </div>

        </div>

        {/* GPS details */}

        <div className="gps-details">

          <div>

            <span>
              SPEED
            </span>

            <strong>
              {location
                ? formatSpeed(
                    location.speed
                  )
                : "0 km/h"}
            </strong>

          </div>

          <div>

            <span>
              HEADING
            </span>

            <strong>
              {location
                ? formatHeading(
                    location.heading
                  )
                : "—"}
            </strong>

          </div>

          <div>

            <span>
              UPDATED
            </span>

            <strong>
              {lastUpdated || "—"}
            </strong>

          </div>

        </div>

        {/* ==================================================
            GPS ACTION
        ================================================== */}

        {!tracking ? (
          <button
            className="start-navigation-button"
            onClick={startTracking}
            disabled={loading}
          >

            {loading ? (
              <RefreshCw
                size={18}
                className="spin"
              />
            ) : (
              <NavigationIcon size={18} />
            )}

            {loading
              ? "Starting GPS..."
              : "Start GPS tracking"}

          </button>
        ) : (
          <button
            className="stop-navigation-button"
            onClick={stopTracking}
          >

            <StopCircle size={18} />

            Stop GPS tracking

          </button>
        )}

        {/* ==================================================
            NEXT DEVELOPMENT STAGE
        ================================================== */}

        <div className="navigation-coming">

          <div className="coming-icon">
            <Map size={17} />
          </div>

          <div>

            <strong>
              Offline routing is next
            </strong>

            <span>
              After GPS is working, we will
              add the Zambia road network,
              destinations and offline route
              calculation.
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}
