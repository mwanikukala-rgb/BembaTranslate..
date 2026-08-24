import { bembaDictionary } from "../data/bembaDictionary";

/*
============================================================
 BEMBATRANSLATE — PROFESSIONAL OFFLINE TRANSLATION ENGINE
============================================================

 DESIGN PRINCIPLES

 1. The complete local dictionary is the source of truth.
 2. Exact dictionary matches ALWAYS beat fuzzy matches.
 3. "thank" can NEVER become "think" if "thank" exists.
 4. Long phrases are matched before individual words.
 5. Common English grammatical forms are normalized safely.
 6. Sentences are parsed instead of relying only on
    hard-coded complete sentences.
 7. Unknown words are NOT invented.
 8. Fuzzy matching is conservative.
 9. Bemba -> English search is supported.
10. English -> Bemba search is supported.
11. Partial sentence suggestions are supported.
12. Everything works offline.
13. The engine is expandable as the dictionary grows.

============================================================
*/

/* ============================================================
   TYPES
============================================================ */

export type BembaEntry = {
  english: string;
  bemba: string;
};

export type TranslationSource =
  | "exact"
  | "phrase"
  | "sentence"
  | "grammar"
  | "fuzzy"
  | "partial"
  | "none";

export type TranslationResult = {
  text: string;
  confidence: number;
  source: TranslationSource;
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
    .replace(/[“”‘’"'`]/g, "")
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanTranslation(
  text: string
): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(
  text: string
): string[] {
  const value = normalize(text);

  return value
    ? value.split(" ").filter(Boolean)
    : [];
}

/* ============================================================
   CONTRACTIONS
============================================================ */

const contractions: Record<
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
      contractions
    )
  ) {
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
   ENGLISH WORD FORMS
============================================================

 These are linguistic aliases.

 They are ONLY used when an exact dictionary entry does
 not already exist.

 This is important.

 Example:

 dictionary:
   thank -> Natotela

 User:
   thank

 Exact entry wins.

 User:
   thanking

 If "thanking" isn't in dictionary:
   thanking -> thank -> Natotela

============================================================ */

const englishAliases: Record<
  string,
  string
> = {
  /* THINK */
  thinks: "think",
  thinking: "think",
  thought: "think",
  thoughts: "think",

  /* THANK */
  thanked: "thank",
  thanking: "thank",
  thanks: "thank",

  /* EAT */
  ate: "eat",
  eating: "eat",
  eats: "eat",

  /* DRINK */
  drank: "drink",
  drinking: "drink",
  drinks: "drink",

  /* BUY */
  bought: "buy",
  buying: "buy",
  buys: "buy",
  purchased: "buy",
  purchasing: "buy",
  purchases: "buy",

  /* SELL */
  sold: "sell",
  selling: "sell",
  sells: "sell",

  /* WANT */
  wanted: "want",
  wanting: "want",
  wants: "want",

  /* NEED */
  needed: "need",
  needing: "need",
  needs: "need",

  /* WORK */
  worked: "work",
  working: "work",
  works: "work",

  /* WALK */
  walked: "walk",
  walking: "walk",
  walks: "walk",

  /* GO */
  went: "go",
  going: "go",
  goes: "go",

  /* COME */
  came: "come",
  coming: "come",
  comes: "come",

  /* SPEAK */
  spoke: "speak",
  speaking: "speak",
  speaks: "speak",

  /* TALK */
  talked: "talk",
  talking: "talk",
  talks: "talk",

  /* WRITE */
  wrote: "write",
  writing: "write",
  writes: "write",

  /* READ */
  reading: "read",

  /* WASH */
  washed: "wash",
  washing: "wash",
  washes: "wash",

  /* LEARN */
  learned: "learn",
  learnt: "learn",
  learning: "learn",
  learns: "learn",

  /* TEACH */
  taught: "teach",
  teaching: "teach",
  teaches: "teach",

  /* SLEEP */
  slept: "sleep",
  sleeping: "sleep",
  sleeps: "sleep",

  /* SIT */
  sat: "sit",
  sitting: "sit",
  sits: "sit",

  /* STAY */
  stayed: "stay",
  staying: "stay",
  stays: "stay",

  /* VISIT */
  visited: "visit",
  visiting: "visit",
  visits: "visit",

  /* HELP */
  helped: "help",
  helping: "help",
  helps: "help",

  /* REMEMBER */
  remembered: "remember",
  remembering: "remember",
  remembers: "remember",

  /* HEALTH */
  ill: "sick",
  unwell: "sick",

  /* COMMON SPELLING / WORD VARIANTS */
  travelled: "travel",
  traveled: "travel",
  travelling: "travel",
  traveling: "travel",
};

/* ============================================================
   DICTIONARY INDEXES
============================================================ */

const englishToBemba =
  new Map<string, string>();

const englishAlternatives =
  new Map<string, string[]>();

const bembaToEnglish =
  new Map<string, string[]>();

const allEnglishWords =
  new Set<string>();

const allEnglishPhrases =
  new Set<string>();

/* ============================================================
   BUILD INDEX
============================================================ */

for (const entry of dictionary) {
  if (!entry) {
    continue;
  }

  const english =
    normalize(entry.english);

  const bemba =
    cleanTranslation(entry.bemba);

  if (!english || !bemba) {
    continue;
  }

  /*
   * PRIMARY TRANSLATION
   */

  if (!englishToBemba.has(english)) {
    englishToBemba.set(
      english,
      bemba
    );
  }

  /*
   * ALTERNATIVE TRANSLATIONS
   */

  const alternatives =
    englishAlternatives.get(
      english
    ) ?? [];

  if (
    !alternatives.includes(bemba)
  ) {
    alternatives.push(bemba);
  }

  englishAlternatives.set(
    english,
    alternatives
  );

  /*
   * PHRASE INDEX
   */

  if (english.includes(" ")) {
    allEnglishPhrases.add(
      english
    );
  } else {
    allEnglishWords.add(
      english
    );
  }

  /*
   * REVERSE DICTIONARY
   */

  const normalizedBemba =
    normalize(bemba);

  const reverse =
    bembaToEnglish.get(
      normalizedBemba
    ) ?? [];

  if (
    !reverse.includes(english)
  ) {
    reverse.push(english);
  }

  bembaToEnglish.set(
    normalizedBemba,
    reverse
  );
}

/* ============================================================
   EXACT ENGLISH LOOKUP
============================================================ */

function exactEnglishLookup(
  input: string
): string | undefined {
  const normalized =
    normalize(input);

  if (!normalized) {
    return undefined;
  }

  /*
   * ========================================================
   * CRITICAL RULE
   *
   * EXACT DICTIONARY ALWAYS WINS.
   *
   * This prevents:
   *
   * thank -> think
   *
   * when both are dictionary words.
   * ========================================================
   */

  const exact =
    englishToBemba.get(
      normalized
    );

  if (exact) {
    return exact;
  }

  /*
   * Alias is SECONDARY.
   */

  const alias =
    englishAliases[normalized];

  if (!alias) {
    return undefined;
  }

  /*
   * Never replace a valid exact word
   * with an alias.
   */

  if (
    englishToBemba.has(normalized)
  ) {
    return englishToBemba.get(
      normalized
    );
  }

  return englishToBemba.get(
    normalize(alias)
  );
}

/* ============================================================
   CHECK EXACT DICTIONARY WORD
============================================================ */

function isExactDictionaryWord(
  word: string
): boolean {
  return allEnglishWords.has(
    normalize(word)
  );
}

/* ============================================================
   LONGEST DICTIONARY PHRASE
============================================================ */

function findLongestDictionaryMatch(
  words: string[],
  start: number
):
  | {
      translation: string;
      length: number;
      source: "exact" | "phrase";
    }
  | undefined {
  const remaining =
    words.length - start;

  /*
   * Allow long phrases.
   */

  const maxLength =
    Math.min(
      remaining,
      25
    );

  for (
    let length = maxLength;
    length >= 1;
    length--
  ) {
    const phrase =
      words
        .slice(
          start,
          start + length
        )
        .join(" ");

    const translation =
      exactEnglishLookup(
        phrase
      );

    if (translation) {
      return {
        translation,
        length,
        source:
          length > 1
            ? "phrase"
            : "exact",
      };
    }
  }

  return undefined;
}

/* ============================================================
   LEVENSHTEIN DISTANCE
============================================================ */

function levenshtein(
  a: string,
  b: string
): number {
  if (a === b) {
    return 0;
  }

  if (!a.length) {
    return b.length;
  }

  if (!b.length) {
    return a.length;
  }

  /*
   * Keep the shorter string in b
   * for lower memory usage.
   */

  if (a.length < b.length) {
    return levenshtein(b, a);
  }

  let previous =
    new Array<number>(
      b.length + 1
    );

  let current =
    new Array<number>(
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
          previous[j - 1] + cost
        );
    }

    [
      previous,
      current,
    ] = [
      current,
      previous,
    ];
  }

  return previous[b.length];
}

