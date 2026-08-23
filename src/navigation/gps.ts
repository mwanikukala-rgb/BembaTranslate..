/* =========================================================
   BEMBATRANSLATE
   GPS SERVICE
   ========================================================= */

import {
  Geolocation,
  type Position,
} from "@capacitor/geolocation";

/* =========================================================
   TYPES
   ========================================================= */

export type GPSLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};

export type GPSPosition = GPSLocation;

export type GPSWatchId = string;

/* =========================================================
   CONVERT CAPACITOR POSITION
   ========================================================= */

function convertPosition(
  position: Position,
): GPSLocation {
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
   REQUEST PERMISSION
   ========================================================= */

export async function requestLocationPermission(): Promise<void> {
  const permissions =
    await Geolocation.requestPermissions();

  const locationGranted =
    permissions.location === "granted" ||
    permissions.coarseLocation === "granted";

  if (!locationGranted) {
    throw new Error(
      "Location permission was not granted.",
    );
  }
}

/* =========================================================
   GET CURRENT LOCATION
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
  onLocation: (
    location: GPSLocation,
  ) => void,
  onError?: (
    error: unknown,
  ) => void,
): Promise<GPSWatchId> {
  await requestLocationPermission();

  const watchId =
    await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 2000,
      },
      (
        position,
        error,
      ) => {
        if (error) {
          onError?.(error);
          return;
        }

        if (position) {
          onLocation(
            convertPosition(position),
          );
        }
      },
    );

  return String(watchId);
}

/* =========================================================
   CLEAR LOCATION WATCH
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
   ========================================================= */

export const getCurrentPosition =
  getCurrentLocation;

export const watchPosition =
  watchLocation;

export const clearPositionWatch =
  clearLocationWatch;
