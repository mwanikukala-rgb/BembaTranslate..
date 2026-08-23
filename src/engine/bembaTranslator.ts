import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

/*
 * ============================================================
 * BEMBATRANSLATE
 * COMPLETE OFFLINE ENGLISH → BEMBA TRANSLATION ENGINE
 * ============================================================
 *
 * IMPORTANT:
 *
 * The local dictionary is the PRIMARY translation source.
 *
 * The engine uses:
 *
 * 1. Exact dictionary phrases
 * 2. Normalized dictionary phrases
 * 3. Longest dictionary phrase matching
 * 4. Dictionary word matching
 * 5. English aliases
 * 6. Common sentence patterns
 * 7. Bemba verb roots
 * 8. Possessives
 * 9. Numbers
 * 10. Conservative fuzzy matching
 *
 * No:
 * - Internet
 * - API
 * - Cloud
 * - AI service
 *
 * Everything works offline.
 * ============================================================
 */


/* ============================================================
   DICTIONARY
============================================================ */

const dictionary =
  (bembaDictionary as BembaEntry[]) ?? [];


/* ============================================================
   NORMALIZATION
============================================================ */

/**
 * Creates a comparison-safe version of text.
 *
 * This means:
 *
 * "How are you?"
 * "how are you"
 * "HOW ARE YOU"
 *
 * all become:
 *
 * "how are you"
 */
function normalize(text: string): string {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'`.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/**
 * Keeps the actual Bemba translation readable.
 */
function cleanTranslation(
  text: string
): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}


/* ============================================================
   DICTIONARY INDEXES
============================================================ */

/**
 * Primary translation.
 *
 * English:
 * "money"
 *
 * Bemba:
 * "indalama"
 */
const dictionaryLookup =
  new Map<string, string>();


/**
 * ALL translations for an English entry.
 *
 * Example:
 *
 * "run"
 * →
 * [
 *   "ukwenda",
 *   "ukutuka"
 * ]
 */
const dictionaryAlternatives =
  new Map<string, string[]>();


/**
 * Original dictionary entries indexed by normalized English.
 *
 * Useful for preserving the complete source data.
 */
const dictionaryEntriesByEnglish =
  new Map<string, BembaEntry[]>();


/**
 * Set of all individual English words.
 *
 * This makes word lookup much more reliable.
 */
const dictionaryWords =
  new Set<string>();


/**
 * Maximum dictionary phrase length.
 *
 * This is calculated from the actual dictionary rather than
 * assuming that phrases contain only a few words.
 */
let maximumPhraseWords = 1;


