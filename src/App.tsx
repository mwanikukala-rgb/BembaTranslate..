import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Globe2,
  Home,
  Languages,
  Library,
  Menu,
  Mic2,
  Search,
  Settings,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

import "./styles/global.css";

type Page = "home" | "translate" | "dictionary" | "history" | "settings";

const navigation = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "translate" as Page, label: "Translate", icon: Languages },
  { id: "dictionary" as Page, label: "Dictionary", icon: Library },
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

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  const translate = async () => {
    if (!englishText.trim() || isTranslating) return;

    setIsTranslating(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setBembaText(
      "Translation engine ready. The offline English–Bemba model will be connected here."
    );

    setIsTranslating(false);
  };

  const speak = async () => {
    if (!bembaText || isSpeaking) return;

    setIsSpeaking(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSpeaking(false);
  };

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
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="offline-badge">
              <div className="status-dot" />

              <div>
                <strong>Offline mode</strong>
                <small>Works without internet</small>
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
                      Translate English into Bemba and build a private
                      language experience that works directly on your
                      device.
                    </p>

                    <button
                      className="primary-button"
                      onClick={() => openPage("translate")}
                    >
                      <Languages size={18} />
                      Start translating
                      <ChevronRight size={18} />
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
                      <strong>Bemba</strong>

                      <div className="book-line" />

                      <small>LOCAL LANGUAGE</small>
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

                    <ChevronRight size={17} />
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
                      <small>Words & meanings</small>
                    </div>

                    <ChevronRight size={17} />
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

                    <ChevronRight size={17} />
                  </button>
                </section>
              </>
            )}

            {page === "translate" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">TRANSLATOR</span>
                  <h2>English to Bemba</h2>
                  <p>Write naturally. Translate privately.</p>
                </div>

                <div className="translator-card">
                  <div className="language-row">
                    <div className="language-pill">
                      <Languages size={16} />
                      <strong>English</strong>
                      <span>FROM</span>
                    </div>

                    <div className="language-arrow">
                      <ChevronRight size={18} />
                    </div>

                    <div className="language-pill bemba">
                      <Languages size={16} />
                      <strong>Bemba</strong>
                      <span>TO</span>
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
                        placeholder="Type or paste English text..."
                        rows={9}
                        maxLength={1000}
                      />

                      <div className="panel-footer">
                        <span>
                          {englishText.length}/1000
                        </span>

                        <button
                          className="text-button"
                          onClick={() => setEnglishText("")}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="output-panel">
                      <label>Bemba</label>

                      {bembaText ? (
                        <>
                          <div className="translation-placeholder">
                            <strong>{bembaText}</strong>
                          </div>

                          <div className="audio-controls">
                            <button
                              className="play-button"
                              onClick={speak}
                              disabled={isSpeaking}
                            >
                              <Volume2 size={16} />

                              {isSpeaking
                                ? "Preparing voice..."
                                : "Play pronunciation"}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="translation-placeholder">
                          <Languages size={28} />
                          <span>
                            Your Bemba translation will appear here.
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
                    {isTranslating ? (
                      <>
                        <span className="spinner" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={17} />
                        Translate to Bemba
                      </>
                    )}
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
                    Search your offline English–Bemba vocabulary.
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

                <div className="empty-card">
                  <BookOpen size={32} />

                  <strong>Offline dictionary</strong>

                  <span>
                    The local English–Bemba dictionary will be
                    connected here in the next step.
                  </span>
                </div>
              </section>
            )}

            {page === "history" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">YOUR ACTIVITY</span>
                  <h2>Translation History</h2>
                  <p>
                    Your recent translations will appear here.
                  </p>
                </div>

                <div className="empty-card">
                  <Clock3 size={32} />

                  <strong>No translations yet</strong>

                  <span>
                    Translations will be stored locally on your
                    device.
                  </span>

                  <button
                    className="primary-button"
                    onClick={() => openPage("translate")}
                  >
                    Start translating
                    <ChevronRight size={17} />
                  </button>
                </div>
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
                        Translation models stay on your device.
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
                        Audio never plays automatically.
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
                        Local voice model will be connected later.
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
