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

// PhraseListPage Component
// Component for displaying phrases within a selected category
const PhraseListPage: React.FC<{
  category: Category;
  onBack: () => void;
}> = ({ category, onBack }) => {
  return (
    <div className="w-full max-w-3xl p-6 space-y-4 bg-white border border-gray-200 shadow-xl rounded-2xl animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center px-4 py-2 mb-4 font-semibold text-gray-800 transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
    </div>
  );
};

export default PhraseListPage;

export {}; // Add this at the end of the file to make it a module