/* ============================================================
   BUILD DICTIONARY INDEX
============================================================ */

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
   * ----------------------------------------------------------
   * PRIMARY TRANSLATION
   * ----------------------------------------------------------
   */

  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }


  /*
   * ----------------------------------------------------------
   * ALTERNATIVE TRANSLATIONS
   * ----------------------------------------------------------
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
   * ----------------------------------------------------------
   * ORIGINAL ENTRIES
   * ----------------------------------------------------------
   */

  const originalEntries =
    dictionaryEntriesByEnglish.get(
      english
    ) ?? [];

  originalEntries.push({
    english: entry.english,
    bemba: entry.bemba,
  });

  dictionaryEntriesByEnglish.set(
    english,
    originalEntries
  );


  /*
   * ----------------------------------------------------------
   * INDIVIDUAL WORD INDEX
   * ----------------------------------------------------------
   */

  const words =
    english.split(" ");

  for (const word of words) {
    if (word) {
      dictionaryWords.add(word);
    }
  }


  /*
   * ----------------------------------------------------------
   * PHRASE LENGTH
   * ----------------------------------------------------------
   */

  if (
    words.length >
    maximumPhraseWords
  ) {
    maximumPhraseWords =
      words.length;
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


/* ============================================================
   EXPAND CONTRACTIONS
============================================================ */

function expandContractions(
  text: string
): string {
  let result = String(text ?? "");

  for (
    const [from, to]
    of Object.entries(contractionMap)
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
   ENGLISH ALIASES
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
   LOOKUP EXACT DICTIONARY
============================================================ */

function lookupDictionary(
  text: string
): string | undefined {

  const normalized =
    normalize(text);

  if (!normalized) {
    return undefined;
  }

  return dictionaryLookup.get(
    normalized
  );
}


/* ============================================================
   LOOKUP WITH ALIAS
============================================================ */

function lookupEnglish(
  text: string
): string | undefined {

  const normalized =
    normalize(text);

  if (!normalized) {
    return undefined;
  }


  /*
   * FIRST:
   * Actual dictionary.
   */

  const direct =
    dictionaryLookup.get(
      normalized
    );

  if (direct) {
    return direct;
  }


  /*
   * SECOND:
   * Alias.
   */

  const alias =
    englishAliases[
      normalized
    ];

  if (alias) {
    return dictionaryLookup.get(
      normalize(alias)
    );
  }


  return undefined;
}


/* ============================================================
   ALL DICTIONARY TRANSLATIONS
============================================================ */

function lookupAllEnglish(
  text: string
): string[] {

  const normalized =
    normalize(text);

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
   ROOT CLEANING
============================================================ */

function cleanRoot(
  root: string
): string {

  return root
    .replace(
      /^[-–—]/,
      ""
    )
    .trim();
}


/* ============================================================
   VERB ROOT
============================================================ */

function getVerbRoot(
  englishWord: string
): string | undefined {

  const translations =
    lookupAllEnglish(
      englishWord
    );

  if (!translations.length) {
    return undefined;
  }


  /*
   * Look through ALL available
   * translations rather than only
   * the first one.
   */

  for (
    const translation
    of translations
  ) {

    const parts =
      translation
        .split("/")
        .map(
          item => item.trim()
        )
        .filter(Boolean);

    for (
      const part
      of parts
    ) {

      if (
        part.startsWith("-") ||
        part.startsWith("–") ||
        part.startsWith("—")
      ) {
        return cleanRoot(part);
      }
    }
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
   * Complete phrase first.
   */

  const complete =
    lookupEnglish(
      normalized
    );

  if (complete) {
    return complete;
  }


  /*
   * Then translate the object
   * using longest dictionary phrases.
   */

  const words =
    tokenize(normalized);

  if (!words.length) {
    return undefined;
  }

  const result =
    translateTokens(
      words
    );

  if (
    result.translated &&
    result.unknown.length === 0
  ) {
    return result.translated;
  }

  return undefined;
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
   IMPORTANT EVERYDAY PHRASES
============================================================ */

/**
 * These are ONLY high-confidence phrases.
 *
 * They do NOT replace the dictionary.
 */

const importantPhrases =
  new Map<string, string>([

    [
      "how are you",
      "Mulishani?"
    ],

    [
      "good morning",
      "Mwashibukeni!"
    ],

    [
      "good afternoon",
      "Kasuba mukwai"
    ],

    [
      "good evening",
      "Chungulo mukwai"
    ],

    [
      "good night",
      "Sendameenipo"
    ],

    [
      "goodbye",
      "Shalenipo"
    ],

    [
      "thank you",
      "Natotela"
    ],

    [
      "thanks",
      "Natotela"
    ],

    [
      "thanks a lot",
      "Natotela saana"
    ],

    [
      "a lot",
      "Saana"
    ],

    [
      "yes",
      "Ee"
    ],

    [
      "no",
      "Awe"
    ],

    [
      "where are you",
      "Ulikwisa?"
    ],

    [
      "where are they",
      "Balikwisa?"
    ],

    [
      "i want money",
      "Ndefwaya indalama"
    ],

    [
      "i am angry",
      "Nimfulwa"
    ],

    [
      "i'm angry",
      "Nimfulwa"
    ],

    [
      "i am sick",
      "Ndelwala"
    ],

    [
      "i'm sick",
      "Ndelwala"
    ],
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

  /*
   * I WANT
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

  /*
   * I NEED
   */

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
      maximumPhraseWords
    );


  /*
   * ALWAYS try longest phrases first.
   */

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
   TOKEN TRANSLATION RESULT
============================================================ */

type TokenTranslationResult = {
  translated: string;
  unknown: string[];
};


/* ============================================================
   TRANSLATE TOKENS
============================================================ */

function translateTokens(
  words: string[]
): TokenTranslationResult {

  const output: string[] = [];

  const unknown: string[] = [];

  let index = 0;


  while (
    index < words.length
  ) {

    /*
     * --------------------------------------------------------
     * LONGEST PHRASE
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
     * SINGLE WORD
     * --------------------------------------------------------
     */

    const word =
      words[index];

    const direct =
      lookupEnglish(
        word
      );

    if (direct) {

      output.push(
        direct
      );

      index++;

      continue;
    }


    /*
     * --------------------------------------------------------
     * ALIAS
     * --------------------------------------------------------
     */

    const alias =
      englishAliases[
        word
      ];

    if (alias) {

      const aliasTranslation =
        lookupEnglish(
          alias
        );

      if (aliasTranslation) {

        output.push(
          aliasTranslation
        );

        index++;

        continue;
      }
    }


    /*
     * --------------------------------------------------------
     * UNKNOWN
     *
     * IMPORTANT:
     *
     * We DO NOT immediately return "".
     *
     * This is one of the major fixes.
     * --------------------------------------------------------
     */

    unknown.push(word);

    index++;
  }


  return {
    translated:
      output.join(" "),

    unknown,
  };
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


  return previous[
    b.length
  ];
}


/* ============================================================
   FUZZY LOOKUP
============================================================ */

/**
 * Fuzzy matching is deliberately conservative.
 *
 * It is NOT allowed to override an exact dictionary result.
 */
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


  for (
    const [
      english,
      translation
    ]
    of dictionaryLookup
  ) {

    /*
     * Only individual words.
     */

    if (
      english.includes(" ")
    ) {
      continue;
    }


    /*
     * Length restriction.
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
   WORD TRANSLATION WITH FUZZY SUPPORT
============================================================ */

function translateTokensWithFuzzy(
  words: string[]
): TokenTranslationResult {

  const output: string[] = [];

  const unknown: string[] = [];

  let index = 0;


  while (
    index < words.length
  ) {

    /*
     * Longest phrase.
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


    const word =
      words[index];


    /*
     * Exact word.
     */

    const direct =
      lookupEnglish(
        word
      );

    if (direct) {

      output.push(
        direct
      );

      index++;

      continue;
    }


    /*
     * Fuzzy word.
     */

    const fuzzy =
      fuzzyLookup(
        word
      );

    if (fuzzy) {

      output.push(
        fuzzy
      );

      index++;

      continue;
    }


    /*
     * Keep track of unknown word.
     */

    unknown.push(word);

    index++;
  }


  return {
    translated:
      output.join(" "),

    unknown,
  };
}


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
   * IMPORTANT PHRASES
   */

  const important =
    importantPhrases.get(
      normalized
    );

  if (important) {
    return important;
  }


  /*
   * DIRECT PATTERNS
   */

  for (
    const item
    of directPatterns
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
   * ==========================================================
   * I + VERB
   * ==========================================================
   */

  const iMatch =
    normalized.match(
      /^i\s+(.+)$/
    );

  if (iMatch) {

    let rest =
      iMatch[1];

    rest =
      rest
        .replace(
          /^(am|do|does|will|can|must)\s+/,
          ""
        )
        .trim();


    const words =
      rest.split(" ");

    const verb =
      words[0];


    const conjugated =
      conjugatePresent(
        "i",
        verb
      );

    if (conjugated) {

      const objectWords =
        words.slice(1);

      if (
        objectWords.length
      ) {

        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {

          return (
            `${conjugated} ${object}`
          );
        }
      }


      return conjugated;
    }
  }


  /*
   * ==========================================================
   * YOU + VERB
   * ==========================================================
   */

  const youMatch =
    normalized.match(
      /^you\s+(.+)$/
    );

  if (youMatch) {

    let rest =
      youMatch[1];

    rest =
      rest
        .replace(
          /^(are|do|does|will|can|must)\s+/,
          ""
        )
        .trim();


    const words =
      rest.split(" ");

    const verb =
      words[0];


    const conjugated =
      conjugatePresent(
        "you",
        verb
      );

    if (conjugated) {

      const objectWords =
        words.slice(1);

      if (
        objectWords.length
      ) {

        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {

          return (
            `${conjugated} ${object}`
          );
        }
      }


      return conjugated;
    }
  }


  /*
   * ==========================================================
   * HE / SHE + VERB
   * ==========================================================
   */

  const thirdPerson =
    normalized.match(
      /^(he|she)\s+(.+)$/
    );

  if (thirdPerson) {

    const subject =
      thirdPerson[1];

    let rest =
      thirdPerson[2];

    rest =
      rest
        .replace(
          /^(is|does|will|can|must)\s+/,
          ""
        )
        .trim();


    const words =
      rest.split(" ");

    const verb =
      words[0];


    const conjugated =
      conjugatePresent(
        subject,
        verb
      );

    if (conjugated) {

      const objectWords =
        words.slice(1);

      if (
        objectWords.length
      ) {

        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {

          return (
            `${conjugated} ${object}`
          );
        }
      }


      return conjugated;
    }
  }


  /*
   * ==========================================================
   * WE + VERB
   * ==========================================================
   */

  const weMatch =
    normalized.match(
      /^we\s+(.+)$/
    );

  if (weMatch) {

    let rest =
      weMatch[1];

    rest =
      rest
        .replace(
          /^(are|do|does|will|can|must)\s+/,
          ""
        )
        .trim();


    const words =
      rest.split(" ");

    const verb =
      words[0];


    const conjugated =
      conjugatePresent(
        "we",
        verb
      );

    if (conjugated) {

      const objectWords =
        words.slice(1);

      if (
        objectWords.length
      ) {

        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {

          return (
            `${conjugated} ${object}`
          );
        }
      }


      return conjugated;
    }
  }


  /*
   * ==========================================================
   * THEY + VERB
   * ==========================================================
   */

  const theyMatch =
    normalized.match(
      /^they\s+(.+)$/
    );

  if (theyMatch) {

    let rest =
      theyMatch[1];

    rest =
      rest
        .replace(
          /^(are|do|does|will|can|must)\s+/,
          ""
        )
        .trim();


    const words =
      rest.split(" ");

    const verb =
      words[0];


    const conjugated =
      conjugatePresent(
        "they",
        verb
      );

    if (conjugated) {

      const objectWords =
        words.slice(1);

      if (
        objectWords.length
      ) {

        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {

          return (
            `${conjugated} ${object}`
          );
        }
      }


      return conjugated;
    }
  }


  /*
   * ==========================================================
   * I AM + VALUE
   * ==========================================================
   */

  const iAm =
    normalized.match(
      /^i am (.+)$/
    );

  if (iAm) {

    const value =
      iAm[1];


    const root =
      getVerbRoot(
        value
      );

    if (root) {
      return `Nde${root}`;
    }


    const translation =
      lookupEnglish(
        value
      );

    if (translation) {
      return `Ndi ${translation}`;
    }
  }


  /*
   * ==========================================================
   * YOU ARE + VALUE
   * ==========================================================
   */

  const youAre =
    normalized.match(
      /^you are (.+)$/
    );

  if (youAre) {

    const value =
      youAre[1];


    const root =
      getVerbRoot(
        value
      );

    if (root) {
      return `Ule${root}`;
    }


    const translation =
      lookupEnglish(
        value
      );

    if (translation) {
      return `Uli ${translation}`;
    }
  }


  /*
   * ==========================================================
   * HE / SHE IS + VALUE
   * ==========================================================
   */

  const heSheIs =
    normalized.match(
      /^(he|she) is (.+)$/
    );

  if (heSheIs) {

    const value =
      heSheIs[2];


    const root =
      getVerbRoot(
        value
      );

    if (root) {
      return `Ale${root}`;
    }


    const translation =
      lookupEnglish(
        value
      );

    if (translation) {
      return `Ali ${translation}`;
    }
  }


  return undefined;
}


/* ============================================================
   NUMBERS
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


  const expanded =
    expandContractions(
      original
    );


  const normalized =
    normalize(
      expanded
    );

  if (!normalized) {
    return "";
  }


  /*
   * ==========================================================
   * 1. HIGH-CONFIDENCE PHRASE
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
   * 2. EXACT DICTIONARY
   * ==========================================================
   *
   * THIS IS THE MOST IMPORTANT PART.
   *
   * Your large dictionary gets first-class treatment.
   * ==========================================================
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
   * 5. SENTENCE PATTERNS
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
   * 6. COMPLETE DICTIONARY TOKEN MATCH
   * ==========================================================
   */

  const words =
    tokenize(
      normalized
    );


  if (!words.length) {
    return "";
  }


  const tokenResult =
    translateTokensWithFuzzy(
      words
    );


  /*
   * ==========================================================
   * 7. IF EVERYTHING WAS TRANSLATED
   * ==========================================================
   */

  if (
    tokenResult.translated &&
    tokenResult.unknown.length === 0
  ) {

    return tokenResult.translated;
  }


  /*
   * ==========================================================
   * 8. PARTIAL DICTIONARY RESULT
   * ==========================================================
   *
   * IMPORTANT:
   *
   * We don't throw away known dictionary data simply
   * because one word isn't available.
   *
   * However, we only return the partial result if there
   * is meaningful translated content.
   * ==========================================================
   */

  if (
    tokenResult.translated &&
    tokenResult.translated.length > 1
  ) {

    return tokenResult.translated;
  }


  /*
   * ==========================================================
   * 9. NOTHING RELIABLE
   * ==========================================================
   */

  return "";
}


/* ============================================================
   SAFE TRANSLATION
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
   CHECK TRANSLATION
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
   GET ALL TRANSLATIONS
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
   GET ORIGINAL DICTIONARY ENTRIES
============================================================ */

export function getDictionaryEntries(
  text: string
): BembaEntry[] {

  const normalized =
    normalize(text);

  if (!normalized) {
    return [];
  }


  return (
    dictionaryEntriesByEnglish.get(
      normalized
    ) ?? []
  ).map(entry => ({
    english:
      entry.english,

    bemba:
      entry.bemba,
  }));
}


/* ============================================================
   DICTIONARY SIZE
============================================================ */

/**
 * Number of raw entries in bembaDictionary.ts.
 */
export function getDictionarySize(): number {
  return dictionary.length;
}


/**
 * Number of unique normalized English entries.
 */
export function getUniqueDictionarySize(): number {
  return dictionaryLookup.size;
}


/**
 * Number of unique English words.
 */
export function getDictionaryWordCount(): number {
  return dictionaryWords.size;
}


/**
 * Maximum phrase length found in the dictionary.
 */
export function getMaximumPhraseLength(): number {
  return maximumPhraseWords;
}


/* ============================================================
   SEARCH DICTIONARY
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


  const results: BembaEntry[] = [];

  const seen =
    new Set<string>();


  /*
   * Search the COMPLETE dictionary.
   */

  for (
    const entry
    of dictionary
  ) {

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

      const key =
        `${entry.english}::${entry.bemba}`;

      if (!seen.has(key)) {

        seen.add(key);

        results.push({
          english:
            entry.english,

          bemba:
            entry.bemba,
        });
      }
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
   FIND EXACT DICTIONARY ENTRY
============================================================ */

export function findExactDictionaryEntry(
  text: string
): BembaEntry | undefined {

  const normalized =
    normalize(text);

  if (!normalized) {
    return undefined;
  }


  const entries =
    dictionaryEntriesByEnglish.get(
      normalized
    );


  if (
    !entries ||
    !entries.length
  ) {
    return undefined;
  }


  return {
    english:
      entries[0].english,

    bemba:
      entries[0].bemba,
  };
}


/* ============================================================
   DEBUG INFORMATION
============================================================ */

export function getTranslatorInfo() {

  let duplicateEnglishEntries =
    0;

  for (
    const alternatives
    of dictionaryAlternatives.values()
  ) {

    if (
      alternatives.length > 1
    ) {
      duplicateEnglishEntries++;
    }
  }


  return {

    mode:
      "offline",

    source:
      "complete local Bemba dictionary",

    rawDictionaryEntries:
      dictionary.length,

    uniqueEnglishEntries:
      dictionaryLookup.size,

    uniqueEnglishWords:
      dictionaryWords.size,

    duplicateEnglishEntries,

    maximumPhraseWords:
      maximumPhraseWords,

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


/* ============================================================
   DICTIONARY HEALTH CHECK
============================================================ */

/**
 * Useful for testing whether the complete dictionary is
 * actually being loaded by the application.
 */
export function getDictionaryHealth() {

  let validEntries = 0;
  let emptyEntries = 0;
  let duplicateEntries = 0;


  const seen =
    new Set<string>();


  for (
    const entry
    of dictionary
  ) {

    const english =
      normalize(
        entry?.english ?? ""
      );

    const bemba =
      cleanTranslation(
        entry?.bemba ?? ""
      );


    if (
      !english ||
      !bemba
    ) {

      emptyEntries++;

      continue;
    }


    validEntries++;


    const key =
      `${english}::${bemba}`;


    if (
      seen.has(key)
    ) {

      duplicateEntries++;

    } else {

      seen.add(key);
    }
  }


  return {

    rawEntries:
      dictionary.length,

    validEntries,

    emptyEntries,

    duplicateEntries,

    indexedEnglishEntries:
      dictionaryLookup.size,

    indexedWords:
      dictionaryWords.size,

    maximumPhraseWords,

    healthy:
      validEntries > 0,
  };
}
