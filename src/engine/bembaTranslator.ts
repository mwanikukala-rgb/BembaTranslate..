// src/engine/bembaTranslator.ts

import { bembaDictionary } from "../data/bembaDictionary";

/* ============================================================
   BEMBATRANSLATE
   HUMAN-LIKE OFFLINE TRANSLATION ENGINE V3

   PRINCIPLES
   ------------------------------------------------------------
   1. The user's dictionary is the source of truth.
   2. Exact phrases beat individual words.
   3. Multi-word dictionary entries beat single words.
   4. We never invent unknown Bemba vocabulary.
   5. Common English sentence patterns are interpreted.
   6. Pronouns and common auxiliaries are handled conservatively.
   7. Punctuation and capitalization are preserved where possible.
   8. Multiple Bemba alternatives in the dictionary are supported.
   9. English -> Bemba and Bemba -> English are supported.
   10. Unknown words are preserved rather than dangerously guessed.
   11. The engine is fully offline.
   ============================================================ */

export type TranslationDirection =
  | "en-to-bem"
  | "bem-to-en"
  | "english-to-bemba"
  | "bemba-to-english"
  | "en-bem"
  | "bem-en";

export type TranslationResult = {
  input: string;
  output: string;
  direction: TranslationDirection;
  confidence: number;
  matched: string[];
  unknown: string[];
};

type DictionaryItem = {
  english: string;
  bemba: string;
};

type PhraseMatch = {
  start: number;
  end: number;
  source: string;
  target: string;
};

/* ============================================================
   NORMALIZATION
   ============================================================ */

function normalizeSpaces(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWord(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[“”"']/g, "")
    .trim();
}

function cleanDictionaryText(value: string): string {
  return normalizeSpaces(
    value
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function stripPunctuation(value: string): string {
  return value
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return stripPunctuation(value)
    .split(/\s+/)
    .filter(Boolean);
}

function isQuestion(text: string): boolean {
  return /\?\s*$/.test(text.trim());
}

/* ============================================================
   DICTIONARY PREPARATION
   ============================================================ */

const dictionary: DictionaryItem[] = Array.isArray(bembaDictionary)
  ? bembaDictionary
      .filter(
        (entry): entry is DictionaryItem =>
          Boolean(entry) &&
          typeof entry.english === "string" &&
          typeof entry.bemba === "string" &&
          entry.english.trim().length > 0 &&
          entry.bemba.trim().length > 0,
      )
      .map((entry) => ({
        english: cleanDictionaryText(entry.english),
        bemba: cleanDictionaryText(entry.bemba),
      }))
  : [];

function splitAlternatives(value: string): string[] {
  return value
    .split(/\s*\/\s*/)
    .map((item) => cleanDictionaryText(item))
    .filter(Boolean);
}

/*
 * Some dictionary entries contain multiple alternatives:
 *
 * Ukolola/Ukupembela
 *
 * We keep the first alternative as the safest automatic choice.
 * The entire dictionary entry still remains available for lookup.
 */
function primaryAlternative(value: string): string {
  const alternatives = splitAlternatives(value);
  return alternatives.length > 0 ? alternatives[0] : value;
}

const englishExact = new Map<string, string>();
const bembaExact = new Map<string, string>();

for (const entry of dictionary) {
  const englishKey = normalizeWord(entry.english);
  const bembaKey = normalizeWord(entry.bemba);

  if (!englishExact.has(englishKey)) {
    englishExact.set(englishKey, primaryAlternative(entry.bemba));
  }

  if (!bembaExact.has(bembaKey)) {
    bembaExact.set(bembaKey, primaryAlternative(entry.english));
  }
}

/*
 * Longest phrases first.
 *
 * This is important for sentences such as:
 *
 * "to bring money"
 *
 * instead of translating:
 *
 * "to" + "bring" + "money"
 */
const englishEntries = [...dictionary]
  .sort(
    (a, b) =>
      tokenize(b.english).length - tokenize(a.english).length ||
      b.english.length - a.english.length,
  );

const bembaEntries = [...dictionary]
  .sort(
    (a, b) =>
      tokenize(b.bemba).length - tokenize(a.bemba).length ||
      b.bemba.length - a.bemba.length,
  );

/* ============================================================
   COMMON FUNCTION WORDS
   ============================================================ */

/*
 * These are deliberately conservative.
 *
 * The dictionary remains the primary source.
 * These mappings only help sentence construction when a
 * common English function word has no direct dictionary entry.
 */

const englishFunctionWords: Record<string, string> = {
  i: "ine",
  "i'm": "ine",
  im: "ine",

  me: "ine",
  my: "ifyo fyandi",
  mine: "ifyo fyandi",

  you: "imwe",
  your: "ifyo fyenu",
  yours: "ifyo fyenu",

  he: "ena",
  him: "ena",
  his: "ifyo fyakwe",

  she: "ena",
  her: "ena",
  hers: "ifyo fyakwe",

  we: "ifwe",
  us: "ifwe",
  our: "ifyo fyetu",
  ours: "ifyo fyetu",

  they: "bena",
  them: "bena",
  their: "ifyo fyabo",
  theirs: "ifyo fyabo",

  this: "ici",
  that: "ico",
  these: "ifi",
  those: "ifyo",

  and: "na",
  but: "lelo",
  or: "nangu",
  because: "pantu",
  so: "ico",
  with: "na",
  without: "ukwabula",
  for: "pantu",
  from: "ukufuma",
  to: "ku",
  in: "mu",
  on: "pa",
  at: "pa",
  of: "a",
  about: "pa",

  today: "lelo",
  tomorrow: "mailo",
  yesterday: "mailo",
  now: "nomba",
  here: "pano",
  there: "kuli",
  very: "sana",
  really: "ukwashika",
  always: "lyonse",
  never:
