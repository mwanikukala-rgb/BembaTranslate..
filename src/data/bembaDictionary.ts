export interface DictionaryEntry {
  english: string;
  bemba: string;
  alternatives?: string[];
}

export const bembaDictionary: DictionaryEntry[] = [
  { english: "I", bemba: "ine" },
  { english: "me", bemba: "ine" },
  { english: "you", bemba: "iwe" },
  { english: "we", bemba: "ifwe" },
  { english: "they", bemba: "bena" },

  { english: "what", bemba: "cinshi" },
  { english: "where", bemba: "kwi" },
  { english: "when", bemba: "lilali" },
  { english: "who", bemba: "nani" },
  { english: "why", bemba: "mulandu nshi" },
  { english: "how", bemba: "shani" },

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

  // Common words
  { english: "money", bemba: "indalama" },
  { english: "morning", bemba: "mwashibukeni" },
  { english: "good", bemba: "cilyo" },
  { english: "angry", bemba: "nimfulwa" },

  // Quick phrases supplied for BembaTranslate
  { english: "how are you", bemba: "mulishani" },
  { english: "good morning", bemba: "mwashibukeni" },
  { english: "i want money", bemba: "ndefwaya indalama" },
  { english: "where are you", bemba: "ulikwisa" },
  { english: "where are they", bemba: "balikwisa" },
  { english: "i am angry", bemba: "nimfulwa" },
  { english: "i'm angry", bemba: "nimfulwa" }
];

export function searchDictionary(query: string): DictionaryEntry[] {
  const q = query.trim().toLowerCase();

  if (!q) return [];

  return bembaDictionary
    .filter((entry) => {
      return (
        entry.english.toLowerCase().includes(q) ||
        entry.bemba.toLowerCase().includes(q) ||
        entry.alternatives?.some((word) =>
          word.toLowerCase().includes(q)
        )
      );
    })
    .slice(0, 20);
}

export function translateEnglishToBemba(text: string): string {
  const normalized = text.trim().toLowerCase();

  if (!normalized) return "";

  // Exact phrase first
  const exact = bembaDictionary.find(
    (entry) => entry.english.toLowerCase() === normalized
  );

  if (exact) return exact.bemba;

  // Word-by-word fallback
  const words = normalized.split(/\s+/);

  return words
    .map((word) => {
      const match = bembaDictionary.find(
        (entry) => entry.english.toLowerCase() === word
      );

      return match ? match.bemba : word;
    })
    .join(" ");
}
