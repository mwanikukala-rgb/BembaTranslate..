import { useState } from "react";
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Volume2,
  Trash2,
  History,
  Settings,
  Home,
} from "lucide-react";

type Page = "home" | "history" | "settings";

const dictionary: Record<string, string> = {
  hello: "Shani",
  hi: "Shani",
  good: "Bwino",
  morning: "Mwapoleni",
  afternoon: "Mwapoleni",
  evening: "Mwapoleni",
  thank: "Natotela",
  thanks: "Natotela",
  welcome: "Mwaiseni",
  yes: "Ee",
  no: "Awe",
  water: "Amenshi",
  food: "Ifyakulya",
  house: "Ingo",
  home: "Ingo",
  child: "Umwana",
  children: "Abana",
  man: "Umwaume",
  woman: "Umukashana",
  father: "Tata",
  mother: "Mayo",
  friend: "Umwine",
  love: "Uluse",
  God: "Lesa",
  church: "Cimpwila",
  today: "Lelo",
  tomorrow: "Mailo",
  yesterday: "Mailo yapita",
};

function translateText(text: string) {
  const words = text.trim().split(/\s+/);

  return words
    .map((word) => {
      const clean = word.toLowerCase().replace(/[.,!?]/g, "");
      const result = dictionary[clean];

      if (!result) return word;

      const first = word[0] === word[0]?.toUpperCase();
      return first
        ? result.charAt(0).toUpperCase() + result.slice(1)
        : result;
    })
    .join(" ");
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [sourceText, setSourceText] = useState("");
  const [result, setResult] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Bemba");
  const [history, setHistory] = useState<string[]>([]);

  function translate() {
    if (!sourceText.trim()) {
      setResult("");
      return;
    }

    const translated = translateText(sourceText);
    setResult(translated);

    setHistory((old) => [
      `${sourceText} → ${translated}`,
      ...old,
    ]);
  }

  function swapLanguages() {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(result);
    setResult("");
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard?.writeText(result);
  }

  function speakResult() {
    if (!result || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(result);
    speech.lang = "en-US";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
  }

  function clearAll() {
    setSourceText("");
    setResult("");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <Languages size={23} />
          </div>

          <div>
            <div className="brand-name">BembaTranslate</div>
            <div className="brand-subtitle">Offline translator</div>
          </div>
        </div>

        <div className="offline-badge">
          <span />
          Offline
        </div>
      </header>

      <main className="main-content">
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-label">BEMBA LANGUAGE</div>

              <h1>
                Translate naturally.
                <br />
                <span>Speak Bemba.</span>
              </h1>

              <p>
                A simple offline translation tool that keeps
                your language data on your device.
              </p>
            </section>

            <section className="translator-card">
              <div className="language-bar">
                <button
                  className="language-select"
                  onClick={() =>
                    setSourceLanguage(
                      sourceLanguage === "English"
                        ? "Bemba"
                        : "English"
                    )
                  }
                >
                  <span>{sourceLanguage}</span>
                  <small>Tap to change</small>
                </button>

                <button
                  className="swap-button"
                  onClick={swapLanguages}
                  aria-label="Swap languages"
                >
                  <ArrowRightLeft size={19} />
                </button>

                <button
                  className="language-select target"
                  onClick={() =>
                    setTargetLanguage(
                      targetLanguage === "Bemba"
                        ? "English"
                        : "Bemba"
                    )
                  }
                >
                  <span>{targetLanguage}</span>
                  <small>Tap to change</small>
                </button>
              </div>

              <div className="translation-area">
                <div className="input-panel">
                  <label>YOUR TEXT</label>

                  <textarea
                    value={sourceText}
                    onChange={(e) =>
                      setSourceText(e.target.value)
                    }
                    placeholder="Type something to translate..."
                    spellCheck={false}
                  />

                  <div className="input-footer">
                    <span>{sourceText.length} characters</span>

                    <button
                      className="icon-button"
                      onClick={clearAll}
                      title="Clear"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="result-panel">
                  <label>TRANSLATION</label>

                  <div className="result-box">
                    {result ? (
                      <span>{result}</span>
                    ) : (
                      <span className="result-placeholder">
                        Your translation will appear here...
                      </span>
                    )}
                  </div>

                  <div className="result-footer">
                    <span>Offline dictionary</span>

                    <div className="result-actions">
                      <button
                        className="icon-button"
                        onClick={copyResult}
                        title="Copy"
                        disabled={!result}
                      >
                        <Copy size={18} />
                      </button>

                      <button
                        className="icon-button"
                        onClick={speakResult}
                        title="Speak"
                        disabled={!result}
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="translate-button"
                onClick={translate}
              >
                Translate
              </button>
            </section>

            <section className="quick-section">
              <div>
                <div className="section-title">Try an example</div>
                <div className="section-subtitle">
                  Tap a phrase to translate it
                </div>
              </div>

              <div className="examples">
                {[
                  "Hello",
                  "Thank you",
                  "Good morning",
                  "Water",
                  "My friend",
                ].map((item) => (
                  <button
                    key={item}
                    className="example"
                    onClick={() => {
                      setSourceText(item);
                      setTimeout(() => {
                        setResult(translateText(item));
                      }, 0);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "history" && (
          <section className="simple-page">
            <div className="page-icon">
              <History size={28} />
            </div>

            <h1>Translation History</h1>

            <p>
              Your recent translations are stored locally
              on this device.
            </p>

            {history.length === 0 ? (
              <div className="empty-state">
                No translations yet.
              </div>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div className="history-item" key={index}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {page === "settings" && (
          <section className="simple-page">
            <div className="page-icon">
              <Settings size={28} />
            </div>

            <h1>Settings</h1>

            <p>
              BembaTranslate is designed to work without
              requiring an internet connection.
            </p>

            <div className="setting-box">
              <strong>Offline mode</strong>
              <span>Enabled</span>
            </div>

            <div className="setting-box">
              <strong>Translation engine</strong>
              <span>Local dictionary</span>
            </div>

            <div className="setting-box">
              <strong>Version</strong>
              <span>1.0.0</span>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          <Home size={21} />
          <span>Translate</span>
        </button>

        <button
          className={page === "history" ? "active" : ""}
          onClick={() => setPage("history")}
        >
          <History size={21} />
          <span>History</span>
        </button>

        <button
          className={page === "settings" ? "active" : ""}
          onClick={() => setPage("settings")}
        >
          <Settings size={21} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
