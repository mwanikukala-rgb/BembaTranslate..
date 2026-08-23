import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  Heart,
  History as HistoryIcon,
  Languages,
  LocateFixed,
  Map,
  Navigation,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Volume2,
  WifiOff,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { bembaDictionary } from "./data/bembaDictionary";
import { translateWithFallback } from "./engine/bembaTranslator";
import "./styles/global.css";

type Page =
  | "translate"
  | "dictionary"
  | "learn"
  | "history"
  | "navigation"
  | "settings";

type HistoryItem = {
  id: number;
  english: string;
  bemba: string;
  time: string;
};

const quickPhrases = [
  ["How are you?", "Mulishani"],
  ["Good morning", "Mwashibukeni"],
  ["I want money", "Ndefwaya indalama"],
  ["Where are you?", "Ulikwisa"],
  ["Where are they?", "Balikwisa"],
  ["I'm angry", "Nimfulwa"],
] as const;

const navigationItems: {
  id: Page;
  label: string;
  icon: typeof Languages;
}[] = [
  { id: "translate", label: "Translate", icon: Languages },
  { id: "dictionary", label: "Dictionary", icon: BookOpen },
  { id: "learn", label: "Learn", icon: Sparkles },
  { id: "history", label: "History", icon: HistoryIcon },
  { id: "navigation", label: "Navigate", icon: Navigation },
  { id: "settings", label: "Settings", icon: Settings },
];

const campusPlaces = [
  {
    id: "main-gate",
    name: "Main Gate",
    type: "Entrance",
    x: 16,
    y: 78,
  },
  {
    id: "admin",
    name: "Administration Block",
    type: "Administration",
    x: 38,
    y: 61,
  },
  {
    id: "library",
    name: "University Library",
    type: "Library",
    x: 61,
    y: 48,
  },
  {
    id: "student-centre",
    name: "Student Centre",
    type: "Student Services",
    x: 74,
    y: 66,
  },
  {
    id: "lecture-block",
    name: "Lecture Block",
    type: "Academic",
    x: 46,
    y: 31,
  },
  {
    id: "hostels",
    name: "Student Hostels",
    type: "Accommodation",
    x: 78,
    y: 28,
  },
  {
    id: "clinic",
    name: "Campus Clinic",
    type: "Health",
    x: 25,
    y: 32,
  },
  {
    id: "sports",
    name: "Sports Ground",
    type: "Recreation",
    x: 68,
    y: 82,
  },
];

