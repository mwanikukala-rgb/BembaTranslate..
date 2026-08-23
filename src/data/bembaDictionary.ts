// src/data/bembaDictionary.ts

export type BembaDictionaryEntry = {
  english: string;
  bemba: string;
};

/**
 * BembaTranslate offline dictionary.
 *
 * IMPORTANT:
 * - No API
 * - No internet
 * - No cloud service
 * - No external model
 * - Safe TypeScript syntax
 *
 * English -> Bemba
 */

export const bembaDictionary: BembaDictionaryEntry[] = [
  // =========================================================
  // BASIC PHRASES
  // =========================================================

  { english: "yes", bemba: "ee" },
  { english: "no", bemba: "awe" },
  { english: "how are you", bemba: "Uli shani?" },
  { english: "how are you informal", bemba: "Uli shani?" },
  { english: "how are you formal", bemba: "Muli shani?" },
  { english: "how are you plural", bemba: "Muli shani?" },
  { english: "goodbye", bemba: "Shaleenipo" },
  { english: "bye", bemba: "Kafikenipo" },
  { english: "farewell", bemba: "Kafikenipo" },
  { english: "stay well", bemba: "Shalenipo" },

  { english: "my name is", bemba: "Ishina lyandi ni..." },
  { english: "person", bemba: "umuntu" },
  { english: "friend", bemba: "umunandi" },
  { english: "child", bemba: "umwana" },
  { english: "the Bemba language", bemba: "iciBemba" },

  { english: "and", bemba: "na" },
  { english: "with", bemba: "na" },
  { english: "like", bemba: "nga" },
  { english: "as", bemba: "nga" },

  { english: "good", bemba: "suma" },
  { english: "all", bemba: "onse" },
  { english: "morning", bemba: "uluceelo" },

  { english: "thank you", bemba: "Natotela" },
  { english: "a lot", bemba: "Saana" },
  { english: "thanks a lot", bemba: "Natotela saana" },

  // =========================================================
  // GREETINGS
  // =========================================================

  { english: "hello", bemba: "Mwapola" },
  { english: "hi", bemba: "Mwapola" },
  { english: "hello formal", bemba: "Mwapola" },
  { english: "hello informal", bemba: "Mwapoleni" },

  { english: "response to hello", bemba: "Endita mukwai" },
  { english: "how are you response", bemba: "Bwino" },
  { english: "response to how are you", bemba: "Bwino" },

  { english: "good morning", bemba: "Mwashibukeni!" },
  { english: "response to good morning", bemba: "Eya mukwai" },
  { english: "response to good morning formal", bemba: "Endita mukwai" },

  { english: "what is the news", bemba: "Kuli ci?" },
  { english: "all is well", bemba: "Kwatalala" },

  { english: "good afternoon", bemba: "Kasuba mukwai" },
  { english: "good afternoon response", bemba: "Endita mukwai" },

  { english: "good evening", bemba: "Chungulo mukwai" },
  { english: "good evening response", bemba: "Endita mukwai" },

  { english: "good night", bemba: "Sendameenipo" },
  { english: "good night response", bemba: "Eya mukwai" },

  { english: "sleep well", bemba: "Ulale umutende" },
  { english: "sleep well informal", bemba: "Ulale bwino" },
  { english: "sleep well formal", bemba: "Mulale umutende" },
  { english: "sleep well formal alternative", bemba: "Mulale bwino" },

  { english: "welcome", bemba: "Mwaiseni" },
  { english: "welcome response", bemba: "Endita mukwai" },

  { english: "fare well informal", bemba: "Wende umutende" },
  { english: "fare well formal", bemba: "Mwende umutende" },

  { english: "condolence greeting", bemba: "Mwalosheni mukwai" },
  { english: "condolence greeting alternative", bemba: "Mwaculeni mukwai" },

  { english: "are you eating well", bemba: "Mwalileni" },
  { english: "are you eating well alternative", bemba: "Mwalyeni bwino" },
  { english: "provided you eat well", bemba: "Kulila mulelya" },

  { english: "greetings to one at work", bemba: "Mwabombeni" },
  { english: "greeting to returning hunter", bemba: "Mwabambeni" },
  { english: "greeting to returning hunter alternative", bemba: "Mabingo" },
  { english: "greeting to returning hunter alternative 2", bemba: "Icibamfi" },

  { english: "greeting to returning army after victory", bemba: "Mwasalipeni" },
  { english: "greeting after killing dangerous animal", bemba: "Mwasalipeni" },
  { english: "greeting after escaping danger", bemba: "Mwapusukeni" },
  { english: "greeting to a chief when leaving", bemba: "Lwapakata Mukwai" },

  // =========================================================
  // HELP
  // =========================================================

  { english: "help", bemba: "ubwafwilisho" },
  { english: "help me", bemba: "ngafwa" },
  { english: "help me informal", bemba: "ngafwako" },
  { english: "help me formal", bemba: "ngafweni" },
  { english: "help me plural formal", bemba: "ngafweniko" },

  // =========================================================
  // COMMON SENTENCES
  // =========================================================

  { english: "how are you doing", bemba: "Uli shani?" },
  { english: "I am fine", bemba: "Ndi bwino" },
  { english: "I am well", bemba: "Ndi bwino" },
  { english: "I am good", bemba: "Ndi bwino" },
  { english: "we are fine", bemba: "Tuli bwino" },
  { english: "thank you very much", bemba: "Natotela saana" },
  { english: "thanks", bemba: "Natotela" },

  { english: "what is your name", bemba: "Ishina lyenu ni li?" },
  { english: "my name is", bemba: "Ishina lyandi ni..." },
  { english: "where are you", bemba: "Uli kwisa?" },
  { english: "where are you formal", bemba: "Muli kwisa?" },

  { english: "I want money", bemba: "Ndefwaya indalama" },
  { english: "I want food", bemba: "Ndefwaya ifyakulya" },
  { english: "I want water", bemba: "Ndefwaya amenshi" },
  { english: "I need help", bemba: "Ndefwaya ubwafwilisho" },

  { english: "come", bemba: "isa" },
  { english: "come here", bemba: "Isa kuno" },
  { english: "go", bemba: "ya" },
  { english: "go there", bemba: "Ya uko" },
  { english: "wait", bemba: "Lindila" },
  { english: "listen", bemba: "Umfwa" },
  { english: "look", bemba: "Moneni" },
  { english: "speak", bemba: "Landa" },

  // =========================================================
  // NUMERALS
  // =========================================================

  { english: "one", bemba: "-mo" },
  { english: "two", bemba: "-bili" },
  { english: "three", bemba: "-tatu" },
  { english: "four", bemba: "-ne" },
  { english: "five", bemba: "Sano" },
  { english: "six", bemba: "mutanda" },
  { english: "seven", bemba: "cine lubali" },
  { english: "eight", bemba: "cine konse konse" },
  { english: "nine", bemba: "paabula" },
  { english: "ten", bemba: "ikumi" },

  { english: "eleven", bemba: "ikumi na -mo" },
  { english: "twelve", bemba: "ikumi na -bili" },
  { english: "thirteen", bemba: "ikumi na -tatu" },

  { english: "twenty", bemba: "ama kumi yabili" },
  { english: "thirty", bemba: "ama kumi yatatu" },
  { english: "one hundred", bemba: "mwanda" },
  { english: "five hundred", bemba: "imyaanda îsaano" },
  { english: "one thousand", bemba: "kana, ikana" },
  { english: "twelve thousand", bemba: "ama kana ikumi na yabili" },

  // =========================================================
  // DAYS
  // =========================================================

  { english: "Monday", bemba: "Pali chimo" },
  { english: "Tuesday", bemba: "Pali chibili" },
  { english: "Wednesday", bemba: "Pali chitatu" },
  { english: "Thursday", bemba: "Pali chine" },
  { english: "Friday", bemba: "Pali chisano" },
  { english: "Saturday", bemba: "Pa chibelushi" },
  { english: "Sunday", bemba: "Pa mulungu" },

  { english: "first day", bemba: "Ubushiku bwalenga chimo" },
  { english: "second day", bemba: "Ubushiku bwalenga chibili" },
  { english: "third day", bemba: "Ubushiku bwalenga chitatu" },
  { english: "fourth day", bemba: "Ubushiku bwalenga chine" },
  { english: "fifth day", bemba: "Ubushiku bwalenga chisano" },
  { english: "sixth day", bemba: "Ubushiku bwalenga mutanda" },
  { english: "seventh day", bemba: "Ubushiku bwalenga cine lubali" },
  { english: "eighth day", bemba: "Ubushiku bwalenga cine konse konse" },
  { english: "ninth day", bemba: "Ubushiku bwalenga pabula" },
  { english: "tenth day", bemba: "Ubushiku bwalenga ikumi" },

  // =========================================================
  // MONTHS
  // =========================================================

  { english: "January", bemba: "Akabengele kanono" },
  { english: "February", bemba: "Akabengele kakalamba" },
  { english: "March", bemba: "Kutumpu" },
  { english: "April", bemba: "Shinde" },
  { english: "May", bemba: "Akapepo kanono" },
  { english: "June", bemba: "Akapepo kakalamba" },
  { english: "July", bemba: "Chikungu lupepo" },
  { english: "August", bemba: "Akasaka ntobo" },
  { english: "September", bemba: "Lusuba lunono" },
  { english: "October", bemba: "Lusuba lukalamba" },
  { english: "November", bemba: "Chinshikubili" },
  { english: "December", bemba: "Mupundu milimo" },

  // =========================================================
  // FAMILY
  // =========================================================

  { english: "father", bemba: "Tata" },
  { english: "my father", bemba: "Ba Tata" },
  { english: "our father", bemba: "Shifwe" },
  { english: "his father", bemba: "Wishi" },
  { english: "her father", bemba: "Wishi" },
  { english: "your father informal", bemba: "Wiso" },
  { english: "your father formal", bemba: "Ba Wiso" },
  { english: "their father", bemba: "Shibo" },

  { english: "mother", bemba: "Mayo" },
  { english: "mom", bemba: "Mayo
