export type MapNodeType =
  | "path"
  | "place"
  | "landmark"
  | "road"
  | "building";

export type MapNode = {
  id: string;
  latitude: number;
  longitude: number;
  name?: string;
  type: MapNodeType;
};

export type MapPath = {
  id: string;
  from: string;
  to: string;
  distance?: number;
  walking?: boolean;
};

export type RouteResult = {
  nodes: MapNode[];
  distanceMeters: number;
  estimatedWalkingSeconds: number;
};
