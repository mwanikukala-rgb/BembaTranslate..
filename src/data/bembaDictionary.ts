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
    // =========================================================
  // INSULTS & OFFENSIVE EXPRESSIONS
  // =========================================================

  { english: "you dog", bemba: "We mbwawe" },
  { english: "you are a dog", bemba: "Uli mbwa" },
  { english: "you are dogs", bemba: "Muli mbwa" },
  { english: "you son or daughter of a dog", bemba: "We mwana wa mbwawe" },
  { english: "he or she is a dog", bemba: "Ni mbwa" },
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
  { english: "he or she is a mad person", bemba: "Lishilu" },
  { english: "they are mad people", bemba: "Mashilu" },
  { english: "he or she is mad", bemba: "Alipena" },
  { english: "they are mad formal", bemba: "Balipena" },
  { english: "they went mad", bemba: "Baâlipena" },
  { english: "he or she went mad", bemba: "Âalipena" },
  { english: "he or she is mad informal", bemba: "Chalipena" },
  { english: "they are mad", bemba: "balipena" },
  { english: "they are mad informal", bemba: "Fyalipena" },
  { english: "he or she is mad informal alternative", bemba: "Kalipen" },
  { english: "he or she has gone mad", bemba: "Napena" },

  { english: "dick", bemba: "Chikala" },
  { english: "you dick", bemba: "Chikala chobe" },
  { english: "your father's dick", bemba: "Chikala cha wiso" },

  { english: "pussy", bemba: "Ichinyo" },
  { english: "your pussy", bemba: "Chinyo chobe" },
  { english: "your mother's pussy", bemba: "Noko ichinyo" },
  { english: "your mother's pussy alternative", bemba: "Chinyo cha noko" },

  { english: "fuck", bemba: "Tomba" },
  { english: "fuck your mother", bemba: "Tomba noko" },

  { english: "testicle", bemba: "Itole" },
  { english: "your testicle", bemba: "Wabe tole" },

  { english: "very offensive insult for someone's mother", bemba: "Stanyoko" },
  { english: "very offensive insult for someone's mother alternative", bemba: "Satanyono" },
  { english: "very offensive insult for someone's mother alternative 2", bemba: "Sulunyoko" },
  { english: "very offensive insult for someone's mother alternative 3", bemba: "Gungunyoko" },

  { english: "anus", bemba: "Mukongo" },
  { english: "your mother's anus", bemba: "Mukongo wa noko" },
  { english: "your father's anus", bemba: "Mukongo wa wiso" },

  { english: "your anus", bemba: "Munyelo obe" },

  { english: "pussy lips", bemba: "Malepe" },
  { english: "your mother's pussy lips", bemba: "malepe ya noko" },
  { english: "your mother's pussy lips alternative", bemba: "noko amalepe" },

  { english: "shit", bemba: "Mafi" },
  { english: "your shit", bemba: "Mafi yobe" },
  { english: "his or her shit", bemba: "Mafi yakhe" },
  { english: "their shit", bemba: "Mafi yabo" },

  { english: "rubbish", bemba: "Ata!" },
  { english: "rubbish alternative", bemba: "Atase!" },

  { english: "clitoris", bemba: "Nini" },
  { english: "your mother's clitoris", bemba: "Nini ya noko" },
  { english: "your clitoris", bemba: "Nini yobe" },
  { english: "their clitoris", bemba: "Nini yabo" },
  { english: "their clitoris alternative", bemba: "Nini shabo" },

  { english: "pubic hair", bemba: "Amaso" },
  { english: "your pubic hair", bemba: "Maso yobe" },
  { english: "your pubic hair alternative", bemba: "Waba amaso" },
  { english: "your mother's pubic hair", bemba: "Maso ya noko" },
  { english: "your mother's pubic hair alternative", bemba: "Noko amaso" },
    // =========================================================
  // PREFIXES & PREPOSITIONS
  // =========================================================

  { english: "single noun class Mu prefix", bemba: "U-" },
  { english: "plural noun class Ba prefix", bemba: "A-" },
  { english: "Mu class preposition", bemba: "Wa" },
  { english: "Ba class preposition", bemba: "Ba" },

  { english: "single noun class U prefix", bemba: "U-" },
  { english: "plural noun class Mi prefix", bemba: "I-" },
  { english: "Mi class preposition", bemba: "Ya" },

  { english: "single noun class N or M prefix", bemba: "I-" },
  { english: "N or M class plural verbal prefix", bemba: "Shi-" },
  { english: "N or M class preposition", bemba: "Ya" },
  { english: "N or M plural preposition", bemba: "Sha" },

  { english: "single noun class Lu prefix", bemba: "U-" },
  { english: "Lu class verbal prefix", bemba: "Lu-" },
  { english: "Lu class preposition", bemba: "Lwa" },

  { english: "single noun class Ci prefix", bemba: "I-" },
  { english: "Ci class verbal prefix", bemba: "Ci-" },
  { english: "Ci class preposition", bemba: "Ca" },
  { english: "plural noun class Fi prefix", bemba: "I-" },
  { english: "Fi class verbal prefix", bemba: "Fi-" },
  { english: "Fi class preposition", bemba: "Fya" },

  { english: "single noun class I prefix", bemba: "I-" },
  { english: "I class verbal prefix", bemba: "Li-" },
  { english: "I class preposition", bemba: "Lya" },
  { english: "plural noun class Ma prefix", bemba: "A-" },
  { english: "Ma class verbal prefix", bemba: "Ya-" },
  { english: "Ma class preposition", bemba: "Ya" },

  { english: "single noun class Ku prefix", bemba: "U-" },
  { english: "Ku class verbal prefix", bemba: "Ku-" },
  { english: "Ku class preposition", bemba: "Kwa" },

  { english: "single noun class Bu prefix", bemba: "U-" },
  { english: "Bu class verbal prefix", bemba: "Bu-" },
  { english: "Bu class preposition", bemba: "Bwa" },

  { english: "single noun class Ka prefix", bemba: "A-" },
  { english: "Ka class verbal prefix", bemba: "Ka-" },
  { english: "Ka class preposition", bemba: "Ka" },
  { english: "plural noun class Tu prefix", bemba: "U-" },
  { english: "Tu class verbal prefix", bemba: "Tu-" },
  { english: "Tu class preposition", bemba: "Twa" },

  { english: "single noun class Mu verbal prefix", bemba: "Mu-" },
  { english: "Mu class preposition", bemba: "Mwa" },

  { english: "single noun class Pa prefix", bemba: "Pa-" },
  { english: "Pa class verbal prefix", bemba: "Pa-" },
  { english: "Pa class preposition", bemba: "Pa" },

  // =========================================================
  // BEMBA GRAMMAR TERMS
  // =========================================================

  { english: "nominal prefix", bemba: "prefix of the noun" },
  { english: "verbal prefix", bemba: "prefix of the verb" },
  { english: "concord", bemba: "harmony between prefixes in a sentence" },
  { english: "concord prefixes", bemba: "prefixes of words requiring concord with the noun" },
  { english: "class concord", bemba: "concord between noun and other words in a sentence" },
  { english: "the L is dropped in most words of this class", bemba: "the concord remains li" },
    // =========================================================
  // BEMBA VOWELS & PRONUNCIATION
  // =========================================================

  { english: "Bemba vowels", bemba: "Aa, Ee, Ii, Oo, Uu" },

  { english: "Bemba vowel A pronunciation", bemba: "A as in father" },
  { english: "Bemba vowel E pronunciation", bemba: "E as in egg or elephant" },
  { english: "Bemba vowel I pronunciation", bemba: "I as the E sound in English, eat, or east" },
  { english: "Bemba vowel O pronunciation", bemba: "O as in orange" },
  { english: "Bemba vowel U pronunciation", bemba: "U as the double OO sound in fool, foot, boot, or food" },

  { english: "A vowel sound", bemba: "A as in father" },
  { english: "E vowel sound", bemba: "E as in egg" },
  { english: "I vowel sound", bemba: "E sound as in English" },
  { english: "O vowel sound", bemba: "O as in orange" },
  { english: "U vowel sound", bemba: "OO sound as in food" },
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

  { english: "esophagus", bemba: "Ichikolomino" },
  { english: "esophaguses", bemba: "Ifikolomino" },

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
  { english: "fist alternative", bemba: "ulukonya" },
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

  { english: "liver", bemba: "Pwapwa" },
  { english: "livers", bemba: "Ba pwapa" },

  { english: "blood", bemba: "Umulopa" },

  { english: "hormone", bemba: "Insandesande" },
  { english: "hormones", bemba: "Insandesande" },

  { english: "brain", bemba: "Bongobongo" },
  { english: "brains", bemba: "Ba bongobongo" },

  { english: "bald", bemba: "Ipala" },
  { english: "bald heads", bemba: "Amapala" },

  { english: "artery", bemba: "Umushipa" },
  { english: "arteries", bemba: "Imishipa" },

  { english: "vein", bemba: "Umushipa" },
  { english: "veins", bemba: "Imishipa" },

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
  { english: "penises informal", bemba: "Ifikala" },

  { english: "crotch", bemba: "Ichinena" },
  { english: "crotches", bemba: "Ifinena" },

  { english: "knee", bemba: "Ikufi" },
  { english: "knees", bemba: "Amakufi" },

  { english: "waist", bemba: "Umusana" },
  { english: "waists", bemba: "Imisana" },

  { english: "wrist", bemba: "Inkolokoso" },

  { english: "forehead", bemba: "Impumi" },
    // =========================================================
  // ADJECTIVES
  // =========================================================

  // Adjective examples

  { english: "a green house", bemba: "Inganda ya katapakatapa" },
  { english: "a tall building", bemba: "Ichikuulwa ichitali" },
  { english: "a very old man", bemba: "Umwaume umukote saana" },
  { english: "the old red house", bemba: "Inganda ya kale iyakashika" },
  { english: "a very nice friend", bemba: "Chibusa umusuma saana" },

  // =========================================================
  // COLORS
  // =========================================================

  { english: "colors", bemba: "Amalangi" },
  { english: "black", bemba: "-fiita" },
  { english: "brown", bemba: "-kashikila" },
  { english: "red", bemba: "-kashika" },
  { english: "white", bemba: "-buuta" },
  { english: "blue", bemba: "blue" },
  { english: "grey", bemba: "grey" },
  { english: "purple", bemba: "Pepo" },
  { english: "orange", bemba: "olenji" },
  { english: "yellow", bemba: "umutuntulwa" },

  // =========================================================
  // SIZES
  // =========================================================

  { english: "sizes", bemba: "Ubukulu" },
  { english: "big", bemba: "-kulu" },
  { english: "small", bemba: "-nono" },
  { english: "small alternative", bemba: "-cepa" },
  { english: "long", bemba: "-leepa" },
  { english: "tall", bemba: "-leepa" },
  { english: "short", bemba: "-ipipa" },
  { english: "narrow", bemba: "-ipipa" },
  { english: "deep", bemba: "-shika" },

  // =========================================================
  // FOOD TASTE
  // =========================================================

  { english: "food taste", bemba: "-sonda" },
  { english: "taste", bemba: "-sonda" },
  { english: "sweet", bemba: "-lowa" },
  { english: "sour like lemon", bemba: "-sasamina" },
  { english: "bitter", bemba: "-lula" },
    // =========================================================
  // VERB "TO BE" - SECOND FORM [NI-] & [TE]
  // =========================================================

  { english: "it's me", bemba: "Nine" },
  { english: "I am the teacher", bemba: "Nine Kafundisha" },
  { english: "I am Mary", bemba: "Nine Mary" },
  { english: "it's us", bemba: "Nifwe" },
  { english: "we are the teachers", bemba: "Nifwe Bakafundisha" },
  { english: "it's you", bemba: "Nimwe" },
  { english: "you are John", bemba: "Nimwe ba John" },
  { english: "it's not me", bemba: "Te ine" },
  { english: "I am not Expeditor", bemba: "Te ine Expeditor" },
  { english: "it's not him or her", bemba: "Te aba" },
  { english: "it's Catherine", bemba: "Ni ba Catherine" },
  { english: "she is Catherine", bemba: "Ni ba Catherine" },
  { english: "is it you", bemba: "Bushe nimwe?" },
  { english: "are you George", bemba: "Bushe nimwe ba George?" },
  { english: "who are you", bemba: "Nimwe Banani?" },

  // =========================================================
  // VERB "TO BE" [-LI] - SIMPLE PAST
  // =========================================================

  { english: "I was", bemba: "Nali" },
  { english: "you were", bemba: "Mwali" },
  { english: "he or she was", bemba: "Baali" },
  { english: "they were", bemba: "Baali" },
  { english: "we were", bemba: "Twali" },

  { english: "I was in Kabwe", bemba: "Nali ku Kabwe" },
  { english: "you were at home", bemba: "Mwali ku ng'anda" },
  { english: "he or she was fine", bemba: "Baali bwino" },
  { english: "we were in America", bemba: "Twali ku Amelika" },
  { english: "you were in the Insaka", bemba: "Mwali mu nsaka" },
  { english: "they were in Kitwe", bemba: "Baali mu Kitwe" },

  { english: "my father is in the house", bemba: "Bataata bali mu ng'anda" },
  { english: "my father was in the house yesterday", bemba: "Bataata baali mu ng'anda mailo" },

  // =========================================================
  // VERB "TO BE" [UKUBA] - FUTURE TENSE
  // =========================================================

  { english: "I will be", bemba: "Nkaba" },
    // =========================================================
  // COMMON VERBS
  // =========================================================

  { english: "to know", bemba: "Ukwishiba" },
  { english: "to sit", bemba: "Ukwikala" },
  { english: "to stay", bemba: "Ukwikala" },
  { english: "to live", bemba: "Ukwikala" },
  { english: "to show", bemba: "Ukulanga" },
  { english: "to call", bemba: "Ukwita" },
  { english: "to marry for a man", bemba: "Ukuupa" },
  { english: "to be married for a woman", bemba: "Ukuupwa" },

  // =========================================================
  // ORDINAL NUMBERS
  // =========================================================

  { english: "first", bemba: "Bumo" },
  { english: "second", bemba: "Bubili" },
  { english: "third", bemba: "Butatu" },
  { english: "fourth", bemba: "Bune" },
  { english: "fifth", bemba: "Busano" },
  { english: "sixth", bemba: "Mutanda" },
  { english: "seventh", bemba: "Cine lubali" },
  { english: "eighth", bemba: "Cine konsekonse" },
  { english: "ninth", bemba: "Pabula" },
  { english: "tenth", bemba: "Ikumi" },

  // =========================================================
  // QUAZI NUMBERS
  // =========================================================

  { english: "I alone", bemba: "Neka" },
  { english: "you alone", bemba: "Mweeka" },
  { english: "he or she alone", bemba: "Beeka" },
  { english: "they alone", bemba: "Beeka" },
  { english: "we alone", bemba: "Fweeka" },
  { english: "last", bemba: "Kulekelesha" },

  // =========================================================
  // NOUNS
  // =========================================================

  { english: "father", bemba: "Bataata" },
  { english: "mother", bemba: "Bamaayo" },
  { english: "uncle", bemba: "Bayama" },
  { english: "brother", bemba: "Ndume" },
  { english: "sister", bemba: "Nkashi" },
  { english: "boy", bemba: "Umulumendo" },
  { english: "girl", bemba: "Umukashana" },
  { english: "doctor", bemba: "Bashing'anga" },
  { english: "grandfather", bemba: "Bashikulu" },
  { english: "grandmother", bemba: "Bamaama" },
  { english: "chief", bemba: "Imfumu" },
  { english: "cook", bemba: "Kapika" },
  { english: "cook alternative", bemba: "Kuki" },
  { english: "man", bemba: "Umwaume" },
  { english: "male", bemba: "Umwaume" },
  { english: "woman", bemba: "Umwanakashi" },
  { english: "female", bemba: "Umwanakashi" },
  { english: "person", bemba: "Umuntu" },
  { english: "wife", bemba: "Umukashi" },
  { english: "husband", bemba: "Umulume" },
  { english: "aunt", bemba: "Bamayo senge" },
  { english: "last born", bemba: "Kasuli" },
  { english: "first born", bemba: "Ibeli" },
  { english: "twins", bemba: "Bampundu" },
  { english: "born after twins", bemba: "Chola" },
  { english: "parents", bemba: "Abafyashi" },

  // =========================================================
  // OTHER COMMON WORDS
  // =========================================================

  { english: "all", bemba: "Fyonse" },
  { english: "all people", bemba: "Bonse" },
  { english: "everywhere", bemba: "Konse" },
  { english: "or", bemba: "Limbi" },
  { english: "maybe", bemba: "Limbi" },
  { english: "another time", bemba: "Limbi" },
  { english: "but", bemba: "Nomba" },
  { english: "now", bemba: "Nomba" },
  { english: "also", bemba: "Elyo" },
  { english: "then", bemba: "Elyo" },
  { english: "again", bemba: "Nakabili" },
  { english: "and", bemba: "Na" },

  // =========================================================
  // USEFUL FAMILY EXPRESSIONS
  // =========================================================

  { english: "my family", bemba: "Ulupwa lwandi" },
  { english: "your family", bemba: "Ulupwa lwenu" },
  { english: "his or her family", bemba: "Ulupwa lwabo" },
  { english: "their family", bemba: "Ulupwa lwabo" },
  { english: "our family", bemba: "Ulupwa lweru" },

  { english: "in my home", bemba: "Mu mwandi" },
  { english: "in your home", bemba: "Mu mwenu" },
    // =========================================================
  // HOME / FAMILY EXPRESSIONS
  // =========================================================

  { english: "in their home", bemba: "Mu mwabo" },
  { english: "in our home", bemba: "Mu mwesu" },
  { english: "at my house", bemba: "Pa mwandi" },
  { english: "at my home", bemba: "Pa mwandi" },

  // =========================================================
  // "TO HAVE" - COMMON EXPRESSIONS
  // =========================================================

  { english: "I don't have", bemba: "Nshakwata" },
  { english: "I don't have now", bemba: "Nshikwete" },
  { english: "I am not married male", bemba: "Nshaupa" },
  { english: "I am not married female", bemba: "Nshaupwa" },

  // =========================================================
  // VERB "TO BE" [-LI] - PRESENT TENSE
  // =========================================================

  // Affirmative

  { english: "I am in Kitwe", bemba: "Ine ndi mu Kitwe" },
  { english: "you are in Lusaka", bemba: "Imwe muli ku Lusaka" },
  { english: "they are in Zambia", bemba: "Aba bali mu Zambia" },
  { english: "we are in the Insaka", bemba: "Ifwe tuli mu nsaka" },

  // Negative

  { english: "I am not in Ndola", bemba: "Ine nshili mu Ndola" },
  { english: "you are not in Kitwe", bemba: "Imwe tamuli mu Kitwe" },
  { english: "they are not in Zambia", bemba: "Aba tabali mu Zambia" },
  { english: "we are not in the classroom", bemba: "Ifwe tatuli mu kalasi" },

  // =========================================================
  // VERB "TO HAVE" [UKUKWATA] - PRESENT / TEMPORARY POSSESSION
  // =========================================================

  { english: "I have now", bemba: "Nimkwata" },
  { english: "you have now", bemba: "Namukwata" },
  { english: "he or she has now", bemba: "Nabakwata" },
  { english: "they have now", bemba: "Nabakwata" },
  { english: "we have now", bemba: "Natukwata" },

  // Negative

  { english: "I don't have now", bemba: "Nshikwete" },
  { english: "you don't have now", bemba: "Tamukwete" },
  { english: "he or she doesn't have now", bemba: "Tabakwete" },
  { english: "they don't have now", bemba: "Tabakwete" },
  { english: "we don't have now", bemba: "Tatukwete" },
    // =========================================================
  // HOME / FAMILY EXPRESSIONS
  // =========================================================

  { english: "in their home", bemba: "Mu mwabo" },
  { english: "in our home", bemba: "Mu mwesu" },
  { english: "at my house", bemba: "Pa mwandi" },
  { english: "at my home", bemba: "Pa mwandi" },

  // =========================================================
  // "TO HAVE" - COMMON EXPRESSIONS
  // =========================================================

  { english: "I don't have", bemba: "Nshakwata" },
  { english: "I don't have now", bemba: "Nshikwete" },
  { english: "I am not married male", bemba: "Nshaupa" },
  { english: "I am not married female", bemba: "Nshaupwa" },

  // =========================================================
  // VERB "TO BE" [-LI] - PRESENT TENSE
  // =========================================================

  // Affirmative

  { english: "I am in Kitwe", bemba: "Ine ndi mu Kitwe" },
  { english: "you are in Lusaka", bemba: "Imwe muli ku Lusaka" },
  { english: "they are in Zambia", bemba: "Aba bali mu Zambia" },
  { english: "we are in the Insaka", bemba: "Ifwe tuli mu nsaka" },

  // Negative

  { english: "I am not in Ndola", bemba: "Ine nshili mu Ndola" },
  { english: "you are not in Kitwe", bemba: "Imwe tamuli mu Kitwe" },
  { english: "they are not in Zambia", bemba: "Aba tabali mu Zambia" },
  { english: "we are not in the classroom", bemba: "Ifwe tatuli mu kalasi" },

  // =========================================================
  // VERB "TO HAVE" [UKUKWATA] - PRESENT / TEMPORARY POSSESSION
  // =========================================================

  { english: "I have now", bemba: "Nimkwata" },
  { english: "you have now", bemba: "Namukwata" },
  { english: "he or she has now", bemba: "Nabakwata" },
  { english: "they have now", bemba: "Nabakwata" },
  { english: "we have now", bemba: "Natukwata" },

  // Negative

  { english: "I don't have now", bemba: "Nshikwete" },
  { english: "you don't have now", bemba: "Tamukwete" },
  { english: "he or she doesn't have now", bemba: "Tabakwete" },
  { english: "they don't have now", bemba: "Tabakwete" },
  { english: "we don't have now", bemba: "Tatukwete" },
    // =========================================================
  // VERB "TO HAVE" [UKUKWATA] - PRESENT
  // PERMANENT POSSESSION
  // =========================================================

  // Affirmative

  { english: "we have two children", bemba: "Twakwata abaana babili" },
  { english: "you have three children", bemba: "Mwakwata abaana batatu" },
  { english: "they have four children", bemba: "Bakwata abaana bane" },
  { english: "I have two children", bemba: "Nakwata abaana babili" },

  // Negative

  { english: "we don't have two children", bemba: "Tatwakwata abaana babili" },
  { english: "you don't have three children", bemba: "Tamwakwata abaana batatu" },
  { english: "they don't have four children", bemba: "Tabakwata abaana bane" },

  { english: "we don't have four children", bemba: "Tatwakwata abaana bane" },
  { english: "you don't have two children", bemba: "Tamwakwata abaana babili" },
  { english: "they don't have two children", bemba: "Tabakwata abaana babili" },

  // =========================================================
  // VERB "TO HAVE" [UKUKWATA] - SIMPLE PAST
  // =========================================================

  // Affirmative

  { english: "I had", bemba: "Nakwete" },
  { english: "we had", bemba: "Twakwete" },
  { english: "you had", bemba: "Mwakwete" },
  { english: "they had", bemba: "Bakwete" },

  // Negative

  { english: "I didn't have", bemba: "Nshakwete" },
  { english: "we didn't have", bemba: "Tatwakwete" },
  { english: "you didn't have", bemba: "Tamwakwete" },
  { english: "they didn't have", bemba: "Tabakwete" },

  // =========================================================
  // "TO HAVE" - PRESENT / TEMPORARY POSSESSION EXAMPLES
  // =========================================================

  { english: "they have sisters now", bemba: "Nabakwata bankashi" },
  { english: "you have children now", bemba: "Namukwata abaana" },
  { english: "they have children now", bemba: "Nabakwata abaana" },

  // Negative

  { english: "we don't have brothers now", bemba: "Tatukwete bandume" },
  { english: "you don't have uncles now", bemba: "Tamukwete bayama" },
  { english: "they don't have sisters now", bemba: "Tabakwete abeepwa" },
    // =========================================================
  // "TO HAVE" [UKUKWATA] - PRESENT EXAMPLES
  // =========================================================

  { english: "they have children", bemba: "Bakwata abaana" },
  { english: "they don't have nephews or nieces", bemba: "Tabakwata abeshikulu" },
  { english: "we have children now", bemba: "Natukwata abaana" },
  { english: "we don't have grandchildren now", bemba: "Tatukwete abeshikulu" },

  // =========================================================
  // "TO HAVE" [UKUKWATA] - SIMPLE FUTURE
  // =========================================================

  { english: "I will have", bemba: "Nkakwata" },
  { english: "we will have", bemba: "Tukakwata" },
  { english: "you will have", bemba: "Mukakwata" },
  { english: "they will have", bemba: "Bakakwata" },

  { english: "I won't have", bemba: "Nshakakwate" },
  { english: "we won't have", bemba: "Tatwakakwate" },
  { english: "you won't have", bemba: "Tamwakakwate" },
  { english: "they won't have", bemba: "Tabakakwate" },

  // =========================================================
  // POSSESSIVE ADJECTIVES
  // =========================================================

  { english: "my or mine", bemba: "-andi" },
  { english: "your or yours informal", bemba: "-obe" },
  { english: "his or her informal", bemba: "-akwe" },
  { english: "our or ours", bemba: "-esu" },
  { english: "your or yours formal or plural", bemba: "-enu" },
  { english: "his, hers or theirs", bemba: "-abo" },

  // =========================================================
  // POSSESSIVE ADJECTIVE EXAMPLES
  // =========================================================

  { english: "my child", bemba: "Umwaana wandi" },
  { english: "your sister informal", bemba: "Nkashi yobe" },
  { english: "your brother informal", bemba: "Ndume yobe" },
  { english: "your children informal", bemba: "Abaana bobe" },
  { english: "your sister formal or plural", bemba: "Nkashi yenu" },
  { english: "his or her brother informal", bemba: "Ndume yakhe" },
  { english: "his or her brothers", bemba: "Ba Ndume yakhe" },

  // =========================================================
  // LOCATIVES
  // =========================================================

  { english: "in", bemba: "Mu" },
  { english: "to", bemba: "Ku" },
  { english: "at or on", bemba: "Pa" },
  { english: "in John's", bemba: "Mwa John" },
  { english: "at or to Musa's", bemba: "Kwa Musa" },
  { english: "at or on Mulenga's", bemba: "Pa Mulenga" },

  // =========================================================
  // LOCATIVE EXAMPLES
  // =========================================================

  { english: "in the hut", bemba: "Mu nsaka" },
  { english: "to Lusaka", bemba: "Ku Lusaka" },
  { english: "at or on the table", bemba: "Pa tebulo" },
  { english: "in John's", bemba: "Mwa John" },
  { english: "at or to Musa's", bemba: "Kwa Musa" },
  { english: "at or on Mulenga's", bemba: "Pa Mulenga" },
    // =========================================================
  // CUSTOMS / VISITING
  // =========================================================

  { english: "when visiting, a man should sit first", bemba: "Nga mwaya mukutandala abaume ebaballapo ukwikala pa cipuna" },
  { english: "when visiting, women should wait until the man is seated", bemba: "Nga mwaya mukutandala banamayo balalolela" },

  // =========================================================
  // SAFETY AND SECURITY
  // =========================================================

  { english: "lock all the doors when going out", bemba: "Mulekoma ifiibi fyonse ilyo mulefumapo" },
  { english: "leave the keys with a reliable person", bemba: "Mulesha amaki kumuntu wacishinka" },
  { english: "close all the windows when going out", bemba: "Muleisala amawindo lyonse ilyo mulefumapo" },
  { english: "be careful when drawing water from open wells", bemba: "Muleba abacenjela ilyo muletapa amenshi mu fishima" },
  { english: "use commands appropriately", bemba: "Mufwile muleba abamucinshi ilyo muleeba abantu ifyakucita" },

  // =========================================================
  // HOUSEHOLD WORDS
  // =========================================================

  { english: "bed", bemba: "Beeti" },
  { english: "bed alternative", bemba: "Bedi" },
  { english: "reedmat", bemba: "Ubutanda" },
  { english: "toilet", bemba: "Icimbusu" },
  { english: "door", bemba: "Iciibi" },
  { english: "chair", bemba: "Icipuna" },
  { english: "house", bemba: "Ing'anda" },
  { english: "table", bemba: "Itebulo" },
  { english: "bathing shelter", bemba: "Ulusasa" },

  // =========================================================
  // CLASSROOM WORDS
  // =========================================================

  { english: "book", bemba: "Ibuuku" },
  { english: "pen", bemba: "Bopeni" },
  { english: "pencil", bemba: "Pensulo" },
  { english: "board", bemba: "Icipampa" },
  { english: "chalk", bemba: "Coko" },
  { english: "bag", bemba: "Icoola" },

  // =========================================================
  // USEFUL EXPRESSIONS
  // =========================================================

  { english: "good", bemba: "Ciisuma" },
  { english: "alright", bemba: "Ciisuma" },
  { english: "OK", bemba: "Ciisuma" },
  { english: "it's good", bemba: "Ciisuma" },
  { english: "may I come in", bemba: "Odi" },
  { english: "come in", bemba: "Kalibu" },
  { english: "there", bemba: "Uko" },
  { english: "to wash utensils or things", bemba: "Ukusuka" },
  { english: "I did not get you", bemba: "Nshumfwile" },
  { english: "excuse me", bemba: "Njeleleniko" },
  { english: "repeat", bemba: "Bwekeshenipo" },
  { english: "thank you", bemba: "Natotela" },
  { english: "thank you alternative", bemba: "Natasha" },
  { english: "show me", bemba: "Nangeeniko" },
  { english: "this side", bemba: "Uku" },
  { english: "that side", bemba: "Uko" },
  { english: "over there", bemba: "Kulya" },
  { english: "repeat alternative", bemba: "Bwekeshenipo" },
  { english: "that", bemba: "Ukuti" },
  { english: "that alternative", bemba: "Ati" },

  // =========================================================
  // VERBS
  // =========================================================

  { english: "to repeat", bemba: "Ukubwekeshapo" },
  { english: "to wash clothes", bemba: "Ukuwasha" },
  { english: "to prevent", bemba: "Ukucingilla" },
  { english: "to welcome", bemba: "Ukupokelela" },
  { english: "to be quick", bemba: "Ukwendesha" },
  { english: "to hurry", bemba: "Ukwendesha" },
  { english: "to ask", bemba: "Ukwipusha" },
  { english: "to send", bemba: "Ukutuma" },
  { english: "to listen", bemba: "Ukumfwa" },
  { english: "to feel", bemba: "Ukumfwa" },
  { english: "to hear", bemba: "Ukumfwa" },
  { english: "to drink", bemba: "Ukunwa" },
  { english: "to give", bemba: "Ukupeela" },
  { english: "to laugh", bemba: "Ukuseka" },
  { english: "to sit", bemba: "Ukwikala" },
  { english: "to iron", bemba: "Ukuciisa" },
  { english: "to stand up", bemba: "Ukwiminina" },
  { english: "to cry", bemba: "Ukulila" },
  { english: "to eat", bemba: "Ukulya" },
  { english: "to open", bemba: "Ukwisula" },
  { english: "to close", bemba: "Ukwisala" },
  { english: "to send for or with", bemba: "Ukulaisha" },
  { english: "to show", bemba: "Ukulanga" },
  { english: "to wash plates or vegetables", bemba: "Ukusamfya" },
  { english: "to bathe", bemba: "Ukusamba" },
  { english: "to wash hands", bemba: "Ukusamba ku maboko" },
  { english: "to enter", bemba: "Ukwingila" },
  { english: "to go out", bemba: "Ukufuma" },
    // =========================================================
  // OTHER COMMON WORDS
  // =========================================================

  { english: "way of life", bemba: "Imikalile" },
  { english: "way of staying", bemba: "Imikalile" },
  { english: "way of living", bemba: "Imikalile" },

  { english: "at the police station", bemba: "Ku Polisi" },
  { english: "hospital", bemba: "Icipatala" },
  { english: "market", bemba: "Maliketi" },
  { english: "market alternative", bemba: "Icisankano" },
  { english: "church", bemba: "Calici" },
  { english: "well", bemba: "Iicishima" },
  { english: "clinic", bemba: "Kiliniki" },

  // =========================================================
  // GARDEN TOOLS / IFIBOMBELO
  // =========================================================

  { english: "slasher", bemba: "Icikwakwa" },
  { english: "sickle", bemba: "Icikwakwa" },
  { english: "hoe", bemba: "Ulukasu" },
  { english: "shovel", bemba: "Fosholo" },
  { english: "spade", bemba: "Fosholo" },
  { english: "rake", bemba: "Leki" },
  { english: "axe", bemba: "Isembe" },
  { english: "adze", bemba: "Imbaso" },
  { english: "wheelbarrow", bemba: "Wilubala" },
  { english: "bucket", bemba: "Imbeketi" },
  { english: "rope", bemba: "Intambo" },
  { english: "string", bemba: "Intambo" },
  { english: "machete", bemba: "Ulupanga" },

  // =========================================================
  // STRONG COMMANDS
  // =========================================================

  { english: "dance", bemba: "Shana" },
  { english: "dance alternative", bemba: "Cinda" },
  { english: "give", bemba: "Peela" },
  { english: "sit", bemba: "Ikala" },
  { english: "open", bemba: "Isula" },
  { english: "sleep", bemba: "Laala" },
  { english: "sleep alternative", bemba: "Sendama" },
  { english: "write", bemba: "Lemba" },
  { english: "close", bemba: "Isala" },
  { english: "wash", bemba: "Washa" },
  { english: "cook", bemba: "Ipika" },

  // =========================================================
  // STRONG COMMAND EXAMPLES
  // =========================================================

  { english: "dance to rhumba", bemba: "Cinda rhumba" },
  { english: "dance to rhumba alternative", bemba: "Shana rhumba" },
  { english: "close the door", bemba: "Isala iciibi" },
  { english: "wash the clothes", bemba: "Washa ifyakufwala" },
  { english: "write the letter", bemba: "Lemba inkalata" },
  { english: "sit on the chair", bemba: "Ikala pa cipuna" },
  { english: "open the window", bemba: "Isula iwindo" },
    // =========================================================
  // STRONG COMMANDS - SECOND PERSON PLURAL / RESPECT
  // =========================================================

  { english: "enter respectfully", bemba: "Ingileeni" },
  { english: "put respectfully", bemba: "Bikeeni" },
  { english: "close respectfully", bemba: "Isaleeni" },
  { english: "open respectfully", bemba: "Isuleeni" },
  { english: "sweep respectfully", bemba: "Pyangeeni" },
  { english: "stop respectfully", bemba: "Lekeeni" },

  // =========================================================
  // POLITE COMMANDS - SUFFIX [-KO]
  // =========================================================

  { english: "please enter", bemba: "Ingileeniko" },
  { english: "please put", bemba: "Biikeeniko" },
  { english: "please close", bemba: "Isaleeniko" },
  { english: "please open", bemba: "Isuleeniko" },
  { english: "please sweep", bemba: "Pyangeeniko" },
  { english: "please stop", bemba: "Lekeeniko" },

  // =========================================================
  // POLITE COMMAND EXAMPLES
  // =========================================================

  { english: "please enter the hut", bemba: "Ingileeniko mu nsaka" },
  { english: "please dance to rhumba", bemba: "Shaneeniko rhumba" },
  { english: "please open the door", bemba: "Isuleeniko iciibi" },
  { english: "please close the door", bemba: "Isaleeniko iciibi" },
  { english: "please sweep the house", bemba: "Pyangeeniko mu ng'anda" },
  { english: "please clean the plates", bemba: "Wamyeeniko imbale" },
  { english: "please stop drinking beer", bemba: "Lekeeniko ukunwa ubwalwa" },

  // =========================================================
  // FIRST PERSON PLURAL COMMANDS
  // =========================================================

  { english: "let me eat", bemba: "Ndye" },
  { english: "you eat", bemba: "Mulye" },
  { english: "let them eat", bemba: "Balye" },
  { english: "let us eat", bemba: "Tulye" },

  // =========================================================
  // FIRST PERSON PLURAL COMMAND EXAMPLES
  // =========================================================

  { english: "let me eat nshima", bemba: "Ndye ubwali" },
  { english: "you eat bananas", bemba: "Mulye inkonde" },
  { english: "let them eat rice", bemba: "Balye umupunga" },
  { english: "let's eat chicken", bemba: "Tulye inkoko" },
    // =========================================================
  // POLITE REQUESTS WITHOUT IMPERATIVE
  // =========================================================

  { english: "may I eat please", bemba: "Ndyeeko" },
  { english: "may you eat please", bemba: "Mulyeeko" },
  { english: "may they eat please", bemba: "Balyeeko" },
  { english: "may we eat please", bemba: "Tulyeeko" },

  // =========================================================
  // POLITE REQUEST EXAMPLES
  // =========================================================

  { english: "may I sit down please", bemba: "Njikaleko panshi?" },
  { english: "may you eat nshima please", bemba: "Mulyeko ubwali?" },
  { english: "may they go to the village please", bemba: "Bayeko ku mushi?" },
  { english: "may we dance to rhumba please", bemba: "Tushaneko rhumba?" },

  // =========================================================
  // NEGATIVE COMMANDS
  // =========================================================

  { english: "I must not eat", bemba: "Niilya" },
  { english: "you must not go", bemba: "Mwiya" },
  { english: "he must not drink", bemba: "Beniwa" },
  { english: "she must not drink", bemba: "Beniwa" },
  { english: "they must not drink", bemba: "Beniwa" },
  { english: "we must not write", bemba: "Twilemba" },

  // =========================================================
  // NEGATIVE COMMAND EXAMPLES
  // =========================================================

  { english: "don't eat fish", bemba: "Mwilya isabi" },
  { english: "don't go to Kitwe", bemba: "Mwiya ku Kitwe" },
  { english: "don't drink beer", bemba: "Mwinwa ubwalwa" },
  { english: "don't dance rhumba", bemba: "Mwishana rhumba" },
  { english: "we don't write a letter", bemba: "Twilemba inkalata" },

  // =========================================================
  // EXERCISE PHRASES
  // =========================================================

  { english: "open the door", bemba: "Isula iciibi" },
  { english: "sit on the chair", bemba: "Ikala pa cipuna" },
  { english: "write on the board", bemba: "Lemba pa cipampa" },
  { english: "laugh", bemba: "Seka" },
  { english: "dance to rhumba", bemba: "Cinda rhumba" },
    // =========================================================
  // SAFETY AND SECURITY
  // =========================================================

  { english: "be careful when you are offered drinks from people you don't know well",
    bemba: "Mufwile ukuba abacenjela ilyo bamupeela ifyakunwa ku bantu mushishibe bwino bwino." },

  // =========================================================
  // FOOD WORDS
  // =========================================================

  { english: "maize", bemba: "Amataba" },
  { english: "corn", bemba: "Amataba" },
  { english: "water", bemba: "Amenshi" },
  { english: "eggs", bemba: "Amani" },
  { english: "egg", bemba: "Ilini" },
  { english: "salt", bemba: "Umucele" },
  { english: "salt alternative", bemba: "Soti" },
  { english: "milk", bemba: "Umukaka" },
  { english: "rice", bemba: "Umupunga" },
  { english: "rice alternative", bemba: "Laisi" },
  { english: "nshima", bemba: "Ubwali" },
  { english: "banana", bemba: "Inkonde" },
  { english: "bananas", bemba: "Inkonde" },
  { english: "orange", bemba: "Amacungwa" },
  { english: "oranges", bemba: "Amacungwa" },
  { english: "orange alternative", bemba: "Amaolenji" },
  { english: "mango", bemba: "Yembe" },
  { english: "mangoes", bemba: "Yembe" },
  { english: "lemon", bemba: "Indimu" },
  { english: "lemons", bemba: "Indimu" },
  { english: "avocado pear", bemba: "Kotapela" },
  { english: "avocado pears", bemba: "Kotapela" },
  { english: "guava", bemba: "Amapeela" },
  { english: "guavas", bemba: "Amapeela" },
  { english: "guava alternative", bemba: "Amaguava" },
  { english: "apple", bemba: "Amaapo" },
  { english: "groundnuts", bemba: "Imbalala" },
  { english: "peanut butter", bemba: "Icikonko" },
  { english: "peanut butter alternative", bemba: "Icimpondwa" },

  // =========================================================
  // OTHER WORDS
  // =========================================================

  { english: "that", bemba: "Ico" },
  { english: "which", bemba: "Ico" },
  { english: "thing", bemba: "Icintu" },
  { english: "bad thing", bemba: "Icibi" },
  { english: "thing without", bemba: "Icabula" },
  { english: "visitor", bemba: "Umweni" },
  { english: "guest", bemba: "Umweni" },
  { english: "little things", bemba: "Utunono" },

  // =========================================================
  // MEAL RELATED WORDS
  // =========================================================

  { english: "fork", bemba: "Foloko" },
  { english: "spoon", bemba: "Supuni" },
  { english: "knife", bemba: "Umwele" },
  { english: "knife alternative", bemba: "Naifi" },
  { english: "plate", bemba: "Imbale" },
  { english: "thirst", bemba: "Icilaka" },
  { english: "food", bemba: "Icakulya" },
  { english: "foods", bemba: "Ifyakulya" },
  { english: "breakfast", bemba: "Umwikulo" },
  { english: "breakfast alternative", bemba: "Icakulya ca lucelo" },
  { english: "dinner", bemba: "Icakulya ca bushiku" },
  { english: "lunch", bemba: "Icakulya kasuba" },
  { english: "cup", bemba: "Kapu" },
  { english: "hunger", bemba: "Insala" },

  // =========================================================
  // FOOD & MEAL VERBS
  // =========================================================

  { english: "to cook", bemba: "Ukwipika" },
  { english: "to cook nshima", bemba: "Ukunaya" },
  { english: "to eat", bemba: "Ukulya" },
  { english: "to refuse", bemba: "Ukukaana" },
  { english: "to deny", bemba: "Ukukaana" },
  { english: "to be full", bemba: "Ukwikuta" },
  { english: "to like", bemba: "Ukutemwa" },
  { english: "to love", bemba: "Ukutemwa" },
  { english: "to sniff", bemba: "Ukununsha" },
  { english: "to agree", bemba: "Ukusumina" },
  { english: "to accept", bemba: "Ukusumina" },
  { english: "to be invited", bemba: "Ukwitwa" },
  { english: "to be called", bemba: "Ukwitwa" },
  { english: "to invite", bemba: "Ukwita" },
  { english: "to call", bemba: "Ukwita" },
  { english: "to drink", bemba: "Ukunwa" },
    // =========================================================
  // FOOD & HUNGER EXPRESSIONS
  // =========================================================

  { english: "I am now full", bemba: "Naikuta" },
  { english: "I am full", bemba: "Ninjikuta" },
  { english: "I am thirsty", bemba: "Ndi ne cilaka" },
  { english: "I have eaten", bemba: "Nindya" },
  { english: "I haven't eaten", bemba: "Nshilile" },
  { english: "I am hungry", bemba: "Ndi ne nsala" },
  { english: "I feel hungry", bemba: "Naumfwa insala" },

  // =========================================================
  // HABITUAL PRESENT TENSE — EXAMPLES
  // =========================================================

  { english: "I always eat nshima at 12:30", bemba: "Ndalya ubwali lyonse pa 12:30 koloko" },
  { english: "I always brush my teeth every morning", bemba: "Ndakuusa ameeno lyonse ulucelo" },
    // =========================================================
  // HABITUAL PRESENT TENSE — AFFIRMATIVE
  // =========================================================

  { english: "I always eat nshima with meat", bemba: "Ndalya ubwali ne nama" },
  { english: "you always eat chicken", bemba: "Mulalye inkoko" },
  { english: "they always eat potatoes", bemba: "Balalya ifyumbu" },
  { english: "we always eat rice", bemba: "Tulalya umupunga" },

  // =========================================================
  // HABITUAL PRESENT TENSE — NEGATIVE
  // =========================================================

  { english: "I don't always eat nshima with fish", bemba: "Nshilya ubwali ne sabi" },
  { english: "you don't always eat beans", bemba: "Tamulya cilemba" },
  { english: "they don't always eat groundnuts", bemba: "Tabalya imbalala" },
  { english: "we don't always eat vegetables", bemba: "Tatulya umusalu" },

  // =========================================================
  // REQUESTS / POLITE COMMANDS — OBJECT PRONOUNS
  // =========================================================

  { english: "please give me", bemba: "Mpeeleniko" },
  { english: "please give him or her", bemba: "Mupeeleniko" },
  { english: "please give us", bemba: "Tupeeleniko" },
  { english: "please give them", bemba: "Bapeeleniko" },

  // =========================================================
  // NEGATIVE REQUESTS / POLITE COMMANDS
  // =========================================================

  { english: "don't give me", bemba: "Mwimpeela" },
  { english: "don't give him or her", bemba: "Mwimupeela" },
  { english: "don't give us", bemba: "Mwitupeela" },
  { english: "don't give them", bemba: "Mwibapeela" },

  // =========================================================
  // REQUEST / POLITE COMMAND EXAMPLES
  // =========================================================

  { english: "please give me salt", bemba: "Mpeeleniko umucele" },
  { english: "please give him water", bemba: "Mupeeleniko amenshi" },
  { english: "please give us nshima", bemba: "Tupeeleniko ubwali" },
  { english: "please give them fruits", bemba: "Bapeeleniko ifisabo" },
    // =========================================================
  // LESSON 5 — PERSONAL IDENTIFICATION / CULTURAL NOTES
  // =========================================================

  { english: "do not describe someone by their disability", bemba: "Tatulondolola umuntu kubulema bwakwe" },

  { english: "some body parts are not mentioned in public", bemba: "Ifilundwa fimo ifyamubili tafilumbulwa pa bantu" },

  { english: "private parts are not mentioned in public", bemba: "Ifyamfwalo tafilumbulwa pa bantu" },

  { english: "it is not polite to ask a woman if she is pregnant",
    bemba: "Mu Cibemba, te ntambi ukwipusha namayo nga ali pabukulu nangu iyo" },

  { english: "a woman's thighs are not exposed in public",
    bemba: "Mu Zambia amatanta ya mwanakashi tayalangwa pa mbilibili" },

  { english: "it is not polite for a man to insist on asking what a woman is suffering from",
    bemba: "Temucinshi umwaume ukwipukishisha namaayo ifyo alewala" },

  { english: "some diseases are not mentioned in public",
    bemba: "Amalwale yamo yamo tayalumbulwa pa bantu" },

  { english: "sexually transmitted diseases are not mentioned in public",
    bemba: "Amalwale ya lwambu tayalumbulwa pa bantu" },

  { english: "it is a compliment to be told you are fat",
    bemba: "Ni ntambwe ukweba ati uli mukulu" },
    // =========================================================
  // CULTURAL NOTE
  // =========================================================

  { english: "being fat is good in Zambia; when someone says you are fat, it is a compliment",
    bemba: "Mu Zambia ukwina kusuma, nga umuntu alanda ati walina ninshi malumbo" },

  // =========================================================
  // SAFETY AND SECURITY
  // =========================================================

  { english: "indecent dressing can cause harassment in public",
    bemba: "Imifwalile ibi kuti yalenga ukusebana" },

  { english: "it could be dangerous to use traditional medicine",
    bemba: "Kuti camuletela ubusanso ukubomfya imiti yacikaya" },

  // =========================================================
  // BODY-RELATED WORDS
  // =========================================================

  { english: "head", bemba: "Umutwe" },
  { english: "hair", bemba: "Umushishi" },
  { english: "eye", bemba: "Iliinso" },
  { english: "eyes", bemba: "Ameenso" },
  { english: "ear", bemba: "Ukutwi" },
  { english: "ears", bemba: "Amatwi" },
  { english: "nose", bemba: "Umoona" },
  { english: "mouth", bemba: "Akanwa" },
  { english: "lip", bemba: "Umulomo" },
  { english: "lips", bemba: "Imilomo" },
  { english: "tongue", bemba: "Ululimi" },
  { english: "beard", bemba: "Umwefu" },
  { english: "neck", bemba: "Umukoshi" },
  { english: "chest", bemba: "Icifuba" },
  { english: "breast", bemba: "Ibeele" },
  { english: "stomach", bemba: "Ulufumo" },
  { english: "pregnancy", bemba: "Ifumo" },
  { english: "waist", bemba: "Umusana" },
  { english: "thighs", bemba: "Amatanta" },
  { english: "knee", bemba: "Ikufi" },
  { english: "feet", bemba: "Amakasa" },
    // =========================================================
  // HEALTH & COMMON CONDITIONS
  // =========================================================

  { english: "cold", bemba: "Impepo" },
  { english: "malaria", bemba: "Malelya" },
  { english: "syphilis", bemba: "Akaswende" },
  { english: "gonorrhoea", bemba: "Akasele" },

  // =========================================================
  // VERBS
  // =========================================================

  { english: "to hide", bemba: "Ukufisa" },
  { english: "to be hidden", bemba: "Ukufiswa" },
  { english: "to be sick", bemba: "Ukulwala" },
  { english: "to think", bemba: "Ukutontonkanya" },
  { english: "to fall", bemba: "Ukupona" },
  { english: "to be happy", bemba: "Ukutemwa" },
  { english: "to like", bemba: "Ukutemwa" },
  { english: "to be beautiful", bemba: "Ukuwama" },
  { english: "to be good", bemba: "Ukuwama" },
  { english: "to be strong", bemba: "Ukukosa" },
  { english: "to be hard", bemba: "Ukukosa" },
  { english: "to burn", bemba: "Ukooca" },
  { english: "to burn alternative", bemba: "Ukupya" },
  { english: "to break", bemba: "Ukukontola" },
  { english: "to be tired", bemba: "Ukunaka" },
  { english: "to heal", bemba: "Ukupola" },
  { english: "to treat", bemba: "Ukuposha" },
  { english: "to heal alternative", bemba: "Ukuundapa" },
  { english: "to treat alternative", bemba: "Ukuundapa" },

  // =========================================================
  // BEMBA NOUN CLASSES — BASIC TERMS
  // =========================================================

  { english: "noun class", bemba: "Icisambililo ca mashina" },
  { english: "noun", bemba: "Ishina" },
  { english: "noun classes", bemba: "Ifisangala fya mashina" },
  { english: "noun class one", bemba: "Umu-" },
  { english: "noun class two", bemba: "Aba-" },
  { english: "noun class three", bemba: "Umu-" },
  { english: "noun class four", bemba: "Imi-" },
  { english: "noun class five", bemba: "Ili-" },
  { english: "noun class six", bemba: "Ama-" },

  // =========================================================
  // NOUN CLASS EXAMPLES
  // =========================================================

  { english: "person", bemba: "Umuntu" },
  { english: "teacher", bemba: "Kafundisha" },
  { english: "monkey", bemba: "Kolwe" },

  { english: "people", bemba: "Abantu" },
  { english: "teachers", bemba: "Bakafundisha" },
  { english: "monkeys", bemba: "Bakolwe" },

  { english: "tree", bemba: "Umuti" },
  { english: "trees", bemba: "Imiti" },
  { english: "head", bemba: "Umutwe" },
  { english: "heads", bemba: "Imitwe" },

  { english: "egg", bemba: "Ilini" },
  { english: "eggs", bemba: "Amani" },
  { english: "eye", bemba: "Iliinso" },
  { english: "eyes", bemba: "Ameenso" },
  { english: "spoons", bemba: "Amasupuni" },
  { english: "forks", bemba: "Amafoloko" },
  { english: "cold", bemba: "Impepo" },
{ english: "malaria", bemba: "Malelya" },
{ english: "syphilis", bemba: "Akaswende" },
{ english: "gonorrhoea", bemba: "Akasele" },

