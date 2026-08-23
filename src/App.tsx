import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Heart,
  History,
  Home,
  Info,
  Languages,
  LocateFixed,
  Map,
  Navigation,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Volume2,
  WifiOff,
  X,
} from "lucide-react";

type Page =
  | "home"
  | "dictionary"
  | "learn"
  | "history"
  | "navigation"
  | "settings";

type DictionaryEntry = {
  english: string;
  bemba: string;
};

type HistoryEntry = {
  english: string;
  bemba: string;
  time: string;
};

const dictionary: DictionaryEntry[] = [
  { english: "Hello", bemba: "Muli shani" },
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "Good afternoon", bemba: "Mwabeleni" },
  { english: "Good evening", bemba: "Mwaungukeni" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "Thank you very much", bemba: "Natotela sana" },
  { english: "Please", bemba: "Nomba" },
  { english: "Yes", bemba: "Eya" },
  { english: "No", bemba: "Awe" },
  { english: "Welcome", bemba: "Mwaiseni" },
  { english: "Goodbye", bemba: "Shalenipo" },
  { english: "See you", bemba: "Tukamonana" },
  { english: "What is your name?", bemba: "Mwishuka shani?" },
  { english: "My name is", bemba: "Ishina lyandi ni" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Where are you going?", bemba: "Uya kwisa?" },
  { english: "I am going home", bemba: "Ndi kuya ku ng'anda" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "I love you", bemba: "Nalikutemwa" },
  { english: "I don't know", bemba: "Tasheni" },
  { english: "I understand", bemba: "Ndemfwa" },
  { english: "I don't understand", bemba: "Tandemfwa" },
  { english: "Come here", bemba: "Iseni apa" },
  { english: "Wait", bemba: "Lindeni" },
  { english: "Let's go", bemba: "Tuleke" },
  { english: "Eat", bemba: "Lya" },
  { english: "Drink", bemba: "Nwa" },
  { english: "Water", bemba: "Amenshi" },
  { english: "Food", bemba: "Ifyakulya" },
  { english: "House", bemba: "Ing'anda" },
  { english: "Person", bemba: "Umuntu" },
  { english: "People", bemba: "Abantu" },
  { english: "Friend", bemba: "Cisuma" },
  { english: "Child", bemba: "Umwana" },
  { english: "Man", bemba: "Umwaume" },
  { english: "Woman", bemba: "Umukashana" },
  { english: "Money", bemba: "Indalama" },
  { english: "School", bemba: "Isukulu" },
  { english: "Teacher", bemba: "Umusambilishi" },
  { english: "Student", bemba: "Umusambilila" },
  { english: "Book", bemba: "Icitabo" },
  { english: "Today", bemba: "Lelo" },
  { english: "Tomorrow", bemba: "Mailo" },
  { english: "Yesterday", bemba: "Mailo yapita" },
  { english: "Now", bemba: "Nomba" },
  { english: "Here", bemba: "Apa" },
  { english: "There", bemba: "Kula" },
  { english: "Big", bemba: "Kulu" },
  { english: "Small", bemba: "Kace" },
  { english: "Good", bemba: "Busuma" },
  { english: "Bad", bemba: "Bubi" },
  { english: "Beautiful", bemba: "Busuma" },
  { english: "Happy", bemba: "Ukwanga" },
  { english: "Sorry", bemba: "Ndekelesheni" },
  { english: "Excuse me", bemba: "Ndekelesheni" },
  { english: "Help me", bemba: "Mundafwako" },
  { english: "What?", bemba: "Cinshi?" },
  { english: "Who?", bemba: "Nani?" },
  { english: "Where?", bemba: "Kwisa?" },
  { english: "Why?", bemba: "Cinshi ico?" },
  { english: "When?", bemba: "Ninshi?" },
];

const quickPhrases = [
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "I love you", bemba: "Nalikutemwa" },
];

