import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Clock3,
  Copy,
  Heart,
  History,
  Home,
  Languages,
  LocateFixed,
  Map,
  Navigation,
  Search,
  Settings,
  Sparkles,
  Volume2,
  WifiOff,
} from "lucide-react";

import "./global.css";
import dictionary from "./data/bembaDictionary";

type Page =
  | "home"
  | "dictionary"
  | "learn"
  | "history"
  | "navigation"
  | "settings";

type HistoryEntry = {
  english: string;
  bemba: string;
  time: string;
};

const quickPhrases = [
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
];

const learningCards = [
  {
    title: "Greetings",
    description: "Common Bemba greetings.",
  },
  {
    title: "Everyday",
    description: "Useful everyday vocabulary.",
  },
  {
    title: "People",
    description: "Words for talking about people.",
  },
  {
    title: "Questions",
    description: "Useful questions in Bemba.",
  },
];

const places = [
  "Main Gate",
  "Administration",
  "Library",
  "Student Centre",
  "Lecture Block",
  "Cafeteria",
  "Health Centre",
  "Sports Ground",
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [english, setEnglish] = useState("");
  const [translation, setTranslation] = useState("");
  const [dictionarySearch, setDictionarySearch] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("Library");

  const filteredDictionary = useMemo(() => {
    const query = dictionarySearch.trim().toLowerCase();

    if (!query) {
      return dictionary.slice(0, 60);
    }

    return dictionary
      .filter(
        (item) =>
          item.english.toLowerCase().includes(query) ||
          item.bemba.toLowerCase().includes(query),
      )
      .slice(0, 100);
  }, [dictionarySearch]);

  const translate = (text = english) => {
    const value = text.trim();

    if (!value) {
      setTranslation("");
      return;
    }

    const exact = dictionary.find(
      (item) => item.english.toLowerCase() === value.toLowerCase(),
    );

    if (exact) {
      setTranslation(exact.bemba);
      addHistory(exact.english, exact.bemba);
      return;
    }

    const partial = dictionary.find(
      (item) =>
        item.english.toLowerCase().includes(value.toLowerCase()) ||
        value.toLowerCase().includes(item.english.toLowerCase()),
    );

    if (partial) {
      setTranslation(partial.bemba);
      addHistory(value, partial.bemba);
      return;
    }

    setTranslation("Translation not found offline.");
  };

  const addHistory = (source: string, result: string) => {
    const item: HistoryEntry = {
      english: source,
      bemba: result,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistory((current) => [item, ...current].slice(0, 20));
  };

  const copyTranslation = async () => {
    if (!translation) return;

    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const speak = () => {
    if (!translation || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(translation);
    speech.lang = "bem";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
  };

  const navItems: { page: Page; label: string; icon: typeof Home }[] = [
    { page: "home", label: "Home", icon: Home },
    { page: "dictionary", label: "Dictionary", icon: BookOpen },
    { page: "learn", label: "Learn", icon: Languages },
    { page: "history", label: "History", icon: History },
    { page: "navigation", label: "Navigate", icon: Navigation },
    { page: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Languages size={21} />
          </div>

          <div>
            <div className="brand-title">BembaTranslate</div>
            <div className="brand-subtitle">Offline Bemba companion</div>
          </div>
        </div>

        <div className="offline-pill">
          <WifiOff size={14} />
          Offline
        </div>
      </header>

      <main className="main-content">
        {page === "home" && (
          <section className="page">
            <div className="hero-card">
              <div>
                <span className="eyebrow">
                  <Sparkles size={14} />
                  ENGLISH → BEMBA
                </span>

                <h1>Translate naturally, even offline.</h1>

                <p>
                  Translate everyday English into Bemba using the vocabulary
                  stored inside the app.
                </p>
              </div>

              <div className="hero-icon">
                <Languages size={42} />
              </div>
            </div>

            <section className="translator-card">
              <div className="section-heading">
                <div>
                  <span className="section-label">TRANSLATOR</span>
                  <h2>English to Bemba</h2>
                </div>

                <span className="offline-small">
                  <WifiOff size={13} />
                  No internet
                </span>
              </div>

              <textarea
                value={english}
                onChange={(event) => setEnglish(event.target.value)}
                placeholder="Type English here..."
                className="translation-input"
              />

              <button className="primary-button" onClick={() => translate()}>
                Translate
              </button>

              {translation && (
                <div className="result-card">
                  <div className="result-top">
                    <span>BEMBA</span>

                    <div className="result-actions">
                      <button
                        className="icon-button"
                        onClick={copyTranslation}
                        title="Copy"
                      >
                        {copied ? <Check size={17} /> : <Copy size={17} />}
                      </button>

                      <button
                        className="icon-button"
                        onClick={speak}
                        title="Speak"
                      >
                        <Volume2 size={17} />
                      </button>
                    </div>
                  </div>

                  <div className="translation-result">{translation}</div>
                </div>
              )}
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">QUICK PHRASES</span>
                  <h2>Useful expressions</h2>
                </div>
              </div>

              <div className="phrase-grid">
                {quickPhrases.map((phrase) => (
                  <button
                    className="phrase-card"
                    key={phrase.english}
                    onClick={() => {
                      setEnglish(phrase.english);
                      setTranslation(phrase.bemba);
                      addHistory(phrase.english, phrase.bemba);
                    }}
                  >
                    <span>{phrase.english}</span>
                    <strong>{phrase.bemba}</strong>
                  </button>
                ))}
              </div>
            </section>
          </section>
        )}

        {page === "dictionary" && (
          <section className="page">
            <div className="page-title">
              <div>
                <span className="section-label">VOCABULARY</span>
                <h1>Bemba Dictionary</h1>
                <p>Search the offline dictionary.</p>
              </div>

              <BookOpen size={32} />
            </div>

            <div className="search-box">
              <Search size={19} />
              <input
                value={dictionarySearch}
                onChange={(event) => setDictionarySearch(event.target.value)}
                placeholder="Search English or Bemba..."
              />
            </div>

            <div className="dictionary-list">
              {filteredDictionary.map((item, index) => (
                <button
                  className="dictionary-row"
                  key={`${item.english}-${index}`}
                  onClick={() => {
                    setEnglish(item.english);
                    setTranslation(item.bemba);
                    addHistory(item.english, item.bemba);
                    setPage("home");
                  }}
                >
                  <div>
                    <span className="english-word">{item.english}</span>
                    <strong>{item.bemba}</strong>
                  </div>

                  <span className="dictionary-arrow">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {page === "learn" && (
          <section className="page">
            <div className="page-title">
              <div>
                <span className="section-label">LEARNING</span>
                <h1>Learn Bemba</h1>
                <p>Build useful everyday vocabulary.</p>
              </div>

              <Languages size={32} />
            </div>

            <div className="learning-grid">
              {learningCards.map((card) => (
                <div className="learning-card" key={card.title}>
                  <div className="learning-icon">
                    <BookOpen size={19} />
                  </div>

                  <h3>{card.title}</h3>
                  <p>{card.description}</p>

                  <button
                    className="small-button"
                    onClick={() => setPage("dictionary")}
                  >
                    View words
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "history" && (
          <section className="page">
            <div className="page-title">
              <div>
                <span className="section-label">RECENT</span>
                <h1>Translation History</h1>
                <p>Your recent offline translations.</p>
              </div>

              <Clock3 size={32} />
            </div>

            {history.length === 0 ? (
              <div className="empty-card">
                <History size={34} />
                <h3>No translations yet</h3>
                <p>Your recent translations will appear here.</p>
              </div>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div className="history-row" key={`${item.time}-${index}`}>
                    <div>
                      <span>{item.english}</span>
                      <strong>{item.bemba}</strong>
                    </div>

                    <time>{item.time}</time>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {page === "navigation" && (
          <section className="page navigation-page">
            <div className="page-title">
              <div>
                <span className="section-label">OFFLINE CAMPUS MAP</span>
                <h1>Navigation</h1>
                <p>Find places and navigate around campus offline.</p>
              </div>

              <Map size={32} />
            </div>

            <div className="navigation-layout">
              <div className="map-panel">
                <div className="map-toolbar">
                  <div>
                    <strong>Campus Map</strong>
                    <span>
                      <WifiOff size={12} /> Offline map
                    </span>
                  </div>

                  <button
                    className="location-button"
                    onClick={() => setSelectedPlace("Your location")}
                    title="My location"
                  >
                    <LocateFixed size={18} />
                  </button>
                </div>

                <div className="campus-map">
                  <div className="map-grid-lines" />

                  <div className="road road-one" />
                  <div className="road road-two" />
                  <div className="road road-three" />

                  <div className="building building-a">
                    <span>ADMIN</span>
                  </div>

                  <div className="building building-b">
                    <span>LIBRARY</span>
                  </div>

                  <div className="building building-c">
                    <span>STUDENT</span>
                  </div>

                  <
