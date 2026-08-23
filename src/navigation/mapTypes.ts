/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION MAP TYPES

   Shared types for:
   - GPS coordinates
   - Zambia offline map
   - Map nodes
   - Map connections
   - Route calculation
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
     Raw coordinates are kept directly on every map node.
     This matches the locally packaged Zambia map data.
  */
  latitude: number;
  longitude: number;

  /*
     Convenience coordinate object used by the route engine.
  */
  coordinate: Coordinate;
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
   COMPLETE MAP DATA
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
