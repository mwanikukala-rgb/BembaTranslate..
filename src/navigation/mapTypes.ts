/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION MAP TYPES
   ========================================================= */

export type Coordinate = {
  latitude: number;
  longitude: number;
};

/* =========================================================
   MAP NODE
   ========================================================= */

export type MapNode = {
  id: string;
  name: string;

  /*
   * Existing offline map data stores coordinates this way.
   */
  latitude: number;
  longitude: number;

  /*
   * Optional convenience coordinate object.
   * Existing map data does not need to define it.
   */
  coordinate?: Coordinate;
};

/* =========================================================
   MAP EDGE
   ========================================================= */

export type MapEdge = {
  from: string;
  to: string;
  distance: number;
};

/* =========================================================
   MAP DATA
   ========================================================= */

export type MapData = {
  nodes: MapNode[];
  edges: MapEdge[];
};

/* =========================================================
   ROUTE STEP
   ========================================================= */

export type RouteStep = {
  from: string;
  to: string;
  distance: number;
};

/* =========================================================
   ROUTE RESULT
   ========================================================= */

export type RouteResult = {
  nodes: MapNode[];
  steps: RouteStep[];
  distance: number;
};
