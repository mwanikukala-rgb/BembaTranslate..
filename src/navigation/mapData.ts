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
   NODE CREATOR
   ========================================================= */

function createNode(
  id: string,
  name: string,
  latitude: number,
  longitude: number,
  type: MapNode["type"],
  description?: string,
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
    description,
  };
}

/* =========================================================
   OFFLINE MAP NODES
   ========================================================= */

export const mapNodes: MapNode[] = [
  createNode(
    "lusaka-center",
    "Lusaka Centre",
    -15.4167,
    28.2833,
    "landmark",
    "Central Lusaka.",
  ),

  createNode(
    "cbu",
    "Copperbelt University",
    -12.8106,
    28.2132,
    "campus",
    "Copperbelt University campus.",
  ),

  createNode(
    "ndola-center",
    "Ndola Centre",
    -12.9680,
    28.6337,
    "landmark",
    "Ndola city centre.",
  ),

  createNode(
    "kitwe-center",
    "Kitwe Centre",
    -12.8024,
    28.2132,
    "landmark",
    "Kitwe city centre.",
  ),
];

/* =========================================================
   OFFLINE MAP EDGES
   ========================================================= */

export const mapEdges: MapEdge[] = [
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
   OFFLINE MAP
   ========================================================= */

export const offlineMap: MapData = {
  name: "Zambia Offline Map",
  nodes: mapNodes,
  edges: mapEdges,
};

/* =========================================================
   COMPATIBILITY EXPORTS
   ========================================================= */

export const zambiaMapNodes =
  mapNodes;

export const zambiaMapEdges =
  mapEdges;

export const zambiaOfflineMap =
  offlineMap;

/* =========================================================
   FIND NODE
   ========================================================= */

export function getMapNode(
  id: string,
): MapNode | undefined {
  return mapNodes.find(
    (node) => node.id === id,
  );
}

/* =========================================================
   HAVERSINE DISTANCE
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
   FIND NEAREST NODE
   ========================================================= */

export function getNearestMapNode(
  latitude: number,
  longitude: number,
): MapNode | undefined {
  if (mapNodes.length === 0) {
    return undefined;
  }

  let nearest = mapNodes[0];

  let nearestDistance =
    Number.POSITIVE_INFINITY;

  for (const node of mapNodes) {
    const distance =
      calculateDistance(
        latitude,
        longitude,
        node.latitude,
        node.longitude,
      );

    if (
      distance <
      nearestDistance
    ) {
      nearest = node;
      nearestDistance = distance;
    }
  }

  return nearest;
}
