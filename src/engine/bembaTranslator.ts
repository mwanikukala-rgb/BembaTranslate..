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
 * IMPORTANT:
 *
 * bembaDictionary.ts is the main source of vocabulary.
 *
 * This engine:
 *
 * 1. Loads ALL dictionary entries
 * 2. Normalizes English safely
 * 3. Supports exact phrases
 * 4. Supports exact individual words
 * 5. Supports multiple translations
 * 6. Supports common English variations
 * 7. Supports common sentence patterns
 * 8. Supports Bemba verb roots when the dictionary provides them
 * 9. Uses fuzzy matching only as a LAST RESORT
 *
 * Exact dictionary data ALWAYS has priority over fuzzy matching.
 *
 * Completely offline.
 * No API.
 * No cloud.
 * No internet.
 * ============================================================
 */

/* ============================================================
   DICTIONARY
============================================================ */

const dictionary: BembaEntry[] = Array.isArray(
  bembaDictionary
)
  ? (bembaDictionary as BembaEntry[])
  : [];

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

function cleanBemba(text: string): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ============================================================
   DICTIONARY INDEX
============================================================ */

/*
 * First translation for each English expression.
 */
const dictionaryLookup = new Map<string, string>();

/*
 * ALL translations for each English expression.
 */
const dictionaryAlternatives =
  new Map<string, string[]>();

/*
 * English words only.
 *
 * This is separate from the phrase index so that
 * sentence processing can work efficiently.
 */
const dictionaryWords =
  new Map<string, string>();

/*
 * Phrase index.
 */
const dictionaryPhrases =
  new Map<string, string>();

/*
 * Build indexes from EVERY dictionary entry.
 */
for (const entry of dictionary) {
  if (!entry) continue;

  const english = normalize(entry.english);
  const bemba = cleanBemba(entry.bemba);

  if (!english || !bemba) continue;

  /*
   * First translation wins for normal translation.
   */
  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(english, bemba);
  }

  /*
   * Preserve all alternatives.
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

  /*
   * Separate word and phrase indexes.
   */
  if (english.includes(" ")) {
    if (!dictionaryPhrases.has(english)) {
      dictionaryPhrases.set(
        english,
        bemba
      );
    }
  } else {
    if (!dictionaryWords.has(english)) {
      dictionaryWords.set(
        english,
        bemba
      );
    }
  }
}

/* ============================================================
   CONTRACTIONS
============================================================ */

const contractionMap: Record<string, string> = {
  "i'm": "i am",
  "im": "i am",

  "you're": "you are",
  "youre": "you are",

  "he's": "he is",
  "hes": "he is",

  "she's": "she is",
  "shes": "she is",

  "it's": "it is",

  "we're": "we are",
  "were": "we are",

  "they're": "they are",
  "theyre": "they are",

  "i've": "i have",
  "ive": "i have",

  "you've": "you have",
  "youve": "you have",

  "we've": "we have",
  "weve": "we have",

  "they've": "they have",
  "theyve": "they have",

  "can't": "cannot",
  "cant": "cannot",

  "don't": "do not",
  "dont": "do not",

  "doesn't": "does not",
  "doesnt": "does not",

  "didn't": "did not",
  "didnt": "did not",

  "isn't": "is not",
  "isnt": "is not",

  "aren't": "are not",
  "arent": "are not",

  "wasn't": "was not",
  "wasnt": "was not",

  "weren't": "were not",
  "werent": "were not",

  "won't": "will not",
  "wont": "will not",

  "wouldn't": "would not",
  "wouldnt": "would not",

  "couldn't": "could not",
  "couldnt": "could not",

  "shouldn't": "should not",
  "shouldnt": "should not",
};

function expandContractions(
  text: string
): string {
  let result = String(text ?? "");

  for (const [from, to] of Object.entries(
    contractionMap
  )) {
    const escaped = from.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    result = result.replace(
      new RegExp(
        `\\b${escaped}\\b`,
        "gi"
      ),
      to
    );
  }

  return result;
}

