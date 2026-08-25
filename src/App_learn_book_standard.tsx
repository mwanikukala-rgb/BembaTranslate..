import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookMarked,
  Check,
  CheckCircle2,
  Copy,
  Flame,
  Heart,
  History as HistoryIcon,
  Languages,
  MapPin,
  MessageCircle,
  Mic,
  Navigation as NavigationIcon,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Volume2,
} from "lucide-react";

import { bembaDictionary } from "./data/bembaDictionary";
import { translateWithFallback } from "./engine/bembaTranslator";
import Navigation from "./navigation/Navigation";

import "./styles/global.css";

type Page =
  | "home"
  | "translate"
  | "speak"
  | "dictionary"
  | "learn"
  | "phrasebook"
  | "navigation"
  | "history"
  | "settings";

type HistoryItem = {
  id: number;
  english: string;
  bemba: string;
  time: string;
};

type LearnMode = "lesson" | "quiz" | "typing";
type QuizFeedback = "correct" | "wrong" | null;
type TranslationDirection = "en-bem" | "bem-en";

const learnKey = (english: string, bemba: string) => `${english}::${bemba}`;
const normalizeAnswer = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

const quickPhrases = [
  ["How are you?", "Mulishani"],
  ["Good morning", "Mwashibukeni"],
  ["I want money", "Ndefwaya indalama"],
  ["Where are you?", "Ulikwisa"],
  ["Where are they?", "Balikwisa"],
  ["I'm angry", "Nimfulwa"],
] as const;

