import type {
  MapData,
  MapNode,
  MapEdge,
  RouteResult,
} from "./mapTypes";

/*
 * Offline route engine
 *
 * This calculates routes using the map data
 * stored inside the application.
 *
 * No internet connection is required.
 */

/* ---------------------------------------------------------
   Find connected edges
--------------------------------------------------------- */

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

/* ---------------------------------------------------------
   Get the opposite node
--------------------------------------------------------- */

function getOtherNode(
  edge: MapEdge,
  nodeId: string,
): string {
  return edge.from === nodeId
    ? edge.to
    : edge.from;
}

/* ---------------------------------------------------------
   Find the shortest route
   Dijkstra's algorithm
--------------------------------------------------------- */

export function findRoute(
  map: MapData,
  startId: string,
  destinationId: string,
): RouteResult | null {
  const startNode = map.nodes.find(
    (node) => node.id === startId,
  );

  const destinationNode =
    map.nodes.find(
      (node) => node.id === destinationId,
    );

  if (!startNode || !destinationNode) {
    return null;
  }

  if (startId === destinationId) {
    return {
      nodes: [startNode],
      distance: 0,
    };
  }

  const distances = new Map<
    string,
    number
  >();

  const previous = new Map<
    string,
    string | null
  >();

  const unvisited = new Set<string>();

  for (const node of map.nodes) {
    distances.set(
      node.id,
      Number.POSITIVE_INFINITY,
    );

    previous.set(node.id, null);

    unvisited.add(node.id);
  }

  distances.set(startId, 0);

  while (unvisited.size > 0) {
    let currentId: string | null = null;

    let currentDistance =
      Number.POSITIVE_INFINITY;

    for (const nodeId of unvisited) {
      const distance =
        distances.get(nodeId) ??
        Number.POSITIVE_INFINITY;

      if (distance < currentDistance) {
        currentDistance = distance;
        currentId = nodeId;
      }
    }

    if (currentId === null) {
      break;
    }

    if (currentId === destinationId) {
      break;
    }

    unvisited.delete(currentId);

    const connectedEdges =
      getConnectedEdges(
        currentId,
        map.edges,
      );

    for (const edge of connectedEdges) {
      const neighbourId =
        getOtherNode(
          edge,
          currentId,
        );

      if (!unvisited.has(neighbourId)) {
        continue;
      }

      const newDistance =
        currentDistance +
        edge.distance;

      const oldDistance =
        distances.get(neighbourId) ??
        Number.POSITIVE_INFINITY;

      if (newDistance < oldDistance) {
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

  const destinationDistance =
    distances.get(destinationId);

  if (
    destinationDistance === undefined ||
    !Number.isFinite(
      destinationDistance,
    )
  ) {
    return null;
  }

  /* -------------------------------------------------------
     Rebuild route
  ------------------------------------------------------- */

  const routeIds: string[] = [];

  let current: string | null =
    destinationId;

  while (current !== null) {
    routeIds.unshift(current);

    current = previous.get(current) ?? null;
  }

  if (
    routeIds.length === 0 ||
    routeIds[0] !== startId
  ) {
    return null;
  }

  const routeNodes: MapNode[] =
    routeIds
      .map((id) =>
        map.nodes.find(
          (node) => node.id === id,
        ),
      )
      .filter(
        (
          node,
        ): node is MapNode =>
          node !== undefined,
      );

  return {
    nodes: routeNodes,
    distance: destinationDistance,
  };
}

/* ---------------------------------------------------------
   Find nearest map point
--------------------------------------------------------- */

export function findNearestNode(
  map: MapData,
  latitude: number,
  longitude: number,
): MapNode | null {
  if (map.nodes.length === 0) {
    return null;
  }

  let nearest =
    map.nodes[0];

  let nearestDistance =