{ english: "to hide", bemba: "Ukufisa" },
{ english: "to be hidden", bemba: "Ukufiswa" },
{ english: "to be sick", bemba: "Ukulwala" },
{ english: "to think", bemba: "Ukutontonkanya" },
{ english: "to fall", bemba: "Ukupona" },
{ english: "to be happy", bemba: "Ukutemwa" },
{ english: "to like", bemba: "Ukutemwa" },
{ english: "to be beautiful", bemba: "Ukuwama" },
{ english: "to be good", bemba: "Ukuwama" },
{ english: "to be strong", bemba: "Ukukosa" },
{ english: "to be hard", bemba: "Ukukosa" },
{ english: "to burn", bemba: "Ukooca" },
{ english: "to burn", bemba: "Ukupya" },
{ english: "to break", bemba: "Ukukontola" },
{ english: "to be tired", bemba: "Ukunaka" },
{ english: "to heal", bemba: "Ukupola" },
{ english: "to treat", bemba: "Ukuposha" },
{ english: "to heal", bemba: "Ukuundapa" },

{ english: "noun class", bemba: "Icilyashi ca nshita" },
{ english: "noun classes", bemba: "Ifilyashi fya nshita" },

{ english: "class 1", bemba: "Umu-" },
{ english: "class 2", bemba: "Aba-" },
{ english: "class 3", bemba: "Umu-" },
{ english: "class 4", bemba: "Imi-" },
{ english: "class 5", bemba: "Ili-" },
{ english: "class 6", bemba: "Ama-" },
{ english: "class 7", bemba: "Ici-" },
{ english: "class 8", bemba: "Ifi-" },
{ english: "class 9", bemba: "In-" },
{ english: "class 10", bemba: "In-" },
{ english: "class 11", bemba: "Ulu-" },
{ english: "class 12", bemba: "Aka-" },
{ english: "class 13", bemba: "Utu-" },
{ english: "class 14", bemba: "Ubu-" },
{ english: "class 15", bemba: "Uku-" },
{ english: "class 16", bemba: "Mu" },
{ english: "class 17", bemba: "Ku" },
{ english: "class 18", bemba: "Pa" },

