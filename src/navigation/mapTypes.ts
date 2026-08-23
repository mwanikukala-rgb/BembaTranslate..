/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION TYPES
   ========================================================= */

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type MapNode = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type MapEdge = {
  from: string;
  to: string;
  distance: number;
};

export type MapData = {
  nodes: MapNode[];
  edges: MapEdge[];
};

export type RouteStep = {
  from: string;
  to: string;
  distance: number;
};

export type RouteResult = {
  nodes: MapNode[];
  steps: RouteStep[];
  totalDistance: number;
};
