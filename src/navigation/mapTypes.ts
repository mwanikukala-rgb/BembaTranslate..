export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type MapNode = {
  id: string;
  name: string;
  coordinate: Coordinate;
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
  nodeId: string;
  name: string;
  coordinate: Coordinate;
  distance: number;
};

export type RouteResult = {
  found: boolean;
  distance: number;
  steps: RouteStep[];
  nodes: string[];
};