/* ============================================================
   FUZZY THRESHOLD
============================================================ */

function fuzzyDistanceLimit(
  word: string
): number {
  const length =
    word.length;

  /*
   * Very short words are dangerous.
   */

  if (length < 5) {
    return 0;
  }

  if (length <= 6) {
    return 1;
  }

  if (length <= 9) {
    return 1;
  }

  return 2;
}

/* ============================================================
   CONSERVATIVE FUZZY LOOKUP
============================================================ */

function fuzzyEnglishLookup(
  word: string
): {
  translation: string;
  matchedWord: string;
  distance: number;
} | undefined {
  const normalized =
    normalize(word);

  if (
    !normalized ||
    normalized.length < 5
  ) {
    return undefined;
  }

  /*
   * NEVER fuzzy-match a real dictionary word.
   *
   * This is the protection against:
   *
   * thank -> think
   */

  if (
    isExactDictionaryWord(
      normalized
    )
  ) {
    return undefined;
  }

  /*
   * Alias first.
   */

  const alias =
    englishAliases[normalized];

  if (alias) {
    const aliasTranslation =
      englishToBemba.get(
        normalize(alias)
      );

    if (aliasTranslation) {
      return {
        translation:
          aliasTranslation,
        matchedWord: alias,
        distance: 0,
      };
    }
  }

  const allowed =
    fuzzyDistanceLimit(
      normalized
    );

  if (!allowed) {
    return undefined;
  }

  let best:
    | {
        translation: string;
        matchedWord: string;
        distance: number;
      }
    | undefined;

  for (
    const english of allEnglishWords
  ) {
    /*
     * Don't compare words with wildly
     * different lengths.
     */

    if (
      Math.abs(
        english.length -
          normalized.length
      ) > allowed
    ) {
      continue;
    }

    /*
     * Fast first-character protection.
     *
     * Helps avoid unrelated matches.
     */

    const firstSame =
      english[0] ===
      normalized[0];

    if (
      !firstSame &&
      normalized.length < 8
    ) {
      continue;
    }

    const distance =
      levenshtein(
        normalized,
        english
      );

    if (
      distance > allowed
    ) {
      continue;
    }

    /*
     * Additional similarity requirement.
     */

    const similarity =
      1 -
      distance /
        Math.max(
          english.length,
          normalized.length
        );

    if (
      similarity < 0.78
    ) {
      continue;
    }

    if (
      !best ||
      distance <
        best.distance
    ) {
      const translation =
        englishToBemba.get(
          english
        );

      if (!translation) {
        continue;
      }

      best = {
        translation,
        matchedWord:
          english,
        distance,
      };
    }
  }

  return best;
}

