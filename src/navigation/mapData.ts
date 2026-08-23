/* =========================================================
   BEMBATRANSLATE
   OFFLINE MAP DATA
   ========================================================= */

import type {
  MapData,
  MapNode,
  MapEdge,
  Coordinate,
} from "./mapTypes";

/*
 * Small offline foundation.
 *
 * These coordinates are packaged inside the application.
 * No internet connection is required.
 *
 * More detailed campus/building/road data can be added
 * later without changing the routing engine.
 */

export const zambiaMapNodes: MapNode[] = [
  {
    id: "lusaka-center",
    name: "Lusaka Centre",
    latitude: -15.4167,
    longitude: 28.2833,
    type: "landmark",
  },

  {
    id: "cbu",
    name: "Copperbelt University",
    latitude: -12.8106,
    longitude: 28.2132,
    type: "campus",
  },

  {
    id: "ndola-center",
    name: "Ndola Centre",
    latitude: -12.9680,
    longitude: 28.6337,
    type: "landmark",
  },

  {
    id: "kitwe-center",
    name: "Kitwe Centre",
    latitude: -12.8024,
    longitude: 28.2132,
    type: "landmark",
  },
];

/* =========================================================
   MAP CONNECTIONS
   ========================================================= */

export const zambiaMapEdges: MapEdge[] = [
  {
    from: "lusaka-center",
    to: "cbu",
    distance: 330000,
  },

  {
    from: "cbu",
    to: "ndola-center",
    distance: 11000,
  },

  {
    from: "ndola-center",
    to: "kitwe-center",
    distance: 60000,
  },

  {
    from: "cbu",
    to: "kitwe-center",
    distance: 1000,
  },
];

/* =========================================================
   COMPLETE OFFLINE MAP
   ========================================================= */

export const zambiaOfflineMap: MapData = {
  name: "Zambia Offline Map",
  nodes: zambiaMapNodes,
  edges: zambiaMapEdges,
};

/*
 * Compatibility alias.
 *
 * Navigation.tsx can use mapNodes directly.
 */
export const mapNodes = zambiaMapNodes;

/* =========================================================
   FIND NODE
   ========================================================= */

export function getMapNode(
  id: string,
): MapNode | undefined {
  return zambiaMapNodes.find(
    (node) => node.id === id,
  );
}

/* =========================================================
   DISTANCE
   ========================================================= */

export function calculateDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const earthRadius = 6371000;

  const lat1 =
    (latitude1 * Math.PI) / 180;

  const lat2 =
    (latitude2 * Math.PI) / 180;

  const deltaLat =
    ((latitude2 - latitude1) *
      Math.PI) /
    180;

  const deltaLon =
    ((longitude2 - longitude1) *
      Math.PI) /
    180;

  const a =
    Math.sin(deltaLat / 2) *
      Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a),
    );

  return earthRadius * c;
}

/* =========================================================
   NEAREST NODE
   ========================================================= */

export function getNearestMapNode(
  latitude: number,
  longitude: number,
): MapNode | undefined {
  if (zambiaMapNodes.length === 0) {
    return undefined;
  }

  let nearest =
    zambiaMapNodes[0];

  let nearestDistance =
    Number.POSITIVE_INFINITY;

  for (const node of zambiaMapNodes) {
    const distance =
      calculateDistance(
        latitude,
        longitude,
        node.latitude,
        node.longitude,
      );

    if (distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  }

  return nearest;
}

/* =========================================================
   COORDINATE HELPER
   ========================================================= */

export function getNodeCoordinate(
  node: MapNode,
): Coordinate {
  return {
    latitude: node.latitude,
    longitude: node.longitude,
  };
}
