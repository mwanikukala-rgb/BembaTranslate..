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
 * The local dictionary is the primary source of translations.
 *
 * This engine does NOT use:
 * - Internet
 * - API
 * - Cloud
 * - AI service
 *
 * Translation order:
 *
 * 1. Exact important phrase
 * 2. Exact dictionary phrase
 * 3. Normalized dictionary phrase
 * 4. High-confidence sentence patterns
 * 5. Verb-root conjugation
 * 6. Possessives
 * 7. Longest dictionary phrase matching
 * 8. Exact dictionary word matching
 * 9. Very conservative fuzzy matching
 *
 * The complete dictionary is indexed.
 *
 * ============================================================
 */


/* ============================================================
   DICTIONARY
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

/*
 * Main lookup.
 *
 * English phrase -> first Bemba translation.
 */

const dictionaryLookup =
  new Map<string, string>();


/*
 * All translations for an English phrase.
 *
 * English phrase -> multiple Bemba translations.
 */

const dictionaryAlternatives =
  new Map<string, string[]>();


/*
 * Word-only index.
 *
 * This is deliberately separate from the main index.
 * It prevents multi-word dictionary entries from being
 * incorrectly used as single words.
 */

const dictionaryWordLookup =
  new Map<string, string>();


/*
 * Build indexes from the ENTIRE dictionary.
 */

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
   * Main dictionary.
   */

  if (!dictionaryLookup.has(english)) {
    dictionaryLookup.set(
      english,
      bemba
    );
  }

  /*
   * Alternatives.
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
   * Word-only lookup.
   */

  if (!english.includes(" ")) {
    if (!dictionaryWordLookup.has(english)) {
      dictionaryWordLookup.set(
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
 * These convert common English variations to dictionary
 * headwords.
 *
 * They are ONLY used when the canonical word exists in
 * the local dictionary.
 */

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

  angry: "angry",
  anger: "angry",
};


/* ============================================================
   LOOKUP
============================================================ */

function lookupEnglish(
  wordOrPhrase: string
): string | undefined {

  const normalized =
    normalize(wordOrPhrase);

  if (!normalized) {
    return undefined;
  }

  /*
   * 1. Exact dictionary lookup.
   */

  const exact =
    dictionaryLookup.get(
      normalized
    );

  if (exact) {
    return exact;
  }

  /*
   * 2. Alias lookup.
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
   WORD-ONLY LOOKUP
============================================================ */

function lookupEnglishWord(
  word: string
): string | undefined {

  const normalized =
    normalize(word);

  if (!normalized) {
    return undefined;
  }

  /*
   * Exact word.
   */

  const direct =
    dictionaryWordLookup.get(
      normalized
    );

  if (direct) {
    return direct;
  }

  /*
   * Alias.
   */

  const alias =
    englishAliases[normalized];

  if (alias) {
    return dictionaryWordLookup.get(
      normalize(alias)
    );
  }

  return undefined;
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
    lookupEnglishWord(
      englishWord
    );

  if (!translation) {
    return undefined;
  }

  /*
   * Example:
   *
   * -landa
   * -sosa
   * -landa/-sosa
   */

  const first =
    translation
      .split("/")
      .map(
        (item) =>
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

    case "people":
      return `Bale${root}`;

    case "it":
      return `Cile${root}`;

    default:
      return undefined;
  }
}


/* ============================================================
   SPECIAL SUBJECTS
============================================================ */

/*
 * These are high-confidence English subjects.
 *
 * IMPORTANT:
 *
 * We do not simply translate the subject word and then
 * concatenate it with a Bemba verb.
 *
 * We explicitly handle the grammatical subject.
 */

const subjectMap: Record<
  string,
  string
> = {

  people: "abantu",

  person: "umuntu",

  man: "umuntu",

  woman: "umukashana",

  child: "umwana",

  children: "abana",

  boy: "umwaice",

  boys: "abaice",

  girl: "umukashana",

  girls: "abakashana",

  men: "abantu",

  women: "abantu",

  friend: "umusuma",

  friends: "abasuma",

  family: "umuryango",

  families: "imiryango",

  students: "abafundi",

  student: "umufundi",

  teachers: "abasambilishi",

  teacher: "umusambilishi",

  workers: "ababomba",

  worker: "umubombi",
};


/* ============================================================
   SUBJECT LOOKUP
============================================================ */

function lookupSubject(
  subject: string
): string | undefined {

  const normalized =
    normalize(subject);

  /*
   * First use explicit grammatical subject
   * mappings.
   */

  const mapped =
    subjectMap[normalized];

  if (mapped) {
    return mapped;
  }

  /*
   * Then use the dictionary.
   *
   * This allows the large dictionary to provide
   * subjects not explicitly listed above.
   */

  return lookupEnglishWord(
    normalized
  );
}


/* ============================================================
   SPECIAL PRESENT-TENSE SUBJECT FORMS
============================================================ */

function getSubjectPrefix(
  subject: string
): string | undefined {

  switch (
    normalize(subject)
  ) {

    case "i":
      return "Nde";

    case "you":
      return "Ule";

    case "he":
    case "she":
      return "Ale";

    case "we":
      return "Tule";

    case "they":
    case "people":
      return "Bale";

    case "it":
      return "Cile";

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
   * First try the complete phrase.
   */

  const direct =
    lookupEnglish(
      normalized
    );

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

  let index = 0;

  while (
    index < words.length
  ) {

    const phrase =
      findLongestMatch(
        words,
        index
      );

    if (phrase) {
      translated.push(
        phrase.translation
      );

      index +=
        phrase.length;

      continue;
    }

    const word =
      lookupEnglishWord(
        words[index]
      );

    if (!word) {
      return undefined;
    }

    translated.push(word);

    index++;
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
   IMPORTANT EVERYDAY PHRASES
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

    [
      "i want money",
      "Ndefwaya indalama",
    ],

    [
      "i am angry",
      "Nimfulwa",
    ],

    [
      "i'm angry",
      "Nimfulwa",
    ],

    [
      "i am sick",
      "Ndelwala",
    ],

    [
      "i'm sick",
      "Ndelwala",
    ],

    [
      "people are sick",
      "Abantu balwala",
    ],

    [
      "the people are sick",
      "Abantu balwala",
    ],

    [
      "people are ill",
      "Abantu balwala",
    ],

    [
      "the people are ill",
      "Abantu balwala",
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

  /*
   * I
   */

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
   SPECIAL PLURAL SUBJECT SENTENCES
============================================================ */

/*
 * This section is important.
 *
 * We must NOT translate:
 *
 * people are sick
 *
 * as:
 *
 * people -> whatever dictionary entry happens to exist
 *
 * Instead:
 *
 * people -> abantu
 * sick -> -lwala
 *
 * resulting in:
 *
 * Abantu balwala
 *
 * ============================================================
 */

function translatePluralSubjectSentence(
  text: string
): string | undefined {

  const normalized =
    normalize(
      expandContractions(text)
    );

  /*
   * PEOPLE + ARE + SICK
   */

  const peopleSick =
    normalized.match(
      /^(?:the\s+)?people\s+(?:are|were)\s+(sick|ill|unwell)$/
    );

  if (peopleSick) {
    return "Abantu balwala";
  }

  /*
   * PEOPLE + ARE + ANGRY
   */

  const peopleAngry =
    normalized.match(
      /^(?:the\s+)?people\s+(?:are|were)\s+angry$/
    );

  if (peopleAngry) {
    return "Abantu bafululuka";
  }

  /*
   * PEOPLE + VERB
   *
   * Example:
   *
   * people work
   * people are working
   *
   * The dictionary still determines the verb root.
   */

  const peopleVerb =
    normalized.match(
      /^(?:the\s+)?people\s+(?:are\s+|do\s+|will\s+)?(.+)$/
    );

  if (peopleVerb) {

    const rest =
      peopleVerb[1].trim();

    /*
     * Do not treat adjectives as verbs here.
     */

    const verbWords =
      rest.split(" ");

    if (!verbWords.length) {
      return undefined;
    }

    const verb =
      verbWords[0];

    const root =
      getVerbRoot(verb);

    if (!root) {
      return undefined;
    }

    const objectWords =
      verbWords.slice(1);

    const verbForm =
      `Bale${root}`;

    if (!objectWords.length) {
      return `Abantu ${verbForm}`;
    }

    const object =
      translateObject(
        objectWords.join(" ")
      );

    if (!object) {
      return undefined;
    }

    return `Abantu ${verbForm} ${object}`;
  }

  return undefined;
}


/* ============================================================
   GENERAL SUBJECT + VERB
============================================================ */

function translateSubjectVerb(
  subject: string,
  rest: string
): string | undefined {

  let cleaned =
    rest.trim();

  /*
   * Remove English auxiliaries.
   */

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

  const conjugated =
    conjugatePresent(
      subject,
      verb
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
   * Plural subjects.
   */

  const plural =
    translatePluralSubjectSentence(
      normalized
    );

  if (plural) {
    return plural;
  }

  /*
   * Explicit high-confidence patterns.
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
   * I + verb
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
   * YOU + verb
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
   * HE / SHE + verb
   */

  const thirdPerson =
    normalized.match(
      /^(he|she)\s+(.+)$/
    );

  if (thirdPerson) {

    const result =
      translateSubjectVerb(
        thirdPerson[1],
        thirdPerson[2]
      );

    if (result) {
      return result;
    }
  }

  /*
   * WE + verb
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
   * THEY + verb
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
   * I AM + adjective / condition.
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
   * YOU ARE + adjective.
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
   * HE / SHE IS + adjective.
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
   LONGEST PHRASE MATCH
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

  /*
   * Large enough for dictionary phrases,
   * while avoiding unreasonable searches.
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
        a[i - 1] ===
        b[j - 1]
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
   CONSERVATIVE FUZZY LOOKUP
============================================================ */

function fuzzyLookup(
  word: string
): string | undefined {

  const normalized =
    normalize(word);

  /*
   * Never fuzzy-match very short words.
   */

  if (
    !normalized ||
    normalized.length < 5
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
      dictionaryWordLookup.get(
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
   * Only inspect word entries.
   *
   * This means a phrase such as:
   *
   * "people"
   *
   * cannot accidentally match a completely
   * unrelated multi-word phrase.
   */

  for (
    const [
      english,
      translation,
    ]
    of dictionaryWordLookup
  ) {

    /*
     * Prevent wildly different lengths.
     */

    if (
      Math.abs(
        english.length -
        normalized.length
      ) > 2
    ) {
      continue;
    }

    /*
     * First character should normally match.
     *
     * This dramatically reduces dangerous
     * substitutions.
     */

    if (
      english[0] !==
      normalized[0]
    ) {
      continue;
    }

    const distance =
      levenshtein(
        normalized,
        english
      );

    const allowed =
      normalized.length >= 9
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
   WORD TRANSLATION
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
     * 1. Longest phrase.
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
     * 2. Exact dictionary word.
     */

    const direct =
      lookupEnglishWord(
        words[index]
      );

    if (direct) {

      output.push(
        direct
      );

      index++;

      continue;
    }

    /*
     * 3. Conservative fuzzy lookup.
     */

    const fuzzy =
      fuzzyLookup(
        words[index]
      );

    if (fuzzy) {

      output.push(
        fuzzy
      );

      index++;

      continue;
    }

    /*
     * 4. Unknown word.
     *
     * IMPORTANT:
     *
     * We do NOT substitute a random dictionary
     * entry.
     */

    return "";
  }

  return output.join(" ");
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
    String(text ?? "")
      .trim();

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
   * 1. IMPORTANT PHRASES
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
   * This is extremely important for the large dictionary.
   *
   * If the dictionary contains:
   *
   * "people are sick"
   *
   * its entry wins.
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
   * 4. SPECIAL SENTENCE UNDERSTANDING
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
   * 5. POSSESSIVE
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
   * 6. LONGEST PHRASE + COMPLETE DICTIONARY WORDS
   * ==========================================================
   */

  const wordResult =
    translateByWords(
      normalized
    );

  if (wordResult) {
    return wordResult;
  }

  /*
   * ==========================================================
   * 7. NO RELIABLE TRANSLATION
   * ==========================================================
   */

  return "";
}


/* ============================================================
   APP FALLBACK FUNCTION
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
   GET ALL KNOWN TRANSLATIONS
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
   RAW DICTIONARY SIZE
============================================================ */

export function getRawDictionarySize(): number {
  return dictionary.length;
}


/* ============================================================
   SEARCH LOCAL DICTIONARY
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


/* ============================================================
   DEBUG / DIAGNOSTIC INFORMATION
============================================================ */

export function getTranslatorInfo() {

  return {

    mode:
      "offline",

    source:
      "local Bemba dictionary",

    dictionaryEntries:
      dictionary.length,

    indexedEntries:
      dictionaryLookup.size,

    wordEntries:
      dictionaryWordLookup.size,

    alternativeEntries:
      dictionaryAlternatives.size,

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