{ english: "tree", bemba: "Umuti" },
{ english: "trees", bemba: "Imiti" },
{ english: "head", bemba: "Umutwe" },
{ english: "heads", bemba: "Imitwe" },
{ english: "egg", bemba: "Ilini" },
{ english: "eggs", bemba: "Amani" },
{ english: "eye", bemba: "Iliinso" },
{ english: "eyes", bemba: "Ameenso" },
{ english: "chair", bemba: "Icipuna" },
{ english: "chairs", bemba: "Ifipuna" },
{ english: "cow", bemba: "Ing'ombe" },
{ english: "cows", bemba: "Ing'ombe" },
{ english: "foot", bemba: "Ulukasa" },
{ english: "feet", bemba: "Amakasa" },
{ english: "family", bemba: "Ulupwa" },
{ english: "families", bemba: "Indupwa" },
{ english: "tongue", bemba: "Ululimi" },
{ english: "languages", bemba: "Indimi" },
{ english: "hoe", bemba: "Ulukasu" },
{ english: "hoes", bemba: "Inkasu" },
{ english: "small child", bemba: "Akamwana" },
{ english: "small tree", bemba: "Akamuti" },
{ english: "small fish", bemba: "Akasabi" },
{ english: "small head", bemba: "Akamutwe" },
{ english: "small children", bemba: "Utubaana" },
{ english: "small trees", bemba: "Utumti" },
{ english: "small fish", bemba: "Utusabi" },
{ english: "small heads", bemba: "Utumtwe" },
{ english: "meal flour", bemba: "Ubunga" },
{ english: "beer", bemba: "Ubwalwa" },
{ english: "jealousy", bemba: "Ubufuba" },
{ english: "life", bemba: "Ubumi" },
{ english: "in Chongwe", bemba: "Mu Chongwe" },
{ english: "to the village", bemba: "Ku mushi" },
{ english: "on the chair", bemba: "Pa cipuna" },

