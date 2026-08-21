import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Globe2,
  Home,
  Languages,
  Menu,
  Mic2,
  Search,
  Settings,
  Volume2,
  X,
} from "lucide-react";

import {
  bembaDictionary,
  findBembaWord,
  searchBembaDictionary,
} from "./data/bembaDictionary";

import "./styles/global.css";

type Page = "home" | "translate" | "dictionary" | "history" | "settings";

const navigation = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "translate" as Page, label: "Translate", icon: Languages },
  { id: "dictionary" as Page, label: "Dictionary", icon: BookOpen },
  { id: "history" as Page, label: "History", icon: Clock3 },
  { id: "settings" as Page, label: "Settings", icon: Settings },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");

  const [dictionarySearch, setDictionarySearch] = useState("");

  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [history, setHistory] = useState<
    { english: string; bemba: string }[]
  >([]);

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  const translate = async () => {
    if (!englishText.trim() || isTranslating) return;

    setIsTranslating(true);
    setBembaText("");

    await new Promise((resolve) => setTimeout(resolve, 250));

    const input = englishText.trim().toLowerCase();

    const exactMatch = findBembaWord(input);

    if (exactMatch) {
      setBembaText(exactMatch.bemba);

      setHistory((oldHistory) => [
        {
          english: englishText.trim(),
          bemba: exactMatch.bemba,
        },
        ...oldHistory,
      ]);
    } else {
      const words = input
        .replace(/[.,!?;:()[\]{}"]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      const translatedWords = words.map((word) => {
        const match = findBembaWord(word);
        return match ? match.bemba : word;
      });

      const translated = translatedWords.join(" ");

      if (translated !== input) {
        setBembaText(translated);

        setHistory((oldHistory) => [
          {
            english: englishText.trim(),
            bemba: translated,
          },
          ...oldHistory,
        ]);
      } else {
        setBembaText(
          "I don't have this word in the offline Bemba dictionary yet."
        );
      }
    }

    setIsTranslating(false);
  };

  const speak = async () => {
    if (!bembaText || isSpeaking) return;

    setIsSpeaking(true);

    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(bembaText);
        speech.lang = "bem";
        speech.rate = 0.85;
        speech.pitch = 1;

        speech.onend = () => {
          setIsSpeaking(false);
        };

        speech.onerror = () => {
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(speech);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
        setIsSpeaking(false);
      }
    } catch {
      setIsSpeaking(false);
    }
  };

  const dictionaryResults = useMemo(() => {
    return searchBembaDictionary(dictionarySearch);
  }, [dictionarySearch]);

  return (
    <div className="app-shell">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <header className="topbar">
        <button
          className="icon-button mobile-menu"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <button className="brand" onClick={() => openPage("home")}>
          <div className="brand-mark">
            <Languages size={21} />
          </div>

          <div>
            <strong>BembaTranslate</strong>
            <small>English • Bemba</small>
          </div>
        </button>

        <div className="topbar-actions">
          <button
            className="icon-button"
            onClick={() => openPage("settings")}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
          <button
            className="icon-button close-menu"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          <div className="sidebar-header">Navigation</div>

          <nav>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`nav-item ${
                    page === item.id ? "active" : ""
                  }`}
                  onClick={() => openPage(item.id)}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                  <ChevronRight
                    size={15}
                    style={{ marginLeft: "auto", opacity: 0.35 }}
                  />
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="offline-badge">
              <span className="status-dot" />

              <div>
                <strong>Offline mode</strong>
                <small>Designed for local use</small>
              </div>
            </div>
          </div>
        </aside>

        {menuOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <main className="main-content">
          <div className="page">
            {page === "home" && (
              <>
                <section className="hero">
                  <div>
                    <span className="eyebrow">
                      OFFLINE LANGUAGE COMPANION
                    </span>

                    <h1>
                      Speak English.
                      <br />
                      <span>Understand Bemba.</span>
                    </h1>

                    <p>
                      Translate English into Bemba using your local
                      dictionary. Everything starts directly on your
                      device.
                    </p>

                    <button
                      className="primary-button"
                      onClick={() => openPage("translate")}
                    >
                      <Languages size={18} />
                      Start translating
                      <ChevronRight size={17} />
                    </button>
                  </div>

                  <div className="hero-book">
                    <div className="book-page book-back" />
                    <div className="book-page book-middle" />

                    <div className="book-page book-front">
                      <div className="book-symbol">
                        <Languages size={28} />
                      </div>

                      <span>English</span>
                      <strong>↔</strong>
                      <strong>Bemba</strong>

                      <div className="book-line" />

                      <small>OFFLINE LANGUAGE</small>
                    </div>
                  </div>
                </section>

                <section className="feature-grid">
                  <button
                    className="feature-card"
                    onClick={() => openPage("translate")}
                  >
                    <div className="feature-icon">
                      <Languages size={21} />
                    </div>

                    <div>
                      <strong>Translate</strong>
                      <small>English → Bemba</small>
                    </div>

                    <ChevronRight
                      size={16}
                      style={{ marginLeft: "auto", opacity: 0.4 }}
                    />
                  </button>

                  <button
                    className="feature-card"
                    onClick={() => openPage("dictionary")}
                  >
                    <div className="feature-icon">
                      <BookOpen size={21} />
                    </div>

                    <div>
                      <strong>Dictionary</strong>
                      <small>
                        {bembaDictionary.length} offline entries
                      </small>
                    </div>

                    <ChevronRight
                      size={16}
                      style={{ marginLeft: "auto", opacity: 0.4 }}
                    />
                  </button>

                  <button
                    className="feature-card"
                    onClick={() => openPage("history")}
                  >
                    <div className="feature-icon">
                      <Clock3 size={21} />
                    </div>

                    <div>
                      <strong>History</strong>
                      <small>Recent translations</small>
                    </div>

                    <ChevronRight
                      size={16}
                      style={{ marginLeft: "auto", opacity: 0.4 }}
                    />
                  </button>
                </section>
              </>
            )}

            {page === "translate" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">TRANSLATOR</span>
                  <h2>English to Bemba</h2>
                  <p>
                    Translate using the offline Bemba dictionary.
                  </p>
                </div>

                <div className="translator-card">
                  <div className="language-row">
                    <div className="language-pill">
                      <span>FROM</span>
                      English
                    </div>

                    <Languages
                      className="language-arrow"
                      size={18}
                    />

                    <div className="language-pill bemba">
                      <span>TO</span>
                      Bemba
                    </div>
                  </div>

                  <div className="translation-columns">
                    <div className="input-panel">
                      <label>English</label>

                      <textarea
                        value={englishText}
                        onChange={(event) =>
                          setEnglishText(event.target.value)
                        }
                        placeholder="Type English text here..."
                        rows={8}
                        maxLength={1000}
                      />

                      <div className="panel-footer">
                        <span>
                          {englishText.length}/1000
                        </span>

                        <button
                          className="text-button"
                          onClick={() => {
                            setEnglishText("");
                            setBembaText("");
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="output-panel">
                      <label>Bemba</label>

                      {bembaText ? (
                        <>
                          <div
                            style={{
                              minHeight: "205px",
                              lineHeight: 1.7,
                              fontSize: "18px",
                            }}
                          >
                            {bembaText}
                          </div>

                          <div className="audio-controls">
                            <button
                              className="play-button"
                              onClick={speak}
                              disabled={isSpeaking}
                            >
                              <Volume2 size={17} />

                              {isSpeaking
                                ? "Playing..."
                                : "Play pronunciation"}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="translation-placeholder">
                          <Languages size={28} />
                          <span>
                            Your Bemba translation will appear
                            here.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    className="translate-button"
                    onClick={translate}
                    disabled={
                      !englishText.trim() || isTranslating
                    }
                  >
                    <Languages size={18} />

                    {isTranslating
                      ? "Translating..."
                      : "Translate"}
                  </button>
                </div>
              </section>
            )}

            {page === "dictionary" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">REFERENCE</span>
                  <h2>Bemba Dictionary</h2>
                  <p>
                    Search the offline English–Bemba vocabulary.
                  </p>
                </div>

                <div className="search-box">
                  <Search size={20} />

                  <input
                    value={dictionarySearch}
                    onChange={(event) =>
                      setDictionarySearch(event.target.value)
                    }
                    placeholder="Search English or Bemba..."
                  />
                </div>

                {dictionarySearch &&
                dictionaryResults.length > 0 ? (
                  <div className="settings-card">
                    {dictionaryResults.map((entry, index) => (
                      <div
                        className="setting-row"
                        key={`${entry.english}-${entry.bemba}-${index}`}
                      >
                        <div className="setting-icon">
                          <BookOpen size={19} />
                        </div>

                        <div className="setting-copy">
                          <strong>{entry.english}</strong>

                          <span>
                            {entry.bemba}
                            {entry.pronunciation
                              ? ` • ${entry.pronunciation}`
                              : ""}
                          </span>
                        </div>

                        {entry.category && (
                          <span className="setting-status">
                            {entry.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : dictionarySearch ? (
                  <div className="empty-card">
                    <Search size={32} />
                    <strong>No matching word</strong>
                    <span>
                      This word is not currently in the offline
                      dictionary.
                    </span>
                  </div>
                ) : (
                  <div className="empty-card">
                    <BookOpen size={32} />
                    <strong>
                      {bembaDictionary.length} dictionary entries
                    </strong>
                    <span>
                      Search for an English or Bemba word to see
                      its meaning.
                    </span>
                  </div>
                )}
              </section>
            )}

            {page === "history" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">YOUR ACTIVITY</span>
                  <h2>Translation History</h2>
                  <p>
                    Your recent translations are stored during this
                    session.
                  </p>
                </div>

                {history.length > 0 ? (
                  <div className="settings-card">
                    {history.map((item, index) => (
                      <div
                        className="setting-row"
                        key={`${item.english}-${index}`}
                      >
                        <div className="setting-icon">
                          <Clock3 size={19} />
                        </div>

                        <div className="setting-copy">
                          <strong>{item.english}</strong>
                          <span>{item.bemba}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-card">
                    <Clock3 size={32} />
                    <strong>No translations yet</strong>

                    <span>
                      Translate a word or phrase and it will appear
                      here.
                    </span>

                    <button
                      className="primary-button"
                      onClick={() => openPage("translate")}
                    >
                      Start translating
                      <ChevronRight size={17} />
                    </button>
                  </div>
                )}
              </section>
            )}

            {page === "settings" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">PREFERENCES</span>
                  <h2>Settings</h2>
                  <p>
                    Control your offline language experience.
                  </p>
                </div>

                <div className="settings-card">
                  <div className="setting-row">
                    <div className="setting-icon">
                      <Globe2 size={19} />
                    </div>

                    <div className="setting-copy">
                      <strong>Offline mode</strong>
                      <span>
                        Dictionary data is bundled with the app.
                      </span>
                    </div>

                    <span className="setting-status">
                      ON
                    </span>
                  </div>

                  <div className="setting-row">
                    <div className="setting-icon">
                      <Volume2 size={19} />
                    </div>

                    <div className="setting-copy">
                      <strong>Manual audio</strong>
                      <span>
                        Audio only plays when you press the button.
                      </span>
                    </div>

                    <span className="setting-status">
                      ON
                    </span>
                  </div>

                  <div className="setting-row">
                    <div className="setting-icon">
                      <Mic2 size={19} />
                    </div>

                    <div className="setting-copy">
                      <strong>Bemba voice</strong>
                      <span>
                        Browser speech is used when available.
                      </span>
                    </div>

                    <span className="setting-status">
                      READY
                    </span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
