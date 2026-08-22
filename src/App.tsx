import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  Heart,
  History,
  Languages,
  Search,
  Settings,
  Sparkles,
  Volume2,
} from "lucide-react";
import { translateWithFallback } from "./engine/bembaTranslator";
import { bembaDictionary } from "./data/bembaDictionary";
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

const quickPhrases = [
  { english: "How are you?", bemba: "Mulishani" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "Where are you?", bemba: "Ulikwisa" },
  { english: "Where are they?", bemba: "Balikwisa" },
  { english: "I'm angry", bemba: "Nimfulwa" },
];

const navItems = [
  {
    id: "translate" as Page,
    label: "Translate",
    icon: Languages,
  },
  {
    id: "dictionary" as Page,
    label: "Dictionary",
    icon: BookOpen,
  },
  {
    id: "learn" as Page,
    label: "Learn",
    icon: Sparkles,
  },
  {
    id: "history" as Page,
    label: "History",
    icon: History,
  },
  {
    id: "settings" as Page,
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

  /* -------------------------------------------------------
     LAUNCH SCREEN
  ------------------------------------------------------- */

  useEffect(() => {
    let value = 0;

    const interval = window.setInterval(() => {
      value += Math.floor(Math.random() * 8) + 4;

      if (value >= 100) {
        value = 100;
        setProgress(value);

        window.setTimeout(() => {
          setLaunching(false);
        }, 450);

        window.clearInterval(interval);
      } else {
        setProgress(value);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, []);

  /* -------------------------------------------------------
     FULL DICTIONARY SEARCH
  ------------------------------------------------------- */

  const filteredDictionary = useMemo(() => {
    const query = dictionarySearch.trim().toLowerCase();

    if (!query) {
      return bembaDictionary;
    }

    return bembaDictionary.filter(
      (item) =>
        item.english.toLowerCase().includes(query) ||
        item.bemba.toLowerCase().includes(query)
    );
  }, [dictionarySearch]);

  /* -------------------------------------------------------
     TRANSLATION
  ------------------------------------------------------- */

  const translate = () => {
    const input = englishText.trim();

    if (!input || isTranslating) return;

    setIsTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const quickMatch = quickPhrases.find(
        (item) =>
          item.english.toLowerCase() === input.toLowerCase()
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

  /* -------------------------------------------------------
     USE DICTIONARY / PHRASE
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     COPY
  ------------------------------------------------------- */

  const copyTranslation = async () => {
    if (!bembaText) return;

    try {
      await navigator.clipboard.writeText(bembaText);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      /* Clipboard unavailable */
    }
  };

  /* -------------------------------------------------------
     AUDIO
  ------------------------------------------------------- */

  const speak = () => {
    if (!bembaText || isSpeaking) return;

    setIsSpeaking(true);

    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();

        const utterance =
          new SpeechSynthesisUtterance(bembaText);

        utterance.rate = 0.85;
        utterance.pitch = 1;

        utterance.onend = () => {
          setIsSpeaking(false);
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        window.setTimeout(() => {
          setIsSpeaking(false);
        }, 900);
      }
    } else {
      window.setTimeout(() => {
        setIsSpeaking(false);
      }, 900);
    }
  };

  /* -------------------------------------------------------
     LAUNCH SCREEN
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     MAIN APPLICATION
  ------------------------------------------------------- */

  return (
    <div className="app">
      <div className="wallpaper" />

      <main className="app-content">

        {/* HEADER */}

        <header className="app-header">
          <div className="header-title">
            <span className="header-icon">
              <Languages size={17} />
            </span>

            <div>
              <strong>
                {page === "translate" &&
                  "Translate"}

                {page === "dictionary" &&
                  "Dictionary"}

                {page === "learn" &&
                  "Learn Bemba"}

                {page === "history" &&
                  "History"}

                {page === "settings" &&
                  "Settings"}
              </strong>

              <span>
                English → Bemba
              </span>
            </div>
          </div>

          <div className="offline-badge">
            <span />
            Offline
          </div>
        </header>

        {/* =================================================
            TRANSLATE
        ================================================= */}

        {page === "translate" && (
          <section className="page">

            <div className="welcome-card">
              <div className="welcome-icon">
                <Sparkles size={20} />
              </div>

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
                onChange={(e) =>
                  setEnglishText(
                    e.target.value.slice(0, 5000)
                  )
                }
                placeholder="Type something in English..."
              />

              <button
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

                    <strong>
                      {bembaText}
                    </strong>

                    <div className="result-actions">

                      <button
                        onClick={() =>
                          setFavourite(
                            (value) => !value
                          )
                        }
                        className={
                          favourite
                            ? "selected"
                            : ""
                        }
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
                        onClick={copyTranslation}
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <button onClick={speak}>
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
                      Your translation will appear here
                    </strong>

                    <span>
                      Enter an English word or phrase above.
                    </span>

                  </div>
                )}

              </div>
            </div>

            {/* POPULAR PHRASES */}

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
                  key={phrase.english}
                  className="phrase-card"
                  onClick={() =>
                    usePhrase(
                      phrase.english,
                      phrase.bemba
                    )
                  }
                >
                  <span>
                    {phrase.english}
                  </span>

                  <strong>
                    {phrase.bemba}
                  </strong>
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
                  Your translations stay on your device.
                </span>
              </div>

            </div>

          </section>
        )}

        {/* =================================================
            DICTIONARY
        ================================================= */}

        {page === "dictionary" && (
          <section className="page">

            <div className="page-intro">

              <span className="eyebrow">
                BEMBA LANGUAGE
              </span>

              <h1>Dictionary</h1>

              <p>
                Find useful English words and their Bemba
                meanings.
              </p>

            </div>

            <div className="search-field">

              <Search size={17} />

              <input
                value={dictionarySearch}
                onChange={(e) =>
                  setDictionarySearch(
                    e.target.value
                  )
                }
                placeholder="Search words or phrases..."
              />

            </div>

            <div className="dictionary-count">
              {dictionarySearch.trim()
                ? `${filteredDictionary.length} results`
                : `${bembaDictionary.length} entries`}
            </div>

            <div className="dictionary-list">

              {filteredDictionary.map(
                (item, index) => (
                  <button
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
              )}

              {filteredDictionary.length === 0 && (
                <div className="large-empty">

                  <Search size={30} />

                  <strong>
                    No dictionary entry found
                  </strong>

                  <span>
                    Try another English word or Bemba word.
                  </span>

                </div>
              )}

            </div>

          </section>
        )}

        {/* =================================================
            LEARN
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
                Explore useful Bemba words and everyday
                expressions.
              </p>

            </div>

            <div className="learn-grid">

              <button className="learn-card">
                <span className="learn-number">
                  01
                </span>

                <strong>Greetings</strong>

                <small>
                  Everyday greetings
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  02
                </span>

                <strong>Family</strong>

                <small>
                  Family vocabulary
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  03
                </span>

                <strong>Food & Drink</strong>

                <small>
                  Useful food words
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  04
                </span>

                <strong>Travel</strong>

                <small>
                  Words for travelling
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  05
                </span>

                <strong>Numbers</strong>

                <small>
                  Learn Bemba numbers
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  06
                </span>

                <strong>Everyday Life</strong>

                <small>
                  Common expressions
                </small>
              </button>

            </div>

          </section>
        )}

        {/* =================================================
            HISTORY
        ================================================= */}

        {page === "history" && (
          <section className="page">

            <div className="page-intro">

              <span className="eyebrow">
                LOCAL HISTORY
              </span>

              <h1>History</h1>

              <p>
                Your recent translations are stored locally.
              </p>

            </div>

            {history.length === 0 ? (
              <div className="large-empty">

                <History size={30} />

                <strong>
                  No translations yet
                </strong>

                <span>
                  Your recent translations will appear here.
                </span>

              </div>
            ) : (
              <div className="history-list">

                {history.map((item) => (
                  <button
                    key={item.id}
                    className="history-card"
                    onClick={() =>
                      usePhrase(
                        item.english,
                        item.bemba
                      )
                    }
                  >
                    <div>

                      <small>
                        {item.time}
                      </small>

                      <span>
                        {item.english}
                      </span>

                      <strong>
                        {item.bemba}
                      </strong>

                    </div>

                    <Languages size={17} />

                  </button>
                ))}

              </div>
            )}

          </section>
        )}

        {/* =================================================
            SETTINGS
        ================================================= */}

        {page === "settings" && (
          <section className="page">

            <div className="page-intro">

              <span className="eyebrow">
                PREFERENCES
              </span>

              <h1>Settings</h1>

              <p>
                Control your BembaTranslate experience.
              </p>

            </div>

            <div className="settings-card">

              <div className="setting-row">

                <div>
                  <strong>
                    Offline translation
                  </strong>

                  <span>
                    No internet connection required.
                  </span>
                </div>

                <b className="status-on">
                  <Check size={12} />
                  ON
                </b>

              </div>

              <div className="setting-row">

                <div>
                  <strong>
                    Automatic audio
                  </strong>

                  <span>
                    Audio never plays automatically.
                  </span>
                </div>

                <b className="status-off">
                  OFF
                </b>

              </div>

              <div className="setting-row">

                <div>
                  <strong>
                    Translation direction
                  </strong>

                  <span>
                    English → Bemba
                  </span>
                </div>

                <Languages size={18} />

              </div>

            </div>

            <div className="privacy-card">

              <div className="privacy-icon">
                <Check size={17} />
              </div>

              <div>

                <strong>
                  Your translations are private
                </strong>

                <span>
                  BembaTranslate is designed to work locally
                  on your device.
                </span>

              </div>

            </div>

          </section>
        )}

      </main>

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <nav className="bottom-navigation">

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={
                page === item.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setPage(item.id)
              }
            >
              <span className="nav-icon">
                <Icon size={18} />
              </span>

              <span>
                {item.label}
              </span>
            </button>
          );
        })}

      </nav>

    </div>
  );
}

export default App;
