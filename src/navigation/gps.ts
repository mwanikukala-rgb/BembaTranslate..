/* =========================================================
   BEMBATRANSLATE
   OFFLINE GPS SERVICE
   Capacitor Geolocation
   ========================================================= */

import { Geolocation } from "@capacitor/geolocation";

export type GPSPosition = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};

let watchId: string | null = null;

function convertPosition(
  position: {
    coords: {
      latitude: number;
      longitude: number;
      accuracy: number;
      altitude?: number | null;
      speed?: number | null;
      heading?: number | null;
    };
  }
): GPSPosition {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude:
      position.coords.altitude ?? null,
    speed:
      position.coords.speed ?? null,
    heading:
      position.coords.heading ?? null,
  };
}

/* =========================================================
   GET CURRENT LOCATION
   ========================================================= */

export async function getCurrentLocation(): Promise<GPSPosition> {
  const permission =
    await Geolocation.checkPermissions();

  if (
    permission.location !== "granted"
  ) {
    const requested =
      await Geolocation.requestPermissions();

    if (
      requested.location !== "granted"
    ) {
      throw new Error(
        "Location permission was not granted."
      );
    }
  }

  const position =
    await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 5000,
    });

  return convertPosition(position);
}

/* =========================================================
   WATCH LOCATION
   ========================================================= */

export async function watchLocation(
  onPosition: (
    position: GPSPosition
  ) => void,
  onError: (
    error: unknown
  ) => void
): Promise<void> {
  clearPositionWatch();

  try {
    watchId =
      await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 3000,
        },
        (position, error) => {
          if (error) {
            onError(error);
            return;
          }

          if (!position) {
            return;
          }

          onPosition(
            convertPosition(position)
          );
        }
      );
  } catch (error) {
    onError(error);
  }
}

/* =========================================================
   CLEAR GPS WATCH
   ========================================================= */

export function clearPositionWatch(): void {
  if (!watchId) {
    return;
  }

  const currentWatchId = watchId;

  watchId = null;

  void Geolocation.clearWatch({
    id: currentWatchId,
  });
}

/* =========================================================
   GPS STATUS
   ========================================================= */

export async function checkLocationPermission(): Promise<boolean> {
  try {
    const permission =
      await Geolocation.checkPermissions();

    return (
      permission.location === "granted"
    );
  } catch {
    return false;
  }
}
