// src/engine/bembaTranslator.ts

import {
  bembaDictionary,
  BembaDictionaryEntry,
} from "../data/bembaDictionary";

/**
 * BembaTranslate translation engine
 *
 * IMPORTANT:
 * The dictionary is the PRIMARY source of translation.
 *
 * Translation order:
 *
 * 1. Exact phrase from the FULL dictionary
 * 2. Normalized exact phrase from the FULL dictionary
 * 3. Dictionary phrase matching
 * 4. Dictionary word-by-word matching
 * 5. Very limited grammatical fallback
 *
 * The engine must NEVER replace a dictionary translation
 * with an invented translation when a dictionary match exists.
 *
 * Offline:
 * - No API
 * - No internet
 * - No cloud
 * - No external model
 */

/* =========================================================
   TYPES
   ========================================================= */

export type TranslationResult = {
  english: string;
  bemba: string;
  matched: boolean;
  confidence: "exact" | "phrase" | "dictionary" | "fallback";
};

/* =========================================================
   NORMALIZATION
   ========================================================= */

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[“”"']/g, "")
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForSearch(text: string): string {
  return normalize(text)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   CONTRACTIONS
   ========================================================= */

function expandContractions(text: string): string {
  let result = ` ${text} `;

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
    "he'll": "he will",
    "hell": "he will",

    "she's": "she is",
    "shes": "she is",
    "she'll": "she will",
    "shell": "she will",

    "it's": "it is",
    "its": "it is",
    "it'll": "it will",
    "itll": "it will",

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
    "shouldn't": "should not",
    "shouldnt": "should not",
    "couldn't": "could not",
    "couldnt": "could not",
  };

  for (const [from, to] of Object.entries(contractions)) {
    result = result.replace(
      new RegExp(`\\s${escapeRegExp(from)}\\s`, "gi"),
      ` ${to} `,
    );
  }

  return result.trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* =========================================================
   DICTIONARY INDEX
   ========================================================= */

/**
 * Build indexes from EVERY entry in the dictionary.
 *
 * We deliberately do not select only a small subset.
 */
const dictionaryEntries: BembaDictionaryEntry[] =
  Array.isArray(bembaDictionary)
    ? bembaDictionary.filter(
        (entry): entry is BembaDictionaryEntry =>
          !!entry &&
          typeof entry.english === "string" &&
          typeof entry.bemba === "string" &&
          entry.english.trim().length > 0 &&
          entry.bemba.trim().length > 0,
      )
    : [];

type IndexedEntry = BembaDictionaryEntry & {
  normalizedEnglish: string;
  words: string[];
};

const indexedDictionary: IndexedEntry[] = dictionaryEntries.map((entry) => {
  const normalizedEnglish = normalizeForSearch(entry.english);

  return {
    ...entry,
    normalizedEnglish,
    words: normalizedEnglish.split(" ").filter(Boolean),
  };
});

/**
 * Exact lookup map.
 *
 * IMPORTANT:
 * We preserve the FIRST dictionary entry for a phrase.
 * This means the dictionary itself controls the answer.
 */
const exactDictionary = new Map<string, string>();

for (const entry of indexedDictionary) {
  if (!exactDictionary.has(entry.normalizedEnglish)) {
    exactDictionary.set(entry.normalizedEnglish, entry.bemba);
  }
}

/* =========================================================
   DICTIONARY SEARCH
   ========================================================= */

/**
 * Search the WHOLE dictionary for an exact English phrase.
 */
function lookupExactDictionary(english: string): string | null {
  const key = normalizeForSearch(english);

  if (!key) {
    return null;
  }

  return exactDictionary.get(key) ?? null;
}

/**
 * Search the WHOLE dictionary case-insensitively and
 * accent-insensitively.
 */
function lookupEnglish(english: string): string | null {
  const normalized = normalizeForSearch(english);

  if (!normalized) {
    return null;
  }

  // First exact lookup.
  const exact = exactDictionary.get(normalized);

  if (exact) {
    return exact;
  }

  // Second complete scan.
  for (const entry of indexedDictionary) {
    if (entry.normalizedEnglish === normalized) {
      return entry.bemba;
    }
  }

  return null;
}

/* =========================================================
   PHRASE MATCHING
   ========================================================= */

/**
 * Find dictionary phrases inside a longer sentence.
 *
 * Longest phrases are checked first so:
 *
 * "good morning"
 *
 * is selected before:
 *
 * "good"
 * "morning"
 */
function findPhraseMatches(
  sentence: string,
): Array<{
  start: number;
  end: number;
  english: string;
  bemba: string;
}> {
  const words = normalizeForSearch(sentence).split(" ").filter(Boolean);

  const matches: Array<{
    start: number;
    end: number;
    english: string;
    bemba: string;
  }> = [];

  if (words.length === 0) {
    return matches;
  }

  // Longest dictionary phrases first.
  const candidates = [...indexedDictionary].sort(
    (a, b) => b.words.length - a.words.length,
  );

  for (let i = 0; i < words.length; i++) {
    let best:
      | {
          start: number;
          end: number;
          english: string;
          bemba: string;
        }
      | null = null;

    for (const entry of candidates) {
      const length = entry.words.length;

      if (length === 0) {
        continue;
      }

      if (i + length > words.length) {
        continue;
      }

      let matchesEntry = true;

      for (let j = 0; j < length; j++) {
        if (words[i + j] !== entry.words[j]) {
          matchesEntry = false;
          break;
        }
      }

      if (matchesEntry) {
        best = {
          start: i,
          end: i + length,
          english: entry.english,
          bemba: entry.bemba,
        };

        break;
      }
    }

    if (best) {
      matches.push(best);
      i = best.end - 1;
    }
  }

  return matches;
}

/* =========================================================
   WORD LOOKUP
   ========================================================= */

/**
 * Search every dictionary entry for a single English word.
 */
function lookupWord(word: string): string | null {
  const normalized = normalizeForSearch(word);

  if (!normalized) {
    return null;
  }

  // Prefer exact single-word entries.
  for (const entry of indexedDictionary) {
    if (
      entry.words.length === 1 &&
      entry.normalizedEnglish === normalized
    ) {
      return entry.bemba;
    }
  }

  return null;
}

/* =========================================================
   WORD-BY-WORD DICTIONARY TRANSLATION
   ========================================================= */

function translateUsingDictionaryWords(sentence: string): {
  translation: string;
  matchedWords: number;
  totalWords: number;
} {
  const normalized = normalizeForSearch(sentence);
  const words = normalized.split(" ").filter(Boolean);

  if (words.length === 0) {
    return {
      translation: "",
      matchedWords: 0,
      totalWords: 0,
    };
  }

  const output: string[] = [];
  let matchedWords = 0;

  for (const word of words) {
    const translated = lookupWord(word);

    if (translated) {
      output.push(translated);
      matchedWords++;
    } else {
      // Preserve unknown words rather than inventing a Bemba word.
      output.push(word);
    }
  }

  return {
    translation: output.join(" "),
    matchedWords,
    totalWords: words.length,
  };
}

/* =========================================================
   PHRASE TRANSLATION
   ========================================================= */

function translateUsingDictionaryPhrases(sentence: string): {
  translation: string;
  matched: boolean;
} {
  const normalized = normalizeForSearch(sentence);

  if (!normalized) {
    return {
      translation: "",
      matched: false,
    };
  }

  const words = normalized.split(" ").filter(Boolean);

  const matches = findPhraseMatches(normalized);

  if (matches.length === 0) {
    return {
      translation: "",
      matched: false,
    };
  }

  const output: string[] = [];
  let current = 0;

  for (const match of matches) {
    // Words before this phrase.
    while (current < match.start) {
      const word = words[current];
      const translated = lookupWord(word);

      output.push(translated ?? word);
      current++;
    }

    output.push(match.bemba);
    current = match.end;
  }

  // Remaining words.
  while (current < words.length) {
    const word = words[current];
    const translated = lookupWord(word);

    output.push(translated ?? word);
    current++;
  }

  return {
    translation: output.join(" "),
    matched: true,
  };
}

/* =========================================================
   SPECIAL DICTIONARY-FIRST PROTECTION
   ========================================================= */

/**
 * These are NOT translations.
 *
 * They only prevent the grammatical fallback from interfering
 * with common dictionary phrases.
 *
 * The actual Bemba answer still comes from the dictionary.
 */
function dictionaryFirst(sentence: string): string | null {
  // Exact complete phrase.
  const exact = lookupExactDictionary(sentence);

  if (exact) {
    return exact;
  }

  // Expanded contraction phrase.
  const expanded = expandContractions(sentence);
  const expandedResult = lookupExactDictionary(expanded);

  if (expandedResult) {
    return expandedResult;
  }

  return null;
}

/* =========================================================
   LIMITED FALLBACK
   ========================================================= */

/**
 * Very conservative fallback.
 *
 * IMPORTANT:
 * This function does NOT try to become a second dictionary.
 *
 * If the dictionary does not know a word, we leave it alone.
 */
function fallbackTranslate(sentence: string): string {
  const normalized = normalizeForSearch(sentence);

  if (!normalized) {
    return "";
  }

  /*
   * Only use dictionary words here.
   *
   * This prevents errors such as:
   *
   * money -> kolwe
   *
   * when "money" exists in the user's dictionary.
   */

  const result = translateUsingDictionaryWords(normalized);

  if (result.matchedWords > 0) {
    return result.translation;
  }

  // Unknown English is returned unchanged rather than
  // fabricating a Bemba translation.
  return sentence.trim();
}

/* =========================================================
   MAIN TRANSLATOR
   ========================================================= */

export function translateWithFallback(
  input: string,
): TranslationResult {
  const original = input?.trim() ?? "";

  if (!original) {
    return {
      english: "",
      bemba: "",
      matched: false,
      confidence: "fallback",
    };
  }

  /* -------------------------------------------------------
     STEP 1
     EXACT COMPLETE DICTIONARY MATCH
     ------------------------------------------------------- */

  const exact = dictionaryFirst(original);

  if (exact) {
    return {
      english: original,
      bemba: exact,
      matched: true,
      confidence: "exact",
    };
  }

  /* -------------------------------------------------------
     STEP 2
     NORMALIZED COMPLETE DICTIONARY MATCH
     ------------------------------------------------------- */

  const normalized = normalizeForSearch(original);

  const normalizedExact = lookupEnglish(normalized);

  if (normalizedExact) {
    return {
      english: original,
      bemba: normalizedExact,
      matched: true,
      confidence: "exact",
    };
  }

  /* -------------------------------------------------------
     STEP 3
     LONG PHRASE MATCHING FROM WHOLE DICTIONARY
     ------------------------------------------------------- */

  const phraseResult = translateUsingDictionaryPhrases(
    expandContractions(normalized),
  );

  if (phraseResult.matched) {
    return {
      english: original,
      bemba: phraseResult.translation,
      matched: true,
      confidence: "phrase",
    };
  }

  /* -------------------------------------------------------
     STEP 4
     WORD-BY-WORD LOOKUP FROM WHOLE DICTIONARY
     ------------------------------------------------------- */

  const dictionaryWords =
    translateUsingDictionaryWords(normalized);

  if (
    dictionaryWords.matchedWords > 0 &&
    dictionaryWords.matchedWords === dictionaryWords.totalWords
  ) {
    return {
      english: original,
      bemba: dictionaryWords.translation,
      matched: true,
      confidence: "dictionary",
    };
  }

  /* -------------------------------------------------------
     STEP 5
     PARTIAL DICTIONARY MATCH
     ------------------------------------------------------- */

  if (dictionaryWords.matchedWords > 0) {
    return {
      english: original,
      bemba: dictionaryWords.translation,
      matched: true,
      confidence: "dictionary",
    };
  }

  /* -------------------------------------------------------
     STEP 6
     SAFE FALLBACK
     ------------------------------------------------------- */

  return {
    english: original,
    bemba: fallbackTranslate(original),
    matched: false,
    confidence: "fallback",
  };
}

/* =========================================================
   SIMPLE STRING API
   ========================================================= */

/**
 * Convenience function for App.tsx or other UI code.
 */
export function translate(input: string): string {
  return translateWithFallback(input).bemba;
}

/* =========================================================
   DIRECT DICTIONARY LOOKUP API
   ========================================================= */

/**
 * Public function for searching the complete dictionary.
 */
export function searchDictionary(
  english: string,
): BembaDictionaryEntry[] {
  const query = normalizeForSearch(english);

  if (!query) {
    return [];
  }

  return indexedDictionary
    .filter((entry) => {
      return (
        entry.normalizedEnglish === query ||
        entry.normalizedEnglish.includes(query) ||
        query.includes(entry.normalizedEnglish)
      );
    })
    .map(({ english: entryEnglish, bemba }) => ({
      english: entryEnglish,
      bemba,
    }));
}

/* =========================================================
   DICTIONARY STATISTICS
   ========================================================= */

export function getDictionarySize(): number {
  return indexedDictionary.length;
}

/**
 * Useful for testing whether the entire dictionary was loaded.
 */
export function getDictionaryEntries(): BembaDictionaryEntry[] {
  return indexedDictionary.map(({ english, bemba }) => ({
    english,
    bemba,
  }));
}

/* =========================================================
   DEBUG / TEST HELPERS
   ========================================================= */

/**
 * Check exactly what the dictionary says for a word.
 *
 * Example:
 *
 * lookupDictionaryWord("money")
 *
 * should return:
 *
 * "indalama"
 */
export function lookupDictionaryWord(
  english: string,
): string | null {
  return lookupEnglish(english);
}

/**
 * Test several dictionary entries at once.
 */
export function testDictionaryLookup(
  words: string[],
): Array<{
  english: string;
  bemba: string | null;
}> {
  return words.map((english) => ({
    english,
    bemba: lookupDictionaryWord(english),
  }));
}

/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default translate;
