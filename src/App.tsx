import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  BookOpen,
  Check,
  Clock3,
  Copy,
  Heart,
  Home,
  Languages,
  Menu,
  Search,
  Settings,
  Sparkles,
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

const phrases = [
  ["Mwashibukeni", "Good morning"],
  ["Muli shani?", "How are you?"],
  ["Natotela", "Thank you"],
  ["Shalenipo", "Goodbye"],
  ["Ndefwaya amenshi", "I want water"],
  ["Ee", "Yes"],
  ["Awe", "No"],
  ["Mwashibukeni sana", "Good morning very much"],
];

const lessons = [
  ["Greetings", "Mwashibukeni, Muli shani?, Shalenipo"],
  ["Everyday Bemba", "Useful expressions for normal conversations."],
  ["Family", "Words for parents, children and relatives."],
  ["Food & Drink", "Useful words when eating or shopping."],
  ["Travel", "Helpful expressions when moving around."],
  ["Numbers", "Practice Bemba numbers and counting."],
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const h = localStorage.getItem("bemba-history");
      const f = localStorage.getItem("bemba-favorites");

      if (h) setHistory(JSON.parse(h));
      if (f) setFavorites(JSON.parse(f));
    } catch {
      setHistory([]);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bemba-history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("bemba-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function navigate(next: Page) {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }

  function translate(text = input) {
    const clean = text.trim();

    if (!clean) {
      setResult("");
      return;
    }

    try {
      const translated = translateWithFallback(clean);
      setResult(translated);

      const item: HistoryItem = {
        id: Date.now(),
        source: clean,
        result: translated,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setHistory((old) => [
        item,
        ...old.filter(
          (x) => x.source !== clean || x.result !== translated
        ),
      ].slice(0, 50));
    } catch {
      setResult("Translation could not be completed.");
    }
  }

  function swap() {
    if (!result) return;

    const oldInput = input;
    setInput(result);
    setResult(oldInput);
  }

  async function copyText() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable.
    }
  }

  function speak(text: string) {
    if (!text || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);
    voice.rate = 0.9;
    window.speechSynthesis.speak(voice);
  }

  function favorite() {
    if (!result) return;

    setFavorites((old) =>
      old.includes(result)
        ? old.filter((x) => x !== result)
        : [...old, result]
    );
  }

  function usePhrase(text: string) {
    setInput(text);
    setResult("");
    navigate("translate");
  }

  function clearHistory() {
    setHistory([]);
  }

  const filteredLessons = lessons.filter((lesson) =>
    `${lesson[0]} ${lesson[1]}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="background-glow" />

      <header className="topbar">
        <button
          className="logo"
          onClick={() => navigate("home")}
          aria-label="Home"
        >
          <span className="logo-icon">
            <Languages size={21} />
          </span>

          <span>
            <strong>BembaTranslate</strong>
            <small>Offline language assistant</small>
          </span>
        </button>

        <div className="top-actions">
          <span className="offline">
            <i />
            Offline
          </span>

          <button
            className="menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <div className="menu-panel">
            <button onClick={() => navigate("home")}>
              <Home size={18} /> Home
            </button>
            <button onClick={() => navigate("translate")}>
              <Languages size={18} /> Translate
            </button>
            <button onClick={() => navigate("learn")}>
              <BookOpen size={18} /> Learn Bemba
            </button>
            <button onClick={() => navigate("history")}>
              <Clock3 size={18} /> History
            </button>
            <button onClick={() => navigate("settings")}>
              <Settings size={18} /> Settings
            </button>
          </div>
        )}
      </header>

      <main className="content">
        {page === "home" && (
          <>
            <section className="welcome">
              <div>
                <span className="badge">
                  <Sparkles size={14} />
                  OFFLINE BEMBA LANGUAGE TOOL
                </span>

                <h1>
                  Speak Bemba
                  <br />
                  <span>with confidence.</span>
                </h1>

                <p>
                  Translate, learn useful expressions, save phrases
                  and build your Bemba vocabulary directly on your
                  device.
                </p>

                <button
                  className="primary"
                  onClick={() => navigate("translate")}
                >
                  Start translating
                  <ArrowLeftRight size={18} />
                </button>
              </div>

              <div className="language-art">
                <Languages size={70} strokeWidth={1.3} />
                <span>ICIBEMBA</span>
              </div>
            </section>

            <section className="stats">
              <div>
                <strong>{history.length}</strong>
                <span>Translations</span>
              </div>

              <div>
                <strong>{favorites.length}</strong>
                <span>Saved phrases</span>
              </div>

              <div>
                <strong>{phrases.length}+</strong>
                <span>Quick phrases</span>
              </div>
            </section>

            <section>
              <div className="section-title">
                <div>
                  <small>QUICK ACCESS</small>
                  <h2>What do you need?</h2>
                </div>
              </div>

              <div className="cards">
                <button
                  className="action-card"
                  onClick={() => navigate("translate")}
                >
                  <span className="card-icon green">
                    <Languages size={23} />
                  </span>
                  <strong>Translate</strong>
                  <p>Translate English and Bemba phrases.</p>
                </button>

                <button
                  className="action-card"
                  onClick={() => navigate("learn")}
                >
                  <span className="card-icon gold">
                    <BookOpen size={23} />
                  </span>
                  <strong>Learn Bemba</strong>
                  <p>Explore useful words and expressions.</p>
                </button>

                <button
                  className="action-card"
                  onClick={() => navigate("history")}
                >
                  <span className="card-icon blue">
                    <Clock3 size={23} />
                  </span>
                  <strong>My History</strong>
                  <p>Return to your previous translations.</p>
                </button>
              </div>
            </section>

            <section>
              <div className="section-title">
                <div>
                  <small>POPULAR</small>
                  <h2>Quick phrases</h2>
                </div>

                <button
                  className="link-button"
                  onClick={() => navigate("learn")}
                >
                  View all
                </button>
              </div>

              <div className="phrase-list">
                {phrases.slice(0, 6).map(([bemba, english]) => (
                  <button
                    key={bemba}
                    className="phrase"
                    onClick={() => usePhrase(english)}
                  >
                    <strong>{bemba}</strong>
                    <span>{english}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "translate" && (
          <section>
            <div className="page-heading">
              <small>TRANSLATION STUDIO</small>
              <h1>Translate</h1>
              <p>Fast offline translation for everyday Bemba.</p>
            </div>

            <div className="translator">
              <div className="language-row">
                <div>
                  <small>FROM</small>
                  <strong>English</strong>
                </div>

                <button className="swap" onClick={swap}>
                  <ArrowLeftRight size={19} />
                </button>

                <div className="target">
                  <small>TO</small>
                  <strong>Bemba</strong>
                </div>
              </div>

              <div className="translation-boxes">
                <div className="text-box">
                  <div className="box-header">
                    <span>Your text</span>
                    <button
                      onClick={() => setInput("")}
                      disabled={!input}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type English here..."
                  />

                  <div className="box-footer">
                    <span>{input.length} characters</span>

                    <button
                      onClick={() => speak(input)}
                      disabled={!input}
                    >
                      <Volume2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="text-box result-box">
                  <div className="box-header">
                    <span>Bemba translation</span>

                    <div className="mini-actions">
                      <button
                        onClick={favorite}
                        disabled={!result}
                      >
                        <Heart
                          size={16}
                          fill={
                            favorites.includes(result)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <button
                        onClick={copyText}
                        disabled={!result}
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="result">
                    {result || (
                      <span>Your translation will appear here.</span>
                    )}
                  </div>

                  <div className="box-footer">
                    <span>{result ? "Translation ready" : "Waiting"}</span>

                    <button
                      onClick={() => speak(result)}
                      disabled={!result}
                    >
                      <Volume2 size={17} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="translate-button"
                onClick={() => translate()}
              >
                <Languages size={18} />
                Translate
              </button>
            </div>

            <section>
              <div className="section-title">
                <div>
                  <small>TRY THESE</small>
                  <h2>Useful phrases</h2>
                </div>
              </div>

              <div className="phrase-list">
                {phrases.map(([bemba, english]) => (
                  <button
                    key={bemba}
                    className="phrase"
                    onClick={() => {
                      setInput(english);
                      translate(english);
                    }}
                  >
                    <strong>{bemba}</strong>
                    <span>{english}</span>
                  </button>
                ))}
              </div>
            </section>
          </section>
        )}

        {page === "learn" && (
          <section>
            <div className="page-heading">
              <small>LEARNING CENTRE</small>
              <h1>Learn Bemba</h1>
              <p>Build your vocabulary step by step.</p>
            </div>

            <div className="search">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lessons..."
              />
            </div>

            <div className="lesson-grid">
              {filteredLessons.map(([title, description]) => (
                <button
                  className="lesson"
                  key={title}
                  onClick={() => usePhrase(title)}
                >
                  <span>
                    <BookOpen size={20} />
                  </span>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </button>
              ))}
            </div>

            <div className="info">
              <Sparkles size={22} />
              <div>
                <strong>Keep practising</strong>
                <p>
                  Use the translator every day and save phrases
                  that you want to remember.
                </p>
              </div>
            </div>
          </section>
        )}

        {page === "history" && (
          <section>
            <div className="page-heading history-heading">
              <div>
                <small>YOUR ACTIVITY</small>
                <h1>History</h1>
                <p>Your translations are stored locally.</p>
              </div>

              {history.length > 0 && (
                <button
                  className="clear-button"
                  onClick={clearHistory}
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="empty">
                <Clock3 size={40} />
                <strong>No translations yet</strong>
                <p>Your translation history will appear here.</p>

                <button
                  className="primary"
                  onClick={() => navigate("translate")}
                >
                  Start translating
                </button>
              </div>
            ) : (
              <div className="history">
                {history.map((item) => (
                  <div className="history-item" key={item.id}>
                    <button
                      onClick={() => {
                        setInput(item.source);
                        setResult(item.result);
                        navigate("translate");
                      }}
                    >
                      <strong>{item.source}</strong>
                      <span>{item.result}</span>
                      <small>{item.time}</small>
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        setHistory((old) =>
                          old.filter((x) => x.id !== item.id)
                        )
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {favorites.length > 0 && (
              <section className="saved">
                <div className="section-title">
                  <div>
                    <small>SAVED</small>
                    <h2>Favorite translations</h2>
                  </div>
                </div>

                {favorites.map((item) => (
                  <div className="saved-item" key={item}>
                    <Heart size={17} fill="currentColor" />
                    {item}
                  </div>
                ))}
              </section>
            )}
          </section>
        )}

        {page === "settings" && (
          <section>
            <div className="page-heading">
              <small>APP SETTINGS</small>
              <h1>Settings</h1>
              <p>Manage your BembaTranslate experience.</p>
            </div>

            <div className="settings">
              <div>
                <Languages size={21} />
                <span>
                  <strong>Offline translation</strong>
                  <small>Available without internet.</small>
                </span>
                <b>ON</b>
              </div>

              <div>
                <Volume2 size={21} />
                <span>
                  <strong>Voice</strong>
                  <small>Use your device speech engine.</small>
                </span>
                <b>READY</b>
              </div>

              <div>
                <Heart size={21} />
                <span>
                  <strong>Favorites</strong>
                  <small>{favorites.length} saved translations.</small>
                </span>
              </div>

              <div>
                <Clock3 size={21} />
                <span>
                  <strong>History</strong>
                  <small>{history.length} translations stored locally.</small>
                </span>
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
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

        <button
          className={page === "history" ? "active" : ""}
          onClick={() => navigate("history")}
        >
          <Clock3 size={19} />
          <span>History</span>
        </button>

        <button
          className={page === "settings" ? "active" : ""}
          onClick={() => navigate("settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
