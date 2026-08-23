import type {
  MapNode,
  MapPath,
  RouteResult,
} from "./mapTypes";

/*
 * =========================================================
 * BEMBATRANSLATE
 * OFFLINE WALKING ROUTE ENGINE
 *
 * This engine works completely offline.
 *
 * It uses:
 *   - packaged map nodes
 *   - packaged walking paths
 *   - GPS coordinates
 *
 * Later we can replace the sample map with real Zambia
 * map data without changing the routing algorithm.
 * =========================================================
 */

type GraphEdge = {
  to: string;
  distance: number;
};

/* ---------------------------------------------------------
   Distance between two GPS coordinates
   Haversine formula
--------------------------------------------------------- */

export function distanceBetweenCoordinates(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const earthRadius = 6371000;

  const lat1 = toRadians(latitude1);
  const lat2 = toRadians(latitude2);

  const deltaLat = toRadians(
    latitude2 - latitude1,
  );

  const deltaLon = toRadians(
    longitude2 - longitude1,
  );

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

/* ---------------------------------------------------------
   Convert degrees to radians
--------------------------------------------------------- */

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

/* ---------------------------------------------------------
   Build graph
--------------------------------------------------------- */

function buildGraph(
  nodes: MapNode[],
  paths: MapPath[],
): Map<string, GraphEdge[]> {
  const graph = new Map<
    string,
    GraphEdge[]
  >();

  for (const node of nodes) {
    graph.set(node.id, []);
  }

  for (const path of paths) {
    const fromNode = nodes.find(
      (node) => node.id === path.from,
    );

    const toNode = nodes.find(
      (node) => node.id === path.to,
    );

    if (!fromNode || !toNode) {
      continue;
    }

    const distance =
      path.distance ??
      distanceBetweenCoordinates(
        fromNode.latitude,
        fromNode.longitude,
        toNode.latitude,
        toNode.longitude,
      );

    graph
      .get(path.from)
      ?.push({
        to: path.to,
        distance,
      });

    /*
     * Walking paths are normally bidirectional.
     *
     * If later we need one-way roads,
     * mapTypes.ts can be extended with a
     * oneWay property.
     */
    graph
      .get(path.to)
      ?.push({
        to: path.from,
        distance,
      });
  }

  return graph;
}

/* ---------------------------------------------------------
   Find nearest map node to GPS position
--------------------------------------------------------- */

export function findNearestNode(
  latitude: number,
  longitude: number,
  nodes: MapNode[],
): MapNode | null {
  if (nodes.length === 0) {
    return null;
  }

  let nearest: MapNode | null = null;
  let shortestDistance = Infinity;

  for (const node of nodes) {
    const distance =
      distanceBetweenCoordinates(
        latitude,
        longitude,
        node.latitude,
        node.longitude,
      );

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearest = node;
    }
  }

  return nearest;
}

/* ---------------------------------------------------------
   Dijkstra shortest-path algorithm
--------------------------------------------------------- */

function dijkstra(
  graph: Map<string, GraphEdge[]>,
  startId: string,
  targetId: string,
): string[] {
  const distances = new Map<
    string,
    number
  >();

  const previous = new Map<
    string,
    string | null
  >();

  const unvisited = new Set<string>();

  for (const nodeId of graph.keys()) {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
    unvisited.add(nodeId);
  }

  distances.set(startId, 0);

  while (unvisited.size > 0) {
    let currentId: string | null = null;
    let currentDistance = Infinity;

    for (const nodeId of unvisited) {
      const distance =
        distances.get(nodeId) ?? Infinity;

      if (distance < currentDistance) {
        currentDistance = distance;
        currentId = nodeId;
      }
    }

    if (currentId === null) {
      break;
    }

    unvisited.delete(currentId);

    if (currentId === targetId) {
      break;
    }

    const neighbours =
      graph.get(currentId) ?? [];

    for (const edge of neighbours) {
      if (!unvisited.has(edge.to)) {
        continue;
      }

      const newDistance =
        currentDistance + edge.distance;

      const oldDistance =
        distances.get(edge.to) ?? Infinity;

      if (newDistance < oldDistance) {
        distances.set(
          edge.to,
          newDistance,
        );

        previous.set(
          edge.to,
          currentId,
        );
      }
    }
  }

  /*
   * Reconstruct route.
   */
  const route: string[] = [];

  let current: string | null = targetId;

  while (current !== null) {
    route.unshift(current);

    if (current === startId) {
      break;
    }

    current =
      previous.get(current) ?? null;
  }

  /*
   * No route found.
   */
  if (route[0] !== startId) {
    return [];
  }

  return route;
}

