import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
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
  Settings,
  ShieldCheck,
  Sun,
  Moon,
  Monitor,
  VolumeX,
  Trash2,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Volume2,
} from "lucide-react";

import * as ort from "onnxruntime-web";

import { bembaDictionary } from "./data/bembaDictionary";
import { translateWithFallback } from "./engine/bembaTranslator";
import Navigation from "./navigation/Navigation";

import "./styles/global.css";

type Page =
  | "home"
  | "translate"
  | "speak"
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
  const [phraseCategory, setPhraseCategory] = useState<string | null>(null);

  const goTo = (next: Page) => {
    if (next === page) return;
    if (next !== "phrasebook") setPhraseCategory(null);
    setPageHistory((items) => [...items, page]);
    setPage(next);
  };

  const goBack = () => {
    if (page === "phrasebook" && phraseCategory) {
      setPhraseCategory(null);
      return;
    }

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
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [voiceError, setVoiceError] = useState("");

  const bembaVoiceSession = useRef<ort.InferenceSession | null>(null);
  const bembaVoiceLoading = useRef<Promise<ort.InferenceSession> | null>(null);
  const bembaVoiceVocab = useRef<Record<string, number> | null>(null);
  const bembaVoiceAudioContext = useRef<AudioContext | null>(null);
  const bembaVoiceSource = useRef<AudioBufferSourceNode | null>(null);

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  type ThemeMode = "light" | "dark" | "system";
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem("bemba-theme") as ThemeMode | null;
      const savedSound = window.localStorage.getItem("bemba-sound");
      const savedMotion = window.localStorage.getItem("bemba-reduced-motion");
      if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
        setThemeMode(savedTheme);
      }
      if (savedSound !== null) setSoundEnabled(savedSound !== "false");
      if (savedMotion !== null) setReduceMotion(savedMotion === "true");
    } catch {
      // Settings are optional; defaults remain active if storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.dataset.reducedMotion = reduceMotion ? "true" : "false";
    try {
      window.localStorage.setItem("bemba-theme", themeMode);
      window.localStorage.setItem("bemba-sound", String(soundEnabled));
      window.localStorage.setItem("bemba-reduced-motion", String(reduceMotion));
    } catch {
      // Settings can still work for the current session.
    }
  }, [themeMode, soundEnabled, reduceMotion]);

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

  const launchSteps = [
    "Loading Bemba words",
    "Loading lessons",
    "Preparing translation",
    "Checking audio",
    "Finishing setup",
  ];

  const launchStep = Math.min(
    launchSteps.length - 1,
    Math.floor(progress / 20),
  );

  useEffect(() => {
    let current = 0;

    const timer = window.setInterval(() => {
      current += 2;

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

  const reverseDictionaryLookup = (input: string) => {
    const normalized = normalizeLookup(input);
    if (!normalized) return "";

    const exact = bembaDictionary.find(
      (item) => normalizeLookup(item.bemba) === normalized,
    );
    if (exact) return exact.english;

    const alternative = bembaDictionary.find((item) =>
      item.bemba
        .split("/")
        .some((form) => normalizeLookup(form) === normalized),
    );
    if (alternative) return alternative.english;

    const words = normalized.split(" ");
    const translatedWords = words.map((word) => {
      const match = bembaDictionary.find(
        (item) => normalizeLookup(item.bemba) === word,
      );
      return match?.english ?? "";
    });

    return translatedWords.every(Boolean) ? translatedWords.join(" ") : "";
  };

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
     Phrasebook
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

  const phrasebookCategories = {
    Greetings: [
      ["How are you?", "Mulishani"],
      ["I am fine", "Ndifye bwino"],
      ["Good morning", "Mwashibukeni"],
      ["Thank you", "Natotela"],
      ["Thank you very much", "Natotela sana"],
      ["Please", "Mukwai"],
      ["Sorry", "Njeleleniko"],
      ["Goodbye", "Shalenipo"],
      ["What is your name?", "Ni mwe banani?"],
      ["My name is...", "Ni nebo..."],
    ],
    Travel: [
      ["Where are you?", "Ulikwisa"],
      ["Where are they?", "Balikwisa"],
      ["Where is...?", "Kuli kwi...?"],
      ["I want to go to...", "Ndefwaya ukuya ku..."],
      ["Taxi", "Tekisi"],
      ["Bus", "Basi"],
      ["Left", "Ku kumo"],
      ["Right", "Ku kulyo"],
      ["Straight ahead", "Pa ntanshi"],
      ["How much?", "Shinga?"],
    ],
    Shopping: [
      ["How much is this?", "Nishinga ici?"],
      ["I am looking for...", "Ndefwaya ko..."],
      ["I want to buy food.", "Ndeefwaya ukushita ifyakulya."],
      ["Do you have chicken?", "Bushe uli inkoko?"],
      ["Do you want big or small?", "Uleefwaya inkulu nambi iinono?"],
      ["How much is it?", "Shinga ni?"],
      ["I have little money.", "Uli shishupa."],
      ["Give me vegetables.", "Impa ifimbusa fye."],
      ["I will pay now.", "Ilyo ndelipelafye."],
      ["Thank you.", "Naimwelwela."],
    ],
    "Daily life": [
      ["I'm angry", "Nimfulwa"],
      ["I am hungry", "Ningufwa insala"],
      ["I want to eat", "Ndefwaya ukulya"],
      ["I am fine", "Ndifye bwino"],
      ["Good morning", "Mwashibukeni"],
      ["Thank you", "Natotela"],
      ["Please", "Mukwai"],
      ["I don't understand", "Nshumfwile"],
      ["Please speak more slowly", "Landa panono panono"],
      ["Please say that again", "Bwekeshapo"],
    ],
  } as const;

  const activePhraseList = phraseCategory
    ? phrasebookCategories[phraseCategory as keyof typeof phrasebookCategories] ?? []
    : [];

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
     Bemba ONNX voice
  -------------------------------------------------- */

  const stopBembaVoice = () => {
    try {
      bembaVoiceSource.current?.stop();
    } catch {
      // The source may already have finished.
    }
    bembaVoiceSource.current = null;
    setSpeaking(false);
  };

  const loadBembaVoice = async () => {
    if (bembaVoiceSession.current) return bembaVoiceSession.current;
    if (bembaVoiceLoading.current) return bembaVoiceLoading.current;

    setVoiceStatus("loading");
    setVoiceError("");

    const loading = (async () => {
      try {
        const [vocabResponse, session] = await Promise.all([
          fetch("/models/vocab.json"),
          ort.InferenceSession.create("/models/model.onnx", {
            executionProviders: ["wasm"],
            graphOptimizationLevel: "all",
          }),
        ]);

        if (!vocabResponse.ok) {
          throw new Error(`Could not load Bemba vocabulary (${vocabResponse.status}).`);
        }

        bembaVoiceVocab.current = await vocabResponse.json() as Record<string, number>;
        bembaVoiceSession.current = session;
        setVoiceStatus("ready");
        return session;
      } catch (error) {
        bembaVoiceLoading.current = null;
        const message = error instanceof Error ? error.message : "The Bemba voice could not be loaded.";
        setVoiceStatus("error");
        setVoiceError(message);
        throw error;
      }
    })();

    bembaVoiceLoading.current = loading;
    return loading;
  };

  const tokenizeBemba = (text: string) => {
    const vocab = bembaVoiceVocab.current;
    if (!vocab) throw new Error("Bemba vocabulary is not loaded.");

    // This follows Hugging Face VitsTokenizer for MMS: lowercase, remove
    // characters outside the vocabulary, then insert blank token id 0
    // between every character and at both sequence boundaries.
    const normalized = text
      .toLowerCase()
      .split("")
      .filter((character) => Object.prototype.hasOwnProperty.call(vocab, character))
      .join("")
      .trim();

    if (!normalized) {
      throw new Error("There are no Bemba characters that the voice model can read.");
    }

    const ids: number[] = [0];
    for (const character of normalized) {
      ids.push(vocab[character] ?? vocab["<unk>"] ?? 0);
      ids.push(0);
    }
    return ids;
  };

  const playBembaWaveform = async (waveform: Float32Array, sampleRate = 16000) => {
    const AudioContextClass = window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) throw new Error("This device does not support audio playback.");

    const context = bembaVoiceAudioContext.current ?? new AudioContextClass();
    bembaVoiceAudioContext.current = context;
    await context.resume();

    stopBembaVoice();

    const buffer = context.createBuffer(1, waveform.length, sampleRate);
    buffer.copyToChannel(waveform, 0);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => {
      if (bembaVoiceSource.current === source) {
        bembaVoiceSource.current = null;
        setSpeaking(false);
      }
    };

    bembaVoiceSource.current = source;
    setSpeaking(true);
    source.start(0);
  };

  const speakWithBembaModel = async (phrase: string) => {
    if (!soundEnabled || !phrase.trim() || speaking) return;

    setSpeaking(true);
    setVoiceError("");

    try {
      const session = await loadBembaVoice();
      const ids = tokenizeBemba(phrase);
      const attention = new BigInt64Array(ids.length).fill(1n);
      const inputIds = new BigInt64Array(ids.map(BigInt));

      const feeds: Record<string, ort.Tensor> = {};
      for (const name of session.inputNames) {
        const key = name.toLowerCase();
        if (key.includes("input_ids") || key === "input") {
          feeds[name] = new ort.Tensor("int64", inputIds, [1, ids.length]);
        } else if (key.includes("attention_mask") || key.includes("input_mask")) {
          feeds[name] = new ort.Tensor("int64", attention, [1, ids.length]);
        } else if (key.includes("speaker")) {
          feeds[name] = new ort.Tensor("int64", new BigInt64Array([0n]), [1]);
        } else if (key.includes("speaking_rate")) {
          feeds[name] = new ort.Tensor("float32", new Float32Array([1]), [1]);
        } else if (key.includes("noise_scale_duration")) {
          feeds[name] = new ort.Tensor("float32", new Float32Array([0.8]), [1]);
        } else if (key.includes("noise_scale")) {
          feeds[name] = new ort.Tensor("float32", new Float32Array([0.667]), [1]);
        } else if (key.includes("length_scale")) {
          feeds[name] = new ort.Tensor("float32", new Float32Array([1]), [1]);
        }
      }

      const missingInputs = session.inputNames.filter((name) => !feeds[name]);
      if (missingInputs.length > 0) {
        throw new Error(`The Bemba voice model requires unsupported inputs: ${missingInputs.join(", ")}`);
      }

      const outputs = await session.run(feeds);
      const waveformOutput = outputs["waveform"] ?? outputs["audio"] ?? outputs[session.outputNames[0]];

      if (!waveformOutput || !(waveformOutput.data instanceof Float32Array)) {
        throw new Error(`The Bemba voice returned an unsupported audio output. Outputs: ${session.outputNames.join(", ")}`);
      }

      await playBembaWaveform(waveformOutput.data, 16000);
    } catch (error) {
      stopBembaVoice();
      const message = error instanceof Error ? error.message : "Bemba voice generation failed.";
      setVoiceStatus("error");
      setVoiceError(message);
      console.error("BEMBA TTS ERROR", error);
    }
  };

  const listen = () => {
    const phrase = bemba;
    if (!phrase.trim()) return;
    void speakWithBembaModel(phrase);
  };

  const speakPhrase = (phrase: string) => {
    setSpeakText(phrase);
    if (!phrase.trim()) return;
    void speakWithBembaModel(phrase);
  };

  useEffect(() => {
    return () => {
      stopBembaVoice();
      try {
        bembaVoiceAudioContext.current?.close();
      } catch {
        // Audio context cleanup is best-effort.
      }
    };
  }, []);

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
            <span><MessageCircle size={13} /> Phrasebook</span>
            <span><Sparkles size={13} /> Learn</span>
          </div>

          <div className="launch-status">
            <div className="launch-status-row">
              <span>{launchSteps[launchStep]}</span>
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
                  ? "Bemba language tools in one place"
                  : page === "navigation"
                    ? "Search places and build routes"
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
              <button type="button" onClick={() => goTo("translate")}>
                <ArrowRight size={15} />
                Start translating
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
                onClick={() => goTo("history")}
              >
                <span className="feature-image feature-image-history">
                  <HistoryIcon size={22} />
                </span>
                <span className="feature-card-copy">
                  <strong>History</strong>
                  <small>Your recent translations</small>
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
                    <span>{translationDirection === "en-bem" ? "Enter an English word or phrase above." : "Enter a Bemba word or phrase."}</span>
                  </div>
                )}
              </div>

              {translationDirection === "bem-en" && (
                <div className="dictionary-translation-note">
                  <BookOpen size={16} />
                  <span>Bemba → English uses the local Bemba word data, including exact words, phrases and alternative forms.</span>
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
                <button type="button" className="lesson-secondary" onClick={stopBembaVoice} disabled={!speaking}>Stop</button>
              </div>
              <div className="speak-note"><Volume2 size={16} /><span>{voiceStatus === "loading" ? "Loading the built-in Bemba voice for the first time…" : voiceStatus === "error" ? `Bemba voice error: ${voiceError}` : "This app uses the built-in Bemba VITS voice model, so pronunciation does not depend on voices installed on the phone."}</span></div>
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
              <div className="large-empty"><BookOpen size={30} /><strong>No learning words available</strong><span>Add Bemba word data to start lessons.</span></div>
            )}
          </section>
        )}

        {/* ==================================================
            PHRASEBOOK
        ================================================== */}
        {page === "phrasebook" && (
          <section className="page phrasebook-page">
            {!phraseCategory ? (
              <>
                <div className="page-intro feature-intro-card phrasebook-intro">
                  <span className="eyebrow">EVERYDAY BEMBA</span>
                  <h1>Phrasebook</h1>
                  <p>Useful phrases for everyday conversations.</p>
                </div>

                <div className="phrasebook-category-grid">
                  {(["Greetings", "Travel", "Shopping", "Daily life"] as const).map((title) => {
                    const items = phrasebookCategories[title];
                    const preview = items[0];

                    return (
                      <button
                        key={title}
                        type="button"
                        className="phrasebook-category"
                        onClick={() => setPhraseCategory(title)}
                        aria-label={`Open ${title} phrases`}
                      >
                        <span>{title}</span>
                        <small>{items.length} {Number(items.length) === 1 ? "phrase" : "phrases"}</small>
                        <strong>{preview[1]}</strong>
                        <ArrowRight size={16} />
                      </button>
                    );
                  })}
                </div>

                <div className="section-title">
                  <div>
                    <h2>Quick phrases</h2>
                    <p>Common expressions at a glance.</p>
                  </div>
                  <span className="count-pill">{quickPhrases.length}</span>
                </div>

                <div className="phrase-grid">
                  {quickPhrases.map(([source, translation]) => (
                    <button
                      key={source}
                      className="phrase-card"
                      onClick={() => selectPhrase(source, translation)}
                    >
                      <span>{source}</span>
                      <strong>{translation}</strong>
                      <ArrowRight size={15} />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="phrasebook-detail-header">
                  <button
                    type="button"
                    className="phrasebook-back"
                    onClick={() => setPhraseCategory(null)}
                  >
                    <ArrowLeft size={16} />
                    Phrasebook
                  </button>
                  <span className="eyebrow">BEMBA PHRASES</span>
                  <h1>{phraseCategory}</h1>
                  <p>Tap a phrase to translate or hear it.</p>
                </div>

                <div className="phrase-list phrasebook-phrase-list">
                  {activePhraseList.map(([source, translation]) => (
                    <button
                      type="button"
                      key={`${source}-${translation}`}
                      className="phrase-card phrase-detail-card"
                      onClick={() => selectPhrase(source, translation)}
                    >
                      <span>
                        <strong>{source}</strong>
                        <small>{translation}</small>
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                </div>

                <div className="phrasebook-actions">
                  {activePhraseList.map(([source, translation]) => (
                    <button
                      key={`speak-${source}-${translation}`}
                      type="button"
                      onClick={() => speakPhrase(translation)}
                    >
                      <Volume2 size={15} />
                      {translation}
                    </button>
                  ))}
                </div>
              </>
            )}
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
          <section className="page settings-page">
            <div className="page-intro">
              <span className="eyebrow">BEMBATRANSLATE</span>
              <h1>Settings</h1>
              <p>Make the app comfortable, private and easy to use.</p>
            </div>

            <div className="settings-section-title">Appearance</div>
            <div className="settings-card settings-choice-card">
              <div className="setting-heading-row">
                <div className="setting-icon"><Settings size={18} /></div>
                <div>
                  <strong>Theme</strong>
                  <span>Choose how BembaTranslate looks.</span>
                </div>
              </div>
              <div className="theme-options" role="radiogroup" aria-label="Theme">
                {([
                  ["light", "Light", Sun],
                  ["dark", "Dark", Moon],
                  ["system", "System", Monitor],
                ] as const).map(([value, label, Icon]) => (
                  <button
                    key={value}
                    type="button"
                    className={themeMode === value ? "theme-option active" : "theme-option"}
                    onClick={() => setThemeMode(value)}
                    role="radio"
                    aria-checked={themeMode === value}
                  >
                    <Icon size={17} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section-title">Experience</div>
            <div className="settings-card">
              <button type="button" className="setting-row setting-button-row" onClick={() => setSoundEnabled((value) => !value)}>
                <span className="setting-icon"><Volume2 size={18} /></span>
                <span className="setting-copy">
                  <strong>Audio</strong>
                  <span>Use sound when listening to Bemba.</span>
                </span>
                <span className={soundEnabled ? "settings-switch on" : "settings-switch"} aria-hidden="true"><span /></span>
              </button>

              <button type="button" className="setting-row setting-button-row" onClick={() => setReduceMotion((value) => !value)}>
                <span className="setting-icon"><Sparkles size={18} /></span>
                <span className="setting-copy">
                  <strong>Reduce motion</strong>
                  <span>Use simpler transitions and animations.</span>
                </span>
                <span className={reduceMotion ? "settings-switch on" : "settings-switch"} aria-hidden="true"><span /></span>
              </button>

              <div className="setting-row">
                <span className="setting-icon"><Languages size={18} /></span>
                <span className="setting-copy">
                  <strong>Language</strong>
                  <span>Bemba ↔ English translation</span>
                </span>
                <span className="settings-value">Bemba</span>
              </div>
            </div>

            <div className="settings-section-title">Your data</div>
            <div className="settings-card">
              <button type="button" className="setting-row setting-button-row" onClick={() => setHistory([])}>
                <span className="setting-icon"><Trash2 size={18} /></span>
                <span className="setting-copy">
                  <strong>Clear translation history</strong>
                  <span>{history.length} saved translation{history.length === 1 ? "" : "s"} on this session.</span>
                </span>
                <ArrowRight size={16} />
              </button>

              <button type="button" className="setting-row setting-button-row" onClick={() => {
                setThemeMode("system");
                setSoundEnabled(true);
                setReduceMotion(false);
              }}>
                <span className="setting-icon"><RotateCcw size={18} /></span>
                <span className="setting-copy">
                  <strong>Reset settings</strong>
                  <span>Return appearance and experience options to defaults.</span>
                </span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="privacy-card">
              <div className="privacy-icon"><ShieldCheck size={17} /></div>
              <div>
                <strong>Private by design</strong>
                <span>Your preferences are stored locally on this device. No account is required.</span>
              </div>
            </div>
          </section>
        )}

      </main>

      <nav className="book-bottom-bar" aria-label="Primary navigation">
        <button type="button" className="book-bottom-back" onClick={goBack} disabled={!canGoBack} aria-label="Go back">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <button type="button" className={page === "home" ? "active" : ""} onClick={() => goTo("home")} aria-label="Home" aria-current={page === "home" ? "page" : undefined}>
          <Languages size={18} />
          <span>Home</span>
        </button>

        <button type="button" className={page === "translate" ? "active" : ""} onClick={() => goTo("translate")} aria-label="Translate" aria-current={page === "translate" ? "page" : undefined}>
          <Languages size={18} />
          <span>Translate</span>
        </button>

        <button type="button" className={page === "learn" ? "active" : ""} onClick={() => goTo("learn")} aria-label="Learn" aria-current={page === "learn" ? "page" : undefined}>
          <Sparkles size={18} />
          <span>Learn</span>
        </button>

        <button type="button" className={page === "settings" ? "active" : ""} onClick={() => goTo("settings")} aria-label="Settings" aria-current={page === "settings" ? "page" : undefined}>
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

    </div>
  );
}

export default App;
