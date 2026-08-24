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
  never: "nangu limo",

  yes: "ee",
  no: "ai",
  please: "nangu",
  sorry: "nsambileni",
  thanks: "natotela",
  thank: "tasha",
  welcome: "mwapokelelwa",
};

const bembaFunctionWords: Record<string, string> = {
  ine: "I",
  imwe: "you",
  ena: "he/she",
  ifwe: "we",
  bena: "they",

  na: "and",
  lelo: "today",
  mailo: "tomorrow",
  nomba: "now",
  pano: "here",
  pantu: "because",
  ukwabula: "without",

  mu: "in",
  pa: "at/on",
  ku: "to",
};

/* ============================================================
   COMMON ENGLISH PATTERN RECOGNITION
   ============================================================ */

type PatternRule = {
  pattern: RegExp;
  build: (match: RegExpMatchArray) => string | null;
};

/*
 * These rules are intentionally limited.
 *
 * We are NOT pretending to have a complete machine-translation
 * grammar. We only handle patterns where we can safely use
 * information already present in the dictionary.
 */

const EnglishPatterns: PatternRule[] = [
  {
    pattern:
      /^i\s+am\s+not\s+feeling\s+well\s+today\s+because\s+i\s+(?:ate|have eaten)\s+(.+)$/i,
    build: (match) => {
      const food = translateEnglishFragment(match[1]);

      if (!food) {
        return null;
      }

      /*
       * This gives the exact natural structure discussed:
       *
       * I am not feeling well today because I ate banana.
       *
       * -> Nshileumfwa bwino pantu nachilya inkonde
       *
       * The important point is that the food itself is obtained
       * from the user's dictionary.
       */
      return `Nshileumfwa bwino pantu nachilya ${food}`;
    },
  },

  {
    pattern:
      /^i\s+am\s+not\s+feeling\s+well\s+because\s+i\s+(?:ate|have eaten)\s+(.+)$/i,
    build: (match) => {
      const food = translateEnglishFragment(match[1]);

      if (!food) {
        return null;
      }

      return `Nshileumfwa bwino pantu nachilya ${food}`;
    },
  },

  {
    pattern: /^i\s+am\s+not\s+feeling\s+well\s+today$/i,
    build: () => "Nshileumfwa bwino lelo",
  },

  {
    pattern: /^i\s+am\s+not\s+feeling\s+well$/i,
    build: () => "Nshileumfwa bwino",
  },

  {
    pattern: /^i\s+feel\s+well\s+today$/i,
    build: () => "Ndemfwa bwino lelo",
  },

  {
    pattern: /^i\s+feel\s+well$/i,
    build: () => "Ndemfwa bwino",
  },

  {
    pattern: /^i\s+am\s+eating\s+(.+)$/i,
    build: (match) => {
      const food = translateEnglishFragment(match[1]);

      if (!food) {
        return null;
      }

      return `Ndelya ${food}`;
    },
  },

  {
    pattern: /^i\s+ate\s+(.+)$/i,
    build: (match) => {
      const food = translateEnglishFragment(match[1]);

      if (!food) {
        return null;
      }

      return `Nacilya ${food}`;
    },
  },

  {
    pattern: /^i\s+want\s+(.+)$/i,
    build: (match) => {
      const thing = translateEnglishFragment(match[1]);

      if (!thing) {
        return null;
      }

      return `Ndefwaya ${thing}`;
    },
  },

  {
    pattern: /^i\s+need\s+(.+)$/i,
    build: (match) => {
      const thing = translateEnglishFragment(match[1]);

      if (!thing) {
        return null;
      }

      return `Ndekabila ${thing}`;
    },
  },

  {
    pattern: /^i\s+like\s+(.+)$/i,
    build: (match) => {
      const thing = translateEnglishFragment(match[1]);

      if (!thing) {
        return null;
      }

      return `Ndetemwa ${thing}`;
    },
  },

  {
    pattern: /^i\s+love\s+(.+)$/i,
    build: (match) => {
      const thing = translateEnglishFragment(match[1]);

      if (!thing) {
        return null;
      }

      return `Ndetemwa ${thing}`;
    },
  },

  {
    pattern: /^i\s+know\s+(.+)$/i,
    build: (match) => {
      const thing = translateEnglishFragment(match[1]);

      if (!thing) {
        return null;
      }

      return `Ndeshiba ${thing}`;
    },
  },

  {
    pattern: /^i\s+want\s+to\s+(.+)$/i,
    build: (match) => {
      const action = translateEnglishFragment(match[1]);

      if (!action) {
        return null;
      }

      return `Ndefwaya ${removeUkPrefix(action)}`;
    },
  },

  {
    pattern: /^i\s+need\s+to\s+(.+)$/i,
    build: (match) => {
      const action = translateEnglishFragment(match[1]);

      if (!action) {
        return null;
      }

      return `Ndekabila ${removeUkPrefix(action)}`;
    },
  },

  {
    pattern: /^i\s+am\s+(.+)$/i,
    build: (match) => {
      const adjective = translateEnglishFragment(match[1]);

      if (!adjective) {
        return null;
      }

      return `Ndi ${adjective}`;
    },
  },

  {
    pattern: /^i\s+will\s+(.+)$/i,
    build: (match) => {
      const action = translateEnglishFragment(match[1]);

      if (!action) {
        return null;
      }

      return `Nka${removeUkPrefix(action)}`;
    },
  },

  {
    pattern: /^i\s+can\s+(.+)$/i,
    build: (match) => {
      const action = translateEnglishFragment(match[1]);

      if (!action) {
        return null;
      }

      return `Nshinga ${removeUkPrefix(action)}`;
    },
  },

  {
    pattern: /^please\s+(.+)$/i,
    build: (match) => {
      const action = translateEnglishFragment(match[1]);

      if (!action) {
        return null;
      }

      return `Nomba ${action}`;
    },
  },

  {
    pattern: /^thank\s+you$/i,
    build: () => "Natotela",
  },

  {
    pattern: /^thank\s+you\s+very\s+much$/i,
    build: () => "Natotela sana",
  },

  {
    pattern: /^how\s+are\s+you\??$/i,
    build: () => "Muli shani?",
  },

  {
    pattern: /^how\s+are\s+you\s+today\??$/i,
    build: () => "Muli shani lelo?",
  },

  {
    pattern: /^what\s+is\s+your\s+name\??$/i,
    build: () => "Ishina lyenu ninani?",
  },

  {
    pattern: /^my\s+name\s+is\s+(.+)$/i,
    build: (match) => `Ishina lyandi ni ${match[1].trim()}`,
  },

  {
    pattern: /^where\s+are\s+you\??$/i,
    build: () => "Muli kwisa?",
  },

  {
    pattern: /^where\s+do\s+you\s+live\??$/i,
    build: () => "Mwikala kwisa?",
  },

  {
    pattern: /^what\s+are\s+you\s+doing\??$/i,
    build: () => "Cinshi mulecita?",
  },

  {
    pattern: /^what\s+are\s+you\s+doing\s+today\??$/i,
    build: () => "Cinshi mulecita lelo?",
  },
];

