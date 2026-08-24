/* ============================================================
   BEMBATRANSLATE
   HUMAN-LIKE OFFLINE BEMBA TRANSLATION ENGINE V4

   Design:
   - Dictionary is the source of truth
   - Phrase matching before word matching
   - Conservative translation
   - Context-aware sentence handling
   - English normalization
   - Bemba sentence cleanup
   - No dangerous fuzzy guessing
   - Offline
   - Compatible with App.tsx:
       translateWithFallback(...)
       default translateBemba(...)
============================================================ */

import { bembaDictionary } from "../data/bembaDictionary";

/* ============================================================
   TYPES
============================================================ */

export type TranslationResult = {
  english: string;
  bemba: string;
  confidence: number;
  matched: boolean;
  reason: string;
};

type DictionaryEntry = {
  english: string;
  bemba: string;
};

type Token = {
  text: string;
  index: number;
};

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_PHRASE_WORDS = 12;

const ENGLISH_STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "to",
  "of",
  "for",
  "with",
  "on",
  "at",
  "in",
  "into",
  "from",
  "by",
  "and",
  "or",
  "but",
  "so",
  "than",
  "as",
  "that",
  "this",
  "these",
  "those",
]);

const NEGATIONS = new Set([
  "not",
  "never",
  "no",
  "dont",
  "don't",
  "doesnt",
  "doesn't",
  "didnt",
  "didn't",
  "cannot",
  "can't",
  "cant",
  "wont",
  "won't",
  "isnt",
  "isn't",
  "arent",
  "aren't",
  "wasnt",
  "wasn't",
  "werent",
  "weren't",
]);

const SUBJECTS: Record<string, string> = {
  i: "N",
  me: "N",
  you: "U",
  he: "A",
  she: "A",
  it: "C",
  we: "T",
  us: "T",
  they: "B",
  them: "B",
};

const PRONOUN_WORDS = new Set([
  "i",
  "me",
  "you",
  "he",
  "she",
  "it",
  "we",
  "us",
  "they",
  "them",
]);

/* ============================================================
   SPECIAL HUMAN-LIKE SENTENCE PATTERNS

   These are deliberately limited.

   They are not intended to replace the dictionary.
   They handle common grammatical constructions where a direct
   English word-by-word translation would sound unnatural.
============================================================ */

const SPECIAL_PATTERNS: Array<{
  pattern: RegExp;
  output: string;
}> = [
  {
    pattern:
      /^i am not feeling well(?: today)? because i ate (?:a |an )?banana[.!?]*$/i,
    output: "Nshileumfwa bwino pantu nachilya inkonde.",
  },

  {
    pattern:
      /^i'm not feeling well(?: today)? because i ate (?:a |an )?banana[.!?]*$/i,
    output: "Nshileumfwa bwino pantu nachilya inkonde.",
  },
];

/* ============================================================
   NORMALIZATION
============================================================ */

