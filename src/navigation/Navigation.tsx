import { useEffect, useState } from "react";
import {
  Crosshair,
  Map,
  Navigation as NavigationIcon,
  RefreshCw,
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

export default function Navigation({ onBack }: NavigationProps) {
  const [location, setLocation] = useState<GPSLocation | null>(null);
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let watchId: string | null = null;
    let mounted = true;

    async function startTracking() {
      try {
        setLoading(true);
        setError("");

        await requestLocationPermission();

        const firstLocation = await getCurrentLocation();

        if (!mounted) {
          return;
        }

        setLocation(firstLocation);

        watchId = await watchLocation(
          (nextLocation) => {
            if (!mounted) {
              return;
            }

            setLocation(nextLocation);
            setTracking(true);
          },
          (watchError) => {
            console.error("GPS watch error:", watchError);
          }
        );

        if (mounted) {
          setTracking(true);
        }
      } catch (locationError) {
        console.error("GPS error:", locationError);

        if (mounted) {
          setError(
            locationError instanceof Error
              ? locationError.message
              : "Unable to access your location."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    startTracking();

    return () => {
      mounted = false;

      if (watchId) {
        void stopWatchingLocation(watchId);
      }
    };
  }, []);

  const refreshLocation = async () => {
    try {
      setLoading(true);
      setError("");

      await requestLocationPermission();

      const nextLocation = await getCurrentLocation();

      setLocation(nextLocation);
    } catch (locationError) {
      console.error("GPS refresh error:", locationError);

      setError(
        locationError instanceof Error
          ? locationError.message
          : "Unable to refresh your location."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="navigation-page">
      <div className="navigation-heading">
        <div>
          <div className="section-label">
            <NavigationIcon size={12} />
            OFFLINE NAVIGATION
          </div>

          <h1>Zambia Navigation</h1>

          <p>
            Your location can be tracked using the phone's GPS, even without
            mobile data.
          </p>
        </div>

        {onBack && (
          <button className="clear-button" onClick={onBack}>
            Back
          </button>
        )}
      </div>

      <div className="navigation-status-card">
        <div className="navigation-status-icon">
          <Crosshair size={22} />
        </div>

        <div>
          <strong>
            {loading
              ? "Finding your location..."
              : tracking
                ? "GPS tracking active"
                : "GPS ready"}
          </strong>

          <span>
            {location
              ? `Accuracy ±${Math.round(location.accuracy)} metres`
              : "Waiting for GPS position"}
          </span>
        </div>

        <span
          className={`gps-status-dot ${tracking ? "active" : ""}`}
        />
      </div>

      <div className="offline-map-card">
        <div className="offline-map-grid" />

        <div className="map-placeholder">
          <Map size={42} />

          <strong>Zambia Offline Map</strong>

          <span>
            Map data will be stored on this device for offline navigation.
          </span>

          {location && (
            <div className="map-location-marker">
              <span />
              You are here
            </div>
          )}
        </div>
      </div>

      <div className="navigation-location-card">
        <div className="location-header">
          <div>
            <span>YOUR CURRENT POSITION</span>
            <strong>GPS coordinates</strong>
          </div>

          <button
            className="navigation-refresh"
            onClick={refreshLocation}
            disabled={loading}
            aria-label="Refresh location"
          >
            <RefreshCw size={17} />
          </button>
        </div>

        {location ? (
          <div className="coordinate-grid">
            <div>
              <span>LATITUDE</span>
              <strong>{formatCoordinate(location.latitude)}</strong>
            </div>

            <div>
              <span>LONGITUDE</span>
              <strong>{formatCoordinate(location.longitude)}</strong>
            </div>

            <div>
              <span>ACCURACY</span>
              <strong>±{Math.round(location.accuracy)} m</strong>
            </div>

            <div>
              <span>SPEED</span>
              <strong>
                {location.speed == null
                  ? "—"
                  : `${Math.round(location.speed * 3.6)} km/h`}
              </strong>
            </div>
          </div>
        ) : (
          <div className="location-empty">
            Waiting for a GPS position from your phone.
          </div>
        )}

        {error && <div className="gps-error">{error}</div>}
      </div>

      <div className="navigation-coming-card">
        <div>
          <span className="section-label">
            <Map size={12} />
            NEXT
          </span>

          <strong>Offline Zambia map & walking routes</strong>

          <p>
            The next navigation layer will add real map data, destinations,
            walking paths and offline route calculation.
          </p>
        </div>
      </div>
    </section>
  );
}
