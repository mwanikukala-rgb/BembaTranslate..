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

 
