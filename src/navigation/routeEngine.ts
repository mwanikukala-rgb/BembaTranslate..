/* =========================================================
   BEMBATRANSLATE
   OFFLINE ROUTE ENGINE
   ========================================================= */

import type {
  Coordinate,
  MapData,
  MapNode,
  RouteResult,
  RouteStep,
} from "./mapTypes";

/* =========================================================
   DISTANCE BETWEEN COORDINATES
   ========================================================= */

function coordinateDistance(
  first: Coordinate,
  second: Coordinate,
): number {
  const earthRadius = 6371000;

  const latitude1 =
    (first.latitude * Math.PI) / 180;

  const latitude2 =
    (second.latitude * Math.PI) / 180;

  const deltaLatitude =
    ((second.latitude -
      first.latitude) *
      Math.PI) /
    180;

  const deltaLongitude =
    ((second.longitude -
      first.longitude) *
      Math.PI) /
    180;

  const a =
    Math.sin(deltaLatitude / 2) *
      Math.sin(deltaLatitude / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const safeA = Math.max(
    0,
    Math.min(1, a),
  );

  const c =
    2 *
    Math.atan2(
      Math.sqrt(safeA),
      Math.sqrt(1 - safeA),
    );

  return earthRadius * c;
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
  const firstLatitude =
    (latitude1 * Math.PI) / 180;

  const secondLatitude =
    (latitude2 * Math.PI) / 180;

  const longitudeDifference =
    ((longitude2 - longitude1) *
      Math.PI) /
    180;

  const y =
    Math.sin(longitudeDifference) *
    Math.cos(secondLatitude);

  const x =
    Math.cos(firstLatitude) *
      Math.sin(secondLatitude) -
    Math.sin(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.cos(longitudeDifference);

  const bearing =
    (Math.atan2(y, x) * 180) /
    Math.PI;

  return (
    (bearing + 360) % 360
  );
}

/* =========================================================
   BEARING → DIRECTION
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
    Math.round(bearing / 45) %
    directions.length;

  return directions[index];
}

/* =========================================================
   DIRECTION TEXT
   ========================================================= */

export function getDirectionText(
  direction: string,
): string {
  const value =
    direction.toLowerCase();

  switch (value) {
    case "north":
      return "Walk north";

    case "north-east":
      return "Walk north-east";

    case "east":
      return "Walk east";

    case "south-east":
      return "Walk south-east";

    case "south":
      return "Walk south";

    case "south-west":
      return "Walk south-west";

    case "west":
      return "Walk west";

    case "north-west":
      return "Walk north-west";

    default:
      return `Continue ${direction}`;
  }
}

/* =========================================================
   WALKING TIME
   ========================================================= */

export function estimateWalkingTime(
  distance: number,
): number {
  const walkingSpeed =
    1.4;

  return Math.ceil(
    distance / walkingSpeed,
  );
}

/* =========================================================
   FORMAT DISTANCE
   ========================================================= */

export function formatDistance(
  distance: number,
): string {
  if (distance < 1000) {
    return `${Math.round(
      distance,
    )} m`;
  }

  return `${(
    distance / 1000
  ).toFixed(1)} km`;
}

/* =========================================================
   FIND ROUTE
   ========================================================= */

export function findRoute(
  map: MapData,
  startId: string,
  destinationId: string,
): RouteResult | null {
  const start =
    map.nodes.find(
      (node) =>
        node.id === startId,
    );

  const destination =
    map.nodes.find(
      (node) =>
        node.id === destinationId,
    );

  if (!start || !destination) {
    return null;
  }

  if (
    startId === destinationId
  ) {
    return {
      nodes: [start],
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

    unvisited.add(
      node.id,
    );
  }

  distances.set(
    startId,
    0,
  );

  while (
    unvisited.size > 0
  ) {
    let currentId:
      | string
      | null = null;

    let shortest =
      Number.POSITIVE_INFINITY;

    for (
      const id of unvisited
    ) {
      const distance =
        distances.get(id) ??
        Number.POSITIVE_INFINITY;

      if (
        distance < shortest
      ) {
        shortest = distance;
        currentId = id;
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

    const edges =
      map.edges.filter(
        (edge) =>
          edge.from ===
            currentId ||
          edge.to === currentId,
      );

    for (const edge of edges) {
      const neighbour =
        edge.from === currentId
          ? edge.to
          : edge.from;

      if (
        !unvisited.has(
          neighbour,
        )
      ) {
        continue;
      }

      const newDistance =
        shortest +
        edge.distance;

      const oldDistance =
        distances.get(
          neighbour,
        ) ??
        Number.POSITIVE_INFINITY;

      if (
        newDistance <
        oldDistance
      ) {
        distances.set(
          neighbour,
          newDistance,
        );

        previous.set(
          neighbour,
          currentId,
        );
      }
    }
  }

  const finalDistance =
    distances.get(
      destinationId,
    );

  if (
    finalDistance ===
      undefined ||
    !Number.isFinite(
      finalDistance,
    )
  ) {
    return null;
  }

  /* -------------------------------------------------------
     Rebuild route
  ------------------------------------------------------- */

  const ids: string[] = [];

  let current:
    | string
    | null =
    destinationId;

  while (
    current !== null
  ) {
    ids.unshift(current);

    current =
      previous.get(
        current,
      ) ?? null;
  }

  if (
    ids.length === 0 ||
    ids[0] !== startId
  ) {
    return null;
  }

  const nodes: MapNode[] =
    ids
      .map((id) =>
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

  const steps: RouteStep[] =
    [];

  for (
    let index = 0;
    index < nodes.length - 1;
    index += 1
  ) {
    const from =
      nodes[index];

    const to =
      nodes[index + 1];

    const edge =
      map.edges.find(
        (item) =>
          (
            item.from ===
              from.id &&
            item.to === to.id
          ) ||
          (
            item.from ===
              to.id &&
            item.to === from.id
          ),
      );

    const distance =
      edge?.distance ??
      coordinateDistance(
        from.coordinate,
        to.coordinate,
      );

    const bearing =
      calculateBearing(
        from.latitude,
        from.longitude,
        to.latitude,
        to.longitude,
      );

    steps.push({
      from,
      to,
      distance,
      bearing,
      direction:
        bearingToDirection(
          bearing,
        ),
    });
  }

  return {
    nodes,
    steps,
    distance:
      finalDistance,
  };
}

/* =========================================================
   CURRENT ROUTE API
   ========================================================= */

export function calculateRoute(
  map: MapData,
  startId: string,
  destinationId: string,
): RouteResult | null {
  return findRoute(
    map,
    startId,
    destinationId,
  );
}

/* =========================================================
   NEAREST NODE
   ========================================================= */

export function findNearestNode(
  map: MapData,
  latitude: number,
  longitude: number,
): MapNode | null {
  if (map.nodes.length === 0) {
    return null;
  }

  const current: Coordinate = {
    latitude,
    longitude,
  };

  let nearest =
    map.nodes[0];

  let nearestDistance =
    Number.POSITIVE_INFINITY;

  for (const node of map.nodes) {
    const distance =
      coordinateDistance(
        current,
        node.coordinate,
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