/* ============================================================
   SAFE WORD LOOKUP
============================================================ */

function lookupWord(
  word: string
): TranslationResult {
  const normalized =
    normalize(word);

  if (!normalized) {
    return {
      text: "",
      confidence: 0,
      source: "none",
    };
  }

  /*
   * EXACT
   */

  const exact =
    englishToBemba.get(
      normalized
    );

  if (exact) {
    return {
      text: exact,
      confidence: 1,
      source: "exact",
      matchedInput:
        normalized,
      explanation:
        "Exact dictionary match.",
    };
  }

  /*
   * ALIAS
   */

  const alias =
    englishAliases[normalized];

  if (alias) {
    const aliasTranslation =
      englishToBemba.get(
        normalize(alias)
      );

    if (aliasTranslation) {
      return {
        text: aliasTranslation,
        confidence: 0.96,
        source: "grammar",
        matchedInput: alias,
        explanation:
          `Recognized "${normalized}" as a form of "${alias}".`,
      };
    }
  }

  /*
   * FUZZY
   */

  const fuzzy =
    fuzzyEnglishLookup(
      normalized
    );

  if (fuzzy) {
    return {
      text: fuzzy.translation,
      confidence:
        fuzzy.distance === 1
          ? 0.90
          : 0.82,
      source: "fuzzy",
      matchedInput:
        fuzzy.matchedWord,
      explanation:
        `Possible spelling correction: "${normalized}" → "${fuzzy.matchedWord}".`,
    };
  }

  return {
    text: "",
    confidence: 0,
    source: "none",
  };
}

/* ============================================================
   PHRASE TRANSLATION
============================================================ */

function translateByPhrases(
  text: string
): TranslationResult {
  const words =
    tokenize(text);

  if (!words.length) {
    return {
      text: "",
      confidence: 0,
      source: "none",
    };
  }

  const output: string[] = [];

  let index = 0;

  let usedPhrase = false;
  let usedFuzzy = false;

  while (
    index < words.length
  ) {
    const match =
      findLongestDictionaryMatch(
        words,
        index
      );

    if (match) {
      output.push(
        match.translation
      );

      if (
        match.length > 1
      ) {
        usedPhrase = true;
      }

      index +=
        match.length;

      continue;
    }

    /*
     * No exact phrase.
     *
     * Try individual word.
     */

    const word =
      words[index];

    const result =
      lookupWord(word);

    if (!result.text) {
      /*
       * Unknown word.
       *
       * Do not invent.
       */

      return {
        text: "",
        confidence: 0,
        source: "none",
        explanation:
          `Unknown word: "${word}".`,
      };
    }

    output.push(
      result.text
    );

    if (
      result.source === "fuzzy"
    ) {
      usedFuzzy = true;
    }

    index++;
  }

  const source: TranslationSource =
    usedFuzzy
      ? "fuzzy"
      : usedPhrase
      ? "phrase"
      : "exact";

  let confidence =
    usedFuzzy
      ? 0.88
      : usedPhrase
      ? 0.97
      : 1;

  /*
   * Multiple-word constructions have
   * slightly lower confidence than a
   * single exact dictionary entry.
   */

  if (
    words.length > 1 &&
    source === "exact"
  ) {
    confidence = 0.96;
  }

  return {
    text: output.join(" "),
    confidence,
    source,
  };
}

