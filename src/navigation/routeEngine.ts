/* =========================================================
   BEMBATRANSLATE
   OFFLINE ROUTE ENGINE
   Dijkstra shortest-path routing
   ========================================================= */

import type {
  Coordinate,
  MapData,
  MapEdge,
  MapNode,
  RouteResult,
  RouteStep,
} from "./mapTypes";

/* =========================================================
   DISTANCE
   ========================================================= */

function coordinateDistance(
  a: Coordinate,
  b: Coordinate,
): number {
  const earthRadius = 6371000;

  const lat1 =
    (a.latitude * Math.PI) / 180;

  const lat2 =
    (b.latitude * Math.PI) / 180;

  const deltaLat =
    ((b.latitude - a.latitude) *
      Math.PI) /
    180;

  const deltaLon =
    ((b.longitude - a.longitude) *
      Math.PI) /
    180;

  const value =
    Math.sin(deltaLat / 2) *
      Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const safeValue = Math.min(
    1,
    Math.max(0, value),
  );

  const c =
    2 *
    Math.atan2(
      Math.sqrt(safeValue),
      Math.sqrt(1 - safeValue),
    );

  return earthRadius * c;
}

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

/* =========================================================
   DIRECTION
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
   FIND SHORTEST ROUTE
   ========================================================= */

export function findRoute(
  map: MapData,
  startId: string,
  destinationId: string,
): RouteResult | null {
  const startNode =
    map.nodes.find(
      (node) =>
        node.id === startId,
    );

  const destinationNode =
    map.nodes.find(
      (node) =>
        node.id ===
        destinationId,
    );

  if (
    !startNode ||
    !destinationNode
  ) {
    return null;
  }

  /* -------------------------------------------------------
     Same destination
  ------------------------------------------------------- */

  if (
    startId === destinationId
  ) {
    return {
      nodes: [startNode],
      steps: [],
      distance: 0,
    };
  }

  /* -------------------------------------------------------
     Dijkstra state
  ------------------------------------------------------- */

  const distances =
    new Map<
      string,
      number
    >();

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

  /* -------------------------------------------------------
     Main Dijkstra loop
  ------------------------------------------------------- */

  while (
    unvisited.size > 0
  ) {
    let currentId:
      | string
      | null = null;

    let currentDistance =
      Number.POSITIVE_INFINITY;

    for (
      const nodeId of unvisited
    ) {
      const distance =
        distances.get(
          nodeId,
        ) ??
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

  /* -------------------------------------------------------
     Check destination
  ------------------------------------------------------- */

  const destinationDistance =
    distances.get(
      destinationId,
    );

  if (
    destinationDistance ===
      undefined ||
    !Number.isFinite(
      destinationDistance,
    )
  ) {
    return null;
  }

  /* -------------------------------------------------------
     Rebuild route IDs
  ------------------------------------------------------- */

  const routeIds: string[] =
    [];

  let current:
    | string
    | null =
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

  /* -------------------------------------------------------
     Convert IDs to nodes
  ------------------------------------------------------- */

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

  if (
    routeNodes.length === 0
  ) {
    return null;
  }

  /* -------------------------------------------------------
     Build route steps
  ------------------------------------------------------- */

  const steps: RouteStep[] =
    [];

  for (
    let index = 0;
    index <
    routeNodes.length - 1;
    index += 1
  ) {
    const from =
      routeNodes[index];

    const to =
      routeNodes[index + 1];

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

    const stepDistance =
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
      distance:
        stepDistance,
      bearing,
      direction:
        bearingToDirection(
          bearing,
        ),
    });
  }

  return {
    nodes: routeNodes,
    steps,
    distance:
      destinationDistance,
  };
}

/* =========================================================
   FIND NEAREST NODE
   ========================================================= */

export function findNearestNode(
  map: MapData,
  latitude: number,
  longitude: number,
): MapNode | null {
  if (
    map.nodes.length === 0
  ) {
    return null;
  }

  const current: Coordinate =
    {
      latitude,
      longitude,
    };

  let nearest =
    map.nodes[0];

  let nearestDistance =
    Number.POSITIVE_INFINITY;

  for (
    const node of map.nodes
  ) {
    const distance =
      coordinateDistance(
        current,
        node.coordinate,
      );

    if (
      distance <
      nearestDistance
    ) {
      nearest =
        node;

      nearestDistance =
        distance;
    }
  }

  return nearest;
}
