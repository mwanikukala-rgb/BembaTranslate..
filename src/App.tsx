import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Clock3,
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
import "./styles/global.css";

type Page = "translate" | "dictionary" | "learn" | "history" | "settings";

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

const learnCategories = [
  {
    title: "Greetings",
    description: "Everyday greetings",
  },
  {
    title: "Family",
    description: "Family vocabulary",
  },
  {
    title: "Food & Drink",
    description: "Useful food words",
  },
  {
    title: "Travel",
    description: "Words for travelling",
  },
  {
    title: "Numbers",
    description: "Learn Bemba numbers",
  },
  {
    title: "Everyday Life",
    description: "Common expressions",
  },
];

const navItems = [
  { id: "translate" as Page, label: "Translate", icon: Languages },
  { id: "dictionary" as Page, label: "Dictionary", icon: BookOpen },
  { id: "learn" as Page, label: "Learn", icon: Sparkles },
  { id: "history" as Page, label: "History", icon: History },
  { id: "settings" as Page, label: "Settings", icon: Settings },
];

function App() {
  const [page, setPage] = useState<Page>("translate");

  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");

  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [dictionarySearch, setDictionarySearch] = useState("");

  const filteredQuickPhrases = useMemo(() => {
    const query = englishText.trim().toLowerCase();

    if (!query) {
      return quickPhrases;
    }

    return quickPhrases.filter(
      (item) =>
        item.english.toLowerCase().includes(query) ||
        item.bemba.toLowerCase().includes(query),
    );
  }, [englishText]);

  const dictionaryItems = useMemo(() => {
    const query = dictionarySearch.trim().toLowerCase();

    if (!query) {
      return quickPhrases;
    }

    return quickPhrases.filter(
      (item) =>
        item.english.toLowerCase().includes(query) ||
        item.bemba.toLowerCase().includes(query),
    );
  }, [dictionarySearch]);

  const translate = () => {
    const input = englishText.trim();

    if (!input || isTranslating) {
      return;
    }

    setIsTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const quickMatch = quickPhrases.find(
        (item) => item.english.toLowerCase() === input.toLowerCase(),
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
    setPage("translate");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <div className="wallpaper" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="brand"
            onClick={() => openPage("translate")}
            aria-label="Go to translation"
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

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="layout">
        <div className="main-content">
          {/* =================================================
              TRANSLATE PAGE
          ================================================= */}

          {page === "translate" && (
            <>
              {/* HERO */}

              <section className="hero-panel">
                <span className="hero-label">BEMBA LANGUAGE</span>

                <h1>Speak Bemba with confidence.</h1>

                <p>
                  Translate everyday English into Bemba quickly,
                  privately and without an internet connection.
                </p>

                <div style={{ marginTop: "22px" }}>
                  <button
                    className="primary-button"
                    onClick={() =>
                      document
                        .getElementById("translator")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Languages size={17} />
                    Start translating
                  </button>
                </div>
              </section>

              {/* QUICK ACCESS */}

              <section className="section">
                <div className="section-heading">
                  <h2>Explore BembaTranslate</h2>
                  <p>Everything you need in one place.</p>
                </div>

                <div className="feature-grid">
                  <button
                    className="feature-card"
                    onClick={() => openPage("translate")}
                  >
                    <Languages size={22} />

                    <h3>Translate</h3>

                    <p>
                      English to Bemba translation, completely offline.
                    </p>
                  </button>

                  <button
                    className="feature-card"
                    onClick={() => openPage("dictionary")}
                  >
                    <BookOpen size={22} />

                    <h3>Dictionary</h3>

                    <p>
                      Find useful English words and their Bemba meanings.
                    </p>
                  </button>

                  <button
                    className="feature-card"
                    onClick={() => openPage("learn")}
                  >
                    <Sparkles size={22} />

                    <h3>Learn Bemba</h3>

                    <p>
                      Explore useful vocabulary and everyday expressions.
                    </p>
                  </button>
                </div>
              </section>

              {/* TRANSLATOR */}

              <section
                className="section"
                id="translator"
              >
                <div className="section-heading">
                  <h2>Translate</h2>

                  <p>
                    Enter an English word or phrase and translate it to
                    Bemba.
                  </p>
                </div>

                <div className="translation-card">
                  <div className="language-row">
                    <div className="language-box">
                      <small>From</small>
                      <strong>English</strong>
                    </div>

                    <button
                      className="swap-button"
                      onClick={swapLanguages}
                      aria-label="Swap languages"
                    >
                      <Languages size={17} />
                    </button>

                    <div className="language-box">
                      <small>To</small>
                      <strong>Bemba</strong>
                    </div>
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "9px",
                      color: "#7a827a",
                      fontSize: "10px",
                    }}
                  >
                    <span>Available offline</span>

                    <span>{englishText.length}/5000</span>
                  </div>

                  <button
                    className="primary-button"
                    onClick={translate}
                    disabled={!englishText.trim() || isTranslating}
                    style={{ width: "100%" }}
                  >
                    <Languages size={17} />

                    {isTranslating
                      ? "Translating..."
                      : "Translate to Bemba"}
                  </button>

                  <div className="translation-result">
                    <h3>Bemba translation</h3>

                    {isTranslating ? (
                      <p>Translating...</p>
                    ) : bembaText ? (
                      <p>{bembaText}</p>
                    ) : (
                      <p
                        style={{
                          color: "#899189",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        Your Bemba translation will appear here.
                      </p>
                    )}

                    {bembaText && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "15px",
                        }}
                      >
                        <button
                          className="icon-button"
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

                        <button
                          className="icon-button"
                          onClick={copyText}
                          aria-label="Copy translation"
                        >
                          {copied ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>

                        <button
                          className="primary-button"
                          onClick={speakBemba}
                          disabled={isSpeaking}
                          style={{
                            marginTop: 0,
                            minHeight: "38px",
                            padding: "8px 13px",
                          }}
                        >
                          <Volume2 size={15} />
                          {isSpeaking ? "Playing" : "Listen"}
                        </button>

                        <button
                          className="icon-button"
                          onClick={clearTranslation}
                          aria-label="Clear translation"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* QUICK PHRASES */}

              <section className="section">
                <div className="section-heading">
                  <h2>Popular phrases</h2>

                  <p>
                    Start with useful expressions you can use every day.
                  </p>
                </div>

                <div className="quick-phrases">
                  {filteredQuickPhrases.map((phrase) => (
                    <button
                      key={phrase.english}
                      className="phrase-card"
                      onClick={() =>
                        usePhrase(phrase.english, phrase.bemba)
                      }
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <span className="english">
                        {phrase.english}
                      </span>

                      <span className="bemba">
                        {phrase.bemba}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* LEARNING */}

              <section className="section">
                <div className="section-heading">
                  <h2>Learn Bemba</h2>

                  <p>
                    Build your vocabulary through everyday topics.
                  </p>
                </div>

                <div className="category-grid">
                  {learnCategories.map((category) => (
                    <button
                      key={category.title}
                      className="category-card"
                      onClick={() => openPage("learn")}
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <strong>{category.title}</strong>
                      <span>{category.description}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* OFFLINE INFORMATION */}

              <section className="section">
                <div className="feature-grid">
                  <div className="feature-card">
                    <Languages size={20} />
                    <h3>Works offline</h3>
                    <p>
                      Translation resources are available directly
                      inside the application.
                    </p>
                  </div>

                  <div className="feature-card">
                    <BookOpen size={20} />
                    <h3>Built-in dictionary</h3>
                    <p>
                      Keep useful English and Bemba vocabulary close
                      at hand.
                    </p>
                  </div>

                  <div className="feature-card">
                    <Volume2 size={20} />
                    <h3>Manual voice</h3>
                    <p>
                      Listen to Bemba audio when you choose. Nothing
                      plays automatically.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =================================================
              DICTIONARY
          ================================================= */}

          {page === "dictionary" && (
            <>
              <section className="hero-panel">
                <span className="hero-label">BEMBA DICTIONARY</span>

                <h1>Discover new words.</h1>

                <p>
                  Search useful English expressions and explore their
                  Bemba meanings.
                </p>
              </section>

              <section className="section">
                <div className="section-heading">
                  <h2>Dictionary</h2>
                  <p>Search the words available on your device.</p>
                </div>

                <div
                  className="translation-card"
                  style={{ marginBottom: "16px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Search size={18} />

                    <input
                      value={dictionarySearch}
                      onChange={(event) =>
                        setDictionarySearch(event.target.value)
                      }
                      placeholder="Search the dictionary..."
                      style={{
                        width: "100%",
                        border: 0,
                        background: "transparent",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div className="list">
                  {dictionaryItems.map((item) => (
                    <button
                      key={item.english}
                      className="list-item"
                      onClick={() =>
                        usePhrase(item.english, item.bemba)
                      }
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <strong>{item.english}</strong>
                        <br />
                        <span>{item.bemba}</span>
                      </div>

                      <Languages size={17} />
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* =================================================
              LEARN
          ================================================= */}

          {page === "learn" && (
            <>
              <section className="hero-panel">
                <span className="hero-label">LEARN BEMBA</span>

                <h1>Learn a little every day.</h1>

                <p>
                  Explore practical Bemba vocabulary organized around
                  everyday life.
                </p>
              </section>

              <section className="section">
                <div className="section-heading">
                  <h2>Learning topics</h2>
                  <p>Choose a category to begin.</p>
                </div>

                <div className="category-grid">
                  {learnCategories.map((category) => (
                    <div
                      className="category-card"
                      key={category.title}
                    >
                      <strong>{category.title}</strong>
                      <span>{category.description}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="section">
                <div className="section-heading">
                  <h2>Start with these phrases</h2>
                  <p>Useful expressions for everyday conversations.</p>
                </div>

                <div className="quick-phrases">
                  {quickPhrases.map((phrase) => (
                    <button
                      key={phrase.english}
                      className="phrase-card"
                      onClick={() =>
                        usePhrase(phrase.english, phrase.bemba)
                      }
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <span className="english">
                        {phrase.english}
                      </span>

                      <span className="bemba">
                        {phrase.bemba}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* =================================================
              HISTORY
          ================================================= */}

          {page === "history" && (
            <>
              <section className="hero-panel">
                <span className="hero-label">LOCAL HISTORY</span>

                <h1>Your translations.</h1>

                <p>
                  Your recent translations stay on this device for easy
                  access.
                </p>
              </section>

              <section className="section">
                <div className="section-heading">
                  <h2>Recent translations</h2>

                  <p>
                    {history.length === 0
                      ? "No translations yet."
                      : `${history.length} saved translation${
                          history.length === 1 ? "" : "s"
                        }`}
                  </p>
                </div>

                {history.length === 0 ? (
                  <div className="feature-card">
                    <History size={24} />

                    <h3>No translation history yet</h3>

                    <p>
                      Translate something and your recent translations
                      will appear here.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="list">
                      {history.map((item) => (
                        <button
                          className="list-item"
                          key={item.id}
                          onClick={() =>
                            usePhrase(item.english, item.bemba)
                          }
                          style={{
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          <div>
                            <span>{item.time}</span>
                            <br />
                            <strong>{item.english}</strong>
                            <br />
                            <span>{item.bemba}</span>
                          </div>

                          <Languages size={17} />
                        </button>
                      ))}
                    </div>

                    <button
                      className="primary-button"
                      onClick={() => setHistory([])}
                    >
                      Clear history
                    </button>
                  </>
                )}
              </section>
            </>
          )}

          {/* =================================================
              SETTINGS
          ================================================= */}

          {page === "settings" && (
            <>
              <section className="hero-panel">
                <span className="hero-label">PREFERENCES</span>

                <h1>Your app, your way.</h1>

                <p>
                  BembaTranslate is designed to keep your translation
                  experience simple, private and offline.
                </p>
              </section>

              <section className="section">
                <div className="section-heading">
                  <h2>Settings</h2>
                  <p>Application preferences.</p>
                </div>

                <div className="settings-card">
                  <div className="setting-row">
                    <div>
                      <strong>Offline translation</strong>
                      <br />
                      <span>
                        Translation works without an internet connection.
                      </span>
                    </div>

                    <strong style={{ color: "#397244" }}>ON</strong>
                  </div>

                  <div className="setting-row">
                    <div>
                      <strong>Automatic audio</strong>
                      <br />
                      <span>
                        Audio never plays automatically.
                      </span>
                    </div>

                    <span>OFF</span>
                  </div>

                  <div className="setting-row">
                    <div>
                      <strong>Translation direction</strong>
                      <br />
                      <span>English → Bemba</span>
                    </div>

                    <Languages size={18} />
                  </div>

                  <div className="setting-row">
                    <div>
                      <strong>Privacy</strong>
                      <br />
                      <span>Your translations remain on this device.</span>
                    </div>

                    <BookOpen size={18} />
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* =====================================================
          SINGLE BOTTOM NAVIGATION
      ===================================================== */}

      <nav className="bottom-navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => openPage(item.id)}
              aria-label={item.label}
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
