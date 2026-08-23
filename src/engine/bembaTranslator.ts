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
 * 1. Important phrases
 * 2. Exact dictionary phrase
 * 3. Sentence patterns
 * 4. Possessives
 * 5. Longest dictionary phrase matching
 * 6. Word-by-word dictionary matching
 * 7. Conservative fuzzy matching
 *
 * No internet.
 * No API.
 * No cloud.
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
   DICTIONARY INDEX
============================================================ */

const dictionaryLookup =
  new Map<string, string>();

const dictionaryAlternatives =
  new Map<string, string[]>();

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
   * Keep the first translation as
   * the primary dictionary result.
   */

  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }

  const alternatives =
    dictionaryAlternatives.get(
      english
    ) ?? [];

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

const contractionMap: Record<
  string,
  string
> = {
  "i'm": "i am",
  "im": "i am",

  "you're": "you are",
  "youre": "you are",

  "he's": "he is",
  "hes": "he is",

  "she's": "she is",
  "shes": "she is",

  "it's": "it is",
  "its": "it is",

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
    const escaped =
      from.replace(
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

function tokenize(
  text: string
): string[] {
  const normalized =
    normalize(
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
   ENGLISH VARIATIONS
============================================================ */

const englishAliases: Record<
  string,
  string
> = {
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

  cooked: "cook",
  cooking: "cook",
  cooks: "cook",

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

  angry: "angry",
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
   DICTIONARY LOOKUP
============================================================ */

function lookupEnglish(
  word: string
): string | undefined {
  const normalized =
    normalize(word);

  if (!normalized) {
    return undefined;
  }

  const direct =
    dictionaryLookup.get(
      normalized
    );

  if (direct) {
    return direct;
  }

  const alias =
    englishAliases[normalized];

  if (alias) {
    return dictionaryLookup.get(
      normalize(alias)
    );
  }

  return undefined;
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
      .map((item) =>
        item.trim()
      )
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
   CONJUGATION
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
  const normalized =
    normalize(text);

  if (!normalized) {
    return undefined;
  }

  const direct =
    lookupEnglish(normalized);

  if (direct) {
    return direct;
  }

  const words =
    tokenize(normalized);

  if (!words.length) {
    return undefined;
  }

  const translated: string[] =
    [];

  for (const word of words) {
    const result =
      lookupEnglish(word);

    if (!result) {
      return undefined;
    }

    translated.push(result);
  }

  return translated.join(" ");
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
    possessiveMap[
      match[1]
    ];

  const noun =
    translateObject(
      match[2]
    );

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
    | ((
        match: RegExpMatchArray
      ) => string);
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

function translateSubjectVerb(
  subject: string,
  rest: string
): string | undefined {
  let cleaned =
    rest.trim();

  cleaned =
    cleaned.replace(
      /^(am|are|is|do|does|will|can|must)\s+/,
      ""
    );

  cleaned =
    cleaned.trim();

  if (!cleaned) {
    return undefined;
  }

  const words =
    cleaned.split(" ");

  const verb =
    words[0];

  /*
   * Check aliases before conjugating.
   */

  const alias =
    englishAliases[verb];

  const actualVerb =
    alias ?? verb;

  const conjugated =
    conjugatePresent(
      subject,
      actualVerb
    );

  if (!conjugated) {
    return undefined;
  }

  const objectWords =
    words.slice(1);

  if (!objectWords.length) {
    return conjugated;
  }

  const object =
    translateObject(
      objectWords.join(" ")
    );

  if (!object) {
    return undefined;
  }

  return `${conjugated} ${object}`;
}

function translateSentencePattern(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  /*
   * Important phrases.
   */

  const important =
    importantPhrases.get(
      normalized
    );

  if (important) {
    return important;
  }

  /*
   * Explicit patterns.
   */

  for (const item of directPatterns) {
    const match =
      normalized.match(
        item.pattern
      );

    if (!match) {
      continue;
    }

    if (
      typeof item.result ===
      "string"
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
   * I ...
   */

  const iMatch =
    normalized.match(
      /^i\s+(.+)$/
    );

  if (iMatch) {
    const result =
      translateSubjectVerb(
        "i",
        iMatch[1]
      );

    if (result) {
      return result;
    }
  }

  /*
   * You ...
   */

  const youMatch =
    normalized.match(
      /^you\s+(.+)$/
    );

  if (youMatch) {
    const result =
      translateSubjectVerb(
        "you",
        youMatch[1]
      );

    if (result) {
      return result;
    }
  }

  /*
   * He / She ...
   */

  const thirdMatch =
    normalized.match(
      /^(he|she)\s+(.+)$/
    );

  if (thirdMatch) {
    const result =
      translateSubjectVerb(
        thirdMatch[1],
        thirdMatch[2]
      );

    if (result) {
      return result;
    }
  }

  /*
   * We ...
   */

  const weMatch =
    normalized.match(
      /^we\s+(.+)$/
    );

  if (weMatch) {
    const result =
      translateSubjectVerb(
        "we",
        weMatch[1]
      );

    if (result) {
      return result;
    }
  }

  /*
   * They ...
   */

  const theyMatch =
    normalized.match(
      /^they\s+(.+)$/
    );

  if (theyMatch) {
    const result =
      translateSubjectVerb(
        "they",
        theyMatch[1]
      );

    if (result) {
      return result;
    }
  }

  /*
   * I am + adjective/condition.
   */

  const iAm =
    normalized.match(
      /^i am (.+)$/
    );

  if (iAm) {
    const value =
      iAm[1];

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
   * You are + adjective.
   */

  const youAre =
    normalized.match(
      /^you are (.+)$/
    );

  if (youAre) {
    const value =
      youAre[1];

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
   * He / She is + adjective.
   */

  const heSheIs =
    normalized.match(
      /^(he|she) is (.+)$/
    );

  if (heSheIs) {
    const value =
      heSheIs[2];

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

  return undefined;
}

/* ============================================================
   LONGEST DICTIONARY PHRASE
============================================================ */

function findLongestMatch(
  words: string[],
  startIndex: number
):
  | {
      translation: string;
      length: number;
    }
  | undefined {
  const remaining =
    words.length -
    startIndex;

  const maxLength =
    Math.min(
      remaining,
      15
    );

  for (
    let length = maxLength;
    length >= 1;
    length--
  ) {
    const phrase =
      words
        .slice(
          startIndex,
          startIndex + length
        )
        .join(" ");

    const translation =
      lookupEnglish(phrase);

    if (translation) {
      return {
        translation,
        length,
      };
    }
  }

  return undefined;
}

/* ============================================================
   LEVENSHTEIN
============================================================ */

function levenshtein(
  a: string,
  b: string
): number {
  const previous: number[] =
    new Array(b.length + 1);

  const current: number[] =
    new Array(b.length + 1);

  for (
    let j = 0;
    j <= b.length;
    j++
  ) {
    previous[j] = j;
  }

  for (
    let i = 1;
    i <= a.length;
    i++
  ) {
    current[0] = i;

    for (
      let j = 1;
      j <= b.length;
      j++
    ) {
      const cost =
        a[i - 1] === b[j - 1]
          ? 0
          : 1;

      current[j] =
        Math.min(
          current[j - 1] + 1,
          previous[j] + 1,
          previous[j - 1] +
            cost
        );
    }

    for (
      let j = 0;
      j <= b.length;
      j++
    ) {
      previous[j] =
        current[j];
    }
  }

  return previous[b.length];
}

/* ============================================================
   FUZZY LOOKUP
============================================================ */

function fuzzyLookup(
  word: string
): string | undefined {
  const normalized =
    normalize(word);

  if (
    !normalized ||
    normalized.length < 4
  ) {
    return undefined;
  }

  /*
   * Alias first.
   */

  const alias =
    englishAliases[normalized];

  if (alias) {
    const aliasResult =
      dictionaryLookup.get(
        normalize(alias)
      );

    if (aliasResult) {
      return aliasResult;
    }
  }

  let best:
    | string
    | undefined;

  let bestDistance =
    Number.POSITIVE_INFINITY;

  for (
    const [
      english,
      translation,
    ] of dictionaryLookup
  ) {
    /*
     * Only fuzzy-match single
     * English words.
     */

    if (english.includes(" ")) {
      continue;
    }

    /*
     * Prevent unrelated words
     * from matching.
     */

    if (
      Math.abs(
        english.length -
          normalized.length
      ) > 2
    ) {
      continue;
    }

    const distance =
      levenshtein(
        normalized,
        english
      );

    const allowed =
      normalized.length >= 8
        ? 2
        : 1;

    if (
      distance <= allowed &&
      distance < bestDistance
    ) {
      bestDistance =
        distance;

      best =
        translation;
    }
  }

  return best;
}

/* ============================================================
   WORD-BY-WORD TRANSLATION
============================================================ */

function translateByWords(
  text: string
): string {
  const words =
    tokenize(text);

  if (!words.length) {
    return "";
  }

  const output: string[] =
    [];

  let index = 0;

  while (
    index < words.length
  ) {
    /*
     * First try the longest
     * dictionary phrase.
     */

    const phrase =
      findLongestMatch(
        words,
        index
      );

    if (phrase) {
      output.push(
        phrase.translation
      );

      index +=
        phrase.length;

      continue;
    }

    /*
     * Then try one dictionary word.
     */

    const word =
      words[index];

    const direct =
      lookupEnglish(word);

    if (direct) {
      output.push(direct);

      index++;

      continue;
    }

    /*
     * Then try alias/fuzzy.
     */

    const fuzzy =
      fuzzyLookup(word);

    if (fuzzy) {
      output.push(fuzzy);

      index++;

      continue;
    }

    /*
     * Unknown word.
     */

    return "";
  }

  return output.join(" ");
}

/* ============================================================
   NUMBER SUPPORT
============================================================ */

const numberWords: Record<
  string,
  string
> = {
  one: "-mo",
  two: "-bili",
  three: "-tatu",
  four: "-ne",
  five: "sano",
  six: "mutanda",
  seven: "cine lubali",
  eight: "cine konse konse",
  nine: "paabula",
  ten: "ikumi",
  eleven: "ikumi na -mo",
  twelve: "ikumi na -bili",
  thirteen: "ikumi na -tatu",
};

function translateNumber(
  text: string
): string | undefined {
  return numberWords[
    normalize(text)
  ];
}

/* ============================================================
   MASTER TRANSLATOR
============================================================ */

export function translateEnglishToBemba(
  text: string
): string {
  const original =
    String(text ?? "").trim();

  if (!original) {
    return "";
  }

  const normalized =
    normalize(
      expandContractions(
        original
      )
    );

  if (!normalized) {
    return "";
  }

  /*
   * 1. Important phrases.
   */

  const important =
    importantPhrases.get(
      normalized
    );

  if (important) {
    return important;
  }

  /*
   * 2. Exact dictionary phrase.
   */

  const exact =
    dictionaryLookup.get(
      normalized
    );

  if (exact) {
    return exact;
  }

  /*
   * 3. Number.
   */

  const number =
    translateNumber(
      normalized
    );

  if (number) {
    return number;
  }

  /*
   * 4. Possessive.
   */

  const possessive =
    translatePossessive(
      normalized
    );

  if (possessive) {
    return possessive;
  }

  /*
   * 5. Sentence engine.
   */

  const sentence =
    translateSentencePattern(
      normalized
    );

  if (sentence) {
    return sentence;
  }

  /*
   * 6. Dictionary phrase +
   * word matching.
   */

  const wordResult =
    translateByWords(
      normalized
    );

  if (wordResult) {
    return wordResult;
  }

  /*
   * 7. No reliable translation.
   */

  return "";
}

/* ============================================================
   IMPORTANT:
   APP.TSX EXPECTS THIS FUNCTION
============================================================ */

export function translateWithFallback(
  text: string
): string {
  try {
    return translateEnglishToBemba(
      text
    );
  } catch (error) {
    console.error(
      "[BembaTranslate] Offline translation error:",
      error
    );

    return "";
  }
}

/* ============================================================
   TRANSLATION CHECK
============================================================ */

export function hasBembaTranslation(
  text: string
): boolean {
  return Boolean(
    translateEnglishToBemba(text)
  );
}

/* ============================================================
   GET TRANSLATION
============================================================ */

export function getBembaTranslation(
  text: string
): string | undefined {
  const result =
    translateEnglishToBemba(text);

  return result || undefined;
}

/* ============================================================
   GET ALL DICTIONARY TRANSLATIONS
============================================================ */

export function getBembaTranslations(
  text: string
): string[] {
  const normalized =
    normalize(
      expandContractions(text)
    );

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
   DICTIONARY SIZE
============================================================ */

export function getDictionarySize(): number {
  return dictionaryLookup.size;
}

/* ============================================================
   DICTIONARY SEARCH
============================================================ */

export function searchBembaDictionary(
  query: string,
  limit = 50
): BembaEntry[] {
  const normalized =
    normalize(query);

  if (!normalized) {
    return [];
  }

  const results: BembaEntry[] =
    [];

  for (const entry of dictionary) {
    if (!entry) {
      continue;
    }

    const english =
      normalize(
        entry.english
      );

    const bemba =
      normalize(
        entry.bemba
      );

    if (
      english.includes(
        normalized
      ) ||
      bemba.includes(
        normalized
      )
    ) {
      results.push({
        english:
          entry.english,
        bemba:
          entry.bemba,
      });
    }

    if (
      results.length >= limit
    ) {
      break;
    }
  }

  return results;
}

/* ============================================================
   TRANSLATOR INFORMATION
============================================================ */

export function getTranslatorInfo() {
  return {
    mode: "offline",

    source:
      "local Bemba dictionary",

    dictionaryEntries:
      dictionary.length,

    indexedEntries:
      dictionaryLookup.size,

    sentencePatterns:
      directPatterns.length,

    importantPhrases:
      importantPhrases.size,

    fuzzyMatching:
      true,

    internetRequired:
      false,

    apiRequired:
      false,

    cloudRequired:
      false,
  };
}