/* ---------------------------------------------------------
   Calculate walking route
--------------------------------------------------------- */

export function calculateWalkingRoute(
  start: MapNode,
  destination: MapNode,
  nodes: MapNode[],
  paths: MapPath[],
): RouteResult | null {
  if (
    nodes.length === 0 ||
    paths.length === 0
  ) {
    return null;
  }

  const graph = buildGraph(
    nodes,
    paths,
  );

  const nodeIds = dijkstra(
    graph,
    start.id,
    destination.id,
  );

  if (nodeIds.length === 0) {
    return null;
  }

  const routeNodes: MapNode[] = [];

  for (const nodeId of nodeIds) {
    const node = nodes.find(
      (item) => item.id === nodeId,
    );

    if (node) {
      routeNodes.push(node);
    }
  }

  if (routeNodes.length === 0) {
    return null;
  }

  let totalDistance = 0;

  for (
    let index = 1;
    index < routeNodes.length;
    index++
  ) {
    totalDistance +=
      distanceBetweenCoordinates(
        routeNodes[index - 1].latitude,
        routeNodes[index - 1].longitude,
        routeNodes[index].latitude,
        routeNodes[index].longitude,
      );
  }

  /*
   * Average walking speed.
   *
   * Later this can be adjusted depending
   * on user settings or terrain.
   */
  const walkingSpeedMetersPerSecond = 1.4;

  const estimatedWalkingSeconds =
    totalDistance /
    walkingSpeedMetersPerSecond;

  return {
    nodes: routeNodes,

    distanceMeters:
      Math.round(totalDistance),

    estimatedWalkingSeconds:
      Math.round(
        estimatedWalkingSeconds,
      ),
  };
}

/* ---------------------------------------------------------
   Format distance for the UI
--------------------------------------------------------- */

export function formatDistance(
  meters: number,
): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / 1000).toFixed(1)} km`;
}

/* ---------------------------------------------------------
   Format walking time
--------------------------------------------------------- */

export function formatWalkingTime(
  seconds: number,
): string {
  const minutes = Math.max(
    1,
    Math.round(seconds / 60),
  );

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  const remainingMinutes =
    minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

/* ---------------------------------------------------------
   Bearing between two points
--------------------------------------------------------- */

export function calculateBearing(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const lat1 = toRadians(latitude1);
  const lat2 = toRadians(latitude2);

  const deltaLongitude = toRadians(
    longitude2 - longitude1,
  );

  const y =
    Math.sin(deltaLongitude) *
    Math.cos(lat2);

  const x =
    Math.cos(lat1) *
      Math.sin(lat2) -
    Math.sin(lat1) *
      Math.cos(lat2) *
      Math.cos(deltaLongitude);

  const bearing =
    (Math.atan2(y, x) * 180) /
    Math.PI;

  return (
    (bearing + 360) % 360
  );
}

/* ---------------------------------------------------------
   Convert bearing to human direction
--------------------------------------------------------- */

export function bearingToDirection(
  bearing: number,
): string {
  if (
    bearing >= 337.5 ||
    bearing < 22.5
  ) {
    return "north";
  }

  if (
    bearing >= 22.5 &&
    bearing < 67.5
  ) {
    return "north-east";
  }

  if (
    bearing >= 67.5 &&
    bearing < 112.5
  ) {
    return "east";
  }

  if (
    bearing >= 112.5 &&
    bearing < 157.5
  ) {
    return "south-east";
  }

  if (
    bearing >= 157.5 &&
    bearing < 202.5
  ) {
    return "south";
  }

  if (
    bearing >= 202.5 &&
    bearing < 247.5
  ) {
    return "south-west";
  }

  if (
    bearing >= 247.5 &&
    bearing < 292.5
  ) {
    return "west";
  }

  return "north-west";
}
