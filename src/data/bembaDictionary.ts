// src/data/bembaDictionary.ts

export type BembaDictionaryEntry = {
  english: string;
  bemba: string;
};

export const bembaDictionary: BembaDictionaryEntry[] = [
  // =========================================================
  // BASIC PHRASES
  // =========================================================

  { english: "yes", bemba: "ee" },
  { english: "no", bemba: "awe" },
  { english: "how are you", bemba: "Uli shani?" },
  { english: "how are you informal", bemba: "Uli shani?" },
  { english: "how are you formal", bemba: "Muli shani?" },
  { english: "goodbye", bemba: "Shaleenipo" },
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
  // HELP
  // =========================================================

  { english: "help", bemba: "ubwafwilisho" },
  { english: "help me", bemba: "ngafwa" },
  { english: "help me informal", bemba: "ngafwako" },
  { english: "help me formal", bemba: "ngafweni" },
  { english: "help me plural/formal", bemba: "ngafweniko" },

  // =========================================================
  // GREETINGS
  // =========================================================

  { english: "hello", bemba: "Mwapola" },
  { english: "hi", bemba: "Mwapola" },
  { english: "hello formal", bemba: "Mwapola" },
  { english: "hello informal", bemba: "Mwapoleni" },
  { english: "response to hello", bemba: "Endita mukwai" },

  { english: "how are you", bemba: "Uli shani?" },
  { english: "how are you formal", bemba: "Muli shani?" },
  { english: "how are you plural", bemba: "Muli shani?" },
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
  { english: "thanks response to sleep well", bemba: "Natasha" },

  { english: "welcome", bemba: "Mwaiseni" },
  { english: "welcome response", bemba: "Endita mukwai" },

  { english: "bye", bemba: "Kafikenipo" },
  { english: "fare well", bemba: "Kafikenipo" },
  { english: "stay well", bemba: "Shalenipo" },

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

  { english: "first month", bemba: "umweshi walenga cimo" },
  { english: "second month", bemba: "umweshi walenga chibili" },
  { english: "third month", bemba: "umweshi walenga chitatu" },
  { english: "fourth month", bemba: "umweshi walenga chine" },
  { english: "fifth month", bemba: "umweshi walenga chisano" },
  { english: "sixth month", bemba: "umweshi walenga mutanda" },
  { english: "seventh month", bemba: "umweshi walenga chine lubali" },
  { english: "eighth month", bemba: "umweshi walenga cine konse konse" },
  { english: "ninth month", bemba: "umweshi walenga pabula" },
  { english: "tenth month", bemba: "umweshi walenga ikumi" },
  { english: "eleventh month", bemba: "umweshi walenga ikumi na umo" },
  { english: "twelfth month", bemba: "umweshi walenga ikumi na ibili" },

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
  // BODY PARTS
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
  { english: "arm", bemba: "Ukuboko" },
  { english: "arms", bemba: "Amaboko" },
  { english: "finger", bemba: "Umunwe" },
  { english: "fingers", bemba: "Iminwe" },
  { english: "thumb", bemba: "Ichikumo" },
  { english: "thumbs", bemba: "Ifikumo" },
  { english: "small short finger", bemba: "Akantengelesha" },
  { english: "hand", bemba: "Ukuboko" },
  { english: "hands