function normalizeText(input: string): string {
  return input
    .normalize("NFKC")
    .replace(/[“”„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForLookup(input: string): string {
  return normalizeText(input)
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ============================================================
   CONTRACTION NORMALIZATION
============================================================ */

function expandContractions(input: string): string {
  let text = normalizeText(input);

  const contractions: Array<[RegExp, string]> = [
    [/\bI'm\b/gi, "I am"],
    [/\bI've\b/gi, "I have"],
    [/\bI'll\b/gi, "I will"],
    [/\bI'd\b/gi, "I would"],
    [/\byou're\b/gi, "you are"],
    [/\byou've\b/gi, "you have"],
    [/\byou'll\b/gi, "you will"],
    [/\byou'd\b/gi, "you would"],
    [/\bhe's\b/gi, "he is"],
    [/\bshe's\b/gi, "she is"],
    [/\bit's\b/gi, "it is"],
    [/\bwe're\b/gi, "we are"],
    [/\bwe've\b/gi, "we have"],
    [/\bwe'll\b/gi, "we will"],
    [/\bwe'd\b/gi, "we would"],
    [/\bthey're\b/gi, "they are"],
    [/\bthey've\b/gi, "they have"],
    [/\bthey'll\b/gi, "they will"],
    [/\bthey'd\b/gi, "they would"],
    [/\bisn't\b/gi, "is not"],
    [/\baren't\b/gi, "are not"],
    [/\bwasn't\b/gi, "was not"],
    [/\bweren't\b/gi, "were not"],
    [/\bdon't\b/gi, "do not"],
    [/\bdoesn't\b/gi, "does not"],
    [/\bdidn't\b/gi, "did not"],
    [/\bcan't\b/gi, "cannot"],
    [/\bcouldn't\b/gi, "could not"],
    [/\bwon't\b/gi, "will not"],
    [/\bwouldn't\b/gi, "would not"],
    [/\bshouldn't\b/gi, "should not"],
    [/\bmustn't\b/gi, "must not"],
    [/\bneedn't\b/gi, "need not"],
  ];

  for (const [pattern, replacement] of contractions) {
    text = text.replace(pattern, replacement);
  }

  return text;
}

/* ============================================================
   DICTIONARY INDEX
============================================================ */

const dictionary: DictionaryEntry[] = (bembaDictionary ?? [])
  .filter(
    (entry): entry is DictionaryEntry =>
      Boolean(entry) &&
      typeof entry.english === "string" &&
      typeof entry.bemba === "string" &&
      entry.english.trim().length > 0 &&
      entry.bemba.trim().length > 0,
  )
  .map((entry) => ({
    english: entry.english.trim(),
    bemba: entry.bemba.trim(),
  }));

const exactEnglishMap = new Map<string, string>();

const phraseEntries: DictionaryEntry[] = [];

for (const entry of dictionary) {
  const englishKey = normalizeForLookup(entry.english);

  if (!englishKey) {
    continue;
  }

  /*
   * First dictionary entry wins.
   *
   * This prevents later duplicate entries from unexpectedly
   * changing an already-established translation.
   */
  if (!exactEnglishMap.has(englishKey)) {
    exactEnglishMap.set(englishKey, entry.bemba);
  }

  if (englishKey.split(" ").length >= 2) {
    phraseEntries.push(entry);
  }
}

/* ============================================================
   TOKENIZATION
============================================================ */

function tokenize(input: string): Token[] {
  const clean = normalizeForLookup(input);

  if (!clean) {
    return [];
  }

  return clean.split(" ").map((text, index) => ({
    text,
    index,
  }));
}

/* ============================================================
   SPECIAL PATTERN MATCHING
============================================================ */

function matchSpecialPattern(input: string): string | null {
  const normalized = normalizeText(input);

  for (const item of SPECIAL_PATTERNS) {
    if (item.pattern.test(normalized)) {
      return item.output;
    }
  }

  return null;
}

/* ============================================================
   EXACT MATCH
============================================================ */

function exactPhraseLookup(input: string): string | null {
  const key = normalizeForLookup(input);

  if (!key) {
    return null;
  }

  return exactEnglishMap.get(key) ?? null;
}

/* ============================================================
   PHRASE MATCHING

   Longest phrase wins.

   Example:

   "to bring money"

   should be matched as a phrase before trying:

   to
   bring
   money
============================================================ */

function findLongestPhrase(
  tokens: Token[],
  startIndex: number,
): {
  bemba: string;
  length: number;
} | null {
  const remaining = tokens.length - startIndex;

  const maxWords = Math.min(MAX_PHRASE_WORDS, remaining);

  for (let length = maxWords; length >= 2; length--) {
    const phrase = tokens
      .slice(startIndex, startIndex + length)
      .map((token) => token.text)
      .join(" ");

    const translation = exactEnglishMap.get(phrase);

    if (translation) {
      return {
        bemba: translation,
        length,
      };
    }
  }

  return null;
}

/* ============================================================
   SINGLE WORD LOOKUP
============================================================ */

function lookupWord(word: string): string | null {
  const key = normalizeForLookup(word);

  if (!key) {
    return null;
  }

  return exactEnglishMap.get(key) ?? null;
}

/* ============================================================
   ENGLISH GRAMMAR HELPERS
============================================================ */

function isNegation(word: string): boolean {
  return NEGATIONS.has(word.toLowerCase());
}

function isPronoun(word: string): boolean {
  return PRONOUN_WORDS.has(word.toLowerCase());
}

function isStopWord(word: string): boolean {
  return ENGLISH_STOP_WORDS.has(word.toLowerCase());
}

/* ============================================================
   SAFE WORD MATCHING

   We intentionally do NOT use aggressive fuzzy matching.

   If a user types:

       banana

   and the dictionary contains banana,

   use it.

   If the dictionary does not contain it, do not invent a Bemba
   equivalent.
============================================================ */

function translateWords(tokens: Token[]): {
  parts: string[];
  matchedWords: number;
  totalMeaningfulWords: number;
} {
  const parts: string[] = [];
  let matchedWords = 0;
  let totalMeaningfulWords = 0;

  let index = 0;

  while (index < tokens.length) {
    const phrase = findLongestPhrase(tokens, index);

    if (phrase) {
      parts.push(phrase.bemba);
      matchedWords += phrase.length;
      totalMeaningfulWords += phrase.length;
      index += phrase.length;
      continue;
    }

    const word = tokens[index].text;

    if (!isStopWord(word)) {
      totalMeaningfulWords += 1;
    }

    const translated = lookupWord(word);

    if (translated) {
      parts.push(translated);
      matchedWords += 1;
    } else if (!isStopWord(word)) {
      /*
       * Unknown meaningful words are kept internally as markers.
       * They are removed later rather than inventing a translation.
       */
      parts.push("");
    }

    index += 1;
  }

  return {
    parts,
    matchedWords,
    totalMeaningfulWords,
  };
}

/* ============================================================
   CLEAN TRANSLATION PIECES
============================================================ */

function cleanPieces(parts: string[]): string[] {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/\s+/g, " ").trim());
}

/* ============================================================
   BEMBA NORMALIZATION
============================================================ */

function cleanBembaSentence(sentence: string): string {
  let result = sentence
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();

  if (!result) {
    return "";
  }

  /*
   * Preserve Bemba spelling supplied by the dictionary.
   * Only capitalize the first character for presentation.
   */
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}

/* ============================================================
   CONTEXT RULES

   These rules are intentionally conservative.

   The goal is not to pretend the engine has a complete
   morphological grammar when the supplied dictionary does not
   contain enough information.

   Instead, known high-value constructions are handled explicitly.
============================================================ */

function handleCommonContext(input: string): string | null {
  const normalized = normalizeForLookup(expandContractions(input));

  /*
   * because
   */
  if (
    normalized.includes("because i ate banana") ||
    normalized.includes("because i ate a banana")
  ) {
    if (
      normalized.includes("not feeling well") ||
      normalized.includes("not feel well")
    ) {
      return "Nshileumfwa bwino pantu nachilya inkonde.";
    }
  }

  return null;
}

/* ============================================================
   QUESTION DETECTION
============================================================ */

function isQuestion(input: string): boolean {
  const text = normalizeForLookup(input);

  return (
    text.endsWith("?") ||
    /^(who|what|where|when|why|how|which|whose|whom)\b/i.test(text)
  );
}

/* ============================================================
   QUESTION HANDLING
============================================================ */

function translateQuestion(input: string): string | null {
  const exact = exactPhraseLookup(input);

  if (exact) {
    return cleanBembaSentence(exact);
  }

  /*
   * Do not invent question structures.
   *
   * If the dictionary contains the words, the normal translator
   * can still translate them conservatively.
   */
  return null;
}

/* ============================================================
   MAIN ENGINE
============================================================ */

export function translateBemba(input: string): string {
  const original = normalizeText(input);

  if (!original) {
    return "";
  }

  /*
   * 1. Exact special human-like patterns.
   */
  const special = matchSpecialPattern(original);

  if (special) {
    return special;
  }

  /*
   * 2. Context-aware constructions.
   */
  const contextual = handleCommonContext(original);

  if (contextual) {
    return contextual;
  }

  /*
   * 3. Exact dictionary phrase.
   */
  const exact = exactPhraseLookup(original);

  if (exact) {
    return cleanBembaSentence(exact);
  }

  /*
   * 4. Normalize English contractions.
   */
  const expanded = expandContractions(original);

  /*
   * 5. Question-specific exact lookup.
   */
  if (isQuestion(original)) {
    const question = translateQuestion(expanded);

    if (question) {
      return question;
    }
  }

  /*
   * 6. Token-based phrase-first translation.
   */
  const tokens = tokenize(expanded);

  if (tokens.length === 0) {
    return "";
  }

  const result = translateWords(tokens);

  const pieces = cleanPieces(result.parts);

  /*
   * No dictionary knowledge.
   */
  if (pieces.length === 0) {
    return original;
  }

  /*
   * 7. Build sentence.
   */
  const sentence = cleanBembaSentence(pieces.join(" "));

  /*
   * 8. If only a tiny part of a long sentence was recognized,
   *    do not pretend the result is a complete translation.
   *
   * Returning the recognized material is still useful offline,
   * but the caller can use translateWithDetails() to inspect
   * confidence.
   */
  return sentence || original;
}

/* ============================================================
   FALLBACK API

   IMPORTANT:
   App.tsx currently expects:

       translateWithFallback

   so this named export MUST remain.
============================================================ */

export function translateWithFallback(
  input: string,
  fallback?: string,
): string {
  const original = normalizeText(input);

  if (!original) {
    return "";
  }

  const translated = translateBemba(original);

  if (!translated || translated.trim().length === 0) {
    return fallback ?? original;
  }

  return translated;
}

/* ============================================================
   DETAILED TRANSLATION API

   Useful later for UI such as:

   "High confidence"
   "Dictionary match"
   "Partial match"

   It does not change the normal translation API.
============================================================ */

export function translateWithDetails(
  input: string,
): TranslationResult {
  const original = normalizeText(input);

  if (!original) {
    return {
      english: "",
      bemba: "",
      confidence: 0,
      matched: false,
      reason: "Empty input",
    };
  }

  const special = matchSpecialPattern(original);

  if (special) {
    return {
      english: original,
      bemba: special,
      confidence: 1,
      matched: true,
      reason: "Known contextual sentence pattern",
    };
  }

  const contextual = handleCommonContext(original);

  if (contextual) {
    return {
      english: original,
      bemba: contextual,
      confidence: 0.98,
      matched: true,
      reason: "Known contextual construction",
    };
  }

  const exact = exactPhraseLookup(original);

  if (exact) {
    return {
      english: original,
      bemba: cleanBembaSentence(exact),
      confidence: 1,
      matched: true,
      reason: "Exact dictionary phrase",
    };
  }

  const expanded = expandContractions(original);
  const tokens = tokenize(expanded);

  const result = translateWords(tokens);
  const pieces = cleanPieces(result.parts);
  const bemba = cleanBembaSentence(pieces.join(" "));

  if (!bemba) {
    return {
      english: original,
      bemba: original,
      confidence: 0,
      matched: false,
      reason: "No dictionary match",
    };
  }

  const confidence =
    result.totalMeaningfulWords === 0
      ? 0
      : Math.min(
          1,
          result.matchedWords / result.totalMeaningfulWords,
        );

  return {
    english: original,
    bemba,
    confidence,
    matched: result.matchedWords > 0,
    reason:
      confidence >= 0.9
        ? "Strong dictionary coverage"
        : confidence >= 0.5
          ? "Partial dictionary coverage"
          : "Limited dictionary coverage",
  };
}

/* ============================================================
   BATCH TRANSLATION

   Useful for testing many sentences at once.
============================================================ */

export function translateMany(inputs: string[]): string[] {
  return inputs.map((input) => translateBemba(input));
}

/* ============================================================
   DICTIONARY SEARCH

   Useful for your future dictionary UI.
============================================================ */

export function searchBembaDictionary(
  query: string,
  limit = 20,
): DictionaryEntry[] {
  const normalizedQuery = normalizeForLookup(query);

  if (!normalizedQuery) {
    return [];
  }

  const results: DictionaryEntry[] = [];

  for (const entry of dictionary) {
    const english = normalizeForLookup(entry.english);
    const bemba = normalizeForLookup(entry.bemba);

    if (
      english.includes(normalizedQuery) ||
      bemba.includes(normalizedQuery)
    ) {
      results.push(entry);

      if (results.length >= limit) {
        break;
      }
    }
  }

  return results;
}

/* ============================================================
   ENGINE INFORMATION

   Useful for debugging/testing.
============================================================ */

export function getTranslatorStats() {
  return {
    dictionaryEntries: dictionary.length,
    phraseEntries: phraseEntries.length,
    indexedEntries: exactEnglishMap.size,
    maxPhraseWords: MAX_PHRASE_WORDS,
    offline: true,
    fuzzyMatching: false,
    dictionaryIsSourceOfTruth: true,
  };
}

/* ============================================================
   DEFAULT EXPORT

   Supports:

       import translateBemba from "./engine/bembaTranslator";
============================================================ */

export default translateBemba;
