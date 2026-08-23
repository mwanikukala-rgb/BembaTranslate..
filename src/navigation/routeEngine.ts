import type {
  MapNode,
  RouteResult,
  RouteStep,
  Coordinate,
} from "./mapTypes";

function distanceBetween(
  a: Coordinate,
  b: Coordinate
): number {
  const earthRadius = 6371000;

  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;

  const deltaLat =
    ((b.latitude - a.latitude) * Math.PI) / 180;

  const deltaLon =
    ((b.longitude - a.longitude) * Math.PI) / 180;

  const value =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

  const arc =
    2 *
    Math.atan2(
      Math.sqrt(value),
      Math.sqrt(1 - value)
    );

  return earthRadius * arc;
}

function findNearestNode(
  position: Coordinate,
  nodes: MapNode[]
): MapNode | null {
  if (nodes.length === 0) {
    return null;
  }

  let nearest = nodes[0];
  let nearestDistance = distanceBetween(
    position,
    nearest.coordinate
  );

  for (let index = 1; index < nodes.length; index += 1) {
    const node = nodes[index];

    const distance = distanceBetween(
      position,
      node.coordinate
    );

    if (distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function calculateTotalDistance(
  nodes: MapNode[]
): number {
  let total = 0;

  for (let index = 1; index < nodes.length; index += 1) {
    total += distanceBetween(
      nodes[index - 1].coordinate,
      nodes[index].coordinate
    );
  }

  return total;
}

function createStep(
  from: MapNode,
  to: MapNode
): RouteStep {
  const distance = distanceBetween(
    from.coordinate,
    to.coordinate
  );

  return {
    from: from.name,
    to: to.name,
    distance,
  };
}

/*
 * Simple offline route calculation.
 *
 * This first version uses the locally packaged map nodes.
 * It does not require internet access.
 *
 * The map can later be expanded with:
 * - roads
 * - paths
 * - buildings
 * - campuses
 * - towns
 * - provinces
 * - Zambia-wide road data
 */

export function calculateRoute(
  start: Coordinate,
  destination: Coordinate,
  nodes: MapNode[]
): RouteResult | null {
  if (nodes.length === 0) {
    return null;
  }

  const startNode = findNearestNode(start, nodes);
  const destinationNode = findNearestNode(
    destination,
    nodes
  );

  if (!startNode || !destinationNode) {
    return null;
  }

  if (startNode.id === destinationNode.id) {
    return {
      nodes: [startNode],
      steps: [],
      distance: 0,
    };
  }

  /*
   * For the first offline navigation layer,
   * connect the nearest known points directly.
   *
   * A full road-network A* engine can replace this
   * later without changing the GPS/user interface.
   */

  const routeNodes: MapNode[] = [
    startNode,
    destinationNode,
  ];

  const steps: RouteStep[] = [
    createStep(
      startNode,
      destinationNode
    ),
  ];

  return {
    nodes: routeNodes,
    steps,
    distance: calculateTotalDistance(
      routeNodes
    ),
  };
}

export function formatDistance(
  distance: number
): string {
  if (distance < 1000) {
    return `${Math.round(distance)} m`;
  }

  return `${(distance / 1000).toFixed(1)} km`;
}

export function estimateWalkingTime(
  distance: number
): number {
  /*
   * Average walking speed:
   * approximately 1.4 metres per second.
   */
  const walkingSpeed = 1.4;

  return Math.max(
    1,
    Math.ceil(distance / walkingSpeed / 60)
  );
}

export function getDirectionText(
  from: Coordinate,
  to: Coordinate
): string {
  const deltaLatitude =
    to.latitude - from.latitude;

  const deltaLongitude =
    to.longitude - from.longitude;

  const angle =
    (Math.atan2(
      deltaLongitude,
      deltaLatitude
    ) *
      180) /
    Math.PI;

  const normalized =
    (angle + 360) % 360;

  if (
    normalized >= 337.5 ||
    normalized < 22.5
  ) {
    return "Head north";
  }

  if (
    normalized >= 22.5 &&
    normalized < 67.5
  ) {
    return "Head north-east";
  }

  if (
    normalized >= 67.5 &&
    normalized < 112.5
  ) {
    return "Head east";
  }

  if (
    normalized >= 112.5 &&
    normalized < 157.5
  ) {
    return "Head south-east";
  }

  if (
    normalized >= 157.5 &&
    normalized < 202.5
  ) {
    return "Head south";
  }

  if (
    normalized >= 202.5 &&
    normalized < 247.5
  ) {
    return "Head south-west";
  }

  if (
    normalized >= 247.5 &&
    normalized < 292.5
  ) {
    return "Head west";
  }

  return "Head north-west";
}
