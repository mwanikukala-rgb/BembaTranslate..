import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
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
   ========================================================= */

const dictionary: DictionaryEntry[] = [
  { english: "Hello", bemba: "Muli shani" },
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "Good afternoon", bemba: "Mwabeleni" },
  { english: "Good evening", bemba: "Mwaungukeni" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "Thank you very much", bemba: "Natotela sana" },
  { english: "Please", bemba: "Nomba" },
  { english: "Yes", bemba: "Eya" },
  { english: "No", bemba: "Awe" },
  { english: "Welcome", bemba: "Mwaiseni" },
  { english: "Goodbye", bemba: "Shalenipo" },
  { english: "See you", bemba: "Tukamonana" },
  { english: "What is your name?", bemba: "Mwishuka shani?" },
  { english: "My name is", bemba: "Ishina lyandi ni" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Where are you going?", bemba: "Uya kwisa?" },
  { english: "I am going home", bemba: "Ndi kuya ku ng'anda" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "I love you", bemba: "Nalikutemwa" },
  { english: "I don't know", bemba: "Tasheni" },
  { english: "I understand", bemba: "Ndemfwa" },
  { english: "I don't understand", bemba: "Tandemfwa" },
  { english: "Come here", bemba: "Iseni apa" },
  { english: "Wait", bemba: "Lindeni" },
  { english: "Let's go", bemba: "Tuleke" },
  { english: "Eat", bemba: "Lya" },
  { english: "Drink", bemba: "Nwa" },
  { english: "Water", bemba: "Amenshi" },
  { english: "Food", bemba: "Ifyakulya" },
  { english: "House", bemba: "Ing'anda" },
  { english: "Person", bemba: "Umuntu" },
  { english: "People", bemba: "Abantu" },
  { english: "Friend", bemba: "Cisuma" },
  { english: "Child", bemba: "Umwana" },
  { english: "Man", bemba: "Umwaume" },
  { english: "Woman", bemba: "Umukashana" },
  { english: "Money", bemba: "Indalama" },
  { english: "School", bemba: "Isukulu" },
  { english: "Teacher", bemba: "Umusambilishi" },
  { english: "Student", bemba: "Umusambilila" },
  { english: "Book", bemba: "Icitabo" },
  { english: "Today", bemba: "Lelo" },
  { english: "Tomorrow", bemba: "Mailo" },
  { english: "Yesterday", bemba: "Mailo yapita" },
  { english: "Now", bemba: "Nomba" },
  { english: "Here", bemba: "Apa" },
  { english: "There", bemba: "Kula" },
  { english: "Big", bemba: "Kulu" },
  { english: "Small", bemba: "Kace" },
  { english: "Good", bemba: "Busuma" },
  { english: "Bad", bemba: "Bubi" },
  { english: "Beautiful", bemba: "Busuma" },
  { english: "Happy", bemba: "Ukwanga" },
  { english: "Sorry", bemba: "Ndekelesheni" },
  { english: "Excuse me", bemba: "Ndekelesheni" },
  { english: "Help me", bemba: "Mundafwako" },
  { english: "What?", bemba: "Cinshi?" },
  { english: "Who?", bemba: "Nani?" },
  { english: "Where?", bemba: "Kwisa?" },
  { english: "Why?", bemba: "Cinshi ico?" },
  { english: "When?", bemba: "Ninshi?" },
];

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
   BOTTOM NAVIGATION
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
   HELPERS
   ========================================================= */

function getTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");

  const [search, setSearch] = useState("");

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [favourite, setFavourite] = useState(false);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");

  /* =======================================================
     DICTIONARY SEARCH
     ======================================================= */

  const filteredDictionary = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return dictionary;
    }

    return dictionary.filter(
      (item) =>
        item.english.toLowerCase().includes(query) ||
        item.bemba.toLowerCase().includes(query),
    );
  }, [search]);

  /* =======================================================
     TRANSLATION
     ======================================================= */

  function translateText(text: string = input) {
    const clean = text.trim();

    if (!clean) {
      setTranslation("");
      return;
    }

    const exact = dictionary.find(
      (item) => item.english.toLowerCase() === clean.toLowerCase(),
    );

    if (exact) {
      setTranslation(exact.bemba);

      setHistory((previous) => [
        {
          english: clean,
          bemba: exact.bemba,
          time: getTime(),
        },
        ...previous,
      ]);

      return;
    }

    const words = clean
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[?.!,]/g, ""));

    const translatedWords = words.map((word) => {
      const found = dictionary.find(
        (item) => item.english.toLowerCase() === word,
      );

      return found ? found.bemba : word;
    });

    const result = translatedWords.join(" ");

    setTranslation(result);

    setHistory((previous) => [
      {
        english: clean,
        bemba: result,
        time: getTime(),
      },
      ...previous,
    ]);
  }

  /* =======================================================
     QUICK PHRASE
     ======================================================= */

  function usePhrase(english: string, bemba: string) {
    setInput(english);
    setTranslation(bemba);

    setHistory((previous) => [
      {
        english,
        bemba,
        time: getTime(),
      },
      ...previous,
    ]);

    setPage("home");
  }

  /* =======================================================
     COPY
     ======================================================= */

  async function copyTranslation() {
    if (!translation) return;

    try {
      await navigator.clipboard.writeText(translation);
    } catch {
      // Clipboard may not be available in some Android WebViews.
    }
  }

  /* =======================================================
     GPS
     ======================================================= */

  function locateUser() {
    setGpsError("");

    if (!navigator.geolocation) {
      setGpsError("GPS is not available on this device.");
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAccuracy(position.coords.accuracy);

        setGpsLoading(false);
      },
      (error) => {
        setGpsLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setGpsError(
            "Location permission was denied. Allow location permission and try again.",
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGpsError("Your current location could not be determined.");
        } else {
          setGpsError("Unable to get your current location.");
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

  function renderHeader() {
    return (
      <header className="app-header">
        <div className="header-title">
          <div className="header-icon">
            <Languages size={18} />
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

  function renderHome() {
    return (
      <div className="page">
        <section className="welcome-card">
          <span className="eyebrow">BEMBATRANSLATE</span>

          <h1>Speak Bemba with confidence.</h1>

          <p>
            Translate everyday English into Bemba completely offline.
            Your essential language tools stay available on your device.
          </p>
        </section>

        <div className="section-title">
          <div>
            <h2>Quick translation</h2>
            <p>English to Bemba</p>
          </div>

          <span className="local-pill">
            <WifiOff size={11} />
            Offline
          </span>
        </div>

        <section className="translation-card">
          <div className="language-strip">
            <div>
              <small>FROM</small>
              <strong>English</strong>
            </div>

            <div className="language-arrow">
              <ChevronRight size={18} />
            </div>

            <div>
              <small>TO</small>
              <strong>Bemba</strong>
            </div>
          </div>

          <div className="input-label-row">
            <span>Enter English</span>
            <span>{input.length}/500</span>
          </div>

          <textarea
            value={input}
            maxLength={500}
            placeholder="Type something in English..."
            onChange={(event) => setInput(event.target.value)}
          />

          <button
            className="translate-button"
            onClick={() => translateText()}
            disabled={!input.trim()}
          >
            <Languages size={16} />
            Translate
          </button>

          <div className="result-box">
            {translation ? (
              <>
                <div className="result-heading">
                  <span>
                    <span className="bemba-dot" />
                    Bemba translation
                  </span>

                  <span className="ready-label">
                    <Check size={11} />
                    Ready
                  </span>
                </div>

                <div className="translation-result">
                  <strong>{translation}</strong>

                  <div className="result-actions">
                    <button onClick={copyTranslation}>
                      <Copy size={13} />
                      Copy
                    </button>

                    <button
                      className={favourite ? "selected" : ""}
                      onClick={() => setFavourite(!favourite)}
                    >
                      <Heart size={13} fill={favourite ? "currentColor" : "none"} />
                      Favourite
                    </button>

                    <button>
                      <Volume2 size={13} />
                      Listen
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-result">
                <Languages size={24} />

                <strong>Your translation will appear here</strong>

                <span>Enter an English phrase above.</span>
              </div>
            )}
          </div>
        </section>

        <div className="section-title">
          <div>
            <h2>Useful phrases</h2>
            <p>Tap a phrase to use it</p>
          </div>
        </div>

        <div className="phrase-grid">
          {quickPhrases.map((phrase) => (
            <button
              className="phrase-card"
              key={phrase.english}
              onClick={() => usePhrase(phrase.english, phrase.bemba)}
            >
              <span>{phrase.english}</span>
              <strong>{phrase.bemba}</strong>
            </button>
          ))}
        </div>

        <div className="offline-info">
          <div className="info-icon">
            <WifiOff size={15} />
          </div>

          <div>
            <strong>Works offline</strong>
            <span>
              Translation and dictionary data are stored locally on your
              device.
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     DICTIONARY
     ======================================================= */

  function renderDictionary() {
    return (
      <div className="page">
        <div className="page-intro">
          <h1>Dictionary</h1>
          <p>Search English and Bemba words stored on your device.</p>
        </div>

        <div className="search-field">
          <Search size={17} />

          <input
            value={search}
            placeholder="Search dictionary..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="dictionary-count">
          Showing {filteredDictionary.length} entries
        </div>

        <div className="dictionary-list">
          {filteredDictionary.map((entry) => (
            <button
              className="dictionary-card"
              key={`${entry.english}-${entry.bemba}`}
              onClick={() => usePhrase(entry.english, entry.bemba)}
            >
              <div>
                <span>{entry.english}</span>
                <strong>{entry.bemba}</strong>
              </div>

              <ChevronRight size={16} />
            </button>
          ))}

          {filteredDictionary.length === 0 && (
            <div className="large-empty">
              <Search size={28} />
              <strong>No matching words</strong>
              <span>Try another English or Bemba word.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     LEARN
     ======================================================= */

  function renderLearn() {
    return (
      <div className="page">
        <div className="page-intro">
          <h1>Learn Bemba</h1>
          <p>Build your everyday Bemba vocabulary step by step.</p>
        </div>

        <div className="learn-grid">
          {learningCards.map((card, index) => (
            <button className="learn-card" key={card.title}>
              <span className="learn-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{card.title}</strong>

              <small>{card.description}</small>
            </button>
          ))}
        </div>

        <div className="offline-info">
          <div className="info-icon">
            <Sparkles size={15} />
          </div>

          <div>
            <strong>Keep learning offline</strong>
            <span>
              Your learning content is available without an internet
              connection.
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     HISTORY
     ======================================================= */

  function renderHistory() {
    return (
      <div className="page">
        <div className="page-intro">
          <h1>History</h1>
          <p>Your recent translations are kept on this device.</p>
        </div>

        <div className="history-toolbar">
          <span>{history.length} translation(s)</span>

          {history.length > 0 && (
            <button onClick={() => setHistory([])}>Clear history</button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="large-empty">
            <Clock3 size={28} />

            <strong>No translation history</strong>

            <span>
              Translations you make will appear here.
            </span>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item, index) => (
              <button
                className="history-card"
                key={`${item.time}-${index}`}
                onClick={() => usePhrase(item.english, item.bemba)}
              >
                <div>
                  <small>{item.time}</small>
                  <span>{item.english}</span>
                  <strong>{item.bemba}</strong>
                </div>

                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* =======================================================
     MAP NAVIGATION
     ======================================================= */

  function renderNavigation() {
    const hasLocation = latitude !== null && longitude !== null;

    return (
      <div className="navigation-page">
        <div className="navigation-heading">
          <div>
            <span className="section-label">
              <Map size={12} />
              OFFLINE NAVIGATION
            </span>

            <h1>Map & Navigation</h1>

            <p>
              Your offline navigation area. GPS can determine your position
              without mobile data or Wi-Fi.
            </p>
          </div>

          <button
            className="clear-button"
            onClick={() => {
              setLatitude(null);
              setLongitude(null);
              setAccuracy(null);
              setGpsError("");
            }}
          >
            Clear
          </button>
        </div>

        <div className="navigation-status-card">
          <div className="navigation-status-icon">
            <LocateFixed size={20} />
          </div>

          <div>
            <strong>
              {gpsLoading
                ? "Finding your location..."
                : hasLocation
                  ? "Location found"
                  : "Location not active"}
            </strong>

            <span>
              {gpsLoading
                ? "Please wait while GPS determines your position."
                : hasLocation
                  ? "Your current GPS position is available."
                  : "Tap the location button below to start GPS."}
            </span>
          </div>

          <span
            className={`gps-status-dot ${hasLocation ? "active" : ""}`}
          />
        </div>

        <div className="offline-map-card">
          <div className="offline-map-grid" />

          {!hasLocation ? (
            <div className="map-placeholder">
              <Map size={38} />

              <strong>Offline map area</strong>

              <span>
                This is the map area where the packaged campus or Zambia
                map will be displayed.
              </span>

              <button
                className="translate-button"
                style={{
                  width: "auto",
                  margin: "8px 0 0",
                  padding: "0 16px",
                }}
                onClick={locateUser}
                disabled={gpsLoading}
              >
                <LocateFixed size={15} />
                {gpsLoading ? "Locating..." : "Find my location"}
              </button>
            </div>
          ) : (
            <>
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

              <div className="map-placeholder">
                <Navigation size={34} />

                <strong>GPS position detected</strong>

                <span>
                  Your position is ready for the offline navigation
                  system.
                </span>
              </div>
            </>
          )}
        </div>

        <div className="navigation-location-card">
          <div className="location-header">
            <div>
              <span>YOUR LOCATION</span>
              <strong>
                {hasLocation ? "GPS coordinates" : "Waiting for GPS"}
              </strong>
            </div>

            <button
              className="navigation-refresh"
              onClick={locateUser}
              disabled={gpsLoading}
              aria-label="Refresh location"
            >
              <RefreshCw
                size={16}
                className={gpsLoading ? "spin" : ""}
              />
            </button>
          </div>

          {hasLocation ? (
            <div className="coordinate-grid">
              <div>
                <span>LATITUDE</span>
                <strong>{latitude.toFixed(6)}</strong>
              </div>

              <div>
                <span>LONGITUDE</span>
                <strong>{longitude.toFixed(6)}</strong>
              </div>

              <div>
                <span>ACCURACY</span>
                <strong>
                  {accuracy !== null
                    ? `${Math.round(accuracy)} m`
                    : "Unknown"}
                </strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong>GPS active</strong>
              </div>
            </div>
          ) : (
            <div className="location-empty">
              Your coordinates will appear here after you allow location
              access.
            </div>
          )}

          {gpsError && <div className="gps-error">{gpsError}</div>}
        </div>

        <div className="navigation-coming-card">
          <div>
            <strong>Offline campus maps</strong>

            <p>
              The next navigation stage is where we add a real locally
              packaged campus map, buildings, landmarks, walking routes,
              and "You are here" positioning. This does not require
              changing your dictionary.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     SETTINGS
     ======================================================= */

  function renderSettings() {
    return (
      <div className="page">
        <div className="page-intro">
          <h1>Settings</h1>
          <p>Information about your offline BembaTranslate app.</p>
        </div>

        <div className="settings-card">
          <div className="setting-row">
            <div>
              <strong>Offline mode</strong>
              <span>Translation data is stored locally.</span>
            </div>

            <WifiOff size={18} />
          </div>

          <div className="setting-row">
            <div>
              <strong>Dictionary</strong>
              <span>{dictionary.length} built-in entries.</span>
            </div>

            <BookOpen size={18} />
          </div>

          <div className="setting-row">
            <div>
              <strong>Navigation</strong>
              <span>GPS location is available on supported devices.</span>
            </div>

            <Navigation size={18} />
          </div>

          <div className="setting-row">
            <div>
              <strong>App status</strong>
              <span className="status-on">
                <Check size={11} />
                Ready
              </span>
            </div>

            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="privacy-card">
          <div className="privacy-icon">
            <ShieldCheck size={15} />
          </div>

          <div>
            <strong>Private and offline</strong>

            <span>
              Your translations and dictionary searches do not need an
              internet connection.
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     CURRENT PAGE
     ======================================================= */

  function renderPage() {
    switch (page) {
      case "dictionary":
        return renderDictionary();

      case "learn":
        return renderLearn();

      case "history":
        return renderHistory();

      case "navigation":
        return renderNavigation();

      case "settings":
        return renderSettings();

      case "home":
      default:
        return renderHome();
    }
  }

  /* =======================================================
     APP UI
     ======================================================= */

  return (
    <div className="app">
      <div className="wallpaper" />

      <div className="app-content">
        {renderHeader()}

        <main>{renderPage()}</main>
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