/* ============================================================
   TOKENIZATION
============================================================ */

function tokenize(text: string): string[] {
  const normalized = normalize(
    expandContractions(text)
  );

  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .filter(Boolean);
}

/* ============================================================
   COMMON ENGLISH VARIATIONS
============================================================ */

const englishAliases: Record<string, string> = {
  ill: "sick",
  unwell: "sick",

  purchase: "buy",
  purchases: "buy",
  purchased: "buy",
  buying: "buy",
  buys: "buy",

  sold: "sell",
  selling: "sell",
  sells: "sell",

  wanted: "want",
  wants: "want",
  wanting: "want",

  worked: "work",
  working: "work",
  works: "work",

  visited: "visit",
  visiting: "visit",
  visits: "visit",

  waited: "wait",
  waiting: "wait",
  waits: "wait",

  walked: "walk",
  walking: "walk",
  walks: "walk",

  travelled: "travel",
  traveled: "travel",
  travelling: "travel",
  traveling: "travel",

  talked: "talk",
  talking: "talk",
  talks: "talk",

  spoke: "speak",
  speaking: "speak",
  speaks: "speak",

  taught: "teach",
  teaching: "teach",
  teaches: "teach",

  wrote: "write",
  writing: "write",
  writes: "write",

  washed: "wash",
  washing: "wash",
  washes: "wash",

  looked: "look",
  looking: "look",
  looks: "look",

  remembered: "remember",
  remembering: "remember",
  remembers: "remember",

  helped: "help",
  helping: "help",
  helps: "help",

  learned: "learn",
  learnt: "learn",
  learning: "learn",
  learns: "learn",

  sat: "sit",
  sitting: "sit",
  sits: "sit",

  stayed: "stay",
  staying: "stay",
  stays: "stay",

  went: "go",
  going: "go",
  goes: "go",

  came: "come",
  coming: "come",
  comes: "come",

  saying: "speak",
  said: "speak",

  slept: "sleep",
  sleeping: "sleep",
  sleeps: "sleep",

  ate: "eat",
  eating: "eat",
  eats: "eat",

  drank: "drink",
  drinking: "drink",
  drinks: "drink",

  anger: "angry",
};

/* ============================================================
   IMPORTANT EVERYDAY PHRASES
============================================================ */

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

    ["i want money", "Ndefwaya indalama"],

    ["i am angry", "Nimfulwa"],

    ["i'm angry", "Nimfulwa"],

    ["i am sick", "Ndelwala"],

    ["i'm sick", "Ndelwala"],
  ]);

/* ============================================================
   DIRECT WORD LOOKUP
============================================================ */

function lookupEnglish(
  text: string
): string | undefined {
  const normalized = normalize(text);

  if (!normalized) {
    return undefined;
  }

  /*
   * MOST IMPORTANT:
   *
   * Exact dictionary match ALWAYS comes first.
   */
  const exact =
    dictionaryLookup.get(normalized);

  if (exact) {
    return exact;
  }

  /*
   * Alias is only used when the exact word
   * does not exist.
   */
  const alias =
    englishAliases[normalized];

  if (alias) {
    const aliasTranslation =
      dictionaryLookup.get(
        normalize(alias)
      );

    if (aliasTranslation) {
      return aliasTranslation;
    }
  }

  return undefined;
}

/* ============================================================
   GET ALL EXACT TRANSLATIONS
============================================================ */

function lookupAllEnglish(
  text: string
): string[] {
  const normalized = normalize(text);

  if (!normalized) {
    return [];
  }

  return (
    dictionaryAlternatives.get(
      normalized
    ) ?? []
  );
}

/* ============================================================
   VERB ROOT
============================================================ */

function cleanRoot(
  root: string
): string {
  return root
    .replace(/^[-–—]/, "")
    .trim();
}

