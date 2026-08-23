import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
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
  { title: "Greetings", description: "Learn common Bemba greetings." },
  { title: "People", description: "Useful words for talking about people." },
  { title: "Everyday", description: "Simple words used every day." },
  { title: "Questions", description: "Ask basic questions in Bemba." },
  { title: "Places", description: "Useful words for places and directions." },
  { title: "Polite words", description: "Thanking, apologising and asking politely." },
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

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [favourite, setFavourite] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const [gpsError, setGpsError] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);

  const filteredDictionary = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return dictionary;

    return dictionary.filter(
      (item) =>
        item.english.toLowerCase().includes(term) ||
        item.bemba.toLowerCase().includes(term),
    );
  }, [search]);

  function translate() {
    const text = input.trim();

    if (!text) {
      setResult("");
      return;
    }

    const exact = dictionary.find(
      (item) => item.english.toLowerCase() === text.toLowerCase(),
    );

    const partial = dictionary.find(
      (item) =>
        text.toLowerCase().includes(item.english.toLowerCase()) ||
        item.english.toLowerCase().includes(text.toLowerCase()),
    );

    const translation =
      exact?.bemba ??
      partial?.bemba ??
      "Translation not found in the offline dictionary.";

    setResult(translation);

    if (exact || partial) {
      setHistory((old) => [
        {
          english: text,
          bemba: translation,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...old,
      ]);
    }
  }

  function usePhrase(english: string) {
    setInput(english);
    const found = dictionary.find(
      (item) => item.english.toLowerCase() === english.toLowerCase(),
    );

    if (found) {
      setResult(found.bemba);
    }

    setPage("home");
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard?.writeText(result);
  }

  function speakResult() {
    if (!result || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(result);
    speech.lang = "bem";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
  }

  function getLocation() {
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
          setGpsError("Your location could not be determined.");
        } else {
          setGpsError("GPS request timed out. Try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }

  function renderHome() {
    return (
      <div className="page">
        <section className="welcome-card">
          <span className="eyebrow">BEMBATRANSLATE</span>
          <h1>Speak Bemba
