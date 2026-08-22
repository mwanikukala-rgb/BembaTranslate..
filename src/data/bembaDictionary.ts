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
];
