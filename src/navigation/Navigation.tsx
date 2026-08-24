/* =========================================================
   BEMBATRANSLATE
   OFFLINE NAVIGATION
   Mobile-first • GPS • Offline routes
   Self-contained responsive styling
   ========================================================= */

import { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  RefreshCw,
  Route,
} from "lucide-react";

import {
  clearLocationWatch,
  getCurrentLocation,
  watchLocation,
  type GPSLocation,
  type GPSWatchId,
} from "./gps";

import { zambiaOfflineMap } from "./mapData";

import {
  calculateBearing,
  bearingToDirection,
  estimateWalkingTime,
  findNearestNode,
  findRoute,
  formatDistance,
} from "./routeEngine";

import type {
  MapNode,
  RouteResult,
} from "./mapTypes";

type NavigationProps = {
  onBack?: () => void;
};

export default function Navigation({
  onBack,
}: NavigationProps) {
  const [location, setLocation] =
    useState<GPSLocation | null>(null);

  const [destination, setDestination] =
    useState<MapNode | null>(null);

  const [route, setRoute] =
    useState<RouteResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [tracking, setTracking] =
    useState(false);

  const [error, setError] =
    useState("");

  const watchIdRef =
    useRef<GPSWatchId | null>(null);

  /* =======================================================
     GET CURRENT LOCATION
     ======================================================= */

  const locateUser = async () => {
    setLoading(true);
    setError("");

    try {
      const current =
        await getCurrentLocation();

      setLocation(current);
    } catch (err) {
      console.error(
        "Location error:",
        err,
      );

      setError(
        "Unable to get your location. Please enable GPS/location permission.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     START TRACKING
     ======================================================= */

  const startTracking = async () => {
    setError("");

    try {
      const current =
        await getCurrentLocation();

      setLocation(current);

      if (
        watchIdRef.current !== null
      ) {
        await clearLocationWatch(
          watchIdRef.current,
        );

        watchIdRef.current = null;
      }

      const watchId =
        await watchLocation(
          (nextLocation) => {
            setLocation(nextLocation);
          },
          (gpsError: unknown) => {
            console.error(
              "GPS tracking error:",
              gpsError,
            );

            setError(
              "GPS tracking stopped.",
            );

            setTracking(false);
          },
        );

      watchIdRef.current =
        watchId;

      setTracking(true);
    } catch (err) {
      console.error(
        "Tracking error:",
        err,
      );

      setTracking(false);

      setError(
        "Unable to start GPS tracking. Check your location permission.",
      );
    }
  };

  /* =======================================================
     STOP TRACKING
     ======================================================= */

  const stopTracking = async () => {
    if (
      watchIdRef.current !== null
    ) {
      try {
        await clearLocationWatch(
          watchIdRef.current,
        );
      } catch (err) {
        console.error(err);
      }

      watchIdRef.current = null;
    }

    setTracking(false);
  };

  /* =======================================================
     CLEANUP
     ======================================================= */

  useEffect(() => {
    return () => {
      if (
        watchIdRef.current !== null
      ) {
        clearLocationWatch(
          watchIdRef.current,
        ).catch(console.error);

        watchIdRef.current = null;
      }
    };
  }, []);

  /* =======================================================
     CALCULATE ROUTE
     ======================================================= */

  const calculateRouteTo = (
    node: MapNode,
  ) => {
    if (!location) {
      setRoute(null);

      setError(
        "Get your current location first.",
      );

      return;
    }

    const nearest =
      findNearestNode(
        zambiaOfflineMap,
        location.latitude,
        location.longitude,
      );

    if (!nearest) {
      setRoute(null);

      setError(
        "No offline map point is available near your location.",
      );

      return;
    }

    const newRoute =
      findRoute(
        zambiaOfflineMap,
        nearest.id,
        node.id,
      );

    if (!newRoute) {
      setRoute(null);

      setError(
        "No offline route is available between these locations yet.",
      );

      return;
    }

    setRoute(newRoute);
    setError("");
  };

  /* =======================================================
     DESTINATION
     ======================================================= */

  const chooseDestination = (
    node: MapNode,
  ) => {
    setDestination(node);
    calculateRouteTo(node);
  };

  /* =======================================================
     RECALCULATE
     ======================================================= */

  const recalculateRoute = () => {
    if (
      !destination ||
      !location
    ) {
      return;
    }

    calculateRouteTo(
      destination,
    );
  };

  /* =======================================================
     DIRECTION
     ======================================================= */

  const getDirectionText =
    (): string => {
      if (
        !location ||
        !route ||
        route.nodes.length < 2
      ) {
        return "Select a destination";
      }

      const nextNode =
        route.nodes[1];

      const bearing =
        calculateBearing(
          location.latitude,
          location.longitude,
          nextNode.latitude,
          nextNode.longitude,
        );

      return `Head ${bearingToDirection(
        bearing,
      )}`;
    };

  const availableNodes =
    zambiaOfflineMap.nodes;

  return (
    <>
      {/* =================================================
          ISOLATED NAVIGATION STYLES
          ================================================= */}

      <style>{`

        /* -----------------------------------------------
           ROOT RESET
           ----------------------------------------------- */

        .navigation-page {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 100%;
          box-sizing: border-box;

          margin: 0;
          padding: 0;

          background:
            linear-gradient(
              180deg,
              #062b22 0%,
              #07382c 48%,
              #062b22 100%
            );

          color: #f5f8f6;

          overflow-x: hidden;

          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .navigation-page *,
        .navigation-page *::before,
        .navigation-page *::after {
          box-sizing: border-box;
        }

        .navigation-page button {
          font: inherit;
        }

        /* -----------------------------------------------
           HEADER
           ----------------------------------------------- */

        .navigation-header {
          position: relative;

          display: flex;
          align-items: flex-start;

          width: 100%;
          min-width: 0;

          padding:
            18px
            16px
            22px;

          background:
            linear-gradient(
              180deg,
              rgba(4, 35, 28, 0.98),
              rgba(5, 48, 38, 0.96)
            );

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.07);
        }

        .navigation-back {
          appearance: none;
          -webkit-appearance: none;

          flex: 0 0 42px;

          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;
          margin: 0 12px 0 0;

          border: 1px solid
            rgba(255, 255, 255, 0.10);

          border-radius: 13px;

          background:
            rgba(255, 255, 255, 0.07);

          color: #ffffff;

          cursor: pointer;
        }

        .navigation-back:active {
          transform: scale(0.96);
        }

        .navigation-title {
          flex: 1 1 auto;
          min-width: 0;

          padding-right: 6px;
        }

        .navigation-title > span {
          display: block;

          margin-bottom: 4px;

          color: #9bc8b8;

          font-size: 10px;
          line-height: 1.2;
          font-weight: 800;

          letter-spacing: 0.13em;

          text-transform: uppercase;
        }

        .navigation-title h1 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(
            25px,
            7vw,
            34px
          );

          line-height: 1.05;

          font-weight: 850;

          letter-spacing: -0.04em;
        }

        .navigation-title p {
          margin:
            7px
            0
            0;

          color: #a9c5bc;

          font-size: 13px;
          line-height: 1.45;
        }

        .navigation-offline-badge {
          flex: 0 0 auto;

          display: inline-flex;
          align-items: center;
          gap: 6px;

          margin-left: 8px;
          padding:
            7px
            9px;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.06);

          color: #dcece6;

          font-size: 11px;
          font-weight: 700;

          white-space: nowrap;
        }

        .navigation-offline-badge span {
          width: 7px;
          height: 7px;

          flex: 0 0 7px;

          border-radius: 50%;

          background: #77d6a2;

          box-shadow:
            0 0 0 4px
            rgba(119, 214, 162, 0.10);
        }

        /* -----------------------------------------------
           MAIN STATUS
           ----------------------------------------------- */

        .navigation-status-card {
          display: flex;
          align-items: center;

          width: calc(100% - 32px);

          margin:
            16px
            0
            0;

          padding: 13px;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 16px;

          background:
            rgba(255, 255, 255, 0.055);
        }

        .navigation-status-icon {
          width: 38px;
          height: 38px;

          flex: 0 0 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background:
            rgba(192, 164, 78, 0.13);

          color: #d9c06b;
        }

        .navigation-status-text {
          flex: 1 1 auto;
          min-width: 0;

          display: flex;
          flex-direction: column;

          margin-left: 10px;
        }

        .navigation-status-text strong {
          overflow: hidden;

          color: #f7fbf9;

          font-size: 13px;
          line-height: 1.3;

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .navigation-status-text span {
          margin-top: 3px;

          color: #91b2a6;

          font-size: 11px;
          line-height: 1.3;
        }

        .gps-status-dot {
          width: 9px;
          height: 9px;

          flex: 0 0 9px;

          margin-left: 10px;

          border-radius: 50%;

          background: #60776f;
        }

        .gps-status-dot.active {
          background: #76d29c;

          box-shadow:
            0 0 0 5px
            rgba(118, 210, 156, 0.09);
        }

        /* -----------------------------------------------
           CONTROLS
           ----------------------------------------------- */

        .navigation-controls {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 10px;

          width: calc(100% - 32px);

          margin:
            11px
            16px
            0;
        }

        .navigation-primary-button,
        .navigation-secondary-button {
          appearance: none;
          -webkit-appearance: none;

          min-width: 0;
          min-height: 46px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          padding:
            10px
            12px;

          border-radius: 13px;

          font-size: 12px;
          font-weight: 800;

          cursor: pointer;

          white-space: nowrap;

          overflow: hidden;
          text-overflow: ellipsis;
        }

        .navigation-primary-button {
          border:
            1px solid
            rgba(218, 192, 101, 0.40);

          background:
            linear-gradient(
              135deg,
              #c8aa55,
              #a88a3e
            );

          color: #10241d;

          box-shadow:
            0 7px 18px
            rgba(0, 0, 0, 0.18);
        }

        .navigation-secondary-button {
          border:
            1px solid
            rgba(255, 255, 255, 0.11);

          background:
            rgba(255, 255, 255, 0.07);

          color: #f3f8f5;
        }

        .navigation-primary-button:disabled {
          opacity: 0.55;
          cursor: wait;
        }

        .navigation-primary-button:active,
        .navigation-secondary-button:active {
          transform: translateY(1px);
        }

        /* -----------------------------------------------
           ERROR
           ----------------------------------------------- */

        .navigation-error {
          width: calc(100% - 32px);

          margin:
            11px
            16px
            0;

          padding:
            11px
            12px;

          border:
            1px solid
            rgba(255, 116, 116, 0.22);

          border-radius: 12px;

          background:
            rgba(170, 45, 45, 0.16);

          color: #ffc3c3;

          font-size: 12px;
          line-height: 1.45;
        }

        /* -----------------------------------------------
           OFFLINE MAP
           ----------------------------------------------- */

        .offline-map-card {
          position: relative;

          width: calc(100% - 32px);
          height: 220px;

          margin:
            16px
            0
            0;

          overflow: hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 20px;

          background:
            radial-gradient(
              circle at 30% 25%,
              rgba(91, 153, 129, 0.16),
              transparent 35%
            ),
            #082f26;

          box-shadow:
            inset 0 1px 0
            rgba(255, 255, 255, 0.03);
        }

        .offline-map-grid {
          position: absolute;
          inset: 0;

          opacity: 0.35;

          background-image:
            linear-gradient(
              rgba(145, 190, 170, 0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(145, 190, 170, 0.08) 1px,
              transparent 1px
            );

          background-size:
            32px
            32px;

          pointer-events: none;
        }

        .map-placeholder {
          position: absolute;
          inset: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-direction: column;

          padding: 20px;

          text-align: center;

          color: #9fc0b4;
        }

        .map-placeholder svg {
          margin-bottom: 8px;

          color: #cbb363;
        }

        .map-placeholder strong {
          color: #edf6f1;

          font-size: 13px;
        }

        .map-placeholder span {
          max-width: 230px;

          margin-top: 4px;

          color: #8eafa2;

          font-size: 11px;
          line-height: 1.45;
        }

        .map-user-location {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 18px;
          height: 18px;

          transform:
            translate(-50%, -50%);
        }

        .location-pulse {
          position: absolute;
          inset: -8px;

          border-radius: 50%;

          background:
            rgba(103, 203, 154, 0.15);
        }

        .location-dot {
          position: absolute;
          inset: 4px;

          border:
            3px solid
            #d7f4e5;

          border-radius: 50%;

          background: #3dbf80;

          box-shadow:
            0 0 0 4px
            rgba(61, 191, 128, 0.18);
        }

        .map-route-node,
        .map-route-destination {
          position: absolute;

          z-index: 3;

          width: 8px;
          height: 8px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background: #d8bd63;

          box-shadow:
            0 0 0 4px
            rgba(216, 189, 99, 0.12);
        }

        .map-route-destination {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: #b89b4d;

          color: #10251e;
        }

        .map-route-destination svg {
          width: 17px;
          height: 17px;
        }

        .map-location-label {
          position: absolute;

          left: 14px;
          bottom: 14px;

          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding:
            7px
            9px;

          border-radius: 999px;

          background:
            rgba(3, 25, 20, 0.76);

          color: #d8ebe2;

          font-size: 10px;
          font-weight: 700;
        }

        .map-location-label span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #6ed29d;
        }

        /* -----------------------------------------------
           ROUTE SUMMARY
           ----------------------------------------------- */

        .route-summary {
          display: flex;
          align-items: center;

          width: calc(100% - 32px);

          margin:
            12px
            16px
            0;

          padding:
            12px;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 15px;

          background:
            rgba(255, 255, 255, 0.055);
        }

        .route-summary-main {
          min-width: 0;

          flex: 1;

          display: flex;
          align-items: center;
        }

        .route-icon {
          width: 36px;
          height: 36px;

          flex: 0 0 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background:
            rgba(199, 171, 83, 0.13);

          color: #d8bd63;
        }

        .route-summary-main > div:last-child {
          min-width: 0;

          display: flex;
          flex-direction: column;

          margin-left: 9px;
        }

        .route-summary-main strong {
          overflow: hidden;

          color: #f4f8f6;

          font-size: 12px;

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .route-summary-main span {
          margin-top: 3px;

          color: #8eafa2;

          font-size: 10px;
        }

        .route-refresh {
          appearance: none;
          -webkit-appearance: none;

          width: 36px;
          height: 36px;

          flex: 0 0 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: 8px;

          padding: 0;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 10px;

          background:
            rgba(255, 255, 255, 0.06);

          color: #d6e6df;

          cursor: pointer;
        }

        /* -----------------------------------------------
           DESTINATIONS
           ----------------------------------------------- */

        .navigation-destinations {
          width: calc(100% - 32px);

          margin:
            22px
            16px
            0;
        }

        .navigation-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 10px;

          margin-bottom: 12px;
        }

        .navigation-section-heading > div {
          min-width: 0;
        }

        .navigation-section-heading span {
          display: block;

          color: #82ae9f;

          font-size: 9px;
          font-weight: 850;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .navigation-section-heading h2 {
          margin:
            3px
            0
            0;

          color: #ffffff;

          font-size: 20px;
          line-height: 1.15;

          font-weight: 850;

          letter-spacing: -0.025em;
        }

        .navigation-section-heading small {
          flex: 0 0 auto;

          display: flex;
          align-items: center;
          justify-content: center;

          min-width: 27px;
          height: 27px;

          padding:
            0
            7px;

          border-radius: 9px;

          background:
            rgba(255, 255, 255, 0.07);

          color: #a7c2b8;

          font-size: 10px;
          font-weight: 800;
        }

        .navigation-place-list {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 10px;

          width: 100%;
        }

        .navigation-place {
          appearance: none;
          -webkit-appearance: none;

          width: 100%;
          min-width: 0;
          min-height: 82px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 7px;

          padding:
            11px;

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

          border-radius: 15px;

          background:
            rgba(255, 255, 255, 0.055);

          color: #ffffff;

          text-align: left;

          cursor: pointer;

          overflow: hidden;
        }

        .navigation-place.selected {
          border-color:
            rgba(210, 186, 91, 0.50);

          background:
            rgba(191, 161, 73, 0.12);
        }

        .place-main {
          min-width: 0;

          flex: 1;

          display: flex;
          align-items: center;
        }

        .place-icon {
          width: 34px;
          height: 34px;

          flex: 0 0 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(204, 179, 89, 0.11);

          color: #d5ba60;
        }

        .place-text {
          min-width: 0;

          display: flex;
          flex-direction: column;

          margin-left: 8px;
        }

        .place-text strong {
          display: block;

          width: 100%;

          overflow: hidden;

          color: #f4f8f6;

          font-size: 12px;
          line-height: 1.25;

          text-overflow: ellipsis;

          white-space: normal;

          overflow-wrap: anywhere;
        }

        .place-text small {
          display: block;

          margin-top: 3px;

          overflow: hidden;

          color: #82a99c;

          font-size: 9px;
          line-height: 1.2;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .selected-label {
          flex: 0 0 auto;

          padding:
            4px
            6px;

          border-radius: 7px;

          background:
            rgba(207, 184, 91, 0.16);

          color: #d8c174;

          font-size: 8px;
          font-weight: 800;

          text-transform: uppercase;
        }

        /* -----------------------------------------------
           OFFLINE NOTICE
           ----------------------------------------------- */

        .navigation-offline-notice {
          width: calc(100% - 32px);

          display: flex;
          align-items: flex-start;

          margin:
            18px
            16px
            32px;

          padding:
            13px;

          border:
            1px solid
            rgba(255, 255, 255, 0.07);

          border-radius: 15px;

          background:
            rgba(255, 255, 255, 0.04);
        }

        .offline-notice-icon {
          width: 34px;
          height: 34px;

          flex: 0 0 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(116, 204, 158, 0.09);

          color: #79c99e;
        }

        .navigation-offline-notice > div:last-child {
          min-width: 0;

          display: flex;
          flex-direction: column;

          margin-left: 9px;
        }

        .navigation-offline-notice strong {
          color: #e9f4ef;

          font-size: 11px;
        }

        .navigation-offline-notice span {
          margin-top: 3px;

          color: #83a89c;

          font-size: 10px;
          line-height: 1.45;
        }

        /* -----------------------------------------------
           SMALL PHONES
           ----------------------------------------------- */

        @media (max-width: 380px) {

          .navigation-header {
            padding:
              15px
              12px
              18px;
          }

          .navigation-status-card,
          .navigation-controls,
          .offline-map-card,
          .navigation-error,
          .route-summary,
          .navigation-destinations,
          .navigation-offline-notice {
            width: calc(100% - 24px);

            margin-left: 12px;
            margin-right: 12px;
          }

          .navigation-place-list {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .navigation-offline-badge {
            padding:
              6px
              7px;
          }

          .navigation-offline-badge span {
            display: none;
          }
        }

        /* -----------------------------------------------
           VERY SMALL WIDTH
           ----------------------------------------------- */

        @media (max-width: 330px) {

          .navigation-title h1 {
            font-size: 23px;
          }

          .navigation-offline-badge {
            display: none;
          }

          .navigation-controls {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .navigation-place {
            min-height: 76px;
          }
        }

      `}</style>

      {/* =================================================
          PAGE
          ================================================= */}

      <section
        className="navigation-page"
        aria-label="Offline navigation"
      >

        {/* HEADER */}

        <header className="navigation-header">

          <button
            type="button"
            className="navigation-back"
            onClick={onBack}
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="navigation-title">

            <span>
              Offline navigation
            </span>

            <h1>
              Find your way
            </h1>

            <p>
              GPS navigation with offline routes.
            </p>

          </div>

          <div className="navigation-offline-badge">
            <span />
            Offline
          </div>

        </header>

        {/* GPS STATUS */}

        <div className="navigation-status-card">

          <div className="navigation-status-icon">
            <LocateFixed size={19} />
          </div>

          <div className="navigation-status-text">

            <strong>
              {tracking
                ? "GPS tracking active"
                : location
                  ? "GPS location ready"
                  : "GPS tracking inactive"}
            </strong>

            <span>
              {location
                ? `Accuracy ±${Math.round(
                    location.accuracy,
                  )} m`
                : "Location not available"}
            </span>

          </div>

          <span
            className={
              tracking || location
                ? "gps-status-dot active"
                : "gps-status-dot"
            }
          />

        </div>

        {/* CONTROLS */}

        <div className="navigation-controls">

          <button
            type="button"
            className="navigation-primary-button"
            onClick={locateUser}
            disabled={loading}
          >
            <LocateFixed size={17} />

            {loading
              ? "Locating..."
              : "My location"}
          </button>

          {!tracking ? (
            <button
              type="button"
              className="navigation-secondary-button"
              onClick={startTracking}
            >
              <NavigationIcon size={17} />
              Start tracking
            </button>
          ) : (
            <button
              type="button"
              className="navigation-secondary-button"
              onClick={stopTracking}
            >
              Stop tracking
            </button>
          )}

        </div>

        {/* ERROR */}

        {error && (
          <div
            className="navigation-error"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* MAP */}

        <div className="offline-map-card">

          <div className="offline-map-grid" />

          {location && (
            <div
              className="map-user-location"
              aria-label="Your location"
            >
              <span className="location-pulse" />
              <span className="location-dot" />
            </div>
          )}

          {route &&
            route.nodes.map(
              (node, index) => (
                <div
                  key={node.id}
                  className={
                    index ===
                    route.nodes.length - 1
                      ? "map-route-destination"
                      : "map-route-node"
                  }
                  style={{
                    left: `${18 + index * 20}%`,
                    top: `${68 - index * 12}%`,
                  }}
                >
                  {index ===
                    route.nodes.length - 1 && (
                    <MapPin size={24} />
                  )}
                </div>
              ),
            )}

          {!location && (
            <div className="map-placeholder">

              <LocateFixed size={30} />

              <strong>
                GPS location
              </strong>

              <span>
                Tap “My location”
                to find your position.
              </span>

            </div>
          )}

          {location && !route && (
            <div className="map-location-label">
              <span />
              Your location
            </div>
          )}

        </div>

        {/* ROUTE SUMMARY */}

        {route && (
          <div className="route-summary">

            <div className="route-summary-main">

              <div className="route-icon">
                <Route size={18} />
              </div>

              <div>

                <strong>
                  {getDirectionText()}
                </strong>

                <span>
                  {formatDistance(
                    route.distance,
                  )}
                  {" · "}
                  {estimateWalkingTime(
                    route.distance,
                  )}
                  {" min walk"}
                </span>

              </div>

            </div>

            <button
              type="button"
              className="route-refresh"
              onClick={
                recalculateRoute
              }
              aria-label="Recalculate route"
            >
              <RefreshCw size={17} />
            </button>

          </div>
        )}

        {/* DESTINATIONS */}

        <div className="navigation-destinations">

          <div className="navigation-section-heading">

            <div>

              <span>
                Offline places
              </span>

              <h2>
                Choose a destination
              </h2>

            </div>

            <small>
              {availableNodes.length}
            </small>

          </div>

          <div className="navigation-place-list">

            {availableNodes.map(
              (node) => (
                <button
                  key={node.id}
                  type="button"
                  className={
                    destination?.id === node.id
                      ? "navigation-place selected"
                      : "navigation-place"
                  }
                  onClick={() =>
                    chooseDestination(node)
                  }
                >

                  <div className="place-main">

                    <div className="place-icon">
                      <MapPin size={17} />
                    </div>

                    <div className="place-text">

                      <strong>
                        {node.name}
                      </strong>

                      <small>
                        {node.type ??
                          "Offline place"}
                      </small>

                    </div>

                  </div>

                  {destination?.id ===
                    node.id && (
                    <span className="selected-label">
                      Selected
                    </span>
                  )}

                </button>
              ),
            )}

          </div>
        </div>

        {/* OFFLINE NOTICE */}

        <div className="navigation-offline-notice">

          <div className="offline-notice-icon">
            <NavigationIcon size={18} />
          </div>

          <div>

            <strong>
              Works offline
            </strong>

            <span>
              Map points and route calculations
              are stored inside BembaTranslate.
              Internet is not required.
            </span>

          </div>

        </div>

      </section>
    </>
  );
}
