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

// CategoryCard Component (Moved here to resolve import error)
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


// Component for displaying the list of categories
const CategoryListPage: React.FC<{
  categories: Category[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectCategory: (category: Category) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ categories, searchTerm, onSearchChange, onSelectCategory, currentPage, totalPages, onPageChange }) => {
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* Search Bar */}
      <div className="w-full max-w-3xl px-4 mb-8">
        <input
          type="text"
          placeholder="Search phrases (Amharic, English, or Notes)..."
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg placeholder-gray-400 transition duration-200 ease-in-out transform hover:scale-[1.01]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Category Grid */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 px-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.length > 0 ? (
          currentItems.map(category => (
            <CategoryCard key={category.id} category={category} onSelect={onSelectCategory} />
          ))
        ) : (
          <p className="py-8 text-lg text-center text-gray-500 col-span-full">No categories found matching "{searchTerm}".</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out
                ${currentPage === page ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white hover:shadow'}
              `}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryListPage;
