import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

const dictionary = bembaDictionary as BembaEntry[];

/**
 * Normalize English/Bemba text so matching is reliable.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'.,!?;:()[\]{}]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Find an exact phrase in the dictionary.
 */
function findExactTranslation(text: string): string | undefined {
  const normalized = normalize(text);

  if (!normalized) {
    return undefined;
  }

  const entry = dictionary.find(
    (item) => normalize(item.english) === normalized
  );

  return entry?.bemba;
}

/**
 * Create a lookup table for faster word/phrase matching.
 */
const dictionaryLookup = new Map<string, string>();

for (const entry of dictionary) {
  const english = normalize(entry.english);
  const bemba = entry.bemba.trim();

  if (english && bemba) {
    dictionaryLookup.set(english, bemba);
  }
}

/**
 * Find the longest matching dictionary phrase
 * starting at a specific word position.
 *
 * Example:
 * "good morning everyone"
 *
 * will try:
 * "good morning everyone"
 * "good morning"
 * "good"
 */
function findLongestMatch(
  words: string[],
  startIndex: number
): { translation: string; length: number } | undefined {
  const remaining = words.length - startIndex;

  for (let length = remaining; length >= 1; length--) {
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
 * Translate an English sentence using the local dictionary.
 *
 * Priority:
 * 1. Exact full-sentence match
 * 2. Longest dictionary phrases
 * 3. Individual dictionary words
 * 4. Keep unknown words unchanged
 */
export function translateEnglishToBemba(text: string): string {
  const input = normalize(text);

  if (!input) {
    return "";
  }

  // 1. Always give an exact phrase the highest priority.
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
      // Keep unknown English words instead of deleting them.
      result.push(words[index]);
      index++;
    }
  }

  return result.join(" ");
}

/**
 * Safe fallback used by the application.
 */
export function translateWithFallback(text: string): string {
  try {
    return translateEnglishToBemba(text);
  } catch (error) {
    console.error("[Bemba Translator] Translation error:", error);
    return "";
  }
}
