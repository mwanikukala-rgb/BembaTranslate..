import { bembaDictionary } from "../data/bembaDictionary";

/*
============================================================
 BEMBATRANSLATE PROFESSIONAL OFFLINE ENGINE V2
============================================================

 Goals:
 - Complete local dictionary is the source of truth
 - Exact lookup always wins
 - Phrase lookup before individual words
 - Two-way dictionary search
 - Conservative typo correction
 - NO dangerous fuzzy translation
 - Human-like sentence parsing
 - Subject / verb / object recognition
 - Questions
 - Negation
 - Possessives
 - Progressive sentence construction
 - Suggestions for incomplete sentences
 - Grammar rules are isolated and expandable
 - 100% offline
============================================================
*/

export type BembaEntry = {
  english: string;
  bemba: string;
};

export type TranslationResult = {
  text: string;
  confidence: number;
  source:
    | "exact"
    | "phrase"
    | "sentence"
    | "grammar"
    | "fuzzy"
    | "partial"
    | "none";
  matchedInput?: string;
  explanation?: string;
};

export type SentenceAnalysis = {
  original: string;
  normalized: string;
  subject?: string;
  verb?: string;
  object?: string;
  auxiliary?: string;
  tense:
    | "present"
    | "past"
    | "future"
    | "unknown";
  aspect:
    | "simple"
    | "continuous"
    | "perfect"
    | "unknown";
  negative: boolean;
  question: boolean;
  incomplete: boolean;
};

/*
============================================================
 1. DICTIONARY
============================================================
*/

const dictionary: BembaEntry[] = Array.isArray(
  bembaDictionary
)
  ? (bembaDictionary as BembaEntry[])
  : [];

/*
============================================================
 2. NORMALIZATION
============================================================
*/

