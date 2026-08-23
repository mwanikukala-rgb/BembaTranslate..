import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  Heart,
  History,
  Home,
  Info,
  Languages,
  LocateFixed,
  Map,
  Navigation,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Volume2,
  WifiOff,
  X,
} from "lucide-react";

import "./index.css";

/* =========================================================
   TYPES
   ========================================================= */

type Page =
  | "home"
  | "dictionary"
  | "learn"
  | "history"
  | "navigation"
  | "settings";

type DictionaryEntry = {
  english: string;
  bemba: string;
};

type HistoryEntry = {
  english: string;
  bemba: string;
  time: string;
};

/* =========================================================
   DICTIONARY
   =========================================================
   IMPORTANT:
   The actual dictionary remains in:
   src/data/bembaDictionary.ts

   We do NOT modify dictionary data here.
   ========================================================= */

import dictionaryData from "./data/bembaDictionary";

const dictionary: DictionaryEntry[] = dictionaryData;

/* =========================================================
   QUICK PHRASES
   ========================================================= */

const quickPhrases = [
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "I love you", bemba: "Nalikutemwa" },
];

/* =========================================================
   LEARNING CARDS
   ========================================================= */

const learningCards = [
  {
    title: "Greetings",
    description: "Learn common Bemba greetings.",
  },
  {
    title: "People",
    description: "Useful words for talking about people.",
  },
  {
    title: "Everyday",
    description: "Simple words used every day.",
  },
  {
    title: "Questions",
    description: "Ask basic questions in Bemba.",
  },
  {
    title: "Places",
    description: "Useful words for places and directions.",
  },
  {
    title: "Polite words",
    description: "Thanking, apologising and asking politely.",
  },
];

/* =========================================================
   NAVIGATION ITEMS
   ========================================================= */

