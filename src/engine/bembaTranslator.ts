import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

/*
 * ============================================================
 * BEMBATRANSLATE
 * FULL LOCAL DICTIONARY TRANSLATION ENGINE
 * ============================================================
 *
 * IMPORTANT:
 *
 * The local dictionary is the SOURCE OF TRUTH.
 *
 * This engine does NOT contain a small replacement dictionary.
 * It indexes the COMPLETE bembaDictionary imported above.
 *
 * Supports:
 *
 * - thousands of dictionary entries
 * - exact phrases
 * - normalized phrases
 * - longest phrase matching
 * - individual word matching
 * - aliases
 * - common sentence structures
 * - Bemba verb roots
 * - possessives
 * - numbers
 * - conservative fuzzy matching
 * - dictionary search
 *
 * Completely offline.
 *
 * No:
 * - API
 * - cloud
 * - internet
 * - AI service
 *
 * ============================================================
 */

/* ============================================================
   COMPLETE DICTIONARY
============================================================ */

const dictionary: BembaEntry[] =
  Array.isArray(bembaDictionary)
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
    .replace(/[“”‘’"'`.,!?;:()[\]{}]/g, " ")
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

/*
 * Every valid dictionary entry is indexed here.
 *
 * This is extremely important.
 *
 * We do NOT limit the dictionary to a selected list of words.
 */

const dictionaryLookup =
  new Map<string, string>();

const dictionaryAlternatives =
  new Map<string, string[]>();

/*
 * Also maintain a list of single-word entries.
 *
 * This makes fuzzy matching much faster than repeatedly
 * walking the entire dictionary.
 */

const singleWordDictionary =
  new Map<string, string>();

/*
 * Keep the longest dictionary phrase length.
 *
 * This allows the engine to use phrases containing more than
 * the old hard-coded 12-word limit.
 */

let maximumDictionaryPhraseLength = 1;

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
   * Save the first translation as the primary translation.
   */

  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }

  /*
   * Save ALL alternatives.
   */

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

  /*
   * Determine phrase length.
   */

  const wordCount =
    english.split(" ").filter(Boolean).length;

  if (
    wordCount >
    maximumDictionaryPhraseLength
  ) {
    maximumDictionaryPhraseLength =
      wordCount;
  }

  /*
   * Single-word index.
   */

  if (wordCount === 1) {
    if (!singleWordDictionary.has(english)) {
      singleWordDictionary.set(
        english,
        bemba
      );
    }
  }
}

/* ============================================================
   CONTRACTIONS
============================================================ */

const contractionMap: Record<
  string,
  string
