Improved Offline Translation Engine

import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

const dictionary = bembaDictionary as BembaEntry[];

/**
 * Normalize text for reliable offline matching.
 *
 * Examples:
 * "Good Morning!" -> "good morning"
 * "  Where are you? " -> "where are you"
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'.,!?;:()[\]{}]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Build a fast dictionary lookup.
 *
 * Longer phrases are kept intact so that:
 *
 * "thank you very much"
 *
 * is translated as one phrase instead of:
 *
 * "thank" + "you" + "very" + "much"
 */
const dictionaryLookup = new Map<string, string>();

for (const entry of dictionary) {
  const english = normalize(entry.english);
  const bemba = entry.bemba.trim();

  if (!english || !bemba) continue;

  dictionaryLookup.set(english, bemba);
}

/**
 * Find an exact complete phrase.
 */
function findExactTranslation(
  text: string
): string | undefined {
  const normalized = normalize(text);

  if (!normalized) {
    return undefined;
  }

  return dictionaryLookup.get(normalized);
}

/**
 * Find the longest dictionary phrase beginning
 * at the current word.
 */
function findLongestMatch(
  words: string[],
  startIndex: number
): {
  translation: string;
  length: number;
} | undefined {
  const remaining = words.length - startIndex;

  for (
    let length = remaining;
    length >= 1;
    length--
  ) {
    const phrase = words
      .slice(startIndex, startIndex + length)
      .join(" ");

    const translation = dictionaryLookup.get(phrase);

    if (translation) {
      return {
        translation,
        length,
      };
    }
  }

  return undefined;
}

/**
 * Main offline English → Bemba translator.
 *
 * Priority:
 *
 * 1. Exact complete phrase
 * 2. Longest known phrase
 * 3. Individual known word
 * 4. Unknown words are preserved
 */
export function translateEnglishToBemba(
  text: string
): string {
  const input = normalize(text);

  if (!input) {
    return "";
  }

  // -------------------------------------------------------
  // 1. Exact phrase match
  // -------------------------------------------------------

  const exact = findExactTranslation(input);

  if (exact) {
    return exact;
  }

  // -------------------------------------------------------
  // 2. Phrase-by-phrase translation
  // -------------------------------------------------------

  const words = input.split(" ");

  const result: string[] = [];

  let index = 0;

  while (index < words.length) {
    const match = findLongestMatch(words, index);

    if (match) {
      result.push(match.translation);
      index += match.length;
      continue;
    }

    // -----------------------------------------------------
    // 3. Unknown word
    //
    // Keep it instead of deleting it.
    // -----------------------------------------------------

    result.push(words[index]);
    index++;
  }

  return result.join(" ");
}

/**
 * Safe application-level translation function.
 *
 * The UI should call this function rather than
 * accessing the dictionary directly.
 */
export function translateWithFallback(
  text: string
): string {
  try {
    return translateEnglishToBemba(text);
  } catch (error) {
    console.error(
      "[Bemba Translator] Translation error:",
      error
    );

    return "";
  }
}

/**
 * Check whether a word or phrase exists
 * in the local dictionary.
 */
export function hasBembaTranslation(
  text: string
): boolean {
  const normalized = normalize(text);

  if (!normalized) {
    return false;
  }

  return dictionaryLookup.has(normalized);
}

/**
 * Get the dictionary translation directly.
 *
 * Returns undefined when the phrase is not found.
 */
export function getBembaTranslation(
  text: string
): string | undefined {
  return findExactTranslation(text);
}