function normalize(text: string): string {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[“”‘’"'`]/g, "")
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanTranslation(text: string): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  const value = normalize(text);

  return value
    ? value.split(" ").filter(Boolean)
    : [];
}

/*
============================================================
 3. CONTRACTIONS
============================================================
*/

const contractions: Record<string, string> = {
  "i'm": "i am",
  im: "i am",

  "you're": "you are",
  youre: "you are",

  "he's": "he is",
  hes: "he is",

  "she's": "she is",
  shes: "she is",

  "it's": "it is",
  its: "it is",

  "we're": "we are",
  were: "we are",

  "they're": "they are",
  theyre: "they are",

  "i've": "i have",
  ive: "i have",

  "you've": "you have",
  youve: "you have",

  "we've": "we have",
  weve: "we have",

  "they've": "they have",
  theyve: "they have",

  "can't": "cannot",
  cant: "cannot",

  "don't": "do not",
  dont: "do not",

  "doesn't": "does not",
  doesnt: "does not",

  "didn't": "did not",
  didnt: "did not",

  "isn't": "is not",
  isnt: "is not",

  "aren't": "are not",
  arent: "are not",

  "wasn't": "was not",
  wasnt: "was not",

  "weren't": "were not",
  werent: "were not",

  "won't": "will not",
  wont: "will not",

  "wouldn't": "would not",
  wouldnt: "would not",

  "couldn't": "could not",
  couldnt: "could not",

  "shouldn't": "should not",
  shouldnt: "should not",
};

function expandContractions(
  text: string
): string {
  let result = String(text ?? "");

  for (const [from, to] of Object.entries(
    contractions
  )) {
    const escaped = from.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    result = result.replace(
      new RegExp(`\\b${escaped}\\b`, "gi"),
      to
    );
  }

  return result;
}

/*
============================================================
 4. ENGLISH NORMALIZATION / ALIASES
============================================================
*/

const englishAliases: Record<
  string,
  string
> = {
  thanks: "thank",
  thanked: "thank",
  thanking: "thank",

  thinks: "think",
  thinking: "think",
  thought: "think",
  thoughts: "think",

  ate: "eat",
  eating: "eat",
  eats: "eat",

  drank: "drink",
  drinking: "drink",
  drinks: "drink",

  bought: "buy",
  buying: "buy",
  buys: "buy",
  purchased: "buy",
  purchasing: "buy",
  purchases: "buy",

  sold: "sell",
  selling: "sell",
  sells: "sell",

  wanted: "want",
  wanting: "want",
  wants: "want",

  needed: "need",
  needing: "need",
  needs: "need",

  worked: "work",
  working: "work",
  works: "work",

  walked: "walk",
  walking: "walk",
  walks: "walk",

  went: "go",
  going: "go",
  goes: "go",

  came: "come",
  coming: "come",
  comes: "come",

  spoke: "speak",
  speaking: "speak",
  speaks: "speak",

  talked: "talk",
  talking: "talk",
  talks: "talk",

  wrote: "write",
  writing: "write",
  writes: "write",

  read: "read",
  reading: "read",

  washed: "wash",
  washing: "wash",
  washes: "wash",

  learned: "learn",
  learnt: "learn",
  learning: "learn",
  learns: "learn",

  taught: "teach",
  teaching: "teach",
  teaches: "teach",

  slept: "sleep",
  sleeping: "sleep",
  sleeps: "sleep",

  sat: "sit",
  sitting: "sit",
  sits: "sit",

  stayed: "stay",
  staying: "stay",
  stays: "stay",

  visited: "visit",
  visiting: "visit",
  visits: "visit",

  helped: "help",
  helping: "help",
  helps: "help",

  remembered: "remember",
  remembering: "remember",
  remembers: "remember",

  ill: "sick",
  unwell: "sick",
};

/*
============================================================
 5. DICTIONARY INDEXES
============================================================
*/

const englishToBemba =
  new Map<string, string>();

const englishAlternatives =
  new Map<string, string[]>();

const bembaToEnglish =
  new Map<string, string[]>();

const allEnglishWords =
  new Set<string>();

for (const entry of dictionary) {
  if (!entry) continue;

  const english =
    normalize(entry.english);

  const bemba =
    cleanTranslation(entry.bemba);

  if (!english || !bemba) {
    continue;
  }

  /*
   * Primary translation.
   */
  if (!englishToBemba.has(english)) {
    englishToBemba.set(
      english,
      bemba
    );
  }

  /*
   * Alternatives.
   */
  const alternatives =
    englishAlternatives.get(
      english
    ) ?? [];

  if (!alternatives.includes(bemba)) {
    alternatives.push(bemba);
  }

  englishAlternatives.set(
    english,
    alternatives
  );

  /*
   * Reverse dictionary.
   */
  const normalizedBemba =
    normalize(bemba);

  const reverse =
    bembaToEnglish.get(
      normalizedBemba
    ) ?? [];

  if (!reverse.includes(english)) {
    reverse.push(english);
  }

  bembaToEnglish.set(
    normalizedBemba,
    reverse
  );

  /*
   * Single English words for fuzzy search.
   */
  if (!english.includes(" ")) {
    allEnglishWords.add(english);
  }
}

/*
============================================================
 6. EXACT LOOKUP
============================================================
*/

function exactEnglishLookup(
  input: string
): string | undefined {
  const normalized =
    normalize(input);

  if (!normalized) {
    return undefined;
  }

  /*
   * EXACT ALWAYS COMES FIRST.
   *
   * This prevents:
   *
   * thank
   *
   * from being incorrectly changed into:
   *
   * think
   */

  const exact =
    englishToBemba.get(normalized);

  if (exact) {
    return exact;
  }

  /*
   * Alias only when there is no exact entry.
   */

  const alias =
    englishAliases[normalized];

  if (alias) {
    return englishToBemba.get(
      normalize(alias)
    );
  }

  return undefined;
}

/*
============================================================
 7. REVERSE LOOKUP
============================================================
*/

export function searchBembaToEnglish(
  query: string,
  limit = 50
): BembaEntry[] {
  const normalized =
    normalize(query);

  if (!normalized) {
    return [];
  }

  const results: BembaEntry[] = [];

  for (const entry of dictionary) {
    const bemba =
      normalize(entry.bemba);

    const english =
      normalize(entry.english);

    if (
      bemba.includes(normalized) ||
      english.includes(normalized)
    ) {
      results.push({
        english: entry.english,
        bemba: entry.bemba,
      });
    }

    if (results.length >= limit) {
      break;
    }
  }

  return results;
}

/*
============================================================
 8. IMPORTANT VERIFIED PHRASES
============================================================

 These are fallback constructions only.

 EXACT DICTIONARY LOOKUP ALWAYS HAS PRIORITY.
============================================================
*/

const importantPhrases =
  new Map<string, string>([
    ["how are you", "Mulishani?"],
    ["good morning", "Mwashibukeni!"],
    ["good afternoon", "Kasuba mukwai"],
    ["good evening", "Chungulo mukwai"],
    ["good night", "Sendameenipo"],
    ["goodbye", "Shalenipo"],
    ["thank you", "Natotela"],
    ["thanks", "Natotela"],
    ["thanks a lot", "Natotela saana"],
    ["a lot", "Saana"],
    ["yes", "Ee"],
    ["no", "Awe"],
    ["where are you", "Ulikwisa?"],
    ["where are they", "Balikwisa?"],
  ]);

/*
============================================================
 9. SAFE FUZZY MATCHING
============================================================

 VERY IMPORTANT:

 Fuzzy matching must NOT turn one real word into
 another unrelated real word.

 Example:

 thank ≠ think

 If both exist in dictionary, fuzzy matching is disabled
 when the user entered a valid dictionary word.

============================================================
*/

function levenshtein(
  a: string,
  b: string
): number {
  const previous =
   
