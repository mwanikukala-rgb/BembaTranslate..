import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Copy,
  Heart,
  History,
  Home,
  Languages,
  LocateFixed,
  Map,
  Navigation,
  RefreshCw,
  Search,
  Settings,
  Volume2,
  WifiOff,
  X,
} from "lucide-react";

import "./global.css";

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

/*
 * IMPORTANT:
 * Keep your existing dictionary in this file if you already have
 * a larger dictionary.
 *
 * This small fallback dictionary is only here so App.tsx builds
 * independently. It does not modify your dictionary data file.
 */
const dictionary: DictionaryEntry[] = [
  { english: "Hello", bemba: "Muli shani" },
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "Good afternoon", bemba: "Mwabeleni" },
  { english: "Good evening", bemba: "Mwaungukeni" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "Please", bemba: "Nomba" },
  { english: "Yes", bemba: "Eya" },
  { english: "No", bemba: "Awe" },
  { english: "Welcome", bemba: "Mwaiseni" },
  { english: "Goodbye", bemba: "Shalenipo" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Where are you going?", bemba: "Uya kwisa?" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "I love you", bemba: "Nalikutemwa" },
  { english: "I understand", bemba: "Ndemfwa" },
  { english: "Water", bemba: "Amenshi" },
  { english: "Food", bemba: "Ifyakulya" },
  { english: "House", bemba: "Ing'anda" },
  { english: "Person", bemba: "Umuntu" },
  { english: "People", bemba: "Abantu" },
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
  { english: "Good", bemba: "Busuma" },
  { english: "Bad", bemba: "Bubi" },
  { english: "Sorry", bemba: "Ndekelesheni" },
  { english: "Excuse me", bemba: "Ndekelesheni" },
  { english: "Help me", bemba: "Mundafwako" },
  { english: "What?", bemba: "Cinshi?" },
  { english: "Who?", bemba: "Nani?" },
  { english: "Where?", bemba: "Kwisa?" },
  { english: "Why?", bemba: "Cinshi ico?" },
  { english: "When?", bemba: "Ninshi?" },
];

const quickPhrases: DictionaryEntry[] = [
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "I love you", bemba: "Nalikutemwa" },
];

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

