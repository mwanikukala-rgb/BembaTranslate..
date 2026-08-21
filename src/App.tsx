import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Heart,
  Home,
  Languages,
  Menu,
  Mic,
  Search,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Volume2,
  X,
} from "lucide-react";
import { translateWithFallback } from "./engine/bembaTranslator";

type Page = "home" | "translate" | "learn" | "history" | "settings";

type HistoryItem = {
  id: number;
  source: string;
  result: string;
  time: string;
};

const quickPhrases = [
  ["Mwashibukeni", "Good morning"],
  ["Muli shani?", "How are you?"],
  ["Natotela", "Thank you"],
  ["Shalenipo", "Goodbye"],
  ["Ndefwaya amenshi", "I want water"],
  ["Ee", "Yes"],
  ["Awe", "No"],
];

const learningCategories = [
  {
    title: "Greetings",
    text: "Learn common Bemba greetings and responses.",
  },
  {
    title: "Everyday life",
    text: "Useful words and phrases for daily conversations.",
  },
  {
    title: "Family",
    text: "Common Bemba words for family and relationships.",
  },
  {
    title: "Food & drink",
    text: "Useful vocabulary for eating and shopping.",
  },
  {
    title: "Travel",
    text: "Helpful expressions for getting around.",
  },
  {
    title: "Numbers",
    text: "Practice common Bemba numbers and counting.",
  },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Bemba");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("bemba-history");
      const savedFavorites = localStorage.getItem("bemba-favorites");

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch {
      // Ignore invalid local data.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bemba-history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("bemba-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const pageTitle = useMemo(() => {
    switch (page) {
      case "translate":
        return "Translate";
      case "learn":
        return "Learn Bemba";
      case "history":
        return "History";
      case "settings":
        return "Settings";
      default:
        return "BembaTranslate";
    }
  }, [page]);

  function navigate(nextPage: Page) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function swapLanguages() {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);

    if (result) {
      const oldInput = input;
      setInput(result);
      setResult(oldInput);
    }
  }

  function translateText(text = input) {
    const cleanText = text.trim();

    if (!cleanText) {
      setResult("");
      return;
    }

    try {
      // bembaTranslator currently accepts one argument.
      const translated = translateWithFallback(cleanText);

      setResult(translated);

      const item: HistoryItem = {
        id: Date.now(),
        source: cleanText,
        result: translated,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setHistory((current) => {
        const filtered = current.filter(
          (oldItem) =>
            oldItem.source !== cleanText ||
            oldItem.result !== translated
        );

        return [item, ...filtered].slice(0, 30);
      });
    } catch {
      setResult(
        "Translation could not be completed. Please check the text and try again."
      );
    }
  }

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      // Clipboard unavailable.
    }
  }

  function speak(text: string) {
    if (!text || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
  }

  function toggleFavorite(text: string) {
    if (!text) return;

    setFavorites((current) =>
      current.includes(text)
        ? current.filter((item) => item !== text)
        : [...current, text]
    );
  }

  function clearTranslation() {
    setInput("");
    setResult("");
  }

  function usePhrase(phrase: string) {
    setInput(phrase);
    setResult("");
    navigate("translate");
  }

  function deleteHistory(id: number) {
    setHistory((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <button
          className="brand-button"
          onClick={() => navigate("home")}
          aria-label="Go home"
        >
          <span className="brand-mark">
            <Languages size={20} />
          </span>

          <span className="brand-copy">
            <strong>BembaTranslate</strong>
            <small>Offline language assistant</small>
          </span>
        </button>

        <div className="header-actions">
          <span className="offline-pill">
            <span />
            Offline
          </span>

          <button
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => navigate("home")}>
              <Home size={17} />
              Home
            </button>

            <button onClick={() => navigate("translate")}>
              <Languages size={17} />
              Translate
            </button>

            <button onClick={() => navigate("learn")}>
              <BookOpen size={17} />
              Learn
            </button>

            <button onClick={() => navigate("history")}>
              <Clock3 size={17} />
              History
            </button>

            <button onClick={() => navigate("settings")}>
              <Settings size={17} />
              Settings
            </button>
          </div>
        )}
      </header>

      <main className="app-main">
        {page === "home" && (
          <section className="page">
            <div className="hero-panel">
              <div className="hero-content">
                <span className="eyebrow">
                  <Sparkles size={13} />
                  OFFLINE BEMBA ASSISTANT
                </span>

                <h1>
                  Understand Bemba.
                  <br />
                  <span>Speak with confidence.</span>
                </h1>

                <p>
                  Translate everyday English and Bemba phrases,
                  save translations and learn useful words
                  without depending on an internet connection.
                </p>

                <button
                  className="hero-button"
                  onClick={() => navigate("translate")}
                >
                  Start translating
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="hero-decoration">
                <div className="decoration-circle">
                  <Languages size={48} />
                </div>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <span className="section-kicker">QUICK START</span>
                <h2>What do you want to do?</h2>
              </div>
            </div>

            <div className="feature-grid">
              <button
                className="feature-card"
                onClick={() => navigate("translate")}
              >
                <span className="feature-icon green">
                  <Languages size={22} />
                </span>

                <strong>Translate</strong>

                <span>
                  Convert words and sentences between English
                  and Bemba.
                </span>

                <ChevronRight size={17} />
              </button>

              <button
                className="feature-card"
                onClick={() => navigate("learn")}
              >
                <span className="feature-icon gold">
                  <BookOpen size={22} />
                </span>

                <strong>Learn Bemba</strong>

                <span>
                  Explore useful vocabulary and everyday
                  expressions.
                </span>

                <ChevronRight size={17} />
              </button>

              <button
                className="feature-card"
                onClick={() => navigate("history")}
              >
                <span className="feature-icon blue">
                  <Clock3 size={22} />
                </span>

                <strong>My History</strong>

                <span>
                  Quickly return to translations you have
                  already made.
                </span>

                <ChevronRight size={17} />
              </button>
            </div>

            <div className="section-heading compact">
              <div>
                <span className="section-kicker">POPULAR</span>
                <h2>Quick phrases</h2>
              </div>

              <button
                className="text-button"
                onClick={() => navigate("learn")}
              >
                See all
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="phrase-grid">
              {quickPhrases.slice(0, 6).map(([bemba, english]) => (
                <button
                  className="phrase-card"
                  key={bemba}
                  onClick={() => usePhrase(english)}
                >
                  <strong>{bemba}</strong>
                  <span>{english}</span>
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <>
                <div className="section-heading compact">
                  <div>
                    <span className="section-kicker">RECENT</span>
                    <h2>Continue where you stopped</h2>
                  </div>
                </div>

                <div className="recent-list">
                  {history.slice(0, 3).map((item) => (
                    <button
                      className="recent-card"
                      key={item.id}
                      onClick={() => {
                        setInput(item.source);
                        setResult(item.result);
                        navigate("translate");
                      }}
                    >
                      <span>
                        <strong>{item.source}</strong>
                        <small>{item.result}</small>
                      </span>

                      <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {page === "translate" && (
          <section className="page">
            <div className="page-header">
              <span className="section-kicker">
                TRANSLATION STUDIO
              </span>

              <h1>{pageTitle}</h1>

              <p>
                Translate naturally and keep useful phrases
                available offline.
              </p>
            </div>

            <div className="translator-card">
              <div className="language-bar">
                <button className="language-button">
                  <small>FROM</small>
                  <strong>{sourceLanguage}</strong>
                </button>

                <button
                  className="swap-button"
                  onClick={swapLanguages}
                  aria-label="Swap languages"
                >
                  <ArrowLeftRight size={18} />
                </button>

                <button className="language-button target">
                  <small>TO</small>
                  <strong>{targetLanguage}</strong>
                </button>
              </div>

              <div className="translation-grid">
                <div className="translation-panel">
                  <div className="panel-heading">
                    <span>Your text</span>

                    <button
                      className="small-icon"
                      onClick={clearTranslation}
                      disabled={!input}
                      aria-label="Clear"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <textarea
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    placeholder="Type something to translate..."
                    spellCheck={false}
                  />

                  <div className="panel-footer">
                    <span>{input.length} characters</span>

                    <button
                      className="small-icon"
                      onClick={() => speak(input)}
                      disabled={!input}
                      aria-label="Speak"
                    >
                      <Mic size={16} />
                    </button>
                  </div>
                </div>

                <div className="translation-panel result">
                  <div className="panel-heading">
                    <span>Translation</span>

                    <div className="panel-actions">
                      <button
                        className="small-icon"
                        onClick={() => toggleFavorite(result)}
                        disabled={!result}
                        aria-label="Favorite"
                      >
                        <Heart
                          size={16}
                          fill={
                            result && favorites.includes(result)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <button
                        className="small-icon"
                        onClick={copyResult}
                        disabled={!result}
                        aria-label="Copy"
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="translation-result">
                    {result ? (
                      result
                    ) : (
                      <span className="muted">
                        Your translation will appear here.
                      </span>
                    )}
                  </div>

                  <div className="panel-footer">
                    <span>
                      {result ? "Ready" : "Waiting for text"}
                    </span>

                    <button
                      className="small-icon"
                      onClick={() => speak(result)}
                      disabled={!result}
                      aria-label="Listen"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="primary-action"
                onClick={() => translateText()}
              >
                <Languages size={18} />
                Translate
              </button>
            </div>

            <div className="section-heading compact">
              <div>
                <span className="section-kicker">
                  SUGGESTIONS
                </span>
                <h2>Try a phrase</h2>
              </div>
            </div>

            <div className="phrase-grid">
              {quickPhrases.map(([bemba, english]) => (
                <button
                  className="phrase-card"
                  key={bemba}
                  onClick={() => {
                    setInput(english);
                    translateText(english);
                  }}
                >
                  <strong>{bemba}</strong>
                  <span>{english}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {page === "learn" && (
          <section className="page">
            <div className="page-header">
              <span className="section-kicker">LEARNING</span>

              <h1>Learn Bemba</h1>

              <p>
                Build your vocabulary with practical categories
                for everyday conversations.
              </p>
            </div>

            <div className="search-box">
              <Search size={18} />

              <input
                placeholder="Search Bemba lessons..."
                aria-label="Search lessons"
              />
            </div>

            <div className="learning-grid">
              {learningCategories.map((category) => (
                <button
                  className="learning-card"
                  key={category.title}
                  onClick={() => usePhrase(category.title)}
                >
                  <span className="learning-icon">
                    <BookOpen size={20} />
                  </span>

                  <strong>{category.title}</strong>

                  <span>{category.text}</span>

                  <ChevronRight size={17} />
                </button>
              ))}
            </div>

            <div className="info-card">
              <Star size={20} />

              <div>
                <strong>Build your personal phrasebook</strong>

                <p>
                  Favorite useful translations and they will stay
                  available on your device.
                </p>
              </div>
            </div>
          </section>
        )}

        {page === "history" && (
          <section className="page">
            <div className="page-header row-header">
              <div>
                <span className="section-kicker">
                  YOUR ACTIVITY
                </span>

                <h1>Translation history</h1>

                <p>
                  Your recent translations are stored locally on
                  this device.
                </p>
              </div>

              {history.length > 0 && (
                <button
                  className="danger-button"
                  onClick={clearHistory}
                >
                  <Trash2 size={16} />
                  Clear all
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="empty-card">
                <Clock3 size={34} />

                <strong>No translations yet</strong>

                <span>
                  Start translating and your recent activity will
                  appear here.
                </span>

                <button
                  className="primary-action small"
                  onClick={() => navigate("translate")}
                >
                  Start translating
                </button>
              </div>
            ) : (
              <div className="history-list">
                {history.map((item) => (
                  <div className="history-card" key={item.id}>
                    <button
                      className="history-content"
                      onClick={() => {
                        setInput(item.source);
                        setResult(item.result);
                        navigate("translate");
                      }}
                    >
                      <span className="history-source">
                        {item.source}
                      </span>

                      <span className="history-result">
                        {item.result}
                      </span>

                      <small>{item.time}</small>
                    </button>

                    <button
                      className="small-icon"
                      onClick={() => deleteHistory(item.id)}
                      aria-label="Delete translation"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {favorites.length > 0 && (
              <>
                <div className="section-heading compact">
                  <div>
                    <span className="section-kicker">
                      SAVED
                    </span>
                    <h2>Favorites</h2>
                  </div>
                </div>

                <div className="favorites-list">
                  {favorites.map((favorite) => (
                    <div className="favorite-item" key={favorite}>
                      <Heart size={16} fill="currentColor" />
                      <span>{favorite}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {page === "settings" && (
          <section className="page">
            <div className="page-header">
              <span className="section-kicker">
                PREFERENCES
              </span>

              <h1>Settings</h1>

              <p>
                Manage your offline language experience.
              </p>
            </div>

            <div className="settings-list">
              <div className="setting-card">
                <span className="setting-symbol">
                  <Languages size={20} />
                </span>

                <div>
                  <strong>Offline translation</strong>

                  <p>
                    Translation data stays on your device.
                  </p>
                </div>

                <span className="status">ON</span>
              </div>

              <div className="setting-card">
                <span className="setting-symbol">
                  <Volume2 size={20} />
                </span>

                <div>
                  <strong>Voice controls</strong>

                  <p>
                    Listen to text manually whenever you want.
                  </p>
                </div>

                <span className="status">READY</span>
              </div>

              <div className="setting-card">
                <span className="setting-symbol">
                  <Heart size={20} />
                </span>

                <div>
                  <strong>Saved phrases</strong>

                  <p>
                    {favorites.length} favorite translation
                    {favorites.length === 1 ? "" : "s"} saved.
                  </p>
                </div>

                <button
                  className="text-button"
                  onClick={() => navigate("history")}
                >
                  View
                </button>
              </div>

              <div className="setting-card">
                <span className="setting-symbol">
                  <Settings size={20} />
                </span>

                <div>
                  <strong>Local data</strong>

                  <p>
                    History and favorites are stored in your
                    browser or device storage.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => navigate("home")}
        >
          <Home size={19} />
          <span>Home</span>
        </button>

        <button
          className={page === "translate" ? "active" : ""}
          onClick={() => navigate("translate")}
        >
          <Languages size={19} />
          <span>Translate</span>
        </button>

        <button
          className={page === "learn" ? "active" : ""}
          onClick={() => navigate("learn")}
        >
          <BookOpen size={19} />
          <span>Learn</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