function App() {
  const [launching, setLaunching] = useState(true);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState<Page>("translate");

  const [english, setEnglish] = useState("");
  const [bemba, setBemba] = useState("");
  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchText, setSearchText] = useState("");

  const [selectedPlace, setSelectedPlace] = useState("library");
  const [destination, setDestination] = useState("");
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {
    let current = 0;

    const timer = window.setInterval(() => {
      current += 5;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        window.clearInterval(timer);

        window.setTimeout(() => {
          setLaunching(false);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => window.clearInterval(timer);
  }, []);

  const dictionaryResults = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return bembaDictionary.slice(0, 100);
    }

    return bembaDictionary
      .filter(
        (item) =>
          item.english.toLowerCase().includes(query) ||
          item.bemba.toLowerCase().includes(query),
      )
      .slice(0, 200);
  }, [searchText]);

  const selectedPlaceData =
    campusPlaces.find((place) => place.id === selectedPlace) ??
    campusPlaces[0];

  const destinationData = campusPlaces.find(
    (place) => place.id === destination,
  );

  const translate = () => {
    const input = english.trim();

    if (!input || translating) return;

    setTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const match = quickPhrases.find(
        ([source]) => source.toLowerCase() === input.toLowerCase(),
      );

      const result =
        match?.[1] ||
        translateWithFallback(input) ||
        "";

      setBemba(result);

      if (result) {
        setHistory((items) => [
          {
            id: Date.now(),
            english: input,
            bemba: result,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          ...items,
        ]);
      }

      setTranslating(false);
    }, 160);
  };

  const selectPhrase = (source: string, translation: string) => {
    setEnglish(source);
    setBemba(translation);
    setFavourite(false);
    setCopied(false);
    setPage("translate");
  };

  const copy = async () => {
    if (!bemba) return;

    try {
      await navigator.clipboard.writeText(bemba);
      setCopied(true);

      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const listen = () => {
    if (!bemba || speaking) return;

    setSpeaking(true);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(bemba);
      utterance.rate = 0.85;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      window.setTimeout(() => setSpeaking(false), 900);
    }
  };

  const startNavigation = () => {
    if (!destinationData) return;
    setNavigationStarted(true);
    setSelectedPlace(destinationData.id);
  };

  if (launching) {
    return (
      <div className="launch-screen">
        <div className="launch-content">
          <div className="launch-logo">
            <Languages size={36} strokeWidth={1.7} />
          </div>

          <div className="launch-kicker">OFFLINE LANGUAGE</div>

          <h1>BembaTranslate</h1>
          <p>English • Bemba</p>

          <div className="launch-status">
            <div className="launch-status-row">
              <span>Preparing your dictionary</span>
              <strong>{progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="launch-message">
            <span className="status-check">
              <Check size={12} />
            </span>
            <span>Private. Fast. Works without internet.</span>
          </div>
        </div>

        <div className="launch-footer">
          <span className="offline-dot" />
          Ready for everyday Bemba
        </div>
      </div>
    );
  }

  const pageTitle =
    page === "translate"
      ? "Translate"
      : page === "dictionary"
        ? "Dictionary"
        : page === "learn"
          ? "Learn Bemba"
          : page === "history"
            ? "History"
            : page === "navigation"
              ? "Campus Navigation"
              : "Settings";

  return (
    <div className="app">
      <div className="wallpaper" />

      <main className="app-content">
        <header className="app-header">
          <div className="header-title">
            <span className="header-icon">
              <Languages size={17} />
            </span>

            <div>
              <strong>{pageTitle}</strong>
              <span>
                {page === "navigation"
                  ? "Offline campus map"
                  : "English → Bemba"}
              </span>
            </div>
          </div>

          <div className="offline-badge">
            <WifiOff size={12} />
            Offline
          </div>
        </header>

        {page === "translate" && (
          <section className="page">
            <div className="welcome-card">
              <span className="eyebrow">BEMBATRANSLATE</span>

              <h1>
                Speak Bemba
                <br />
                with confidence.
              </h1>

              <p>
                Translate everyday English privately,
                quickly and completely offline.
              </p>
            </div>

            <div className="section-title">
              <div>
                <h2>Translate</h2>
                <p>English to Bemba</p>
              </div>

              <span className="local-pill">
                <Check size={12} />
                Local
              </span>
            </div>

            <div className="translation-card">
              <div className="language-strip">
                <div>
                  <small>FROM</small>
                  <strong>English</strong>
                </div>

                <div className="language-arrow">→</div>

                <div>
                  <small>TO</small>
                  <strong>Bemba</strong>
                </div>
              </div>

              <div className="input-label-row">
                <span>English text</span>
                <span>{english.length}/5000</span>
              </div>

              <textarea
                value={english}
                maxLength={5000}
                onChange={(event) => setEnglish(event.target.value)}
                placeholder="Type something in English..."
              />

              <button
                className="translate-button"
                onClick={translate}
                disabled={!english.trim() || translating}
              >
                <Languages size={17} />
                {translating ? "Translating..." : "Translate to Bemba"}
              </button>

              <div className="result-box">
                <div className="result-heading">
                  <span>
                    <span className="bemba-dot" />
                    Bemba translation
                  </span>

                  {bemba && (
                    <span className="ready-label">
                      <Check size={11} />
                      Ready
                    </span>
                  )}
                </div>

                {bemba ? (
                  <div className="translation-result">
                    <strong>{bemba}</strong>

                    <div className="result-actions">
                      <button
                        className={favourite ? "selected" : ""}
                        onClick={() =>
                          setFavourite((value) => !value)
                        }
                        aria-label="Favourite"
                      >
                        <Heart
                          size={16}
                          fill={favourite ? "currentColor" : "none"}
                        />
                      </button>

                      <button onClick={copy} aria-label="Copy">
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <button onClick={listen} aria-label="Listen">
                        <Volume2 size={16} />
                        {speaking ? "Playing" : "Listen"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="empty-result">
                    <BookOpen size={21} />
                    <strong>Your translation will appear here</strong>
                    <span>Enter an English word or phrase above.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="section-title">
              <div>
                <h2>Popular phrases</h2>
                <p>Useful expressions for everyday life</p>
              </div>

              <span className="count-pill">{quickPhrases.length}</span>
            </div>

            <div className="phrase-grid">
              {quickPhrases.map(([source, translation]) => (
                <button
                  key={source}
                  className="phrase-card"
                  onClick={() => selectPhrase(source, translation)}
                >
                  <span>{source}</span>
                  <strong>{translation}</strong>
                </button>
              ))}
            </div>

            <div className="offline-info">
              <div className="info-icon">
                <Check size={15} />
              </div>

              <div>
                <strong>Works completely offline</strong>
                <span>Your translations stay on your device.</span>
              </div>
            </div>
          </section>
        )}

        {page === "dictionary" && (
          <section className="page">
            <div className="page-intro">
              <span className="eyebrow">BEMBA LANGUAGE</span>
              <h1>Dictionary</h1>
              <p>Search the built-in English → Bemba dictionary.</p>
            </div>

            <div className="search-field">
              <Search size={17} />

              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search words or phrases..."
              />

              {searchText && (
                <button onClick={() => setSearchText("")}>
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="dictionary-count">
              {searchText.trim()
                ? `${dictionaryResults.length} results`
                : `${bembaDictionary.length} dictionary entries`}
            </div>

            <div className="dictionary-list">
              {dictionaryResults.length > 0 ? (
                dictionaryResults.map((item, index) => (
                  <button
                    key={`${item.english}-${index}`}
                    className="dictionary-card"
                    onClick={() =>
                      selectPhrase(item.english, item.bemba)
                    }
                  >
                    <div>
                      <span>{item.english}</span>
                      <strong>{item.bemba}</strong>
                    </div>

                    <Languages size={16} />
                  </button>
                ))
              ) : (
                <div className="large-empty">
                  <Search size={30} />
                  <strong>No dictionary entry found</strong>
                  <span>Try another English or Bemba word.</span>
                </div>
              )}
            </div>
          </section>
        )}

        {page === "learn" && (
          <section className="page">
            <div className="page-intro">
              <span className="eyebrow">LEARN BEMBA</span>
              <h1>Build your vocabulary.</h1>
              <p>
                Explore useful Bemba words and everyday expressions.
              </p>
            </div>

            <div className="learn-grid">
              {[
                ["01", "Greetings", "Everyday greetings"],
                ["02", "Family", "Family vocabulary"],
                ["03", "Food & Drink", "Useful food words"],
                ["04", "Travel", "Words for travelling"],
                ["05", "Everyday Life", "Common expressions"],
              ].map(([number, title, description]) => (
                <button className="learn-card" key={number}>
                  <span className="learn-number">{number}</span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </button>
              ))}
            </div>
          </section>
        )}

        {page === "history" && (
          <section className="page">
            <div className="page-intro">
              <span className="eyebrow">LOCAL HISTORY</span>
              <h1>History</h1>
              <p>Your recent translations are stored locally.</p>
            </div>

            {history.length === 0 ? (
              <div className="large-empty">
                <HistoryIcon size={30} />
                <strong>No translations yet</strong>
                <span>Your recent translations will appear here.</span>
              </div>
            ) : (
              <>
                <div className="history-toolbar">
                  <span>
                    {history.length}{" "}
                    {history.length === 1
                      ? "translation"
                      : "translations"}
                  </span>

                  <button onClick={() => setHistory([])}>Clear</button>
                </div>

                <div className="history-list">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      className="history-card"
                      onClick={() =>
                        selectPhrase(item.english, item.bemba)
                      }
                    >
                      <div>
                        <small>{item.time}</small>
                        <span>{item.english}</span>
                        <strong>{item.bemba}</strong>
                      </div>

                      <Languages size={16} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {page === "navigation" && (
          <section className="page navigation-page">
            <div className="page-intro navigation-intro">
              <div>
                <span className="eyebrow">OFFLINE CAMPUS MAP</span>
                <h1>Navigate Campus</h1>
                <p>
                  Find buildings and follow simple offline walking
                  directions.
                </p>
              </div>

              <div className="map-status">
                <span />
                GPS Ready
              </div>
            </div>

            <div className="navigation-controls">
              <div className="location-card">
                <div className="location-icon">
                  <LocateFixed size={18} />
                </div>

                <div>
                  <small>YOUR LOCATION</small>
                  <strong>Main Campus</strong>
                  <span>Offline position available</span>
                </div>
              </div>

              <div className="destination-control">
                <label htmlFor="destination">Where do you want to go?</label>

                <select
                  id="destination"
                  value={destination}
                  onChange={(event) => {
                    setDestination(event.target.value);
                    setNavigationStarted(false);
                  }}
                >
                  <option value="">Select a destination</option>

                  {campusPlaces.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name}
                    </option>
                  ))}
                </select>

                <button
                  className="start-navigation"
                  onClick={startNavigation}
                  disabled={!destination}
                >
                  <Navigation size={16} />
                  Start walking route
                </button>
              </div>
            </div>

            <div className="map-card">
              <div className="map-toolbar">
                <div>
                  <Map size={16} />
                  <strong>Campus Map</strong>
                </div>

                <div className="map-zoom">
                  <button
                    onClick={() =>
                      setMapZoom((value) =>
                        Math.min(1.5, value + 0.1),
                      )
                    }
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={15} />
                  </button>

                  <button
                    onClick={() =>
                      setMapZoom((value) =>
                        Math.max(0.8, value - 0.1),
                      )
                    }
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={15} />
                  </button>
                </div>
              </div>

              <div className="campus-map">
                <div
                  className="map-inner"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  <div className="road road-one" />
                  <div className="road road-two" />
                  <div className="road road-three" />
                  <div className="road road-four" />

                  <div className="green-area green-one" />
                  <div className="green-area green-two" />

                  {campusPlaces.map((place) => {
                    const active =
                      selectedPlace === place.id ||
                      destination === place.id;

                    return (
                      <button
                        key={place.id}
                        className={`map-marker ${
                          active ? "active" : ""
                        }`}
                        style={{
                          left: `${place.x}%`,
                          top: `${place.y}%`,
                        }}
                        onClick={() => {
                          setSelectedPlace(place.id);
                          setDestination(place.id);
                          setNavigationStarted(false);
                        }}
                      >
                        <span className="marker-dot">
                          <Map size={12} />
                        </span>

                        <span className="marker-label">
                          {place.name}
                        </span>
                      </button>
                    );
                  })}

                  <div className="you-are-here">
                    <span />
                    <strong>You are here</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="selected-place-card">
              <div className="selected-place-icon">
                <Map size={19} />
              </div>

              <div>
                <small>SELECTED LOCATION</small>
                <strong>{selectedPlaceData.name}</strong>
                <span>{selectedPlaceData.type}</span>
              </div>

              <button
                onClick={() => {
                  setDestination(selectedPlaceData.id);
                  setNavigationStarted(true);
                }}
              >
                <Navigation size={15} />
                Go
              </button>
            </div>

            {navigationStarted && destinationData && (
              <div className="route-card">
                <div className="route-icon">
                  <Navigation size={18} />
                </div>

                <div>
                  <small>OFFLINE WALKING ROUTE</small>
                  <strong>
                    Walk toward {destinationData.name}
                  </strong>
                  <span>
                    Follow the highlighted campus paths. Route
                    calculation works without internet.
                  </span>
                </div>
              </div>
            )}

            <div className="offline-info">
              <div className="info-icon">
                <WifiOff size={15} />
              </div>

              <div>
                <strong>Offline navigation</strong>
                <span>
                  The campus map is packaged inside the application.
                </span>
              </div>
            </div>
          </section>
        )}

        {page === "settings" && (
          <section className="page">
            <div className="page-intro">
              <span className="eyebrow">APPLICATION</span>
              <h1>Settings</h1>
              <p>BembaTranslate preferences and information.</p>
            </div>

            <div className="settings-card">
              <div className="setting-row">
                <div>
                  <strong>Offline mode</strong>
                  <span>
                    Translation and navigation can work without
                    internet.
                  </span>
                </div>

                <span className="status-on">
                  <Check size={11} />
                  ON
                </span>
              </div>

              <div className="setting-row">
                <div>
                  <strong>Dictionary</strong>
                  <span>Built into the application.</span>
                </div>

                <BookOpen size={17} />
              </div>

              <div className="setting-row">
                <
