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

const navigationItems: {
  id: Page;
  label: string;
  icon: typeof Languages;
}[] = [
  { id: "home", label: "Home", icon: Languages },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "dictionary", label: "Dictionary", icon: BookOpen },
  { id: "navigation", label: "Navigate", icon: NavigationIcon },
  { id: "history", label: "History", icon: HistoryIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

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
  const learningPool = useMemo(
    () => bembaDictionary.filter((item) => item.english.trim() && item.bemba.trim()),
    [],
  );
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

  const nextLessonCard = (shouldMark = showLessonAnswer) => {
    if (lessonEntry && shouldMark) markLearned(lessonEntry);
    setLessonIndex((index) => index + 1);
    setShowLessonAnswer(false);
  };

  const makeQuizQuestion = () => {
    if (learningPool.length === 0) return;
    const entry = learningPool[Math.floor(Math.random() * learningPool.length)];
    const distractors = learningPool
      .filter((item) => item.bemba !== entry.bemba)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.bemba);
    setQuizEntry(entry);
    setQuizOptions([entry.bemba, ...distractors].sort(() => Math.random() - 0.5));
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
    const correct = normalizeAnswer(answer) === normalizeAnswer(quizEntry.bemba);
    setQuizSelected(answer);
    setQuizFeedback(correct ? "correct" : "wrong");
    setQuizAnswered((value) => value + 1);
    setQuizScore((value) => value + (correct ? 1 : 0));
    setQuizStreak((value) => correct ? value + 1 : 0);
    if (correct) markLearned(quizEntry);
  };

  const submitTyping = () => {
    if (!lessonEntry || typingFeedback) return;
    const correct = normalizeAnswer(typingAnswer) === normalizeAnswer(lessonEntry.bemba);
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

  const dictionaryResults = useMemo(() => {
    const query =
      searchText.trim().toLowerCase();

    if (!query) {
      return bembaDictionary.slice(0, 100);
    }

    return bembaDictionary
      .filter((item) => {
        return (
          item.english
            .toLowerCase()
            .includes(query) ||
          item.bemba
            .toLowerCase()
            .includes(query)
        );
      })
      .slice(0, 200);
  }, [searchText]);

  /* --------------------------------------------------
     Translation
  -------------------------------------------------- */

  const translate = () => {
    const input = english.trim();

    if (!input || translating) {
      return;
    }

    setTranslating(true);
    setCopied(false);

    window.setTimeout(() => {
      const match = quickPhrases.find(
        ([source]) =>
          source.toLowerCase() ===
          input.toLowerCase(),
      );

      const result =
        match?.[1] ||
        translateWithFallback(input) ||
        "";

      setBemba(result);

      if (result) {
        setHistory((items) => [
          {
            id: Date.now(),
            english: input,
            bemba: result,
            time: new Date().toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            ),
          },
          ...items,
        ]);
      }

      setTranslating(false);
    }, 160);
  };

  /* --------------------------------------------------
     Select phrase
  -------------------------------------------------- */

  const selectPhrase = (
    source: string,
    translation: string,
  ) => {
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
    if (!bemba) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        bemba,
      );

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
    if (!bemba || speaking) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(bemba);
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
            {canGoBack && (
              <button
                type="button"
                className="app-back-button"
                onClick={goBack}
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
            )}
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
                          : "English → Bemba"}
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
                Search Bemba
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
          <section className="page">

            <div className="welcome-card">

              <span className="eyebrow">
                LANGUAGE PLATFORM
              </span>

              <h1>
                Speak with confidence
                <br />
                with confidence.
              </h1>

              <p>
                Translate everyday English quickly,
                clearly and naturally.
              </p>

            </div>

            <div className="section-title">

              <div>
                <h2>
                  Translate
                </h2>

                <p>
                  English → Bemba
                </p>
              </div>

              <span className="local-pill">
                <Check size={12} />
                Local
              </span>

            </div>

            <div className="translation-card">

              <div className="language-strip">

                <div>
                  <small>
                    FROM
                  </small>

                  <strong>
                    English
                  </strong>
                </div>

                <div className="language-arrow">
                  →
                </div>

                <div>
                  <small>
                    TO
                  </small>

                  <strong>
                    Bemba
                  </strong>
                </div>

              </div>

              <div className="input-label-row">
                <span>English text</span>
                <div className="input-meta-actions">
                  <span>{english.length}/5000</span>
                  {english && (
                    <button
                      type="button"
                      className="input-clear-button"
                      onClick={() => {
                        setEnglish("");
                        setBemba("");
                        setCopied(false);
                        setFavourite(false);
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={english}
                maxLength={5000}
                onChange={(event) => {
                  setEnglish(
                    event.target.value,
                  );
                }}
                placeholder="Type something in English..."
              />

              <button
                className="translate-button"
                onClick={translate}
                disabled={
                  !english.trim() ||
                  translating
                }
              >
                <Languages size={17} />

                {translating
                  ? "Translating..."
                  : "Translate to Bemba"}
              </button>

              <div className="result-box">

                <div className="result-heading">

                  <span>
                    <span className="bemba-dot" />
                    Bemba translation
                  </span>

                  {bemba && (
                    <span className="ready-label">
                      <Check size={11} />
                      Ready
                    </span>
                  )}

                </div>

                {bemba ? (
                  <div className="translation-result">

                    <strong>
                      {bemba}
                    </strong>

                    <div className="result-actions">

                      <button
                        className={
                          favourite
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          setFavourite(
                            (value) =>
                              !value,
                          );
                        }}
                        aria-label="Favourite"
                      >
                        <Heart
                          size={16}
                          fill={
                            favourite
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <button
                        onClick={copy}
                        aria-label="Copy"
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <button
                        onClick={listen}
                        aria-label="Listen"
                      >
                        <Volume2 size={16} />

                        {speaking
                          ? "Playing"
                          : "Listen"}
                      </button>

                    </div>

                  </div>
                ) : (
                  <div className="empty-result">

                    <BookOpen size={21} />

                    <strong>
                      Your translation will
                      appear here
                    </strong>

                    <span>
                      Enter an English word
                      or phrase above.
                    </span>

                  </div>
                )}

              </div>

            </div>

            <div className="section-title">

              <div>
                <h2>
                  Popular phrases
                </h2>

                <p>
                  Useful expressions for
                  everyday life
                </p>
              </div>

              <span className="count-pill">
                {quickPhrases.length}
              </span>

            </div>

            <div className="phrase-grid">

              {quickPhrases.map(
                ([source, translation]) => (
                  <button
                    key={source}
                    className="phrase-card"
                    onClick={() =>
                      selectPhrase(
                        source,
                        translation,
                      )
                    }
                  >
                    <span>
                      {source}
                    </span>

                    <strong>
                      {translation}
                    </strong>
                  </button>
                ),
              )}

            </div>

            <div className="privacy-info">

              <div className="info-icon">
                <Check size={15} />
              </div>

              <div>
                <strong>
                  Private by design
                </strong>

                <span>
                  Your translations stay
                  on your device.
                </span>
              </div>

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
          <section className="page">

            <div className="page-intro">

              <span className="eyebrow">
                BEMBA LANGUAGE
              </span>

              <h1>
                Dictionary
              </h1>

              <p>
                Search the built-in
                English → Bemba word collection.
              </p>

            </div>

            <div className="search-field">

              <Search size={17} />

              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(
                    event.target.value,
                  );
                }}
                placeholder="Search words or phrases..."
              />

            </div>

            <div className="dictionary-count">
              {searchText.trim()
                ? `${dictionaryResults.length} results`
                : `${bembaDictionary.length} dictionary entries`}
            </div>

            <div className="dictionary-list">

              {dictionaryResults.length > 0 ? (
                dictionaryResults.map(
                  (item, index) => (
                    <button
                      key={`${item.english}-${index}`}
                      className="dictionary-card"
                      onClick={() =>
                        selectPhrase(
                          item.english,
                          item.bemba,
                        )
                      }
                    >

                      <div>

                        <span>
                          {item.english}
                        </span>

                        <strong>
                          {item.bemba}
                        </strong>

                      </div>

                      <Languages size={16} />

                    </button>
                  ),
                )
              ) : (
                <div className="large-empty">

                  <Search size={30} />

                  <strong>
                    No dictionary entry found
                  </strong>

                  <span>
                    Try another English or
                    Bemba word.
                  </span>

                </div>
              )}

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
                  <span className="lesson-count">{learnedWords.length} reviewed</span>
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
                  <button type="button" className="lesson-primary" onClick={nextLessonCard}>
                    {showLessonAnswer ? "I know it" : "Next word"} <ArrowRight size={17} />
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
                        const isCorrect = normalizeAnswer(option) === normalizeAnswer(quizEntry.bemba);
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
                {typingFeedback && <div className={typingFeedback === "correct" ? "quiz-feedback correct" : "quiz-feedback wrong"}>{typingFeedback === "correct" ? <><CheckCircle2 size={19} /><span>Excellent! <strong>{lessonEntry.bemba}</strong> is correct.</span></> : <><XCircle size={19} /><span>Try again. Correct answer: <strong>{lessonEntry.bemba}</strong>.</span></>}</div>}
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

      <nav className="bottom-navigation" aria-label="Application settings">
        <button
          type="button"
          className={page === "settings" ? "active" : ""}
          onClick={() => goTo("settings")}
          aria-label="Settings"
          aria-current={page === "settings" ? "page" : undefined}
        >
          <span className="nav-icon"><Settings size={19} /></span>
          <span>Settings</span>
        </button>
      </nav>

    </div>
  );
}

export default App;
