import type {
  MapNode,
  MapPath,
} from "./mapTypes";

/*
 * =========================================================
 * BEMBATRANSLATE
 * OFFLINE MAP DATA
 *
 * This is the first small test map.
 *
 * IMPORTANT:
 * These coordinates are only a DEVELOPMENT TEST NETWORK.
 * They are NOT a real Zambia road map.
 *
 * Later we will replace this data with real packaged
 * Zambia map data.
 * =========================================================
 */

/* ---------------------------------------------------------
   TEST MAP NODES
--------------------------------------------------------- */

export const offlineMapNodes: MapNode[] = [
  {
    id: "node-1",
    latitude: -12.802,
    longitude: 28.213,
    name: "Start",
    type: "path",
  },

  {
    id: "node-2",
    latitude: -12.8025,
    longitude: 28.214,
    name: "Path 2",
    type: "path",
  },

  {
    id: "node-3",
    latitude: -12.803,
    longitude: 28.215,
    name: "Path 3",
    type: "path",
  },

  {
    id: "node-4",
    latitude: -12.8035,
    longitude: 28.216,
    name: "Path 4",
    type: "path",
  },

  {
    id: "node-5",
    latitude: -12.804,
    longitude: 28.217,
    name: "Destination",
    type: "place",
  },
];

/* ---------------------------------------------------------
   TEST WALKING PATHS
--------------------------------------------------------- */

export const offlineMapPaths: MapPath[] = [
  {
    id: "path-1",
    from: "node-1",
    to: "node-2",
  },

  {
    id: "path-2",
    from: "node-2",
    to: "node-3",
  },

  {
    id: "path-3",
    from: "node-3",
    to: "node-4",
  },

  {
    id: "path-4",
    from: "node-4",
    to: "node-5",
  },
];

/* ---------------------------------------------------------
   DESTINATIONS
--------------------------------------------------------- */

export const offlinePlaces: MapNode[] = [
  {
    id: "node-5",
    latitude: -12.804,
    longitude: 28.217,
    name: "Test Destination",
    type: "place",
  },
];

/* ---------------------------------------------------------
   FIND PLACE BY ID
--------------------------------------------------------- */

export function findOfflinePlace(
  id: string,
): MapNode | null {
  return (
    offlinePlaces.find(
      (place) => place.id === id,
    ) ?? null
  );
}

/* ---------------------------------------------------------
   SEARCH OFFLINE PLACES
--------------------------------------------------------- */

export function searchOfflinePlaces(
 query: string,
): MapNode[] {
  const search = query
    .trim()
    .toLowerCase();

  if (!search) {
    return offlinePlaces;
  }

  return offlinePlaces.filter(
    (place) =>
      place.name
        ?.toLowerCase()
        .includes(search),
  );
}
