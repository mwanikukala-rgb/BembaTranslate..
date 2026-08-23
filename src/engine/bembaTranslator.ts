import { bembaDictionary } from "../data/bembaDictionary";

/* ============================================================
   BEMBATRANSLATE — OFFLINE ENGLISH → BEMBA ENGINE
   ============================================================

   IMPORTANT:
   - The complete local bembaDictionary is used.
   - No internet/API/cloud is required.
   - Exact dictionary entries always have priority.
   - Phrase matching is performed before individual words.
   - Fuzzy matching is intentionally NOT used because it can
     produce completely unrelated translations.
   - Duplicate English entries are preserved as alternatives.
   ============================================================ */

export type BembaEntry = {
  english: string;
  bemba: string;
};

/* ============================================================
   DICTIONARY SOURCE
============================================================ */

const dictionary: BembaEntry[] = Array.isArray(
  bembaDictionary
)
  ? (bembaDictionary as BembaEntry[])
  : [];

/* ============================================================
   NORMALIZATION
============================================================ */

/**
 * Normalize English/Bemba lookup text.
 *
 * We remove accents for lookup purposes only.
 * The original Bemba translation is NEVER modified.
 */
function normalize(text: string): string {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[“”‘’"'`]/g, "")
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Used for displaying Bemba.
 * We deliberately do NOT remove diacritics here.
 */
function cleanTranslation(text: string): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ============================================================
   DICTIONARY INDEXES
============================================================ */

/**
 * First/default translation for each normalized English term.
 */
const dictionaryLookup = new Map<string, string>();

/**
 * All translations for an English term.
 *
 * Example:
 *
 * English:
 *   word
 *
 * Possible Bemba:
 *   ...
 *   ...
 */
const dictionaryAlternatives = new Map<string, string[]>();

/**
 * English keys, sorted from longest to shortest.
 *
 * This makes phrase matching efficient.
 */
const dictionaryKeys: string[] = [];

/* ============================================================
   BUILD DICTIONARY INDEX
============================================================ */

for (const entry of dictionary) {
  if (!entry) {
    continue;
  }

  if (
    typeof entry.english !== "string" ||
    typeof entry.bemba !== "string"
  ) {
    continue;
  }

  const english = normalize(entry.english);
  const bemba = cleanTranslation(entry.bemba);

  if (!english || !bemba) {
    continue;
  }

  /* First translation becomes the primary translation. */
  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(english, bemba);
  }

  /* Preserve all different translations. */
  const alternatives =
    dictionaryAlternatives.get(english) ?? [];

  if (!alternatives.includes(bemba)) {
    alternatives.push(bemba);
  }

  dictionaryAlternatives.set(
    english,
    alternatives
  );
}

/* Build and sort dictionary keys once. */
for (const key of dictionaryLookup.keys()) {
  dictionaryKeys.push(key);
}

dictionaryKeys.sort(
  (a, b) => {
    const wordDifference =
      b.split(" ").length -
      a.split(" ").length;

    if (wordDifference !== 0) {
      return wordDifference;
    }

    return b.length - a.length;
  }
);

/* ============================================================
   CONTRACTIONS
============================================================ */

const contractionMap: Record<string, string> = {
  "i'm": "i am",
  "im": "i am",

  "you're": "you are",
  "youre": "you are",

  "he's": "he is",
  "hes": "he is",

  "she's": "she is",
  "shes": "she is",

  "it's": "it is",
  "its": "it is",

  "we're": "we are",
  "were": "we are",

  "they're": "they are",
  "theyre": "they are",

  "i've": "i have",
  "ive": "i have",

  "you've": "you have",
  "youve": "you have",

  "we've": "we have",
  "weve": "we have",

  "they've": "they have",
  "theyve": "they have",

  "can't": "cannot",
  "cant": "cannot",

  "don't": "do not",
  "dont": "do not",

  "doesn't": "does not",
  "doesnt": "does not",

  "didn't": "did not",
  "didnt": "did not",

  "isn't": "is not",
  "isnt": "is not",

  "aren't": "are not",
  "arent": "are not",

  "wasn't": "was not",
  "wasnt": "was not",

  "weren't": "were not",
  "werent": "were not",

  "won't": "will not",
  "wont": "will not",

  "wouldn't": "would not",
  "wouldnt": "would not",

  "couldn't": "could not",
  "couldnt": "could not",

  "shouldn't": "should not",
  "shouldnt": "should not",
};

/* ============================================================
   EXPAND CONTRACTIONS
============================================================ */

function expandContractions(
  text: string
): string {
  let result = String(text ?? "");

  for (const [from, to] of Object.entries(
    contractionMap
  )) {
    const escaped = from.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    result = result.replace(
      new RegExp(
        `\\b${escaped}\\b`,
        "gi"
      ),
      to
    );
  }

  return result;
}

/* ============================================================
   TOKENIZATION
============================================================ */

function tokenize(
  text: string
): string[] {
  const normalized = normalize(
    expandContractions(text)
  );

  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .filter(Boolean);
}

/* ============================================================
   COMMON ENGLISH ALIASES
============================================================ */

const englishAliases: Record<
  string,
  string
> = {
  ill: "sick",
  unwell: "sick",

  purchase: "buy",
  purchases: "buy",
  purchased: "buy",
  buying: "buy",
  buys: "buy",

  sold: "sell",
  selling: "sell",
  sells: "sell",

  wanted: "want",
  wants: "want",
  wanting: "want",

  worked: "work",
  working: "work",
  works: "work",

  visited: "visit",
  visiting: "visit",
  visits: "visit",

  waited: "wait",
  waiting: "wait",
  waits: "wait",

  walked: "walk",
  walking: "walk",
  walks: "walk",

  travelled: "travel",
  traveled: "travel",
  travelling: "travel",
  traveling: "travel",

  talked: "talk",
  talking: "talk",
  talks: "talk",

  spoke: "speak",
  speaking: "speak",
  speaks: "speak",

  taught: "teach",
  teaching: "teach",
  teaches: "teach",

  wrote: "write",
  writing: "write",
  writes: "write",

  washed: "wash",
  washing: "wash",
  washes: "wash",

  looked: "look",
  looking: "look",
  looks: "look",

  remembered: "remember",
  remembering: "remember",
  remembers: "remember",

  helped: "help",
  helping: "help",
  helps: "help",

  learned: "learn",
  learnt: "learn",
  learning: "learn",
  learns: "learn",

  sat: "sit",
  sitting: "sit",
  sits: "sit",

  stayed: "stay",
  staying: "stay",
  stays: "stay",

  went: "go",
  going: "go",
  goes: "go",

  came: "come",
  coming: "come",
  comes: "come",

  saying: "speak",
  said: "speak",

  slept: "sleep",
  sleeping: "sleep",
  sleeps: "sleep",

  ate: "eat",
  eating: "eat",
  eats: "eat",

  drank: "drink",
  drinking: "drink",
  drinks: "drink",
};

/* ============================================================
   IMPORTANT EVERYDAY PHRASES
============================================================ */

const importantPhrases = new Map<
  string,
  string
>([
  ["how are you", "Mulishani?"],
  ["good morning", "Mwashibukeni!"],
  ["good afternoon", "Kasuba mukwai"],
  ["good evening", "Chungulo mukwai"],
  ["good night", "Sendameenipo"],
  ["goodbye", "Shalenipo"],

  ["thank you", "Natotela"],
  ["thanks", "Natotela"],
  ["thanks a lot", "Natotela saana"],

  ["a lot", "Saana"],

  ["yes", "Ee"],
  ["no", "Awe"],

  ["where are you", "Ulikwisa?"],
  ["where are they", "Balikwisa?"],

  ["i want money", "Ndefwaya indalama"],

  ["i am angry", "Nimfulwa"],
  ["i'm angry", "Nimfulwa"],

  ["i am sick", "Ndelwala"],
  ["i'm sick", "Ndelwala"],
]);

/* ============================================================
   BASIC ENGLISH WORDS THAT SHOULD NOT BE TRANSLATED
   AS LITERAL BEMBA WORDS
============================================================ */

const grammaticalWords = new Set([
  "a",
  "an",
  "the",

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
  "can",
  "could",
  "should",
  "must",

  "to",

  "and",
  "or",
  "but",

  "of",
  "for",
  "with",
  "from",
  "in",
  "on",
  "at",
  "by",
  "as",

  "not",
]);

/* ============================================================
   LOOKUP
============================================================ */

function lookupEnglish(
  word: string
): string | undefined {
  const normalized = normalize(word);

  if (!normalized) {
    return undefined;
  }

  /* ========================================================
     1. Exact dictionary match
     ======================================================== */

  const direct =
    dictionaryLookup.get(normalized);

  if (direct) {
    return direct;
  }

  /* ========================================================
     2. Alias match
     ======================================================== */

  const alias =
    englishAliases[normalized];

  if (alias)
