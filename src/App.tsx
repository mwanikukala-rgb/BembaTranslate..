import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  Heart,
  History as HistoryIcon,
  Languages,
  Search,
  Settings,
  Sparkles,
  Volume2,
} from "lucide-react";

import { bembaDictionary } from "./data/bembaDictionary";
import { translateWithFallback } from "./engine/bembaTranslator";
import "./styles/global.css";

type Page =
  | "translate"
  | "dictionary"
  | "learn"
  | "history"
  | "settings";

type HistoryItem = {
  id: number;
  english: string;
  bemba: string;
  time: string;
};

type Phrase = {
  english: string;
  bemba: string;
};

const quickPhrases: Phrase[] = [
  {
    english: "How are you?",
    bemba: "Mulishani",
  },
  {
    english: "Good morning",
    bemba: "Mwashibukeni",
  },
  {
    english: "I want money",
    bemba: "Ndefwaya indalama",
  },
  {
    english: "Where are you?",
    bemba: "Ulikwisa",
  },
  {
    english: "Where are they?",
    bemba: "Balikwisa",
  },
  {
    english: "I'm angry",
    bemba: "Nimfulwa",
  },
];

const navItems: {
  id: Page;
  label: string;
  icon: typeof Languages;
}[] = [
  {
    id: "translate",
    label: "Translate",
    icon: Languages,
  },
  {
    id: "dictionary",
    label: "Dictionary",
    icon: BookOpen,
  },
  {
    id: "learn",
    label: "Learn",
    icon: Sparkles,
  },
  {
    id: "history",
    label: "History",
    icon: HistoryIcon,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

function App() {
  const [launching, setLaunching] = useState(true);
  const [progress, setProgress] = useState(0);

  const [page, setPage] = useState<Page>("translate");

  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");

  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [dictionarySearch, setDictionarySearch] = useState("");

  /* =======================================================
     LAUNCH SCREEN
  ======================================================= */

  useEffect(() => {
    let value = 0;

    const interval = window.setInterval(() => {
      value += Math.floor(Math.random() * 8) + 4;

      if (value >= 100) {
        value = 100;
        setProgress(100);

        window.clearInterval(interval);

        window.setTimeout(() => {
          setLaunching(false);
        }, 400);
      } else {
        setProgress(value);
      }
    }, 55);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     DICTIONARY SEARCH
  ======================================================= */

  const filteredDictionary = useMemo(() => {
    const query = dictionarySearch.trim().toLowerCase();

    if (!query) {
      return bembaDictionary.slice(0, 100);
    }

    return bembaDictionary
      .filter((item) => {
        const english = String(item.english).toLowerCase();
        const bemba = String(item.bemba).toLowerCase();

        return (
          english.includes(query) ||
          bemba.includes(query)
        );
      })
      .slice(0, 200);
  }, [dictionarySearch]);

  /* =======================================================
     TRANSLATION
  ======================================================= */

  const translate = () => {
    const input = englishText.trim();

    if (!input || isTranslating) {
      return;
    }

    setIsTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const quickMatch = quickPhrases.find(
        (item) =>
          item.english.toLowerCase() ===
          input.toLowerCase()
      );

      const result =
        quickMatch?.bemba ||
        translateWithFallback(input) ||
        "";

      setBembaText(result);

      if (result) {
        setHistory((old) => [
          {
            id: Date.now(),
            english: input,
            bemba: result,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          ...old,
        ]);
      }

      setIsTranslating(false);
    }, 160);
  };

  /* =======================================================
     USE PHRASE
  ======================================================= */

  const usePhrase = (
    english: string,
    bemba: string
  ) => {
    setEnglishText(english);
    setBembaText(bemba);
    setFavourite(false);
    setCopied(false);
    setPage("translate");
  };

  /* =======================================================
     COPY
  ======================================================= */

  const copyTranslation = async () => {
    if (!bembaText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(bembaText);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      setCopied(false);
    }
  };

  /* =======================================================
     AUDIO
  ======================================================= */

  const speak = () => {
    if (!bembaText || isSpeaking) {
      return;
    }

    setIsSpeaking(true);

    /*
      Audio generation can be connected here later.
      Nothing plays automatically.
    */

    window.setTimeout(() => {
      setIsSpeaking(false);
    }, 900);
  };

  /* =======================================================
     CLEAR HISTORY
  ======================================================= */

  const clearHistory = () => {
    setHistory([]);
  };

  /* =======================================================
     PAGE TITLE
  ======================================================= */

  const getPageTitle = () => {
    switch (page) {
      case "translate":
        return "Translate";

      case "dictionary":
        return "Dictionary";

      case "learn":
        return "Learn Bemba";

      case "history":
        return "History";

      case "settings":
        return "Settings";

      default:
        return "BembaTranslate";
    }
  };

  /* =======================================================
     LAUNCH SCREEN
  ======================================================= */

  if (launching) {
    return (
      <div className="launch-screen">
        <div className="launch-decoration launch-decoration-one" />
        <div className="launch-decoration launch-decoration-two" />

        <div className="launch-content">
          <div className="launch-logo">
            <Languages
              size={36}
              strokeWidth={1.7}
            />
          </div>

          <div className="launch-kicker">
            OFFLINE LANGUAGE
          </div>

          <h1>BembaTranslate</h1>

          <p>English • Bemba</p>

          <div className="launch-status">
            <div className="launch-status-row">
              <span>
                Preparing your dictionary
              </span>

              <strong>{progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div className="launch-message">
            <span className="status-check">
              <Check size={12} />
            </span>

            <span>
              Private. Fast. Works without internet.
            </span>
          </div>
        </div>

        <div className="launch-footer">
          <span className="offline-dot" />
          Ready for everyday Bemba
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN APPLICATION
  ======================================================= */

  return (
    <div className="app">
      <div className="wallpaper" />

      <main className="app-content">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="app-header">
          <div className="header-title">
            <span className="header-icon">
              <Languages size={17} />
            </span>

            <div>
              <strong>{getPageTitle()}</strong>

              <span>English → Bemba</span>
            </div>
          </div>

          <div className="offline-badge">
            <span />
            Offline
          </div>
        </header>

        {/* =================================================
            TRANSLATE PAGE
        ================================================= */}

        {page === "translate" && (
          <section className="page">
            <div className="welcome-card">
              <div>
                <span className="eyebrow">
                  BEMBATRANSLATE
                </span>

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

                <span>
                  {englishText.length}/5000
                </span>
              </div>

              <textarea
                value={englishText}
                onChange={(event) => {
                  setEnglishText(
                    event.target.value.slice(0, 5000)
                  );
                }}
                placeholder="Type something in English..."
              />

              <button
                type="button"
                className="translate-button"
                onClick={translate}
                disabled={
                  !englishText.trim() ||
                  isTranslating
                }
              >
                <Languages size={17} />

                {isTranslating
                  ? "Translating..."
                  : "Translate to Bemba"}
              </button>

              <div className="result-box">
                <div className="result-heading">
                  <span>
                    <span className="bemba-dot" />
                    Bemba translation
                  </span>

                  {bembaText && (
                    <span className="ready-label">
                      <Check size={11} />
                      Ready
                    </span>
                  )}
                </div>

                {bembaText ? (
                  <div className="translation-result">
                    <strong>{bembaText}</strong>

                    <div className="result-actions">
                      <button
                        type="button"
                        onClick={() => {
                          setFavourite(
                            (value) => !value
                          );
                        }}
                        className={
                          favourite ? "selected" : ""
                        }
                        aria-label="Favourite translation"
                      >
                        <Heart
                          size={16}
                          fill={
                            favourite
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <button
                        type="button"
                        onClick={copyTranslation}
                        aria-label="Copy translation"
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={speak}
                        aria-label="Listen to translation"
                      >
                        <Volume2 size={16} />

                        {isSpeaking
                          ? "Playing"
                          : "Listen"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="empty-result">
                    <BookOpen size={21} />

                    <strong>
                      Your translation will appear
                      here
                    </strong>

                    <span>
                      Enter an English word or phrase
                      above.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="section-title">
              <div>
                <h2>Popular phrases</h2>

                <p>
                  Useful expressions for everyday life
                </p>
              </div>

              <span className="count-pill">
                {quickPhrases.length}
              </span>
            </div>

            <div className="phrase-grid">
              {quickPhrases.map((phrase) => (
                <button
                  type="button"
                  key={phrase.english}
                  className="phrase-card"
                  onClick={() =>
                    usePhrase(
                      phrase.english,
                      phrase.bemba
                    )
                  }
                >
                  <span>{phrase.english}</span>

                  <strong>{phrase.bemba}</strong>
                </button>
              ))}
            </div>

            <div className="offline-info">
              <div className="info-icon">
                <Check size={15} />
              </div>

              <div>
                <strong>
                  Works completely offline
                </strong>

                <span>
                  Your translations stay on your
                  device.
                </span>
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            DICTIONARY PAGE
        ================================================= */}

        {page === "dictionary" && (
          <section className="page">
            <div className="page-intro">
              <span className="eyebrow">
                BEMBA LANGUAGE
              </span>

              <h1>Dictionary</h1>

              <p>
                Search the complete built-in English →
                Bemba dictionary.
              </p>
            </div>

            <div className="search-field">
              <Search size={17} />

              <input
                type="text"
                value={dictionarySearch}
                onChange={(event) => {
                  setDictionarySearch(
                    event.target.value
                  );
                }}
                placeholder="Search words or phrases..."
              />
            </div>

            <div className="dictionary-count">
              {dictionarySearch.trim()
                ? `${filteredDictionary.length} results`
                : `${bembaDictionary.length} dictionary entries`}
            </div>

            <div className="dictionary-list">
              {filteredDictionary.length > 0 ? (
                filteredDictionary.map(
                  (item, index) => (
                    <button
                      type="button"
                      key={`${item.english}-${index}`}
                      className="dictionary-card"
                      onClick={() =>
                        usePhrase(
                          item.english,
                          item.bemba
                        )
                      }
                    >
                      <div>
                        <span>
                          {item.english}
                        </span>

                        <strong>
                          {item.bemba}
                        </strong>
                      </div>

                      <Languages size={16} />
                    </button>
                  )
                )
              ) : (
                <div className="large-empty">
                  <Search size={30} />

                  <strong>
                    No dictionary entry found
                  </strong>

                  <span>
                    Try another English or Bemba
                    word.
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =================================================
            LEARN PAGE
        ================================================= */}

        {page === "learn" && (
          <section className="page">
            <div className="page-intro">
              <span className="eyebrow">
                LEARN BEMBA
              </span>

              <h1>
                Build your vocabulary.
              </h1>

              <p>
                Explore useful Bemba words and
                everyday expressions.
              </p>
            </div>

            <div className="learn-grid">
              <button
                type="button"
                className="learn-card"
              >
                <span className="learn-number">
                  01
                </span>

                <strong>Greetings</strong>

                <small>
                  Everyday greetings
                </small>
              </button>

              <button
                type="button"
                className="learn-card"
              >
                <span className="learn-number