/* ============================================================
   IMPORTANT VERIFIED PHRASES
============================================================ */

const importantPhrases =
  new Map<string, string>([
    [
      "how are you",
      "Mulishani?",
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
      "thanks",
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

    [
      "where are you",
      "Ulikwisa?",
    ],

    [
      "where are they",
      "Balikwisa?",
    ],
  ]);

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

/* ============================================================
   SUBJECTS
============================================================ */

const subjects = new Set([
  "i",
  "you",
  "he",
  "she",
  "we",
  "they",
  "it",
]);

/* ============================================================
   AUXILIARIES
============================================================ */

const presentAuxiliaries =
  new Set([
    "am",
    "are",
    "is",
    "do",
    "does",
  ]);

const pastAuxiliaries =
  new Set([
    "was",
    "were",
    "did",
  ]);

const futureAuxiliaries =
  new Set([
    "will",
    "shall",
  ]);

/* ============================================================
   NEGATIVE WORDS
============================================================ */

const negativeWords =
  new Set([
    "not",
    "never",
    "no",
    "cannot",
    "cant",
    "dont",
    "doesnt",
    "didnt",
    "isnt",
    "arent",
    "wasnt",
    "werent",
    "wont",
    "wouldnt",
    "couldnt",
    "shouldnt",
  ]);

/* ============================================================
   QUESTION WORDS
============================================================ */

const questionWords =
  new Set([
    "who",
    "what",
    "where",
    "when",
    "why",
    "how",
    "which",
    "whose",
    "whom",
  ]);

/* ============================================================
   SENTENCE ANALYZER
============================================================ */

export function analyzeSentence(
  text: string
): SentenceAnalysis {
  const original =
    String(text ?? "");

  const normalized =
    normalize(
      expandContractions(
        original
      )
    );

  const words =
    tokenize(normalized);

  const question =
    original.includes("?") ||
    questionWords.has(
      words[0] ?? ""
    ) ||
    words.includes(
      "where"
    ) ||
    words.includes(
      "why"
    );

  const negative =
    words.some((word) =>
      negativeWords.has(word)
    );

  let subject:
    | string
    | undefined;

  let verb:
    | string
    | undefined;

  let object:
    | string
    | undefined;

  let auxiliary:
    | string
    | undefined;

  let tense:
    | "present"
    | "past"
    | "future"
    | "unknown" =
    "unknown";

  let aspect:
    | "simple"
    | "continuous"
    | "perfect"
    | "unknown" =
    "unknown";

  /*
   * SUBJECT
   */

  if (
    words.length &&
    subjects.has(words[0])
  ) {
    subject = words[0];
  }

  /*
   * Find auxiliary.
   */

  for (
    let i = 0;
    i < words.length;
    i++
  ) {
    if (
      presentAuxiliaries.has(
        words[i]
      ) ||
      pastAuxiliaries.has(
        words[i]
      ) ||
      futureAuxiliaries.has(
        words[i]
      )
    ) {
      auxiliary =
        words[i];

      if (
        futureAuxiliaries.has(
          words[i]
        )
      ) {
        tense = "future";
      } else if (
        pastAuxiliaries.has(
          words[i]
        )
      ) {
        tense = "past";
      } else {
        tense = "present";
      }

      break;
    }
  }

  /*
   * Determine continuous aspect.
   */

  if (
    words.some(
      (word) =>
        word.endsWith("ing")
    )
  ) {
    aspect =
      "continuous";
  }

  /*
   * Determine a likely verb.
   */

  const subjectIndex =
    subject
      ? words.indexOf(
          subject
        )
      : -1;

  if (
    subjectIndex >= 0
  ) {
    let verbIndex =
      subjectIndex + 1;

    /*
     * Skip auxiliary.
     */

    if (
      presentAuxiliaries.has(
        words[verbIndex]
      ) ||
      pastAuxiliaries.has(
        words[verbIndex]
      ) ||
      futureAuxiliaries.has(
        words[verbIndex]
      )
    ) {
      verbIndex++;
    }

    /*
     * Skip negative.
     */

    while (
      negativeWords.has(
        words[verbIndex]
      )
    ) {
      verbIndex++;
    }

    if (
      verbIndex <
      words.length
    ) {
      verb =
        words[verbIndex];

      if (
        verbIndex + 1 <
        words.length
      ) {
        object =
          words
            .slice(
              verbIndex + 1
            )
            .join(" ");
      }
    }
  }

  /*
   * No obvious subject.
   *
   * Look for a dictionary phrase.
   */

  if (
    !subject &&
    words.length
  ) {
    const possibleVerb =
      words[0];

    if (
      englishAliases[
        possibleVerb
      ] ||
      englishToBemba.has(
        possibleVerb
      )
    ) {
      verb =
        possibleVerb;

      if (
        words.length > 1
      ) {
        object =
          words
            .slice(1)
            .join(" ");
      }
    }
  }

  /*
   * Tense from explicit forms.
   */

  if (
    words.some(
      (word) =>
        word === "yesterday" ||
        word === "ago" ||
        word === "last"
    )
  ) {
    tense = "past";
  }

  if (
    words.some(
      (word) =>
        word === "tomorrow" ||
        word === "later"
    )
  ) {
    tense = "future";
  }

  /*
   * Incomplete sentence detection.
   */

  let incomplete = false;

  if (
    words.length === 1 &&
    subjects.has(words[0])
  ) {
    incomplete = true;
  }

  if (
    subject &&
    words.length ===
      1
  ) {
    incomplete = true;
  }

  return {
    original,
    normalized,
    subject,
    verb,
    object,
    auxiliary,
    tense,
    aspect,
    negative,
    question,
    incomplete,
  };
}

/* ============================================================
   VERB ROOT EXTRACTION
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

function getVerbRoot(
  englishWord: string
): string | undefined {
  const translation =
    exactEnglishLookup(
      englishWord
    );

  if (!translation) {
    return undefined;
  }

  /*
   * Dictionary roots may look like:

       -landa

     or:

       -sosa/-sosela
  */

  const parts =
    translation
      .split("/")
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);

  for (
    const part of parts
  ) {
    if (
      part.startsWith("-") ||
      part.startsWith("–") ||
      part.startsWith("—")
    ) {
      return cleanRoot(
        part
      );
    }
  }

  return undefined;
}