/* ============================================================
   BEMBA PATTERN RECOGNITION
   ============================================================ */

const BembaPatterns: PatternRule[] = [
  {
    pattern: /^nshileumfwa bwino pantu nachilya (.+)$/i,
    build: (match) => {
      const food = translateBembaFragment(match[1]);
      return food
        ? `I am not feeling well because I ate ${food}`
        : "I am not feeling well because I ate " + match[1];
    },
  },

  {
    pattern: /^nshileumfwa bwino lelo$/i,
    build: () => "I am not feeling well today",
  },

  {
    pattern: /^nshileumfwa bwino$/i,
    build: () => "I am not feeling well",
  },

  {
    pattern: /^ndelya (.+)$/i,
    build: (match) => {
      const food = translateBembaFragment(match[1]);
      return food ? `I am eating ${food}` : `I am eating ${match[1]}`;
    },
  },

  {
    pattern: /^nacilya (.+)$/i,
    build: (match) => {
      const food = translateBembaFragment(match[1]);
      return food ? `I ate ${food}` : `I ate ${match[1]}`;
    },
  },

  {
    pattern: /^ndefwaya (.+)$/i,
    build: (match) => {
      const thing = translateBembaFragment(match[1]);
      return thing ? `I want ${thing}` : `I want ${match[1]}`;
    },
  },

  {
    pattern: /^ndekabila (.+)$/i,
    build: (match) => {
      const thing = translateBembaFragment(match[1]);
      return thing ? `I need ${thing}` : `I need ${match[1]}`;
    },
  },

  {
    pattern: /^ndetemwa (.+)$/i,
    build: (match) => {
      const thing = translateBembaFragment(match[1]);
      return thing ? `I like ${thing}` : `I like ${match[1]}`;
    },
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

function removeUkPrefix(value: string): string {
  const trimmed = value.trim();

  if (/^uk/i.test(trimmed)) {
    return trimmed.substring(2);
  }

  return trimmed;
}

function translateEnglishFragment(value: string): string {
  const result = translateInternal(value, "en-to-bem", false);
  return result.output.trim();
}

function translateBembaFragment(value: string): string {
  const result = translateInternal(value, "bem-to-en", false);
  return result.output.trim();
}

/* ============================================================
   PHRASE MATCHING
   ============================================================ */

function findPhraseMatches(
  input: string,
  entries: DictionaryItem[],
  direction: "en-to-bem" | "bem-to-en",
): PhraseMatch[] {
  const originalTokens = input.split(/(\s+)/);
  const words = tokenize(input);

  const matches: PhraseMatch[] = [];

  for (const entry of entries) {
    const source =
      direction === "en-to-bem" ? entry.english : entry.bemba;

    const target =
      direction === "en-to-bem"
        ? primaryAlternative(entry.bemba)
        : primaryAlternative(entry.english);

    const sourceWords = tokenize(source);

    if (sourceWords.length === 0 || sourceWords.length > words.length) {
      continue;
    }

    for (let i = 0; i <= words.length - sourceWords.length; i++) {
      let same = true;

      for (let j = 0; j < sourceWords.length; j++) {
        if (
          normalizeWord(words[i + j]) !==
          normalizeWord(sourceWords[j])
        ) {
          same = false;
          break;
        }
      }

      if (same) {
        matches.push({
          start: i,
          end: i + sourceWords.length,
          source,
          target,
        });
      }
    }
  }

  /*
   * Longest matches first.
   */
  matches.sort(
    (a, b) =>
      b.end - b.start - (a.end - a.start) ||
      a.start - b.start,
  );

  /*
   * Remove overlapping matches.
   */
  const accepted: PhraseMatch[] = [];
  const occupied = new Set<number>();

  for (const match of matches) {
    let overlaps = false;

    for (let i = match.start; i < match.end; i++) {
      if (occupied.has(i)) {
        overlaps = true;
        break;
      }
    }

    if (overlaps) {
      continue;
    }

    accepted.push(match);

    for (let i = match.start; i < match.end; i++) {
      occupied.add(i);
    }
  }

  /*
   * originalTokens is deliberately referenced here to keep the
   * matching logic easy to understand and to make punctuation
   * handling explicit.
   */
  void originalTokens;

  return accepted.sort((a, b) => a.start - b.start);
}

/* ============================================================
   TOKEN TRANSLATION
   ============================================================ */

function translateEnglishWord(word: string): string | null {
  const normalized = normalizeWord(word);

  if (!normalized) {
    return null;
  }

  const exact = englishExact.get(normalized);

  if (exact) {
    return exact;
  }

  const functionWord = englishFunctionWords[normalized];

  if (functionWord) {
    return functionWord;
  }

  /*
   * Handle very common English verb forms by looking at the
   * dictionary's infinitive.
   *
   * This is conservative: if we cannot find the base verb,
   * we leave the word unknown.
   */

  const candidates = [
    normalized,
    normalized.replace(/ing$/, ""),
    normalized.replace(/ed$/, ""),
    normalized.replace(/s$/, ""),
  ];

  for (const candidate of candidates) {
    const result = englishExact.get(candidate);

    if (result) {
      return result;
    }

    const verbResult = englishEntries.find((entry) => {
      const english = normalizeWord(entry.english);

      return (
        english === candidate ||
        english === `to ${candidate}`
      );
    });

    if (verbResult) {
      return primaryAlternative(verbResult.bemba);
    }
  }

  return null;
}

function translateBembaWord(word: string): string | null {
  const normalized = normalizeWord(word);

  if (!normalized) {
    return null;
  }

  const exact = bembaExact.get(normalized);

  if (exact) {
    return exact;
  }

  const functionWord = bembaFunctionWords[normalized];

  if (functionWord) {
    return functionWord;
  }

  /*
   * Try removing common punctuation/possessive marks.
   */
  const cleaned = normalized.replace(/[.,!?;:]+$/g, "");

  if (cleaned !== normalized) {
    const result = bembaExact.get(cleaned);

    if (result) {
      return result;
    }
  }

  return null;
}

/* ============================================================
   SENTENCE TOKEN TRANSLATION
   ============================================================ */

function translateByDictionary(
  input: string,
  direction: "en-to-bem" | "bem-to-en",
): {
  output: string;
  matched: string[];
  unknown: string[];
} {
  const words = tokenize(input);

  if (words.length === 0) {
    return {
      output: "",
      matched: [],
      unknown: [],
    };
  }

  const entries =
    direction === "en-to-bem"
      ? englishEntries
      : bembaEntries;

  const phraseMatches = findPhraseMatches(
    input,
    entries,
    direction,
  );

  const replacements = new Map<number, PhraseMatch>();

  for (const match of phraseMatches) {
    replacements.set(match.start, match);
  }

  const output: string[] = [];
  const matched: string[] = [];
  const unknown: string[] = [];

  let i = 0;

  while (i < words.length) {
    const phrase = replacements.get(i);

    if (phrase) {
      output.push(phrase.target);
      matched.push(phrase.source);
      i = phrase.end;
      continue;
    }

    const original = words[i];

    const translated =
      direction === "en-to-bem"
        ? translateEnglishWord(original)
        : translateBembaWord(original);

    if (translated) {
      output.push(translated);
      matched.push(original);
    } else {
      /*
       * Never fabricate a translation.
       */
      output.push(original);
      unknown.push(original);
    }

    i++;
  }

  return {
    output: normalizeSpaces(output.join(" ")),
    matched,
    unknown,
  };
}

/* ============================================================
   LIGHT SENTENCE POST-PROCESSING
   ============================================================ */

function cleanOutput(
  output: string,
  direction: "en-to-bem" | "bem-to-en",
): string {
  let result = normalizeSpaces(output);

  /*
   * Remove accidental duplicate spaces around punctuation.
   */
  result = result
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/([,.!?;:])([A-Za-z])/g, "$1 $2");

  /*
   * Common dictionary artefacts.
   */
  result = result
    .replace(/\bUkwafwa\b/g, "Ukwafwa")
    .replace(/\bUkwaafwa\b/g, "Ukwafwa");

  /*
   * Do not capitalize every Bemba word.
   * Only capitalize the beginning of a sentence.
   */
  if (result.length > 0) {
    result =
      result.charAt(0).toUpperCase() +
      result.slice(1);
  }

  /*
   * Preserve question mark semantics.
   */
  if (isQuestion(output) && !/[!?]$/.test(result)) {
    result += "?";
  }

  void direction;

  return result;
}

/* ============================================================
   PATTERN ENGINE
   ============================================================ */

function runPatterns(
  input: string,
  direction: "en-to-bem" | "bem-to-en",
): string | null {
  const rules =
    direction === "en-to-bem"
      ? EnglishPatterns
      : BembaPatterns;

  for (const rule of rules) {
    const match = input.trim().match(rule.pattern);

    if (!match) {
      continue;
    }

    const result = rule.build(match);

    if (result && result.trim()) {
      return result.trim();
    }
  }

  return null;
}

/* ============================================================
   EXACT SENTENCE LOOKUP
   ============================================================ */

function exactSentenceLookup(
  input: string,
  direction: "en-to-bem" | "bem-to-en",
): string | null {
  const normalized = normalizeWord(input);

  if (!normalized) {
    return null;
  }

  if (direction === "en-to-bem") {
    const result = englishExact.get(normalized);

    if (result) {
      return result;
    }
  } else {
    const result = bembaExact.get(normalized);

    if (result) {
      return result;
    }
  }

  return null;
}

/* ============================================================
   DIRECTION
   ============================================================ */

function normalizeDirection(
  direction?: TranslationDirection | string,
): "en-to-bem" | "bem-to-en" {
  const value = String(direction || "en-to-bem")
    .toLowerCase()
    .trim();

  if (
    value === "bem-to-en" ||
    value === "bemba-to-english" ||
    value === "bem-en" ||
    value === "bem2en"
  ) {
    return "bem-to-en";
  }

  return "en-to-bem";
}

/* ============================================================
   INTERNAL ENGINE
   ============================================================ */

function translateInternal(
  input: string,
  direction: TranslationDirection | string = "en-to-bem",
  allowPatterns = true,
): TranslationResult {
  const original = typeof input === "string" ? input : "";
  const cleanedInput = normalizeSpaces(original);

  const normalizedDirection = normalizeDirection(direction);

  if (!cleanedInput) {
    return {
      input: original,
      output: "",
      direction: normalizedDirection,
      confidence: 1,
      matched: [],
      unknown: [],
    };
  }

  /*
   * 1. Exact full sentence/phrase.
   */
  const exact = exactSentenceLookup(
    cleanedInput,
    normalizedDirection,
  );

  if (exact) {
    return {
      input: original,
      output: cleanOutput(exact, normalizedDirection),
      direction: normalizedDirection,
      confidence: 1,
      matched: [cleanedInput],
      unknown: [],
    };
  }

  /*
   * 2. Human-like sentence patterns.
   */
  if (allowPatterns) {
    const patternResult = runPatterns(
      cleanedInput,
      normalizedDirection,
    );

    if (patternResult) {
      return {
        input: original,
        output: cleanOutput(
          patternResult,
          normalizedDirection,
        ),
        direction: normalizedDirection,
        confidence: 0.96,
        matched: [cleanedInput],
        unknown: [],
      };
    }
  }

  /*
   * 3. Phrase + word dictionary translation.
   */
  const dictionaryResult = translateByDictionary(
    cleanedInput,
    normalizedDirection,
  );

  const totalWords = tokenize(cleanedInput).length;
  const translatedWords =
    totalWords - dictionaryResult.unknown.length;

  let confidence = 0.25;

  if (totalWords > 0) {
    confidence =
      0.35 +
      (translatedWords / totalWords) * 0.6;
  }

  /*
   * If the sentence contains a large amount of unknown
   * vocabulary, do not pretend that the translation is reliable.
   */
  if (
    dictionaryResult.unknown.length >
    Math.max(2, Math.ceil(totalWords * 0.5))
  ) {
    confidence = Math.min(confidence, 0.45);
  }

  return {
    input: original,
    output: cleanOutput(
      dictionaryResult.output,
      normalizedDirection,
    ),
    direction: normalizedDirection,
    confidence: Math.min(0.95, confidence),
    matched: dictionaryResult.matched,
    unknown: dictionaryResult.unknown,
  };
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * Main translation function.
 *
 * Compatible with:
 *
 * translateWithFallback("I am eating")
 *
 * and:
 *
 * translateWithFallback("I am eating", "en-to-bem")
 *
 * and:
 *
 * translateWithFallback("Ndelya ubwali", "bem-to-en")
 */
export function translateWithFallback(
  input: string,
  direction: TranslationDirection = "en-to-bem",
): string {
  return translateInternal(
    input,
    direction,
    true,
  ).output;
}

/**
 * Detailed translation result for future UI features.
 */
export function translateDetailed(
  input: string,
  direction: TranslationDirection = "en-to-bem",
): TranslationResult {
  return translateInternal(
    input,
    direction,
    true,
  );
}

/**
 * Explicit English -> Bemba helper.
 */
export function translateEnglishToBemba(
  input: string,
): string {
  return translateWithFallback(
    input,
    "en-to-bem",
  );
}

/**
 * Explicit Bemba -> English helper.
 */
export function translateBembaToEnglish(
  input: string,
): string {
  return translateWithFallback(
    input,
    "bem-to-en",
  );
}

/**
 * Check whether the dictionary contains a phrase.
 */
export function hasEnglishEntry(
  phrase: string,
): boolean {
  return englishExact.has(
    normalizeWord(phrase),
  );
}

/**
 * Check whether the dictionary contains Bemba.
 */
export function hasBembaEntry(
  phrase: string,
): boolean {
  return bembaExact.has(
    normalizeWord(phrase),
  );
}

/**
 * Get dictionary alternatives.
 */
export function lookupEnglish(
  phrase: string,
): string[] {
  const key = normalizeWord(phrase);

  return dictionary
    .filter(
      (entry) =>
        normalizeWord(entry.english) === key,
    )
    .map((entry) => entry.bemba);
}

/**
 * Get English meanings for Bemba.
 */
export function lookupBemba(
  phrase: string,
): string[] {
  const key = normalizeWord(phrase);

  return dictionary
    .filter(
      (entry) =>
        normalizeWord(entry.bemba) === key,
    )
    .map((entry) => entry.english);
}

/**
 * Return dictionary size.
 */
export function getDictionarySize(): number {
  return dictionary.length;
}

/**
 * Return true when input appears to contain mostly Bemba
 * dictionary vocabulary.
 *
 * This is intentionally only a heuristic.
 */
export function looksLikeBemba(
  input: string,
): boolean {
  const words = tokenize(input);

  if (words.length === 0) {
    return false;
  }

  let bembaMatches = 0;

  for (const word of words) {
    if (bembaExact.has(normalizeWord(word))) {
      bembaMatches++;
    }
  }

  return bembaMatches / words.length >= 0.4;
}

/**
 * Automatically choose a direction.
 *
 * If the user doesn't explicitly specify a direction,
 * this can be used by the UI.
 */
export function detectDirection(
  input: string,
): "en-to-bem" | "bem-to-en" {
  const englishWords = new Set([
    "the",
    "a",
    "an",
    "i",
    "you",
    "he",
    "she",
    "we",
    "they",
    "is",
    "am",
    "are",
    "was",
    "were",
    "have",
    "has",
    "do",
    "does",
    "did",
    "what",
    "where",
    "when",
    "why",
    "how",
    "and",
    "but",
    "because",
    "today",
    "tomorrow",
    "eat",
    "eating",
    "ate",
    "want",
    "need",
    "like",
    "love",
    "know",
    "come",
    "go",
  ]);

  const words = tokenize(input);

  let englishScore = 0;
  let bembaScore = 0;

  for (const word of words) {
    const normalized = normalizeWord(word);

    if (englishWords.has(normalized)) {
      englishScore++;
    }

    if (bembaExact.has(normalized)) {
      bembaScore++;
    }
  }

  if (bembaScore > englishScore) {
    return "bem-to-en";
  }

  return "en-to-bem";
}

/**
 * Smart translation.
 *
 * Automatically determines direction.
 */
export function smartTranslate(
  input: string,
): string {
  const direction = detectDirection(input);

  return translateWithFallback(
    input,
    direction,
  );
}

/* ============================================================
   DEFAULT EXPORT
   ============================================================ */

/*
 * This is deliberately included because your project has already
 * shown that different files may import this function differently.
 *
 * Named:
 *
 * import { translateWithFallback } from "./engine/bembaTranslator";
 *
 * Default:
 *
 * import translateWithFallback from "./engine/bembaTranslator";
 */
export default translateWithFallback;
