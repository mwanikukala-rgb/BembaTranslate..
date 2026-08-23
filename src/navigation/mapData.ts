/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION MAP DATA

   First Zambia map foundation.

   These are locally packaged map points.
   No internet is required to read them.

   IMPORTANT:
   This is the foundation of the navigation system.
   We can expand this later with thousands of roads,
   buildings, paths and landmarks.
   ========================================================= */

import type {
  MapData,
  MapEdge,
  MapNode,
} from "./mapTypes";

/* =========================================================
   ZAMBIA MAP NODES
   ========================================================= */

export const mapNodes: MapNode[] = [
  {
    id: "lusaka",
    name: "Lusaka",
    latitude: -15.3875,
    longitude: 28.3228,
  },

  {
    id: "lusaka-city-centre",
    name: "Lusaka City Centre",
    latitude: -15.4167,
    longitude: 28.2833,
  },

  {
    id: "cairo-road",
    name: "Cairo Road",
    latitude: -15.4167,
    longitude: 28.2800,
  },

  {
    id: "freedom-way",
    name: "Freedom Way",
    latitude: -15.4230,
    longitude: 28.2870,
  },

  {
    id: "arcades",
    name: "Arcades",
    latitude: -15.3940,
    longitude: 28.3240,
  },

  {
    id: "eastpark",
    name: "East Park Mall",
    latitude: -15.3958,
    longitude: 28.3295,
  },

  {
    id: "mandahill",
    name: "Manda Hill",
    latitude: -15.3915,
    longitude: 28.3190,
  },

  {
    id: "unza",
    name: "University of Zambia",
    latitude: -15.3969,
    longitude: 28.3360,
  },

  {
    id: "cbu",
    name: "Copperbelt University",
    latitude: -12.8024,
    longitude: 28.2132,
  },

  {
    id: "kitwe",
    name: "Kitwe",
    latitude: -12.8024,
    longitude: 28.2132,
  },

  {
    id: "ndola",
    name: "Ndola",
    latitude: -12.9587,
    longitude: 28.6366,
  },

  {
    id: "livingstone",
    name: "Livingstone",
    latitude: -17.8419,
    longitude: 25.8543,
  },

  {
    id: "chipata",
    name: "Chipata",
    latitude: -13.6333,
    longitude: 32.6500,
  },

  {
    id: "kabushi",
    name: "Kabushi",
    latitude: -12.9667,
    longitude: 28.6333,
  },

  {
    id: "kabwe",
    name: "Kabwe",
    latitude: -14.4469,
    longitude: 28.4464,
  },
];

/* =========================================================
   MAP CONNECTIONS
   ========================================================= */

export const mapEdges: MapEdge[] = [
  {
    from: "lusaka",
    to: "lusaka-city-centre",
    distance: 0,
  },

  {
    from: "lusaka-city-centre",
    to: "cairo-road",
    distance: 0,
  },

  {
    from: "cairo-road",
    to: "freedom-way",
    distance: 0,
  },

  {
    from: "lusaka",
    to: "arcades",
    distance: 0,
  },

  {
    from: "arcades",
    to: "eastpark",
    distance: 0,
  },

  {
    from: "arcades",
    to: "unza",
    distance: 0,
  },

  {
    from: "lusaka",
    to: "mandahill",
    distance: 0,
  },

  {
    from: "mandahill",
    to: "cairo-road",
    distance: 0,
  },

  {
    from: "lusaka",
    to: "kabwe",
    distance: 0,
  },

  {
    from: "kabwe",
    to: "ndola",
    distance: 0,
  },

  {
    from: "ndola",
    to: "kitwe",
    distance: 0,
  },

  {
    from: "kitwe",
    to: "cbu",
    distance: 0,
  },

  {
    from: "livingstone",
    to: "lusaka",
    distance: 0,
  },

  {
    from: "lusaka",
    to: "chipata",
    distance: 0,
  },
];

/* =========================================================
   COMPLETE MAP DATA OBJECT
   ========================================================= */

export const zambiaMap: MapData = {
  nodes: mapNodes,
  edges: mapEdges,
};
