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

// Example mapping of category names to placeholder images
const categoryImages: Record<string, string> = {
  Basic: '/images/basic.png',
  Greetings: 'https://placehold.co/300x180/87CEEB/333?text=Greetings',
  Food: 'https://placehold.co/300x180/FFB347/333?text=Food',
  Travel: 'https://placehold.co/300x180/90EE90/333?text=Travel',
  Shopping: 'https://placehold.co/300x180/FF69B4/333?text=Shopping',
  // Add more categories as needed
};

const getCategoryImage = (categoryName: string) =>
  categoryImages[categoryName] ||
  `https://placehold.co/300x180/EEE/666?text=${encodeURIComponent(categoryName.charAt(0).toUpperCase())}`;

// CategoryCard Component
// Component for a single category card on the category list page
const CategoryCard: React.FC<{
  category: Category;
  onSelect: (category: Category) => void;
}> = React.memo(({ category, onSelect }) => {
  return (
    <button
      className="relative flex flex-col items-center justify-center p-6 overflow-hidden text-center transition-all duration-300 bg-white border border-gray-200 shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:scale-105"
      onClick={() => onSelect(category)}
      style={{ minHeight: 180 }}
    >
      {/* Category-based background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('${getCategoryImage(category.name)}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <h3 className="mb-2 text-2xl font-semibold text-indigo-700">{category.name}</h3>
        <p className="text-gray-600">{category.phrases.length} phrases</p>
      </div>
    </button>
  );
});

export default CategoryCard;
