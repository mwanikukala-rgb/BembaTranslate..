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
  { english: "mom", bemba: "Mayo" },
  { english: "my mother", bemba: "Mayo" },
  { english: "my mother formal", bemba: "Ba mayo" },
  { english: "our mother", bemba: "Nyinefwe" },
  { english: "your mother informal", bemba: "Noko" },
  { english: "your mother formal", bemba: "Ba Noko" },
  { english: "his mother", bemba: "Nyina" },
  { english: "her mother", bemba: "Nyina" },
  { english: "their mother", bemba: "nyinabo" },

  { english: "grandfather", bemba: "Shikulu" },
  { english: "grandfather formal", bemba: "Ba shikulu" },
  { english: "our grandfather", bemba: "Shikulwifwe" },
  { english: "your grandfather", bemba: "Sokulu" },
  { english: "your grandfather formal", bemba: "Ba sokulu" },
  { english: "his grandfather", bemba: "Shiikulu" },
  { english: "their grandfather", bemba: "Shikulwibo" },

  { english: "son", bemba: "Mwana mwaume" },
  { english: "daughter", bemba: "Mwana mukashana" },
  { english: "son or daughter", bemba: "Mwana" },
  { english: "my son", bemba: "Mwana wandi" },
  { english: "my daughter", bemba: "Mwana wandi" },
  { english: "your son", bemba: "Mwana obe" },
  { english: "your daughter", bemba: "Mwana obe" },
  { english: "his son", bemba: "Mwana wakwe" },
  { english: "her son", bemba: "Mwana wakwe" },
  { english: "our son", bemba: "Mwana wesu" },
  { english: "our daughter", bemba: "Mwana wesu" },
  { english: "their son", bemba: "Mwana wabo" },
  { english: "their daughter", bemba: "Mwana wabo" },

  { english: "brother", bemba: "Ndume nandi" },
  { english: "your brother", bemba: "Ndume nobe" },
  { english: "his brother", bemba: "Ndume nankwe" },
  { english: "our brother", bemba: "Ndume nensu" },

  { english: "sister", bemba: "Nkashi" },
  { english: "my sister", bemba: "Nkashi nandi" },
  { english: "our sister", bemba: "Nkashi nensu" },
  { english: "your sister", bemba: "Nkashi yobe" },
  { english: "his sister", bemba: "Nkashi yakhe" },

  { english: "husband", bemba: "Mulume" },
  { english: "my husband", bemba: "Mulume wandi" },
  { english: "your husband", bemba: "Mulume obe" },
  { english: "her husband", bemba: "Mwina mwakwe" },

  { english: "wife", bemba: "Mukashi" },
  { english: "wife formal", bemba: "Bakashi" },
  { english: "my wife", bemba: "Mukashi wandi" },
  { english: "your wife", bemba: "Mukashi obe" },
  { english: "his wife", bemba: "Mukashi wakwe" },

  // =========================================================
  // IN-LAWS
  // =========================================================

  { english: "father in law", bemba: "tatafyala" },
  { english: "father in law formal", bemba: "Ba tata fyala" },
  { english: "your father in law", bemba: "Sofyala" },
  { english: "your father in law formal", bemba: "Ba sofyala" },
  { english: "his father in law", bemba: "shifyala" },
  { english: "our father in law", bemba: "Shifyalefwe" },

  { english: "mother in law", bemba: "Mayofyala" },
  { english: "mother in law alternative", bemba: "Mamafyala" },
  { english: "our mother in law", bemba: "Nafyalefwe" },
  { english: "your mother in law", bemba: "Nokofyala" },
  { english: "his mother in law", bemba: "nyinafyala" },

  // =========================================================
  // FRIENDS
  // =========================================================

  { english: "friend", bemba: "Cibusa" },
  { english: "friend alternative", bemba: "Chibusa" },
  { english: "friend alternative 2", bemba: "Icibusa" },
  { english: "friends", bemba: "Ifibusa" },
  { english: "your friend", bemba: "Cibusa obe" },
  { english: "your friend alternative", bemba: "Umubiyo" },
  { english: "your friend alternative 2", bemba: "Umunobe" },
  { english: "your friends", bemba: "Ifibusa fyobe" },
  { english: "my friend", bemba: "Chibusa wandi" },
  { english: "my friend alternative", bemba: "Umunandi" },
  { english: "our friend", bemba: "Chibusa wesu" },
  { english: "our friend alternative", bemba: "Umunensu" },
  { english: "his friend", bemba: "Umubiye" },
  { english: "his friend alternative", bemba: "Umunankwe" },
  { english: "their friends", bemba: "Abanabo" },

  // =========================================================
  // ADJECTIVES / DESCRIPTORS
  // =========================================================

  { english: "new", bemba: "nomba" },
  { english: "good", bemba: "suma" },
  { english: "all", bemba: "onse" },
  { english: "big", bemba: "kikalamba" },
  { english: "small", bemba: "kanono" },
  { english: "many", bemba: "ingi" },
  { english: "few", bemba: "fiinini" },
  { english: "bad", bemba: "biipi" },
  { english: "beautiful", bemba: "wasekesha" },

  // =========================================================
  // CONJUNCTIONS
  // =========================================================

  { english: "and", bemba: "na" },
  { english: "with", bemba: "na" },
  { english: "like", bemba: "nga" },
  { english: "as", bemba: "nga" },
  { english: "because", bemba: "pantu" },
  { english: "but", bemba: "lelo" },
  { english: "or", bemba: "nangu" },
  { english: "if", bemba: "nga" },
  { english: "when", bemba: "apo" },

  // =========================================================
  // COMMON VERBS
  // =========================================================

  { english: "eat", bemba: "lya" },
  { english: "drink", bemba: "mwa" },
  { english: "sleep", bemba: "lala" },
  { english: "sit", bemba: "ikala" },
  { english: "stand", bemba: "imina" },
  { english: "walk", bemba: "enda" },
  { english: "run", bemba: "tuka" },
  { english: "come", bemba: "isa" },
  { english: "go", bemba: "ya" },
  { english: "see", bemba: "mona" },
  { english: "look", bemba: "mona" },
  { english: "hear", bemba: "umfwa" },
  { english: "listen", bemba: "umfwa" },
  { english: "speak", bemba: "landa" },
  { english: "say", bemba: "landa" },
  { english: "know", bemba: "ishiba" },
  { english: "understand", bemba: "umfwa" },
  { english: "want", bemba: "fwaya" },
  { english: "love", bemba: "temwa" },
  { english: "like", bemba: "temwa" },
  { english: "give", bemba: "pa" },
  { english: "take", bemba: "tola" },
  { english: "make", bemba: "cita" },
  { english: "do", bemba: "cita" },
  { english: "work", bemba: "bomba" },
  { english: "help", bemba: "fwafwilisha" },
  { english: "wait", bemba: "lindila" },
  { english: "open", bemba: "sula" },
  { english: "close", bemba: "shala" },
  { english: "buy", bemba: "ula" },
  { english: "sell", bemba: "sambisha" },
  { english: "read", bemba: "belenga" },
  { english: "write", bemba: "lemba" },
  { english: "learn", bemba: "sambilila" },
  { english: "teach", bemba: "sambilisha" },
  { english: "remember", bemba: "ibukisha" },
  { english: "forget", bemba: "laba" },

  // =========================================================
  // PRONOUNS
  // =========================================================

  { english: "I", bemba: "nshi" },
  { english: "me", bemba: "ine" },
  { english: "you", bemba: "iwe" },
  { english: "you formal", bemba: "imwe" },
  { english: "he", bemba: "ena" },
  { english: "she", bemba: "ena" },
  { english: "him", bemba: "ena" },
  { english: "her", bemba: "ena" },
  { english: "we", bemba: "ifwe" },
  { english: "us", bemba: "ifwe" },
  { english: "they", bemba: "bena" },
  { english: "them", bemba: "bena" },

  // =========================================================
  // NEGATION
  // =========================================================

  { english: "not", bemba: "ta-" },
  { english: "I do not", bemba: "nshi-" },
  { english: "I don't", bemba: "nshi-" },
  { english: "you do not", bemba: "tau-" },
  { english: "you don't", bemba: "tau-" },
  { english: "he does not", bemba: "taa-" },
  { english: "she does not", bemba: "taa-" },
  { english: "we do not", bemba: "tatu-" },

  // =========================================================
  // VOICES / GRAMMAR
  // =========================================================

  { english: "passive", bemba: "-w-" },
  { english: "neutral voice", bemba: "-ik-" },
  { english: "neutral voice e o", bemba: "-ek-" },

  // =========================================================
  // TIME
  // =========================================================

  { english: "today", bemba: "lelo" },
  { english: "tomorrow", bemba: "mailo" },
  { english: "yesterday", bemba: "mailo yapita" },
  { english: "now", bemba: "nomba" },
  { english: "morning", bemba: "uluceelo" },
  { english: "afternoon", bemba: "kasuba" },
  { english: "evening", bemba: "chungulo" },
  { english: "night", bemba: "ubushiku" },
  { english: "day", bemba: "ubushiku" },

  // =========================================================
  // PLACES / EVERYDAY WORDS
  // =========================================================

  { english: "home", bemba: "ng'anda" },
  { english: "house", bemba: "ng'anda" },
  { english: "school", bemba: "sukulu" },
  { english: "church", bemba: "cengelo" },
  { english: "market", bemba: "mu marketi" },
  { english: "shop", bemba: "duka" },
  { english: "road", bemba: "ndila" },
  { english: "water", bemba: "amenshi" },
  { english: "food", bemba: "ifyakulya" },
  { english: "money", bemba: "indalama" },
  { english: "work", bemba: "incito" },
  { english: "job", bemba: "incito" },
  { english: "car", bemba: "imotoka" },
  { english: "phone", bemba: "simu" },
  { english: "book", bemba: "ifyebo" },

  // =========================================================
  // PEOPLE
  // =========================================================

  { english: "man", bemba: "umwaume" },
  { english: "woman", bemba: "umukashi" },
  { english: "boy", bemba: "umwana mwaume" },
  { english: "girl", bemba: "umwana mukashana" },
  { english: "baby", bemba: "kafwafwa" },
  { english: "people", bemba: "abantu" },
  { english: "child", bemba: "umwana" },
  { english: "children", bemba: "abana" },

  // =========================================================
  // SIMPLE RESPONSES
  // =========================================================

  { english: "yes please", bemba: "ee mukwai" },
  { english: "no thank you", bemba: "awe natotela" },
  { english: "please", bemba: "mukwai" },
  { english: "sorry", bemba: "ndoloka" },
  { english: "excuse me", bemba: "mukwai" },
  { english: "welcome", bemba: "Mwaiseni" },
  { english: "congratulations", bemba: "Mwapokolola" },

  // =========================================================
  // QUESTIONS
  // =========================================================

  { english: "what", bemba: "ci" },
  { english: "who", bemba: "nani" },
  { english: "where", bemba: "kwisa" },
  { english: "when", bemba: "lilali" },
  { english: "why", bemba: "cinshi" },
  { english: "how", bemba: "shani" },
  { english: "which", bemba: "kashi" },
  { english: "how much", bemba: "shinga" },
  { english: "how many", bemba: "shinga" },

  // =========================================================
  // COLORS
  // =========================================================

  { english: "black", bemba: "mfula" },
  { english: "white", bemba: "busuma" },
  { english: "red", bemba: "kashika" },
  { english: "green", bemba: "busamba" },
  { english: "blue", bemba: "bulu" },
  { english: "yellow", bemba: "cilya" },

  // =========================================================
  // FAMILY / RELATIONSHIPS
  // =========================================================

  { english: "uncle paternal", bemba: "Tata mwaice" },
  { english: "uncle paternal formal", bemba: "Ba Tata mwaice" },
  { english: "your paternal uncle", bemba: "Wiso mwaice" },
  { english: "his paternal uncle", bemba: "Wishi mwaice" },
  { english: "our paternal uncle", bemba: "Shifwe mwaice" },

  { english: "maternal uncle", bemba: "Yama" },
  { english: "my maternal uncle", bemba: "Yama" },
  { english: "your maternal uncle", bemba: "Nokolume" },
  { english: "his maternal uncle", bemba: "Nalume" },

  { english: "paternal aunt", bemba: "Mayosenge" },
  { english: "your paternal aunt", bemba: "Nokosenge" },
  { english: "his paternal aunt", bemba: "Nasenge" },

  { english: "maternal aunt", bemba: "Mayo mwaice" },
  { english: "your maternal aunt", bemba: "Noko mwaice" },
  { english: "his maternal aunt", bemba: "Nyina mwaice" },

  // =========================================================
  // END
  // =========================================================
    // =========================================================
  // INSULTS & OFFENSIVE EXPRESSIONS
  // User-provided Bemba vocabulary
  // =========================================================

  { english: "you dog", bemba: "We mbwawe" },
  { english: "you are a dog", bemba: "Uli mbwa" },
  { english: "you are dogs", bemba: "Muli mbwa" },
  { english: "you son or daughter of a dog", bemba: "We mwana wa mbwawe" },
  { english: "he is a dog", bemba: "Ni mbwa" },
  { english: "she is a dog", bemba: "Ni mbwa" },
  { english: "they are dogs", bemba: "Ni mbwa" },
  { english: "you big dog", bemba: "We chibwawe" },
  { english: "you dogs", bemba: "Mwe mbwamwe" },
  { english: "you big dogs", bemba: "Mwe fibwamwe" },

  { english: "you fool", bemba: "We chipubawe" },
  { english: "you fool alternative", bemba: "We chipumbuwe" },
  { english: "you are a fool", bemba: "Uli chipuba" },
  { english: "you are insane", bemba: "Walipukuta" },
  { english: "foolishness", bemba: "Ubupuba" },
  { english: "take your foolishness far from here", bemba: "Twala ubupuba ukutali" },

  { english: "you are a mad person", bemba: "Uli shilu" },
  { english: "mad person", bemba: "Ishilu" },
  { english: "he is a mad person", bemba: "Lishilu" },
  { english: "she is a mad person", bemba: "Lishilu" },
  { english: "they are mad people", bemba: "Mashilu" },
  { english: "he is mad", bemba: "Alipena" },
  { english: "she is mad", bemba: "Alipena" },
  { english: "they are mad", bemba: "Balipena" },
  { english: "he or she went mad", bemba: "Baâlipena" },
  { english: "he or she went mad alternative", bemba: "Âalipena" },
  { english: "he or she is mad informal", bemba: "Chalipena" },
  { english: "they are mad informal", bemba: "Fyalipena" },
  { english: "he or she is mad very informal", bemba: "Kalipen" },
  { english: "he or she has gone mad", bemba: "Napena" },

  { english: "dick", bemba: "Chikala" },
  { english: "you dick", bemba: "Chikala chobe" },
  { english: "your fathers dick", bemba: "Chikala cha wiso" },

  { english: "pussy", bemba: "Ichinyo" },
  { english: "your pussy", bemba: "Chinyo chobe" },
  { english: "your mothers pussy", bemba: "Noko ichinyo" },
  { english: "your mothers pussy alternative", bemba: "Chinyo cha noko" },

  { english: "fuck your mother", bemba: "Tomba noko" },
  { english: "fuck", bemba: "Tomba" },

  { english: "testicle", bemba: "Itole" },
  { english: "your testicle", bemba: "Wabe tole" },

  { english: "offensive insult for someone's mother", bemba: "Stanyoko" },
  { english: "offensive insult for someone's mother alternative", bemba: "Satanyono" },
  { english: "offensive insult for someone's mother alternative 2", bemba: "Sulunyoko" },
  { english: "offensive insult for someone's mother alternative 3", bemba: "Gungunyoko" },

  { english: "anus", bemba: "Mukongo" },
  { english: "asshole", bemba: "Mukongo" },
  { english: "your mothers anus", bemba: "Mukongo wa noko" },
  { english: "your fathers anus", bemba: "Mukongo wa wiso" },
  { english: "your anus", bemba: "Munyelo obe" },

  { english: "pussy lips", bemba: "Malepe" },
  { english: "your mothers pussy lips", bemba: "Malepe ya noko" },
  { english: "your mothers pussy lips alternative", bemba: "Noko amalepe" },

  { english: "shit", bemba: "Mafi" },
  { english: "feces", bemba: "Mafi" },
  { english: "your shit", bemba: "Mafi yobe" },
  { english: "his shit", bemba: "Mafi yakhe" },
  { english: "her shit", bemba: "Mafi yakhe" },
  { english: "their shit", bemba: "Mafi yabo" },

  { english: "rubbish", bemba: "Ata!" },
  { english: "rubbish alternative", bemba: "Atase!" },

  { english: "clitoris", bemba: "Nini" },
  { english: "your mothers clitoris", bemba: "Nini ya noko" },
  { english: "your clitoris", bemba: "Nini yobe" },
  { english: "their clitoris", bemba: "Nini yabo" },
  { english: "their clitoris alternative", bemba: "Nini shabo" },

  { english: "pubic hairs", bemba: "Amaso" },
  { english: "your pubic hairs", bemba: "Maso yobe" },
  { english: "your pubic hairs alternative", bemba: "Waba amaso" },
  { english: "your mothers pubic hairs", bemba: "Maso ya noko" },
  { english: "your mothers pubic hairs alternative", bemba: "Noko amaso" },
      // =========================================================
  // PARTS OF THE BODY
  // =========================================================

  { english: "head", bemba: "Umutwe" },
  { english: "heads", bemba: "Imitwe" },

  { english: "eye", bemba: "Ilinso" },
  { english: "eyes", bemba: "Amenso" },

  { english: "nose", bemba: "Umoona" },
  { english: "noses", bemba: "Imyoona" },

  { english: "nostril", bemba: "Umoona" },
  { english: "nostrils", bemba: "Imyoona" },

  { english: "mouth", bemba: "Akanwa" },
  { english: "mouths", bemba: "Utunwa" },

  { english: "lip", bemba: "Umulomo" },
  { english: "lips", bemba: "Imilomo" },

  { english: "eyebrow", bemba: "Inkopyo" },
  { english: "eyebrows", bemba: "Inkopyo" },

  { english: "eyelid", bemba: "Icikapa ce linso" },
  { english: "eyelids", bemba: "Ifikapa ya menso" },

  { english: "chin", bemba: "Icilefulefu" },
  { english: "chins", bemba: "Ifilefulefu" },

  { english: "cheek", bemba: "Itobo" },
  { english: "cheeks", bemba: "Amatobo" },

  { english: "beard", bemba: "Umwefu" },
  { english: "beards", bemba: "Imyefu" },

  { english: "hair", bemba: "Umushishi" },

  { english: "tooth", bemba: "Ilino" },
  { english: "teeth", bemba: "Ameno" },

  { english: "tongue", bemba: "Ululimi" },
  { english: "tongues", bemba: "Indimi" },

  { english: "saliva", bemba: "Amate" },

  { english: "oesophagus", bemba: "Ichikolomino" },
  { english: "oesophaguses", bemba: "Ifikolomino" },

  { english: "breast", bemba: "Ibeele" },
  { english: "breasts", bemba: "Amabeele" },

  { english: "chest", bemba: "Ichifuba" },
  { english: "chests", bemba: "Ififuba" },

  { english: "shoulder", bemba: "Ichipeeya" },
  { english: "shoulders", bemba: "Ifipeeya" },
  { english: "shoulder alternative", bemba: "Ukubeya" },
  { english: "shoulders alternative", bemba: "Amabeya" },

  { english: "elbow", bemba: "Inkonkoni" },
  { english: "elbows", bemba: "Inkonkoni" },

  { english: "arm", bemba: "Ukuboko" },
  { english: "arms", bemba: "Amaboko" },

  { english: "finger", bemba: "Umunwe" },
  { english: "fingers", bemba: "Iminwe" },

  { english: "thumb", bemba: "Ichikumo" },
  { english: "thumbs", bemba: "Ifikumo" },

  { english: "small short finger", bemba: "Akantengelesha" },

  { english: "hand", bemba: "Ukuboko" },
  { english: "hands", bemba: "Amaboko" },

  { english: "palm", bemba: "Ichisansa" },
  { english: "palms", bemba: "Ifisansa" },

  { english: "fist", bemba: "Ikofi" },
  { english: "fists", bemba: "Amakofi" },
  { english: "fist alternative", bemba: "Ulukonya" },
  { english: "fists alternative", bemba: "Inkonya" },

  { english: "skin", bemba: "Inkanda" },

  { english: "belly", bemba: "Ifumo" },
  { english: "bellies", bemba: "Amafumo" },

  { english: "navel", bemba: "Umutoto" },
  { english: "navels", bemba: "Imitoto" },

  { english: "neck", bemba: "Umukoshi" },
  { english: "necks", bemba: "Imikoshi" },

  { english: "stomach", bemba: "Ichifu" },
  { english: "stomachs", bemba: "Ififu" },

  { english: "intestine", bemba: "Ubula" },
  { english: "intestines", bemba: "Amala" },

  { english: "pancreas", bemba: "Indusha" },

  { english: "bile", bemba: "Indusha" },

  { english: "liver", bemba: "pwapwa" },
  { english: "livers", bemba: "ba pwapa" },

  { english: "blood", bemba: "Umulopa" },

  { english: "hormone", bemba: "Insandesande" },
  { english: "hormones", bemba: "insandesande" },

  { english: "brain", bemba: "Bongobongo" },
  { english: "brains", bemba: "ba bongobongo" },

  { english: "bald head", bemba: "Ipala" },
  { english: "bald heads", bemba: "amapala" },

  { english: "artery", bemba: "Umushipa" },
  { english: "arteries", bemba: "imishipa" },

  { english: "vein", bemba: "Umushipa" },
  { english: "veins", bemba: "imishipa" },

  { english: "heart", bemba: "Umutima" },
  { english: "hearts", bemba: "Imitima" },

  { english: "bladder", bemba: "Ichisu" },
  { english: "bladders", bemba: "Ifisu" },

  { english: "urine", bemba: "Imisu" },

  { english: "rib", bemba: "Ulubafu" },
  { english: "ribs", bemba: "Imbafu" },

  { english: "spine", bemba: "Umungoloolo" },
  { english: "spines", bemba: "Imingoloolo" },

  { english: "hip", bemba: "Intungu" },
  { english: "hips", bemba: "Intungu" },

  { english: "gum", bemba: "Ichiponshi" },
  { english: "gums", bemba: "Ifiponshi" },

  { english: "heel", bemba: "Ichitende" },
  { english: "heels", bemba: "Ifitende" },

  { english: "bone", bemba: "Ifupa" },
  { english: "bones", bemba: "Amafupa" },

  { english: "bowel", bemba: "Ubula" },
  { english: "bowels", bemba: "Amala" },

  { english: "leg", bemba: "Ukuulu" },
  { english: "legs", bemba: "Amaoolu" },

  { english: "toe", bemba: "Ichikondo" },
  { english: "toes", bemba: "Ifikondo" },

  { english: "nail", bemba: "Ulwaala" },
  { english: "nails", bemba: "Amaala" },

  { english: "butt", bemba: "Itako" },
  { english: "buttocks", bemba: "Amatako" },

  { english: "anus", bemba: "Imputi" },
  { english: "anus alternative", bemba: "Umusula" },
  { english: "anuses", bemba: "Imisula" },

  { english: "pubic hair", bemba: "Amaso" },

  { english: "vagina formal", bemba: "Ubwanakashi" },
  { english: "vagina informal", bemba: "Ichinyo" },

  { english: "penis formal", bemba: "Ubwaume" },
  { english: "penis informal", bemba: "Ubwamba" },
  { english: "penis informal alternative", bemba: "Icikala" },
  { english: "penises informal", bemba: "ifikala" },

  { english: "crotch", bemba: "Ichinena" },
  { english: "crotches", bemba: "ifinena" },

  { english: "knee", bemba: "ikufi" },
  { english: "knees", bemba: "amakufi" },

  { english: "waist", bemba: "Umusana" },
  { english: "waists", bemba: "Imisana" },

  { english: "wrist", bemba: "Inkolokoso" },

  { english: "forehead", bemba: "Impumi" },
    // =========================================================
  // ADJECTIVES
  // =========================================================

  // Examples

  { english: "a green house", bemba: "inganda ya katapakatapa" },
  { english: "a tall building", bemba: "Ichikuulwa ichitali" },
  { english: "a very old man", bemba: "Umwaume umukote saana" },
  { english: "the old red house", bemba: "Inganda ya kale iyakashika" },
  { english: "a very nice friend", bemba: "Chibusa umusuma saana" },

  // ---------------------------------------------------------
  // COLORS — Amalangi
  // ---------------------------------------------------------

  { english: "colors", bemba: "Amalangi" },
  { english: "black", bemba: "-fiita" },
  { english: "brown", bemba: "-kashikila" },
  { english: "red", bemba: "-kashika" },
  { english: "white", bemba: "-buuta" },
  { english: "blue", bemba: "blue" },
  { english: "grey", bemba: "grey" },
  { english: "purple", bemba: "Pepo" },
  { english: "orange", bemba: "olenji" },
  { english: "yellow", bemba: "yelo" },

  // ---------------------------------------------------------
  // SIZES — Ubukulu
  // ---------------------------------------------------------

  { english: "sizes", bemba: "UBUKULU" },
  { english: "big", bemba: "-kulu" },
  { english: "small", bemba: "-nono" },
  { english: "small alternative", bemba: "-cepa" },
  { english: "long", bemba: "-leepa" },
  { english: "tall", bemba: "-leepa" },
  { english: "short", bemba: "-ipipa" },
  { english: "narrow", bemba: "-ipipa" },
  { english: "deep", bemba: "-shika" },

  // ---------------------------------------------------------
  // FOOD TASTE — -Sonda
  // ---------------------------------------------------------

  { english: "food taste", bemba: "-SONDA" },
  { english: "taste", bemba: "-sonda" },
  { english: "sweet", bemba: "-lowa" },
  { english: "sour", bemba: "-sasamina" },
  { english: "taste sour like lemon", bemba: "-sasamina" },
  { english: "bitter", bemba: "-lula" },
    // =========================================================
  // NAMES OF TREES
  // =========================================================

  { english: "Erythrophleum", bemba: "Kaimbi" },
  { english: "Erythrophleum tree", bemba: "Kaimbi" },
  { english: "Erythrophleum trees", bemba: "Bakaimbi" },

  { english: "carpentry tree", bemba: "Mululu" },
  { english: "carpentry trees", bemba: "Imilulu" },

  { english: "Entandrophragma delevoyi Guerke", bemba: "Mofu" },
  { english: "Entandrophragma delevoyi tree", bemba: "Mofu" },
  { english: "Entandrophragma delevoyi trees", bemba: "Imyofu" },

  { english: "Pterocarpus angolensis", bemba: "Mulombwa" },
  { english: "Pterocarpus angolensis tree", bemba: "Umulombwa" },
  { english: "Pterocarpus angolensis trees", bemba: "Imilombwa" },

  { english: "Afzelia quanzensis Welw", bemba: "Mupapa" },
  { english: "Afzelia quanzensis tree", bemba: "Umupapa" },
  { english: "Afzelia quanzensis trees", bemba: "Imipapa" },

  { english: "Parinarium mobola Oliv", bemba: "Mupundu" },
  { english: "Parinarium mobola tree", bemba: "Umupundu" },
  { english: "Parinarium mobola trees", bemba: "Imipundu" },

  { english: "Faurea speciosa Welw", bemba: "Saninga" },
  { english: "Faurea speciosa tree", bemba: "Saninga" },
  { english: "Faurea speciosa trees", bemba: "Basaninga" },

  { english: "Afromosia angolensis", bemba: "Mubanga" },
  { english: "Afromosia angolensis tree", bemba: "Umubanga" },
  { english: "Afromosia angolensis trees", bemba: "Imibanga" },

  { english: "Monotes oblongifolius Hutch", bemba: "Cipampa" },
  { english: "Monotes oblongifolius tree", bemba: "Cipampa" },
  { english: "Monotes oblongifolius trees", bemba: "Ficipampa" },

  { english: "Syzygium tree", bemba: "Lwamba" },
  { english: "Syzygium trees", bemba: "Balwamba" },

  { english: "Diospyros tree", bemba: "Mucenja" },
  { english: "Diospyros trees", bemba: "Imicenja" },

  { english: "Hirtella bangweolensis", bemba: "Mukuwe" },
  { english: "Hirtella bangweolensis tree", bemba: "Umukuww" },
  { english: "Hirtella bangweolensis trees", bemba: "Imikuwe" },

  { english: "Marquesia macroura Gilg", bemba: "Museshi" },
  { english: "Marquesia macroura tree", bemba: "Umuseshi" },
  { english: "Marquesia macroura trees", bemba: "Imiseshi" },

  { english: "Xylopiya", bemba: "Mwengele" },
  { english: "Xylopiya tree", bemba: "Umwengele" },
  { english: "Xylopiya trees", bemba: "Imyengele" },

  { english: "Albizzia sericocephala Benth", bemba: "Musase" },
  { english: "Albizzia sericocephala tree", bemba: "Umusase" },
  { english: "Albizzia sericocephala trees", bemba: "Imisase" },

  { english: "Barlinia craibiana Bark.f.", bemba: "Mutobo" },
  { english: "Barlinia craibiana tree", bemba: "Umutobo" },
  { english: "Barlinia craibiana trees", bemba: "Imitobo" },

  { english: "Erythrina abyssinica Lam", bemba: "Mulunguti" },
  { english: "Erythrina abyssinica tree", bemba: "Umulunguti" },
  { english: "Erythrina abyssinica trees", bemba: "Imilunguti" },

  { english: "Swartzia madagacahensis", bemba: "Ndale" },
  { english: "Swartzia madagacahensis tree", bemba: "Indale" },
  { english: "Swartzia madagacahensis trees", bemba: "Indale" },

  { english: "Dalbergia nitidula Welw", bemba: "Kalongwe" },
  { english: "Dalbergia nitidula tree", bemba: "Kalongwe" },
  { english: "Dalbergia nitidula trees", bemba: "Tukalongwe" },

  { english: "Brachystegia allenii Burt Davy", bemba: "Mutondo" },
  { english: "Brachystegia allenii tree", bemba: "Umutondo" },
  { english: "Brachystegia allenii trees", bemba: "Imitondo" },

  { english: "unknown tree mpaasa", bemba: "Mpaasa" },
  { english: "mpaasa tree", bemba: "Mpaasa" },
  { english: "mpaasa trees", bemba: "Bampaasa" },

  { english: "unknown tree ciya", bemba: "Ciya" },
  { english: "ciya tree", bemba: "Ciya" },
  { english: "ciya trees", bemba: "Baciya" },

  { english: "Brachystegia longifolia", bemba: "Muombo" },
  { english: "Brachystegia longifolia tree", bemba: "Umuombo" },
  { english: "Brachystegia longifolia trees", bemba: "Imiombo" },

  { english: "Taxifolia Harws", bemba: "Ngalati" },
  { english: "Taxifolia tree", bemba: "Ngalati" },
  { english: "Taxifolia trees", bemba: "Ingalati" },

  { english: "Microphylla Harms", bemba: "Mushike" },
  { english: "Microphylla tree", bemba: "Mushike" },
  { english: "Microphylla trees", bemba: "Imishike" },

  { english: "Speciformis Benth", bemba: "Muputu" },
  { english: "Speciformis tree", bemba: "Umuputu" },
  { english: "Speciformis trees", bemba: "Imiputu" },

  // =========================================================
  // FRUIT TREES
  // =========================================================

  { english: "fruit trees", bemba: "Miti ya mbuto" },

  { english: "Mupundu", bemba: "Umupundu" },
  { english: "Mupundu tree", bemba: "Umupundu" },
  { english: "Mupundu trees", bemba: "Imipundu" },
    // =========================================================
  // SNAKES
  // =========================================================

  { english: "night adder", bemba: "Icilambanshila" },
  { english: "night adder plural", bemba: "Ifilambanshila" },

  { english: "spitting cobra", bemba: "Kafi" },
  { english: "spitting cobra plural", bemba: "Bakafi" },

  { english: "kanshimonamitenge", bemba: "Kanshimonamitenge" },
  { english: "kanshimonamitenge plural", bemba: "Tukanshimonamitenge" },

  { english: "boomslang", bemba: "Ibalabala" },
  { english: "boomslang plural", bemba: "Amabalabala" },

  { english: "puff adder", bemba: "Ifwafwa" },
  { english: "puff adder plural", bemba: "Amafwafwa" },

  { english: "twig snake", bemba: "Nalukunilumo" },
  { english: "twig snake plural", bemba: "Banalukunilumo" },

  { english: "blind snake", bemba: "Luminuminu" },
  { english: "blind snake plural", bemba: "Iminuminu" },

  { english: "python", bemba: "Lusato" },
  { english: "python plural", bemba: "Insato" },

  { english: "forest cobra", bemba: "Maamba" },
  { english: "forest cobra plural", bemba: "Imamba" },

  { english: "water cobra", bemba: "Maambalushi" },
  { english: "water cobra plural", bemba: "Imambalushi" },

  { english: "gaboon viper", bemba: "Mbooma" },
  { english: "gaboon viper plural", bemba: "Imbooma" },

  { english: "two headed snake", bemba: "Mbulushi" },
  { english: "two headed snake plural", bemba: "Imbulushi" },

  { english: "hissing sand snake", bemba: "Mulalu" },
  { english: "hissing sand snake plural", bemba: "Imilalu" },

  { english: "file snake", bemba: "Mwendalwali" },
  { english: "file snake plural", bemba: "Bamwendalwali" },

  { english: "egg eating snake", bemba: "Namutukuta" },
  { english: "egg eating snake plural", bemba: "Banamutukuta" },

  { english: "house snake", bemba: "Indele" },
  { english: "house snake plural", bemba: "Indele" },

  { english: "white lipped snake", bemba: "Indele" },
  { english: "white lipped snake plural", bemba: "Indele" },

  { english: "common cobra", bemba: "Ngoshe" },
  { english: "common cobra plural", bemba: "Bangoshe" },

  { english: "grey beaked snake", bemba: "Ntunkamatumba" },
  { english: "grey beaked snake plural", bemba: "Bantunkamatumba" },

  { english: "unknown snake", bemba: "Impini" },
  { english: "unknown snake plural", bemba: "Impini" },

  { english: "unknown snake 2", bemba: "Iyongolo" },
  { english: "unknown snake 2 plural", bemba: "Imiyongolo" },

  { english: "unknown snake 3", bemba: "Itiya" },
  { english: "unknown snake 3 plural", bemba: "Amatiya" },
    // =========================================================
  // BIRDS
  // =========================================================

  { english: "fish eagle", bemba: "Cembe" },
  { english: "fish eagle plural", bemba: "Ba cembe" },

  { english: "coracias", bemba: "Cikwekwe" },
  { english: "coracias plural", bemba: "Fikwekwe" },

  { english: "marabou stork", bemba: "Cipampa" },
  { english: "marabou stork plural", bemba: "Ba cipampa" },

  { english: "turtle dove", bemba: "Cipeele" },
  { english: "turtle dove plural", bemba: "Fipeele" },

  { english: "quail", bemba: "Cipingila" },
  { english: "quail plural", bemba: "Fipingila" },

  { english: "owl", bemba: "Cipululu" },
  { english: "owl plural", bemba: "Fipululu" },

  { english: "bateleur eagle", bemba: "Cipungu" },
  { english: "bateleur eagle plural", bemba: "Fipûngu" },

  { english: "weaver bird", bemba: "Cisokopela" },
  { english: "weaver bird plural", bemba: "Fisokopela" },

  { english: "wild duck", bemba: "Coso" },
  { english: "wild duck plural", bemba: "Ifyoso" },

  { english: "guinea fowl", bemba: "Ikanga" },
  { english: "guinea fowl plural", bemba: "Amakanga" },

  { english: "vulture", bemba: "Ikubi" },
  { english: "vulture plural", bemba: "Amakubi" },

  { english: "snipe", bemba: "Kakandamatipa" },
  { english: "snipe plural", bemba: "Utukandamatipa" },

  { english: "crowned plover", bemba: "Kakolenkole" },
  { english: "crowned plover plural", bemba: "Utukolenkole" },

  { english: "chanting go away bird", bemba: "Kakoshi" },
  { english: "chanting go away bird plural", bemba: "Utukoshi" },

  { english: "pale harrier", bemba: "Kakoshi ka nika" },
  { english: "pale harrier plural", bemba: "Utukoshi twa nika" },

  { english: "swallow", bemba: "Akamimbi" },
  { english: "swallow plural", bemba: "Utumimbi" },

  { english: "frankolin", bemba: "Akapeshi" },
  { english: "frankolin plural", bemba: "Utupeshi" },

  { english: "eagle", bemba: "Kapumpe" },
  { english: "eagle plural", bemba: "Ba kapumpe" },

  { english: "small dove", bemba: "Akatutwa" },
  { english: "small dove plural", bemba: "Utututwa" },

  { english: "wagtail", bemba: "Akatyetye" },
  { english: "wagtail plural", bemba: "Ututyetye" },

  { english: "go away bird", bemba: "Kuwe" },
  { english: "go away bird plural", bemba: "Bakuwe" },

  { english: "hornbill", bemba: "Ulukoma" },
  { english: "hornbill plural", bemba: "Inkoma" },

  { english: "hawk", bemba: "Ulukoshi" },
  { english: "hawk plural", bemba: "Ink oshi" },

  { english: "nightjar", bemba: "Ulumbasa" },
  { english: "nightjar plural", bemba: "Bambasa" },

  { english: "spurwing goose", bemba: "Imbata" },
  { english: "spurwing goose plural", bemba: "Imbata" },

  { english: "bee eater", bemba: "Milumbe" },
  { english: "bee eater plural", bemba: "Milumbe" },

  { english: "speckled coly", bemba: "Milumbelumbe" },
  { english: "speckled coly plural", bemba: "Milumbelumbe" },

  { english: "parrot", bemba: "Mucence" },
  { english: "parrot plural", bemba: "Bamucence" },

  { english: "pelican", bemba: "Mukanga" },
  { english: "pelican plural", bemba: "Bamukanga" },

  { english: "roller", bemba: "Mukufi" },
  { english: "roller plural", bemba: "Mikufi" },

  { english: "cougal", bemba: "Mukuta" },
  { english: "cougal plural", bemba: "Mikuta" },

  { english: "long tailed widow bird", bemba: "Muleya" },
  { english: "long tailed widow bird plural", bemba: "Ba muleya" },

  { english: "kingfisher", bemba: "Mulowa" },
  { english: "kingfisher plural", bemba: "Milowa" },

  { english: "drongo", bemba: "Mutengwe" },
  { english: "drongo plural", bemba: "Mitengwe" },

  { english: "ostrich", bemba: "Mwakatala" },
  { english: "ostrich plural", bemba: "Myakatala" },

  { english: "pied raven", bemba: "Mwankole" },
  { english: "pied raven plural", bemba: "Ba mwankole" },

  { english: "long legged koahaan", bemba: "Namungwa" },
  { english: "long legged koahaan plural", bemba: "Ba namungwa" },

  { english: "crested crane", bemba: "Ngoli" },
  { english: "crested crane plural", bemba: "Ngoli" },

  { english: "heron", bemba: "Nkooba" },
  { english: "heron plural", bemba: "Nkooba" },

  { english: "tickbird", bemba: "Nkooba" },
  { english: "tickbird plural", bemba: "Nkooba" },

  { english: "green pigeon", bemba: "Nkondonkondo" },
  { english: "green pigeon plural", bemba: "Nkondonkondo" },

  { english: "red necked frankolin", bemba: "Nkwale" },
  { english: "red necked frankolin plural", bemba: "Nkwale" },

  { english: "waxbill", bemba: "Nseba" },
  { english: "waxbill plural", bemba: "Nseba" },

  { english: "honey bird", bemba: "Nsolo" },
  { english: "honey bird plural", bemba: "Nsolo" },

  { english: "honey bird alternative", bemba: "Luuni" },
  { english: "honey bird alternative plural", bemba: "Nguuni" },

  { english: "falcon", bemba: "Pungwa" },
  { english: "falcon plural", bemba: "Ba pungwa" },

  { english: "sunbird", bemba: "Sosa" },
  { english: "sunbird plural", bemba: "Ba sosa" },

  { english: "small warbler", bemba: "Tiiti" },
  { english: "small warbler plural", bemba: "Ba tiiti" },

  { english: "woodpecker", bemba: "Tondwe" },
  { english: "woodpecker plural", bemba: "Tondwe" },
    // =========================================================
  // WILD ANIMALS
  // =========================================================

  { english: "elephant", bemba: "Nsofu" },
  { english: "elephant single tusk", bemba: "Chipembe" },
  { english: "elephant tuskless", bemba: "Tondo" },
  { english: "elephant male tusker", bemba: "Nkungulu" },
  { english: "elephant female", bemba: "Ninansofu" },

  { english: "rhinoceros", bemba: "Chipembere" },
  { english: "hippopotamus", bemba: "Mfubu" },
  { english: "buffalo", bemba: "Mboo" },
  { english: "sable", bemba: "Nkanshilie" },
  { english: "roan", bemba: "Mperembe" },
  { english: "waterbuck", bemba: "Chuswe" },
  { english: "puku", bemba: "Nseula" },
  { english: "puku alternative", bemba: "Mpolokoso" },
  { english: "mpala", bemba: "Mpala" },
  { english: "reedbuck", bemba: "Imfwi" },
  { english: "zebra", bemba: "Nkoloto" },
  { english: "zebra alternative", bemba: "Cholwa" },
  { english: "hartebeeste", bemba: "Nkonshi" },
  { english: "wildebeeste", bemba: "Nyumbu" },
  { english: "koodoo", bemba: "Ntandala" },
  { english: "oribi", bemba: "Nsele" },
  { english: "oribi alternative", bemba: "Kasele" },
  { english: "duiker", bemba: "Mpombo" },
  { english: "klipspringer", bemba: "Chibushimabwe" },
  { english: "sitatunga", bemba: "Nzobe" },
  { english: "tsessebe", bemba: "Ntengu" },

  { english: "crocodile", bemba: "Ng'andu" },
  { english: "lion", bemba: "Nkalamo" },
  { english: "leopard", bemba: "Mbwili" },
  { english: "hyena", bemba: "Chimbwi" },
  { english: "spotted hyena", bemba: "Chinseketa" },
  { english: "jackal", bemba: "Mumbwe" },
  { english: "hunting dog", bemba: "Mbulu" },
  { english: "eland", bemba: "Nsefu" },
  { english: "warthog", bemba: "Njiri" },
  { english: "bush pig", bemba: "Kapole" },
  { english: "porcupine", bemba: "Innungi" },
  { english: "serval cat", bemba: "Mbale" },
  { english: "Felis ocreata Mellandi", bemba: "Pati" },
  { english: "lemur Galago garnetti", bemba: "Changa" },
  { english: "small lemur", bemba: "Kawundi" },
  { english: "Felis caracal", bemba: "Lubwabwa" },
  { english: "civet", bemba: "Mfungo" },
  { english: "bushbuck", bemba: "Chisongo" },

  // =========================================================
  // GAME AND THE CHASE
  // =========================================================

  { english: "mongoose", bemba: "Lipule" },
  { english: "honey badger", bemba: "Chiuli" },
  { english: "ant bear", bemba: "Innengo" },
  { english: "hare", bemba: "Kalulu" },
  { english: "lechwe", bemba: "Inja" },
  { english: "Sharpe's steinbok", bemba: "Katiri" },
  { english: "small monkey", bemba: "Kolwe-ka-mpeng" },
  { english: "black monkey", bemba: "Sange" },
  { english: "baboon", bemba: "Kolwe-wa-mpiri" },
    // =========================================================
  // POLYTRANSLATOR — EXPANDED ENGLISH → BEMBA VOCABULARY
  // =========================================================

  // PRONOUNS & QUESTION WORDS
  { english: "I", bemba: "ine" },
  { english: "you", bemba: "iwe" },
  { english: "we", bemba: "ifwe" },
  { english: "they", bemba: "bena" },
  { english: "what", bemba: "cinshi" },
  { english: "where", bemba: "kwi" },
  { english: "when", bemba: "lilali" },
  { english: "who", bemba: "nani" },
  { english: "why", bemba: "mulandu nshi" },
  { english: "how", bemba: "shani" },

  // INFINITIVE VERBS
  { english: "to have", bemba: "ukuba na" },
  { english: "to do", bemba: "ukucita" },
  { english: "to go", bemba: "ukuya" },
  { english: "to come", bemba: "ukuisa" },
  { english: "to see", bemba: "ukumona" },
  { english: "to know", bemba: "ukwishiba" },
  { english: "to think", bemba: "ukutontonkanya" },
  { english: "to want", bemba: "ukufwaya" },
  { english: "to need", bemba: "ukufwaikwa" },
  { english: "to make", bemba: "ukupanga" },
  { english: "to take", bemba: "ukutola" },
  { english: "to give", bemba: "ukupela" },
  { english: "to say", bemba: "ukubula" },
  { english: "to tell", bemba: "ukweba" },
  { english: "to ask", bemba: "ukwipusha" },
  { english: "to find", bemba: "ukusanga" },
  { english: "to look", bemba: "ukulangisha" },
  { english: "to use", bemba: "ukubomfya" },
  { english: "to work", bemba: "ukubomba" },
  { english: "to eat", bemba: "ukulya" },
  { english: "to drink", bemba: "ukunwa" },
  { english: "to sleep", bemba: "ukulala" },
  { english: "to walk", bemba: "ukwenda" },
  { english: "to run", bemba: "ukubutuka" },
  { english: "to read", bemba: "ukubelenga" },
  { english: "to write", bemba: "ukulemba" },
  { english: "to speak", bemba: "ukulandapo" },
  { english: "to listen", bemba: "ukutika" },
  { english: "to hear", bemba: "ukumfwa" },
  { english: "to buy", bemba: "ukushita" },
  { english: "to sell", bemba: "ukushitisha" },
  { english: "to pay", bemba: "ukufuta" },
  { english: "to help", bemba: "ukwafwa" },
  { english: "to love", bemba: "ukukunda" },
  { english: "to live", bemba: "ukwikala" },
  { english: "to die", bemba: "ukufwa" },
  { english: "to learn", bemba: "ukusambilila" },
  { english: "to teach", bemba: "ukufundisha" },
  { english: "to open", bemba: "ukwisula" },
  { english: "to close", bemba: "ukufunga" },

  // PEOPLE & FAMILY
  { english: "person", bemba: "umuntu" },
  { english: "man", bemba: "umwaume" },
  { english: "woman", bemba: "umwanakashi" },
  { english: "child", bemba: "umwana" },
  { english: "boy", bemba: "umulumendo" },
  { english: "girl", bemba: "umukashana" },
  { english: "family", bemba: "ulupwa" },
  { english: "mother", bemba: "bamayo" },
  { english: "father", bemba: "batata" },
  { english: "friend", bemba: "umwine" },

  // PLACES
  { english: "house", bemba: "ing'anda" },
  { english: "home", bemba: "ku ng'anda" },
  { english: "city", bemba: "umusumba" },
  { english: "country", bemba: "icalo" },
  { english: "world", bemba: "isonde" },
  { english: "room", bemba: "chipinda" },

  // TIME
  { english: "time", bemba: "inshita" },
  { english: "week", bemba: "umulungu" },
  { english: "month", bemba: "umweshi" },
  { english: "year", bemba: "umwaka" },
  { english: "now", bemba: "nomba" },

  // NATURE
  { english: "sun", bemba: "akasuba" },
  { english: "moon", bemba: "umweshi" },
  { english: "star", bemba: "ulutanda" },
  { english: "sky", bemba: "muulu" },
  { english: "earth", bemba: "isonde" },
  { english: "fire", bemba: "umulilo" },
  { english: "rain", bemba: "imfula" },
  { english: "wind", bemba: "umwela" },
  { english: "tree", bemba: "umuti" },
  { english: "flower", bemba: "ululuba" },
  { english: "mountain", bemba: "ulupili" },
  { english: "river", bemba: "umumana" },

  // FOOD & DRINK
  { english: "food", bemba: "ifyakulya" },
  { english: "bread", bemba: "umukate" },
  { english: "rice", bemba: "umupunga" },
  { english: "meat", bemba: "inyama" },
  { english: "fish", bemba: "isabi" },
  { english: "egg", bemba: "ilinso" },
  { english: "milk", bemba: "amata" },
  { english: "fruit", bemba: "icisabo" },
  { english: "tea", bemba: "tii" },
  { english: "coffee", bemba: "kofi" },

  // BODY
  { english: "head", bemba: "umutwe" },
  { english: "eye", bemba: "ilinso" },
  { english: "ear", bemba: "ukutwi" },
  { english: "mouth", bemba: "akanwa" },
  { english: "nose", bemba: "impa" },
  { english: "hand", bemba: "ukuboko" },
  { english: "foot", bemba: "ukulu" },
  { english: "heart", bemba: "umutima" },

  // EVERYDAY NOUNS
  { english: "name", bemba: "ishina" },
  { english: "word", bemba: "icebo" },
  { english: "language", bemba: "ululimi" },
  { english: "money", bemba: "andalama" },
  { english: "music", bemba: "umuziki" },
  { english: "story", bemba: "lyashi" },
  { english: "way", bemba: "inshila" },
  { english: "thing", bemba: "icintu" },
  { english: "life", bemba: "ubuumi" },
  { english: "door", bemba: "umulyango" },
  { english: "table", bemba: "imeza" },
  { english: "chair", bemba: "intebe" },
  { english: "car", bemba: "imotoka" },

  // DESCRIPTIVE WORDS
  { english: "big", bemba: "ikalamba" },
  { english: "small", bemba: "inono" },
  { english: "new", bemba: "ipya" },
  { english: "old", bemba: "yakale" },
  { english: "long", bemba: "italamuka" },
  { english: "short", bemba: "ipipi" },
  { english: "high", bemba: "ukulepa" },
  { english: "low", bemba: "panshi" },
  { english: "hot", bemba: "uwapya" },
  { english: "cold", bemba: "uwatalala" },
  { english: "happy", bemba: "uwansansa" },
  { english: "sad", bemba: "uwalanda" },
  { english: "beautiful", bemba: "uwalola" },
  { english: "easy", bemba: "ukwelela" },
  { english: "hard", bemba: "ukukosa" },
  { english: "fast", bemba: "bwangu" },
  { english: "slow", bemba: "panono" },
  { english: "right", bemba: "icalungama" },
  { english: "wrong", bemba: "icalubana" },
  { english: "important", bemba: "cakosa" },
  { english: "true", bemba: "cacine" },
  { english: "full", bemba: "ukwisula" },
  { english: "empty", bemba: "ubula kantu" },
  { english: "young", bemba: "mukankalala" },
  { english: "strong", bemba: "wakosa" },
  { english: "weak", bemba: "wanaka" },

  // COLORS
  { english: "red", bemba: "ukutuba" },
  { english: "green", bemba: "akatuntulu" },
  { english: "black", bemba: "umufita" },
  { english: "white", bemba: "umupela" },

  // CONNECTORS & PREPOSITIONS
  { english: "or", bemba: "nangu" },
  { english: "but", bemba: "lelo" },
  { english: "if", bemba: "nga" },
  { english: "because", bemba: "pantu" },
  { english: "without", bemba: "ukwabula" },
  { english: "for", bemba: "pa" },
  { english: "from", bemba: "ukufuma" },
  { english: "to", bemba: "ku" },
    // =========================================================
  // ADDITIONAL BEMBA VOCABULARY — PLAIN & PRENASALIZED
  // =========================================================

  // PLAIN
  { english: "go through", bemba: "pùlá" },
  { english: "make an offering", bemba: "tú:!lá" },
  { english: "build", bemba: "kù:lá" },
  { english: "undress", bemba: "fú:!lá" },
  { english: "ignore", bemba: "sú:!lá" },
  { english: "uproot", bemba: "ʃù:lá" },
  { english: "suffer", bemba: "t͡ʃú:!lá" },
  { english: "take", bemba: "βú:!lá" },
  { english: "praise", bemba: "lù:lá" },
  { english: "honour", bemba: "lù:lá" },
  { english: "to fall", bemba: "ùkúwá" },
  { english: "these", bemba: "àjá" },
  { english: "river", bemba: "ùmúmáná" },
  { english: "back", bemba: "ìnùmá" },
  { english: "pull", bemba: "ɲù:nsá" },
  { english: "stretch", bemba: "ɲù:nsá" },
  { english: "drum", bemba: "íŋòmá" },

  // PRENASALIZED
  { english: "be stupid", bemba: "tú:!mpá" },
  { english: "shake", bemba: "tè:ntá" },
  { english: "push", bemba: "tù:ŋká" },
  { english: "rain", bemba: "í:mfúlà" },
  { english: "hunger", bemba: "ì:nsálá" },
  { english: "be difficult", bemba: "á:!nʃá" },
  { english: "work", bemba: "í:nt͡ʃítò" },
  { english: "write", bemba: "lé:!mbá" },
  { english: "take", bemba: "sè:ndá" },
  { english: "draw", bemba: "lè:ŋgá" },
  { english: "warthog", bemba: "í:nd͡ʒìlí" },
];