function getVerbRoot(
  englishWord: string
): string | undefined {
  const translation =
    lookupEnglish(englishWord);

  if (!translation) {
    return undefined;
  }

  const first =
    translation
      .split("/")
      .map((item) => item.trim())
      .find(Boolean);

  if (!first) {
    return undefined;
  }

  if (
    first.startsWith("-") ||
    first.startsWith("–") ||
    first.startsWith("—")
  ) {
    return cleanRoot(first);
  }

  return undefined;
}

/* ============================================================
   VERB CONJUGATION
============================================================ */

function conjugatePresent(
  subject: string,
  verb: string
): string | undefined {
  const root =
    getVerbRoot(verb);

  if (!root) {
    return undefined;
  }

  switch (subject) {
    case "i":
      return `Nde${root}`;

    case "you":
      return `Ule${root}`;

    case "he":
    case "she":
      return `Ale${root}`;

    case "we":
      return `Tule${root}`;

    case "they":
      return `Bale${root}`;

    case "it":
      return `Cile${root}`;

    default:
      return undefined;
  }
}

/* ============================================================
   OBJECT TRANSLATION
============================================================ */

function translateObject(
  text: string
): string | undefined {
  const normalized = normalize(text);

  if (!normalized) {
    return undefined;
  }

  /*
   * Exact phrase first.
   */
  const direct =
    lookupEnglish(normalized);

  if (direct) {
    return direct;
  }

  /*
   * Then translate every word exactly.
   */
  const words =
    tokenize(normalized);

  if (!words.length) {
    return undefined;
  }

  const output: string[] = [];

  for (const word of words) {
    const translation =
      lookupEnglish(word);

    if (!translation) {
      return undefined;
    }

    output.push(translation);
  }

  return output.join(" ");
}

/* ============================================================
   POSSESSIVES
============================================================ */

const possessiveMap: Record<
  string,
  string
> = {
  my: "yandi",
  your: "yobe",
  his: "akwe",
  her: "akwe",
  our: "yesu",
  their: "babo",
};

function translatePossessive(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  const match =
    normalized.match(
      /^(my|your|his|her|our|their)\s+(.+)$/
    );

  if (!match) {
    return undefined;
  }

  const owner =
    possessiveMap[match[1]];

  const noun =
    translateObject(match[2]);

  if (!owner || !noun) {
    return undefined;
  }

  return `${noun} ${owner}`;
}

/* ============================================================
   DIRECT SENTENCE PATTERNS
============================================================ */

