import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

/*
 * ============================================================
 * BEMBATRANSLATE
 * OFFLINE ENGLISH → BEMBA TRANSLATION ENGINE
 * ============================================================
 *
 * The local dictionary is the source of truth.
 *
 * Translation order:
 *
 * 1. Exact important phrase
 * 2. Exact dictionary phrase
 * 3. Normalized dictionary phrase
 * 4. Sentence patterns
 * 5. Verb-root conjugation
 * 6. Possessives
 * 7. Longest dictionary phrase matching
 * 8. Safe word matching
 *
 * IMPORTANT:
 *
 * We deliberately DO NOT aggressively fuzzy-match ordinary
 * sentence words. Bad fuzzy matching was causing unrelated
 * dictionary entries to be returned for words that were not
 * actually present.
 *
 * Example of the old problem:
 *
 *     people are sick
 *
 * could cause:
 *
 *     people -> chikala
 *
 * simply because "people" was not found exactly and the fuzzy
 * engine found a nearby spelling.
 *
 * This version prefers returning no translation rather than
 * inventing an unrelated translation.
 *
 * Completely offline.
 * No API.
 * No cloud.
 * No internet.
 */

/* ============================================================
   DICTIONARY
============================================================ */

const dictionary =
  bembaDictionary as BembaEntry[];

/* ============================================================
   NORMALIZATION
============================================================ */

function normalize(text: string): string {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'`.,!?;:()[\]{}]/g, "")
    .replace(/\s+/g, " ");
}

function cleanTranslation(text: string): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ============================================================
   TOKENIZATION
============================================================ */

function tokenize(text: string): string[] {
  const normalized = normalize(text);

  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .filter(Boolean);
}

/* ============================================================
   DICTIONARY INDEX
============================================================ */

const dictionaryLookup =
  new Map<string, string>();

const dictionaryAlternatives =
  new Map<string, string[]>();

for (const entry of dictionary) {
  if (!entry) continue;

  const english = normalize(entry.english);
  const bemba = cleanTranslation(entry.bemba);

  if (!english || !bemba) {
    continue;
  }

  /*
   * Keep the first dictionary translation as the
   * primary translation.
   */

  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }

  /*
   * Keep all alternatives.
   */

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

/* ============================================================
   CONTRACTIONS
============================================================ */
