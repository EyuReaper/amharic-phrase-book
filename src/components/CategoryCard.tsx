import React from 'react';

// Define the structure for a phrase
interface Phrase {
  id: string;
  amharic: string;
  english: string;
  pronunciation: string;
  notes?: string;
}

// Define the structure for a category
interface Category {
  id: string; // Unique ID for the category
  name: string; // Display name for the category (e.g., "Basic")
  phrases: Phrase[];
}

// CategoryCard Component
// Component for a single category card on the category list page
const CategoryCard: React.FC<{
  category: Category;
  onSelect: (category: Category) => void;
}> = React.memo(({ category, onSelect }) => {
  return (
    <button
      className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 bg-white border border-gray-200 shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:scale-105"
      onClick={() => onSelect(category)}
    >
      <h3 className="mb-2 text-2xl font-semibold text-indigo-700">{category.name}</h3>
      <p className="text-gray-600">{category.phrases.length} phrases</p>
    </button>
  );
});

export default CategoryCard;
