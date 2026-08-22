export interface DictionaryEntry {
  english: string;
  bemba: string;
  alternatives?: string[];
  category?: string;
}

// Core offline English → Bemba dictionary.
// Entries are based on the Bemba information collected for BembaTranslate.

export const bembaDictionary: DictionaryEntry[] = [
  // =========================
  // PRONOUNS
  // =========================
  { english: "I", bemba: "ine", category: "Pronouns" },
  { english: "me", bemba: "ine", category: "Pronouns" },
  { english: "you", bemba: "iwe", category: "Pronouns" },
  { english: "we", bemba: "ifwe", category: "Pronouns" },
  { english: "they", bemba: "bena", category: "Pronouns" },

  // =========================
  // QUESTION WORDS
  // =========================
  { english: "what", bemba: "cinshi", category: "Questions" },
  { english: "where", bemba: "kwi", category: "Questions" },
  { english: "when", bemba: "lilali", category: "Questions" },
  { english: "who", bemba: "nani", category: "Questions" },
  { english: "why", bemba: "mulandu nshi", category: "Questions" },
  { english: "how", bemba: "shani", category: "Questions" },

  // =========================
  // COMMON VERBS
  // =========================
  { english: "to have", bemba: "ukuba na", category: "Verbs" },
  { english: "to do", bemba: "ukucita", category: "Verbs" },
  { english: "to go", bemba: "ukuya", category: "Verbs" },
  { english: "to come", bemba: "ukuisa", category: "Verbs" },
  { english: "to see", bemba: "ukumona", category: "Verbs" },
  { english: "to know", bemba: "ukwishiba", category: "Verbs" },
  { english: "to think", bemba: "ukutontonkanya", category: "Verbs" },
  { english: "to want", bemba: "ukufwaya", category: "Verbs" },
  { english: "to need", bemba: "ukufwaikwa", category: "Verbs" },
  { english: "to make", bemba: "ukupanga", category: "Verbs" },
  { english: "to take", bemba: "ukutola", category: "Verbs" },

  // =========================
  // BASIC WORDS
  // =========================
  { english: "money", bemba: "indalama", category: "Common Words" },
  { english: "good", bemba: "cilyo", category: "Common Words" },
  { english: "angry", bemba: "nimfulwa", category: "Common Words" },
  { english: "morning", bemba: "ulucelo", alternatives: ["mwashibukeni"], category: "Time" },
  { english: "afternoon", bemba: "akasuba", category: "Time" },
  { english: "evening", bemba: "icungulo", category: "Time" },
  { english: "night", bemba: "ubushiku", category: "Time" },
  { english: "now", bemba: "nombaline", category: "Time" },
  { english: "later", bemba: "limbi", category: "Time" },
  { english: "before", bemba: "taulati", category: "Time" },

  // =========================
  // GREETINGS & EVERYDAY PHRASES
  // =========================
  { english: "hello", bemba: "muli shani", category: "Greetings" },
  { english: "hello informal", bemba: "uli shani", category: "Greetings" },
  { english: "how are you", bemba: "muli shani", category: "Greetings" },
  { english: "fine thank you", bemba: "ndi fye bwino, natotela", category: "Greetings" },
  { english: "what is your name", bemba: "niwe nani ishina", category: "Greetings" },
  { english: "my name is", bemba: "ishina lyandi ni ne", category: "Greetings" },
  { english: "nice to meet you", bemba: "chawama ukukumona", category: "Greetings" },
  { english: "please", bemba: "napapata, ndekulomba", category: "Greetings" },
  { english: "thank you", bemba: "natotela", category: "Greetings" },
  { english: "you're welcome", bemba: "eya mukwai", category: "Greetings" },
  { english: "yes", bemba: "eee", category: "Greetings" },
  { english: "no", bemba: "awe", alternatives: ["iyoo"], category: "Greetings" },
  { english: "excuse me", bemba: "njelelako", category: "Greetings" },
  { english: "sorry", bemba: "mbelelako uluse, mukwai", category: "Greetings" },
  { english: "goodbye", bemba: "shalenipo", alternatives: ["kafikenio"], category: "Greetings" },
  { english: "goodbye informal", bemba: "shalapo", category: "Greetings" },
  { english: "welcome", bemba: "mwaiseni", category: "Greetings" },
  { english: "good morning", bemba: "mwashibukeni", category: "Greetings" },
  { english: "good evening", bemba: "chungulopo mukwai", category: "Greetings" },
  { english: "good night", bemba: "sendamenipo", category: "Greetings" },
  { english: "i don't understand", bemba: "nshumfwikishe bwino", category: "Everyday Phrases" },
  { english: "please speak slowly", bemba: "landa panono panono", category: "Everyday Phrases" },

  // =========================
  // QUICK PHRASES
  // =========================
  { english: "i want money", bemba: "ndefwaya indalama", category: "Everyday Phrases" },
  { english: "where are you", bemba: "ulikwisa", category: "Everyday Phrases" },
  { english: "where are they", bemba: "balikwisa", category: "Everyday Phrases" },
  { english: "i am angry", bemba: "nimfulwa", category: "Everyday Phrases" },
  { english: "i'm angry", bemba: "nimfulwa", category: "Everyday Phrases" },

  // =========================
  // EMERGENCY / PROBLEMS
  // =========================
  { english: "help", bemba: "ngafweniko", category: "Emergency" },
  { english: "look out", bemba: "moneni uko", category: "Emergency" },
  { english: "leave me alone", bemba: "ndeka fye", category: "Emergency" },
  { english: "don't touch me", bemba: "wilanjikatamo", category: "Emergency" },
  { english: "police", bemba: "ba kapokola", category: "Emergency" },
  { english: "i need your help", bemba: "njafweniko", category: "Emergency" },
  { english: "it's an emergency", bemba: "ndi mu bwafya", category: "Emergency" },
  { english: "i'm lost", bemba: "ni nduba", category: "Emergency" },
  { english: "i lost my bag", bemba: "ni ndufya icola", category: "Emergency" },
  { english: "i lost my wallet", bemba: "ni dufya icikwama", category: "Emergency" },
  { english: "i am sick", bemba: "nindwala", category: "Emergency" },
  { english: "can i use your phone", bemba: "kuti nabomfyako foni yenu", category: "Emergency" },

  // =========================
  // NUMBERS / COUNTING
  // =========================
  { english: "one", bemba: "kamo", alternatives: ["cimo"], category: "Numbers" },
  { english: "two", bemba: "fibili", alternatives: ["tubili"], category: "Numbers" },
  { english: "three", bemba: "tutatu", alternatives: ["fitatu"], category: "Numbers" },
  { english: "four", bemba: "cine", category: "Numbers" },
  { english: "five", bemba: "fisano", category: "Numbers" },
  { english: "six", bemba: "mutanda", category: "Numbers" },
  { english: "seven", bemba: "cine lubali", category: "Numbers" },
  { english: "eight", bemba: "cine konse konse", category: "Numbers" },
  { english: "nine", bemba: "pabula", category: "Numbers" },
  { english: "ten", bemba: "ikumi", category: "Numbers" },

  { english: "eleven", bemba: "ikumi na kamo", category: "Numbers" },
  { english: "twelve", bemba: "ikumi na tubili", category: "Numbers" },
  { english: "thirteen", bemba: "ikumi na tutatu", category: "Numbers" },
  { english: "fourteen", bemba: "ikumi na tune", category: "Numbers" },
  { english: "fifteen", bemba: "ikumi na tusano", category: "Numbers" },
  { english: "sixteen", bemba: "ikumi na mutanda", category: "Numbers" },
  { english: "seventeen", bemba: "ikumi na cine lubali", category: "Numbers" },
  { english: "eighteen", bemba: "ikumi na cine konse konse", category: "Numbers" },
  { english: "nineteen", bemba: "ikumi na pabula", category: "Numbers" },
  { english: "twenty", bemba: "ama kumi yabili", category: "Numbers" },
  { english: "thirty", bemba: "ama kumi yatatu", category: "Numbers" },
  { english: "forty", bemba: "amakumi cine", category: "Numbers" },
  { english: "fifty", bemba: "amakumi yasano", category: "Numbers" },
  { english: "sixty", bemba: "amakumi mutanda", category: "Numbers" },
  { english: "seventy", bemba: "amakumi pabula", category: "Numbers" },
  { english: "eighty", bemba: "amakumi cine konse konse", category: "Numbers" },
  { english: "ninety", bemba: "amakumi pabula", category: "Numbers" },
  { english: "one hundred", bemba: "umwanda umo", category: "Numbers" },
  { english: "two hundred", bemba: "imyanda ibili", category: "Numbers" },
  { english: "three hundred", bemba: "imyanda itatu", category: "Numbers" },
  { english: "one thousand", bemba: "ikana limo", category: "Numbers" },
  { english: "two thousand", bemba: "amakana yabili", category: "Numbers" },
  { english: "one million", bemba: "amakana ikana limo", category: "Numbers" },
  { english: "half", bemba: "pakati", alternatives: ["citika"], category: "Numbers" },
  { english: "less", bemba: "ukucepako", category: "Numbers" },
  { english: "more", bemba: "ukucilapo", alternatives: ["lundenipo"], category: "Numbers" },

  // =========================
  // DAYS
  // =========================
  { english: "today", bemba: "lelo", category: "Days" },
  { english: "yesterday", bemba: "mailo", category: "Days" },
  { english: "tomorrow", bemba: "mailo", category: "Days" },
  { english: "this week", bemba: "uno mulungu", category: "Days" },
  { english: "last week", bemba: "uyu mulungu wapwile", category: "Days" },
  { english: "next week", bemba: "uyu mulungu uleisa", category: "Days" },
  { english: "sunday", bemba: "pa Sondo", alternatives: ["pa mulungu"], category: "Days" },
  { english: "monday", bemba: "pali cimo", category: "Days" },
  { english: "tuesday", bemba: "pali cibili", category: "Days" },
  { english: "wednesday", bemba: "pali citatu", category: "Days" },
  { english: "thursday", bemba: "pali cine", category: "Days" },
  { english: "friday", bemba: "pali cisano", category: "Days" },
  { english: "saturday", bemba: "pa cibelushi", category: "Days" },

  // =========================
  // MONTHS
  // =========================
  { english: "january", bemba: "Akabengele kanono", category: "Months" },
  { english: "february", bemba: "Akabengele kakalamba", category: "Months" },
  { english: "march", bemba: "Kutumpu", category: "Months" },
  { english: "april", bemba: "Shinde", category: "Months" },
  { english: "may", bemba: "Akapepo Kanono", category: "Months" },
  { english: "june", bemba: "Akapepo Kakalamba", category: "Months" },
  { english: "july", bemba: "Cikungulu pepo", category: "Months" },
  { english: "august", bemba: "Kasakantobo", category: "Months" },
  { english: "september", bemba: "Ulusuba lunono", category: "Months" },
  { english: "october", bemba: "Lusuba lukalamba", category: "Months" },
  { english: "november", bemba: "Chinshikubili", category: "Months" },
  { english: "december", bemba: "Mupundu-milimo", category: "Months" },

  // =========================
  // COLORS
  // =========================
  { english: "black", bemba: "ukufita", category: "Colors" },
  { english: "white", bemba: "ukubuta", category: "Colors" },
  { english: "gray", bemba: "ukufitulukila", category: "Colors" },
  { english: "red", bemba: "ukukashika", category: "Colors" },
  { english: "blue", bemba: "makumbi makumbi", category: "Colors" },
  { english: "yellow", bemba: "mutuntula", category: "Colors" },
  { english: "green", bemba: "katapa katapa", category: "Colors" },
  { english: "purple", bemba: "kolokondwe", category: "Colors" },

  // =========================
  // DIRECTIONS
  // =========================
  { english: "street", bemba: "mumusebo", category: "Directions" },
  { english: "left", bemba: "ukuso", category: "Directions" },
  { english: "right", bemba: "ukulyo", category: "Directions" },
  { english: "straight ahead", bemba: "ukuya fye ukwabula ukupilibukila kukulyo nelyo kukuso", category: "Directions" },
  { english: "intersection", bemba: "amakumanino", category: "Directions" },
  { english: "north", bemba: "akabanga", category: "Directions" },
  { english: "south", bemba: "amasamba", category: "Directions" },
  { english: "east", bemba: "akapinda ka kukulyo", category: "Directions" },
  { english: "west", bemba: "akapinda ka kukuso", category: "Directions" },
  { english: "uphill", bemba: "ku mulundu", category: "Directions" },
  { english: "downhill", bemba: "ku mukunkuluko", category: "Directions" },
  { english: "how do I get to", bemba: "bushe kuti naenda shani pakuya ku", category: "Directions" },

  // =========================
  // TRANSPORT
  // =========================
  { english: "bus", bemba: "saca", category: "Transportation" },
  { english: "train", bemba: "shitima", category: "Transportation" },
  { english: "airport", bemba: "cibansa ca ndeke", category: "Transportation" },
  { english: "taxi", bemba: "taxi", category: "Transportation" },
  { english: "take me there please", bemba: "ntwaleniko uko, napapata", category: "Transportation" },
  { english: "how much does it cost", bemba: "nishinga", category: "Transportation" },
  { english: "car", bemba: "motoka", category: "Transportation" },

  // =========================
  // FOOD
  // =========================
  { english: "chicken", bemba: "inkoko", category: "Food" },
  { english: "beef", bemba: "inama ya ng'ombe", category: "Food" },
  { english: "fish", bemba: "isabi", category: "Food" },
  { english: "pork", bemba: "inkumba", category: "Food" },
  { english: "sausage", bemba: "soseji", category: "Food" },
  { english: "cheese", bemba: "chezi", category: "Food" },
  { english: "eggs", bemba: "amani", category: "Food" },
  { english: "salad", bemba: "saladi", category: "Food" },
  { english: "vegetables", bemba: "umusalu", category: "Food" },
  { english: "bread", bemba: "umukate", category: "Food" },
  { english: "rice", bemba: "umupunga", category: "Food" },
  { english: "beans", bemba: "cilemba", category: "Food" },
  { english: "coffee", bemba: "kofi", category: "Food" },
  { english: "milk", bemba: "umukaka", category: "Food" },
  { english: "juice", bemba: "jusi", category: "Food" },
  { english: "water", bemba: "amenshi", category: "Food" },
  { english: "beer", bemba: "ubwalwa", category: "Food" },
  { english: "salt", bemba: "umucele", category: "Food" },
  { english: "I want", bemba: "ndefwaya", category: "Food" },
  { english: "I don't eat meat", bemba: "nshilya inama", category: "Food" },

  // =========================
  // SHOPPING
  // =========================
  { english: "how much is this", bemba: "ni shinga ici", category: "Shopping" },
  { english: "too expensive", bemba: "wakula sana mutengo", category: "Shopping" },
  { english: "cheap", bemba: "ukuchipa", category: "Shopping" },
  { english: "I can't afford it", bemba: "teti nkwanishe ukulipila", category: "Shopping" },
  { english: "I don't want it", bemba: "nshilefwaya ici", category: "Shopping" },
  { english: "I'll take it", bemba: "nalasenda", category: "Shopping" },
  { english: "soap", bemba: "sopo", category: "Shopping" },
  { english: "toothbrush", bemba: "umuswaki", category: "Shopping" },
  { english: "shampoo", bemba: "sopo ya kusambila umushishi", category: "Shopping" },
  { english: "umbrella", bemba: "umbrella", category: "Shopping" },

  // =========================
  // COMMON SIGNS
  // =========================
  { english: "open", bemba: "isula", category: "Signs" },
  { english: "closed", bemba: "isala", category: "Signs" },
  { english: "entrance", bemba: "ubwingililo", category: "Signs" },
  { english: "exit", bemba: "umulompokelo", category: "Signs" },
  { english: "push", bemba: "sunka", category: "Signs" },
  { english: "pull", bemba: "tinta", category: "Signs" },
  { english: "toilet", bemba: "cimbusu", category: "Signs" },
  { english: "men", bemba: "baume", category: "Signs" },
  { english: "women", bemba: "abanakashi", category: "Signs" },
  { english: "forbidden", bemba: "icaleshiwa", category: "Signs" }
];

// Normalize text for matching.
function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}

// Search the offline dictionary.
export function searchDictionary(query: string): DictionaryEntry[] {
  const q = normalize(query);

  if (!q) return [];

  return bembaDictionary
    .filter((entry) => {
      return (
        normalize(entry.english).includes(q) ||
        normalize(entry.bemba).includes(q) ||
        entry.alternatives?.some((word) =>
          normalize(word).includes(q)
        )
      );
    })
    .slice(0, 20);
}

// Translate English to Bemba.
// Exact phrases are checked before individual words.
export function translateEnglishToBemba(text: string): string {
  const normalized = normalize(text);

  if (!normalized) return "";

  const exact = bembaDictionary.find(
    (entry) => normalize(entry.english) === normalized
  );

  if (exact) return exact.bemba;

  const words = normalized.split(" ");

  return words
    .map((word) => {
      const match = bembaDictionary.find(
        (entry) => normalize(entry.english) === word
      );

      return match ? match.bemba : word;
    })
    .join(" ");
}
