import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

/*
 * ============================================================
 * BEMBATRANSLATE
 * DICTIONARY-FIRST OFFLINE ENGLISH → BEMBA ENGINE
 * ============================================================
 *
 * IMPORTANT:
 *
 * The local dictionary is the SOURCE OF TRUTH.
 *
 * The engine does NOT replace the dictionary with a small
 * collection of hard-coded words.
 *
 * It supports:
 *
 * 1. Exact dictionary phrases
 * 2. Normalized dictionary phrases
 * 3. All dictionary words
 * 4. Longest phrase matching
 * 5. Common English variations
 * 6. Controlled sentence patterns
 * 7. Controlled Bemba verb-root conjugation
 * 8. Very conservative fuzzy matching
 *
 * Fuzzy matching NEVER gets priority over the dictionary.
 *
 * This is completely offline.
 * ============================================================
 */


/* ============================================================
   DICTIONARY
============================================================ */

const dictionary =
  Array.isArray(bembaDictionary)
    ? (bembaDictionary as BembaEntry[])
    : [];


/* ============================================================
   NORMALIZATION
============================================================ */

/*
 * Removes accents/diacritics only for LOOKUP purposes.
 *
 * The original Bemba spelling remains untouched in output.
 */

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
   DICTIONARY INDEXES
============================================================ */

/*
 * Primary dictionary lookup.
 *
 * Example:
 *
 * "money" -> "indalama"
 *
 * The FIRST valid dictionary translation is retained.
 *
 * This prevents later unrelated entries from overwriting it.
 */

const dictionaryLookup =
  new Map<string, string>();


/*
 * Keep every translation for an English entry.
 *
 * Example:
 *
 * "bank" ->
 * [
 *   "bank",
 *   "..."
 * ]
 */

const dictionaryAlternatives =
  new Map<string, string[]>();


/*
 * Store original dictionary entries as well.
 *
 * This makes dictionary searching use the FULL dataset.
 */

