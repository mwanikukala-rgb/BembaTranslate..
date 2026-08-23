/* =========================================================
   BEMBATRANSLATE
   OFFLINE GPS SERVICE
   ========================================================= */

import {
  Geolocation,
  type Position,
} from "@capacitor/geolocation";

export type GPSLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};

/*
 * Capacitor returns a string watch ID.
 *
 * We define the type locally instead of importing WatchId
 * because different Capacitor Geolocation versions expose
 * that type differently.
 */
export type GPSWatchId = string;

function convertPosition(
  position: Position,
): GPSLocation {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude ?? null,
    speed: position.coords.speed ?? null,
    heading: position.coords.heading ?? null,
  };
}

/* =========================================================
   PERMISSION
   ========================================================= */

export async function requestLocationPermission(): Promise<void> {
  const permissions =
    await Geolocation.requestPermissions();

  const granted =
    permissions.location === "granted" ||
    permissions.coarseLocation === "granted";

  if (!granted) {
    throw new Error(
      "Location permission was not granted.",
    );
  }
}

/* =========================================================
   CURRENT LOCATION
   ========================================================= */

export async function getCurrentLocation(): Promise<GPSLocation> {
  await requestLocationPermission();

  const position =
    await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 3000,
    });

  return convertPosition(position);
}

/* =========================================================
   WATCH LOCATION
   ========================================================= */

export async function watchLocation(
  callback: (location: GPSLocation) => void,
  onError?: (error: unknown) => void,
): Promise<GPSWatchId> {
  await requestLocationPermission();

  const watchId =
    await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 2000,
      },
      (position, error) => {
        if (error) {
          onError?.(error);
          return;
        }

        if (position) {
          callback(
            convertPosition(position),
          );
        }
      },
    );

  return String(watchId);
}

/* =========================================================
   STOP WATCH
   ========================================================= */

export async function clearLocationWatch(
  watchId: GPSWatchId,
): Promise<void> {
  await Geolocation.clearWatch({
    id: watchId,
  });
}

/* =========================================================
   COMPATIBILITY EXPORTS
   =========================================================
   These names allow older navigation code to continue
   working without creating duplicate GPS implementations.
   ========================================================= */

export const getCurrentPosition =
  getCurrentLocation;

export const watchPosition =
  watchLocation;

export const clearPositionWatch =
  clearLocationWatch;

export const stopWatchingLocation =
  clearLocationWatch;
