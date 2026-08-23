/* =========================================================
   BEMBATRANSLATE
   OFFLINE MAP DATA
   ========================================================= */

import type {
  Coordinate,
  MapData,
  MapEdge,
  MapNode,
} from "./mapTypes";

/* =========================================================
   HELPER
   ========================================================= */

function makeNode(
  id: string,
  name: string,
  latitude: number,
  longitude: number,
  type: MapNode["type"],
): MapNode {
  const coordinate: Coordinate = {
    latitude,
    longitude,
  };

  return {
    id,
    name,
    latitude,
    longitude,
    coordinate,
    type,
  };
}

/* =========================================================
   OFFLINE MAP NODES
   ========================================================= */

export const zambiaMapNodes: MapNode[] = [
  makeNode(
    "lusaka-center",
    "Lusaka Centre",
    -15.4167,
    28.2833,
    "landmark",
  ),

  makeNode(
    "cbu",
    "Copperbelt University",
    -12.8106,
    28.2132,
    "building",
  ),

  makeNode(
    "ndola-center",
    "Ndola Centre",
    -12.9680,
    28.6337,
    "landmark",
  ),

  makeNode(
    "kitwe-center",
    "Kitwe Centre",
    -12.8024,
    28.2132,
    "landmark",
  ),
];

/* =========================================================
   OFFLINE CONNECTIONS
   ========================================================= */

export const zambiaMapEdges: MapEdge[] = [
  {
    from: "lusaka-center",
    to: "cbu",
    distance: 330000,
    bidirectional: true,
  },

  {
    from: "cbu",
    to: "ndola-center",
    distance: 11000,
    bidirectional: true,
  },

  {
    from: "ndola-center",
    to: "kitwe-center",
    distance: 60000,
    bidirectional: true,
  },

  {
    from: "cbu",
    to: "kitwe-center",
    distance: 1000,
    bidirectional: true,
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
  if (
    zambiaMapNodes.length === 0
  ) {
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

    if (
      distance < nearestDistance
    ) {
      nearest = node;
      nearestDistance = distance;
    }
  }

  return nearest;
}