const learningCards = [
  {
    title: "Greetings",
    description: "Learn common Bemba greetings.",
  },
  {
    title: "People",
    description: "Useful words for talking about people.",
  },
  {
    title: "Everyday",
    description: "Simple words used every day.",
  },
  {
    title: "Questions",
    description: "Ask basic questions in Bemba.",
  },
  {
    title: "Places",
    description: "Useful words for places and directions.",
  },
  {
    title: "Polite words",
    description: "Thanking, apologising and asking politely.",
  },
];

const navigationItems: {
  page: Page;
  label: string;
  icon: typeof Home;
}[] = [
  { page: "home", label: "Home", icon: Home },
  { page: "dictionary", label: "Dictionary", icon: BookOpen },
  { page: "learn", label: "Learn", icon: Languages },
  { page: "history", label: "History", icon: History },
  { page: "navigation", label: "Navigate", icon: Navigation },
  { page: "settings", label: "Settings", icon: Settings },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");
  const [copied, setCopied] = useState(false);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [locationStatus, setLocationStatus] = useState("Location not started");

  const filteredDictionary = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return dictionary;
    }

    return dictionary.filter(
      (item) =>
        item.english.toLowerCase().includes(query) ||
        item.bemba.toLowerCase().includes(query),
    );
  }, [search]);

  function translateText(text: string) {
    const clean = text.trim();

    if (!clean) {
      setTranslation("");
      return;
    }

    const exact = dictionary.find(
      (item) => item.english.toLowerCase() === clean.toLowerCase(),
    );

    if (exact) {
      setTranslation(exact.bemba);

      setHistory((current) => [
        {
          english: exact.english,
          bemba: exact.bemba,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...current.filter(
          (item) =>
            item.english.toLowerCase() !== exact.english.toLowerCase(),
        ),
      ].slice(0, 20));

      return;
    }

    setTranslation(
      "Translation not found offline. Try a shorter phrase or search the dictionary.",
    );
  }

  function copyTranslation() {
    if (!translation) {
      return;
    }

    navigator.clipboard
      ?.writeText(translation)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        setCopied(false);
      });
  }

  function toggleFavourite(text: string) {
    setFavourites((current) =>
      current.includes(text)
        ? current.filter((item) => item !== text)
        : [...current, text],
    );
  }

  function usePhrase(english: string, bemba: string) {
    setInput(english);
    setTranslation(bemba);

    setHistory((current) => [
      {
        english,
        bemba,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...current.filter((item) => item.english !== english),
    ].slice(0, 20));

    setPage("home");
  }

  function startLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not available on this device.");
      return;
    }

    setLocationStatus("Finding your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(
          `Location found: ${position.coords.latitude.toFixed(
            5,
          )}, ${position.coords.longitude.toFixed(5)}`,
        );
      },
      () => {
        setLocationStatus(
          "Location permission was not granted or GPS is unavailable.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );
  }

  function renderHeader(title: string, subtitle: string) {
    return (
      <header className="page-header">
        <div>
          <p className="eyebrow">BembaTranslate</p>
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>

        <div className="offline-badge">
          <WifiOff size={15} />
          Offline
        </div>
      </header>
    );
  }

  function renderHome() {
    return (
      <main className="page">
        {renderHeader(
          "English → Bemba",
          "Translate everyday English phrases without internet.",
        )}

        <section className="hero-card">
          <div className="hero-icon">
            <Languages size={24} />
          </div>

          <div>
            <h2>Offline translation</h2>
            <p>
              Your essential English-to-Bemba vocabulary stays available
              without an internet connection.
            </p>
          </div>
        </section>

        <section className="translation-card">
          <div className="section-heading">
            <div>
              <span className="section-label">TRANSLATE</span>
              <h2>English</h2>
            </div>

            <button
              className="icon-button"
              onClick={() => {
                setInput("");
                setTranslation("");
              }}
              aria-label="Clear translation"
            >
              <X size={18} />
            </button>
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type an English word or phrase..."
            rows={4}
          />

          <button
            className="primary-button"
            onClick={() => translateText(input)}
          >
            <Sparkles size={18} />
            Translate
          </button>

          {translation && (
            <div className="result-box">
              <div className="result-top">
                <span>BEMBA</span>

                <div className="result-actions">
                  <button
                    className="small-button"
                    onClick={() => setTranslation("")}
                    aria-label="Close result"
                  >
                    <X size={16} />
                  </button>

                  <button
                    className="small-button"
                    onClick={copyTranslation}
                    aria-label="Copy translation"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>

                  <button
                    className="small-button"
                    onClick={() => toggleFavourite(translation)}
                    aria-label="Favourite translation"
                  >
                    <Heart
                      size={16}
                      fill={
                        favourites.includes(translation)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>
              </div>

              <strong>{translation}</strong>

              <button
                className="audio-button"
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(
                      translation,
                    );
                    utterance.lang = "bem";
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <Volume2 size={17} />
                Listen
              </button>
            </div>
          )}
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">QUICK PHRASES</span>
              <h2>Useful expressions</h2>
            </div>

            <button
              className="text-button"
              onClick={() => setPage("dictionary")}
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="phrase-grid">
            {quickPhrases.map((phrase) => (
              <button
                className="phrase-card"
                key={phrase.english}
                onClick={() => usePhrase(phrase.english, phrase.bemba)}
              >
                <span>{phrase.english}</span>
                <strong>{phrase.bemba}</strong>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  function renderDictionary() {
    return (
      <main className="page">
        {renderHeader(
          "Dictionary",
          "Search your offline English-to-Bemba vocabulary.",
        )}

        <div className="search-box">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search English or Bemba..."
          />

          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="dictionary-count">
          {filteredDictionary.length} entries
        </div>

        <section className="dictionary-list">
          {filteredDictionary.map((entry) => (
            <button
              className="dictionary-row"
              key={`${entry.english}-${entry.bemba}`}
              onClick={() => usePhrase(entry.english, entry.bemba)}
            >
              <div>
                <span>{entry.english}</span>
                <strong>{entry.bemba}</strong>
              </div>

              <ChevronRight size={18} />
            </button>
          ))}

          {filteredDictionary.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No matching word</h3>
              <p>Try another English or Bemba word.</p>
            </div>
          )}
        </section>
      </main>
    );
  }

  function renderLearn() {
    return (
      <main className="page">
        {renderHeader(
          "Learn Bemba",
          "Build your everyday vocabulary step by step.",
        )}

        <section className="learning-intro">
          <div className="learning-icon">
            <BookOpen size={24} />
          </div>

          <div>
            <h2>Small lessons, useful words</h2>
            <p>
              Explore practical vocabulary that you can use in everyday
              conversations.
            </p>
          </div>
        </section>

        <section className="learning-grid">
          {learningCards.map((card, index) => (
            <button className="learning-card" key={card.title}>
              <div className="learning-number">{index + 1}</div>

              <div className="learning-copy">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>

              <ChevronRight size={18} />
            </button>
          ))}
        </section>
      </main>
    );
  }

  function renderHistory() {
    return (
      <main className="page">
        {renderHeader(
          "Translation History",
          "Your recent offline translations.",
        )}

        {history.length === 0 ? (
          <div className="empty-state large">
            <Clock3 size={32} />
            <h3>No history yet</h3>
            <p>Your recent translations will appear here.</p>

            <button
              className="primary-button compact"
              onClick={() => setPage("home")}
            >
              Start translating
            </button>
          </div>
        ) : (
          <section className="history-list">
            {history.map((item, index) => (
              <button
                className="history-row"
                key={`${item.english}-${item.time}-${index}`}
                onClick={() => usePhrase(item.english, item.bemba)}
              >
                <div className="history-icon">
                  <History size={17} />
                </div>

                <div>
                  <strong>{item.english}</strong>
                  <span>{item.bemba}</span>
                  <small>{item.time}</small>
                </div>

                <ChevronRight size={18} />
              </button>
            ))}
          </section>
        )}

        {history.length > 0 && (
          <button
            className="secondary-button"
            onClick={() => setHistory([])}
          >
            <RefreshCw size={17} />
            Clear history
          </button>
        )}
      </main>
    );
  }

  function renderNavigation() {
    return (
      <main className="page navigation-page">
        {renderHeader(
          "Offline
