import { Geolocation, Position } from "@capacitor/geolocation";

export type GPSPosition = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};

export async function requestLocationPermission(): Promise<void> {
  const permissions = await Geolocation.requestPermissions();

  const granted =
    permissions.location === "granted" ||
    permissions.coarseLocation === "granted";

  if (!granted) {
    throw new Error("Location permission was not granted.");
  }
}

export async function getCurrentPosition(): Promise<GPSPosition> {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 3000,
  });

  return convertPosition(position);
}

export async function watchPosition(
  callback: (position: GPSPosition) => void,
  onError?: (error: unknown) => void
): Promise<string> {
  const watchId = await Geolocation.watchPosition(
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
        callback(convertPosition(position));
      }
    }
  );

  return watchId;
}

export async function clearPositionWatch(
  watchId: string
): Promise<void> {
  await Geolocation.clearWatch({
    id: watchId,
  });
}

function convertPosition(
  position: Position
): GPSPosition {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude ?? null,
    speed: position.coords.speed ?? null,
    heading: position.coords.heading ?? null,
  };
}
