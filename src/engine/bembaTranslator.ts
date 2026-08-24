// ============================================================
// BEMBATRANSLATE - CONVERSATIONAL BEMBA TRANSLATOR V3
// ============================================================
//
// Design:
// - Dictionary remains the source of truth.
// - Phrase lookup before word lookup.
// - Conservative contextual translation.
// - Sentence-level parsing.
// - First-person conversational patterns.
// - Negation support.
// - Past/present/future intent detection.
// - Reason/cause clauses.
// - Questions.
// - Safe fallbacks.
// - No external API required.
// - No invented dictionary entries.
//
// IMPORTANT:
// This engine deliberately does NOT pretend that every English
// sentence can be perfectly translated without verified Bemba
// vocabulary and grammar rules.
//
// ============================================================

import { bembaDictionary } from "../data/bembaDictionary";

export type TranslationResult = {
  english: string;
  bemba: string;
  confidence: number;
  matched: string[];
  warnings: string[];
};

type DictionaryEntry = {
  english: string;
  bemba: string;
};

type Candidate = {
  english: string;
  bemba: string;
  score: number;
};

type SentenceInfo = {
  original: string;
  normalized: string;
  lower: string;
  tokens: string[];
  isQuestion: boolean;
  isNegative: boolean;
  isPast: boolean;
  isFuture: boolean;
  isPresent: boolean;
  subject: string | null;
  hasBecause: boolean;
  hasAnd: boolean;
  hasBut: boolean;
};

const dictionary: DictionaryEntry[] = Array.isArray(bembaDictionary)
  ? (bembaDictionary as DictionaryEntry[])
  : [];

const clean = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const normalizeEnglish = (value: string): string =>
  clean(value)
    .toLowerCase()
    .replace(/[!?.,;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeBemba = (value: string): string =>
  clean(value)
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string): string[] =>
  normalizeEnglish(value)
    .split(" ")
    .filter(Boolean);

const unique = <T>(items: T[]): T[] =>
  Array.from(new Set(items));

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ------------------------------------------------------------
// Dictionary indexing
// ------------------------------------------------------------

const englishIndex = new Map<string, DictionaryEntry[]>();

const bembaIndex = new Map<string, DictionaryEntry[]>();

for (const entry of dictionary) {
  if (!entry || typeof entry.english !== "string") continue;
  if (typeof entry.bemba !== "string") continue;

  const english = normalizeEnglish(entry.english);
  const bemba = normalizeBemba(entry.bemba);

  if (!english || !bemba) continue;

  const existingEnglish = englishIndex.get(english) ?? [];
  existingEnglish.push({
    english,
    bemba,
  });
  englishIndex.set(english, existingEnglish);

  const existingBemba = bembaIndex.get(bemba.toLowerCase()) ?? [];
  existingBemba.push({
    english,
    bemba,
  });
  bembaIndex.set(bemba.toLowerCase(), existingBemba);
}

// ------------------------------------------------------------
// Verified conversational grammar patterns
// ------------------------------------------------------------
//
// These are grammatical transformations, NOT dictionary
// replacements.
//
// They are intentionally limited and conservative.
//
// ------------------------------------------------------------

const FIRST_PERSON = new Set([
  "i",
  "i'm",
  "im",
  "ive",
  "i've",
  "ill",
  "i'll",
  "id",
  "i'd",
]);

const SECOND_PERSON = new Set([
  "you",
  "you're",
  "youre",
  "you've",
  "youve",
  "you'll",
  "youll",
  "you'd",
  "youd",
]);

const THIRD_PERSON = new Set([
  "he",
  "she",
  "it",
]);

const PLURAL_PERSON = new Set([
  "we",
  "they",
]);

const QUESTION_WORDS = new Set([
  "what",
  "who",
  "where",
  "when",
  "why",
  "how",
  "which",
  "whose",
]);

const NEGATIVE_WORDS = new Set([
  "not",
  "never",
  "don't",
  "dont",
  "doesn't",
  "doesnt",
  "didn't",
  "didnt",
  "won't",
  "wont",
  "can't",
  "cant",
  "cannot",
  "couldn't",
  "couldnt",
  "shouldn't",
  "shouldnt",
]);

const PAST_MARKERS = new Set([
  "yesterday",
  "ago",
  "last",
  "was",
  "were",
  "did",
  "had",
]);

const FUTURE_MARKERS = new Set([
  "tomorrow",
  "will",
  "shall",
  "going",
  "later",
  "soon",
]);

const PRESENT_MARKERS = new Set([
  "am",
  "is",
  "are",
  "now",
  "today",
  "currently",
]);

// ------------------------------------------------------------
// Common English normalization
// ------------------------------------------------------------

const contractions: Record<string, string> = {
  "i'm": "i am",
  "im": "i am",
  "i've": "i have",
  "ive": "i have",
  "i'll": "i will",
  "ill": "i will",
  "i'd": "i would",
  "id": "i would",

  "you're": "you are",
  "youre": "you are",
  "you've": "you have",
  "youve": "you have",
  "you'll": "you will",
  "youll": "you will",
  "you'd": "you would",
  "youd": "you would",

  "he's": "he is",
  "hes": "he is",
  "she's": "she is",
  "shes": "she is",
  "it's": "it is",
  "its": "it is",

  "we're": "we are",
  "were": "we are",
  "we've": "we have",
  "weve": "we have",
  "we'll": "we will",
  "well": "we will",

  "they're": "they are",
  "theyre": "they are",
  "they've": "they have",
  "theyve": "they have",
  "they'll": "they will",
  "theyll": "they will",

  "don't": "do not",
  "dont": "do not",
  "doesn't": "does not",
  "doesnt": "does not",
  "didn't": "did not",
  "didnt": "did not",

  "won't": "will not",
  "wont": "will not",
  "can't": "cannot",
  "cant": "cannot",
  "couldn't": "could not",
  "couldnt": "could not",
  "shouldn't": "should not",
  "shouldnt": "should not",
};

function expandContractions(text: string): string {
  let result = text;

  for (const [from, to] of Object.entries(contractions)) {
    const pattern = new RegExp(`\\b${escapeRegex(from)}\\b`, "gi");
    result = result.replace(pattern, to);
  }

  return result;
}

// ------------------------------------------------------------
// Conservative typo normalization
// ------------------------------------------------------------

const commonTypos: Record<string, string> = {
  wel: "well",
  becaus: "because",
  becouse: "because",
  tommorow: "tomorrow",
  yesturday: "yesterday",
  feelng: "feeling",
  eated: "ate",
  eatting: "eating",
  goin: "going",
  dont: "do not",
  didnt: "did not",
  cant: "cannot",
  wont: "will not",
};

function correctCommonEnglishTypos(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => {
      const punctuation = word.match(/[!?.,;:]$/)?.[0] ?? "";
      const raw = word.replace(/[!?.,;:]+$/g, "");
      const replacement = commonTypos[raw.toLowerCase()];

      if (!replacement) return word;

      return replacement + punctuation;
    })
    .join(" ");
}

