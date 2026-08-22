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
  ShieldCheck,
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

const quickPhrases = [
  ["How are you?", "Mulishani"],
  ["Good morning", "Mwashibukeni"],
  ["I want money", "Ndefwaya indalama"],
  ["Where are you?", "Ulikwisa"],
  ["Where are they?", "Balikwisa"],
  ["I'm angry", "Nimfulwa"],
] as const;

const navigation: {
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

  const [english, setEnglish] = useState("");
  const [bemba, setBemba] = useState("");

  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const [history, setHistory] = useState<
    HistoryItem[]
  >([]);

  const [searchText, setSearchText] =
    useState("");

  /* --------------------------------------------------
     Launch
  -------------------------------------------------- */

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
    }, 55);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* --------------------------------------------------
     Dictionary
  -------------------------------------------------- */

  const dictionaryResults = useMemo(() => {
    const query = searchText
      .trim()
      .toLowerCase();

    if (!query) {
      return bembaDictionary.slice(0, 100);
    }

    return bembaDictionary
      .filter((item) => {
        return (
          item.english
            .toLowerCase()
            .includes(query) ||
          item.bemba
            .toLowerCase()
            .includes(query)
        );
      })
      .slice(0, 200);
  }, [searchText]);

  /* --------------------------------------------------
     Translation
  -------------------------------------------------- */

  const translate = () => {
    const input = english.trim();

    if (!input || translating) {
      return;
    }

    setTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const match = quickPhrases.find(
        ([source]) =>
          source.toLowerCase() ===
          input.toLowerCase()
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
            time: new Date().toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
          },
          ...items,
        ]);
      }

      setTranslating(false);
    }, 160);
  };

  /* --------------------------------------------------
     Phrase
  -------------------------------------------------- */

  const selectPhrase = (
    source: string,
    translation: string
  ) => {
    setEnglish(source);
    setBemba(translation);
    setFavourite(false);
    setCopied(false);
    setPage("translate");
  };

  /* --------------------------------------------------
     Copy
  -------------------------------------------------- */

  const copy = async () => {
    if (!bemba) {
      return;
    }

    try {
      await navigator.clipboard.writeText(bemba);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      setCopied(false);
    }
  };

  /* --------------------------------------------------
     Audio placeholder
  -------------------------------------------------- */

  const listen = () => {
    if (!bemba || speaking) {
      return;
    }

    setSpeaking(true);

    window.setTimeout(() => {
      setSpeaking(false);
    }, 900);
  };

  /* --------------------------------------------------
     Launch screen
  -------------------------------------------------- */

  if (launching) {
    return (
      <div className="launch-screen">
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

  /* --------------------------------------------------
     Main application
  -------------------------------------------------- */

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
                {page === "translate"
                  ? "Translate"
                  : page === "dictionary"
                    ? "Dictionary"
                    : page === "learn"
                      ? "Learn Bemba"
                      : page === "history"
                        ? "History"
                        : "Settings"}
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

        {/* TRANSLATE */}

        {page === "translate" && (
          <section className="page">

            <div className="welcome-card">
              <span className="eyebrow">
                BEMBATRANSLATE
              </span>

              <h1>
                Speak Bemba
                <br />
                with confidence.
              </h1>

              <p>
                Translate everyday English
                privately, quickly and
                completely offline.
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
                  {english.length}/5000
                </span>
              </div>

              <textarea
                value={english}
                maxLength={5000}
                onChange={(event) => {
                  setEnglish(event.target.value);
                }}
                placeholder="Type something in English..."
              />

              <button
                className="translate-button"
                onClick={translate}
                disabled={
                  !english.trim() ||
                  translating
                }
              >
                <Languages size={17} />

                {translating
                  ? "Translating..."
                  : "Translate to Bemba"}
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

                    <strong>
                      {bemba}
                    </strong>

                    <div className="result-actions">

                      <button
                        className={
                          favourite
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          setFavourite(
                            (value) => !value
                          );
                        }}
                        aria-label="Favourite"
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
                        onClick={copy}
                        aria-label="Copy"
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <button
                        onClick={listen}
                        aria-label="Listen"
                      >
                        <Volume2 size={16} />

                        {speaking
                          ? "Playing"
                          : "Listen"}
                      </button>

                    </div>
                  </div>
                ) : (
                  <div className="empty-result">

                    <BookOpen size={21} />

                    <strong>
                      Your translation will
                      appear here
                    </strong>

                    <span>
                      Enter an English word
                      or phrase above.
                    </span>

                  </div>
                )}

              </div>
            </div>

            <div className="section-title">
              <div>
                <h2>
                  Popular phrases
                </h2>

                <p>
                  Useful expressions for
                  everyday life
                </p>
              </div>

              <span className="count-pill">
                {quickPhrases.length}
              </span>
            </div>

            <div className="phrase-grid">
              {quickPhrases.map(
                ([source, translation]) => (
                  <button
                    key={source}
                    className="phrase-card"
                    onClick={() =>
                      selectPhrase(
                        source,
                        translation
                      )
                    }
                  >
                    <span>
                      {source}
                    </span>

                    <strong>
                      {translation}
                    </strong>
                  </button>
                )
              )}
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
                  Your translations stay
                  on your device.
                </span>
              </div>

            </div>

          </section>
        )}

        {/* DICTIONARY */}

        {page === "dictionary" && (
          <section className="page">

            <div className="page-intro">
              <span className="eyebrow">
                BEMBA LANGUAGE
              </span>

              <h1>Dictionary</h1>

              <p>
                Search the built-in
                English → Bemba dictionary.
              </p>
            </div>

            <div className="search-field">

              <Search size={17} />

              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(
                    event.target.value
                  );
                }}
                placeholder="Search words or phrases..."
              />

            </div>

            <div className="dictionary-count">
              {searchText.trim()
                ? `${dictionaryResults.length} results`
                : `${bembaDictionary.length} dictionary entries`}
            </div>

            <div className="dictionary-list">

              {dictionaryResults.length > 0 ? (
                dictionaryResults.map(
                  (item, index) => (
                    <button
                      key={`${item.english}-${index}`}
                      className="dictionary-card"
                      onClick={() =>
                        selectPhrase(
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
                    Try another English or
                    Bemba word.
                  </span>

                </div>
              )}

            </div>

          </section>
        )}

        {/* LEARN */}

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
                Explore useful Bemba words
                and everyday expressions.
              </p>
            </div>

            <div className="learn-grid">

              <button className="learn-card">
                <span className="learn-number">
                  01
                </span>

                <strong>
                  Greetings
                </strong>

                <small>
                  Everyday greetings
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  02
                </span>

                <strong>
                  Family
                </strong>

                <small>
                  Family vocabulary
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  03
                </span>

                <strong>
                  Food &amp; Drink
                </strong>

                <small>
                  Useful food words
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  04
                </span>

                <strong>
                  Travel
                </strong>

                <small>
                  Words for travelling
                </small>
              </button>

              <button className="learn-card">
                <span className="learn-number">
                  05
                </span>

                <strong>
                  Everyday Life
                </strong>

                <small>
                  Common expressions
                </small>
              </button>

            </div>

            <div className="offline-info">

              <div className="info-icon">
                <Sparkles size={15} />
              </div>

              <div>
                <strong>
                  Number lessons removed
                </strong>

                <span>
                  Bemba number counting is
                  removed for now and can
                  be added correctly later.
                </span>
              </div>

            </div>

          </section>
        )}

        {/* HISTORY */}

        {page === "history" && (
          <section className="page">

            <div className="page-intro">
              <span className="eyebrow">
                LOCAL HISTORY
              </span>

              <h1>History</h1>

              <p>
                Your recent translations
                are stored locally.
              </p>
            </div>

            {history.length === 0 ? (
              <div className="large-empty">

                <HistoryIcon size={30} />

                <strong>
                  No translations yet
                </strong>

                <span>
                  Your recent translations
                  will appear here.
                </span>

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

                  <button
                    onClick={() => {
                      setHistory([]);
                    }}
                  >
                    Clear
                  </button>

                </div>

                <div className="history-list">

                  {history.map((item) => (
                    <button
                      key={item.id}
                      className="history-card"
                      onClick={() =>
                        selectPhrase(
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

                      <Languages size={16} />
                    </button>
                  ))}

                </div>
              </>
            )}

          </section>
        )}

        {/* SETTINGS */}

        {page === "settings" && (
          <section className="page">

            <div className="page-intro">
              <span className="eyebrow">
                APPLICATION
              </span>

              <h1>Settings</h1>

              <p>
                BembaTranslate preferences
                and information.
              </p>
            </div>

            <div className="settings-card">

              <div className="setting-row">

                <div>
                  <strong>
                    Offline mode
                  </strong>

                  <span>
                    Translation works without
                    an internet connection.
                  </span>
                </div>

                <span className="status-on">
                  <Check size={11} />
                  ON
                </span>

              </div>

              <div className="setting-row">

                <div>
                  <strong>
                    Dictionary
                  </strong>

                  <span>
                    Built into the application.
                  </span>
                </div>

                <BookOpen size={17} />

              </div>

              <div className="setting-row">

                <div>
                  <strong>
                    Audio
                  </strong>

                  <span>
                    Manual playback only.
                  </span>
                </div>

                <Volume2 size={17} />

              </div>

              <div className="setting-row">

                <div>
                  <strong>
                    Internet connection
                  </strong>

                  <span>
                    Not required for core
                    translation.
                  </span>
                </div>

                <span className="status-off">
                  Not required
                </span>

              </div>

            </div>

            <div className="privacy-card">

              <div className="privacy-icon">
                <ShieldCheck size={16} />
              </div>

              <div>
                <strong>
                  Your privacy matters
                </strong>

                <span>
                  Your translations are
                  designed to remain on
                  your device.
                </span>
              </div>

            </div>

          </section>
        )}

      </main>

      {/* FIXED NAVIGATION */}

      <nav className="bottom-navigation">

        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            page === item.id;

          return (
            <button
              key={item.id}
              className={
                active ? "active" : ""
              }
              onClick={() =>
                setPage(item.id)
              }
              aria-label={item.label}
              aria-current={
                active
                  ? "page"
                  : undefined
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
