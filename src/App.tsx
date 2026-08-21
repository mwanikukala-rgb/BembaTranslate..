import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Globe2,
  Home,
  Info,
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
    setBembaText("");

    // Translation engine will be connected here later.
    await new Promise((resolve) => setTimeout(resolve, 650));

    setBembaText(
      "Bemba translation will appear here when the offline translation model is connected."
    );

    setIsTranslating(false);
  };

  const speak = async () => {
    if (!bembaText || isSpeaking) return;

    setIsSpeaking(true);

    // Bemba TTS engine will be connected here later.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSpeaking(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="icon-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={23} />
        </button>

        <button className="brand" onClick={() => openPage("home")}>
          <div className="brand-mark">
            <Languages size={21} />
          </div>

          <div>
            <strong>BembaTranslate</strong>
            <span>English • Bemba</span>
          </div>
        </button>

        <button
          className="icon-button"
          onClick={() => openPage("settings")}
          aria-label="Settings"
        >
          <Settings size={21} />
        </button>
      </header>

      {menuOpen && (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <aside
            className="drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="brand-mark">
                <Languages size={21} />
              </div>

              <div>
                <strong>BembaTranslate</strong>
                <span>Offline language companion</span>
              </div>

              <button
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={21} />
              </button>
            </div>

            <nav className="drawer-nav">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    className={`nav-item ${page === item.id ? "active" : ""}`}
                    onClick={() => openPage(item.id)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    <ChevronRight size={17} />
                  </button>
                );
              })}
            </nav>

            <div className="offline-card">
              <div className="offline-dot" />
              <div>
                <strong>Offline mode</strong>
                <span>Designed to work without internet</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      <main className="page">
        {page === "home" && (
          <section className="home-page">
            <div className="hero">
              <div className="hero-glow" />

              <div className="hero-icon">
                <Sparkles size={27} />
              </div>

              <p className="eyebrow">OFFLINE LANGUAGE COMPANION</p>

              <h1>
                Speak English.
                <br />
                <span>Understand Bemba.</span>
              </h1>

              <p className="hero-description">
                Translate English into natural Bemba and listen to the
                pronunciation — privately, directly on your device.
              </p>

              <button
                className="primary-button"
                onClick={() => openPage("translate")}
              >
                <Languages size={19} />
                Start translating
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="feature-grid">
              <button
                className="feature-card"
                onClick={() => openPage("translate")}
              >
                <div className="feature-icon">
                  <Languages size={22} />
                </div>
                <div>
                  <strong>Translate</strong>
                  <span>English → Bemba</span>
                </div>
                <ChevronRight size={17} />
              </button>

              <button
                className="feature-card"
                onClick={() => openPage("dictionary")}
              >
                <div className="feature-icon">
                  <BookOpen size={22} />
                </div>
                <div>
                  <strong>Dictionary</strong>
                  <span>Words & meanings</span>
                </div>
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="info-strip">
              <div className="info-icon">
                <Globe2 size={19} />
              </div>

              <div>
                <strong>Built for offline use</strong>
                <span>
                  Your translation and voice tools will run locally on the
                  device.
                </span>
              </div>
            </div>
          </section>
        )}

        {page === "translate" && (
          <section className="content-page">
            <div className="page-heading">
              <div>
                <p className="eyebrow">TRANSLATOR</p>
                <h2>English to Bemba</h2>
                <p>Write naturally. Translate privately.</p>
              </div>
            </div>

            <div className="language-bar">
              <div>
                <span>FROM</span>
                <strong>English</strong>
              </div>

              <div className="language-arrow">
                <Languages size={19} />
              </div>

              <div>
                <span>TO</span>
                <strong>Bemba</strong>
              </div>
            </div>

            <div className="translation-card">
              <div className="card-label">
                <span>English</span>
                <span>{englishText.length}/1000</span>
              </div>

              <textarea
                value={englishText}
                onChange={(event) => setEnglishText(event.target.value)}
                placeholder="Type or paste English text..."
                maxLength={1000}
              />

              <div className="input-actions">
                <button
                  className="secondary-button"
                  onClick={() => setEnglishText("")}
                  disabled={!englishText}
                >
                  Clear
                </button>

                <button
                  className="primary-button compact"
                  onClick={translate}
                  disabled={!englishText.trim() || isTranslating}
                >
                  {isTranslating ? (
                    <>
                      <span className="spinner" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} />
                      Translate
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="translation-card result-card">
              <div className="card-label">
                <span>Bemba</span>
                <span className="local-badge">OFFLINE</span>
              </div>

              <div className={`result-text ${!bembaText ? "empty" : ""}`}>
                {bembaText ||
                  "Your Bemba translation will appear here."}
              </div>

              {bembaText && (
                <button
                  className={`speak-button ${isSpeaking ? "speaking" : ""}`}
                  onClick={speak}
                  disabled={isSpeaking}
                >
                  {isSpeaking ? (
                    <>
                      <span className="audio-bars">
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                      Preparing voice...
                    </>
                  ) : (
                    <>
                      <Volume2 size={19} />
                      Play Bemba pronunciation
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="privacy-note">
              <div className="info-icon">
                <Info size={17} />
              </div>
              <span>
                Audio will never start automatically. Press the play button
                whenever you want to hear the Bemba voice.
              </span>
            </div>
          </section>
        )}

        {page === "dictionary" && (
          <section className="content-page">
            <div className="page-heading">
              <p className="eyebrow">REFERENCE</p>
              <h2>Bemba Dictionary</h2>
              <p>Search your offline English–Bemba vocabulary.</p>
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

            <div className="dictionary-empty">
              <div className="large-feature-icon">
                <BookOpen size={27} />
              </div>

              <h3>Offline dictionary</h3>

              <p>
                Your local English–Bemba dictionary will be connected here.
                It will remain available without internet access.
              </p>
            </div>
          </section>
        )}

        {page === "history" && (
          <section className="content-page">
            <div className="page-heading">
              <p className="eyebrow">YOUR ACTIVITY</p>
              <h2>Translation History</h2>
              <p>Your recent translations will appear here.</p>
            </div>

            <div className="dictionary-empty">
              <div className="large-feature-icon">
                <Clock3 size={27} />
              </div>

              <h3>No translations yet</h3>

              <p>
                Once you translate something, your recent activity can be
                stored locally on your device.
              </p>

              <button
                className="primary-button compact"
                onClick={() => openPage("translate")}
              >
                Start translating
                <ChevronRight size={17} />
              </button>
            </div>
          </section>
        )}

        {page === "settings" && (
          <section className="content-page">
            <div className="page-heading">
              <p className="eyebrow">PREFERENCES</p>
              <h2>Settings</h2>
              <p>Control your offline language experience.</p>
            </div>

            <div className="settings-list">
              <div className="setting-row">
                <div className="setting-icon">
                  <Globe2 size={20} />
                </div>
                <div>
                  <strong>Offline mode</strong>
                  <span>Translation models stay on your device.</span>
                </div>
                <div className="toggle active">
                  <div />
                </div>
              </div>

              <div className="setting-row">
                <div className="setting-icon">
                  <Volume2 size={20} />
                </div>
                <div>
                  <strong>Manual audio playback</strong>
                  <span>Audio never plays automatically.</span>
                </div>
                <div className="check-mark">✓</div>
              </div>

              <div className="setting-row">
                <div className="setting-icon">
                  <Mic2 size={20} />
                </div>
                <div>
                  <strong>Bemba voice</strong>
                  <span>Local voice model will be installed later.</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        {navigation.slice(0, 4).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => openPage(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
