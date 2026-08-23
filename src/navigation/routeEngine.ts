/* =========================================================
   BEMBATRANSLATE
   OFFLINE ROUTE ENGINE
   ========================================================= */

import type {
  MapData,
  MapNode,
  MapEdge,
  RouteResult,
  RouteStep,
  Coordinate,
} from "./mapTypes";

/* =========================================================
   CONNECTED EDGES
   ========================================================= */

function getConnectedEdges(
  nodeId: string,
  edges: MapEdge[],
): MapEdge[] {
  return edges.filter(
    (edge) =>
      edge.from === nodeId ||
      edge.to === nodeId,
  );
}

/* =========================================================
   OPPOSITE NODE
   ========================================================= */

function getOtherNode(
  edge: MapEdge,
  nodeId: string,
): string {
  return edge.from === nodeId
    ? edge.to
    : edge.from;
}

/* =========================================================
   FIND NEAREST NODE
   ========================================================= */

export function findNearestNode(
  map: MapData,
  latitude: number,
  longitude: number,
): MapNode | null {
  if (map.nodes.length === 0) {
    return null;
  }

  let nearest: MapNode | null =
    map.nodes[0];

  let nearestDistance =
    Number.POSITIVE_INFINITY;

  for (const node of map.nodes) {
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
   DISTANCE BETWEEN COORDINATES
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
   DIJKSTRA ROUTING
   ========================================================= */

export function findRoute(
  map: MapData,
  startId: string,
  destinationId: string,
): RouteResult | null {
  const startNode =
    map.nodes.find(
      (node) => node.id === startId,
    );

  const destinationNode =
    map.nodes.find(
      (node) => node.id === destinationId,
    );

  if (
    !startNode ||
    !destinationNode
  ) {
    return null;
  }

  if (startId === destinationId) {
    return {
      nodes: [startNode],
      steps: [],
      distance: 0,
    };
  }

  const distances =
    new Map<string, number>();

  const previous =
    new Map<
      string,
      string | null
    >();

  const unvisited =
    new Set<string>();

  for (const node of map.nodes) {
    distances.set(
      node.id,
      Number.POSITIVE_INFINITY,
    );

    previous.set(
      node.id,
      null,
    );

    unvisited.add(node.id);
  }

  distances.set(
    startId,
    0,
  );

  while (
    unvisited.size > 0
  ) {
    let currentId:
      string | null = null;

    let currentDistance =
      Number.POSITIVE_INFINITY;

    for (
      const nodeId of unvisited
    ) {
      const distance =
        distances.get(nodeId) ??
        Number.POSITIVE_INFINITY;

      if (
        distance <
        currentDistance
      ) {
        currentDistance =
          distance;

        currentId =
          nodeId;
      }
    }

    if (
      currentId === null
    ) {
      break;
    }

    unvisited.delete(
      currentId,
    );

    if (
      currentId ===
      destinationId
    ) {
      break;
    }

    const connectedEdges =
      getConnectedEdges(
        currentId,
        map.edges,
      );

    for (
      const edge of connectedEdges
    ) {
      const neighbourId =
        getOtherNode(
          edge,
          currentId,
        );

      if (
        !unvisited.has(
          neighbourId,
        )
      ) {
        continue;
      }

      const newDistance =
        currentDistance +
        edge.distance;

      const oldDistance =
        distances.get(
          neighbourId,
        ) ??
        Number.POSITIVE_INFINITY;

      if (
        newDistance <
        oldDistance
      ) {
        distances.set(
          neighbourId,
          newDistance,
        );

        previous.set(
          neighbourId,
          currentId,
        );
      }
    }
  }

  const totalDistance =
    distances.get(
      destinationId,
    );

  if (
    totalDistance ===
      undefined ||
    !Number.isFinite(
      totalDistance,
    )
  ) {
    return null;
  }

  /* =======================================================
     REBUILD NODE PATH
     ======================================================= */

  const routeIds: string[] =
    [];

  let current:
    string | null =
    destinationId;

  while (
    current !== null
  ) {
    routeIds.unshift(
      current,
    );

    current =
      previous.get(
        current,
      ) ?? null;
  }

  if (
    routeIds.length === 0 ||
    routeIds[0] !== startId
  ) {
    return null;
  }

  const routeNodes: MapNode[] =
    routeIds
      .map(
        (id) =>
          map.nodes.find(
            (node) =>
              node.id === id,
          ),
      )
      .filter(
        (
          node,
        ): node is MapNode =>
          node !== undefined,
      );

  /* =======================================================
     BUILD STEPS
     ======================================================= */

  const steps: RouteStep[] =
    [];

  for (
    let index = 0;
    index <
    routeNodes.length - 1;
    index++
  ) {
    const from =
      routeNodes[index];

    const to =
      routeNodes[index + 1];

    const edge =
      map.edges.find(
        (item) =>
          (item.from ===
            from.id &&
            item.to ===
              to.id) ||
          (item.from ===
            to.id &&
            item.to ===
              from.id),
      );

    steps.push({
      from: from.id,
      to: to.id,
      distance:
        edge?.distance ??
        calculateDistance(
          from.latitude,
          from.longitude,
          to.latitude,
          to.longitude,
        ),
    });
  }

  return {
    nodes: routeNodes,
    steps,
    distance:
      totalDistance,
  };
}

/* =========================================================
   COMPATIBILITY ROUTE FUNCTION
   ========================================================= */

export function calculateRoute(
  map: MapData,
  startId?: string,
  destinationId?: string,
): RouteResult | null {
  if (
    !startId ||
    !destinationId
  ) {
    return null;
  }

  return findRoute(
    map,
    startId,
    destinationId,
  );
}

/* =========================================================
   WALKING TIME
   ========================================================= */

export function estimateWalkingTime(
  distanceMeters: number,
): number {
  /*
   * Average walking speed:
   * approximately 1.4 metres/second.
   */

  const walkingSpeed =
    1.4;

  return Math.ceil(
    distanceMeters /
      walkingSpeed /
      60,
  );
}

/* =========================================================
   FORMAT DISTANCE
   ========================================================= */

export function formatDistance(
  distanceMeters: number,
): string {
  if (
    distanceMeters < 1000
  ) {
    return `${Math.round(
      distanceMeters,
    )} m`;
  }

  return `${(
    distanceMeters / 1000
  ).toFixed(1)} km`;
}

/* =========================================================
   BEARING
   ========================================================= */

export function calculateBearing(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const lat1 =
    (latitude1 * Math.PI) / 180;

  const lat2 =
    (latitude2 * Math.PI) / 180;

  const deltaLongitude =
    ((longitude2 - longitude1) *
      Math.PI) /
    180;

  const y =
    Math.sin(
      deltaLongitude,
    ) *
    Math.cos(lat2);

  const x =
    Math.cos(lat1) *
      Math.sin(lat2) -
    Math.sin(lat1) *
      Math.cos(lat2) *
      Math.cos(
        deltaLongitude,
      );

  const bearing =
    (Math.atan2(y, x) *
      180) /
    Math.PI;

  return (
    (bearing + 360) % 360
  );
}

/* =========================================================
   BEARING TO DIRECTION
   ========================================================= */

export function bearingToDirection(
  bearing: number,
): string {
  const directions = [
    "north",
    "north-east",
    "east",
    "south-east",
    "south",
    "south-west",
    "west",
    "north-west",
  ];

  const index =
    Math.round(
      bearing / 45,
    ) % 8;

  return directions[index];
}

/* =========================================================
   DIRECTION TEXT
   ========================================================= */

export function getDirectionText(
  from: Coordinate,
  to: Coordinate,
): string {
  const bearing =
    calculateBearing(
      from.latitude,
      from.longitude,
      to.latitude,
      to.longitude,
    );

  return `Head ${bearingToDirection(
    bearing,
  )}`;
}