{ english: "a", bemba: "a" },
{ english: "e", bemba: "e" },
{ english: "i", bemba: "i" },
{ english: "o", bemba: "o" },
{ english: "u", bemba: "u" },
  { english: "to brush", bemba: "Ukukuusa" },

{ english: "small skull", bemba: "Akapanga" },
{ english: "small stretch of bush", bemba: "Akapanga" },
{ english: "small sheep", bemba: "Akapanga" },
{ english: "lamb", bemba: "Akapanga" },
{ english: "small sword", bemba: "Akapanga" },

{ english: "to sleep", bemba: "Ukulaala" },
{ english: "to harvest", bemba: "Ukuaeepa" },
{ english: "to sing", bemba: "Ukwiimba" },
{ english: "nose", bemba: "Umoona" },
{ english: "to undress", bemba: "Ukufuula" },

{ english: "our people", bemba: "Abeesu" },
{ english: "without plates", bemba: "Ukwabule mbale" },
{ english: "those that breastfeed", bemba: "Aboonsha" },
{ english: "legs", bemba: "Amoolu" },

{ english: "near", bemba: "-ipi" },
{ english: "short", bemba: "-ipi" },
{ english: "tall", bemba: "-tali" },
{ english: "far", bemba: "-tali" },
{ english: "long", bemba: "-tali" },
{ english: "big", bemba: "-kulu" },
{ english: "small", bemba: "-nono" },
{ english: "old", bemba: "-kote" },
{ english: "good", bemba: "-suma" },
{ english: "nice", bemba: "-suma" },
{ english: "beautiful", bemba: "-suma" },
{ english: "lazy", bemba: "-nang'ani" },
{ english: "raw", bemba: "-bishi" },
{ english: "fresh", bemba: "-bishi" },
{ english: "female", bemba: "-anakashi" },
{ english: "male", bemba: "-aume" },
{ english: "fearsome", bemba: "-kali" },

{ english: "fat", bemba: "-ina" },
{ english: "bad", bemba: "-bipa" },
{ english: "thin", bemba: "-onda" },
{ english: "dark", bemba: "-fita" },
{ english: "dry", bemba: "-uma" },
{ english: "bitter", bemba: "-lula" },
{ english: "sweet", bemba: "-lowa" },
{ english: "difficult", bemba: "-shupa" },
{ english: "stubborn", bemba: "-shupa" },
{ english: "rotten", bemba: "-bola" },
{ english: "ripe", bemba: "-pya" },
{ english: "new", bemba: "-pya" },
{ english: "coward", bemba: "-mwenso" },
{ english: "shy", bemba: "-nsoni" },
{ english: "strong", bemba: "-kosa" },
{ english: "hard", bemba: "-kosa" },

{ english: "child without sense", bemba: "Umwana uwabula amaano" },
{ english: "nurse without a child", bemba: "Nashi uwabula umwana" },
{ english: "old person without power", bemba: "Umukote uwabula amaka" },
  // Bemba vocabulary and expressions

{ english: "I don't have (always)", bemba: "Nshakwata" },
{ english: "I don't have now", bemba: "Nshikwete" },
{ english: "I am not married (male)", bemba: "Nshaupa" },
{ english: "I am not married (female)", bemba: "Nshaupwa" },
{ english: "At/on my house/home", bemba: "Pa mwandi" },

{ english: "I am in Kitwe", bemba: "Ine ndi mu Kitwe" },
{ english: "You are in Lusaka", bemba: "Imwe muli ku Lusaka" },
{ english: "They are in Zambia", bemba: "Aba bali mu Zambia" },
{ english: "We are in the nsaka", bemba: "Ifwe tuli mu nsaka" },
{ english: "I am not in Ndola", bemba: "Ine nshili mu Ndola" },
{ english: "You are not in Kitwe", bemba: "Imwe tamuli mu Kitwe" },
{ english: "They are not in Zambia", bemba: "Aba tabali mu Zambia" },
{ english: "We are not in the classroom", bemba: "Ifwe tatuli mu kalasi" },

{ english: "I have now / I have temporarily", bemba: "Nimkwata" },
{ english: "You have now / temporarily", bemba: "Namukwata" },
{ english: "He/she has now / They have now", bemba: "Nabakwata" },
{ english: "We have now", bemba: "Natukwata" },
{ english: "I don't have at the moment", bemba: "Nshikwete" },
{ english: "We don't have now", bemba: "Tatukwete" },
{ english: "You don't have now", bemba: "Tamukwete" },
{ english: "They don't have now", bemba: "Tabakwete" },

