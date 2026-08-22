import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Clock3,
  Copy,
  Heart,
  History,
  Languages,
  Menu,
  Search,
  Settings,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { translateWithFallback } from "./engine/bembaTranslator";
import "./styles/global.css";

type Page = "translate" | "dictionary" | "history" | "settings";

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
  { id: "translate" as Page, label: "Translate", icon: Languages },
  { id: "dictionary" as Page, label: "Dictionary", icon: BookOpen },
  { id: "history" as Page, label: "History", icon: History },
  { id: "settings" as Page, label: "Settings", icon: Settings },
];

function App() {
  const [launching, setLaunching] = useState(true);
  const [page, setPage] = useState<Page>("translate");
  const [menuOpen, setMenuOpen] = useState(false);

  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");

  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [dictionarySearch, setDictionarySearch] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLaunching(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  const filteredQuickPhrases = useMemo(() => {
    const query = englishText.trim().toLowerCase();

    if (!query) {
      return quickPhrases;
    }

    return quickPhrases.filter(
      (item) =>
        item.english.toLowerCase().includes(query) ||
        item.bemba.toLowerCase().includes(query)
    );
  }, [englishText]);

  const translate = () => {
    const input = englishText.trim();

    if (!input || isTranslating) {
      return;
    }

    setIsTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const quickMatch = quickPhrases.find(
        (item) => item.english.toLowerCase() === input.toLowerCase()
      );

      const result =
        quickMatch?.bemba || translateWithFallback(input) || "";

      setBembaText(result);

      if (result) {
        setHistory((oldHistory) => [
          {
            id: Date.now(),
            english: input,
            bemba: result,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          ...oldHistory,
        ]);
      }

      setIsTranslating(false);
    }, 120);
  };

  const usePhrase = (english: string, bemba: string) => {
    setEnglishText(english);
    setBembaText(bemba);
    setCopied(false);
    setFavourite(false);
  };

  const clearTranslation = () => {
    setEnglishText("");
    setBembaText("");
    setCopied(false);
    setFavourite(false);
  };

  const copyText = async () => {
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
      // Clipboard may be unavailable in some WebViews.
    }
  };

  const speakBemba = () => {
    if (!bembaText || isSpeaking) {
      return;
    }

    setIsSpeaking(true);

    window.setTimeout(() => {
      setIsSpeaking(false);
    }, 900);
  };

  const swapLanguages = () => {
    if (!englishText && !bembaText) {
      return;
    }

    setEnglishText(bembaText);
    setBembaText(englishText);
  };

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  if (launching) {
    return (
      <div className="launch-screen">
        <div className="launch-glow launch-glow-one" />
        <div className="launch-glow launch-glow-two" />

        <div className="launch-content">
          <div className="launch-logo">
            <Languages size={32} strokeWidth={1.7} />
          </div>

          <h1>BembaTranslate</h1>
          <p>English • Bemba</p>

          <div className="launch-loader">
            <span />
          </div>

          <small>Preparing offline dictionary</small>
        </div>

        <div className="launch-bottom">
          <span className="online-dot" />
          Works offline
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="wallpaper" />

      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>

          <button
            className="brand"
            onClick={() => openPage("translate")}
          >
            <div className="brand-mark">
              <Languages size={20} />
            </div>

            <div>
              <strong>BembaTranslate</strong>
              <span>English → Bemba</span>
            </div>
          </button>

          <div className="topbar-actions">
            <div className="offline-label">
              <span className="online-dot" />
              Offline
            </div>

            <button
              className="icon-button"
              onClick={() => openPage("settings")}
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="mobile-drawer">
            <div className="drawer-header">
              <div className="brand">
                <div className="brand-mark">
                  <Languages size={19} />
                </div>

                <div>
                  <strong>BembaTranslate</strong>
                  <span>English → Bemba</span>
                </div>
              </div>

              <button
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="drawer-navigation">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    className={`drawer-nav-item ${
                      page === item.id ? "active" : ""
                    }`}
                    onClick={() => openPage(item.id)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="drawer-offline">
              <span className="online-dot" />

              <div>
                <strong>Offline mode</strong>
                <small>No internet required</small>
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="layout">
        <aside className="side-navigation">
          <div className="side-caption">BEMBA LANGUAGE</div>

          <nav>
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`side-nav-item ${
                    page === item.id ? "active" : ""
                  }`}
                  onClick={() => openPage(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="side-bottom">
            <div className="side-offline">
              <span className="online-dot" />

              <div>
                <strong>Offline ready</strong>
                <small>Private on your device</small>
              </div>
            </div>
          </div>
        </aside>

        <main className="content">
          {page === "translate" && (
            <section className="translator-page">
              <div className="intro">
                <div>
                  <div className="section-label">
                    <Sparkles size={12} />
                    QUICK ENGLISH → BEMBA
                  </div>

                  <h1>Speak Bemba with confidence.</h1>

                  <p>
                    Fast everyday translations, available even when
                    you are offline.
                  </p>
                </div>

                {(englishText || bembaText) && (
                  <button
                    className="clear-button"
                    onClick={clearTranslation}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="language-switcher">
                <div>
                  <span>FROM</span>
                  <strong>English</strong>
                </div>

                <button
                  className="swap-button"
                  onClick={swapLanguages}
                  aria-label="Swap languages"
                >
                  <Languages size={17} />
                </button>

                <div>
                  <span>TO</span>
                  <strong>Bemba</strong>
                </div>
              </div>

              <div className="translator-panel">
                <div className="input-section">
                  <div className="panel-heading">
                    <div className="language-name">
                      <span className="language-dot english" />
                      English
                    </div>

                    <span className="character-count">
                      {englishText.length}/5000
                    </span>
                  </div>

                  <textarea
                    value={englishText}
                    onChange={(event) =>
                      setEnglishText(event.target.value.slice(0, 5000))
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        (event.ctrlKey || event.metaKey)
                      ) {
                        translate();
                      }
                    }}
                    placeholder="Type English here..."
                    aria-label="English input"
                  />

                  <div className="input-footer">
                    <span>
                      Quick translation is available offline
                    </span>

                    <button
                      onClick={() => setEnglishText("")}
                      disabled={!englishText}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="result-section">
                  <div className="panel-heading">
                    <div className="language-name">
                      <span className="language-dot bemba" />
                      Bemba
                    </div>

                    <span className="translation-tag">LOCAL</span>
                  </div>

                  <div className="result-body">
                    {isTranslating ? (
                      <div className="translation-loading">
                        <span className="small-spinner" />
                        Translating...
                      </div>
                    ) : bembaText ? (
                      <div className="translation-answer">
                        <span className="answer-label">
                          Bemba translation
                        </span>

                        <strong>{bembaText}</strong>
                      </div>
                    ) : (
                      <div className="result-placeholder">
                        <div className="placeholder-icon">
                          <BookOpen size={20} />
                        </div>

                        <strong>Translation appears here</strong>

                        <span>
                          Enter a word or phrase above.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="result-footer">
                    <button
                      className={`result-action ${
                        favourite ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFavourite((value) => !value)
                      }
                      disabled={!bembaText}
                      aria-label="Favourite"
                    >
                      <Heart
                        size={16}
                        fill={favourite ? "currentColor" : "none"}
                      />
                    </button>

                    <button
                      className="result-action"
                      onClick={copyText}
                      disabled={!bembaText}
                      aria-label="Copy translation"
                    >
                      {copied ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>

                    <button
                      className="listen-button"
                      onClick={speakBemba}
                      disabled={!bembaText}
                    >
                      <Volume2 size={16} />
                      {isSpeaking ? "Playing" : "Listen"}
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="main-translate-button"
                onClick={translate}
                disabled={!englishText.trim() || isTranslating}
              >
                <Languages size={18} />

                {isTranslating
                  ? "Translating..."
                  : "Translate to Bemba"}
              </button>

              <section className="quick-section">
                <div className="quick-heading">
                  <div>
                    <h2>Quick phrases</h2>
                    <p>Common English expressions in Bemba</p>
                  </div>

                  <span>{quickPhrases.length} phrases</span>
                </div>

                <div className="quick-grid">
                  {filteredQuickPhrases.map((phrase) => (
                    <button
                      key={phrase.english}
                      className="quick-card"
                      onClick={() =>
                        usePhrase(phrase.english, phrase.bemba)
                      }
                    >
                      <span>{phrase.english}</span>
                      <strong>{phrase.bemba}</strong>
                    </button>
                  ))}
                </div>
              </section>

              <div className="trust-row">
                <div>
                  <span className="trust-icon">
                    <Languages size={14} />
                  </span>

                  <span>
                    <strong>Offline</strong>
                    Local translation
                  </span>
                </div>

                <div>
                  <span className="trust-icon">
                    <BookOpen size={14} />
                  </span>

                  <span>
                    <strong>Dictionary</strong>
                    Built into the app
                  </span>
                </div>

                <div>
                  <span className="trust-icon">
                    <Volume2 size={14} />
                  </span>

                  <span>
                    <strong>Bemba voice</strong>
                    Manual playback
                  </span>
                </div>
              </div>
            </section>
          )}

          {page === "dictionary" && (
            <section className="inner-page">
              <div className="intro">
                <div>
                  <div className="section-label">
                    <BookOpen size={12} />
                    BEMBA DICTIONARY
                  </div>

                  <h1>Dictionary</h1>

                  <p>
                    Find English words and their Bemba meanings.
                  </p>
                </div>
              </div>

              <div className="search-box">
                <Search size={17} />

                <input
                  value={dictionarySearch}
                  onChange={(event) =>
                    setDictionarySearch(event.target.value)
                  }
                  placeholder="Search the dictionary..."
                />
              </div>

              <div className="dictionary-preview">
                <div className="dictionary-entry">
                  <span>How are you?</span>
                  <strong>Mulishani</strong>
                </div>

                <div className="dictionary-entry">
                  <span>Good morning</span>
                  <strong>Mwashibukeni</strong>
                </div>

                <div className="dictionary-entry">
                  <span>I want money</span>
                  <strong>Ndefwaya indalama</strong>
                </div>

                <div className="dictionary-entry">
                  <span>Where are you?</span>
                  <strong>Ulikwisa</strong>
                </div>

                <div className="dictionary-entry">
                  <span>Where are they?</span>
                  <strong>Balikwisa</strong>
                </div>

                <div className="dictionary-entry">
                  <span>I'm angry</span>
                  <strong>Nimfulwa</strong>
                </div>
              </div>
            </section>
          )}

          {page === "history" && (
            <section className="inner-page">
              <div className="intro">
                <div>
                  <div className="section-label">
                    <Clock3 size={12} />
                    LOCAL HISTORY
                  </div>

                  <h1>History</h1>

                  <p>
                    Your recent translations are stored locally.
                  </p>
                </div>

                {history.length > 0 && (
                  <button
                    className="clear-button"
                    onClick={() => setHistory([])}
                  >
                    Clear history
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="empty-page">
                  <History size={26} />

                  <strong>No translation history yet</strong>

                  <span>
                    Your translations will appear here.
                  </span>
                </div>
              ) : (
                <div className="history-list">
                  {history.map((item) => (
                    <button
                      className="history-card"
                      key={item.id}
                      onClick={() =>
                        usePhrase(item.english, item.bemba)
                      }
                    >
                      <div>
                        <small>{item.time}</small>
                        <span>{item.english}</span>
                        <strong>{item.bemba}</strong>
                      </div>

                      <Languages size={17} />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {page === "settings" && (
            <section className="inner-page">
              <div className="intro">
                <div>
                  <div className="section-label">
                    <Settings size={12} />
                    PREFERENCES
                  </div>

                  <h1>Settings</h1>

                  <p>
                    Control your BembaTranslate experience.
                  </p>
                </div>
              </div>

              <div className="settings-card">
                <div className="setting">
                  <div>
                    <strong>Offline translation</strong>

                    <span>
                      Translation works without an internet connection.
                    </span>
                  </div>

                  <b>ON</b>
                </div>

                <div className="setting">
                  <div>
                    <strong>Automatic audio</strong>

                    <span>
                      Audio will never play automatically.
                    </span>
                  </div>

                  <b className="off">OFF</b>
                </div>

                <div className="setting">
                  <div>
                    <strong>Translation direction</strong>

                    <span>English → Bemba</span>
                  </div>

                  <Languages size={18} />
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      <nav className="bottom-navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => openPage(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