const indexedDictionary: BembaEntry[] = [];


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
   * Keep original entry for dictionary search.
   */

  indexedDictionary.push({
    english: entry.english,
    bemba: entry.bemba,
  });


  /*
   * IMPORTANT:
   *
   * Never overwrite an existing exact dictionary entry.
   */

  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }


  /*
   * Store alternatives.
   */

  const existing =
    dictionaryAlternatives.get(
      english
    ) ?? [];


  if (!existing.includes(bemba)) {
    existing.push(bemba);
  }


  dictionaryAlternatives.set(
    english,
    existing
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

/*
 * These are ONLY used when the requested word itself is not
 * already present in the dictionary.
 *
 * Exact dictionary data always wins.
 */

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

/*
 * These are ONLY high-confidence phrases.
 *
 * Dictionary entries still have priority over these when the
 * exact phrase exists in the dictionary.
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
   EXACT DICTIONARY LOOKUP
============================================================ */

/*
 * THIS IS THE MOST IMPORTANT FUNCTION.
 *
 * It checks the complete indexed dictionary first.
 *
 * Therefore:
 *
 * money
 *
 * will use the dictionary entry for "money" if it exists.
 *
 * It will NOT fuzzy-match money to kolwe.
 */

function lookupEnglish(
  word: string
): string | undefined {

  const normalized =
    normalize(word);

  if (!normalized) {
    return undefined;
  }


  /*
   * STEP 1:
   * Exact normalized dictionary match.
   */

  const exact =
    dictionaryLookup.get(
      normalized
    );

  if (exact) {
    return exact;
  }


  /*
   * STEP 2:
   * Alias only if the original word is NOT
   * present in the dictionary.
   */

  const alias =
    englishAliases[
      normalized
    ];

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
   CHECK WHETHER DICTIONARY CONTAINS WORD
============================================================ */

function hasExactDictionaryEntry(
  word: string
): boolean {
  const normalized =
    normalize(word);

  return dictionaryLookup.has(
    normalized
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

  const translation =
    lookupEnglish(
      englishWord
    );

  if (!translation) {
    return undefined;
  }


  /*
   * Support dictionary entries such as:
   *
   * -landa/-sosa
   */

  const first =
    translation
      .split("/")
      .map(
        item => item.trim()
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
   PRESENT CONJUGATION
============================================================ */

function conjugatePresent(
  subject: string,
  verb: string
): string | undefined {

  const root =
    getVerbRoot(
      verb
    );

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
   * Exact complete phrase.
   */

  const direct =
    lookupEnglish(
      normalized
    );

  if (direct) {
    return direct;
  }


  /*
   * Translate every word using the FULL dictionary.
   */

  const words =
    tokenize(
      normalized
    );

  if (!words.length) {
    return undefined;
  }


  const translated: string[] =
    [];


  for (
    const word of words
  ) {

    const translation =
      lookupEnglish(
        word
      );

    if (!translation) {
      return undefined;
    }

    translated.push(
      translation
    );
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
    pattern:
      /^i am sick$/,
    result:
      "Ndelwala",
  },

  {
    pattern:
      /^i am angry$/,
    result:
      "Nimfulwa",
  },

  {
    pattern:
      /^i am working$/,
    result:
      "Ndebomba",
  },

  {
    pattern:
      /^i work$/,
    result:
      "Ndebomba",
  },

  {
    pattern:
      /^i am suffering$/,
    result:
      "Ndecula",
  },

  {
    pattern:
      /^i suffer$/,
    result:
      "Ndecula",
  },

  {
    pattern:
      /^i am writing$/,
    result:
      "Ndelemba",
  },

  {
    pattern:
      /^i write$/,
    result:
      "Ndelemba",
  },

  {
    pattern:
      /^i am walking$/,
    result:
      "Ndeenda",
  },

  {
    pattern:
      /^i walk$/,
    result:
      "Ndeenda",
  },

  {
    pattern:
      /^i am waiting$/,
    result:
      "Ndelolela",
  },

  {
    pattern:
      /^i wait$/,
    result:
      "Ndelolela",
  },

  {
    pattern:
      /^i am visiting$/,
    result:
      "Ndetandala",
  },

  {
    pattern:
      /^i visit$/,
    result:
      "Ndetandala",
  },

  {
    pattern:
      /^i am talking$/,
    result:
      "Ndelanda",
  },

  {
    pattern:
      /^i talk$/,
    result:
      "Ndelanda",
  },

  {
    pattern:
      /^i am speaking$/,
    result:
      "Ndelanda",
  },

  {
    pattern:
      /^i speak$/,
    result:
      "Ndelanda",
  },

  {
    pattern:
      /^i am buying$/,
    result:
      "Ndeshita",
  },

  {
    pattern:
      /^i buy$/,
    result:
      "Ndeshita",
  },

  {
    pattern:
      /^i am selling$/,
    result:
      "Ndeshitisha",
  },

  {
    pattern:
      /^i sell$/,
    result:
      "Ndeshitisha",
  },

  {
    pattern:
      /^i am washing$/,
    result:
      "Ndesamba",
  },

  {
    pattern:
      /^i wash$/,
    result:
      "Ndesamba",
  },

  {
    pattern:
      /^i am learning$/,
    result:
      "Ndefunda",
  },

  {
    pattern:
      /^i learn$/,
    result:
      "Ndefunda",
  },

  {
    pattern:
      /^i am teaching$/,
    result:
      "Ndefunda",
  },

  {
    pattern:
      /^i teach$/,
    result:
      "Ndefunda",
  },

  {
    pattern:
      /^i am sitting$/,
    result:
      "Ndeikala",
  },

  {
    pattern:
      /^i sit$/,
    result:
      "Ndeikala",
  },

  {
    pattern:
      /^i am staying$/,
    result:
      "Ndeikala",
  },

  {
    pattern:
      /^i stay$/,
    result:
      "Ndeikala",
  },

  {
    pattern:
      /^i am going$/,
    result:
      "Ndeenda",
  },

  {
    pattern:
      /^i go$/,
    result:
      "Ndeenda",
  },

  {
    pattern:
      /^i am coming$/,
    result:
      "Ndesa",
  },

  {
    pattern:
      /^i come$/,
    result:
      "Ndesa",
  },

  /*
   * I WANT OBJECT
   */

  {
    pattern:
      /^i want (.+)$/,
    result: (
      match
    ) => {

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
   * I NEED OBJECT
   */

  {
    pattern:
      /^i need (.+)$/,
    result: (
      match
    ) => {

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
   SENTENCE ENGINE
============================================================ */

function translateSentencePattern(
  text: string
): string | undefined {

  const normalized =
    normalize(
      expandContractions(
        text
      )
    );


  /*
   * Important phrase.
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
      item.result(
        match
      );


    if (result) {
      return result;
    }
  }


  /*
   * ==========================================================
   * GENERIC SUBJECT + VERB
   * ==========================================================
   */

  const subjectVerb =
    normalized.match(
      /^(i|you|he|she|we|they)\s+(.+)$/
    );


  if (subjectVerb) {

    const subject =
      subjectVerb[1];

    let rest =
      subjectVerb[2];


    rest =
      rest
        .replace(
          /^(am|are|is|do|does|will|can|must)\s+/,
          ""
        )
        .trim();


    const verbWords =
      rest.split(" ");


    const verb =
      verbWords[0];


    const conjugated =
      conjugatePresent(
        subject,
        verb
      );


    if (conjugated) {

      const objectWords =
        verbWords.slice(1);


      if (
        objectWords.length
      ) {

        const object =
          translateObject(
            objectWords.join(" ")
          );


        if (object) {
          return `${conjugated} ${object}`;
        }
      }


      return conjugated;
    }
  }


  /*
   * I AM + VALUE
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
   * YOU ARE + VALUE
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
   * HE / SHE IS + VALUE
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
   LONGEST DICTIONARY PHRASE
============================================================ */

/*
 * This searches the FULL dictionary index.
 *
 * Example:
 *
 * "good morning everyone"
 *
 * will first attempt:
 *
 * "good morning everyone"
 * "good morning"
 * "good"
 *
 * before moving to the next word.
 */

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


  /*
   * Allow reasonably long dictionary phrases.
   */

  const maxLength =
    Math.min(
      remaining,
      20
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


    /*
     * IMPORTANT:
     *
     * Direct dictionary lookup only.
     *
     * No fuzzy matching here.
     */

    const translation =
      dictionaryLookup.get(
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
   LEVENS