{ english: "I have two children", bemba: "Nakwata abaana babili" },
{ english: "We have two children", bemba: "Twakwata abaana babili" },
{ english: "You have three children", bemba: "Mwakwata abaana batatu" },
{ english: "They have four children", bemba: "Bakwata abaana bane" },
{ english: "We don't have four children", bemba: "Tatwakwata abaana bane" },
{ english: "You don't have two children", bemba: "Tamwakwata abaana babili" },
{ english: "They don't have two children", bemba: "Tabakwata abaana babili" },

{ english: "I had", bemba: "Nakwete" },
{ english: "We had", bemba: "Twakwete" },
{ english: "You had", bemba: "Mwakwete" },
{ english: "They had", bemba: "Bakwete" },
{ english: "We didn't have", bemba: "Tatwakwete" },
{ english: "You didn't have", bemba: "Tamwakwete" },
{ english: "They didn't have", bemba: "Tabakwete" },
{ english: "I didn't have", bemba: "Nshakwete" },

{ english: "I will have", bemba: "Nkakwata" },
{ english: "We will have", bemba: "Tukakwata" },
{ english: "You will have", bemba: "Mukakwata" },
{ english: "They will have", bemba: "Bakakwata" },
{ english: "We won't have", bemba: "Tatwakakwate" },
{ english: "You won't have", bemba: "Tamwakakwate" },
{ english: "They won't have", bemba: "Tabakakwate" },
{ english: "I won't have", bemba: "Nshakakwate" },

{ english: "My", bemba: "-andi" },
{ english: "Your (informal singular)", bemba: "-obe" },
{ english: "His/her (informal singular)", bemba: "-akwe" },
{ english: "Our", bemba: "-esu" },
{ english: "Your (respectful/plural)", bemba: "-enu" },
{ english: "His/hers/theirs (respectful/plural)", bemba: "-abo" },

{ english: "My child", bemba: "Umwaana wandi" },
{ english: "Your sister", bemba: "Nkashi yobe" },
{ english: "Your brother", bemba: "Ndume yobe" },
{ english: "Your children", bemba: "Abaana bobe" },
{ english: "Your sister (respectful/plural)", bemba: "Nkashi yenu" },
{ english: "His/her brother", bemba: "Ndume yakhe" },
{ english: "His/her brothers", bemba: "Ba Ndume yakhe" },

{ english: "In the hut", bemba: "Mu nsaka" },
{ english: "To Lusaka", bemba: "Ku Lusaka" },
{ english: "At/on the table", bemba: "Pa tebulo" },
{ english: "In John's", bemba: "Mwa John" },
{ english: "At/to Musa's", bemba: "Kwa Musa" },
{ english: "At/on Mulenga's", bemba: "Pa Mulenga" },

{ english: "When you go visiting", bemba: "Nga mwaya mukutandala" },
{ english: "A man should sit first", bemba: "Abaume ebaballapo ukwikala pa cipuna" },
{ english: "Women wait until he is seated", bemba: "Banamayo balalolela" },

{ english: "Lock all the doors when going out", bemba: "Mulekoma ifiibi fyonse ilyo mulefumapo" },
{ english: "Leave the key with a reliable person", bemba: "Mulesha amaki kumuntu wacishinka" },
{ english: "Close all the windows", bemba: "Muleisala amawindo lyonse" },
{ english: "Be careful when drawing water from open wells", bemba: "Muleba abacenjela ilyo muletapa amenshi mu fishima" },
{ english: "Use commands appropriately", bemba: "Mufwile muleba abamucinshi ilyo muleeba abantu ifyakucita" },
{ english: "Be careful when offered drinks by people you don't know well", bemba: "Mufwile ukuba abacenjela ilyo bamupeela ifyakunwa ku bantu mushishibe bwino bwino" },

{ english: "Bed", bemba: "Beeti/Bedi" },
{ english: "Reed mat", bemba: "Ubutanda" },
{ english: "Toilet", bemba: "Icimbusu" },
{ english: "Door", bemba: "Iciibi" },
{ english: "Chair", bemba: "Icipuna" },
{ english: "House", bemba: "Ing'anda" },
{ english: "Table", bemba: "Itebulo" },
{ english: "Bathing shelter", bemba: "Ulusasa" },

{ english: "Book", bemba: "Ibuuku" },
{ english: "Pen", bemba: "Bopeni" },
{ english: "Pencil", bemba: "Pensulo" },
{ english: "Board", bemba: "Icipampa" },
{ english: "Chalk", bemba: "Coko" },
{ english: "Bag", bemba: "Icoola" },

{ english: "Good / alright / OK", bemba: "Ciisuma" },
{ english: "May I come in?", bemba: "Odi" },
{ english: "Come in", bemba: "Kalibu" },
{ english: "There", bemba: "Uko" },
{ english: "To wash utensils/things", bemba: "Ukusuka" },
{ english: "I did not get you", bemba: "Nshumfwile" },
{ english: "Excuse me", bemba: "Njeleleniko" },
{ english: "Repeat", bemba: "Bwekeshenipo" },
{ english: "Thank you", bemba: "Natotela" },
{ english: "Thank you", bemba: "Natasha" },
{ english: "Show me", bemba: "Nangeeniko" },
{ english: "This side", bemba: "Uku" },
{ english: "That side", bemba: "Uko" },
{ english: "Over there", bemba: "Kulya" },
{ english: "That", bemba: "Ukuti" },
{ english: "That", bemba: "Ati" },

{ english: "To repeat", bemba: "Ukubwekeshapo" },
{ english: "To wash clothes", bemba: "Ukuwasha" },
{ english: "To prevent", bemba: "Ukucingilla" },
{ english: "To welcome", bemba: "Ukupokelela" },
{ english: "To hurry", bemba: "Ukwendesha" },
{ english: "To ask", bemba: "Ukwipusha" },
{ english: "To send", bemba: "Ukutuma" },
{ english: "To listen / hear / feel", bemba: "Ukunfwa" },
{ english: "To drink", bemba: "Ukunwa" },
{ english: "To give", bemba: "Ukupeela" },
{ english: "To laugh", bemba: "Ukuseka" },
{ english: "To sit", bemba: "Ukwikala" },
{ english: "To iron", bemba: "Ukuciisa" },
{ english: "To stand up", bemba: "Ukwiminina" },
{ english: "To cry", bemba: "Ukulila" },
{ english: "To eat", bemba: "Ukulya" },
{ english: "To open", bemba: "Ukwisula" },
{ english: "To close", bemba: "Ukwisala" },
{ english: "To send for / send with", bemba: "Ukulaisha" },
{ english: "To show", bemba: "Ukulanga" },
{ english: "To wash plates / vegetables", bemba: "Ukusamfya" },
{ english: "To bathe", bemba: "Ukusamba" },
{ english: "To wash hands", bemba: "Ukusamba ku maboko" },
{ english: "To enter", bemba: "Ukwingila" },
{ english: "To go out", bemba: "Ukufuma" },

{ english: "Way of life / living", bemba: "Imikalile" },
{ english: "At the police station", bemba: "Ku Polisi" },
{ english: "Hospital", bemba: "Icipatala" },
{ english: "Market", bemba: "Maliketi" },
{ english: "Market", bemba: "Icisankano" },
{ english: "Church", bemba: "Calici" },
{ english: "Well", bemba: "Icishima" },
{ english: "Clinic", bemba: "Kiliniki" },

{ english: "Slasher / sickle", bemba: "Icikwakwa" },
{ english: "Hoe", bemba: "Ulukasu" },
{ english: "Shovel / spade", bemba: "Fosholo" },
{ english: "Rake", bemba: "Leki" },
{ english: "Axe", bemba: "Isembe" },
{ english: "Adze", bemba: "Imbaso" },
{ english: "Wheelbarrow", bemba: "Wilubala" },
{ english: "Bucket", bemba: "Imbeketi" },
{ english: "Rope / string", bemba: "Intambo" },
{ english: "Machete", bemba: "Ulupanga" },

{ english: "Dance", bemba: "Shana" },
{ english: "Dance", bemba: "Cinda" },
{ english: "Give", bemba: "Peela" },
{ english: "Sit", bemba: "Ikala" },
{ english: "Open", bemba: "Isula" },
{ english: "Sleep", bemba: "Laala" },
{ english: "Write", bemba: "Lemba" },
{ english: "Close", bemba: "Isala" },
{ english: "Wash", bemba: "Washa" },
{ english: "Cook", bemba: "Ipika" },

{ english: "Dance to rhumba", bemba: "Cinda/Shana rhumba" },
{ english: "Close the door", bemba: "Isala iciibi" },
{ english: "Wash the clothes", bemba: "Washa ifyakufwala" },
{ english: "Write the letter", bemba: "Lemba inkalata" },
{ english: "Sit on the chair", bemba: "Ikala pa cipuna" },
{ english: "Open the window", bemba: "Isula iwindo" },

{ english: "Enter (respectful)", bemba: "Ingileeni" },
{ english: "Put (respectful)", bemba: "Bikeeni" },
{ english: "Close (respectful)", bemba: "Isaleeni" },
{ english: "Open (respectful)", bemba: "Isuleeni" },
{ english: "Sweep (respectful)", bemba: "Pyangeeni" },
{ english: "Stop (respectful)", bemba: "Lekeeni" },

{ english: "Please enter", bemba: "Ingileeniko" },
{ english: "Please put", bemba: "Biikeeniko" },
{ english: "Please close", bemba: "Isaleeniko" },
{ english: "Please open", bemba: "Isuleeniko" },
{ english: "Please sweep", bemba: "Pyangeeniko" },
{ english: "Please stop", bemba: "Lekeeniko" },
{ english: "Please enter the hut", bemba: "Ingileeniko mu nsaka" },
{ english: "Please dance to rhumba", bemba: "Shaneeniko rhumba" },
{ english: "Please open the door", bemba: "Isuleeniko iciibi" },
{ english: "Please close the door", bemba: "Isaleeniko iciibi" },
{ english: "Please sweep the house", bemba: "Pyangeeniko mu ng'anda" },
{ english: "Please clean the plates", bemba: "Wamyeeniko imbale" },
{ english: "Please stop drinking beer", bemba: "Lekeeniko ukunwa ubwalwa" },

{ english: "Let me eat nshima", bemba: "Ndye ubwali" },
{ english: "You eat bananas", bemba: "Mulye inkonde" },
{ english: "Let them eat rice", bemba: "Balye umupunga" },
{ english: "Let's eat chicken", bemba: "Tulye inkoko" },

{ english: "May I eat, please?", bemba: "Ndyeeko" },
{ english: "May you eat, please?", bemba: "Mulyeeko" },
{ english: "May they eat, please?", bemba: "Balyeeko" },
{ english: "May we eat, please?", bemba: "Tulyeeko" },
{ english: "May I sit down, please?", bemba: "Njikaleko panshi?" },
{ english: "May you eat nshima, please?", bemba: "Mulyeko ubwali?" },
{ english: "May they go to the village, please?", bemba: "Bayeko ku mushi?" },
{ english: "May we dance to rhumba, please?", bemba: "Tushaneko rhumba?" },

{ english: "Don't eat fish", bemba: "Mwilya isabi" },
{ english: "Don't go to Kitwe", bemba: "Mwiya ku Kitwe" },
{ english: "Don't drink beer", bemba: "Mwinwa ubwalwa" },
{ english: "Don't dance rhumba", bemba: "Mwishana rhumba" },
{ english: "We must not write", bemba: "Twilemba" },

{ english: "Maize / corn", bemba: "Amataba" },
{ english: "Water", bemba: "Amenshi" },
{ english: "Eggs", bemba: "Amani" },
{ english: "Egg", bemba: "Ilini" },
{ english: "Salt", bemba: "Umucele" },
{ english: "Salt", bemba: "Soti" },
{ english: "Milk", bemba: "Umukaka" },
{ english: "Rice", bemba: "Umupunga" },
{ english: "Rice", bemba: "Laisi" },
{ english: "Nshima", bemba: "Ubwali" },
{ english: "Banana / bananas", bemba: "Inkonde" },
{ english: "Oranges", bemba: "Amacungwa" },
{ english: "Oranges", bemba: "Amaolenji" },
{ english: "Mangoes", bemba: "Yembe" },
{ english: "Lemons", bemba: "Indimu" },
{ english: "Avocado pear / avocados", bemba: "Kotapela" },
{ english: "Guavas", bemba: "Amapeela" },
{ english: "Guavas", bemba: "Amaguava" },
{ english: "Apple", bemba: "Amaapo" },
{ english: "Groundnuts", bemba: "Imbalala" },
{ english: "Peanut butter", bemba: "Icikonko" },
{ english: "Peanut butter", bemba: "Tcimpondwa" },

{ english: "That / which", bemba: "Ico" },
{ english: "Thing", bemba: "Icintu" },
{ english: "Bad thing", bemba: "Icibi" },
{ english: "Thing without", bemba: "Icabula" },
{ english: "Visitor / guest", bemba: "Umweni" },
{ english: "Little things", bemba: "Utunono" },

{ english: "Fork", bemba: "Foloko" },
{ english: "Spoon", bemba: "Supuni" },
{ english: "Knife", bemba: "Umwele" },
{ english: "Knife", bemba: "Naifi" },
{ english: "Plate", bemba: "Imbale" },
{ english: "Thirst", bemba: "Icilaka" },
{ english: "Food", bemba: "Icakulya" },
{ english: "Foods", bemba: "Ifyakulya" },
{ english: "Breakfast", bemba: "Umwikulo" },
{ english: "Breakfast", bemba: "Icakulya ca lucelo" },
{ english: "Dinner", bemba: "Icakulya ca bushiku" },
{ english: "Lunch", bemba: "Icakulya kasuba" },
{ english: "Cup", bemba: "Kapu" },
{ english: "Hunger", bemba: "Insala" },

{ english: "To cook", bemba: "Ukwipika" },
{ english: "To cook nshima", bemba: "Ukunaya" },
{ english: "To eat", bemba: "Ukulya" },
{ english: "To refuse / deny", bemba: "Ukukaana" },
{ english: "To be full", bemba: "Ukwikuta" },
{ english: "To like / love", bemba: "Ukutemwa" },
{ english: "To sniff", bemba: "Ukununsha" },
{ english: "To agree / accept", bemba: "Ukusumina" },
{ english: "To be invited / called", bemba: "Ukwitwa" },
{ english: "To invite / call", bemba: "Ukwita" },
{ english: "To drink", bemba: "Ukunwa" },

{ english: "I am now full", bemba: "Naikuta" },
{ english: "I am full", bemba: "Ninjikuta" },
{ english: "I am thirsty", bemba: "Ndi ne cilaka" },
{ english: "I have eaten", bemba: "Nindya" },
{ english: "I haven't eaten", bemba: "Nshilile" },
{ english: "I'm hungry", bemba: "Ndi ne nsala" },
{ english: "I feel hungry", bemba: "Naumfwa insala" },

{ english: "I always eat nshima with meat", bemba: "Ndalya ubwali ne nama" },
{ english: "You always eat chicken", bemba: "Mulalye inkoko" },
{ english: "They always eat potatoes", bemba: "Balalya ifyumbu" },
{ english: "We always eat rice", bemba: "Tulalya umupunga" },
{ english: "I don't always eat nshima with fish", bemba: "Nshilya ubwali ne sabi" },
{ english: "You don't always eat beans", bemba: "Tamulya cilemba" },
{ english: "They don't always eat groundnuts", bemba: "Tabalya imbalala" },
{ english: "We don't always eat vegetables", bemba: "Tatulya umusalu" },

