import { bembaDictionary } from "../data/bembaDictionary";

export type BembaEntry = {
  english: string;
  bemba: string;
};

/*
 * ============================================================
 * BEMBATRANSLATE — OFFLINE TRANSLATION ENGINE
 * ============================================================
 *
 * IMPORTANT:
 * The dictionary in:
 *
 *   src/data/bembaDictionary.ts
 *
 * is the source of truth.
 *
 * This engine does NOT invent Bemba translations.
 * It searches the collected local Bemba data and uses
 * the best available match.
 *
 * Translation priority:
 *
 * 1. Exact complete phrase
 * 2. Exact normalized phrase
 * 3. Longest known phrase
 * 4. Individual dictionary words
 * 5. Safe grammatical pattern matching
 * 6. Unknown English remains unchanged
 *
 * Everything works offline.
 * ============================================================
 */

const dictionary =
  bembaDictionary as BembaEntry[];

/* ------------------------------------------------------------
   NORMALIZATION
------------------------------------------------------------ */

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'`.,!?;:()[\]{}]/g, "")
    .replace(/\s+/g, " ");
}

/*
 * Keep the original Bemba spelling for output.
 * We only normalize English lookup keys.
 */
function cleanTranslation(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------------------------------------
   DICTIONARY INDEX
------------------------------------------------------------ */

const dictionaryLookup =
  new Map<string, string>();

const dictionaryAlternatives =
  new Map<string, string[]>();

for (const entry of dictionary) {
  if (!entry) continue;

  const english = normalize(
    String(entry.english ?? "")
  );

  const bemba = cleanTranslation(
    String(entry.bemba ?? "")
  );

  if (!english || !bemba) {
    continue;
  }

  /*
   * Preserve the first/main translation.
   */
  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }

  /*
   * Preserve alternatives too.
   */
  const existing =
    dictionaryAlternatives.get(english) ?? [];

  if (!existing.includes(bemba)) {
    existing.push(bemba);
  }

  dictionaryAlternatives.set(
    english,
    existing
  );
}

/* ------------------------------------------------------------
   COMMON ENGLISH FORMS
------------------------------------------------------------ */

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

/* ------------------------------------------------------------
   APPLY CONTRACTIONS
------------------------------------------------------------ */

function expandContractions(
  text: string
): string {
  let result = text;

  for (const [
    contraction,
    expanded,
  ] of Object.entries(contractionMap)) {
    const expression =
      new RegExp(
        `\\b${contraction.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}\\b`,
        "gi"
      );

    result = result.replace(
      expression,
      expanded
    );
  }

  return result;
}

/* ------------------------------------------------------------
   EXACT LOOKUP
------------------------------------------------------------ */

function findExactTranslation(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  if (!normalized) {
    return undefined;
  }

  return dictionaryLookup.get(
    normalized
  );
}

/* ------------------------------------------------------------
   LONGEST PHRASE MATCH
------------------------------------------------------------ */

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
    words.length - startIndex;

  /*
   * Try the longest possible phrase first.
   *
   * This is important for entries such as:
   *
   * "good morning"
   * "thank you"
   * "help me"
   * "how are you"
   * "my father"
   * "your mother"
   * etc.
   */

  for (
    let length = remaining;
    length >= 1;
    length--
  ) {
    const phrase = words
      .slice(
        startIndex,
        startIndex + length
      )
      .join(" ");

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

/* ------------------------------------------------------------
   TOKENIZATION
------------------------------------------------------------ */

function tokenize(
  text: string
): string[] {
  return normalize(
    expandContractions(text)
  )
    .split(" ")
    .filter(Boolean);
}

/* ------------------------------------------------------------
   SENTENCE-LEVEL MATCH
------------------------------------------------------------ */

function translateByPhrases(
  text: string
): string {
  const words = tokenize(text);

  if (!words.length) {
    return "";
  }

  const output: string[] = [];

  let index = 0;

  while (index < words.length) {
    const match =
      findLongestMatch(
        words,
        index
      );

    if (match) {
      output.push(
        match.translation
      );

      index += match.length;
      continue;
    }

    /*
     * No phrase was found.
     * Try the individual word.
     */

    const word =
      words[index];

    const translation =
      dictionaryLookup.get(
        word
      );

    if (translation) {
      output.push(
        translation
      );
    } else {
      /*
       * NEVER invent a translation.
       *
       * If the new dictionary doesn't contain
       * the word, keep it visible.
       */
      output.push(word);
    }

    index++;
  }

  return output.join(" ");
}

/* ------------------------------------------------------------
   PERSONAL / POSSESSIVE PATTERN HELP
------------------------------------------------------------ */

const possessivePatterns: Array<{
  english: RegExp;
  key: string;
}> = [
  {
    english: /^my (.+)$/,
    key: "my",
  },
  {
    english: /^your (.+)$/,
    key: "your",
  },
  {
    english: /^his (.+)$/,
    key: "his",
  },
  {
    english: /^her (.+)$/,
    key: "her",
  },
  {
    english: /^our (.+)$/,
    key: "our",
  },
  {
    english: /^their (.+)$/,
    key: "their",
  },
];

/*
 * Try a complete possessive phrase already present
 * in the dictionary first.
 *
 * This function is intentionally conservative.
 * It only constructs a phrase when the relevant
 * pieces actually exist in the collected data.
 */

function tryPossessivePattern(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  for (const pattern of possessivePatterns) {
    const match =
      normalized.match(
        pattern.english
      );

    if (!match) {
      continue;
    }

    const noun =
      match[1];

    const nounTranslation =
      dictionaryLookup.get(
        noun
      );

    const possessiveTranslation =
      dictionaryLookup.get(
        pattern.key
      );

    /*
     * Only use this fallback if both pieces
     * were explicitly collected.
     */
    if (
      nounTranslation &&
      possessiveTranslation
    ) {
      return `${possessiveTranslation} ${nounTranslation}`;
    }
  }

  return undefined;
}

/* ------------------------------------------------------------
   NUMBER SUPPORT
------------------------------------------------------------ */

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
  const normalized =
    normalize(text);

  return numberWords[
    normalized
  ];
}

