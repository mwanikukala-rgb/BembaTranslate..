/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION TYPES
   ========================================================= */

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type MapNodeType =
  | "landmark"
  | "building"
  | "road"
  | "entrance"
  | "campus";

export type MapNode = {
  id: string;
  name: string;

  /*
   * Keep latitude/longitude because the current map data
   * and navigation UI use these directly.
   */
  latitude: number;
  longitude: number;

  /*
   * Coordinate is the standard representation used by
   * the route engine.
   */
  coordinate: Coordinate;

  type?: MapNodeType;
  description?: string;
};

export type MapEdge = {
  from: string;
  to: string;
  distance: number;
  bidirectional?: boolean;
};

export type MapData = {
  name: string;
  nodes: MapNode[];
  edges: MapEdge[];
};

export type RouteStep = {
  from: MapNode;
  to: MapNode;
  distance: number;
  bearing?: number;
  direction?: string;
};

export type RouteResult = {
  nodes: MapNode[];
  steps: RouteStep[];
  distance: number;
};