{ english: "Please give me", bemba: "Mpeeleniko" },
{ english: "Please give him/her", bemba: "Mupeeleniko" },
{ english: "Please give us", bemba: "Tupeeleniko" },
{ english: "Please give them", bemba: "Bapeeleniko" },
{ english: "Don't give me", bemba: "Mwimpeela" },
{ english: "Don't give him/her", bemba: "Mwimupeela" },
{ english: "Don't give us", bemba: "Mwitupeela" },
{ english: "Don't give them", bemba: "Mwibapeela" },
{ english: "Please give me salt", bemba: "Mpeeleniko umucele" },
{ english: "Please give him water", bemba: "Mupeeleniko amenshi" },
{ english: "Please give us nshima", bemba: "Tupeeleniko ubwali" },
{ english: "Please give them fruits", bemba: "Bapeeleniko ifisabo" },

{ english: "Head", bemba: "Umutwe" },
{ english: "Hair", bemba: "Umushishi" },
{ english: "Eye", bemba: "Iliinso" },
{ english: "Eyes", bemba: "Ameenso" },
{ english: "Ear", bemba: "Ukutwi" },
{ english: "Ears", bemba: "Amatwi" },
{ english: "Nose", bemba: "Umoona" },
{ english: "Mouth", bemba: "Akanwa" },
{ english: "Lip", bemba: "Umulomo" },
{ english: "Lips", bemba: "Imilomo" },
{ english: "Tongue", bemba: "Ululimi" },
{ english: "Beard", bemba: "Umwefu" },
{ english: "Neck", bemba: "Umukoshi" },
{ english: "Chest", bemba: "Icifuba" },
{ english: "Breast", bemba: "Ibeele" },
{ english: "Stomach", bemba: "Ulufumo" },
{ english: "Pregnancy", bemba: "Ifumo" },
{ english: "Waist", bemba: "Umusana" },
{ english: "Thighs", bemba: "Amatanta" },
{ english: "Knee", bemba: "Ikufi" },
{ english: "Feet", bemba: "Amakasa" },

{ english: "Cold", bemba: "Impepo" },
{ english: "Malaria", bemba: "Malelya" },
{ english: "Syphilis", bemba: "Akaswende" },
{ english: "Gonorrhoea", bemba: "Akasele" },

{ english: "To hide", bemba: "Ukufisa" },
{ english: "To be hidden", bemba: "Ukufiswa" },
{ english: "To be sick", bemba: "Ukulwala" },
{ english: "To think", bemba: "Ukutontonkanya" },
{ english: "To fall", bemba: "Ukupona" },
{ english: "To be happy / like", bemba: "Ukutemwa" },
{ english: "To be beautiful / good", bemba: "Ukuwama" },
{ english: "To be strong / hard", bemba: "Ukukosa" },
{ english: "To burn", bemba: "Ukooca" },
{ english: "To burn", bemba: "Ukupya" },
{ english: "To break", bemba: "Ukukontola" },
{ english: "To be tired", bemba: "Ukunaka" },
{ english: "To get well", bemba: "Ukupola" },
{ english: "To treat / heal", bemba: "Ukuposha" },
{ english: "To treat / heal", bemba: "Ukuundapa" },

{ english: "Near / short", bemba: "-ipi" },
{ english: "Tall / far / long", bemba: "-tali" },
{ english: "Big", bemba: "-kulu" },
{ english: "Small", bemba: "-nono" },
{ english: "Old", bemba: "-kote" },
{ english: "Good / nice / beautiful", bemba: "-suma" },
{ english: "Lazy", bemba: "-nang'ani" },
{ english: "Raw / fresh", bemba: "-bishi" },
{ english: "Female", bemba: "-anakashi" },
{ english: "Male", bemba: "-aume" },
{ english: "Fearsome", bemba: "-kali" },
{ english: "Bad", bemba: "-bi" },
{ english: "Fat", bemba: "-ina" },
{ english: "Bad", bemba: "-bipa" },
{ english: "Thin", bemba: "-onda" },
{ english: "Dark", bemba: "-fita" },
{ english: "Dry", bemba: "-uma" },
{ english: "Bitter", bemba: "-lula" },
{ english: "Sweet", bemba: "-lowa" },
{ english: "Difficult / stubborn", bemba: "-shupa" },
{ english: "Rotten", bemba: "-bola" },
{ english: "Ripe / new", bemba: "-pya" },
{ english: "Coward", bemba: "-mwenso" },
{ english: "Shy", bemba: "-nsoni" },
{ english: "Strong / hard", bemba: "-kosa" },

{ english: "A child without sense", bemba: "Umwana uwabula amaano" },
{ english: "A nurse without a child", bemba: "Nashi uwabula umwana" },
{ english: "An old person without power", bemba: "Umukote uwabula amaka" },
{ english: "A person without a job", bemba: "Umuntu uwabula incito" },
{ english: "A jobless person", bemba: "Umuntu uwabula incito" },

{ english: "This person", bemba: "Umuntu uyu" },
{ english: "That person", bemba: "Umuntu uyo" },
{ english: "That person over there", bemba: "Umuntu ulya" },
{ english: "These people", bemba: "Abantu aba" },
{ english: "Those people", bemba: "Abantu abo" },
{ english: "Those people over there", bemba: "Abantu balya" },
{ english: "This tree", bemba: "Umuti uyu" },
{ english: "That tree", bemba: "Umuti uyo" },
{ english: "That tree over there", bemba: "Umuti ulya" },
{ english: "This egg", bemba: "Ilini ili" },
{ english: "That egg", bemba: "Ilini ilyo" },
{ english: "That egg over there", bemba: "Ilini ilya" },
{ english: "This chair", bemba: "Icipuna ici" },
{ english: "That chair", bemba: "Icipuna ico" },
{ english: "That chair over there", bemba: "Icipuna cilya" },
{ english: "These chairs", bemba: "Ifipuna ifi" },
{ english: "Those chairs", bemba: "Ifipuna ifyo" },
{ english: "Those chairs over there", bemba: "Ifipuna filya" },

{ english: "My person / guy is coming", bemba: "Umuntu wandi aleisa" },
{ english: "My people are coming", bemba: "Abantu bandi baleisa" },
{ english: "My tree is falling", bemba: "Umuti wandi ulepona" },
{ english: "My trees are falling", bemba: "Imiti yandi ilepona" },
{ english: "My egg is breaking", bemba: "Ilini lyandi liletobeka" },
{ english: "My eggs are breaking", bemba: "Amani yandi yaletobeka" },
{ english: "My chair is breaking", bemba: "Icipuna candi cilekontoka" },
{ english: "My chairs are breaking", bemba: "Ifipuna fyandi filekontoka" },

{ english: "Do not describe someone by their disability", bemba: "Tatulondolola umuntu kubulema bwakwe" },
{ english: "Some body parts are not mentioned in public", bemba: "Ifilundwa fimo ifyamubili tafilumbulwa pa bantu" },
{ english: "It is not polite to ask a woman if she is pregnant", bemba: "Mu Cibemba, te ntambi ukwipusha namayo nga ali pabukulu nangu iyo" },
{ english: "A woman's thighs are not exposed in public", bemba: "Mu Zambia amatanta ya mwanakashi tayalangwa pa mbilibili" },
{ english: "It is not polite for a man to insist on asking what a woman is suffering from", bemba: "Temucinshi umwaume ukwipukishisha namaayo ifyo alewala" },
{ english: "Some diseases are not mentioned in public", bemba: "Amalwale yamo yamo tayalumbulwa pa bantu" },
  // Lesson 5–6 vocabulary and useful expressions

{ english: "I am now full", bemba: "Naikuta" },
{ english: "I am full", bemba: "Ninjikuta" },
{ english: "I am thirsty", bemba: "Ndi ne cilaka" },
{ english: "I have eaten", bemba: "Nindya" },
{ english: "I haven't eaten", bemba: "Nshilile" },
{ english: "I'm hungry", bemba: "Ndi ne nsala" },
{ english: "I feel hungry", bemba: "Naumfwa insala" },

{ english: "I always eat nshima with meat", bemba: "Ndalya ubwali ne nama" },
{ english: "You always eat chicken", bemba: "Mulalye inkoko" },
{ english: "They always eat potatoes", bemba: "Balalya ifyumbu" },
{ english: "We always eat rice", bemba: "Tulalya umupunga" },
{ english: "I don't always eat nshima with fish", bemba: "Nshilya ubwali ne sabi" },
{ english: "You don't always eat beans", bemba: "Tamulya cilemba" },
{ english: "They don't always eat groundnuts", bemba: "Tabalya imbalala" },
{ english: "We don't always eat vegetables", bemba: "Tatulya umusalu" },

{ english: "Head", bemba: "Umutwe" },
{ english: "Hair", bemba: "Umushishi" },
{ english: "Eye", bemba: "Iliinso" },
{ english: "Eyes", bemba: "Ameenso" },
{ english: "Ear", bemba: "Ukutwi" },
{ english: "Ears", bemba: "Amatwi" },
{ english: "Nose", bemba: "Umoona" },
{ english: "Mouth", bemba: "Akanwa" },
{ english: "Lip", bemba: "Umulomo" },
{ english: "Lips", bemba: "Imilomo" },
{ english: "Tongue", bemba: "Ululimi" },
{ english: "Beard", bemba: "Umwefu" },
{ english: "Neck", bemba: "Umukoshi" },
{ english: "Chest", bemba: "Icifuba" },
{ english: "Breast", bemba: "Ibeele" },
{ english: "Stomach", bemba: "Ulufumo" },
{ english: "Pregnancy", bemba: "Ifumo" },
{ english: "Waist", bemba: "Umusana" },
{ english: "Thighs", bemba: "Amatanta" },
{ english: "Knee", bemba: "Ikufi" },
{ english: "Feet", bemba: "Amakasa" },

{ english: "Cold", bemba: "Impepo" },
{ english: "Malaria", bemba: "Malelya" },
{ english: "Syphilis", bemba: "Akaswende" },
{ english: "Gonorrhoea", bemba: "Akasele" },

{ english: "To hide", bemba: "Ukufisa" },
{ english: "To be hidden", bemba: "Ukufiswa" },
{ english: "To be sick", bemba: "Ukulwala" },
{ english: "To think", bemba: "Ukutontonkanya" },
{ english: "To fall", bemba: "Ukupona" },
{ english: "To be happy / to like", bemba: "Ukutemwa" },
{ english: "To be beautiful / to be good", bemba: "Ukuwama" },
{ english: "To be strong / hard", bemba: "Ukukosa" },
{ english: "To burn", bemba: "Ukooca" },
{ english: "To burn", bemba: "Ukupya" },
{ english: "To break", bemba: "Ukukontola" },
{ english: "To be tired", bemba: "Ukunaka" },
{ english: "To get well", bemba: "Ukupola" },
{ english: "To treat / to heal", bemba: "Ukuposha" },
{ english: "To treat / to heal", bemba: "Ukuundapa" },

{ english: "Fat", bemba: "-ina" },
{ english: "Near / short", bemba: "-ipi" },
{ english: "Tall / far / long", bemba: "-tali" },
{ english: "Big", bemba: "-kulu" },
{ english: "Small", bemba: "-nono" },
{ english: "Old", bemba: "-kote" },
{ english: "Good / nice / beautiful", bemba: "-suma" },
{ english: "Lazy", bemba: "-nang'ani" },
{ english: "Raw / fresh", bemba: "-bishi" },
{ english: "Female", bemba: "-anakashi" },
{ english: "Male", bemba: "-aume" },
{ english: "Fearsome", bemba: "-kali" },
{ english: "Bad", bemba: "-bi" },
{ english: "Bad", bemba: "-bipa" },
{ english: "Thin", bemba: "-onda" },
{ english: "Dark", bemba: "-fita" },
{ english: "Dry", bemba: "-uma" },
{ english: "Bitter", bemba: "-lula" },
{ english: "Sweet", bemba: "-lowa" },
{ english: "Difficult / stubborn", bemba: "-shupa" },
{ english: "Rotten", bemba: "-bola" },
{ english: "Ripe / new", bemba: "-pya" },
{ english: "Coward", bemba: "-mwenso" },
{ english: "Shy", bemba: "-nsoni" },
{ english: "Strong / hard", bemba: "-kosa" },

{ english: "My person / guy is coming", bemba: "Umuntu wandi aleisa" },
{ english: "My people are coming", bemba: "Abantu bandi baleisa" },
{ english: "My tree is falling", bemba: "Umuti wandi ulepona" },
{ english: "My trees are falling", bemba: "Imiti yandi ilepona" },
{ english: "My egg is breaking", bemba: "Ilini lyandi liletobeka" },
{ english: "My eggs are breaking", bemba: "Amani yandi yaletobeka" },
{ english: "My chair is breaking", bemba: "Icipuna candi cilekontoka" },
{ english: "My chairs are breaking", bemba: "Ifipuna fyandi filekontoka" },
{ english: "My cow is sick", bemba: "Ing'ombe yandi ilelwala" },
{ english: "My cows are sick", bemba: "Ing'ombe shandi shalelwala" },
{ english: "My foot is hurting", bemba: "Ulukasa lwandi lulekalipa" },
{ english: "My little child is crying", bemba: "Akamwana kandi kalelila" },
{ english: "My little children are crying", bemba: "Utubaana twandi tulelila" },
{ english: "My mat is disappearing", bemba: "Ubutanda bwandi buleluba" },
{ english: "My leg is being chopped", bemba: "Ukuulu kwandi kuleputuka" },
{ english: "In my nsaka it's raining", bemba: "Mu nsaka yandi muleloka" },
{ english: "To my village is becoming far", bemba: "Kumushi wandi kulelepa" },
{ english: "At my house it's raining", bemba: "Pang'anda yandi paleloka" },

{ english: "Short person is coming", bemba: "Umuntu umwipi aleisa" },
{ english: "Short people are coming", bemba: "Abantu abepi baleisa" },
{ english: "A tall tree is falling", bemba: "Umuti uutali ulepona" },
{ english: "Tall trees are falling", bemba: "Imiti iitali ilepona" },
{ english: "A big egg is breaking", bemba: "Ilini ilikulu liletobeka" },
{ english: "Big eggs are breaking", bemba: "Amani ayakulu yaletobeka" },
{ english: "The big chair is falling", bemba: "Icipuna icikulu cilepona" },
{ english: "Big chairs are burning", bemba: "Ifipuna ifikulu filepya" },
{ english: "The small cow is getting sick", bemba: "Ing'ombe iyinono ilelwala" },
{ english: "The small cows are getting sick", bemba: "Ing'ombe ishinono shilelwala" },
{ english: "The big hoe is breaking", bemba: "Ulukasu ulukulu lulekontoka" },
{ english: "The tall small child is crying", bemba: "Akamwaana akatali kalelila" },
{ english: "The tall small children are crying", bemba: "Utubaana ututali tulelila" },
{ english: "The long mat is burning", bemba: "Ubutanda ubutali bulepya" },
{ english: "The small leg is swelling", bemba: "Ukuulu ukunono kulefimba" },