function App() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const translation = useMemo(() => {
    const value = input.trim().toLowerCase();

    if (!value) {
      return "";
    }

    const exact = dictionary.find(
      (entry) => entry.english.toLowerCase() === value
    );

    if (exact) {
      return exact.bemba;
    }

    const partial = dictionary.find(
      (entry) =>
        entry.english.toLowerCase().includes(value) ||
        value.includes(entry.english.toLowerCase())
    );

    return partial?.bemba ?? "Translation not found";
  }, [input]);

  const filteredDictionary = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return dictionary;
    }

    return dictionary.filter(
      (entry) =>
        entry.english.toLowerCase().includes(value) ||
        entry.bemba.toLowerCase().includes(value)
    );
  }, [search]);

  function translateText() {
    if (!input.trim() || !translation) {
      return;
    }

    const newEntry: HistoryEntry = {
      english: input.trim(),
      bemba: translation,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistory((old) => [
      newEntry,
      ...old.filter(
        (item) =>
          item.english.toLowerCase() !== newEntry.english.toLowerCase()
      ),
    ]);
  }

  async function copyTranslation() {
    if (!translation || translation === "Translation not found") {
      return;
    }

    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  function speak(text: string) {
    if (!text || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bem-ZM";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  }

  function toggleFavourite(text: string) {
    setFavourites((old) =>
      old.includes(text)
        ? old.filter((item) => item !== text)
        : [...old, text]
    );
  }

  function selectPhrase(phrase: DictionaryEntry) {
    setInput(phrase.english);

    const newEntry: HistoryEntry = {
      english: phrase.english,
      bemba: phrase.bemba,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistory((old) => [newEntry, ...old]);

    setPage("home");
  }

  function clearHistory() {
    setHistory([]);
  }

  function renderHome() {
    return (
      <main className="page">
        <section className="hero">
          <div className="hero-badge">
            <WifiOff size={14} />
            <span>Works offline</span>
          </div>

          <h1>English → Bemba</h1>

          <p>
            Translate everyday English into Bemba without needing an
            internet connection.
          </p>
        </section>

        <section className="translator-card">
          <div className="card-label">
            <span>English</span>

            {input && (
              <button
                className="icon-button"
                onClick={() => setInput("")}
                aria-label="Clear"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type an English word or phrase..."
            rows={4}
          />

          <button className="primary-button" onClick={translateText}>
            <Languages size={18} />
            Translate
          </button>

          <div className="translation-result">
            <div className="result-top">
              <span>Bemba</span>

              {translation && translation !== "Translation not found" && (
                <div className="result-actions">
                  <button
                    className="icon-button"
                    onClick={copyTranslation}
                    aria-label="Copy translation"
                  >
                    <Copy size={17} />
                  </button>

                  <button
                    className="icon-button"
                    onClick={() => speak(translation)}
                    aria-label="Play pronunciation"
                  >
                    <Volume2 size={17} />
                  </button>
                </div>
              )}
            </div>

            <div className="result-text">
              {translation || "Your Bemba translation will appear here."}
            </div>

            {copied && <small>Copied</small>}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <h2>Quick phrases</h2>
              <p>Useful everyday expressions</p>
            </div>

            <ChevronRight size={19} />
          </div>

          <div className="phrase-grid">
            {quickPhrases.map((phrase) => (
              <button
                className="phrase-card"
                key={phrase.english}
                onClick={() => selectPhrase(phrase)}
              >
                <span>{phrase.english}</span>
                <strong>{phrase.bemba}</strong>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  function renderDictionary() {
    return (
      <main className="page">
        <section className="page-header">
          <div>
            <h1>Dictionary</h1>
            <p>Search the offline Bemba dictionary.</p>
          </div>

          <BookOpen size={26} />
        </section>

        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search English or Bemba..."
          />

          {search && (
            <button
              className="icon-button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="dictionary-list">
          {filteredDictionary.map((entry) => (
            <article className="dictionary-row" key={entry.english}>
              <div>
                <span>{entry.english}</span>
                <strong>{entry.bemba}</strong>
              </div>

              <div className="row-actions">
                <button
                  className="icon-button"
                  onClick={() => speak(entry.bemba)}
                  aria-label="Pronounce"
                >
                  <Volume2 size={17} />
                </button>

                <button
                  className="icon-button"
                  onClick={() => toggleFavourite(entry.english)}
                  aria-label="Favourite"
                >
                  <Heart
                    size={17}
                    fill={
                      favourites.includes(entry.english)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>
            </article>
          ))}

          {filteredDictionary.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No results</h3>
              <p>Try another English or Bemba word.</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  function renderLearn() {
    return (
      <main className="page">
        <section className="page-header">
          <div>
            <h1>Learn Bemba</h1>
            <p>Build your vocabulary one category at a time.</p>
          </div>

          <Languages size={26} />
        </section>

        <div className="learning-grid">
          {learningCards.map((card) => (
            <button className="learning-card" key={card.title}>
              <div className="learning-icon">
                <BookOpen size={20} />
              </div>

              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>

              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </main>
    );
  }

  function renderHistory() {
    return (
      <main className="page">
        <section className="page-header">
          <div>
            <h1>History</h1>
            <p>Your recent translations.</p>
          </div>

          <Clock3 size={26} />
        </section>

        {history.length > 0 ? (
          <>
            <div className="history-toolbar">
              <span>{history.length} translation(s)</span>

              <button className="secondary-button" onClick={clearHistory}>
                <RefreshCw size={16} />
                Clear
              </button>
            </div>

            <div className="history-list">
              {history.map((entry, index) => (
                <article
                  className="history-row"
                  key={`${entry.english}-${index}`}
                >
                  <div>
                    <span>{entry.english}</span>
                    <strong>{entry.bemba}</strong>
                  </div>

                  <small>{entry.time}</small>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <History size={30} />
            <h3>No translation history</h3>
            <p>Your recent translations will appear here.</p>
          </div>
        )}
      </main>
    );
  }

  function renderNavigation() {
    return (
      <main className="page navigation-page">
        <section className="page-header">
          <div>
            <h1>Offline Navigation</h1>
            <p>Find your way around a supported campus or location.</p>
          </div>

          <Navigation size={27} />
        </section>

        <section className="map-card">
          <div className="map-toolbar">
            <div>
              <strong>Campus Map</strong>
              <span>Offline map</span>
            </div>

            <button
              className="icon-button"
              onClick={() => window.location.reload()}
              aria-label="Refresh map"
            >
              <RefreshCw size={17} />
            </button>
          </div>

          <div className="map-area">
            <div className="map-grid" />

            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />

            <div className="map-building building-one">
              <span>Library</span>
            </div>

            <div className="map-building building-two">
              <span>Lecture Block</span>
            </div>

            <div className="map-building building-three">
              <span>Student Centre</span>
            </div>

            <div className="map-building building-four">
              <span>Administration</span>
            </div>

            <div className="you-are-here">
              <LocateFixed size={18} />
            </div>

            <div className="map-label label-top">Campus</div>
            <div className="map-label label-bottom">Main Entrance</div>
          </div>

          <div className="map-actions">
            <button
              className="primary-button"
              onClick={() => alert("Location service requested.")}
            >
              <LocateFixed size={18} />
              My location
            </button>

            <button
              className="secondary-button"
              onClick={() => alert("Offline campus map is ready.")}
            >
              <Map size={18} />
              Browse map
            </button>
          </div>
        </section>

        <section className="navigation-info">
          <div className="info-icon">
            <Navigation size={19} />
          </div>

          <div>
            <h3>Offline directions</h3>
            <p>
              Campus map data can be packaged directly inside the app so
              navigation does not depend on mobile data.
            </p>
          </div>
        </section>
      </main>
    );
  }

  function renderSettings() {
    return (
      <main className="page">
        <section className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Configure your offline companion.</p>
          </div>

          <Settings size={26} />
        </section>

        <div className="settings-list">
          <div className="settings-row">
            <div>
              <strong>Offline mode</strong>
              <span>Dictionary and core features work without internet.</span>
            </div>

            <div className="status-pill">
              <WifiOff size={14} />
              Offline
            </div>
          </div>

          <div className="settings-row">
            <div>
              <strong>Saved favourites</strong>
              <span>{favourites.length} saved word(s)</span>
            </div>

            <Heart size={19} />
          </div>

          <div className="settings-row">
            <div>
              <strong>Translation history</strong>
              <span>{history.length} recent translation(s)</span>
            </div>

            <History size={19} />
          </div>
        </div>
      </main>
    );
  }

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

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">
            <Languages size={21} />
          </div>

          <div>
            <strong>BembaTranslate</strong>
            <span>Offline Bemba companion</span>
          </div>
        </div>

        <div className="offline-indicator">
          <span />
          Offline
        </div>
      </header>

      <div className="app-content">{renderPage()}</div>

      <nav className="bottom-navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = page === item.page;

          return (
            <button
              key={item.page}
              className={active ? "nav-item active" : "nav-item"}
              onClick={() => setPage(item.page)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
