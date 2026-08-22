export type TranslationHistoryItem = {
  id: string;
  english: string;
  bemba: string;
  createdAt: number;
};

const STORAGE_KEY = "bembatranslate_history";

function readHistory(): TranslationHistoryItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("[History] Failed to read history:", error);
    return [];
  }
}

function saveHistory(items: TranslationHistoryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("[History] Failed to save history:", error);
  }
}

export function getTranslationHistory(): TranslationHistoryItem[] {
  return readHistory();
}

export function addTranslationToHistory(
  english: string,
  bemba: string
): TranslationHistoryItem {
  const item: TranslationHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    english: english.trim(),
    bemba: bemba.trim(),
    createdAt: Date.now(),
  };

  const history = readHistory();

  // Prevent empty translations from being saved.
  if (!item.english || !item.bemba) {
    return item;
  }

  // Put newest translation first.
  const updated = [
    item,
    ...history.filter(
      (existing) =>
        existing.english.toLowerCase() !== item.english.toLowerCase()
    ),
  ];

  // Keep the history reasonably small.
  saveHistory(updated.slice(0, 100));

  return item;
}

export function removeTranslationFromHistory(id: string): void {
  const history = readHistory();

  const updated = history.filter((item) => item.id !== id);

  saveHistory(updated);
}

export function clearTranslationHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("[History] Failed to clear history:", error);
  }
}