> = {
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

  for (
    const [from, to] of Object.entries(
      contractionMap
    )
  ) {
    const escaped =
      from.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    result =
      result.replace(
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

  slept: "sleep",
  sleeping: "sleep",
  sleeps: "sleep",

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

  ate: "eat",
  eating: "eat",
  eats: "eat",

  drank: "drink",
  drinking: "drink",
  drinks: "drink",

  anger: "angry",
};

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

  /*
   * 1. Exact dictionary entry.
   */

  const direct =
    dictionaryLookup.get(
      normalized
    );

  if (direct) {
    return direct;
  }

  /*
   * 2. Alias.
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
   VERB ROOT
============================================================ */

function cleanRoot(
  root: string
): string {
  return String(root)
    .replace(/^[-–—]/, "")
    .trim();
}

function getVerbRoot(
  englishWord: string
): string | undefined {
  const translation =
    lookupEnglish(
      englishWord
    );

  if (!translation) {
    return undefined;
  }

  const first =
    translation
      .split("/")
      .map((value) =>
        value.trim()
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
   PRESENT VERB CONJUGATION
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

  /*
   * First: complete phrase.
   */

  const complete =
    lookupEnglish(
      normalized
    );

  if (complete) {
    return complete;
  }

  /*
   * Second: use the complete dictionary
   * word-by-word.
   */

  const words =
    tokenize(normalized);

  if (!words.length) {
    return undefined;
  }

  const translated =
    translateByWords(
      normalized,
      false
    );

  return translated || undefined;
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
   IMPORTANT PHRASES
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
   DIRECT HIGH-CONFIDENCE SENTENCES
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
    pattern: /^i'm sick$/,
    result: "Ndelwala",
  },

  {
    pattern: /^i am angry$/,
    result: "Nimfulwa",
  },

  {
    pattern: /^i'm angry$/,
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

  /*
   * Dynamic object patterns.
   */

  {
    pattern: /^i want (.+)$/,
    result: (match) => {
      const object =
        translateObject(
          match[1]
        );

      return object
        ? `Ndefwaya ${object}`
        : "";
    },
  },

  {
    pattern: /^i need (.+)$/,
    result: (match) => {
      const object =
        translateObject(
          match[1]
        );

      return object
        ? `Ndefwaya ${object}`
        : "";
    },
  },
];

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
      maximumDictionaryPhraseLength
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
      lookupEnglish(
        phrase
      );

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
    new Array(
      b.length + 1
    );

  const current: number[] =
    new Array(
      b.length + 1
    );

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
   FUZZY DICTIONARY LOOKUP
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
   * Alias before fuzzy matching.
   */

  const alias =
    englishAliases[
      normalized
    ];

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

  /*
   * IMPORTANT:
   *
   * This loops through the SINGLE-WORD INDEX,
   * which itself was built from the COMPLETE
   * dictionary.
   */

  for (
    const [
      english,
      translation,
    ] of singleWordDictionary
  ) {
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
   WORD / PHRASE TRANSLATION
============================================================ */

function translateByWords(
  text: string,
  allowPartial = true
): string {
  const words =
    tokenize(text);

  if (!words.length) {
    return "";
  }

  const output: string[] = [];

  let index = 0;

  while (
    index < words.length
  ) {
    /*
     * --------------------------------------------------------
     * 1. LONGEST COMPLETE DICTIONARY PHRASE
     * --------------------------------------------------------
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
     * --------------------------------------------------------
     * 2. EXACT SINGLE WORD
     * --------------------------------------------------------
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
     * --------------------------------------------------------
     * 3. FUZZY SINGLE WORD
     * --------------------------------------------------------
     */

    const fuzzy =
      fuzzyLookup(word);

    if (fuzzy) {
      output.push(fuzzy);

      index++;

      continue;
    }

    /*
     * --------------------------------------------------------
     * 4. UNKNOWN WORD
     * --------------------------------------------------------
     *
     * This is the important change.
     *
     * The old engine returned "" immediately.
     *
     * That caused a sentence containing one unknown
     * English connector to make valid dictionary data
     * disappear.
     *
     * Example:
     *
     *     people are sick
     *
     * If "people" exists in the dictionary but "are"
     * needs grammatical processing, we do NOT throw
     * away "people".
     */

    if (allowPartial) {
      index++;
      continue;
    }

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
   SENTENCE ENGINE
============================================================ */

function translateSubjectVerb(
  subject: string,
  rest: string
): string | undefined {
  let cleaned =
    rest.trim();

  /*
   * Remove English auxiliary words.
   *
   * These are grammar words rather than dictionary
   * content words.
   */

  cleaned =
    cleaned.replace(
      /^(am|are|is|do|does|did|will|can|could|must|should|would)\s+/,
      ""
    );

  cleaned =
    cleaned.trim();

  if (!cleaned) {
    return undefined;
  }

  const words =
    tokenize(cleaned);

  if (!words.length) {
    return undefined;
  }

  /*
   * First word is normally the verb.
   */

  const verb =
    words[0];

  const conjugated =
    conjugatePresent(
      subject,
      verb
    );

  if (!conjugated) {
    return undefined;
  }

  /*
   * Translate the remaining object using the
   * COMPLETE dictionary.
   */

  const objectWords =
    words.slice(1);

  if (!objectWords.length) {
    return conjugated;
  }

  const object =
    translateByWords(
      objectWords.join(" "),
      true
    );

  if (object) {
    return `${conjugated} ${object}`;
  }

  return conjugated;
}

function translateSentencePattern(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  /*
   * ----------------------------------------------------------
   * IMPORTANT PHRASES
   * ----------------------------------------------------------
   */

  const important =
    importantPhrases.get(
      normalized
    );

  if (important) {
    return important;
  }

  /*
   * ----------------------------------------------------------
   * DIRECT PATTERNS
   * ----------------------------------------------------------
   */

  for (
    const item of directPatterns
  ) {
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
   * ----------------------------------------------------------
   * I + ...
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * YOU + ...
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * HE / SHE + ...
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * WE + ...
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * THEY + ...
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * I AM + ADJECTIVE / CONDITION
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * YOU ARE + ADJECTIVE
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * HE / SHE IS + ...
   * ----------------------------------------------------------
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
   SPECIAL PLURAL / SUBJECT HANDLING
============================================================ */

/*
 * This function is deliberately dictionary-driven.
 *
 * If "people" exists in the user's large dictionary,
 * the engine gets the Bemba word directly from that dictionary.
 *
 * We do not hard-code "people = chikala".
 */

function translateKnownSubject(
  englishSubject: string
): string | undefined {
  return lookupEnglish(
    englishSubject
  );
}

/*
 * Handle sentences where the subject itself is a dictionary
 * entry and the remaining words need translation.
 *
 * Example:
 *
 *     people are sick
 *
 * If:
 *
 *     people -> [dictionary result]
 *     sick   -> [dictionary result/root]
 *
 * the engine can use both rather than returning only the
 * first word or declaring the sentence missing.
 */

function translateDictionarySentence(
  text: string
): string | undefined {
  const words =
    tokenize(text);

  if (words.length < 2) {
    return undefined;
  }

  /*
   * Try the longest subject phrase first.
   */

  const maxSubjectLength =
    Math.min(
      5,
      words.length - 1
    );

  for (
    let subjectLength =
      maxSubjectLength;
    subjectLength >= 1;
    subjectLength--
  ) {
    const subjectText =
      words
        .slice(
          0,
          subjectLength
        )
        .join(" ");

    const subject =
      translateKnownSubject(
        subjectText
      );

    if (!subject) {
      continue;
    }

    const remaining =
      words
        .slice(subjectLength)
        .join(" ");

    /*
     * Remove common English grammar connectors.
     */

    const predicate =
      remaining
        .replace(
          /^(am|are|is|was|were|be|being)\s+/,
          ""
        )
        .trim();

    if (!predicate) {
      return subject;
    }

    /*
     * Try predicate as a Bemba verb root.
     */

    const predicateWords =
      tokenize(predicate);

    if (predicateWords.length) {
      const first =
        predicateWords[0];

      const root =
        getVerbRoot(first);

      if (root) {
        /*
         * For plural subjects, use Bale.
         *
         * This is only applied when the English subject
         * itself is plural-looking.
         */

        if (
          /^(people|they|men|women|children|students|workers|friends|parents)$/i.test(
            words[0]
          )
        ) {
          const rest =
            predicateWords
              .slice(1)
              .join(" ");

          if (rest) {
            const object =
              translateByWords(
                rest,
                true
              );

            if (object) {
              return `Bale${root} ${object}`;
            }
          }

          return `Bale${root}`;
        }
      }
    }

    /*
     * Normal dictionary translation of the predicate.
     */

    const translatedPredicate =
      translateByWords(
        predicate,
        true
      );

    if (translatedPredicate) {
      return `${subject} ${translatedPredicate}`;
    }
  }

  return undefined;
}

/* ============================================================
   MASTER TRANSLATION
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
   * ==========================================================
   * 1. IMPORTANT PHRASE
   * ==========================================================
   */

  const important =
    importantPhrases.get(
      normalized
    );

  if (important) {
    return important;
  }

  /*
   * ==========================================================
   * 2. EXACT COMPLETE DICTIONARY ENTRY
   * ==========================================================
   *
   * This is the most important lookup.
   *
   * If the user has:
   *
   * "people are sick"
   *
   * as an actual dictionary entry,
   * it is used directly.
   */

  const exact =
    dictionaryLookup.get(
      normalized
    );

  if (exact) {
    return exact;
  }

  /*
   * ==========================================================
   * 3. NUMBER
   * ==========================================================
   */

  const number =
    translateNumber(
      normalized
    );

  if (number) {
    return number;
  }

  /*
   * ==========================================================
   * 4. POSSESSIVE
   * ==========================================================
   */

  const possessive =
    translatePossessive(
      normalized
    );

  if (possessive) {
    return possessive;
  }

  /*
   * ==========================================================
   * 5. HUMAN-LIKE SENTENCE ENGINE
   * ==========================================================
   */

  const sentence =
    translateSentencePattern(
      normalized
    );

  if (sentence) {
    return sentence;
  }

  /*
   * ==========================================================
   * 6. DICTIONARY SUBJECT + PREDICATE
   * ==========================================================
   *
   * This is important for sentences such as:
   *
   * people are sick
   * children are playing
   * students are learning
   *
   * The subject is obtained from the user's dictionary.
   */

  const dictionarySentence =
    translateDictionarySentence(
      normalized
    );

  if (dictionarySentence) {
    return dictionarySentence;
  }

  /*
   * ==========================================================
   * 7. FULL DICTIONARY LONGEST-PHRASE MATCH
   * ==========================================================
   *
   * No small hard-coded vocabulary.
   *
   * This searches the complete indexed dictionary.
   */

  const dictionaryResult =
    translateByWords(
      normalized,
      true
    );

  if (dictionaryResult) {
    return dictionaryResult;
  }

  /*
   * ==========================================================
   * 8. FINAL EXACT WORD
   * ==========================================================
   */

  const single =
    lookupEnglish(
      normalized
    );

  if (single) {
    return single;
  }

  /*
   * ==========================================================
   * 9. NOTHING FOUND
   * ==========================================================
   */

  return "";
}

/* ============================================================
   REQUIRED APP FALLBACK
============================================================ */

/*
 * App.tsx imports this function.
 *
 * Keep this export.
 */

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
    translateEnglishToBemba(
      text
    )
  );
}

/* ============================================================
   GET TRANSLATION
============================================================ */

export function getBembaTranslation(
  text: string
): string | undefined {
  const result =
    translateEnglishToBemba(
      text
    );

  return result || undefined;
}

/* ============================================================
   ALL DICTIONARY ALTERNATIVES
============================================================ */

export function getBembaTranslations(
  text: string
): string[] {
  const normalized =
    normalize(
      expandContractions(
        text
      )
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
   SEARCH FULL DICTIONARY
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

  /*
   * Search EVERY dictionary entry.
   */

  for (
    const entry of dictionary
  ) {
    if (!entry) continue;

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
   DEBUG / DICTIONARY INFORMATION
============================================================ */

export function getTranslatorInfo() {
  return {
    mode: "offline",

    source:
      "complete local bembaDictionary",

    dictionaryEntries:
      dictionary.length,

    indexedEntries:
      dictionaryLookup.size,

    singleWordEntries:
      singleWordDictionary.size,

    maximumDictionaryPhraseLength:
      maximumDictionaryPhraseLength,

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
