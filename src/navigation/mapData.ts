export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

export type MapNode = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type?: "building" | "road" | "landmark" | "entrance" | "other";
};

export type MapEdge = {
  from: string;
  to: string;
  distance: number;
};

export type MapData = {
  name: string;
  nodes: MapNode[];
  edges: MapEdge[];
};

export type RouteNode = MapNode;

export type RouteResult = {
  nodes: RouteNode[];
  distance: number;
};

export type GPSLocation = MapCoordinate & {
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
};
