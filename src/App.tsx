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
  Settings,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import "./styles/global.css";

type Page = "home" | "translate" | "dictionary" | "history" | "settings";

const navigation: { id: Page; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "dictionary", label: "Dictionary", icon: Library },
  { id: "history", label: "History", icon: Clock3 },
  { id: "settings", label: "Settings", icon: Settings },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");
  const [search, setSearch] = useState("");

  const openPage = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
  };

  const translate = () => {
    if (!englishText.trim()) return;

    setBembaText(
      "Translation engine will be connected here. This app is prepared for the offline Bemba translation model."
    );
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="icon-button"
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

        <button
          className="icon-button"
          onClick={() => openPage("settings")}
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
      </header>

      {menuOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="sidebar open">
            <button
              className="icon-button close-menu"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={21} />
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
                  <small>Ready for local models</small>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="layout">
        <aside className="sidebar">
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
                <small>Ready for local models</small>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="page">
            {page === "home" && (
              <section>
                <div className="hero">
                  <div>
                    <span className="eyebrow">
                      OFFLINE LANGUAGE COMPANION
                    </span>

                    <h1>
                      Speak English.
                      <br />
                      Understand Bemba.
                    </h1>

                    <p>
                      Translate English into Bemba privately and
                      prepare the app for completely offline language
                      tools.
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
                        <Languages size={27} />
                      </div>

                      <span>English</span>
                      <strong>Bemba</strong>

                      <div className="book-line" />

                      <small>OFFLINE LANGUAGE</small>
                    </div>
                  </div>
                </div>

                <div className="feature-grid">
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
                </div>
              </section>
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
                        rows={8}
                        value={englishText}
                        onChange={(e) =>
                          setEnglishText(e.target.value)
                        }
                        placeholder="Type or paste English text..."
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
                          <p>{bembaText}</p>

                          <div className="audio-controls">
                            <button
                              className="play-button"
                              disabled
                            >
                              <Volume2 size={16} />
                              Voice coming soon
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="translation-placeholder">
                          <Sparkles size={25} />
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
                    disabled={!englishText.trim()}
                  >
                    <Sparkles size={18} />
                    Translate to Bemba
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
                  <Library size={19} />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search English or Bemba..."
                  />
                </div>

                <div className="empty-card">
                  <BookOpen size={32} />

                  <strong>Offline dictionary</strong>

                  <span>
                    The local English–Bemba dictionary will be
                    connected here.
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
                      <Languages size={19} />
                    </div>

                    <div className="setting-copy">
                      <strong>Bemba language</strong>
                      <span>
                        Local language model will be connected
                        later.
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
