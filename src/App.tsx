import { useEffect, useState } from "react";
import {
  BookOpen,
  Bookmark,
  Clock3,
  Home,
  Languages,
  Menu,
  Moon,
  Search,
  Settings,
  Star,
  Sun,
  Volume2,
  X
} from "lucide-react";

type Page = "home" | "translate" | "dictionary" | "history" | "saved" | "settings";

const navigation: { id: Page; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "dictionary", label: "Dictionary", icon: BookOpen },
  { id: "history", label: "History", icon: Clock3 },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "settings", label: "Settings", icon: Settings }
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  if (loading) {
    return <LaunchScreen />;
  }

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
          <Menu size={21} />
        </button>

        <button className="brand" onClick={() => navigate("home")}>
          <span className="brand-mark">
            <Languages size={20} />
          </span>
          <span>
            <strong>Bemba</strong>
            <small>Translate</small>
          </span>
        </button>

        <div className="topbar-actions">
          <button
            className="icon-button"
            onClick={() => setDark((value) => !value)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <span>Menu</span>
            <button
              className="icon-button close-menu"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          <nav>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`nav-item ${page === item.id ? "active" : ""}`}
                  onClick={() => navigate(item.id)}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="offline-badge">
              <span className="status-dot" />
              <div>
                <strong>Offline</strong>
                <small>Ready to translate</small>
              </div>
            </div>
          </div>
        </aside>

        {menuOpen && (
          <button
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          />
        )}

        <main className="main-content">
          {page === "home" && <HomePage onNavigate={navigate} />}
          {page === "translate" && <TranslatePage />}
          {page === "dictionary" && <DictionaryPage />}
          {page === "history" && <HistoryPage />}
          {page === "saved" && <SavedPage />}
          {page === "settings" && <SettingsPage dark={dark} setDark={setDark} />}
        </main>
      </div>
    </div>
  );
}

function LaunchScreen() {
  return (
    <div className="launch-screen">
      <div className="launch-decoration decoration-one" />
      <div className="launch-decoration decoration-two" />

      <div className="launch-content">
        <div className="launch-logo">
          <Languages size={32} />
        </div>

        <h1>BembaTranslate</h1>
        <p>English to Bemba</p>

        <div className="loader">
          <span />
        </div>

        <small>Preparing your offline translator</small>
      </div>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="page page-home">
      <div className="hero">
        <div className="hero-copy">
          <span className="eyebrow">OFFLINE LANGUAGE TOOL</span>
          <h1>Speak English.<br />Understand Bemba.</h1>
          <p>
            Translate English into natural Bemba and listen when you're ready.
          </p>

          <button className="primary-button" onClick={() => onNavigate("translate")}>
            <Languages size={18} />
            Start translating
          </button>
        </div>

        <div className="hero-book">
          <div className="book-page book-back" />
          <div className="book-page book-middle" />
          <div className="book-page book-front">
            <div className="book-symbol">
              <Languages size={30} />
            </div>
            <span>English</span>
            <strong>to</strong>
            <span>Bemba</span>
            <div className="book-line" />
            <small>Offline • Private • Fast</small>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <FeatureCard
          icon={<Languages size={21} />}
          title="Translator"
          text="Convert English into Bemba."
          onClick={() => onNavigate("translate")}
        />
        <FeatureCard
          icon={<Search size={21} />}
          title="Dictionary"
          text="Look up individual words."
          onClick={() => onNavigate("dictionary")}
        />
        <FeatureCard
          icon={<Volume2 size={21} />}
          title="Bemba Voice"
          text="Listen when you choose."
          onClick={() => onNavigate("translate")}
        />
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="feature-card" onClick={onClick}>
      <span className="feature-icon">{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
    </button>
  );
}

function TranslatePage() {
  const [text, setText] = useState("");

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">TRANSLATOR</span>
          <h2>English to Bemba</h2>
          <p>Enter English text and translate it offline.</p>
        </div>
      </div>

      <div className="translator-card">
        <div className="language-row">
          <div className="language-pill">
            <span>EN</span>
            English
          </div>

          <div className="language-arrow">→</div>

          <div className="language-pill bemba">
            <span>BM</span>
            Bemba
          </div>
        </div>

        <div className="translation-columns">
          <div className="input-panel">
            <label htmlFor="english-input">English</label>

            <textarea
              id="english-input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type something in English..."
              rows={8}
            />

            <div className="panel-footer">
              <span>{text.length} characters</span>

              {text && (
                <button className="text-button" onClick={() => setText("")}>
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="output-panel">
            <label>Bemba</label>

            <div className="translation-placeholder">
              <Languages size={26} />
              <span>Your Bemba translation will appear here.</span>
            </div>

            <div className="audio-controls">
              <button className="play-button" disabled>
                <Volume2 size={18} />
                Play Bemba
              </button>
            </div>
          </div>
        </div>

        <button className="translate-button" disabled={!text.trim()}>
          Translate
        </button>
      </div>
    </section>
  );
}

function DictionaryPage() {
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">DICTIONARY</span>
          <h2>English · Bemba</h2>
          <p>Search the built-in offline dictionary.</p>
        </div>
      </div>

      <div className="search-box">
        <Search size={19} />
        <input placeholder="Search an English word..." />
      </div>

      <div className="empty-card">
        <BookOpen size={28} />
        <strong>Dictionary ready</strong>
        <span>
          The offline English–Bemba dictionary will be connected in the next stage.
        </span>
      </div>
    </section>
  );
}

function HistoryPage() {
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR ACTIVITY</span>
          <h2>Translation history</h2>
          <p>Your translations will stay on this device.</p>
        </div>
      </div>

      <div className="empty-card">
        <Clock3 size={28} />
        <strong>No translations yet</strong>
        <span>Your recent translations will appear here.</span>
      </div>
    </section>
  );
}

function SavedPage() {
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h2>Saved translations</h2>
          <p>Keep useful translations close at hand.</p>
        </div>
      </div>

      <div className="empty-card">
        <Star size={28} />
        <strong>Nothing saved yet</strong>
        <span>Save translations you want to remember.</span>
      </div>
    </section>
  );
}

function SettingsPage({
  dark,
  setDark
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PREFERENCES</span>
          <h2>Settings</h2>
          <p>Control your BembaTranslate experience.</p>
        </div>
      </div>

      <div className="settings-card">
        <div className="setting-row">
          <div className="setting-icon">
            {dark ? <Moon size={19} /> : <Sun size={19} />}
          </div>
          <div className="setting-copy">
            <strong>Appearance</strong>
            <span>{dark ? "Dark mode" : "Light mode"}</span>
          </div>

          <button
            className={`switch ${dark ? "on" : ""}`}
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
          >
            <span />
          </button>
        </div>

        <div className="setting-row">
          <div className="setting-icon">
            <Volume2 size={19} />
          </div>
          <div className="setting-copy">
            <strong>Audio playback</strong>
            <span>Audio will only play when you tap Play.</span>
          </div>

          <span className="setting-status">Manual</span>
        </div>

        <div className="setting-row">
          <div className="setting-icon">
            <Languages size={19} />
          </div>
          <div className="setting-copy">
            <strong>Translation engine</strong>
            <span>Local offline model</span>
          </div>

          <span className="setting-status">Offline</span>
        </div>
      </div>
    </section>
  );
}

export default App;