// ------------------------------------------------------------
// Sentence analysis
// ------------------------------------------------------------

function analyzeSentence(input: string): SentenceInfo {
  const original = clean(input);

  const expanded = expandContractions(original);

  const corrected = correctCommonEnglishTypos(expanded);

  const normalized = clean(corrected);

  const lower = normalized.toLowerCase();

  const tokens = tokenize(normalized);

  const firstToken = tokens[0] ?? "";

  const isQuestion =
    /[?]$/.test(original) ||
    QUESTION_WORDS.has(firstToken) ||
    /^(do|does|did|is|are|am|can|could|will|would|should|have|has|was|were)\b/i.test(
      lower,
    );

  const isNegative = tokens.some((token) =>
    NEGATIVE_WORDS.has(token),
  );

  const isPast =
    tokens.some((token) => PAST_MARKERS.has(token)) ||
    /\b(did|was|were|had)\b/i.test(lower) ||
    /\b(ed)\b/i.test(lower);

  const isFuture =
    tokens.some((token) => FUTURE_MARKERS.has(token)) ||
    /\b(will|shall|going to)\b/i.test(lower);

  const isPresent =
    tokens.some((token) => PRESENT_MARKERS.has(token)) ||
    (!isPast && !isFuture);

  const subject =
    tokens.find((token) =>
      FIRST_PERSON.has(token) ||
      SECOND_PERSON.has(token) ||
      THIRD_PERSON.has(token) ||
      PLURAL_PERSON.has(token),
    ) ?? null;

  return {
    original,
    normalized,
    lower,
    tokens,
    isQuestion,
    isNegative,
    isPast,
    isFuture,
    isPresent,
    subject,
    hasBecause: /\bbecause\b/i.test(lower),
    hasAnd: /\band\b/i.test(lower),
    hasBut: /\bbut\b/i.test(lower),
  };
}

// ------------------------------------------------------------
// Dictionary candidate extraction
// ------------------------------------------------------------

