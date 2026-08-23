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

  type?: string;

  coordinate?: Coordinate;
};

export type MapEdge = {
  from: string;
  to: string;
  distance: number;
};

export type MapData = {
  name?: string;
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
  distance: number;
};
