import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Globe2,
  Home,
  Languages,
  Menu,
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
  { id: "dictionary" as Page, label: "Dictionary", icon: BookOpen },
  { id: "history" as Page, label: "History", icon: Clock3 },
  { id: "settings" as Page, label: "Settings", icon: Settings },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");
  const [searchText, setSearchText] = useState("");

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  const translate = () => {
    if (!englishText.trim()) return;

    const text = englishText.trim().toLowerCase();

    const dictionary: Record<string, string> = {
      hello: "Mwashibukeni",
      "good morning": "Mwashibukeni",
      "good afternoon": "Mwasana",
      "good evening": "Mwaiseni",
      "how are you": "Muli shani?",
      "thank you": "Natotela",
      thanks: "Natotela",
      yes: "Eyo",
      no: "Iyo",
      please: "Nomba",
      welcome: "Mwaiseni",
      "my name is": "Ishina lyandi ni",
      "what is your name": "Ishina lyenu ninshi?",
      "i love you": "Nalitemwa",
      "god is good": "Lesa alisuma",
      "good night": "Mwalale bwino",
      goodbye: "Mwapoleni",
      friend: "Munensu",
      child: "Mwana",
      mother: "Mayo",
      father: "Tata",
      water: "Amenshi",
      food: "Ifyakulya",
      house: "Ingo",
      school: "Isukulu",
      today: "Lelo",
      tomorrow: "Mailo",
      yesterday: "Mailo yapita",
    };

    if (dictionary[text]) {
      setBembaText(dictionary[text]);
      return;
    }

    setBembaText(
      "Translation available when the full offline Bemba language model is connected."
    );
  };

  const speak = () => {
    if (!bembaText || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(bembaText);
    utterance.lang = "en-US";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
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
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="sidebar open"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="icon-button close-menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={21} />
            </button>

            <div className="sidebar-header">
              BembaTranslate
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
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <div className="offline-badge">
                <div className="status-dot" />

                <div>
                  <strong>Offline mode</strong>
                  <small>Ready to work locally</small>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            LANGUAGE
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
                      <span>Understand Bemba.</span>
                    </h1>

                    <p>
                      Translate English into Bemba privately,
                      directly on your device.
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
                      <span>Bemba</span>

                      <div className="book-line" />

                      <small>OFFLINE DICTIONARY</small>
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
                        value={englishText}
                        onChange={(event) =>
                          setEnglishText(event.target.value)
                        }
                        placeholder="Type or paste English text..."
                        rows={8}
                        maxLength={1000}
                      />

                      <div className="panel-footer">
                        <button
                          className="text-button"
                          onClick={() => {
                            setEnglishText("");
                            setBembaText("");
                          }}
                        >
                          Clear
                        </button>

                        <span>
                          {englishText.length}/1000
                        </span>
                      </div>

                      <button
                        className="translate-button"
                        disabled={!englishText.trim()}
                        onClick={translate}
                      >
                        <Sparkles size={17} />
                        Translate
                      </button>
                    </div>

                    <div className="output-panel">
                      <label>Bemba</label>

                      {bembaText ? (
                        <>
                          <div
                            style={{
                              fontSize: "20px",
                              lineHeight: 1.6,
                            }}
                          >
                            {bembaText}
                          </div>

                          <div className="audio-controls">
                            <button
                              className="play-button"
                              onClick={speak}
                            >
                              <Volume2 size={17} />
                              Play pronunciation
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="translation-placeholder">
                          <Languages size={27} />
                          <span>
                            Your Bemba translation will appear
                            here.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {page === "dictionary" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">REFERENCE</span>
                  <h2>Bemba Dictionary</h2>
                  <p>
                    Search your local English–Bemba vocabulary.
                  </p>
                </div>

                <div className="search-box">
                  <Search size={20} />

                  <input
                    value={searchText}
                    onChange={(event) =>
                      setSearchText(event.target.value)
                    }
                    placeholder="Search English or Bemba..."
                  />
                </div>

                <div className="empty-card">
                  <BookOpen size={32} />

                  <strong>
                    {searchText
                      ? `Searching for "${searchText}"`
                      : "Offline dictionary"}
                  </strong>

                  <span>
                    The full Bemba vocabulary database will be
                    added to the app next.
                  </span>
                </div>
              </section>
            )}

            {page === "history" && (
              <section>
                <div className="page-heading">
                  <span className="eyebrow">
                    YOUR ACTIVITY
                  </span>

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
                  <span className="eyebrow">
                    PREFERENCES
                  </span>

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
                      <strong>Bemba voice</strong>

                      <span>
                        Local voice model will be connected
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
