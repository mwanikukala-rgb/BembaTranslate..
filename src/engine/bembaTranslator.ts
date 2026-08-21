import { bembaDictionary } from "../data/bembaDictionary";

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

  if (bembaDictionary[input]) {
    return bembaDictionary[input];
  }

  const words = input.split(" ");

  return words
    .map((word) => bembaDictionary[word] ?? word)
    .join(" ");
}

export function translateWithFallback(text: string): string {
  return translateEnglishToBemba(text);
}