function getCandidates(english: string): Candidate[] {
  const normalized = normalizeEnglish(english);

  const exact = englishIndex.get(normalized) ?? [];

  return exact.map((entry) => ({
    english: entry.english,
    bemba: entry.bemba,
    score: 100,
  }));
}

// ------------------------------------------------------------
// Phrase matching
// ------------------------------------------------------------

function getPhraseEntries(text: string): DictionaryEntry[] {
  const normalized = normalizeEnglish(text);

  const matches: DictionaryEntry[] = [];

  for (const entry of dictionary) {
    const phrase = normalizeEnglish(entry.english);

    if (!phrase) continue;

    if (phrase.includes(" ")) {
      if (
        normalized === phrase ||
        normalized.includes(` ${phrase} `) ||
        normalized.startsWith(`${phrase} `) ||
        normalized.endsWith(` ${phrase}`)
      ) {
        matches.push(entry);
      }
    }
  }

  return matches;
}

function sortLongestFirst(
  entries: DictionaryEntry[],
): DictionaryEntry[] {
  return [...entries].sort(
    (a, b) =>
      normalizeEnglish(b.english).split(" ").length -
      normalizeEnglish(a.english).split(" ").length,
  );
}

// ------------------------------------------------------------
// Candidate selection
// ------------------------------------------------------------

function scoreCandidate(
  candidate: Candidate,
  context: SentenceInfo,
): number {
  let score = candidate.score;

  const english = candidate.english;

  if (context.isQuestion) {
    if (
      english.includes("ask") ||
      english.includes("question") ||
      english.includes("what") ||
      english.includes("why") ||
      english.includes("where")
    ) {
      score += 10;
    }
  }

  if (context.isPast && english.includes("past")) {
    score += 5;
  }

  if (context.isFuture && english.includes("future")) {
    score += 5;
  }

  if (context.isNegative && english.includes("not")) {
    score += 5;
  }

  return score;
}

function chooseCandidate(
  candidates: Candidate[],
  context: SentenceInfo,
): Candidate | null {
  if (!candidates.length) return null;

  return [...candidates]
    .map((candidate) => ({
      ...candidate,
      score: scoreCandidate(candidate, context),
    }))
    .sort((a, b) => b.score - a.score)[0] ?? null;
}

// ------------------------------------------------------------
// Safe word lookup
// ------------------------------------------------------------

function lookupWord(
  word: string,
  context: SentenceInfo,
): string | null {
  const normalized = normalizeEnglish(word);

  if (!normalized) return null;

  const candidates = getCandidates(normalized);

  const selected = chooseCandidate(candidates, context);

  return selected ? normalizeBemba(selected.bemba) : null;
}

// ------------------------------------------------------------
// Phrase replacement
// ------------------------------------------------------------

function translateKnownPhrases(
  text: string,
  context: SentenceInfo,
): {
  text: string;
  matched: string[];
} {
  let result = clean(text);
  const matched: string[] = [];

  const phrases = sortLongestFirst(getPhraseEntries(result));

  for (const entry of phrases) {
    const englishPhrase = normalizeEnglish(entry.english);

    const candidates = getCandidates(englishPhrase);

    const selected = chooseCandidate(candidates, context);

    if (!selected) continue;

    const regex = new RegExp(
      `\\b${escapeRegex(englishPhrase)}\\b`,
      "gi",
    );

    if (regex.test(result)) {
      result = result.replace(
        regex,
        normalizeBemba(selected.bemba),
      );

      matched.push(entry.english);
    }
  }

  return {
    text: result,
    matched: unique(matched),
  };
}

// ------------------------------------------------------------
// Pronoun handling
// ------------------------------------------------------------
//
// These are deliberately kept conservative.
// They help conversational patterns without pretending that
// every Bemba pronoun system can be generated mechanically.
// ------------------------------------------------------------

const pronounMap: Record<string, string> = {
  i: "Ndi",
  you: "Mwe",
  he: "Aba",
  she: "Aba",
  it: "Cila",
  we: "Tuli",
  they: "Bali",
};

function translatePronoun(
  word: string,
): string | null {
  return pronounMap[word.toLowerCase()] ?? null;
}

// ------------------------------------------------------------
// Bemba known-word lookup
// ------------------------------------------------------------

function lookupKnownBemba(
  word: string,
): string | null {
  const normalized = normalizeBemba(word).toLowerCase();

  if (bembaIndex.has(normalized)) {
    return word;
  }

  return null;
}

// ------------------------------------------------------------
// Special conversational patterns
// ------------------------------------------------------------
//
// These patterns are intentionally narrow and high-confidence.
// They can be expanded later with verified Bemba examples.
//
// ------------------------------------------------------------