/* ============================================================
   SUBJECT PREFIXES
============================================================ */

const subjectPrefixes: Record<
  string,
  string
> = {
  i: "Nde",
  you: "Ule",
  he: "Ale",
  she: "Ale",
  we: "Tule",
  they: "Bale",
  it: "Cile",
};

/* ============================================================
   CONJUGATE PRESENT
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

  const prefix =
    subjectPrefixes[
      subject
    ];

  if (!prefix) {
    return undefined;
  }

  return `${prefix}${root}`;
}

/* ============================================================
   CONJUGATE FUTURE
============================================================

 This function intentionally only works when your dictionary
 provides a usable verb root.

 It does NOT invent a Bemba form when the grammar is unknown.
============================================================ */

function conjugateFuture(
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

  /*
   * Keep this conservative.
   *
   * If your verified Bemba grammar uses a different future
   * construction, change it here rather than spreading
   * assumptions throughout the application.
   */

  const prefixMap: Record<
    string,
    string
  > = {
    i: "Nkesa",
    you: "Ukesa",
    he: "Akesa",
    she: "Akesa",
    we: "Tukesa",
    they: "Bakesa",
    it: "Cikesa",
  };

  const prefix =
    prefixMap[subject];

  if (!prefix) {
    return undefined;
  }

  return `${prefix}${root}`;
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
   * Exact phrase.
   */

  const exact =
    exactEnglishLookup(
      normalized
    );

  if (exact) {
    return exact;
  }

  /*
   * Dictionary phrase engine.
   */

  const result =
    translateByPhrases(
      normalized
    );

  if (
    result.text &&
    result.source !==
      "none"
  ) {
    return result.text;
  }

  return undefined;
}

/* ============================================================
   POSSESSIVE TRANSLATION
============================================================ */

function translatePossessive(
  text: string
): string | undefined {
  const normalized =
    normalize(text);

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

  if (
    !owner ||
    !noun
  ) {
    return undefined;
  }

  return `${noun} ${owner}`;
}

/* ============================================================
   DIRECT VERIFIED PHRASES
============================================================ */

function translateImportantPhrase(
  normalized: string
): TranslationResult | undefined {
  const result =
    importantPhrases.get(
      normalized
    );

  if (!result) {
    return undefined;
  }

  return {
    text: result,
    confidence: 0.99,
    source: "phrase",
    matchedInput:
      normalized,
    explanation:
      "Verified common phrase.",
  };
}

/* ============================================================
   SENTENCE OBJECT PATTERN
============================================================ */

