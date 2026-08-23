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

/* =========================================================
   TYPES
   ========================================================= */

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

/* =========================================================
   DICTIONARY
   ========================================================= */

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

/* =========================================================
   QUICK PHRASES
   ========================================================= */

const quickPhrases = [
  { english: "How are you?", bemba: "Muli shani?" },
  { english: "Good morning", bemba: "Mwashibukeni" },
  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "Where are you?", bemba: "Uli kwisa?" },
  { english: "Thank you", bemba: "Natotela" },
  { english: "I love you", bemba: "Nalikutemwa" },
];

/* =========================================================
   LEARNING CARDS
   ========================================================= */

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

/* =========================================================
   NAVIGATION ITEMS
   ========================================================= */

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
  { page: "settings", label
