export interface Phrase {
  id: string;
  amharic: string;
  english: string;
  pronunciation: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  phrases: Phrase[];
}

export const processPhraseData = (data: any[]): Category[] => {
  const categoriesMap: Map<string, Category> = new Map();

  data.forEach((item, index) => {
    const rawCategoryName = item.Category;
    const categoryName = (rawCategoryName ?? '').split('/')[0].trim();
    const categoryId = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!categoriesMap.has(categoryId)) {
      categoriesMap.set(categoryId, {
        id: categoryId,
        name: categoryName,
        phrases: [],
      });
    }

    const amharicPhrase = item["Amharic phrase"] ?? '';
    const englishTranslation = item["English translation"] ?? '';
    const phoneticTranslation = item["Phonetic translation"] ?? '';
    const notes = item.Notes ?? '';

    const phrase: Phrase = {
      id: `${categoryId}-${index}`,
      amharic: amharicPhrase,
      english: englishTranslation,
      pronunciation: phoneticTranslation,
      notes: notes,
    };

    categoriesMap.get(categoryId)?.phrases.push(phrase);
  });

  return Array.from(categoriesMap.values());
};
