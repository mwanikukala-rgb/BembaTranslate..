import { findBembaWord } from "../data/bembaDictionary";

export type TranslationResult = {
  original: string;
  translated: string;
  matchedWords: number;
  totalWords: number;
  confidence: number;
};

const punctuationRegex = /[.,!?;:()[\]{}"]/g;

function cleanWord(word: string): string {
  return word
    .toLowerCase()
    .replace(punctuationRegex, "")
    .trim();
}

export function translateEnglishToBemba(
  text: string
): TranslationResult {
  const original = text.trim();

  if (!original) {
    return {
      original: "",
      translated: "",
      matchedWords: 0,
      totalWords: 0,
      confidence: 0,
    };
  }

  const words = original
    .split(/\s+/)
    .filter(Boolean);

  let matchedWords = 0;

  const translatedWords = words.map((word) => {
    const cleaned = cleanWord(word);
    const entry = findBembaWord(cleaned);

    if (entry) {
      matchedWords++;
      return entry.bemba;
    }

    return word;
  });

  const translated = translatedWords.join(" ");

  const confidence =
    words.length === 0
      ? 0
      : Math.round((matchedWords / words.length) * 100);

  return {
    original,
    translated,
    matchedWords,
    totalWords: words.length,
    confidence,
  };
}
