// src/data/bembaDictionary.ts

export type BembaDictionaryEntry = {
  english: string;
  bemba: string;
};

/**
 * BembaTranslate offline dictionary.
 *
 * English -> Bemba
 *
 * Offline only:
 * - No API
 * - No internet
 * - No cloud service
 * - No external model
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
  // NUMBERS
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
  // ADJECTIVES
  // =========================================================

  { english: "new", bemba: "nomba" },
  { english: "big", bemba: "kikalamba" },
  { english: "small", bemba: "kanono" },
  { english: "many", bemba: "ingi" },
  { english: "few", bemba: "fiinini" },
  { english: "bad", bemba: "biipi" },
  { english: "beautiful", bemba: "wasekesha" },

  // =========================================================
  // CONJUNCTIONS
  // =========================================================

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
  { english: "give", bemba: "pa" },
  { english: "take", bemba: "tola" },
  { english: "make", bemba: "cita" },
  { english: "do", bemba: "cita" },
  { english: "work", bemba: "bomba" },
  { english: "help verb", bemba: "fwafwilisha" },
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

  { english: "I", bemba: "ine" },
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
  // GRAMMAR
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
  { english: "work noun", bemba: "incito" },
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
  { english: "which", bemba: "ci" },
  { english: "whose", bemba: "wa nani" },
  { english: "how much", bemba: "shing'anga" },
  { english: "how many", bemba: "shinga" },

  // =========================================================
  // ANIMALS
  // =========================================================

  { english: "animal", bemba: "inyama" },
  { english: "dog", bemba: "imbwa" },
  { english: "cat", bemba: "pusi" },
  { english: "cow", bemba: "inkombe" },
  { english: "goat", bemba: "imbushi" },
  { english: "sheep", bemba: "mpanga" },
  { english: "pig", bemba: "nguluwe" },
  { english: "chicken", bemba: "inkoko" },
  { english: "rooster", bemba: "inkoko ya mwaume" },
  { english: "hen", bemba: "inkoko ya mukashana" },
  { english: "duck", bemba: "ipapashi" },
  { english: "fish", bemba: "isabi" },
  { english: "bird", bemba: "akakonko" },
  { english: "snake", bemba: "umusoka" },
  { english: "lion", bemba: "intangalala" },
  { english: "leopard", bemba: "inkalamo" },
  { english: "elephant", bemba: "nsofu" },
  { english: "elephant single tusk", bemba: "chipembe" },
  { english: "elephant tuskless", bemba: "tondo" },
  { english: "elephant male tusker", bemba: "nkungulu" },
  { english: "elephant female", bemba: "ninansofu" },
  { english: "rhinoceros", bemba: "chipembere" },
  { english: "hippopotamus", bemba: "mfubu" },
  { english: "buffalo", bemba: "mboo" },
  { english: "sable", bemba: "nkanshilie" },
  { english: "roan", bemba: "mperembe" },
  { english: "waterbuck", bemba: "chuswe" },
  { english: "puku", bemba: "puku" },
  { english: "zebra", bemba: "mpundwe" },
  { english: "giraffe", bemba: "insala" },
  { english: "monkey", bemba: "nkoko" },
  { english: "baboon", bemba: "mbeba" },
  { english: "rabbit", bemba: "kalulu" },
  { english: "rat", bemba: "kanseshe" },
  { english: "mouse", bemba: "kanseshe" },
  { english: "frog", bemba: "ikolwe" },
  { english: "tortoise", bemba: "nkamba" },
  { english: "crocodile", bemba: "ng'andu" },

  // =========================================================
  // FOOD
  // =========================================================

  { english: "meal", bemba: "ifyakulya" },
  { english: "food", bemba: "ifyakulya" },
  { english: "water", bemba: "amenshi" },
  { english: "maize", bemba: "amabele" },
  { english: "maize meal", bemba: "ubunga" },
  { english: "meal nshima", bemba: "ubunga" },
  { english: "nshima", bemba: "ubunga" },
  { english: "beans", bemba: "ifisashi" },
  { english: "vegetables", bemba: "imifitshi" },
  { english: "meat", bemba: "inyama" },
  { english: "fish", bemba: "isabi" },
  { english: "salt", bemba: "umunyu" },
  { english: "sugar", bemba: "isukali" },
  { english: "milk", bemba: "amenshi ya mabala" },
  { english: "egg", bemba: "ilifyalilo" },
  { english: "fruit", bemba: "ifisabo" },
  { english: "banana", bemba: "icimbe" },
  { english: "orange", bemba: "icungwa" },
  { english: "lemon", bemba: "icungwa cimpundu" },

  // =========================================================
  // BODY
  // =========================================================

  { english: "body", bemba: "umubili" },
  { english: "head", bemba: "umutwe" },
  { english: "hair", bemba: "imisisi" },
  { english: "eye", bemba: "isho" },
  { english: "eyes", bemba: "amenso" },
  { english: "ear", bemba: "ukutwi" },
  { english: "ears", bemba: "amatu" },
  { english: "nose", bemba: "impuno" },
  { english: "mouth", bemba: "akanwa" },
  { english: "tooth", bemba: "ilino" },
  { english: "teeth", bemba: "ameno" },
  { english: "tongue", bemba: "ululimi" },
  { english: "neck", bemba: "umukoshi" },
  { english: "hand", bemba: "ukuboko" },
  { english: "hands", bemba: "amaboko" },
  { english: "finger", bemba: "akanyele" },
  { english: "leg", bemba: "ukuse" },
  { english: "foot", bemba: "ukutula" },
  { english: "heart", bemba: "umutima" },
  { english: "blood", bemba: "umulopa" },

  // =========================================================
  // CLOTHING
  // =========================================================

  { english: "clothes", bemba: "impamba" },
  { english: "shirt", bemba: "icampampa" },
  { english: "trousers", bemba: "amapantalo" },
  { english: "shoes", bemba: "ink