const navigationItems: {
  page: Page;
  label: string;
  icon: typeof Home;
}[] = [
  { page: "home", label: "Home", icon: Home },
  { page: "dictionary", label: "Dictionary", icon: BookOpen },
  { page: "learn", label: "Learn", icon: Languages },
  { page: "history", label: "History", icon: History },
  { page: "navigation", label: "Navigate", icon: Navigation },
  { page: "settings", label: "Settings", icon: Settings },
];

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [search, setSearch] = useState("");
  const [favourite, setFavourite] = useState(false);

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [location, setLocation] =
    useState<GeolocationPosition | null>(null);

  const [gpsError, setGpsError] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);

  /* =======================================================
     DICTIONARY SEARCH
     ======================================================= */

  const filteredDictionary = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return dictionary;
    }

    return dictionary.filter(
      (item) =>
        item.english.toLowerCase().includes(value) ||
        item.bemba.toLowerCase().includes(value),
    );
  }, [search]);

  /* =======================================================
     TRANSLATION
     ======================================================= */

  function translateText(text: string) {
    const clean = text.trim();

    if (!clean) {
      setResult("");
      return;
    }

    const exact = dictionary.find(
      (item) => item.english.toLowerCase() === clean.toLowerCase(),
    );

    if (exact) {
      setResult(exact.bemba);

      setHistory((old) => [
        {
          english: clean,
          bemba: exact.bemba,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...old,
      ]);

      return;
    }

    const words = clean
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const translated = words.map((word) => {
      const found = dictionary.find(
        (item) => item.english.toLowerCase() === word,
      );

      return found ? found.bemba : word;
    });

    const output = translated.join(" ");

    setResult(output);

    setHistory((old) => [
      {
        english: clean,
        bemba: output,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...old,
    ]);
  }

  function copyResult() {
    if (!result) return;

    navigator.clipboard?.writeText(result);
  }

  function speakResult() {
    if (!result || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(result);
    speech.lang = "bem";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
  }

  /* =======================================================
     GPS
     ======================================================= */

  function getLocation() {
    setGpsError("");
    setGpsLoading(true);

    if (!navigator.geolocation) {
      setGpsError("GPS is not available on this device.");
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setGpsLoading(false);
      },
      (error) => {
        setGpsLoading(false);

        if (error.code === 1) {
          setGpsError(
            "Location permission was denied. Allow location access to use GPS.",
          );
        } else if (error.code === 2) {
          setGpsError("Your location could not be determined.");
        } else {
          setGpsError("GPS timed out. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }

  /* =======================================================
     PAGE HEADER
     ======================================================= */

  function Header() {
    return (
      <header className="app-header">
        <div className="header-title">
          <div className="header-icon">
            <Languages size={19} />
          </div>

          <div>
            <strong>BembaTranslate</strong>
            <span>Offline English → Bemba</span>
          </div>
        </div>

        <div className="offline-badge">
          <span />
          Offline
        </div>
      </header>
    );
  }

  /* =======================================================
     HOME
     ======================================================= */

  function HomePage() {
    return (
      <main className="page">
        <section className="welcome-card">
          <span className="eyebrow">BEMBATRANSLATE</span>

          <h1>
            Speak Bemba
            <br />
            anywhere.
          </h1>

          <p>
            Translate everyday English into Bemba without needing
            an internet connection.
          </p>
        </section>

        <div className="section-title">
          <div>
            <h2>Quick translation</h2>
            <p>Type an English word or phrase.</p>
          </div>

          <span className="local-pill">
            <WifiOff size={11} />
            Local
          </span>
        </div>

        <section className="translation-card">
          <div className="language-strip">
            <div>
              <small>FROM</small>
              <strong>English</strong>
            </div>

            <div className="language-arrow">
              →
            </div>

            <div>
              <small>TO</small>
              <strong>Bemba</strong>
            </div>
          </div>

          <div className="input-label-row">
            <span>English text</span>

            {input && (
              <button onClick={() => setInput("")}>
                <X size={13} />
              </button>
            )}
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type something in English..."
          />

          <button
            className="translate-button"
            disabled={!input.trim()}
            onClick={() => translateText(input)}
          >
            <Sparkles size={15} />
            Translate
          </button>

          <div className="result-box">
            {result ? (
              <>
                <div className="result-heading">
                  <span>
                    <span className="bemba-dot" />
                    Bemba translation
                  </span>

                  <span className="ready-label">
                    <Check size={12} />
                    Ready
                  </span>
                </div>

                <div className="translation-result">
                  <strong>{result}</strong>

                  <div className="result-actions">
                    <button onClick={copyResult}>
                      <Copy size={13} />
                      Copy
                    </button>

                    <button onClick={speakResult}>
                      <Volume2 size={13} />
                      Listen
                    </button>

                    <button
                      className={favourite ? "selected" : ""}
                      onClick={() => setFavourite(!favourite)}
                    >
                      <Heart
                        size={13}
                        fill={favourite ? "currentColor" : "none"}
                      />
                      Save
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-result">
                <Languages size={25} />
                <strong>Your translation appears here</strong>
                <span>Enter English text above.</span>
              </div>
            )}
          </div>
        </section>

        <div className="section-title">
          <div>
            <h2>Useful phrases</h2>
            <p>Tap a phrase to translate it.</p>
          </div>
        </div>

        <section className="phrase-grid">
          {quickPhrases.map((phrase) => (
            <button
              className="phrase-card"
              key={phrase.english}
              onClick={() => {
                setInput(phrase.english);
                setResult(phrase.bemba);
              }}
            >
              <span>{phrase.english}</span>
              <strong>{phrase.bemba}</strong>
            </button>
          ))}
        </section>

        <div className="offline-info">
          <div className="info-icon">
            <WifiOff size={15} />
          </div>

          <div>
            <strong>Works offline</strong>
            <span>
              Your core translation and dictionary data are
              stored on the device.
            </span>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     DICTIONARY
     ======================================================= */

  function DictionaryPage() {
    return (
      <main className="page">
        <div className="page-intro">
          <h1>Dictionary</h1>
          <p>Search the offline English → Bemba dictionary.</p>
        </div>

        <div className="search-field">
          <Search size={17} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search English or Bemba..."
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={15} />
            </button>
          )}
        </div>

        <div className="dictionary-count">
          {filteredDictionary.length} entries
        </div>

        <section className="dictionary-list">
          {filteredDictionary.map((item, index) => (
            <button
              className="dictionary-card"
              key={`${item.english}-${index}`}
              onClick={() => {
                setInput(item.english);
                setResult(item.bemba);
                setPage("home");
              }}
            >
              <div>
                <span>{item.english}</span>
                <strong>{item.bemba}</strong>
              </div>

              <ChevronRight size={17} />
            </button>
          ))}
        </section>
      </main>
    );
  }

  /* =======================================================
     LEARN
     ======================================================= */

  function LearnPage() {
    return (
      <main className="page">
        <div className="page-intro">
          <h1>Learn Bemba</h1>
          <p>Build your everyday Bemba vocabulary.</p>
        </div>

        <section className="learn-grid">
          {learningCards.map((card, index) => (
            <button className="learn-card" key={card.title}>
              <span className="learn-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{card.title}</strong>

              <small>{card.description}</small>
            </button>
          ))}
        </section>
      </main>
    );
  }

  /* =======================================================
     HISTORY
     ======================================================= */

  function HistoryPage() {
    return (
      <main className="page">
        <div className="page-intro">
          <h1>History</h1>
          <p>Your recent translations stay on this device.</p>
        </div>

        <div className="history-toolbar">
          <span>{history.length} translations</span>

          {history.length > 0 && (
            <button onClick={() => setHistory([])}>
              Clear history
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="large-empty">
            <History size={28} />
            <strong>No translation history</strong>
            <span>Your recent translations will appear here.</span>
          </div>
        ) : (
          <section className="history-list">
            {history.map((item, index) => (
              <button
                className="history-card"
                key={`${item.time}-${index}`}
                onClick={() => {
                  setInput(item.english);
                  setResult(item.bemba);
                  setPage("home");
                }}
              >
                <div>
                  <small>{item.time}</small>
                  <span>{item.english}</span>
                  <strong>{item.bemba}</strong>
                </div>

                <ChevronRight size={17} />
              </button>
            ))}
          </section>
        )}
      </main>
    );
  }

  /* =======================================================
     NAVIGATION
     ======================================================= */

  function NavigationPage() {
    return (
      <main className="navigation-page">
        <div className="navigation-heading">
          <div>
            <span className="section-label">
              <Map size={12} />
              OFFLINE NAVIGATION
            </span>

            <h1>Navigate</h1>

            <p>
              Find your position and move around using
              locally stored campus maps.
            </p>
          </div>

          {location && (
            <button
              className="clear-button"
              onClick={() => setLocation(null)}
            >
              Clear
            </button>
          )}
        </div>

        <section className="navigation-status-card">
          <div className="navigation-status-icon">
            <LocateFixed size={19} />
          </div>

          <div>
            <strong>
              {gpsLoading
                ? "Finding your location..."
                : location
                  ? "Location found"
                  : "GPS ready"}
            </strong>

            <span>
              {location
                ? "Your device has provided a GPS position."
                : "GPS can work without mobile data."}
            </span>
          </div>

          <span
            className={`gps-status-dot ${
              location || gpsLoading ? "active" : ""
            }`}
          />
        </section>

        <section className="offline-map-card">
          <div className="offline-map-grid" />

          <div className="map-placeholder">
            <Map size={38} />

            <strong>Offline Campus Map</strong>

            <span>
              The map area is ready for the locally packaged
              campus map and walking routes.
            </span>
          </div>

          {location && (
            <div
              className="map-location-marker"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              <span />
              You are here
            </div>
          )}
        </section>

        <section className="navigation-location-card">
          <div className="location-header">
            <div>
              <span>YOUR LOCATION</span>

              <strong>
                {location
                  ? "GPS coordinates"
                  : "Location not detected"}
              </strong>
            </div>

            <button
              className="navigation-refresh"
              onClick={getLocation}
              disabled={gpsLoading}
              aria-label="Refresh location"
            >
              <RefreshCw
                size={16}
                className={gpsLoading ? "spin" : ""}
              />
            </button>
          </div>

          {location ? (
            <div className="coordinate-grid">
              <div>
                <span>LATITUDE</span>
                <strong>
                  {location.coords.latitude.toFixed(6)}
                </strong>
              </div>

              <div>
                <span>LONGITUDE</span>
                <strong>
                  {location.coords.longitude.toFixed(6)}
                </strong>
              </div>

              <div>
                <span>ACCURACY</span>
                <strong>
                  ±{Math.round(location.coords.accuracy)} m
                </strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong>GPS active</strong>
              </div>
            </div>
          ) : (
            <div className="location-empty">
              Tap the location button to find your current
              position.
            </div>
          )}

          {gpsError && (
            <div className="gps-error">
              {gpsError}
            </div>
          )}
        </section>

        <section className="navigation-coming-card">
          <div>
            <strong>Campus walking navigation</strong>

            <p>
              The next stage is to package the actual campus
              map, buildings, landmarks and offline walking
              routes into this navigation screen.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     SETTINGS
     ======================================================= */

  function SettingsPage() {
    return (
      <main className="page">
        <div className="page-intro">
          <h1>Settings</h1>
          <p>Information about your offline app.</p>
        </div>

        <section className="settings-card">
          <div className="setting-row">
            <div>
              <strong>Offline mode</strong>
              <span>No internet connection required.</span>
            </div>

            <Check size={18} />
          </div>

          <div className="setting-row">
            <div>
              <strong>Dictionary</strong>
              <span>
                Local Bemba vocabulary stored in the app.
              </span>
            </div>

            <BookOpen size={18} />
          </div>

          <div className="setting-row">
            <div>
              <strong>GPS navigation</strong>
              <span>
                Uses the phone's location hardware.
              </span>
            </div>

            <LocateFixed size={18} />
          </div>

          <div className="setting-row">
            <div>
              <strong>Audio</strong>
              <span>Manual speech playback.</span>
            </div>

            <Volume2 size={18} />
          </div>
        </section>

        <div className="privacy-card">
          <div className="privacy-icon">
            <ShieldCheck size={15} />
          </div>

          <div>
            <strong>Privacy first</strong>

            <span>
              Translation data is processed locally by the
              application.
            </span>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     PAGE ROUTER
     ======================================================= */

  function CurrentPage() {
    switch (page) {
      case "dictionary":
        return <DictionaryPage />;

      case "learn":
        return <LearnPage />;

      case "history":
        return <HistoryPage />;

      case "navigation":
        return <NavigationPage />;

      case "settings":
        return <SettingsPage />;

      case "home":
      default:
        return <HomePage />;
    }
  }

  /* =======================================================
     APP LAYOUT
     ======================================================= */

  return (
    <div className="app">
      <div className="wallpaper" />

      <div className="app-content">
        <Header />

        <CurrentPage />
      </div>

      <nav className="bottom-navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.page}
              className={page === item.page ? "active" : ""}
              onClick={() => setPage(item.page)}
            >
              <span className="nav-icon">
                <Icon size={18} />
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
