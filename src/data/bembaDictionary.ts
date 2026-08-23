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
  ];