/* ------------------------------------------------------------
   SPECIAL PHRASE PRIORITY
------------------------------------------------------------ */

const importantPhrases = new Map<
  string,
  string
>([
  [
    "how are you",
    "Muli shani?",
  ],
  [
    "how are you informal",
    "Uli shani?",
  ],
  [
    "good morning",
    "Mwashibukeni!",
  ],
  [
    "good afternoon",
    "Kasuba mukwai",
  ],
  [
    "good evening",
    "Chungulo mukwai",
  ],
  [
    "good night",
    "Sendameenipo",
  ],
  [
    "goodbye",
    "Shalenipo",
  ],
  [
    "thank you",
    "Natotela",
  ],
  [
    "thanks a lot",
    "Natotela saana",
  ],
  [
    "a lot",
    "Saana",
  ],
  [
    "yes",
    "Ee",
  ],
  [
    "no",
    "Awe",
  ],
]);

/* ------------------------------------------------------------
   IMPORTANT PHRASE LOOKUP
------------------------------------------------------------ */

function findImportantPhrase(
  text: string
): string | undefined {
  const normalized =
    normalize(text);

  return importantPhrases.get(
    normalized
  );
}

/* ------------------------------------------------------------
   MASTER TRANSLATION
------------------------------------------------------------ */

export function translateEnglishToBemba(
  text: string
): string {
  const original =
    String(text ?? "");

  if (!original.trim()) {
    return "";
  }

  /*
   * 1. Important collected phrases.
   */
  const important =
    findImportantPhrase(
      original
    );

  if (important) {
    return important;
  }

  /*
   * 2. Exact dictionary phrase.
   */
  const exact =
    findExactTranslation(
      original
    );

  if (exact) {
    return exact;
  }

  /*
   * 3. Number vocabulary.
   */
  const number =
    translateNumber(
      original
    );

  if (number) {
    return number;
  }

  /*
   * 4. Possessive patterns using
   * only explicitly known pieces.
   */
  const possessive =
    tryPossessivePattern(
      original
    );

  if (possessive) {
    return possessive;
  }

  /*
   * 5. Longest phrase + word translation.
   */
  return translateByPhrases(
    original
  );
}

/* ------------------------------------------------------------
   SAFE APPLICATION FUNCTION
------------------------------------------------------------ */

export function translateWithFallback(
  text: string
): string {
  try {
    const result =
      translateEnglishToBemba(
        text
      );

    return result || "";
  } catch (error) {
    console.error(
      "[BembaTranslate] Offline translation error:",
      error
    );

    return "";
  }
}

/* ------------------------------------------------------------
   EXACT TRANSLATION CHECK
------------------------------------------------------------ */

export function hasBembaTranslation(
  text: string
): boolean {
  const normalized =
    normalize(
      expandContractions(text)
    );

  if (!normalized) {
    return false;
  }

  return dictionaryLookup.has(
    normalized
  );
}

/* ------------------------------------------------------------
   EXACT TRANSLATION GETTER
------------------------------------------------------------ */

export function getBembaTranslation(
  text: string
): string | undefined {
  return findExactTranslation(
    text
  );
}

/* ------------------------------------------------------------
   GET ALL KNOWN TRANSLATIONS
------------------------------------------------------------ */

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

/* ------------------------------------------------------------
   DICTIONARY SIZE
------------------------------------------------------------ */

export function getDictionarySize(): number {
  return dictionaryLookup.size;
}

/* ------------------------------------------------------------
   SEARCH LOCAL DICTIONARY
------------------------------------------------------------ */

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

  for (const entry of dictionary) {
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
      results.length >=
      limit
    ) {
      break;
    }
  }

  return results;
}

/* ------------------------------------------------------------
   DEBUG / DEVELOPMENT INFORMATION
------------------------------------------------------------ */

export function getTranslatorInfo() {
  return {
    mode: "offline",
    source:
      "local Bemba dictionary",
    dictionaryEntries:
      dictionary.length,
    indexedEntries:
      dictionaryLookup.size,
    internetRequired: false,
    apiRequired: false,
    cloudRequired: false,
  };
}