{ english: "This person", bemba: "Umuntu uyu" },
{ english: "That person", bemba: "Umuntu uyo" },
{ english: "That person over there", bemba: "Umuntu ulya" },
{ english: "These people", bemba: "Abantu aba" },
{ english: "Those people", bemba: "Abantu abo" },
{ english: "Those people over there", bemba: "Abantu balya" },
{ english: "This tree", bemba: "Umuti uyu" },
{ english: "That tree", bemba: "Umuti uyo" },
{ english: "That tree over there", bemba: "Umuti ulya" },
{ english: "This chair", bemba: "Icipuna ici" },
{ english: "That chair", bemba: "Icipuna ico" },
{ english: "That chair over there", bemba: "Icipuna cilya" },

{ english: "Umuntu uwabula amaano", bemba: "A child without sense" },
{ english: "Umwana uwabula amaano", bemba: "A child without sense" },
{ english: "Nashi uwabula umwana", bemba: "A nurse without a child" },
{ english: "Umukote uwabula amaka", bemba: "An old person without power" },
{ english: "Umuntu uwabula incito", bemba: "A person without a job" },

{ english: "Who are Ba Sikota?", bemba: "Bushe ba Sikota ni banaani?" },
{ english: "Ba Sikota are senior members of the PST", bemba: "Ba Sikota bakalamba bamilimo mu PST" },
{ english: "What do Ba Sikota look like?", bemba: "Ba Sikota bamoneka shani?" },
{ english: "They are tall, thin, dark and strong, and they have short hair", bemba: "Batali, abaonda, abafita, abamaka elyo balikwata umushishi uwipi" },

{ english: "Week", bemba: "Umulungu" },
{ english: "On Sunday", bemba: "Pa mulungu" },
{ english: "On Monday", bemba: "Pali cimo" },
{ english: "On Tuesday", bemba: "Pali cibili" },
{ english: "On Wednesday", bemba: "Pali citatu" },
{ english: "On Thursday", bemba: "Pali cine" },
{ english: "On Friday", bemba: "Pali cisano" },
{ english: "On Saturday", bemba: "Pa cibelushi" },
{ english: "Next week", bemba: "Umulungu uleisa" },
{ english: "Last week", bemba: "Umulungu wapwile" },
{ english: "That day", bemba: "Bulya bushiku" },
{ english: "That week", bemba: "Ulya mulungu" },

{ english: "Sun / sunshine / afternoon", bemba: "Akasuba" },
{ english: "Doorway / entrance", bemba: "Umwinshi" },
{ english: "Teeth", bemba: "Ameeno" },
{ english: "A lazy person", bemba: "Umunang'ani" },
{ english: "Field / farm / garden", bemba: "Ibala" },
{ english: "Shoes", bemba: "Insapato" },
{ english: "Office", bemba: "Ofesi" },
{ english: "Door", bemba: "Iciibi" },
{ english: "School", bemba: "Isukulu" },

{ english: "It is dark / It is late", bemba: "Bwaila" },
{ english: "It is dawn", bemba: "Bwacha" },
{ english: "What time is it?", bemba: "Ninshita nshi?" },
{ english: "I always wake up at six o'clock", bemba: "Ndabuuka pa 6 koloko" },
{ english: "What day is it today?", bemba: "Lelo nipali cinga?" },

{ english: "I woke up", bemba: "Nacibuuka" },
{ english: "You bathed", bemba: "Mwacisamba" },
{ english: "They shaved", bemba: "Bacibeya" },
{ english: "We combed", bemba: "Twacisakuula" },
{ english: "You didn't wake up", bemba: "Tamwacibuuka" },

{ english: "To come", bemba: "Ukwisa" },
{ english: "To play / have fun", bemba: "Ukwangala" },
{ english: "To comb hair", bemba: "Ukusaakula" },
{ english: "To cook", bemba: "Ukwipika" },
{ english: "To brush the teeth", bemba: "Ukukuusa ameeno" },
{ english: "To bathe", bemba: "Ukusamba" },
{ english: "To play sport", bemba: "Ukuteya" },
{ english: "To keep", bemba: "Ukusunga" },

{ english: "When visitors come home, the hosts wake up very early", bemba: "Pa ng'anda nga paisa abeeni abene ba ng'anda bafwile ukubuuka bwangu bwangu" },
{ english: "A woman is never considered a visitor", bemba: "Namayo nga atandala tamoniwa ngo mweni" },
{ english: "She can easily get involved in the housework", bemba: "Nga kuli incito afwile ukubombela pamo na banamayo banankwe" },
{ english: "Keep time", bemba: "Ukusunga inshita" },
{ english: "Be available where you are needed", bemba: "Nokusangwa konse uko mulefwaikwa" },

{ english: "The noun is the centre of the sentence", bemba: "In Bemba the noun is the centre of the sentence" },
{ english: "To brush", bemba: "Ukukuusa" },
{ english: "To sleep", bemba: "Ukulaala" },
{ english: "To harvest", bemba: "Ukuaeepa" },
{ english: "To sing", bemba: "Ukwiimba" },
{ english: "Nose", bemba: "Umoona" },
{ english: "To undress", bemba: "Ukufuula" },
{ english: "Our people", bemba: "Abeesu" },
{ english: "Without plates", bemba: "Ukwabule mbale" },
{ english: "Those that breastfeed", bemba: "Aboonsha" },
{ english: "Legs", bemba: "Amoolu" },

{ english: "Small skull / small stretch of bush", bemba: "akapanga" },
{ english: "Small sheep / lamb", bemba: "akapanga" },
{ english: "Small sword", bemba: "akapanga" },
  // Lesson 5–6 vocabulary and useful expressions

{ english: "I am now full", bemba: "Naikuta" },
{ english: "I am full", bemba: "Ninjikuta" },
{ english: "I am thirsty", bemba: "Ndi ne cilaka" },
{ english: "I have eaten", bemba: "Nindya" },
{ english: "I haven't eaten", bemba: "Nshilile" },
{ english: "I'm hungry", bemba: "Ndi ne nsala" },
{ english: "I feel hungry", bemba: "Naumfwa insala" },

{ english: "I always eat nshima with meat", bemba: "Ndalya ubwali ne nama" },
{ english: "You always eat chicken", bemba: "Mulalye inkoko" },
{ english: "They always eat potatoes", bemba: "Balalya ifyumbu" },
{ english: "We always eat rice", bemba: "Tulalya umupunga" },
{ english: "I don't always eat nshima with fish", bemba: "Nshilya ubwali ne sabi" },
{ english: "You don't always eat beans", bemba: "Tamulya cilemba" },
{ english: "They don't always eat groundnuts", bemba: "Tabalya imbalala" },
{ english: "We don't always eat vegetables", bemba: "Tatulya umusalu" },

{ english: "Head", bemba: "Umutwe" },
{ english: "Hair", bemba: "Umushishi" },
{ english: "Eye", bemba: "Iliinso" },
{ english: "Eyes", bemba: "Ameenso" },
{ english: "Ear", bemba: "Ukutwi" },
{ english: "Ears", bemba: "Amatwi" },
{ english: "Nose", bemba: "Umoona" },
{ english: "Mouth", bemba: "Akanwa" },
{ english: "Lip", bemba: "Umulomo" },
{ english: "Lips", bemba: "Imilomo" },
{ english: "Tongue", bemba: "Ululimi" },
{ english: "Beard", bemba: "Umwefu" },
{ english: "Neck", bemba: "Umukoshi" },
{ english: "Chest", bemba: "Icifuba" },
{ english: "Breast", bemba: "Ibeele" },
{ english: "Stomach", bemba: "Ulufumo" },
{ english: "Pregnancy", bemba: "Ifumo" },
{ english: "Waist", bemba: "Umusana" },
{ english: "Thighs", bemba: "Amatanta" },
{ english: "Knee", bemba: "Ikufi" },
{ english: "Feet", bemba: "Amakasa" },

{ english: "Cold", bemba: "Impepo" },
{ english: "Malaria", bemba: "Malelya" },
{ english: "Syphilis", bemba: "Akaswende" },
{ english: "Gonorrhoea", bemba: "Akasele" },

{ english: "To hide", bemba: "Ukufisa" },
{ english: "To be hidden", bemba: "Ukufiswa" },
{ english: "To be sick", bemba: "Ukulwala" },
{ english: "To think", bemba: "Ukutontonkanya" },
{ english: "To fall", bemba: "Ukupona" },
{ english: "To be happy / to like", bemba: "Ukutemwa" },
{ english: "To be beautiful / to be good", bemba: "Ukuwama" },
{ english: "To be strong / hard", bemba: "Ukukosa" },
{ english: "To burn", bemba: "Ukooca" },
{ english: "To burn", bemba: "Ukupya" },
{ english: "To break", bemba: "Ukukontola" },
{ english: "To be tired", bemba: "Ukunaka" },
{ english: "To get well", bemba: "Ukupola" },
{ english: "To treat / to heal", bemba: "Ukuposha" },
{ english: "To treat / to heal", bemba: "Ukuundapa" },

{ english: "Fat", bemba: "-ina" },
{ english: "Near / short", bemba: "-ipi" },
{ english: "Tall / far / long", bemba: "-tali" },
{ english: "Big", bemba: "-kulu" },
{ english: "Small", bemba: "-nono" },
{ english: "Old", bemba: "-kote" },
{ english: "Good / nice / beautiful", bemba: "-suma" },
{ english: "Lazy", bemba: "-nang'ani" },
{ english: "Raw / fresh", bemba: "-bishi" },
{ english: "Female", bemba: "-anakashi" },
{ english: "Male", bemba: "-aume" },
{ english: "Fearsome", bemba: "-kali" },
{ english: "Bad", bemba: "-bi" },
{ english: "Bad", bemba: "-bipa" },
{ english: "Thin", bemba: "-onda" },
{ english: "Dark", bemba: "-fita" },
{ english: "Dry", bemba: "-uma" },
{ english: "Bitter", bemba: "-lula" },
{ english: "Sweet", bemba: "-lowa" },
{ english: "Difficult / stubborn", bemba: "-shupa" },
{ english: "Rotten", bemba: "-bola" },
{ english: "Ripe / new", bemba: "-pya" },
{ english: "Coward", bemba: "-mwenso" },
{ english: "Shy", bemba: "-nsoni" },
{ english: "Strong / hard", bemba: "-kosa" },

{ english: "My person / guy is coming", bemba: "Umuntu wandi aleisa" },
{ english: "My people are coming", bemba: "Abantu bandi baleisa" },
{ english: "My tree is falling", bemba: "Umuti wandi ulepona" },
{ english: "My trees are falling", bemba: "Imiti yandi ilepona" },
{ english: "My egg is breaking", bemba: "Ilini lyandi liletobeka" },
{ english: "My eggs are breaking", bemba: "Amani yandi yaletobeka" },
{ english: "My chair is breaking", bemba: "Icipuna candi cilekontoka" },
{ english: "My chairs are breaking", bemba: "Ifipuna fyandi filekontoka" },
{ english: "My cow is sick", bemba: "Ing'ombe yandi ilelwala" },
{ english: "My cows are sick", bemba: "Ing'ombe shandi shalelwala" },
{ english: "My foot is hurting", bemba: "Ulukasa lwandi lulekalipa" },
{ english: "My little child is crying", bemba: "Akamwana kandi kalelila" },
{ english: "My little children are crying", bemba: "Utubaana twandi tulelila" },
{ english: "My mat is disappearing", bemba: "Ubutanda bwandi buleluba" },
{ english: "My leg is being chopped", bemba: "Ukuulu kwandi kuleputuka" },
{ english: "In my nsaka it's raining", bemba: "Mu nsaka yandi muleloka" },
{ english: "To my village is becoming far", bemba: "Kumushi wandi kulelepa" },
{ english: "At my house it's raining", bemba: "Pang'anda yandi paleloka" },

{ english: "Short person is coming", bemba: "Umuntu umwipi aleisa" },
{ english: "Short people are coming", bemba: "Abantu abepi baleisa" },
{ english: "A tall tree is falling", bemba: "Umuti uutali ulepona" },
{ english: "Tall trees are falling", bemba: "Imiti iitali ilepona" },
{ english: "A big egg is breaking", bemba: "Ilini ilikulu liletobeka" },
{ english: "Big eggs are breaking", bemba: "Amani ayakulu yaletobeka" },
{ english: "The big chair is falling", bemba: "Icipuna icikulu cilepona" },
{ english: "Big chairs are burning", bemba: "Ifipuna ifikulu filepya" },
{ english: "The small cow is getting sick", bemba: "Ing'ombe iyinono ilelwala" },
{ english: "The small cows are getting sick", bemba: "Ing'ombe ishinono shilelwala" },
{ english: "The big hoe is breaking", bemba: "Ulukasu ulukulu lulekontoka" },
{ english: "The tall small child is crying", bemba: "Akamwaana akatali kalelila" },
{ english: "The tall small children are crying", bemba: "Utubaana ututali tulelila" },
{ english: "The long mat is burning", bemba: "Ubutanda ubutali bulepya" },
{ english: "The small leg is swelling", bemba: "Ukuulu ukunono kulefimba" },

{ english: "This person", bemba: "Umuntu uyu" },
{ english: "That person", bemba: "Umuntu uyo" },
{ english: "That person over there", bemba: "Umuntu ulya" },
{ english: "These people", bemba: "Abantu aba" },
{ english: "Those people", bemba: "Abantu abo" },
{ english: "Those people over there", bemba: "Abantu balya" },
{ english: "This tree", bemba: "Umuti uyu" },
{ english: "That tree", bemba: "Umuti uyo" },
{ english: "That tree over there", bemba: "Umuti ulya" },
{ english: "This chair", bemba: "Icipuna ici" },
{ english: "That chair", bemba: "Icipuna ico" },
{ english: "That chair over there", bemba: "Icipuna cilya" },

{ english: "Umuntu uwabula amaano", bemba: "A child without sense" },
{ english: "Umwana uwabula amaano", bemba: "A child without sense" },
{ english: "Nashi uwabula umwana", bemba: "A nurse without a child" },
{ english: "Umukote uwabula amaka", bemba: "An old person without power" },
{ english: "Umuntu uwabula incito", bemba: "A person without a job" },

{ english: "Who are Ba Sikota?", bemba: "Bushe ba Sikota ni banaani?" },
{ english: "Ba Sikota are senior members of the PST", bemba: "Ba Sikota bakalamba bamilimo mu PST" },
{ english: "What do Ba Sikota look like?", bemba: "Ba Sikota bamoneka shani?" },
{ english: "They are tall, thin, dark and strong, and they have short hair", bemba: "Batali, abaonda, abafita, abamaka elyo balikwata umushishi uwipi" },

{ english: "Week", bemba: "Umulungu" },
{ english: "On Sunday", bemba: "Pa mulungu" },
{ english: "On Monday", bemba: "Pali cimo" },
{ english: "On Tuesday", bemba: "Pali cibili" },
{ english: "On Wednesday", bemba: "Pali citatu" },
{ english: "On Thursday", bemba: "Pali cine" },
{ english: "On Friday", bemba: "Pali cisano" },
{ english: "On Saturday", bemba: "Pa cibelushi" },
{ english: "Next week", bemba: "Umulungu uleisa" },
{ english: "Last week", bemba: "Umulungu wapwile" },
{ english: "That day", bemba: "Bulya bushiku" },
{ english: "That week", bemba: "Ulya mulungu" },

