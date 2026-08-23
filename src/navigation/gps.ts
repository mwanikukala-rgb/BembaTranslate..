import { Geolocation, Position } from "@capacitor/geolocation";

export type GPSLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};

export async function requestLocationPermission() {
  const permissions = await Geolocation.requestPermissions();

  if (
    permissions.location !== "granted" &&
    permissions.coarseLocation !== "granted"
  ) {
    throw new Error("Location permission was not granted.");
  }

  return permissions;
}

export async function getCurrentLocation(): Promise<GPSLocation> {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 3000,
  });

  return convertPosition(position);
}

export async function watchLocation(
  callback: (location: GPSLocation) => void,
  onError?: (error: unknown) => void
) {
  const watchId = await Geolocation.watchPosition(
    {
      enableHighAccuracy: true,
      maximumAge: 2000,
      timeout: 15000,
    },
    (position, error) => {
      if (error) {
        onError?.(error);
        return;
      }

      if (position) {
        callback(convertPosition(position));
      }
    }
  );

  return watchId;
}

export async function stopWatchingLocation(watchId: string) {
  await Geolocation.clearWatch({
    id: watchId,
  });
}

function convertPosition(position: Position): GPSLocation {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude ?? null,
    speed: position.coords.speed ?? null,
    heading: position.coords.heading ?? null,
  };
}
