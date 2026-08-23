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

import "./index.css";

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

const campusPlaces = [
  {
    name: "Main Entrance",
    type: "Entrance",
    description: "Main campus entrance",
  },
  {
    name: "Administration Block",
    type: "Building",
    description: "Administration and offices",
  },
  {
    name: "Library",
    type: "Study",
    description: "Campus library",
  },
  {
    name: "Student Centre",
    type: "Student Services",
    description: "Student services and facilities",
  },
  {
    name: "Lecture Theatres",
    type: "Academic",
    description: "Main teaching area",
  },
  {
    name: "Hostels",
    type: "Accommodation",
    description: "Student accommodation",
  },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [favourite, setFavourite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);

  const filteredDictionary = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return dictionary;

    return dictionary.filter(
      (entry) =>
        entry.english.toLowerCase().includes(term) ||
        entry.bemba.toLowerCase().includes(term),
    );
  }, [search]);

  const translate = (text: string) => {
    const clean = text.trim();

    if (!clean) {
      setResult("");
      return;
    }

    const exact = dictionary.find(
      (entry) => entry.english.toLowerCase() === clean.toLowerCase(),
    );

    const partial = dictionary.find(
      (entry) =>
        clean.toLowerCase().includes(entry.english.toLowerCase()) ||
        entry.english.toLowerCase().includes(clean.toLowerCase()),
    );

    const translation = exact?.bemba || partial?.bemba;

    if (translation) {
      setResult(translation);

      setHistory((previous) => [
        {
          english: clean,
          bemba: translation,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...previous,
      ].slice(0, 30));
    } else {
      setResult("Translation not found offline.");
    }
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const getLocation = () => {
    setGpsError("");

    if (!navigator.geolocation) {
      setGpsError("GPS is not available on this device.");
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });

        setGpsLoading(false);
      },
      (error) => {
        setGpsLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setGpsError("Location permission was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGpsError("Your location is currently unavailable.");
        } else {
          setGpsError("Unable to get your current location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const renderHeader = () => (
    <header className="app-header">
      <div className="header-title">
        <div className="header-icon">
          <Languages size={18} />
        </div>

        <div>
          <strong>BembaTranslate</strong>
          <span>Offline English → Bemba</span>
        </div>
      </div>

      <div className="offline-badge">
        <span />
        Offline
      </div>
    </header>
  );

  const renderHome = () => (
    <main className="page">
      <section className="welcome-card">
        <span className="eyebrow">BEMBATRANSLATE</span>

        <h1>Speak Bemba<br />with confidence.</h1>

        <p>
          Translate everyday English into Bemba without needing an
          internet connection.
        </p>
      </section>

      <div className="section-title">
        <div>
          <h2>Translate</h2>
          <p>English to Bemba</p>
        </div>

        <span className="local-pill">
          <WifiOff size={11} />
          Offline
        </span>
      </div>

      <section className="translation-card">
        <div className="language-strip">
          <div>
            <small>FROM</small>
            <strong>English</strong>
          </div>

          <div className="language-arrow">
            <ChevronRight size={18} />
          </div>

          <div>
            <small>TO</small>
            <strong>Bemba</strong>
          </div>
        </div>

        <div className="input-label-row">
          <span>Enter English</span>
          {input && (
            <button onClick={() => setInput("")}>
              <X size={13} />
            </button>
          )}
        </div>

        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type an English word or phrase..."
        />

        <button
          className="translate-button"
          onClick={() => translate(input)}
          disabled={!input.trim()}
        >
          <Sparkles size={15} />
          Translate
        </button>

        <div className="result-box">
          {result ? (
            <>
              <div className="result-heading">
                <span>
                  <span className="bemba-dot" />
                  Bemba translation
                </span>

                <span className="ready-label">
                  <Check size={11} />
                  Ready
                </span>
              </div>

              <div className="translation-result">
                <strong>{result}</strong>

                <div className="result-actions">
                  <button onClick={copyResult}>
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy"}
                  </button>

                  <button
                    className={favourite ? "selected" : ""}
                    onClick={() => setFavourite(!favourite)}
                  >
                    <Heart size={13} fill={favourite ? "currentColor" : "none"} />
                    Favourite
                  </button>

                  <button>
                    <Volume2 size={13} />
                    Listen
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-result">
              <Languages size={24} />

              <strong>Your translation will appear here</strong>

              <span>Enter English above to begin.</span>
            </div>
          )}
        </div>
      </section>

      <div className="section-title">
        <div>
          <h2>Quick phrases</h2>
          <p>Tap a phrase to translate it</p>
        </div>
      </div>

      <div className="phrase-grid">
        {quickPhrases.map((phrase) => (
          <button
            className="phrase-card"
            key={phrase.english}
            onClick={() => {
              setInput(phrase.english);
              translate(phrase.english);
            }}
          >
            <span>{phrase.english}</span>
            <strong>{phrase.bemba}</strong>
          </button>
        ))}
      </div>

      <div className="offline-info">
        <div className="info-icon">
          <WifiOff size={15} />
        </div>

        <div>
          <strong>Works completely offline</strong>
          <span>
            Your translations are stored on this device. No internet
            connection
