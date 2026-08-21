import { bembaDictionary } from "../data/bembaDictionary";

type Dictionary = Record<string, string>;

const dictionary = bembaDictionary as Dictionary;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}

export function translateEnglishToBemba(text: string): string {
  const input = normalize(text);

  if (!input) {
    return "";
  }

  if (dictionary[input]) {
    return dictionary[input];
  }

  const words = input.split(" ");

  return words
    .map((word) => dictionary[word] ?? word)
    .join(" ");
}

export function translateWithFallback(text: string): string {
  return translateEnglishToBemba(text);
}
