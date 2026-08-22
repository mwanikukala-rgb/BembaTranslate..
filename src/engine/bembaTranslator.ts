import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

const dictionary = bembaDictionary as BembaEntry[];

/**
 * Normalize text for reliable offline matching.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'.,!?;:()[\]{}]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Local dictionary lookup.
 *
 * Everything stays inside the application.
 * No internet, API, cloud service, or model is used.
 */
const dictionaryLookup = new Map<string, string>();

for (const entry of dictionary) {
  const english = normalize(entry.english);
  const bemba = entry.bemba.trim();

  if (!english || !bemba) {
    continue;
  }

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
 * Find the longest dictionary phrase starting
 * at the specified word.
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
 * Translate English to Bemba completely offline.
 *
 * Priority:
 *
 * 1. Exact full phrase
 * 2. Longest known phrase
 * 3. Individual known words
 * 4. Unknown words remain unchanged
 */
export function translateEnglishToBemba(
  text: string
): string {
  const input = normalize(text);

  if (!input) {
    return "";
  }

  // Exact phrase has highest priority.
  const exact = findExactTranslation(input);

  if (exact) {
    return exact;
  }

  const words = input.split(" ");
  const result: string[] = [];

  let index = 0;

  while (index < words.length) {
    const match = findLongestMatch(words, index);

    if (match) {
      result.push(match.translation);
      index += match.length;
    } else {
      // Preserve words that are not yet in the dictionary.
      result.push(words[index]);
      index++;
    }
  }

  return result.join(" ");
}

/**
 * Safe translation function for the application UI.
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
 * Check whether an exact English word or phrase
 * exists in the local dictionary.
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
 * Get an exact dictionary translation.
 */
export function getBembaTranslation(
  text: string
): string | undefined {
  return findExactTranslation(text);
}
