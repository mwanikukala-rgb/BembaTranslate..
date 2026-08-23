/* =========================================================
   BEMBATRANSLATE
   OFFLINE WALKING ROUTE ENGINE
   ========================================================= */

import type {
  MapNode,
  MapPath,
  RouteResult,
} from "./mapTypes";

/* =========================================================
   DISTANCE
   ========================================================= */

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
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a),
    );

  return earthRadius * c;
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

/* =========================================================
   GRAPH
   ========================================================= */

type GraphEdge = {
  to: string;
  distance: number;
};

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

    graph.get(path.from)?.push({
      to: path.to,
      distance,
    });

    /*
     * Walking paths are currently
     * treated as bidirectional.
     */
    graph.get(path.to)?.push({
      to: path.from,
      distance,
    });
  }

  return graph;
}

/* =========================================================
   FIND NEAREST NODE
   ========================================================= */

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

/* =========================================================
   DIJKSTRA
   ========================================================= */

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

  if (!graph.has(startId)) {
    return [];
  }

  if (!graph.has(targetId)) {
    return [];
  }

  distances.set(startId, 0);

  while (unvisited.size > 0) {
    let currentId: string | null = null;
    let currentDistance = Infinity;

    for (const nodeId of unvisited) {
      const distance =
        distances.get(nodeId) ??
        Infinity;

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
        currentDistance +
        edge.distance;

      const oldDistance =
        distances.get(edge.to) ??
        Infinity;

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

  if (
    (distances.get(targetId) ??
      Infinity) === Infinity
  ) {
    return [];
  }

  const route: string[] = [];

  let current: string | null =
    targetId;

  while (current !== null) {
    route.unshift(current);

    if (current === startId) {
      break;
    }

    current =
      previous.get(current) ??
      null;
  }

  if (route[0] !== startId) {
    return [];
  }

  return route;
}

/* =========================================================
   WALKING ROUTE
   ========================================================= */

export function calculateWalkingRoute(
  start: MapNode,
  destination: MapNode,
  nodes: MapNode[],
  paths: MapPath[],
): RouteResult | null {
  if (nodes.length === 0) {
    return null;
  }

  const graph = buildGraph(
    nodes,
    paths,
  );

  const routeIds = dijkstra(
    graph,
    start.id,
    destination.id,
  );

  if (routeIds.length === 0) {
    return null;
  }

  const routeNodes: MapNode[] = [];

  for (const nodeId of routeIds) {
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
   * Average walking speed:
   * approximately 1.4 metres/second.
   */
  const walkingSpeed =
    1.4;

  const estimatedWalkingSeconds =
    totalDistance /
    walkingSpeed;

  return {
    nodes: routeNodes,
    distanceMeters: Math.round(
      totalDistance,
    ),
    estimatedWalkingSeconds:
      Math.round(
        estimatedWalkingSeconds,
      ),
  };
}

/* =========================================================
   FORMAT DISTANCE
   ========================================================= */

export function formatDistance(
  meters: number,
): string {
  if (!Number.isFinite(meters)) {
    return "0 m";
  }

  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  const kilometres =
    meters / 1000;

  return `${kilometres.toFixed(
    kilometres >= 10 ? 0 : 1,
  )} km`;
}

/* =========================================================
   FORMAT WALKING TIME
   ========================================================= */

export function formatWalkingTime(
  seconds: number,
): string {
  if (
    !Number.isFinite(seconds) ||
    seconds <= 0
  ) {
    return "0 min";
  }

  const minutes =
    Math.max(
      1,
      Math.round(seconds / 60),
    );

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours =
    Math.floor(minutes / 60);

  const remainingMinutes =
    minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}
