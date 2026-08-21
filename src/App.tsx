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

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  const translate = () => {
    if (!englishText.trim()) return;

    setBembaText(
      "Bemba translation engine will be connected in the next step."
    );
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="icon-button"
          onClick={() => setMenuOpen(true)}
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
        >
          <Settings size={20} />
        </button>
      </header>

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="brand-mark">
                <Languages size={21} />
              </div>

              <div>
                <strong>BembaTranslate</strong>
                <small>Offline language companion</small>
              </div>

              <button
                className="icon-button"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

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
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <div className="offline-badge">
                <div className="status-dot" />
                <div>
                  <strong>Offline mode</strong>
                  <small>No internet required</small>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <main className="main-content">
        {page === "home" && (
          <section className="page">
            <div className="hero">
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
                  Translate English into natural Bemba with a private
                  language experience designed to work directly on your
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
                  <strong>↕</strong>
                  <span>Bemba</span>

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
          <section className="page">
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

                <ChevronRight
                  size={18}
                  className="language-arrow"
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
                    onChange={(e) =>
                      setEnglishText(e.target.value)
                    }
                    placeholder="Type or paste English text..."
                    rows={9}
                    maxLength={1000}
                  />

                  <div className="panel-footer">
                    <button
                      className="text-button"
                      onClick={() => setEnglishText("")}
                    >
                      Clear
                    </button>

                    <span>{englishText.length}/1000</span>
                  </div>
                </div>

                <div className="output-panel">
                  <label>Bemba</label>

                  {bembaText ? (
                    <div>{bembaText}</div>
                  ) : (
                    <div className="translation-placeholder">
                      <Sparkles size={24} />
                      <span>
                        Your Bemba translation will appear here.
                      </span>
                    </div>
                  )}

                  <div className="audio-controls">
                    <button
                      className="play-button"
                      disabled={!bembaText}
                    >
                      <Volume2 size={17} />
                      Play
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="translate-button"
                onClick={translate}
                disabled={!englishText.trim()}
              >
                <Sparkles size={17} />
                Translate to Bemba
              </button>
            </div>
          </section>
        )}

        {page === "dictionary" && (
          <section className="page">
            <div className="page-heading">
              <span className="eyebrow">REFERENCE</span>
              <h2>Bemba Dictionary</h2>
              <p>Search your offline English–Bemba vocabulary.</p>
            </div>

            <div className="search-box">
              <BookOpen size={19} />
              <input placeholder="Search English or Bemba..." />
            </div>

            <div className="empty-card">
              <BookOpen size={32} />
              <strong>Offline dictionary</strong>
              <span>
                The local English–Bemba dictionary will be added
                here.
              </span>
            </div>
          </section>
        )}

        {page === "history" && (
          <section className="page">
            <div className="page-heading">
              <span className="eyebrow">YOUR ACTIVITY</span>
              <h2>Translation History</h2>
              <p>Your recent translations will appear here.</p>
            </div>

            <div className="empty-card">
              <Clock3 size={32} />
              <strong>No translations yet</strong>
              <span>
                Your translation history will be stored locally
                on your device.
              </span>

              <button
                className="primary-button"
                onClick={() => openPage("translate")}
              >
                Start translating
              </button>
            </div>
          </section>
        )}

        {page === "settings" && (
          <section className="page">
            <div className="page-heading">
              <span className="eyebrow">PREFERENCES</span>
              <h2>Settings</h2>
              <p>Control your language experience.</p>
            </div>

            <div className="settings-card">
              <div className="setting-row">
                <div className="setting-icon">
                  <Globe2 size={19} />
                </div>

                <div className="setting-copy">
                  <strong>Offline mode</strong>
                  <span>
                    Translation will run locally on the device.
                  </span>
                </div>

                <span className="setting-status">ON</span>
              </div>

              <div className="setting-row">
                <div className="setting-icon">
                  <Volume2 size={19} />
                </div>

                <div className="setting-copy">
                  <strong>Manual audio</strong>
                  <span>
                    Voice playback only starts when you press Play.
                  </span>
                </div>

                <span className="setting-status">ON</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