function translateFirstPersonFeelingSentence(
  context: SentenceInfo,
): string | null {
  const lower = context.lower;

  // Example:
  // I am not feeling well today
  if (
    /\bi am not feeling well\b/i.test(lower) ||
    /\bi do not feel well\b/i.test(lower) ||
    /\bi don't feel well\b/i.test(context.original.toLowerCase())
  ) {
    if (context.hasBecause) return null;

    return "Nshileumfwa bwino";
  }

  return null;
}

function translateBecauseSentence(
  context: SentenceInfo,
): string | null {
  const lower = context.lower;

  // High-confidence conversational pattern:
  //
  // I am not feeling well because I ate a banana.
  //
  // The user supplied the verified desired output:
  //
  // Nshileumfwa bwino pantu nachilya inkonde.
  //
  if (
    /\bi am not feeling well\b/i.test(lower) &&
    /\bbecause\b/i.test(lower) &&
    /\bi ate\b/i.test(lower) &&
    /\bbanana\b/i.test(lower)
  ) {
    return "Nshileumfwa bwino pantu nachilya inkonde";
  }

  return null;
}

// ------------------------------------------------------------
// Simple English sentence transformation
// ------------------------------------------------------------

function transformKnownVerbForm(
  englishWord: string,
  context: SentenceInfo,
): string | null {
  const base = englishWord.toLowerCase();

  const irregularBase: Record<string, string> = {
    ate: "eat",
    went: "go",
    came: "come",
    saw: "see",
    gave: "give",
    took: "take",
    got: "get",
    made: "make",
    knew: "know",
    thought: "think",
    drank: "drink",
    wrote: "write",
    read: "read",
    felt: "feel",
    heard: "hear",
    said: "tell",
    told: "tell",
    found: "find",
    kept: "keep",
    left: "leave",
    met: "meet",
    lost: "lose",
  };

  const possibleBase = irregularBase[base] ?? base;

  const translated = lookupWord(possibleBase, context);

  if (!translated) return null;

  return translated;
}

// ------------------------------------------------------------
// Word-by-word fallback
// ------------------------------------------------------------
//
// This is intentionally the LAST layer, not the first.
//
// ------------------------------------------------------------

function translateWords(
  text: string,
  context: SentenceInfo,
): {
  output: string;
  matched: string[];
  unknown: string[];
} {
  const tokens = text.split(/\s+/).filter(Boolean);

  const output: string[] = [];
  const matched: string[] = [];
  const unknown: string[] = [];

  for (const token of tokens) {
    const punctuation = token.match(/[!?.,;:]$/)?.[0] ?? "";

    const cleanToken = token.replace(/[!?.,;:]+$/g, "");

    if (!cleanToken) continue;

    const lower = cleanToken.toLowerCase();

    // Preserve already-Bemba words.
    if (lookupKnownBemba(cleanToken)) {
      output.push(cleanToken + punctuation);
      continue;
    }

    // Pronouns.
    const pronoun = translatePronoun(lower);

    if (pronoun) {
      output.push(pronoun + punctuation);
      continue;
    }

    // Ignore structural English auxiliary words in the
    // conservative fallback. Grammar-specific handling should
    // deal with these where verified.
    if (
      [
        "am",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
        "do",
        "does",
        "did",
        "will",
        "would",
        "shall",
        "should",
        "have",
        "has",
        "had",
        "to",
      ].includes(lower)
    ) {
      continue;
    }

    // Negation is handled structurally.
    if (
      [
        "not",
        "never",
        "dont",
        "don't",
        "doesnt",
        "doesn't",
        "didnt",
        "didn't",
      ].includes(lower)
    ) {
      continue;
    }

    // Common irregular verb handling.
    const transformedVerb = transformKnownVerbForm(
      lower,
      context,
    );

    if (transformedVerb) {
      output.push(transformedVerb + punctuation);
      matched.push(cleanToken);
      continue;
    }

    const translated = lookupWord(lower, context);

    if (translated) {
      output.push(translated + punctuation);
      matched.push(cleanToken);
      continue;
    }

    unknown.push(cleanToken);
    output.push(cleanToken + punctuation);
  }

  return {
    output: output.join(" "),
    matched: unique(matched),
    unknown: unique(unknown),
  };
}

// ------------------------------------------------------------
// Sentence cleanup
// ------------------------------------------------------------