function translateSubjectVerbObject(
  analysis: SentenceAnalysis
): TranslationResult | undefined {
  const {
    subject,
    verb,
    object,
    tense,
    negative,
    question,
  } = analysis;

  if (
    !subject ||
    !verb
  ) {
    return undefined;
  }

  /*
   * QUESTION HANDLING
   *
   * We only apply constructions we can safely derive.
   */

  if (
    question &&
    !object
  ) {
    /*
     * Common dictionary question words
     * are handled separately.
     */
  }

  /*
   * NEGATIVE SENTENCE
   *
   * We intentionally do not manufacture a
   * negative Bemba grammar form unless the
   * dictionary contains the necessary form.
   */

  if (
    negative
  ) {
    return undefined;
  }

  /*
   * FUTURE
   */

  if (
    tense === "future"
  ) {
    const future =
      conjugateFuture(
        subject,
        verb
      );

    if (future) {
      if (object) {
        const translatedObject =
          translateObject(
            object
          );

        if (
          translatedObject
        ) {
          return {
            text:
              `${future} ${translatedObject}`,
            confidence: 0.90,
            source: "grammar",
            explanation:
              "Constructed from subject, verb and object.",
          };
        }
      }

      return {
        text: future,
        confidence: 0.88,
        source: "grammar",
      };
    }
  }

  /*
   * PRESENT
   */

  const present =
    conjugatePresent(
      subject,
      verb
    );

  if (!present) {
    return undefined;
  }

  if (object) {
    const translatedObject =
      translateObject(
        object
      );

    if (
      !translatedObject
    ) {
      return undefined;
    }

    return {
      text:
        `${present} ${translatedObject}`,
      confidence: 0.91,
      source: "grammar",
      explanation:
        "Constructed from dictionary vocabulary and subject grammar.",
    };
  }

  return {
    text: present,
    confidence: 0.88,
    source: "grammar",
  };
}

/* ============================================================
   SIMPLE SENTENCE ENGINE
============================================================ */

function translateSentence(
  normalized: string
): TranslationResult | undefined {
  const analysis =
    analyzeSentence(
      normalized
    );

  /*
   * ========================================================
   * I WANT ...
   * ========================================================
   */

  if (
    analysis.subject === "i" &&
    (
      analysis.verb ===
        "want" ||
      analysis.verb ===
        "wanted" ||
      analysis.verb ===
        "wanting"
    )
  ) {
    if (
      analysis.object
    ) {
      const object =
        translateObject(
          analysis.object
        );

      if (object) {
        return {
          text:
            `Ndefwaya ${object}`,
          confidence: 0.96,
          source: "grammar",
          explanation:
            "Recognized I + want + object.",
        };
      }
    }
  }

  /*
   * I NEED ...
   *
   * We only use the verified construction
   * if "need" is represented in the dictionary.
   */

  if (
    analysis.subject === "i" &&
    (
      analysis.verb ===
        "need" ||
      analysis.verb ===
        "needed" ||
      analysis.verb ===
        "needing"
    )
  ) {
    if (
      analysis.object
    ) {
      const object =
        translateObject(
          analysis.object
        );

      const needRoot =
        getVerbRoot(
          "need"
        );

      if (
        object &&
        needRoot
      ) {
        return {
          text:
            `Nde${needRoot} ${object}`,
          confidence: 0.92,
          source: "grammar",
        };
      }
    }
  }

  /*
   * General subject + verb + object.
   */

  return translateSubjectVerbObject(
    analysis
  );
}

/* ============================================================
   QUESTION TRANSLATION
============================================================ */

function translateQuestion(
  normalized: string
): TranslationResult | undefined {
  const words =
    tokenize(normalized);

  if (!words.length) {
    return undefined;
  }

  const first =
    words[0];

  /*
   * Exact dictionary phrase has priority.
   */

  const exact =
    exactEnglishLookup(
      normalized
    );

  if (exact) {
    return {
      text: exact,
      confidence: 1,
      source: "exact",
    };
  }

  /*
   * Verified common questions.
   */

  const important =
    translateImportantPhrase(
      normalized
    );

  if (important) {
    return important;
  }

  /*
   * WHERE + ...
   */

  if (
    first === "where"
  ) {
    const rest =
      words
        .slice(1)
        .join(" ");

    /*
     * Where are you?
     */

    if (
      normalize(rest) ===
      "are you"
    ) {
      return {
        text:
          "Ulikwisa?",
        confidence: 0.99,
        source: "phrase",
      };
    }

    /*
     * Where are they?
     */

    if (
      normalize(rest) ===
      "are they"
    ) {
      return {
        text:
          "Balikwisa?",
        confidence: 0.99,
        source: "phrase",
      };
    }
  }

  /*
   * WHAT / WHO / WHEN / WHY / HOW
   *
   * Don't invent translations.
   *
   * Try the complete dictionary first.
   */

  const dictionaryResult =
    translateByPhrases(
      normalized
    );

  if (
    dictionaryResult.text
  ) {
    return {
      ...dictionaryResult,
      confidence:
        Math.min(
          dictionaryResult.confidence,
          0.95
        ),
    };
  }

  return undefined;
}