{ english: "Sun / sunshine / afternoon", bemba: "Akasuba" },
{ english: "Doorway / entrance", bemba: "Umwinshi" },
{ english: "Teeth", bemba: "Ameeno" },
{ english: "A lazy person", bemba: "Umunang'ani" },
{ english: "Field / farm / garden", bemba: "Ibala" },
{ english: "Shoes", bemba: "Insapato" },
{ english: "Office", bemba: "Ofesi" },
{ english: "Door", bemba: "Iciibi" },
{ english: "School", bemba: "Isukulu" },

{ english: "It is dark / It is late", bemba: "Bwaila" },
{ english: "It is dawn", bemba: "Bwacha" },
{ english: "What time is it?", bemba: "Ninshita nshi?" },
{ english: "I always wake up at six o'clock", bemba: "Ndabuuka pa 6 koloko" },
{ english: "What day is it today?", bemba: "Lelo nipali cinga?" },

{ english: "I woke up", bemba: "Nacibuuka" },
{ english: "You bathed", bemba: "Mwacisamba" },
{ english: "They shaved", bemba: "Bacibeya" },
{ english: "We combed", bemba: "Twacisakuula" },
{ english: "You didn't wake up", bemba: "Tamwacibuuka" },

{ english: "To come", bemba: "Ukwisa" },
{ english: "To play / have fun", bemba: "Ukwangala" },
{ english: "To comb hair", bemba: "Ukusaakula" },
{ english: "To cook", bemba: "Ukwipika" },
{ english: "To brush the teeth", bemba: "Ukukuusa ameeno" },
{ english: "To bathe", bemba: "Ukusamba" },
{ english: "To play sport", bemba: "Ukuteya" },
{ english: "To keep", bemba: "Ukusunga" },

{ english: "When visitors come home, the hosts wake up very early", bemba: "Pa ng'anda nga paisa abeeni abene ba ng'anda bafwile ukubuuka bwangu bwangu" },
{ english: "A woman is never considered a visitor", bemba: "Namayo nga atandala tamoniwa ngo mweni" },
{ english: "She can easily get involved in the housework", bemba: "Nga kuli incito afwile ukubombela pamo na banamayo banankwe" },
{ english: "Keep time", bemba: "Ukusunga inshita" },
{ english: "Be available where you are needed", bemba: "Nokusangwa konse uko mulefwaikwa" },

{ english: "The noun is the centre of the sentence", bemba: "In Bemba the noun is the centre of the sentence" },
{ english: "To brush", bemba: "Ukukuusa" },
{ english: "To sleep", bemba: "Ukulaala" },
{ english: "To harvest", bemba: "Ukuaeepa" },
{ english: "To sing", bemba: "Ukwiimba" },
{ english: "Nose", bemba: "Umoona" },
{ english: "To undress", bemba: "Ukufuula" },
{ english: "Our people", bemba: "Abeesu" },
{ english: "Without plates", bemba: "Ukwabule mbale" },
{ english: "Those that breastfeed", bemba: "Aboonsha" },
{ english: "Legs", bemba: "Amoolu" },

{ english: "Small skull / small stretch of bush", bemba: "akapanga" },
{ english: "Small sheep / lamb", bemba: "akapanga" },
{ english: "Small sword", bemba: "akapanga" },
  { english: "Untie", bemba: "Ukukakula" },
{ english: "Be upright / walk on two legs / stretch", bemba: "Ukololoka" },
{ english: "Uproot", bemba: "Ukunukula" },
{ english: "Urinate / pee", bemba: "Ukusunda" },
{ english: "Visit", bemba: "Ukutandala" },
{ english: "Wait", bemba: "Ukulolela" },
{ english: "Wait", bemba: "Ukupembela" },
{ english: "Wait for / spend time", bemba: "Ukulinda" },
{ english: "Wake", bemba: "Ukubuuka" },
{ english: "Wake", bemba: "Ukwolola" },
{ english: "Wake someone", bemba: "Ukubuusha" },
{ english: "Walk / travel", bemba: "Ukuenda" },
{ english: "Wander", bemba: "Ukwendauka" },
{ english: "Want / look for", bemba: "Ukufwaya" },
{ english: "Warn / make someone aware", bemba: "Ukusalapula" },
{ english: "Be careful", bemba: "Ukucenjela" },
{ english: "Make someone aware / warn", bemba: "Ukucenjesha" },
{ english: "Wash body", bemba: "Ukusamba" },
{ english: "Wash clothes", bemba: "Ukuwasha" },
{ english: "Wash dishes / food / things", bemba: "Ukusamfya" },
{ english: "Watch", bemba: "Ukutamba" },
{ english: "Wear", bemba: "Ukufwala" },
{ english: "Welcome", bemba: "Ukusekelela" },
{ english: "Welcome", bemba: "Ukusengela" },
{ english: "Welcome", bemba: "Ukupokelela" },
{ english: "Be wet", bemba: "Ukubomba" },
{ english: "Whistle", bemba: "Ukulisha umunsoli" },
{ english: "Be white", bemba: "Ukubuta" },
{ english: "Wilt", bemba: "Ukubonsa" },
{ english: "Winnow", bemba: "Ukulela" },
{ english: "Winnow", bemba: "Ukusensebula" },
{ english: "Winnow", bemba: "Ukupепula" },
{ english: "Wish / want", bemba: "Ukufwaya" },
{ english: "Wonder", bemba: "Ukupapa" },
{ english: "Wonder", bemba: "Ukupapuka" },
{ english: "Work", bemba: "Ukubomba" },
{ english: "Worry", bemba: "Ukusakamana" },
{ english: "Write", bemba: "Ukulemba" },
{ english: "Yawn", bemba: "Ukuaula" },
{ english: "Yell / shout / scream", bemba: "Ukupunda" },
{ english: "Zoom", bemba: "Ukukusha" },
  { english: "Suffer", bemba: "Ukucula" },
{ english: "Suit / fit", bemba: "Ukulingana" },
{ english: "Be sunny", bemba: "Ukubalika" },
{ english: "Be surprised", bemba: "Ukupapa" },
{ english: "Be surprised", bemba: "Ukusunguka" },
{ english: "Survive", bemba: "Ukupusuka" },
{ english: "Suspect", bemba: "Ukutunganya" },
{ english: "Sweep", bemba: "Ukupyanga" },
{ english: "Be sweet", bemba: "Ukulowa" },
{ english: "Swell / be swollen", bemba: "Ukufimba" },
{ english: "Swim", bemba: "Ukuowa" },
{ english: "Take", bemba: "Ukubuula" },
{ english: "Take off a fire", bemba: "Ukupuula" },
{ english: "Take a picture", bemba: "Ukukopa" },
{ english: "Take to / carry to", bemba: "Ukutwala" },
{ english: "Talk / speak", bemba: "Ukulanda" },
{ english: "Talk / speak", bemba: "Ukusosa" },
{ english: "Taste", bemba: "Ukuumfwika" },
{ english: "Taste", bemba: "Ukumyanga" },
{ english: "Taste", bemba: "Ukuesha" },
{ english: "Taste", bemba: "Ukupima" },
{ english: "Taste", bemba: "Ukusonda" },
{ english: "Teach / educate", bemba: "Ukufunda" },
{ english: "Tell someone", bemba: "Ukweba" },
{ english: "Tell yourself", bemba: "Ukwiyeba" },
{ english: "Tempt", bemba: "Ukutunka" },
{ english: "Be terrible / be angry / feel pain", bemba: "Ukukalipa" },
{ english: "Test / examine", bemba: "Ukuesha" },
{ english: "Be tested / examined", bemba: "Ukueshiwa" },
    { english: "Suffer", bemba: "Ukucula" },
  { english: "Suit / fit", bemba: "Ukulingana" },
  { english: "Be sunny", bemba: "Ukubalika" },
  { english: "Be surprised", bemba: "Ukupapa / ukusunguka" },
  { english: "Survive", bemba: "Ukupusuka" },
  { english: "Suspect", bemba: "Ukutunganya" },
  { english: "Sweep", bemba: "Ukupyanga" },
  { english: "Be sweet", bemba: "Ukulowa" },
  { english: "Swell / be swollen", bemba: "Ukufimba" },
  { english: "Swim", bemba: "Ukuowa" },
  { english: "Take", bemba: "Ukubuula" },
  { english: "Take off a fire", bemba: "Ukuipuula" },
  { english: "Take a picture", bemba: "Ukukopa" },
  { english: "Take to / carry to", bemba: "Ukutwala" },
  { english: "Talk / speak", bemba: "Ukulanda / ukusosa" },
  { english: "Taste", bemba: "Ukumfwika / ukumyangaa / ukuesha / ukupima / ukusonda" },
  { english: "Teach / educate", bemba: "Ukufunda" },
  { english: "Be sick", bemba: "Ukulwala" },
  { english: "Sift / sieve", bemba: "Ukunyunga" },
  { english: "Be silent", bemba: "Ukukala tondolo" },
  { english: "Be similar", bemba: "Ukupalana" },
  { english: "Sin", bemba: "Ukubembuka" },
  { english: "Sing", bemba: "Ukuimba" },
  { english: "Sink poles (add layers of soil and compress around pole)", bemba: "Ukushindaila" },
  { english: "Sit or live / stay", bemba: "Ukwikala" },
  { english: "Skip / miss an event or escape", bemba: "Ukufyuka" },
  { english: "Slash", bemba: "Ukukumpa" },
  { english: "Smear (mud, mortar, etc.)", bemba: "Ukushinga" },
  { english: "Smell bad", bemba: "Ukununka" },
  { english: "Smell good", bemba: "Ukununkila" },
  { english: "Smell / sniff", bemba: "Ukununsha" },
  { english: "Smile", bemba: "Ukumwentula" },
  { english: "Smoke", bemba: "Ukupeepa" },
  { english: "Snap", bemba: "Ukulisha iminwe" },
  { english: "Sneeze", bemba: "Ukutesula" },
  { english: "Be soft (cloth, fur, etc.)", bemba: "Ukunaaka" },
  { english: "Be soft (food)", bemba: "Ukuteka" },
  { english: "Solve (problems)", bemba: "Ukupikulula (mpika)" },
  { english: "Sort / organize", bemba: "Ukusalulula / ukusobolola" },
  { english: "Speak / talk", bemba: "Ukulanda / ukusosa" },
  { english: "Spend", bemba: "Ukuposaika" },
  { english: "Spend energy / strength", bemba: "Ukuposa amaka" },
  { english: "Spend time", bemba: "Ukuposa inshita" },
  { english: "Spoil", bemba: "Ukunaula" },
  { english: "Spread", bemba: "Ukusabankanya" },
  { english: "Spread disease", bemba: "Ukusalanganishwa" },
  { english: "Squeeze / wring", bemba: "Ukufikina" },
  { english: "Stand", bemba: "Ukuimanina" },
  { english: "Start / begin", bemba: "Ukutendeka / ukutampa" },
  { english: "Stay / live or sit", bemba: "Ukwikala" },
  { english: "Steal", bemba: "Ukuiba" },
  { english: "Step on", bemba: "Ukunyanta" },
  { english: "Be sticky", bemba: "Ukulimbjluka" },
  { english: "Stir", bemba: "Ukukumba" },
  { english: "Stir nshima", bemba: "Ukunaya" },
  { english: "Stop", bemba: "Ukuleka / ukulesha / ukuiminika" },
  { english: "Strengthen", bemba: "Ukuikosha" },
  { english: "Stretch or walk on two legs", bemba: "Ukololoka" },
  { english: "Strip leaves", bemba: "Ukuangula" },
  { english: "Be strong / hard / stiff / difficult", bemba: "Ukukosa" },
  { english: "Struggle", bemba: "Ukwilwikana" },
  { english: "Be stubborn", bemba: "Ukushupa" },
  { english: "Study", bemba: "Ukusoma" },
  { english: "Be stupid", bemba: "Ukutumpa" },
  { english: "Stutter", bemba: "Ukumamanya" },
  { english: "Subtract", bemba: "Ukufumya(po)" },
    { english: "Reduce", bemba: "Ukucifya" },
  { english: "Reduce price", bemba: "Ukubwesha" },
  { english: "Refuse", bemba: "Ukukana" },
  { english: "Regard", bemba: "Ukukuma" },
  { english: "Relax / rest", bemba: "Ukutusha" },
  { english: "Remain", bemba: "Ukushala" },
  { english: "Remember", bemba: "Ukubukisha" },
  { english: "Remind (yourself or others)", bemba: "Ukubukisha" },
  { english: "Remove", bemba: "Ukufumya" },
  { english: "Repair / fix", bemba: "Ukulungisha" },
  { english: "Repeat", bemba: "Ukubwekesha" },
  { english: "Repent", bemba: "Ukulapila" },
  { english: "Report / tell", bemba: "Ukubelela" },
  { english: "Represent", bemba: "Ukuiminina" },
  { english: "Resist", bemba: "Ukushipa" },
  { english: "Respect", bemba: "Ukucindika" },
  { english: "Respond", bemba: "Ukutila" },
  { english: "Return (coming back)", bemba: "Ukubwela" },
  { english: "Return (going back)", bemba: "Ukubwelela" },
  { english: "Return home", bemba: "Ukubwelela mo" },
  { english: "Return object or money", bemba: "Ukutubwesesha" },
  { english: "Reveal", bemba: "Ukusokolola" },
  { english: "Ride", bemba: "Ukucofa" },
  { english: "Be righteous", bemba: "Ukupwililika" },
  { english: "Rip / split / tear", bemba: "Ukulepuka / ukumokola" },
  { english: "Be ripe", bemba: "Ukupya" },
  { english: "Rise (sun, plant, etc.)", bemba: "Ukutula" },
  { english: "Roll", bemba: "Ukukunkulusha" },
  { english: "Roll nshima in palm (into a bowl)", bemba: "Ukusolonga (lukondwa)" },
  { english: "Rot / be rotten", bemba: "Ukubola" },
  { english: "Ruin", bemba: "Ukubongolola" },
  { english: "Run", bemba: "Ukubutuka" },
  { english: "Be safe", bemba: "Ukupusuka" },
  { english: "Save", bemba: "Ukupususha" },
  { english: "Scrape", bemba: "Ukukololola" },
  { english: "Scratch", bemba: "Ukufwena" },
  { english: "See through", bemba: "Ukumwena" },
  { english: "See / look / view", bemba: "Ukumona" },
  { english: "Select / choose", bemba: "Ukusala / ukusobolola" },
  { english: "Be selfish", bemba: "Ukutemwa" },
  { english: "Sell", bemba: "Ukushitisha" },
  { english: "Send", bemba: "Ukutuma" },
  { english: "Be serious / concentrate", bemba: "Ukusakamikwa" },
  { english: "Set / drop (like sunset)", bemba: "Ukuwa" },
  { english: "Shake", bemba: "Ukusuka / ukusukunsha / ukusukunkanya" },
  { english: "Share", bemba: "Ukukanya" },
  { english: "Shiver", bemba: "Ukututuma" },
  { english: "Shout / scream / yell", bemba: "Ukupunda" },
  { english: "Show", bemba: "Ukulanga / ukulanga ko" },
  ];

