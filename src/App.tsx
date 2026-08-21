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

const dictionary: Record<string, string> = {
  hello: "Mwashibukeni",
  "good morning": "Mwashibukeni",
  "good afternoon": "Mwapoleni",
  "good evening": "Mwabilapo",
  goodbye: "Shalenipo",
  yes: "Ee",
  no: "Awe",
  thanks: "Natotela",
  "thank you": "Natotela",
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
  "how are you": "Muli shani?",
  "i am fine": "Ndi bwino.",
  "i understand": "Ndeumfwa.",
  "i don't understand": "Tashingaumfwa.",
};

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [englishText, setEnglishText] = useState("");
  const [bembaText, setBembaText] = useState("");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  function openPage(nextPage: Page) {
    setPage(nextPage);
    setMenuOpen(false);
  }

  async function translate() {
    const text = englishText.trim();

    if (!text || loading) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const key = text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();

    let result = dictionary[key];

    if (!result) {
      const words = key.split(/\s+/);

      result = words
        .map((word) => dictionary[word] || word)
        .join(" ");
    }

    if (!result || result === key) {
      result =
        "This phrase is not yet available in the offline vocabulary.";
    }

    setBembaText(result);
    setHistory((old) => [
      text,
      ...old.filter((item) => item !== text),
    ]);
    setLoading(false);
  }

  function speak() {
    if (!bembaText || speaking) return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(bembaText);

    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="icon-button"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <button
          className="brand"
          onClick={() => openPage("home")}
        >
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
          className="drawer-backdrop"
          on