/* ============================================================
   PARTIAL SENTENCE SUGGESTIONS
============================================================ */

export function getTranslationSuggestions(
  text: string,
  limit = 8
): BembaEntry[] {
  const normalized =
    normalize(
      expandContractions(
        text
      )
    );

  if (!normalized) {
    return [];
  }

  const results: BembaEntry[] = [];

  /*
   * Exact prefix first.
   */

  for (
    const entry of dictionary
  ) {
    const english =
      normalize(
        entry.english
      );

    if (
      english.startsWith(
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

  /*
   * If no prefix matches,
   * use contains.
   */

  if (
    results.length < limit
  ) {
    for (
      const entry of dictionary
    ) {
      const english =
        normalize(
          entry.english
        );

      if (
        english.includes(
          normalized
        )
      ) {
        const duplicate =
          results.some(
            (item) =>
              normalize(
                item.english
              ) === english
          );

        if (!duplicate) {
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
  }

  return results;
}

/* ============================================================
   PARTIAL TRANSLATION
============================================================ */

function partialTranslation(
  normalized: string
): TranslationResult | undefined {
  const words =
    tokenize(normalized);

  if (!words.length) {
    return undefined;
  }

  /*
   * Try longest prefix.
   */

  for (
    let length =
      Math.min(
        words.length,
        20
      );
    length >= 1;
    length--
  ) {
    const prefix =
      words
        .slice(
          0,
          length
        )
        .join(" ");

    const translation =
      exactEnglishLookup(
        prefix
      );

    if (translation) {
      return {
        text:
          translation,
        confidence:
          0.72,
        source:
          "partial",
        matchedInput:
          prefix,
        explanation:
          "Partial dictionary match.",
      };
    }
  }

  return undefined;
}

/* ============================================================
   MASTER TRANSLATION RESULT
============================================================ */

export function translateEnglishToBembaResult(
  text: string
): TranslationResult {
  const original =
    String(text ?? "").trim();

  if (!original) {
    return {
      text: "",
      confidence: 0,
      source: "none",
    };
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
    return {
      text: "",
      confidence: 0,
      source: "none",
    };
  }

  /*
   * ========================================================
   * 1. EXACT COMPLETE DICTIONARY
   * ========================================================
   */

  const exact =
    englishToBemba.get(
      normalized
    );

  if (exact) {
    return {
      text: exact,
      confidence: 1,
      source: "exact",
      matchedInput:
        normalized,
      explanation:
        "Exact dictionary match.",
    };
  }

  /*
   * ========================================================
   * 2. VERIFIED IMPORTANT PHRASE
   * ========================================================
   */

  const important =
    translateImportantPhrase(
      normalized
    );

  if (important) {
    return important;
  }

  /*
   * ========================================================
   * 3. POSSESSIVE
   * ========================================================
   */

  const possessive =
    translatePossessive(
      normalized
    );

  if (possessive) {
    return {
      text: possessive,
      confidence: 0.94,
      source: "grammar",
      explanation:
        "Recognized possessive construction.",
    };
  }

  /*
   * ========================================================
   * 4. QUESTION
   * ========================================================
   */

  if (
    original.includes("?") ||
    questionWords.has(
      tokenize(normalized)[0] ??
        ""
    )
  ) {
    const question =
      translateQuestion(
        normalized
      );

    if (question) {
      return question;
    }
  }

  /*
   * ========================================================
   * 5. HUMAN-LIKE SENTENCE PARSER
   * ========================================================
   */

  if (
    tokenize(normalized)
      .length > 1
  ) {
    const sentence =
      translateSentence(
        normalized
      );

    if (sentence) {
      return sentence;
    }
  }

  /*
   * ========================================================
   * 6. COMPLETE DICTIONARY PHRASE / WORD ENGINE
   * ========================================================
   */

  const phrase =
    translateByPhrases(
      normalized
    );

  if (
    phrase.text
  ) {
    return phrase;
  }

  /*
   * ========================================================
   * 7. PARTIAL MATCH
   * ========================================================
   */

  const partial =
    partialTranslation(
      normalized
    );

  if (partial) {
    return partial;
  }

  /*
   * ========================================================
   * 8. NO RELIABLE TRANSLATION
   * ========================================================
   */

  return {
    text: "",
    confidence: 0,
    source: "none",
    explanation:
      "No reliable translation was found in the local dictionary.",
  };
}

/* ============================================================
   SIMPLE PUBLIC TRANSLATION FUNCTION
============================================================ */

export function translateEnglishToBemba(
  text: string
): string {
  return translateEnglishToBembaResult(
    text
  ).text;
}

/* ============================================================
   SAFE FALLBACK
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
   GET PRIMARY TRANSLATION
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
    englishAlternatives.get(
      normalized
    ) ?? []
  );
}

/* ============================================================
   SEARCH ENGLISH DICTIONARY
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

  /*
   * Exact matches first.
   */

  for (
    const entry of dictionary
  ) {
    const english =
      normalize(
        entry.english
      );

    if (
      english === normalized
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
      return results;
    }
  }

  /*
   * Then prefix / contains.
   */

  for (
    const entry of dictionary
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
      const duplicate =
        results.some(
          (item) =>
            normalize(
              item.english
            ) === english &&
            normalize(
              item.bemba
            ) === bemba
        );

      if (!duplicate) {
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
   BEMBA -> ENGLISH SEARCH
============================================================ */

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

  for (
    const entry of dictionary
  ) {
    const bemba =
      normalize(
        entry.bemba
      );

    const english =
      normalize(
        entry.english
      );

    if (
      bemba === normalized
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
      return results;
    }
  }

  for (
    const entry of dictionary
  ) {
    const bemba =
      normalize(
        entry.bemba
      );

    const english =
      normalize(
        entry.english
      );

    if (
      bemba.includes(
        normalized
      ) ||
      english.includes(
        normalized
      )
    ) {
      const duplicate =
        results.some(
          (item) =>
            normalize(
              item.english
            ) === english &&
            normalize(
              item.bemba
            ) === bemba
        );

      if (!duplicate) {
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
   AUTOCOMPLETE
============================================================ */

export function getBembaSuggestions(
  query: string,
  limit = 10
): BembaEntry[] {
  const normalized =
    normalize(query);

  if (!normalized) {
    return [];
  }

  const results: BembaEntry[] = [];

  /*
   * Prefix matches first.
   */

  for (
    const entry of dictionary
  ) {
    const english =
      normalize(
        entry.english
      );

    if (
      english.startsWith(
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
      return results;
    }
  }

  /*
   * Then Bemba prefix matches.
   */

  for (
    const entry of dictionary
  ) {
    const bemba =
      normalize(
        entry.bemba
      );

    if (
      bemba.startsWith(
        normalized
      )
    ) {
      const duplicate =
        results.some(
          (item) =>
            normalize(
              item.english
            ) ===
            normalize(
              entry.english
            )
        );

      if (!duplicate) {
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
      return results;
    }
  }

  return results;
}

/* ============================================================
   DICTIONARY SIZE
============================================================ */

export function getDictionarySize(): number {
  return englishToBemba.size;
}

/* ============================================================
   GET UNIQUE WORD COUNT
============================================================ */

export function getDictionaryWordCount(): number {
  return allEnglishWords.size;
}

/* ============================================================
   GET PHRASE COUNT
============================================================ */

export function getDictionaryPhraseCount(): number {
  return allEnglishPhrases.size;
}

/* ============================================================
   GET TRANSLATOR INFORMATION
============================================================ */

export function getTranslatorInfo() {
  return {
    mode: "offline",

    source:
      "complete local Bemba dictionary",

    dictionaryEntries:
      dictionary.length,

    indexedEntries:
      englishToBemba.size,

    uniqueEnglishWords:
      allEnglishWords.size,

    dictionaryPhrases:
      allEnglishPhrases.size,

    alternativeEntries:
      englishAlternatives.size,

    reverseEntries:
      bembaToEnglish.size,

    importantPhrases:
      importantPhrases.size,

    fuzzyMatching:
      true,

    fuzzyMatchingIsConservative:
      true,

    exactDictionaryAlwaysWins:
      true,

    unknownWordsAreNotInvented:
      true,

    sentenceParsing:
      true,

    possessiveParsing:
      true,

    questionParsing:
      true,

    offline:
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
   DEBUG SINGLE WORD
============================================================ */

export function debugTranslation(
  text: string
) {
  const result =
    translateEnglishToBembaResult(
      text
    );

  return {
    input: text,
    normalized:
      normalize(
        expandContractions(
          text
        )
      ),
    result,
    exactDictionaryWord:
      isExactDictionaryWord(
        text
      ),
    dictionaryTranslation:
      englishToBemba.get(
        normalize(text)
      ),
    alias:
      englishAliases[
        normalize(text)
      ],
  };
}

/* ============================================================
   TEST TRANSLATOR SAFETY
============================================================ */

export function runTranslatorSelfTest() {
  const tests = [
    "thank",
    "think",
    "thanks",
    "thinking",
    "thought",
    "good morning",
    "how are you",
  ];

  return tests.map(
    (input) => ({
      input,
      output:
        translateEnglishToBemba(
          input
        ),
      debug:
        debugTranslation(
          input
        ),
    })
  );
}

/*
============================================================
 END
============================================================
*/
