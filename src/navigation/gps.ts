import {
  Geolocation,
  type Position,
  type WatchId,
} from "@capacitor/geolocation";

export type GPSLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};

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

export async function watchLocation(
  callback: (location: GPSLocation) => void,
  onError?: (error: unknown) => void,
): Promise<WatchId> {
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

  return watchId;
}

export async function stopWatchingLocation(
  watchId: WatchId,
): Promise<void> {
  await Geolocation.clearWatch({
    id: watchId,
  });
}

/*
 * Compatibility exports.
 *
 * These keep older navigation code
 * working while we upgrade the system.
 */

export const getCurrentPosition =
  getCurrentLocation;

export const watchPosition =
  watchLocation;

export const clearPositionWatch =
  stopWatchingLocation;