function App() {
  const [launching, setLaunching] = useState(true);
  const [progress, setProgress] = useState(0);

  const [page, setPage] =
    useState<Page>("home");
  const [pageHistory, setPageHistory] = useState<Page[]>([]);

  const goTo = (next: Page) => {
    if (next === page) return;
    setPageHistory((items) => [...items, page]);
    setPage(next);
  };

  const goBack = () => {
    setPageHistory((items) => {
      if (items.length === 0) {
        setPage("home");
        return items;
      }
      const previous = items[items.length - 1];
      setPage(previous);
      return items.slice(0, -1);
    });
  };

  const canGoBack = page !== "home" || pageHistory.length > 0;

  const [english, setEnglish] = useState("");
  const [bemba, setBemba] = useState("");
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection>("en-bem");

  const [translating, setTranslating] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [favourite, setFavourite] =
    useState(false);

  const [speaking, setSpeaking] =
    useState(false);
  const [speakText, setSpeakText] = useState("");

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [searchText, setSearchText] =
    useState("");

  /* --------------------------------------------------
     Interactive learning state
  -------------------------------------------------- */
  // Learning and quiz content comes exclusively from src/data/bembaDictionary.
  // No lesson/quiz vocabulary is duplicated here in the UI code.
  const learningPool = useMemo(() => {
    const seen = new Set<string>();

    return bembaDictionary.filter((item) => {
      const english = item.english.trim();
      const bemba = item.bemba.trim();
      if (!english || !bemba) return false;

      const key = `${english.toLowerCase()}::${bemba.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);
  const [learnMode, setLearnMode] = useState<LearnMode>("lesson");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [showLessonAnswer, setShowLessonAnswer] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [quizEntry, setQuizEntry] = useState<typeof bembaDictionary[number] | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<QuizFeedback>(null);
  const [quizSelected, setQuizSelected] = useState("");
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [typingAnswer, setTypingAnswer] = useState("");
  const [typingFeedback, setTypingFeedback] = useState<QuizFeedback>(null);

  const lessonEntry = learningPool.length > 0
    ? learningPool[lessonIndex % learningPool.length]
    : null;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("bemba-learned-words");
      if (saved) setLearnedWords(JSON.parse(saved));
    } catch { /* local progress is optional */ }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("bemba-learned-words", JSON.stringify(learnedWords));
    } catch { /* local progress is optional */ }
  }, [learnedWords]);

  const markLearned = (entry: { english: string; bemba: string }) => {
    const key = learnKey(entry.english, entry.bemba);
    setLearnedWords((items) => items.includes(key) ? items : [...items, key]);
  };

  const bembaAnswers = (value: string) =>
    value
      .split(/\s*\/\s*/)
      .map((part) => part.trim())
      .filter(Boolean);

  const isBembaAnswerCorrect = (answer: string, expected: string) =>
    bembaAnswers(expected).some((candidate) => normalizeAnswer(candidate) === normalizeAnswer(answer));

  const nextLessonCard = (shouldMark = showLessonAnswer) => {
    if (!lessonEntry) return;
    if (!shouldMark) return;
    markLearned(lessonEntry);
    setLessonIndex((index) => index + 1);
    setShowLessonAnswer(false);
  };

  const makeQuizQuestion = () => {
    if (learningPool.length === 0) return;

    const entry = learningPool[Math.floor(Math.random() * learningPool.length)];
    const correct = bembaAnswers(entry.bemba)[0] || entry.bemba;
    const seen = new Set<string>([normalizeAnswer(correct)]);
    const distractors: string[] = [];

    for (const item of [...learningPool].sort(() => Math.random() - 0.5)) {
      const candidate = bembaAnswers(item.bemba)[0] || item.bemba;
      const normalized = normalizeAnswer(candidate);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      distractors.push(candidate);
      if (distractors.length === 3) break;
    }

    setQuizEntry(entry);
    setQuizOptions([correct, ...distractors].sort(() => Math.random() - 0.5));
    setQuizFeedback(null);
    setQuizSelected("");
  };

  const startQuiz = () => {
    setLearnMode("quiz");
    setQuizScore(0);
    setQuizAnswered(0);
    setQuizStreak(0);
    makeQuizQuestion();
  };

  const answerQuiz = (answer: string) => {
    if (!quizEntry || quizFeedback) return;
    const correct = isBembaAnswerCorrect(answer, quizEntry.bemba);
    setQuizSelected(answer);
    setQuizFeedback(correct ? "correct" : "wrong");
    setQuizAnswered((value) => value + 1);
    setQuizScore((value) => value + (correct ? 1 : 0));
    setQuizStreak((value) => correct ? value + 1 : 0);
    if (correct) markLearned(quizEntry);
  };

  const submitTyping = () => {
    if (!lessonEntry || typingFeedback) return;
    const correct = isBembaAnswerCorrect(typingAnswer, lessonEntry.bemba);
    setTypingFeedback(correct ? "correct" : "wrong");
    if (correct) markLearned(lessonEntry);
  };

  const resetTyping = () => {
    setTypingAnswer("");
    setTypingFeedback(null);
  };

  /* --------------------------------------------------
     Launch screen
  -------------------------------------------------- */

  useEffect(() => {
    let current = 0;

    const timer = window.setInterval(() => {
      current += 5;

      if (current >= 100) {
        current = 100;

        setProgress(100);

        window.clearInterval(timer);

        window.setTimeout(() => {
          setLaunching(false);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 55);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* --------------------------------------------------
     Dictionary
  -------------------------------------------------- */

  const normalizeLookup = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:()\[\]{}]/g, "")
      .replace(/\s+/g, " ");

  const dictionaryResults = useMemo(() => {
    const query = normalizeLookup(searchText);

    const results = !query
      ? [...bembaDictionary]
      : bembaDictionary.filter((item) => {
          return (
            normalizeLookup(item.english).includes(query) ||
            normalizeLookup(item.bemba).includes(query)
          );
        });

    return results.sort((a, b) =>
      a.bemba.localeCompare(b.bemba, undefined, { sensitivity: "base" }),
    );
  }, [searchText]);

  const reverseDictionaryLookup = (input: string) => {
    const normalized = normalizeLookup(input);
    if (!normalized) return "";

    const exact = bembaDictionary.find(
      (item) => normalizeLookup(item.bemba) === normalized,
    );
    if (exact) return exact.english;

    // Some dictionary records contain alternative Bemba forms separated by "/".
    const alternative = bembaDictionary.find((item) =>
      item.bemba
        .split("/")
        .some((form) => normalizeLookup(form) === normalized),
    );
    if (alternative) return alternative.english;

    // For a short phrase, translate only words that have a direct dictionary
    // entry. This deliberately does not invent grammar or unseen vocabulary.
    const words = normalized.split(" ");
    const translatedWords = words.map((word) => {
      const match = bembaDictionary.find(
        (item) => normalizeLookup(item.bemba) === word,
      );
      return match?.english ?? "";
    });

    return translatedWords.every(Boolean) ? translatedWords.join(" ") : "";
  };

  const dictionarySections = useMemo(() => {
    const sections = new Map<string, typeof dictionaryResults>();
    dictionaryResults.forEach((item) => {
      const letter = item.bemba.trim().charAt(0).toUpperCase() || "#";
      const current = sections.get(letter) ?? [];
      current.push(item);
      sections.set(letter, current);
    });
    return Array.from(sections.entries());
  }, [dictionaryResults]);

  /* --------------------------------------------------
     Translation
  -------------------------------------------------- */

  const translate = () => {
    const input = translationDirection === "en-bem" ? english.trim() : bemba.trim();

    if (!input || translating) {
      return;
    }

    setTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      let result = "";

      if (translationDirection === "en-bem") {
        const match = quickPhrases.find(
          ([source]) => source.toLowerCase() === input.toLowerCase(),
        );
        result = match?.[1] || translateWithFallback(input) || "";
        setEnglish(input);
        setBemba(result);
      } else {
        result = reverseDictionaryLookup(input);
        setBemba(input);
        setEnglish(result);
      }

      if (result) {
        setHistory((items) => [
          {
            id: Date.now(),
            english: translationDirection === "en-bem" ? input : result,
            bemba: translationDirection === "en-bem" ? result : input,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          ...items,
        ]);
      }

      setTranslating(false);
    }, 160);
  };

  const swapTranslationDirection = () => {
    setTranslationDirection((current) =>
      current === "en-bem" ? "bem-en" : "en-bem",
    );
    setEnglish(bemba);
    setBemba(english);
    setCopied(false);
    setFavourite(false);
  };

  /* --------------------------------------------------
     Select phrase
  -------------------------------------------------- */

  const selectPhrase = (
    source: string,
    translation: string,
  ) => {
    setTranslationDirection("en-bem");
    setEnglish(source);
    setBemba(translation);
    setFavourite(false);
    setCopied(false);
    goTo("translate");
  };

  /* --------------------------------------------------
     Copy
  -------------------------------------------------- */

  const copy = async () => {
    const output = translationDirection === "en-bem" ? bemba : english;
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      setCopied(false);
    }
  };

  /* --------------------------------------------------
     Audio
  -------------------------------------------------- */

  const listen = () => {
    const phrase = translationDirection === "en-bem" ? bemba : bemba;
    if (!phrase || speaking) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "bem-ZM";
    utterance.rate = 0.82;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const speakPhrase = (phrase: string) => {
    setSpeakText(phrase);
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "bem-ZM";
    utterance.rate = 0.82;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  /* --------------------------------------------------
     Launch screen
  -------------------------------------------------- */

  if (launching) {
    return (
      <div className="launch-screen">
        <div className="launch-hero" aria-hidden="true">
          <div className="launch-hero-glow" />
          <div className="launch-people">
            <div className="launch-person launch-person-one">
              <span />
            </div>
            <div className="launch-person launch-person-two">
              <span />
            </div>
            <div className="launch-phone">
              <Languages size={24} />
            </div>
          </div>
        </div>

        <div className="launch-content">
          <div className="launch-logo">
            <Languages size={30} strokeWidth={1.7} />
          </div>

          <div className="launch-kicker">AFRICAN LANGUAGES</div>

          <h1>Languages. Made Simple.</h1>

          <p>
            Translate, learn, speak and explore languages
            across Africa.
          </p>

          <div className="launch-feature-strip" aria-label="App features">
            <span><Languages size={13} /> Translate</span>
            <span><BookOpen size={13} /> Dictionary</span>
            <span><Sparkles size={13} /> Learn</span>
          </div>

          <div className="launch-status">
            <div className="launch-status-row">
              <span>Preparing your experience</span>
              <strong>{progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="launch-message">
            <span className="status-check">
              <Check size={12} />
            </span>
            <span>Private, fast and ready for everyday language use.</span>
          </div>
        </div>

        <div className="launch-footer">
          <span className="launch-footer-mark" />
          <span>Built for Africa. Ready for more languages.</span>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
     Main application
  -------------------------------------------------- */

  return (
    <div className="app">

      <div className="wallpaper" />

      <main className="app-content">

        {/* HEADER */}
        <header className="app-header">
          <div className="header-leading">
            <div className="header-title">
            <span className="header-icon">
              {page === "navigation" ? (
                <NavigationIcon size={17} />
              ) : page === "dictionary" ? (
                <BookOpen size={17} />
              ) : page === "learn" ? (
                <Sparkles size={17} />
              ) : page === "speak" ? (
                <Volume2 size={17} />
              ) : page === "home" ? (
                <Languages size={17} />
              ) : (
                <Languages size={17} />
              )}
            </span>

            <div>
              <strong>
                {page === "home"
                  ? "Languages"
                  : page === "translate"
                    ? "Translate"
                    : page === "dictionary"
                      ? "Dictionary"
                      : page === "learn"
                        ? "Learn"
                        : page === "phrasebook"
                          ? "Phrasebook"
                          : page === "navigation"
                          ? "Navigate"
                          : page === "history"
                            ? "History"
                            : "Settings"}
              </strong>

              <span>
                {page === "home"
                  ? "African languages in one place"
                  : page === "navigation"
                    ? "Search places and build routes"
                    : page === "dictionary"
                      ? "Words, meanings and phrases"
                      : page === "learn"
                        ? "Vocabulary, lessons and practice"
                        : page === "phrasebook"
                          ? "Useful Bemba expressions"
                          : page === "translate"
                            ? (translationDirection === "en-bem" ? "English → Bemba" : "Bemba → English")
                            : "Bemba language tools"}
              </span>
            </div>
            </div>
          </div>

          <div className="language-badge">
            <span />
            EN · BEM
          </div>
        </header>

        {/* ==================================================
            HOME / FEATURE DASHBOARD
        ================================================== */}

        {page === "home" && (
          <section className="page home-page">
            <div className="home-hero-card">
              <div className="home-hero-copy">
                <span className="eyebrow">AFRICAN LANGUAGE PLATFORM</span>
                <h1>Connect through language.</h1>
                <p>
                  Translate, discover words, learn naturally and
                  explore what we can build next.
                </p>
              </div>
              <div className="home-hero-visual" aria-hidden="true">
                <div className="home-person home-person-one" />
                <div className="home-person home-person-two" />
                <div className="home-device">
                  <Languages size={22} />
                </div>
              </div>
            </div>

            <div className="home-language-row">
              <div>
                <span>ACTIVE LANGUAGE</span>
                <strong>English ↔ Bemba</strong>
              </div>
              <button type="button" onClick={() => goTo("dictionary")}>
                <Search size={15} />
                Open dictionary
              </button>
            </div>

            <div className="section-title home-section-title">
              <div>
                <h2>Explore features</h2>
                <p>Everything important, kept close and compact.</p>
              </div>
            </div>

            <div className="feature-grid">
              <button
                className="feature-card feature-card-primary"
                onClick={() => goTo("translate")}
              >
                <span className="feature-image feature-image-translate">
                  <Languages size={23} />
                </span>
                <span className="feature-card-copy">
                  <strong>Translate</strong>
                  <small>English ↔ Bemba</small>
                </span>
                <ArrowRight size={16} />
              </button>

              <button
                className="feature-card"
                onClick={() => goTo("dictionary")}
              >
                <span className="feature-image feature-image-book">
                  <BookMarked size={22} />
                </span>
                <span className="feature-card-copy">
                  <strong>Dictionary</strong>
                  <small>Words &amp; meanings</small>
                </span>
                <ArrowRight size={16} />
              </button>

              <button
                className="feature-card"
                onClick={() => goTo("learn")}
              >
                <span className="feature-image feature-image-learn">
                  <Sparkles size={22} />
                </span>
                <span className="feature-card-copy">
                  <strong>Learn</strong>
                  <small>Vocabulary &amp; lessons</small>
                </span>
                <ArrowRight size={16} />
              </button>

              <button
                className="feature-card"
                onClick={() => goTo("speak")}
              >
                <span className="feature-image feature-image-speak">
                  <Mic size={22} />
                </span>
                <span className="feature-card-copy">
                  <strong>Speak</strong>
                  <small>Voice &amp; pronunciation</small>
                </span>
                <ArrowRight size={16} />
              </button>

              <button
                className="feature-card"
                onClick={() => goTo("navigation")}
              >
                <span className="feature-image feature-image-navigate">
                  <MapPin size={22} />
                </span>
                <span className="feature-card-copy">
                  <strong>Navigate</strong>
                  <small>Places &amp; routes</small>
                </span>
                <ArrowRight size={16} />
              </button>

              <button
                className="feature-card"
                onClick={() => goTo("phrasebook")}
              >
                <span className="feature-image feature-image-phrase">
                  <MessageCircle size={22} />
                </span>
                <span className="feature-card-copy">
                  <strong>Phrasebook</strong>
                  <small>Everyday expressions</small>
                </span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="home-coming-card">
              <div className="home-coming-icon">
                <Languages size={17} />
              </div>
              <div>
                <strong>Built to grow across Africa</strong>
                <span>
                  Swahili ↔ English is planned alongside more
                  languages and learning features.
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            TRANSLATE
        ================================================== */}

        {page === "translate" && (
          <section className="page translate-page">
            <div className="welcome-card">
              <span className="eyebrow">BEMBA TRANSLATION</span>
              <h1>English ↔ Bemba</h1>
              <p>Translate in either direction using the local Bemba language data already in your app.</p>
            </div>

            <div className="section-title">
              <div>
                <h2>Translate</h2>
                <p>{translationDirection === "en-bem" ? "English → Bemba" : "Bemba → English"}</p>
              </div>
              <span className="local-pill"><Check size={12} /> Local</span>
            </div>

            <div className="translation-card bidirectional-translation-card">
              <div className="language-strip">
                <div>
                  <small>FROM</small>
                  <strong>{translationDirection === "en-bem" ? "English" : "Bemba"}</strong>
                </div>

                <button
                  type="button"
                  className="language-swap-button"
                  onClick={swapTranslationDirection}
                  aria-label="Swap translation direction"
                  title="Swap languages"
                >
                  ⇄
                </button>

                <div>
                  <small>TO</small>
                  <strong>{translationDirection === "en-bem" ? "Bemba" : "English"}</strong>
                </div>
              </div>

              <div className="direction-tabs" role="tablist" aria-label="Translation direction">
                <button type="button" className={translationDirection === "en-bem" ? "active" : ""} onClick={() => setTranslationDirection("en-bem")}>English → Bemba</button>
                <button type="button" className={translationDirection === "bem-en" ? "active" : ""} onClick={() => setTranslationDirection("bem-en")}>Bemba → English</button>
              </div>

              <div className="input-label-row">
                <span>{translationDirection === "en-bem" ? "English text" : "Bemba text"}</span>
                <div className="input-meta-actions">
                  <span>{(translationDirection === "en-bem" ? english : bemba).length}/5000</span>
                  {(translationDirection === "en-bem" ? english : bemba) && (
                    <button type="button" className="input-clear-button" onClick={() => { setEnglish(""); setBemba(""); setCopied(false); setFavourite(false); }}>Clear</button>
                  )}
                </div>
              </div>

              <textarea
                value={translationDirection === "en-bem" ? english : bemba}
                maxLength={5000}
                onChange={(event) => {
                  if (translationDirection === "en-bem") {
                    setEnglish(event.target.value);
                  } else {
                    setBemba(event.target.value);
                  }
                  setCopied(false);
                }}
                placeholder={translationDirection === "en-bem" ? "Type something in English..." : "Type a Bemba word or phrase..."}
              />

              <button className="translate-button" onClick={translate} disabled={!(translationDirection === "en-bem" ? english.trim() : bemba.trim()) || translating}>
                <Languages size={17} />
                {translating ? "Translating..." : translationDirection === "en-bem" ? "Translate to Bemba" : "Translate to English"}
              </button>

              <div className="result-box">
                <div className="result-heading">
                  <span><span className="bemba-dot" />{translationDirection === "en-bem" ? "Bemba translation" : "English translation"}</span>
                  {(translationDirection === "en-bem" ? bemba : english) && <span className="ready-label"><Check size={11} /> Ready</span>}
                </div>

                {(translationDirection === "en-bem" ? bemba : english) ? (
                  <div className="translation-result">
                    <strong>{translationDirection === "en-bem" ? bemba : english}</strong>
                    <div className="result-actions">
                      <button className={favourite ? "selected" : ""} onClick={() => setFavourite((value) => !value)} aria-label="Favourite">
                        <Heart size={16} fill={favourite ? "currentColor" : "none"} />
                      </button>
                      <button onClick={copy} aria-label="Copy">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
                      {translationDirection === "en-bem" && (
                        <button onClick={listen} aria-label="Listen"><Volume2 size={16} /> {speaking ? "Playing" : "Listen"}</button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="empty-result">
                    <BookOpen size={21} />
                    <strong>Your translation will appear here</strong>
                    <span>{translationDirection === "en-bem" ? "Enter an English word or phrase above." : "Enter a Bemba word or phrase from the dictionary above."}</span>
                  </div>
                )}
              </div>

              {translationDirection === "bem-en" && (
                <div className="dictionary-translation-note">
                  <BookOpen size={16} />
                  <span>Bemba → English uses the Bemba dictionary directly, including exact words, phrases and alternative forms contained in the dictionary.</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==================================================
            SPEAK
        ================================================== */}
        {page === "speak" && (
          <section className="page speak-page">
            <div className="page-intro speak-hero-intro">
              <span className="eyebrow">BEMBA PRONUNCIATION</span>
              <h1>Listen. Repeat. Speak.</h1>
              <p>Hear Bemba phrases using your device's speech engine, then repeat them aloud and build confidence.</p>
            </div>
            <div className="speak-card">
              <div className="speak-card-top"><span className="speak-status-dot" /><span>{speaking ? "Speaking now..." : "Ready to practise"}</span></div>
              <textarea value={speakText} onChange={(event) => setSpeakText(event.target.value)} placeholder="Type a Bemba word or phrase..." aria-label="Bemba pronunciation text" />
              <div className="speak-actions">
                <button type="button" className="lesson-primary" onClick={() => speakPhrase(speakText)} disabled={!speakText.trim() || speaking}><Volume2 size={18} /> {speaking ? "Speaking..." : "Listen"}</button>
                <button type="button" className="lesson-secondary" onClick={() => { window.speechSynthesis?.cancel(); setSpeaking(false); }} disabled={!speaking}>Stop</button>
              </div>
              <div className="speak-note"><Volume2 size={16} /><span>Voice availability and pronunciation quality depend on the voices installed on your device. The app requests Bemba (bem-ZM) when supported.</span></div>
            </div>
            <div className="section-title"><div><h2>Practise these phrases</h2><p>Tap a phrase to hear it.</p></div></div>
            <div className="speak-phrase-grid">
              {quickPhrases.map(([english, bemba]) => (
                <button type="button" key={english} className="speak-phrase-card" onClick={() => speakPhrase(bemba)}>
                  <span>{english}</span><strong>{bemba}</strong><Volume2 size={16} />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            DICTIONARY
        ================================================== */}

        {page === "dictionary" && (
          <section className="page dictionary-page">
            <div className="dictionary-book-intro">
              <span className="eyebrow">BEMBA LANGUAGE</span>
              <h1>Bemba Dictionary</h1>
              <p>A book-style reference arranged alphabetically by Bemba headword, with the English meaning beside each entry.</p>
            </div>

            <div className="dictionary-book-toolbar">
              <div className="search-field dictionary-book-search">
                <Search size={17} />
                <input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search Bemba or English..." aria-label="Search Bemba dictionary" />
              </div>
              <div className="dictionary-book-meta">
                <span>{dictionaryResults.length.toLocaleString()} entries</span>
                <span>English ↔ Bemba</span>
              </div>
            </div>

            <div className="dictionary-letter-nav" aria-label="Dictionary letters">
              {dictionarySections.map(([letter]) => (
                <a key={letter} href={`#dictionary-letter-${letter}`} aria-label={`Jump to ${letter}`}>{letter}</a>
              ))}
            </div>

            <div className="dictionary-book">
              <div className="dictionary-book-running-head">
                <span>BEMBA DICTIONARY</span>
                <span>{searchText.trim() ? "SEARCH RESULTS" : "A–Z REFERENCE"}</span>
              </div>

              {dictionarySections.length > 0 ? dictionarySections.map(([letter, entries]) => (
                <section className="dictionary-letter-section" id={`dictionary-letter-${letter}`} key={letter}>
                  <div className="dictionary-letter-heading"><span>{letter}</span></div>
                  <div className="dictionary-entry-list">
                    {entries.map((item, index) => (
                      <button
                        type="button"
                        className="dictionary-book-entry"
                        key={`${item.bemba}-${item.english}-${index}`}
                        onClick={() => {
                          setTranslationDirection("bem-en");
                          setBemba(item.bemba);
                          setEnglish(item.english);
                          setFavourite(false);
                          setCopied(false);
                          goTo("translate");
                        }}
                      >
                        <span className="dictionary-headword">{item.bemba}</span>
                        <span className="dictionary-definition">{item.english}</span>
                        <span className="dictionary-entry-arrow">→</span>
                      </button>
                    ))}
                  </div>
                </section>
              )) : (
                <div className="large-empty dictionary-book-empty">
                  <Search size={30} />
                  <strong>No dictionary entry found</strong>
                  <span>Try another Bemba or English word.</span>
                </div>
              )}

              <div className="dictionary-book-footer">
                <span>English ↔ Bemba</span>
                <span>{dictionaryResults.length.toLocaleString()}</span>
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            LEARN
        ================================================== */}

        {page === "learn" && (
          <section className="page learn-page">
            <div className="page-intro learn-hero-intro">
              <span className="eyebrow">BEMBA LEARNING LAB</span>
              <h1>Learn by doing.</h1>
              <p>Study a word, test your memory, then type it yourself. Your learned words are saved on this device.</p>
              <div className="learn-progress-row">
                <div><strong>{learnedWords.length}</strong><span>words learned</span></div>
                <div><strong>{learningPool.length}</strong><span>words available</span></div>
                <div><strong>{quizScore}</strong><span>quiz points</span></div>
              </div>
            </div>

            <div className="learn-mode-tabs" role="tablist" aria-label="Learning modes">
              <button type="button" className={learnMode === "lesson" ? "active" : ""} onClick={() => { setLearnMode("lesson"); setShowLessonAnswer(false); }}>
                <BookOpen size={17} /> Lesson
              </button>
              <button type="button" className={learnMode === "quiz" ? "active" : ""} onClick={startQuiz}>
                <Target size={17} /> Quiz
              </button>
              <button type="button" className={learnMode === "typing" ? "active" : ""} onClick={() => { setLearnMode("typing"); resetTyping(); }}>
                <Sparkles size={17} /> Type it
              </button>
            </div>

            {learnMode === "lesson" && lessonEntry && (
              <div className="lesson-panel">
                <div className="lesson-panel-top">
                  <span className="lesson-step">WORD {String((lessonIndex % Math.max(learningPool.length, 1)) + 1).padStart(2, "0")}</span>
                  <span className="lesson-count">{learnedWords.length} learned</span>
                </div>
                <div className="flashcard" role="button" tabIndex={0} onClick={() => setShowLessonAnswer((value) => !value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setShowLessonAnswer((value) => !value); }}>
                  <span className="flashcard-label">ENGLISH</span>
                  <strong>{lessonEntry.english}</strong>
                  {showLessonAnswer ? (
                    <>
                      <div className="flashcard-divider" />
                      <span className="flashcard-label">BEMBA</span>
                      <b>{lessonEntry.bemba}</b>
                    </>
                  ) : (
                    <span className="flashcard-hint">Tap to reveal the Bemba answer</span>
                  )}
                </div>
                <div className="lesson-actions">
                  <button type="button" className="lesson-secondary" onClick={() => setShowLessonAnswer((value) => !value)}>
                    {showLessonAnswer ? "Hide answer" : "Reveal answer"}
                  </button>
                  <button
                    type="button"
                    className="lesson-primary"
                    onClick={() => nextLessonCard()}
                    disabled={!showLessonAnswer}
                    title={!showLessonAnswer ? "Reveal the answer before continuing" : "Mark this word learned and continue"}
                  >
                    I know it <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {learnMode === "quiz" && (
              <div className="quiz-panel">
                <div className="quiz-header">
                  <div><span className="eyebrow">MULTIPLE CHOICE</span><h2>What is the Bemba word?</h2></div>
                  <div className="quiz-score"><Trophy size={16} /> {quizScore}</div>
                </div>
                {quizEntry ? (
                  <>
                    <div className="quiz-question">{quizEntry.english}</div>
                    <div className="quiz-options">
                      {quizOptions.map((option) => {
                        const isCorrect = isBembaAnswerCorrect(option, quizEntry.bemba);
                        const className = quizFeedback && isCorrect ? "quiz-option correct" : quizFeedback && option === quizSelected ? "quiz-option wrong" : "quiz-option";
                        return <button key={option} type="button" className={className} onClick={() => answerQuiz(option)} disabled={Boolean(quizFeedback)}><span>{option}</span>{quizFeedback && isCorrect && <CheckCircle2 size={18} />}{quizFeedback && option === quizSelected && !isCorrect && <XCircle size={18} />}</button>;
                      })}
                    </div>
                    {quizFeedback && (
                      <div className={quizFeedback === "correct" ? "quiz-feedback correct" : "quiz-feedback wrong"}>
                        {quizFeedback === "correct" ? <><CheckCircle2 size={19} /><span>Correct! {quizStreak > 1 ? `${quizStreak} in a row.` : "Keep going."}</span></> : <><XCircle size={19} /><span>Not quite. The answer is <strong>{quizEntry.bemba}</strong>.</span></>}
                      </div>
                    )}
                    <button type="button" className="lesson-primary full" onClick={makeQuizQuestion} disabled={!quizFeedback}>Next question <ArrowRight size={17} /></button>
                    <div className="quiz-meta"><span>{quizAnswered} answered</span><span>Streak {quizStreak} <Flame size={14} /></span></div>
                  </>
                ) : <button type="button" className="lesson-primary full" onClick={makeQuizQuestion}>Start quiz <Target size={17} /></button>}
              </div>
            )}

            {learnMode === "typing" && lessonEntry && (
              <div className="typing-panel">
                <div className="quiz-header">
                  <div><span className="eyebrow">ACTIVE RECALL</span><h2>Type the Bemba word.</h2></div>
                  <div className="quiz-score"><Target size={16} /> Practice</div>
                </div>
                <div className="quiz-question">{lessonEntry.english}</div>
                <input className="typing-input" value={typingAnswer} onChange={(event) => { setTypingAnswer(event.target.value); setTypingFeedback(null); }} onKeyDown={(event) => { if (event.key === "Enter") submitTyping(); }} placeholder="Type your Bemba answer..." autoComplete="off" />
                {typingFeedback && <div className={typingFeedback === "correct" ? "quiz-feedback correct" : "quiz-feedback wrong"}>{typingFeedback === "correct" ? <><CheckCircle2 size={19} /><span>Excellent! <strong>{lessonEntry.bemba}</strong> is correct.</span></> : <><XCircle size={19} /><span>Not quite. Valid answer: <strong>{lessonEntry.bemba}</strong>.</span></>}</div>}
                <div className="lesson-actions">
                  <button type="button" className="lesson-secondary" onClick={resetTyping}>Reset</button>
                  <button type="button" className="lesson-primary" onClick={submitTyping} disabled={!typingAnswer.trim() || Boolean(typingFeedback)}>Check answer <Check size={17} /></button>
                </div>
                {typingFeedback && <button type="button" className="next-word-button" onClick={() => { nextLessonCard(typingFeedback === "correct"); resetTyping(); }}>Next word <ArrowRight size={16} /></button>}
              </div>
            )}

            {learningPool.length === 0 && (
              <div className="large-empty"><BookOpen size={30} /><strong>No learning words available</strong><span>Add dictionary entries to start lessons.</span></div>
            )}
          </section>
        )}

        {/* ==================================================
            PHRASEBOOK
        ================================================== */}
        {page === "phrasebook" && (
          <section className="page phrasebook-page">
            <div className="page-intro feature-intro-card">
              <span className="eyebrow">EVERYDAY BEMBA</span>
              <h1>Phrasebook</h1>
              <p>Ready-to-use expressions for real conversations, travel and daily life.</p>
            </div>

            <div className="phrasebook-category-grid">
              {([
                ["Greetings", "Start a conversation", "How are you?", "Mulishani"],
                ["Travel", "Move with confidence", "Where are you?", "Ulikwisa"],
                ["Shopping", "Useful buying phrases", "I want money", "Ndefwaya indalama"],
                ["Daily life", "Common expressions", "Good morning", "Mwashibukeni"],
              ] as const).map(([title, subtitle, source, translation]) => (
                <button
                  key={title}
                  type="button"
                  className="phrasebook-category"
                  onClick={() => selectPhrase(source, translation)}
                >
                  <span>{title}</span>
                  <small>{subtitle}</small>
                  <strong>{translation}</strong>
                </button>
              ))}
            </div>

            <div className="section-title">
              <div>
                <h2>Quick phrases</h2>
                <p>Tap a phrase to translate, copy or listen.</p>
              </div>
              <span className="count-pill">{quickPhrases.length}</span>
            </div>

            <div className="phrase-grid">
              {quickPhrases.map(([source, translation]) => (
                <button key={source} className="phrase-card" onClick={() => selectPhrase(source, translation)}>
                  <span>{source}</span>
                  <strong>{translation}</strong>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        {page === "navigation" && (
          <Navigation
            onBack={goBack}
          />
        )}

        {/* ==================================================
            HISTORY
        ================================================== */}

        {page === "history" && (
          <section className="page">

            <div className="page-intro">

              <span className="eyebrow">
                RECENT ACTIVITY
              </span>

              <h1>
                History
              </h1>

              <p>
                Your recent translations
                are stored locally.
              </p>

            </div>

            {history.length === 0 ? (
              <div className="large-empty">

                <HistoryIcon size={30} />

                <strong>
                  No translations yet
                </strong>

                <span>
                  Your recent translations
                  will appear here.
                </span>

              </div>
            ) : (
              <>
                <div className="history-toolbar">

                  <span>
                    {history.length}{" "}
                    {history.length === 1
                      ? "translation"
                      : "translations"}
                  </span>

                  <button
                    onClick={() => {
                      setHistory([]);
                    }}
                  >
                    Clear
                  </button>

                </div>

                <div className="history-list">

                  {history.map((item) => (
                    <button
                      key={item.id}
                      className="history-card"
                      onClick={() =>
                        selectPhrase(
                          item.english,
                          item.bemba,
                        )
                      }
                    >

                      <div>

                        <small>
                          {item.time}
                        </small>

                        <span>
                          {item.english}
                        </span>

                        <strong>
                          {item.bemba}
                        </strong>

                      </div>

                      <Languages size={16} />

                    </button>
                  ))}

                </div>
              </>
            )}

          </section>
        )}

        {/* ==================================================
            SETTINGS
        ================================================== */}

        {page === "settings" && (
          <section className="page">

            <div className="page-intro">

              <span className="eyebrow">
                APPLICATION
              </span>

              <h1>
                Settings
              </h1>

              <p>
                BembaTranslate preferences
                and information.
              </p>

            </div>

            <div className="settings-card">

              <div className="setting-row">

                <div>

                  <strong>
                    Data & privacy
                  </strong>

                  <span>
                    Translation works without
                    an internet connection.
                  </span>

                </div>

                <span className="status-on">
                  <Check size={11} />
                  ON
                </span>

              </div>

              <div className="setting-row">

                <div>

                  <strong>
                    Dictionary
                  </strong>

                  <span>
                    Built into the application.
                  </span>

                </div>

                <BookOpen size={17} />

              </div>

              <div className="setting-row">

                <div>

                  <strong>
                    Audio
                  </strong>

                  <span>
                    Manual playback only.
                  </span>

                </div>

                <Volume2 size={17} />

              </div>

              <div className="setting-row">

                <div>

                  <strong>
                    Connected features
                  </strong>

                  <span>
                    Available for core
                    translation.
                  </span>

                </div>

                <span className="status-off">
                  Available
                </span>

              </div>

            </div>

            <div className="privacy-card">

              <div className="privacy-icon">
                <ShieldCheck size={16} />
              </div>

              <div>

                <strong>
                  Your privacy matters
                </strong>

                <span>
                  Your translations are
                  designed to remain on
                  your device.
                </span>

              </div>

            </div>

          </section>
        )}

      </main>

      <nav className="book-bottom-bar" aria-label="Book navigation">
        <button
          type="button"
          className="book-bottom-back"
          onClick={goBack}
          disabled={!canGoBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <button
          type="button"
          className={page === "home" ? "book-bottom-contents active" : "book-bottom-contents"}
          onClick={() => goTo("home")}
          aria-label="Open contents"
          aria-current={page === "home" ? "page" : undefined}
        >
          <BookOpen size={18} />
          <span>Contents</span>
          <small>{page === "home" ? "Home" : page[0].toUpperCase() + page.slice(1)}</small>
        </button>

        <button
          type="button"
          className={page === "settings" ? "book-bottom-settings active" : "book-bottom-settings"}
          onClick={() => goTo("settings")}
          aria-label="Settings"
          aria-current={page === "settings" ? "page" : undefined}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </nav>

    </div>
  );
}

export default App;