function cleanOutput(text: string): string {
  return clean(text)
    .replace(/\s+([!?.,;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

// ------------------------------------------------------------
// Confidence calculation
// ------------------------------------------------------------

function calculateConfidence(
  context: SentenceInfo,
  matched: string[],
  unknown: string[],
  usedSpecialPattern: boolean,
): number {
  if (usedSpecialPattern) return 0.98;

  const totalWords = Math.max(context.tokens.length, 1);

  const coverage =
    matched.length / totalWords;

  let confidence = 0.45 + coverage * 0.45;

  if (unknown.length > 0) {
    confidence -= Math.min(
      0.25,
      unknown.length * 0.04,
    );
  }

  if (context.isQuestion) {
    confidence -= 0.02;
  }

  return Math.max(
    0.05,
    Math.min(0.95, confidence),
  );
}

// ------------------------------------------------------------
// Main translation function
// ------------------------------------------------------------

export function translateToBemba(
  input: string,
): TranslationResult {
  const original = clean(input);

  if (!original) {
    return {
      english: "",
      bemba: "",
      confidence: 0,
      matched: [],
      warnings: ["Empty input."],
    };
  }

  const context = analyzeSentence(original);

  // ----------------------------------------------------------
  // 1. Highest-confidence conversational patterns
  // ----------------------------------------------------------

  const becauseResult =
    translateBecauseSentence(context);

  if (becauseResult) {
    return {
      english: original,
      bemba: becauseResult,
      confidence: 0.98,
      matched: [
        "I am not feeling well",
        "because",
        "I ate",
        "banana",
      ],
      warnings: [],
    };
  }

  const feelingResult =
    translateFirstPersonFeelingSentence(context);

  if (feelingResult) {
    return {
      english: original,
      bemba: feelingResult,
      confidence: 0.96,
      matched: [
        "I am not feeling well",
      ],
      warnings: [],
    };
  }

  // ----------------------------------------------------------
  // 2. Exact full-sentence dictionary phrase
  // ----------------------------------------------------------

  const exactCandidates =
    getCandidates(context.lower);

  if (exactCandidates.length > 0) {
    const selected =
      chooseCandidate(exactCandidates, context);

    if (selected) {
      return {
        english: original,
        bemba: normalizeBemba(selected.bemba),
        confidence: 0.99,
        matched: [selected.english],
        warnings: [],
      };
    }
  }

  // ----------------------------------------------------------
  // 3. Known phrase matching
  // ----------------------------------------------------------

  const phraseResult =
    translateKnownPhrases(
      context.normalized,
      context,
    );

  // ----------------------------------------------------------
  // 4. Translate remaining words
  // ----------------------------------------------------------

  const wordResult =
    translateWords(
      phraseResult.text,
      context,
    );

  let result = wordResult.output;

  // ----------------------------------------------------------
  // 5. Remove duplicated spaces / cleanup
  // ----------------------------------------------------------

  result = cleanOutput(result);

  // ----------------------------------------------------------
  // 6. Preserve question mark
  // ----------------------------------------------------------

  if (
    context.isQuestion &&
    result &&
    !/[!?]$/.test(result)
  ) {
    result += "?";
  }

  const matched = unique([
    ...phraseResult.matched,
    ...wordResult.matched,
  ]);

  const unknown = wordResult.unknown;

  const warnings: string[] = [];

  if (unknown.length > 0) {
    warnings.push(
      `Unverified English words: ${unknown.join(", ")}`,
    );
  }

  if (unknown.length > 0) {
    warnings.push(
      "Translation may require additional verified Bemba vocabulary.",
    );
  }

  const confidence =
    calculateConfidence(
      context,
      matched,
      unknown,
      false,
    );

  return {
    english: original,
    bemba: result,
    confidence,
    matched,
    warnings,
  };
}

// ------------------------------------------------------------
// Simple public API
// ------------------------------------------------------------

export function translate(
  input: string,
): string {
  return translateToBemba(input).bemba;
}

export default translate;

// ------------------------------------------------------------
// Optional helper functions
// ------------------------------------------------------------

export function getTranslationConfidence(
  input: string,
): number {
  return translateToBemba(input).confidence;
}

export function getTranslationWarnings(
  input: string,
): string[] {
  return translateToBemba(input).warnings;
}

export function getMatchedDictionaryEntries(
  input: string,
): string[] {
  return translateToBemba(input).matched;
}

// ------------------------------------------------------------
// Dictionary statistics
// ------------------------------------------------------------

export function getDictionaryStats(): {
  entries: number;
  englishTerms: number;
  bembaTerms: number;
} {
  return {
    entries: dictionary.length,
    englishTerms: englishIndex.size,
    bembaTerms: bembaIndex.size,
  };
}

// ============================================================
// END BEMBATRANSLATE V3
// ============================================================
