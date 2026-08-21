import { bembaDictionary } from "../data/bembaDictionary";

type BembaEntry = {
  english: string;
  bemba: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}

function findTranslation(word: string): string | undefined {
  const normalizedWord = normalize(word);

  const entry = (bembaDictionary as BembaEntry[]).find(
    (item) => normalize(item.english) === normalizedWord
  );

  return entry?.bemba;
}

export function translateEnglishToBemba(text: string): string {
  const input = normalize(text);

  if (!input) {
    return "";
  }

  const exact = (bembaDictionary as BembaEntry[]).find(
    (item) => normalize(item.english) === input
  );

  if (exact) {
    return exact.bemba;
  }

  const words = input.split(" ");

  return words
    .map((word) => findTranslation(word) ?? word)
    .join(" ");
}

export function translateWithFallback(text: string): string {
  return translateEnglishToBemba(text);
}