const directPatterns: Array<{
  pattern: RegExp;
  result:
    | string
    | ((match: RegExpMatchArray) => string);
}> = [
  {
    pattern: /^i am sick$/,
    result: "Ndelwala",
  },

  {
    pattern: /^i am angry$/,
    result: "Nimfulwa",
  },

  {
    pattern: /^i am working$/,
    result: "Ndebomba",
  },

  {
    pattern: /^i work$/,
    result: "Ndebomba",
  },

  {
    pattern: /^i am suffering$/,
    result: "Ndecula",
  },

  {
    pattern: /^i suffer$/,
    result: "Ndecula",
  },

  {
    pattern: /^i am writing$/,
    result: "Ndelemba",
  },

  {
    pattern: /^i write$/,
    result: "Ndelemba",
  },

  {
    pattern: /^i am walking$/,
    result: "Ndeenda",
  },

  {
    pattern: /^i walk$/,
    result: "Ndeenda",
  },

  {
    pattern: /^i am waiting$/,
    result: "Ndelolela",
  },

  {
    pattern: /^i wait$/,
    result: "Ndelolela",
  },

  {
    pattern: /^i am visiting$/,
    result: "Ndetandala",
  },

  {
    pattern: /^i visit$/,
    result: "Ndetandala",
  },

  {
    pattern: /^i am talking$/,
    result: "Ndelanda",
  },

  {
    pattern: /^i talk$/,
    result: "Ndelanda",
  },

  {
    pattern: /^i am speaking$/,
    result: "Ndelanda",
  },

  {
    pattern: /^i speak$/,
    result: "Ndelanda",
  },

  {
    pattern: /^i am buying$/,
    result: "Ndeshita",
  },

  {
    pattern: /^i buy$/,
    result: "Ndeshita",
  },

  {
    pattern: /^i am selling$/,
    result: "Ndeshitisha",
  },

  {
    pattern: /^i sell$/,
    result: "Ndeshitisha",
  },

  {
    pattern: /^i am washing$/,
    result: "Ndesamba",
  },

  {
    pattern: /^i wash$/,
    result: "Ndesamba",
  },

  {
    pattern: /^i am learning$/,
    result: "Ndefunda",
  },

  {
    pattern: /^i learn$/,
    result: "Ndefunda",
  },

  {
    pattern: /^i am teaching$/,
    result: "Ndefunda",
  },

  {
    pattern: /^i teach$/,
    result: "Ndefunda",
  },

  {
    pattern: /^i am sitting$/,
    result: "Ndeikala",
  },

  {
    pattern: /^i sit$/,
    result: "Ndeikala",
  },

  {
    pattern: /^i am staying$/,
    result: "Ndeikala",
  },

  {
    pattern: /^i stay$/,
    result: "Ndeikala",
  },

  {
    pattern: /^i am going$/,
    result: "Ndeenda",
  },

  {
    pattern: /^i go$/,
    result: "Ndeenda",
  },

  {
    pattern: /^i am coming$/,
    result: "Ndesa",
  },

  {
    pattern: /^i come$/,
    result: "Ndesa",
  },

  {
    pattern: /^i want (.+)$/,
    result: (match) => {
      const object =
        translateObject(match[1]);

      return object
        ? `Ndefwaya ${object}`
        : "";
    },
  },

  {
    pattern: /^i need (.+)$/,
    result: (match) => {
      const object =
        translateObject(match[1]);

      return object
        ? `Ndefwaya ${object}`
        : "";
    },
  },
];

/* ============================================================
   SENTENCE ENGINE
============================================================ */

function translateSentencePattern(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  /*
   * Important phrase.
   */
  const important =
    importantPhrases.get(normalized);

  if (important) {
    return important;
  }

  /*
   * Direct sentence patterns.
   */
  for (const item of directPatterns) {
    const match =
      normalized.match(item.pattern);

    if (!match) {
      continue;
    }

    if (
      typeof item.result === "string"
    ) {
      return item.result;
    }

    const result =
      item.result(match);

    if (result) {
      return result;
    }
  }

  /*
   * I am + adjective / condition.
   */
  const iAm =
    normalized.match(/^i am (.+)$/);

  if (iAm) {
    const value = iAm[1];

    const root =
      getVerbRoot(value);

    if (root) {
      return `Nde${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Ndi ${translation}`;
    }
  }

  /*
   * YOU ARE + adjective.
   */
  const youAre =
    normalized.match(/^you are (.+)$/);

  if (youAre) {
    const value = youAre[1];

    const root =
      getVerbRoot(value);

    if (root) {
      return `Ule${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Uli ${translation}`;
    }
  }

  /*
   * HE / SHE IS + adjective.
   */
  const heSheIs =
    normalized.match(
      /^(he|she) is (.+)$/
    );

  if (heSheIs) {
    const value = heSheIs[2];

    const root =
      getVerbRoot(value);

    if (root) {
      return `Ale${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Ali ${translation}`;
    }
  }

  /*
   * Generic subject + verb.
   */
  const subjectMatch =
    normalized.match(
      /^(i|you|he|she|we|they)\s+(.+)$/
    );

  if (!subjectMatch) {
    return undefined;
  }

  const subject =
    subjectMatch[1];

  let rest =
    subjectMatch[2];

  /*
   * Remove auxiliaries.
   */
  rest =
    rest
      .replace(
        /^(am|are|is|do|does|did|will|can|must|should|could|would)\s+/,
        ""
      )
      .trim();

  if (!rest) {
    return undefined;
  }

  const words =
    rest.split(" ");

  const verb =
    words[0];

  /*
   * Check aliases before conjugation.
   */
  const canonicalVerb =
    englishAliases[verb]
