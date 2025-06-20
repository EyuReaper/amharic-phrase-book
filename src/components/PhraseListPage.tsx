import React, { useRef } from 'react';

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

// PhraseListPage Component
// Component for displaying phrases within a selected category
const PhraseListPage: React.FC<{
  category: Category;
  onBack: () => void;
}> = ({ category, onBack }) => {
  const topRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    // Scroll the window to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-3xl p-6 space-y-4 bg-white border border-gray-200 shadow-xl rounded-2xl animate-fade-in">
      <div ref={topRef} />
      <button
        onClick={onBack}
        className="flex items-center px-4 py-2 mb-4 font-semibold text-gray-800 transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Categories
      </button>
      <h2 className="mb-6 text-3xl font-extrabold text-center text-indigo-800">{category.name} Phrases</h2>
      <div className="space-y-3">
        {category.phrases.length > 0 ? (
          category.phrases.map((phrase: Phrase) => (
            <div key={phrase.id} className="flex items-start p-4 border border-indigo-100 rounded-lg shadow-sm bg-indigo-50">
              <div className="flex-grow">
                <p className="mb-1 text-xl font-medium text-indigo-900">
                  {phrase.amharic}
                  <span className="ml-2 text-sm italic text-gray-600">[{phrase.pronunciation}]</span>
                </p>
                <p className="text-lg text-gray-700">{phrase.english}</p>
                {phrase.notes && (
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="font-semibold">Notes:</span> {phrase.notes}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No phrases available for this category.</p>
        )}
      </div>
      {/* Scroll to Top Button */}
      {category.phrases.length > 8 && (
        <button
          onClick={handleScrollToTop}
          className="fixed z-50 px-4 py-2 text-white transition bg-indigo-600 rounded-full shadow-lg bottom-8 right-8 hover:bg-indigo-800"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PhraseListPage;

export {}; // Added at the end of the file to make it a module
