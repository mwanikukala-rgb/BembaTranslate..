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
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  const translate = async () => {
    const text = englishText.trim();

    if (!text || isTranslating) return;

    setIsTranslating(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const dictionary: Record<string, string> = {
      hello: "Mwashibukeni",
      "good morning": "Mwashibukeni",
      "good afternoon": "Mwapoleni",
      "good evening": "Mwabilapo",
      goodbye: "Shalenipo",
      yes: "Ee",
      no: "Awe",
      thank: "Natotela",
      thanks: "Natotela",
      "thank you": "Natotela",
      please: "Nomba",
      welcome: "Mwaiseni",
      "how are you": "Muli shani?",
      "i am fine": "Ndi bwino.",
      "what is your name": "Ishina lyenu ni nani?",
      "my name is": "Ishina lyandi ni",
      water: "Amenshi",
      food: "Ifyakulya",
      house: "Ingo",
      child: "Umwana",
      children: "Abana",
      mother: "Bama",
      father: "Tata",
      friend: "Munandi",
      love: "Kutemwa",
      God: "Lesa",
      church: "Cikuta",
      "come here": "Iseni kuno.",
      "go home": "Yani ku ng'anda.",
      "i understand": "Ndeumfwa.",
      "i don't understand": "Tashingaumfwa.",
    };

    const normalized = text.toLowerCase().replace(/[.!?,]/g, "").trim();

    let result = dictionary[normalized];

    if (!result) {
      const words = normalized.split(/\s+/);

      const translatedWords = words.map((word) => {
        return dictionary[word] || word;
      });

      result = translatedWords.join(" ");
    }

    if (!result || result === normalized) {
      result =
        "This phrase is not yet in the offline vocabulary. More Bemba language data will be added to the local translation engine.";
    }

    setBembaText(result);
    setHistory((current) => [text, ...current.filter((item) => item !== text)].slice(0, 20));
    setIsTranslating(false);
  };

  const speak = () => {
    if (!bembaText || isSpeaking) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const voice = new SpeechSynthesisUtterance(bembaText);
      voice.rate = 0.82;
      voice.pitch = 1;

      voice.onstart = () => setIsSpeaking(true);
      voice.onend = () => setIsSpeaking(false);
      voice.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(voice);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1000);
    }
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
          className="drawer-backdrop"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="brand-mark">
                <Languages size={21} />
              </div>

              <div>
                <strong>BembaTranslate
