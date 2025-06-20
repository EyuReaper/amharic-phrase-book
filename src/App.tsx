import React, { useState, useCallback, useMemo, useEffect } from 'react';

//  the structure for a phrase
export interface Phrase {
  id: string;
  amharic: string;
  english: string;
  pronunciation: string;
  notes?: string;
}

// Defined the structure for a category
export interface Category {
  id: string; // Unique ID for the category
  name: string; // Display name for the category (e.g., "Basic")
  phrases: Phrase[];
}

// CategoryCard Component
// Component for a single category card on the category list page
export const CategoryCard: React.FC<{
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
export const CategoryListPage: React.FC<{
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

// PhraseListPage Component
// Component for displaying phrases within a selected category
export const PhraseListPage: React.FC<{
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

// Raw data from the user's JSON input
const rawPhraseData = [
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "እንኳን ደህና መጣህ።",
      "English translation": "Welcome",
      "Phonetic translation": "ənkwan dähna mäṭṭah",
      "Notes": "Male"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "እንኳን ደህና መጣሽ።",
      "English translation": "Welcome",
      "Phonetic translation": "ənkwan dähna mäṭṭaš",
      "Notes": "Female"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "እንኳን ደህና መጣችሁ።",
      "English translation": "Welcome",
      "Phonetic translation": "ənkwan dähna mäṭṭaččhu",
      "Notes": "Plural"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "ሰላም።",
      "English translation": "Hello",
      "Phonetic translation": "sälam",
      "Notes": "Informal, means \"peace"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "ታዲያስ።",
      "English translation": "Hello",
      "Phonetic translation": "tadyass",
      "Notes": "Informal, means \"how is it?"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "ጤና ይስጥልኝ።",
      "English translation": "Hello",
      "Phonetic translation": "ṭenaisṭəlləň",
      "Notes": "Formal, means \"may God give you health on my behalf"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "እንደምን አለህ፧",
      "English translation": "How are you?",
      "Phonetic translation": "əndämən alläh?",
      "Notes": "Male"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "እንደምን አለሽ፧",
      "English translation": "How are you?",
      "Phonetic translation": "əndämən alläš?",
      "Notes": "Female"
    },
    {
      "Category": "Basic/መሰረታዊ/",
      "Amharic phrase": "እንደምን አላችሁ፧",
      "English translation": "How are you?",
      "Phonetic translation": "əndämən allaččhu?",
      "Notes": "Plural"
    },
    {
      "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና ነኝ።",
    "English translation": "Reply to 'How are you?'",
    "Phonetic translation": "dähna näň",
    "Notes": "I'm fine"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ረጂም ጊዜ ከተለያየን።",
    "English translation": "Long time no see",
    "Phonetic translation": "räǧǧim gize kätäläyayän",
    "Notes": "Informal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ስምህ ማን ነው፧",
    "English translation": "What's your name?",
    "Phonetic translation": "səməh man näw?",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ስምሽ ማን ነው፧",
    "English translation": "What's your name?",
    "Phonetic translation": "səməš man näw?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "የእርስዎ ስም ማን ነው፧",
    "English translation": "What's your name?",
    "Phonetic translation": "yärswo səm man näw?",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "የኔ ስም ... ነው",
    "English translation": "My name is ...",
    "Phonetic translation": "yäne səm ... näw",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ስሜ ... ነው።",
    "English translation": "My name is ...",
    "Phonetic translation": "səme ... näw",
    "Notes": "Alternative phrasing"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ከየት ነህ፧",
    "English translation": "Where are you from?",
    "Phonetic translation": "käyät näh?",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ከየት ነሽ፧",
    "English translation": "Where are you from?",
    "Phonetic translation": "käyät näš?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ከየት ኖት፧",
    "English translation": "Where are you from?",
    "Phonetic translation": "käyät not?",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንተ ከየት ነህ፧",
    "English translation": "Where are you from?",
    "Phonetic translation": "antä käyät näh?",
    "Notes": "Male, alternative"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንቺ ከየት ነሽ፧",
    "English translation": "Where are you from?",
    "Phonetic translation": "anchi käyät näš?",
    "Notes": "Female, alternative"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እርስዎ ከየት ኖት፧",
    "English translation": "Where are you from?",
    "Phonetic translation": "ərswo käyät not?",
    "Notes": "Formal, alternative"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እኔ ከ ... ነኝ።",
    "English translation": "I'm from ...",
    "Phonetic translation": "əne kä ... näň",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ከ ... ነኝ።",
    "English translation": "I'm from ...",
    "Phonetic translation": "kä ... näň",
    "Notes": "Alternative phrasing"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ስለተዋወቅን ደስ ብሎኛል",
    "English translation": "Pleased to meet you",
    "Phonetic translation": "səlätäwawäqən däs bəloňňall",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንደምን አደርክ?",
    "English translation": "Good morning",
    "Phonetic translation": "əndämən addärk?",
    "Notes": "Male, means \"how did you pass the night?"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንደምን አደርሽ?",
    "English translation": "Good morning",
    "Phonetic translation": "əndämən addärš?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንደምን አደሩ?",
    "English translation": "Good morning",
    "Phonetic translation": "əndämən addäru?",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንደምን ዋልክ?",
    "English translation": "Good afternoon",
    "Phonetic translation": "i'ndemin walik?",
    "Notes": "Male, means \"how did you spend the day?"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንደምን ዋልሽ?",
    "English translation": "Good afternoon",
    "Phonetic translation": "i'ndemin walish?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንደምን ዋሉ",
    "English translation": "Good afternoon",
    "Phonetic translation": "i'ndemin walu",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንደምን አመሸህ?",
    "English translation": "Good evening",
    "Phonetic translation": "əndämən amäššäh?",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ምሽቱን እንዴት አሳለፍከው?",
    "English translation": "Good evening",
    "Phonetic translation": "məššətun əndet asalläfkäw?",
    "Notes": "Male, alternative"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንደምን አመሸሽ?",
    "English translation": "Good evening",
    "Phonetic translation": "əndämən amäššäš?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ምሽቱን እንዴት አሳለፍሽው?",
    "English translation": "Good evening",
    "Phonetic translation": "məššətun əndet asalläfšəw?",
    "Notes": "Female, alternative"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንደምን አመሹ?",
    "English translation": "Good evening",
    "Phonetic translation": "əndämən amäššu?",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና እደር",
    "English translation": "Good night",
    "Phonetic translation": "dähna där",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና እደሪ",
    "English translation": "Good night",
    "Phonetic translation": "dähna däri",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና እደሩ",
    "English translation": "Good night",
    "Phonetic translation": "dähna däru",
    "Notes": "Formal/Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ቻው",
    "English translation": "Goodbye",
    "Phonetic translation": "chaw",
    "Notes": "Informal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና ሁን",
    "English translation": "Goodbye",
    "Phonetic translation": "dähna hun",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና ሁኚ",
    "English translation": "Goodbye",
    "Phonetic translation": "dähna hunyi",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ደህና ሁኑ",
    "English translation": "Goodbye",
    "Phonetic translation": "dähna hunu",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም እድል",
    "English translation": "Good luck!",
    "Phonetic translation": "mälkam əddəl",
    "Notes": "Informal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለጤናችን",
    "English translation": "Cheers! Good Health!",
    "Phonetic translation": "läṭenaččən",
    "Notes": "Toast, \"to our health"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለፍቅራችን",
    "English translation": "Cheers! Good Health!",
    "Phonetic translation": "läfəqraččən",
    "Notes": "Toast, \"to our love"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለጓደኛነታችን",
    "English translation": "Cheers! Good Health!",
    "Phonetic translation": "lägwadäňňannätaččən",
    "Notes": "Toast, \"to our friendship"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ቀን።",
    "English translation": "Have a nice day",
    "Phonetic translation": "mälkam qän",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ቀን ይሁንልህ።",
    "English translation": "Have a nice day",
    "Phonetic translation": "mälkam qän yəhunəlləh",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ቀን ይሁንልሽ።",
    "English translation": "Have a nice day",
    "Phonetic translation": "mälkam qän yəhunəlləš",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ቀን ይሁንላችሁ።",
    "English translation": "Have a nice day",
    "Phonetic translation": "mälkam qän yəhunəllaččhu",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ብላ",
    "English translation": "Bon appétit",
    "Phonetic translation": "bəla",
    "Notes": "Male, \"eat!"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ብዪ",
    "English translation": "Bon appétit",
    "Phonetic translation": "biy",
    "Notes": "Female, \"eat!"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ብሉ",
    "English translation": "Bon appétit",
    "Phonetic translation": "bəlu",
    "Notes": "Plural, \"eat!"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ምግብ",
    "English translation": "Bon appétit",
    "Phonetic translation": "mälkam məgəb",
    "Notes": "Good feasting"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ጉዞ።",
    "English translation": "Bon voyage",
    "Phonetic translation": "mälkam guzo",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ጉዞ ይሁንልህ።",
    "English translation": "Bon voyage",
    "Phonetic translation": "mälkam guzo yəhunəlləh",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ጉዞ ይሁንልሽ።",
    "English translation": "Bon voyage",
    "Phonetic translation": "mälkam guzo yəhunəlləš",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ጉዞ ይሁንላችሁ።",
    "English translation": "Bon voyage",
    "Phonetic translation": "mälkam guzo yəhunəllaččhu",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ገባሀ?",
    "English translation": "Do you understand?",
    "Phonetic translation": "gäbah?",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ገባሸ?",
    "English translation": "Do you understand?",
    "Phonetic translation": "gäbaš?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ገባኝ",
    "English translation": "I understand",
    "Phonetic translation": "gäbbaň",
    "Notes": "It entered me"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አልገባኝም",
    "English translation": "I don't understand",
    "Phonetic translation": "algäbbaňem",
    "Notes": "It didn't enter me"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አላውቅም",
    "English translation": "I don't know",
    "Phonetic translation": "alawqəm",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክህ ቀስ ብለህ ተናገር።",
    "English translation": "Please speak more slowly",
    "Phonetic translation": "əbakəh qässə bəlläh tänagär",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክሽ ቀስ ብለሽ ተናገሪ።",
    "English translation": "Please speak more slowly",
    "Phonetic translation": "əbakəš qässə bəlläš tänagäri",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባካችሁ ቀስ ብላችሁ ተናገሩ።",
    "English translation": "Please speak more slowly",
    "Phonetic translation": "əbakaččhu qässə bəlläččhu tänagäru",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክዎ ቀስ ብለው ይናገሩ።",
    "English translation": "Please speak more slowly",
    "Phonetic translation": "ebakwo qäs beläw yenagäru",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክህ ያልከውን ድገምልኝ።",
    "English translation": "Please say that again",
    "Phonetic translation": "əbakəh yalkäwn dəgäməlləň",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክሽ ያልሽውን ድገሚልኝ።",
    "English translation": "Please say that again",
    "Phonetic translation": "əbakəš yalššəwn dəgämilləň",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባካችሁ ያላችሁትን ድገሙልኝ።",
    "English translation": "Please say that again",
    "Phonetic translation": "ebakaččhu yalaččhuten degämulleñ",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክዎ ያሉትን ይድገሙልኝ።",
    "English translation": "Please say that again",
    "Phonetic translation": "ebakwo yaluten yedegämulleñ",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክህ ጻፍልኝ።",
    "English translation": "Please write it down",
    "Phonetic translation": "əbakəh ṣafəlləň",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክሽ ጻፊልኝ።",
    "English translation": "Please write it down",
    "Phonetic translation": "əbakəš ṣafilləň",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባካችሁ ጻፉልኝ።",
    "English translation": "Please write it down",
    "Phonetic translation": "ebakaččhu ṣafulləň",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክዎ ጻፉልኝ።",
    "English translation": "Please write it down",
    "Phonetic translation": "ebakwo ṣafulləň",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አማርኛ ትችላለህ?",
    "English translation": "Do you speak Amharic?",
    "Phonetic translation": "amariňňa təčəlalläh?",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አማርኛ ትችያለሽ?",
    "English translation": "Do you speak Amharic?",
    "Phonetic translation": "amariňňa təčiyalläš?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አማርኛ ትችላላችሁ?",
    "English translation": "Do you speak Amharic?",
    "Phonetic translation": "amariňňa təčəlallaččhu?",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አዎ፣ ትንሽ",
    "English translation": "Yes, a little",
    "Phonetic translation": "aw tənəš",
    "Notes": "Reply to \"Do you speak Amharic?"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንዴት ነው … በአማርኛ የምለው?",
    "English translation": "How do you say ... in Amharic?",
    "Phonetic translation": "endiet näw … bä’amareñña yämmeläw?",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "… በአማርኛ ምን ይባላል?",
    "English translation": "How do you say ... in Amharic?",
    "Phonetic translation": "… bä’amareñña men yebbalal?",
    "Notes": "Alternative phrasing"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ይቅርታ",
    "English translation": "Excuse me",
    "Phonetic translation": "yəqərta",
    "Notes": "Means \"forgiveness"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ስንት ነው ዋጋው፧",
    "English translation": "How much is this?",
    "Phonetic translation": "sənttə näw wagaw?",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አዝናለሁ",
    "English translation": "Sorry",
    "Phonetic translation": "azənallähw",
    "Notes": "Means \"I am sorrowful"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክህ",
    "English translation": "Please",
    "Phonetic translation": "əbakəh",
    "Notes": "Male, \"I beg of you"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክሽ",
    "English translation": "Please",
    "Phonetic translation": "əbakəš",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እባክዎን",
    "English translation": "Please",
    "Phonetic translation": "əbakown",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አመሰግናለሁ",
    "English translation": "Thank you",
    "Phonetic translation": "amäsaggänallähw",
    "Notes": "I praise you"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "በጣም አመሰግናለሁን",
    "English translation": "Thank you very much",
    "Phonetic translation": "bäṭam amäsaggänallähun",
    "Notes": "Emphasized thanks"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ምንም አይደለም",
    "English translation": "Reply to thank you",
    "Phonetic translation": "mənəm aydälläm",
    "Notes": "It is nothing"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ችግር የለም",
    "English translation": "Reply to thank you",
    "Phonetic translation": "čəggər yälläm",
    "Notes": "There is no problem"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ሽንት ቤት የት ነው?",
    "English translation": "Where's the toilet?",
    "Phonetic translation": "šəntə bet yätə näw?",
    "Notes": "Informal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መጸዳጃ ክፍል የት ነዉ?",
    "English translation": "Where's the toilet?",
    "Phonetic translation": "mäṣadaǧǧa kəfl yätə näw?",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለሁሉም ይህ ሰውዬ ይከፍላል።",
    "English translation": "This gentleman will pay for everything",
    "Phonetic translation": "lähulum yəh säwye yəkäflall",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለሁሉም ይህች ሴትዮ ትከፍላለች።",
    "English translation": "This lady will pay for everything",
    "Phonetic translation": "lähulum yəč setyo təkäflalläč",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ከኔ ጋር መደነስ ትፈልጋለህ።",
    "English translation": "Would you like to dance with me?",
    "Phonetic translation": "käne gar mädanäs təfälləgalläh?",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ከኔ ጋር መደነስ ትፈልጊያለሽ።",
    "English translation": "Would you like to dance with me?",
    "Phonetic translation": "käne gar mädanäs təfälləgiyalläš?",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እወድሀለሁ።",
    "English translation": "I like you (as a friend)",
    "Phonetic translation": "əwäddəhallähw",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እወድሻለሁ።",
    "Phonetic translation": "əwäddəšallähw",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አፈቅርሀለሁ።",
    "English translation": "I love you",
    "Phonetic translation": "əfäqrəhallähw",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አፈቅርሻለሁ።",
    "English translation": "I love you",
    "Phonetic translation": "əfäqrəšallähw",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ምህረቱን ያምጣልህ።",
    "English translation": "Get well soon",
    "Phonetic translation": "məhərätun yamṭalləh",
    "Notes": "Male, \"May God's mercy come for you"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ምህረቱን ያምጣልሽ።",
    "English translation": "Get well soon",
    "Phonetic translation": "məhərätun yamṭalləš",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ሂድ!",
    "English translation": "Go away!",
    "Phonetic translation": "hid",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ሂጂ!",
    "English translation": "Go away!",
    "Phonetic translation": "hiǧǧi",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ሂዱ!",
    "English translation": "Go away!",
    "Phonetic translation": "hidu",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለቀቅ አርገኝ።",
    "English translation": "Leave me alone!",
    "Phonetic translation": "läqäq arrəgäň",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ለቀቅ አርጊኝ።",
    "English translation": "Leave me alone!",
    "Phonetic translation": "läqäq arrəgiň",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እርዳኝ",
    "English translation": "Help!",
    "Phonetic translation": "ərdaň!",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እርጂኝ",
    "English translation": "Help!",
    "Phonetic translation": "ərǧǧiň!",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እርዱኝ",
    "English translation": "Help!",
    "Phonetic translation": "ərduň!",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እሳት",
    "English translation": "Fire!",
    "Phonetic translation": "əsat!",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ቁም!",
    "English translation": "Stop!",
    "Phonetic translation": "qum",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ቁሚ!",
    "English translation": "Stop!",
    "Phonetic translation": "qumi",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ፖሊስ ጥራ።",
    "English translation": "Call the police!",
    "Phonetic translation": "polis ṭərra!",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ፖሊስ ጥሪ ።",
    "English translation": "Call the police!",
    "Phonetic translation": "polis ṭərri!",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "ፖሊስ ጥሩ ።",
    "English translation": "Call the police!",
    "Phonetic translation": "polis ṭərru!",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ገና",
    "English translation": "Christmas greetings",
    "Phonetic translation": "melikami gena",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንኳን አደረሰህ",
    "English translation": "New Year greetings",
    "Phonetic translation": "ənkwan adärräsäh",
    "Notes": "Male"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንኳን አደረሰሽ",
    "English translation": "New Year greetings",
    "Phonetic translation": "ənkwan adärräsäš",
    "Notes": "Female"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንኳን አደረሱ",
    "English translation": "New Year greetings",
    "Phonetic translation": "ənkwan adärräsu",
    "Notes": "Formal"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንኳን አደረሳችሁ",
    "English translation": "New Year greetings",
    "Phonetic translation": "ənkwan adärräsaččhu",
    "Notes": "Plural"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንኳን አብረው አደረሰን",
    "English translation": "New Year greetings (reply)",
    "Phonetic translation": "ənkwan abräw adärräsän",
    "Notes": "Even we have ushered in together!"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ፋሲካ",
    "English translation": "Easter greetings",
    "Phonetic translation": "mälkam fasika",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "መልካም ልደት",
    "English translation": "Birthday greetings",
    "Phonetic translation": "mälkam lədät",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "እንኳን ደስ አለዎ!",
    "English translation": "Congratulations!",
    "Phonetic translation": "inikwani desi ālewo!",
    "Notes": "Standard"
  },
  {
    "Category": "Basic/መሰረታዊ/",
    "Amharic phrase": "አንድ ቋንቋ ብቻ በቂ አይደለም",
    "English translation": "One language is never enough",
    "Phonetic translation": "and qwanqa bəča bäqi aydälläm",
    "Notes": "Standard"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "መግቢያ",
    "English translation": "Entrance",
    "Phonetic translation": "mägbiya",
    "Notes": "Common on building or venue signs"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "መውጫ",
    "English translation": "Exit",
    "Phonetic translation": "mäwča",
    "Notes": "Used for exits in public places"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "መጸዳጃ ቤት",
    "English translation": "Toilet/Bathroom",
    "Phonetic translation": "mäṣädaǧǧa bet",
    "Notes": "Formal, common in public facilities"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ሽንት ቤት",
    "English translation": "Toilet",
    "Phonetic translation": "šəntə bet",
    "Notes": "Informal, sometimes seen in casual settings"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ለወንዶች",
    "English translation": "Men",
    "Phonetic translation": "läwändoč",
    "Notes": "Used on restroom or changing room signs for men"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ለሴቶች",
    "English translation": "Women",
    "Phonetic translation": "läsätoč",
    "Notes": "Used on restroom or changing room signs for women"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ዝግ",
    "English translation": "Closed",
    "Phonetic translation": "zəg",
    "Notes": "Common on shop or office signs"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ክፍት",
    "English translation": "Open",
    "Phonetic translation": "kəft",
    "Notes": "Indicates a shop or facility is open"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "እባክዎ ጫማ አውልቁ",
    "English translation": "Please remove your shoes",
    "Phonetic translation": "əbakwo čama awləqu",
    "Notes": "Seen in religious or cultural sites"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ፎቶ አይፈቀድም",
    "English translation": "No photography",
    "Phonetic translation": "foto ayfäqädm",
    "Notes": "Common in museums or sacred places"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ማጨስ የተከለከለ ነው",
    "English translation": "No smoking",
    "Phonetic translation": "mačäs yätäkältäkässä näw",
    "Notes": "Standard on no-smoking signs"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ጥንቃቄ",
    "English translation": "Caution",
    "Phonetic translation": "ṭənqaqe",
    "Notes": "Used in warning signs (e.g., wet floor)"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "አደገኛ",
    "English translation": "Danger",
    "Phonetic translation": "adägäňña",
    "Notes": "Indicates hazardous areas"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "መኪና ማቆሚያ",
    "English translation": "Parking",
    "Phonetic translation": "mäkina maqomiya",
    "Notes": "Seen in parking lots or garages"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የአካል ጉዳተኞች ቦታ",
    "English translation": "Disabled parking",
    "Phonetic translation": "yäakal gudatäňňoč bota",
    "Notes": "Marks accessible parking spaces"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "ወደ አውሮፕላን ማረፊያ",
    "English translation": "To the airport",
    "Phonetic translation": "wädä awroplan marefiya",
    "Notes": "Common in transportation hubs"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የባቡር ጣቢያ",
    "English translation": "Train station",
    "Phonetic translation": "yäbabur ṭabiya",
    "Notes": "Indicates train station direction or location"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የአውቶቡስ መደብ",
    "English translation": "Bus stop",
    "Phonetic translation": "yäawtobus mädeb",
    "Notes": "Marks bus stop locations"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የምግብ ቤት",
    "English translation": "Restaurant",
    "Phonetic translation": "yäməgəb bet",
    "Notes": "Indicates a restaurant or dining area"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የተከለከለ መግቢያ",
    "English translation": "No entry",
    "Phonetic translation": "yätäkältäkässä mägbiya",
    "Notes": "Restricts access to certain areas"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የድንገተኛ መውጫ",
    "English translation": "Emergency exit",
    "Phonetic translation": "yädəngätäňña mäwča",
    "Notes": "Marks emergency exits in buildings"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የእሳት ማጥፊያ",
    "English translation": "Fire extinguisher",
    "Phonetic translation": "yäəsat maṭfiya",
    "Notes": "Indicates fire extinguisher location"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የመጀመሪያ እርዳታ",
    "English translation": "First aid",
    "Phonetic translation": "yämäǧämäriya ərdata",
    "Notes": "Marks first aid stations or kits"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የገበያ ማዕከል",
    "English translation": "Shopping center",
    "Phonetic translation": "yägäbäya maəkäl",
    "Notes": "Indicates a mall or shopping area"
  },
  {
    "Category": "signs/ምልክቶች/",
    "Amharic phrase": "የተጠባባቂ ቦታ",
    "English translation": "Waiting area",
    "Phonetic translation": "yätäṭäbaqi bota",
    "Notes": "Marks designated waiting zones"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አንድ",
    "English translation": "One",
    "Phonetic translation": "and",
    "Notes": "Used for counting or quantities"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሁለት",
    "English translation": "Two",
    "Phonetic translation": "hulätt",
    "Notes": "Common in markets or conversations"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሶስት",
    "English translation": "Three",
    "Phonetic translation": "sost",
    "Notes": "Used for counting or ordering"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "English translation": "Four",
    "Phonetic translation": "arat",
    "Notes": "Standard number term"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አምስት",
    "English translation": "Five",
    "Phonetic translation": "aməst",
    "Notes": "Frequently used in pricing"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ስድስት",
    "English translation": "Six",
    "Phonetic translation": "sədəst",
    "Notes": "Used in everyday counting"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሰባት",
    "English translation": "Seven",
    "Phonetic translation": "säbat",
    "Notes": "Common in schedules or quantities"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ስምንት",
    "Phonetic translation": "səmənt",
    "English translation": "Eight",
    "Notes": "Standard number term"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ዘጠኝ",
    "English translation": "Nine",
    "Phonetic translation": "zäṭäň",
    "Notes": "Used in counting or addresses"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አስር",
    "English translation": "Ten",
    "Phonetic translation": "asər",
    "Notes": "Common in prices or measurements"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሃያ",
    "English translation": "Twenty",
    "Phonetic translation": "haya",
    "Notes": "Used for larger quantities or money"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሰላሳ",
    "English translation": "Thirty",
    "Phonetic translation": "sälasa",
    "Notes": "Common in pricing or time"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አርባ",
    "English translation": "Forty",
    "Phonetic translation": "arba",
    "Notes": "Standard for counting"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አምሳ",
    "English translation": "Fifty",
    "Phonetic translation": "amsa",
    "Notes": "Frequently used in markets"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "መቶ",
    "English translation": "Hundred",
    "Phonetic translation": "mäto",
    "Notes": "Used for large quantities or money"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሺህ",
    "English translation": "Thousand",
    "Phonetic translation": "ših",
    "Notes": "Common in financial contexts"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "መጀመሪያ",
    "English translation": "First",
    "Phonetic translation": "mäǧämäriya",
    "Notes": "Ordinal, used for order or ranking"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሁለተኛ",
    "English translation": "Second",
    "Phonetic translation": "hulättäňña",
    "Notes": "Ordinal, common in sequences"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ሶስተኛ",
    "Phonetic translation": "sostäňña",
    "Notes": "Ordinal, used in lists or rankings"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አራተኛ",
    "English translation": "Fourth",
    "Phonetic translation": "aratäňña",
    "Notes": "Ordinal, used for order"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "አምስተኛ",
    "English translation": "Fifth",
    "Phonetic translation": "aməstäňña",
    "Notes": "Ordinal, common in rankings"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ቁጥር",
    "English translation": "Number",
    "Phonetic translation": "quṭər",
    "Notes": "General term for \"number"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ስንት",
    "English translation": "How many?",
    "Phonetic translation": "sənt",
    "Notes": "Used to ask about quantity"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "ስንት ነው ዋጋው?",
    "English translation": "How much is it?",
    "Phonetic translation": "sənt näw wagaw?",
    "Notes": "Common in shopping, repeated from Basic for relevance"
  },
  {
    "Category": "Numbers/ቁጥሮች/",
    "Amharic phrase": "በግምት",
    "English translation": "Approximately",
    "Phonetic translation": "bägəmət",
    "Notes": "Used for approximate quantities or prices"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሰዓቱ ስንት ነው?",
    "English translation": "What time is it?",
    "Phonetic translation": "säətu sənt näw?",
    "Notes": "Standard phrase for asking the time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሰዓት",
    "English translation": "Hour/Time",
    "Phonetic translation": "säət",
    "Notes": "General term for \"hour\" or \"time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ደቂቃ",
    "English translation": "Minute",
    "Phonetic translation": "däqiqa",
    "Notes": "Used for specifying minutes"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሰኮንድ",
    "English translation": "Second",
    "Phonetic translation": "säkond",
    "Notes": "Less common but used in precise contexts"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "አሁን",
    "English translation": "Now",
    "Phonetic translation": "ahun",
    "Notes": "Common in conversation"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ከአሁን በፊት",
    "English translation": "Before now",
    "Phonetic translation": "kä’ahun bäfit",
    "Notes": "Refers to past events"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ከአሁን በኋላ",
    "English translation": "After now",
    "Phonetic translation": "kä’ahun bähwala",
    "Notes": "Refers to future events"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ጠዋት",
    "English translation": "Morning",
    "Phonetic translation": "ṭäwat",
    "Notes": "Used for time of day or scheduling"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ከሰዓት በኋላ",
    "English translation": "Afternoon",
    "Phonetic translation": "käsäət bähwala",
    "Notes": "Refers to post-noon time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ማታ",
    "English translation": "Evening/Night",
    "Phonetic translation": "mata",
    "Notes": "General term for evening or night"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ምሽት",
    "English translation": "Evening",
    "Phonetic translation": "məššət",
    "Notes": "More specific for evening"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "እኩለ ቀን",
    "English translation": "Noon",
    "Phonetic translation": "əkulä qän",
    "Notes": "Midday, used in scheduling"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "እኩለ ሌሊት",
    "English translation": "Midnight",
    "Phonetic translation": "əkulä lelit",
    "Notes": "Used for late-night references"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ቀን",
    "English translation": "Day",
    "Phonetic translation": "qän",
    "Notes": "General term for \"day"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሌሊት",
    "English translation": "Night",
    "Phonetic translation": "lelit",
    "Notes": "Used for nighttime references"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሳምንት",
    "English translation": "Week",
    "Phonetic translation": "samənt",
    "Notes": "Common in planning or scheduling"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ወር",
    "English translation": "Month",
    "Phonetic translation": "wär",
    "Notes": "Used for longer time periods"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "አመት",
    "English translation": "Year",
    "Phonetic translation": "amät",
    "Notes": "Used for dates or anniversaries"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ዛሬ",
    "English translation": "Today",
    "Phonetic translation": "zare",
    "Notes": "Common in daily conversation"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ትናንት",
    "English translation": "Yesterday",
    "Phonetic translation": "tənant",
    "Notes": "Refers to the previous day"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ነገ",
    "English translation": "Tomorrow",
    "Phonetic translation": "nägä",
    "Notes": "Common for planning"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ከአንድ ሰዓት በፊት",
    "English translation": "One hour ago",
    "Phonetic translation": "kä’and säət bäfit",
    "Notes": "Specifies past time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ከአንድ ሰዓት በኋላ",
    "English translation": "In one hour",
    "Phonetic translation": "kä’and säət bähwala",
    "Notes": "Specifies future time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "በሰዓት",
    "English translation": "On time",
    "Phonetic translation": "bäsäət",
    "Notes": "Means punctual or at the specified time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ዘግይቻለሁ",
    "English translation": "I’m late",
    "Phonetic translation": "zägyəččallähu",
    "Notes": "Used to express tardiness"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ቀጠሮ አለኝ",
    "English translation": "I have an appointment",
    "Phonetic translation": "qäṭäro alläň",
    "Notes": "Common for scheduling"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ቀጠሮዬ መቼ ነው?",
    "English translation": "When is my appointment?",
    "Phonetic translation": "qäṭäroyä mäče näw?",
    "Notes": "Used to confirm appointment time"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሰኞ",
    "English translation": "Monday",
    "Phonetic translation": "säňňo",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ማክሰኞ",
    "English translation": "Tuesday",
    "Phonetic translation": "maksäňňo",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ረቡዕ",
    "English translation": "Wednesday",
    "Phonetic translation": "räbuə",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ሐሙስ",
    "English translation": "Thursday",
    "Phonetic translation": "hamus",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "አርብ",
    "English translation": "Friday",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "ቅዳሜ",
    "English translation": "Saturday",
    "Phonetic translation": "qədamä",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "እሑድ",
    "English translation": "Sunday",
    "Phonetic translation": "əhud",
    "Notes": "Day of the week"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "በየትኛው ቀን?",
    "English translation": "Which day?",
    "Phonetic translation": "bäyätəňňaw qän?",
    "Notes": "Used to ask about specific days"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "የአሁኑ ቀን ምንድን ነው?",
    "English translation": "What is today’s date?",
    "Phonetic translation": "yä’ahun qän məndən näw?",
    "Notes": "Used for date inquiries"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "በዓል",
    "English translation": "Holiday",
    "Phonetic translation": "bä’al",
    "Notes": "Refers to public holidays or festivals"
  },
  {
    "Category": "Time/ጊዜ/",
    "Amharic phrase": "በዓል መቼ ነው?",
    "English translation": "When is the holiday?",
    "Phonetic translation": "bä’al mäče näw?",
    "Notes": "Used to ask about holiday dates"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ቀይ",
    "English translation": "Red",
    "Phonetic translation": "qäy",
    "Notes": "Common for describing objects or clothing"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ሰማያዊ",
    "English translation": "Blue",
    "Phonetic translation": "sämayawi",
    "Notes": "Used for sky, water, or items"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "አረንጓዴ",
    "English translation": "Green",
    "Phonetic translation": "arängwade",
    "Notes": "Common for nature or green items"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ቢጫ",
    "English translation": "Yellow",
    "Phonetic translation": "bičča",
    "Notes": "Used for bright objects or flowers"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ጥቁር",
    "English translation": "Black",
    "Phonetic translation": "ṭəqur",
    "Notes": "Common for dark objects or hair"
  },
  {
    "Category": "Color/ቀለም/",
    "English translation": "White",
    "Phonetic translation": "näčč",
    "Notes": "Used for light-colored items or purity"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ቡናማ",
    "English translation": "Brown",
    "Phonetic translation": "bunama",
    "Notes": "Common for earth tones or food"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ሮዝ",
    "English translation": "Pink",
    "Phonetic translation": "roz",
    "Notes": "Used for clothing or decorations"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ብርቱካን",
    "English translation": "Orange",
    "Phonetic translation": "bərtukan",
    "Notes": "Named after the fruit, used for bright colors"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ግራጫ",
    "English translation": "Gray",
    "Phonetic translation": "gərača",
    "Notes": "Common for neutral tones or buildings"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ሐምራዊ",
    "English translation": "Purple",
    "Phonetic translation": "ḥamrawi",
    "Notes": "Used for vibrant clothing or art"
  },
  {
    "Category": "Color/ቀለም/",
    "English translation": "Color",
    "Phonetic translation": "qäläm",
    "Notes": "General term for \"color"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "የትኛው ቀለም?",
    "English translation": "Which color?",
    "Phonetic translation": "yätəňňaw qäläm?",
    "Notes": "Used to ask about color preferences"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ይህ ምን ቀለም ነው?",
    "English translation": "What color is this?",
    "Phonetic translation": "yəh mən qäläm näw?",
    "Notes": "Common when pointing to an object"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ቀለሙን እወዳለሁ",
    "English translation": "I like the color",
    "Phonetic translation": "qälämun əwäddallähu",
    "Notes": "Expresses color preference"
  },
  {
    "Category": "Color/ቀለም/",
    "English translation": "Light color",
    "Phonetic translation": "qälal qäläm",
    "Notes": "Refers to pastel or light shades"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ጥቁር ቀለም",
    "English translation": "Dark color",
    "Phonetic translation": "ṭəqur qäläm",
    "Notes": "Refers to deep or dark shades"
  },
  {
    "Category": "Color/ቀለም/",
    "Amharic phrase": "ባለቀለም",
    "English translation": "Colorful",
    "Phonetic translation": "baläqäläm",
    "Notes": "Describes something with many colors"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ወደ አውሮፕላን ማረፊያ እንዴት እደርሳለሁ?",
    "English translation": "How do I get to the airport?",
    "Phonetic translation": "wädä awroplan marefiya endet ədärsallähu?",
    "Notes": "Common for travelers asking for directions to the airport"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "የአውቶቡስ መደብ የት ነው?",
    "English translation": "Where is the bus stop?",
    "Phonetic translation": "yäawtobus mädeb yät näw?",
    "Notes": "Informal, used to locate a bus stop"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "የባቡር ጣቢያ የት ነው?",
    "English translation": "Where is the train station?",
    "Phonetic translation": "yäbabur ṭabiya yät näw?",
    "Notes": "Used to find train stations, common in cities like Addis Ababa"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ታክሲ የት እኔያለሁ?",
    "English translation": "Where can I find a taxi?",
    "Phonetic translation": "taksi yät əneyallähu?",
    "Notes": "Useful for hailing taxis in urban areas"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ይህ አውቶቡስ ወደ የት ይሄዳል?",
    "English translation": "Where does this bus go?",
    "Phonetic translation": "yəh awtobus wädä yät yəhedall?",
    "Notes": "Asked when boarding or inquiring about bus routes"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ቀጣዩ አውቶቡስ መቼ ነው?",
    "English translation": "When is the next bus?",
    "Phonetic translation": "qäṭayu awtobus mäče näw?",
    "Notes": "Used to check bus schedules"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ቀጣዩ ባቡር መቼ ነው?",
    "English translation": "When is the next train?",
    "Phonetic translation": "qäṭayu babur mäče näw?",
    "Notes": "Common for train travel inquiries"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "የአውሮፕላን በረራ መቼ ነው?",
    "English translation": "When is the flight?",
    "Phonetic translation": "yäawroplan bärära mäče näw?",
    "Notes": "Used at airports for flight schedules"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ትኬት ለመግዛት የት ነው?",
    "English translation": "Where can I buy a ticket?",
    "Phonetic translation": "təket lämägəzat yät näw?",
    "Notes": "Used for purchasing bus, train, or flight tickets"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "የትኬት ዋጋው ስንት ነው?",
    "English translation": "How much is the ticket?",
    "Phonetic translation": "yätəket wagaw sənt näw?",
    "Notes": "Common when inquiring about fares"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ወደ አዲስ አበባ ምን ያህል ጊዜ ይወስዳል?",
    "English translation": "How long does it take to Addis Ababa?",
    "Phonetic translation": "wädä addis abäba mən yahl gize yəwäsədall?",
    "Notes": "Replace \"Addis Ababa\" with any destination"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ይህ መንገድ ወደ የት ይወስዳል?",
    "English translation": "Where does this road lead?",
    "Phonetic translation": "yəh mängäd wädä yät yəwäsədall?",
    "Notes": "Used when asking for road directions"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ቀጥ ብለው ይሂዱ",
    "English translation": "Go straight",
    "Phonetic translation": "qäṭ bəläw yəhidu",
    "Notes": "Common direction given by locals"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ወደ ግራ ታጠፍ",
    "English translation": "Turn left",
    "Phonetic translation": "wädä gəra taṭäf",
    "Notes": "Used in navigation instructions"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ወደ ቀኝ ታጠፍ",
    "English translation": "Turn right",
    "Phonetic translation": "wädä qäň taṭäf",
    "Notes": "Used in navigation instructions"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "መኪና ማቆሚያ የት ነው?",
    "English translation": "Where is the parking lot?",
    "Phonetic translation": "mäkina maqomiya yät näw?",
    "Notes": "Useful for drivers or parking inquiries"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "የአካል ጉዳተኞች ቦታ የት ነው?",
    "English translation": "Where is disabled parking?",
    "Phonetic translation": "yäakal gudatäňňoč bota yät näw?",
    "Notes": "Refers to accessible parking spaces"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ብስክሌት የት መከራየት እችላለሁ?",
    "English translation": "Where can I rent a bicycle?",
    "Phonetic translation": "bəsəklet yät mäkärayät əčəlallähu?",
    "Notes": "Useful in tourist areas with bike rentals"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "የመኪና ኪራይ የት ነው?",
    "English translation": "Where is car rental?",
    "Phonetic translation": "yämäkina kiray yätLynäw?",
    "Notes": "Common for tourists needing vehicles"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "ይህ መንገድ ደህንነቱ የተጠበቀ ነው?",
    "English translation": "Is this road safe?",
    "Phonetic translation": "yəh mängäd dähənnätu yätäṭäbäqä näw?",
    "Notes": "Used to inquire about road safety"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "በቅርቡ ያለው ነዳጅ ማደያ የት ነው?",
    "English translation": "Where is the nearest gas station?",
    "Phonetic translation": "bäqərbu yaläw nädaǧ madäya yät näw?",
    "Notes": "Useful for drivers"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "መልካም ጉዞ",
    "English translation": "Bon voyage",
    "Phonetic translation": "mälkam guzo",
    "Notes": "Repeated from Basic category for relevance, means \"good journey"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "መንገድ ይንገሩኝ",
    "English translation": "Please show me the way",
    "Phonetic translation": "mängäd yəngäruň",
    "Notes": "Polite request for directions"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "እባክህ ወደ ታክሲ ስልክ",
    "English translation": "Please call a taxi",
    "Phonetic translation": "əbakəh wädä taksi səlk",
    "Notes": "Male, used to request taxi assistance"
  },
  {
    "Category": "Transportation/መጓጓዣ/",
    "Amharic phrase": "እባክሽ ወደ ታክሲ ስልክ",
    "Phonetic translation": "əbakəš wädä taksi səlk",
    "Notes": "Female, used to request taxi assistance"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ስንት ነው ዋጋው?",
    "English translation": "How much is this?",
    "Phonetic translation": "sənt näw wagaw?",
    "Notes": "Common in shopping or dining, repeated from Basic for relevance"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ገንዘብ",
    "English translation": "Money",
    "Phonetic translation": "gänzäb",
    "Notes": "General term for money or currency"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ብር",
    "English translation": "Birr",
    "Phonetic translation": "bər",
    "Notes": "Ethiopia’s currency, used in pricing"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ሳንቲም",
    "English translation": "Cent/Change",
    "Phonetic translation": "santim",
    "Notes": "Refers to coins or small change"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ይህን ለመግዛት ምን ያህል ነው?",
    "English translation": "How much to buy this?",
    "Phonetic translation": "yəhən lämägəzat mən yahl näw?",
    "Notes": "Specific to purchasing an item"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ቀነስ ብለህ ሽጥ",
    "English translation": "Can you lower the price?",
    "Phonetic translation": "qänäs bəläh šəṭ",
    "Notes": "Male, used for bargaining"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ቀነስ ብለሽ ሽጪ",
    "English translation": "Can you lower the price?",
    "Phonetic translation": "qänäs bəläš šəči",
    "Notes": "Female, used for bargaining"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ቀነሱ ብላችሁ ይሽጡ",
    "English translation": "Can you lower the price?",
    "Phonetic translation": "qänäsu bəlaččhu yəšəṭu",
    "Notes": "Plural, used for bargaining"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ይህ በጣም ውድ ነው",
    "English translation": "This is too expensive",
    "Phonetic translation": "yəh bäṭam wəd näw",
    "Notes": "Common in negotiations"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ርካሽ ነው?",
    "English translation": "Is it cheap?",
    "Phonetic translation": "rəkaš näw?",
    "Notes": "Used to inquire about affordability"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "በብር መክፈል እችላለሁ?",
    "English translation": "Can I pay with birr?",
    "Phonetic translation": "bäbər mäkäfäl əčəlallähu?",
    "Notes": "Useful for confirming payment method"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ካርድ ትቀበላለህ?",
    "English translation": "Do you accept cards?",
    "Phonetic translation": "kard təqäbəlalläh?",
    "Notes": "Male, used in modern establishments"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ካርድ ትቀበያለሽ?",
    "English translation": "Do you accept cards?",
    "Phonetic translation": "kard təqäbäyalläš?",
    "Notes": "Female, used in modern establishments"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ካርድ ትቀበላላችሁ?",
    "English translation": "Do you accept cards?",
    "Phonetic translation": "kard təqäbälallaččhu?",
    "Notes": "Plural, used in modern establishments"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "የሚለወጥ ገንዘብ የት ነው?",
    "English translation": "Where can I exchange money?",
    "Phonetic translation": "yemiläwäṭ gänzäb yät näw?",
    "Notes": "Common for tourists needing currency exchange"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "የለውጥ ተመን ምንድን ነው?",
    "English translation": "What is the exchange rate?",
    "Phonetic translation": "yäləwəṭ tämen məndən näw?",
    "Notes": "Used at banks or exchange offices"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "መቀበያ የት ነው?",
    "English translation": "Where is the cashier?",
    "Phonetic translation": "mäqäbäya yät näw?",
    "Notes": "Used in stores or restaurants"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ደረሰኝ ማግኘት እችላለሁ?",
    "English translation": "Can I get a receipt?",
    "Phonetic translation": "däräsäň magňät əčəlallähu?",
    "Notes": "Useful for record-keeping or reimbursements"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ለሁሉም ይህ ሰውዬ ይከፍላል",
    "English translation": "This gentleman will pay for everything",
    "Phonetic translation": "lähulum yəh säwye yəkäflall",
    "Notes": "Repeated from Basic for relevance"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ለሁሉም ይህች ሴትዮ ትከፍላለች",
    "English translation": "This lady will pay for everything",
    "Phonetic translation": "lähulum yəč setyo təkäflalläč",
    "Notes": "Repeated from Basic for relevance"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ገንዘብ መበደር እችላለሁ?",
    "English translation": "Can I borrow money?",
    "Phonetic translation": "gänzäb mäbädär əčəlallähu?",
    "Notes": "Polite request for a loan"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ገንዘብ መቀየር እችላለሁ?",
    "Phonetic translation": "gänzäb mäqäyär əčəlallähu?",
    "Notes": "Used for exchanging coins or notes"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "የባንክ መለያ ሂሳብ እንዴት እከፍታለሁ?",
    "English translation": "How do I open a bank account?",
    "Phonetic translation": "yäbank mäläya hisab endet ekeftalehu?",
    "Notes": "Useful for longer stays or financial setup"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "የባንክ ካርድ የት እኔያለሁ?",
    "English translation": "Where can I get a bank card?",
    "Phonetic translation": "yäbank kard yät əneyallähu?",
    "Notes": "For accessing banking services"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "የኤቲኤም መጠቀሚያ የት ነው?",
    "English translation": "Where is the ATM?",
    "Phonetic translation": "yä’etiem mäṭäqämiya yät näw?",
    "Notes": "Common for cash withdrawals"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "ገንዘቤን አጣሁ",
    "English translation": "I lost my money",
    "Phonetic translation": "gänzäben aṭahu",
    "Notes": "Used to report loss of money"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "እባክህ በፍጥነት ክፈል",
    "English translation": "Please pay quickly",
    "Phonetic translation": "əbakəh bäfəṭnät kəfäl",
    "Notes": "Male, used to urge quick payment"
  },
  {
    "Category": "Money/ገንዘብ/",
    "Amharic phrase": "እባክሽ በፍጥነት ክፈዪ",
    "Phonetic translation": "əbakəš bäfəṭnät kəfäyi",
    "Notes": "Female, used to urge quick payment"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "ሆቴል የት ነው?",
    "English translation": "Where is the hotel?",
    "Phonetic translation": "hotel yät näw?",
    "Notes": "Common for locating accommodations"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "ክፍል አለኝ?",
    "English translation": "Do you have a room available?",
    "Phonetic translation": "kəfl alläň?",
    "Notes": "Used when checking hotel availability"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "ክፍሉ ምን ያህል ያስከፍላል?",
    "English translation": "How much is the room?",
    "Phonetic translation": "kəflu mən yahl yaskäflall?",
    "Notes": "Inquiring about room rates"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "አንድ ሌሊት ምን ያህል ነው?",
    "English translation": "How much for one night?",
    "Phonetic translation": "and lelit mən yahl näw?",
    "Notes": "Specific to nightly rates"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "ክፍል መያዝ እፈልጋለሁ",
    "English translation": "I want to book a room",
    "Phonetic translation": "kəfl mäyaz əfälləgallähu",
    "Notes": "Used for reservations"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "የግል መጸዳጃ ቤት አለው?",
    "English translation": "Does it have a private bathroom?",
    "Phonetic translation": "yägəl mäṣädaǧǧa bet alläw?",
    "Notes": "Common for checking room amenities"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "ቁርስ ተካትቷል?",
    "English translation": "Is breakfast included?",
    "Phonetic translation": "qurs täkattətwal?",
    "Notes": "Inquiring about meal inclusions"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "የዋይ ፋይ አለ?",
    "English translation": "Is there Wi-Fi?",
    "Phonetic translation": "yäway fay allä?",
    "Notes": "Useful for modern travelers"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "መውጫ መቼ ነው?",
    "English translation": "When is check-out?",
    "Phonetic translation": "mäwča mäče näw?",
    "Notes": "Checking departure time"
  },
  {
    "Category": "Lodging/ማረፊያ/",
    "Amharic phrase": "ሻንጣዬን መተው እችላለሁ?",
    "English translation": "Can I leave my luggage?",
    "Phonetic translation": "šanṭayen mätät əčəlallähu?",
    "Notes": "For storing bags after check-out"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "የምግብ ቤት የት ነው?",
    "English translation": "Where is the restaurant?",
    "Phonetic translation": "yäməgəb bet yät näw?",
    "Notes": "Locating dining options"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ምን አለ?",
    "English translation": "Is there a menu?",
    "Phonetic translation": "mənale allä?",
    "Notes": "Common in restaurants"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ምን ይመክራሉ?",
    "English translation": "What do you recommend?",
    "Phonetic translation": "mən yəmäkrallu?",
    "Notes": "Asking for food suggestions"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ይህ ምንድን ነው?",
    "English translation": "What is this?",
    "Phonetic translation": "yəh məndn näw?",
    "Notes": "Pointing to a dish or item"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "የአትክልት ምግብ አለ?",
    "English translation": "Is there vegetarian food?",
    "Phonetic translation": "veǧeteriyan məgəb allä?",
    "Notes": "For dietary preferences"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ውሃ እፈልጋለሁ",
    "English translation": "I want water",
    "Phonetic translation": "wəha əfälləgallähu",
    "Notes": "Common drink request"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ቡና እፈልጋለሁ",
    "English translation": "I want coffee",
    "Phonetic translation": "buna əfälləgallähu",
    "Notes": "Ethiopia is famous for coffee"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "መልካም ምግብ",
    "English translation": "Bon appétit",
    "Phonetic translation": "mälkam məgəb",
    "Notes": "Repeated from Basic, means \"good feasting"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ሂሳቡን እባክህ",
    "English translation": "The bill, please",
    "Phonetic translation": "hisabun əbakəh",
    "Notes": "Male, requesting the check"
  },
  {
    "Category": "Eating/መመገብ/",
    "Amharic phrase": "ሂሳቡን እባክሽ",
    "English translation": "The bill, please",
    "Phonetic translation": "hisabun əbakəš",
    "Notes": "Female, requesting the check"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "ስልክ መጠቀም እችላለሁ?",
    "English translation": "Can I use the phone?",
    "Phonetic translation": "səlk mäṭäqäm əčəlallähu?",
    "Notes": "Asking to use a phone"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "ወደ ውጭ መደወል እችላለሁ?",
    "English translation": "Can I make an international call?",
    "Phonetic translation": "wädä wəč mäkäwäl əčəlallähu?",
    "Notes": "For overseas calls"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "የስልክ ቁጥርህ ምንድን ነው?",
    "English translation": "What is your phone number?",
    "Phonetic translation": "yäsəlk quṭərəh məndən näw?",
    "Notes": "Male, asking for contact info"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "የስልክ ቁጥርሽ ምንድን ነው?",
    "English translation": "What is your phone number?",
    "Phonetic translation": "yäsəlk quṭərəš məndən näw?",
    "Notes": "Female, asking for contact info"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "እባክህ ደውልልኝ",
    "English translation": "Please call me",
    "Phonetic translation": "əbakəh däwləlləň",
    "Notes": "Male, requesting a callback"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "እባክሽ ደውሊልኝ",
    "Phonetic translation": "əbakəš däwlilləň",
    "Notes": "Female, requesting a callback"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "የስልክ ካርድ የት እገዛለሁ?",
    "English translation": "Where can I buy a phone card?",
    "Phonetic translation": "yäsəlk kard yät əgäzallähu?",
    "Notes": "For prepaid mobile credit"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "የጥሪ ማዕከል የት ነው?",
    "English translation": "Where is the call center?",
    "Phonetic translation": "yäṭəri maəkäl yät näw?",
    "Notes": "For public phone services"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "አሁን መደወል እችላለሁ?",
    "English translation": "Can I call now?",
    "Phonetic translation": "ahun mäkäwäl əčəlallähu?",
    "Notes": "Confirming call availability"
  },
  {
    "Category": "Phonecalls/ስልክ ጥሪ/",
    "Amharic phrase": "ሲግናል አለ?",
    "English translation": "Is there a signal?",
    "Phonetic translation": "signal allä?",
    "Notes": "Checking mobile network availability"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "ቢራ እፈልጋለሁ",
    "English translation": "I want a beer",
    "Phonetic translation": "bira əfälləgallähu",
    "Notes": "Common drink order"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "ወይን አለ?",
    "English translation": "Is there wine?",
    "Phonetic translation": "wäyn allä?",
    "Notes": "Asking for wine availability"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "ኮክቴል ምናለ አለ?",
    "English translation": "Is there a cocktail menu?",
    "Phonetic translation": "koktel mənale allä?",
    "Notes": "For bar menus"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "ለጤናችን",
    "English translation": "Cheers!",
    "Phonetic translation": "läṭenaččən",
    "Notes": "Toast, \"to our health,\" repeated from Basic"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "አንድ  ጣርሙስ ቢራ",
    "English translation": "One glass of beer",
    "Phonetic translation": "and tarmus bira",
    "Notes": "Specific drink order"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "የአልኮል መጠጥ አለ?",
    "English translation": "Is there an alcoholic drink?",
    "Phonetic translation": "yäalkol mäṭäṭ allä?",
    "Notes": "Inquiring about alcohol options"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "ያለ አልኮል መጠጥ አለ?",
    "English translation": "Is there a non-alcoholic drink?",
    "Phonetic translation": "yalä alkol mäṭäṭ allä?",
    "Notes": "For non-alcoholic options"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "በረዶ መጨመር ይቻላል?",
    "English translation": "Can you add ice?",
    "Phonetic translation": "bärädo mäčämärr yəčallall?",
    "Notes": "Common drink customization"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "የቤቱ መጠጥ ምንድን ነው?",
    "English translation": "What is the house drink?",
    "Phonetic translation": "yäbetu mäṭäṭ məndən näw?",
    "Notes": "Asking for bar specialties"
  },
  {
    "Category": "Bars/ቡና ቤቶች/",
    "Amharic phrase": "ቡና ቤት የት ነው?",
    "English translation": "Where is the bar?",
    "Phonetic translation": "buna bet yät näw?",
    "Notes": "Also used for coffee houses in Ethiopia"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "የገበያ ማዕከል የት ነው?",
    "English translation": "Where is the shopping center?",
    "Phonetic translation": "yägäbäya maəkäl yät näw?",
    "Notes": "Locating malls or markets"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "ይህን መግዛት እፈልጋለሁ",
    "English translation": "I want to buy this",
    "Phonetic translation": "yəhən mägəzat əfälləgallähu",
    "Notes": "General purchase request"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "ሌላ መጠን አለ?",
    "English translation": "Is there another size?",
    "Phonetic translation": "lela mäṭän allä?",
    "Notes": "For clothing or items"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "ሌላ ቀለም አለ?",
    "English translation": "Is there another color?",
    "Phonetic translation": "lela qäläm allä?",
    "Notes": "For color options"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "መሞከር እችላለሁ?",
    "English translation": "Can I try it on?",
    "Phonetic translation": "mämoḵär əčəlallähu?",
    "Notes": "Common for clothing or accessories"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "ቅናሽ አለ?",
    "English translation": "Is there a discount?",
    "Phonetic translation": "qənaš allä?",
    "Notes": "Asking about sales or deals"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "በጥቅል ምን ያህል ነው?",
    "English translation": "How much for the whole package?",
    "Phonetic translation": "bäṭəqəl mən yahl näw?",
    "Notes": "For bulk purchases"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "የትኛው የተሻለ ነው?",
    "English translation": "Which one is better?",
    "Phonetic translation": "yätəňňaw yätäšalä näw?",
    "Notes": "Comparing items"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "ይህ በአካባቢው የተሰራ ነው?",
    "English translation": "Is this locally made?",
    "Phonetic translation": "yəh bä’akababi yätäsärra näw?",
    "Notes": "For souvenirs or local products"
  },
  {
    "Category": "Shopping/ገበያ/",
    "Amharic phrase": "መመለስ ይቻላል?",
    "English translation": "Can I return it?",
    "Phonetic translation": "mämmäläs yəčallall?",
    "Notes": "Inquiring about return policies"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "እናቴ የት ናት?",
    "English translation": "Where is my mother?",
    "Phonetic translation": "ənnate yät nat?",
    "Notes": "Female speaker, asking for family member"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "አባቴ የት ነው?",
    "English translation": "Where is my father?",
    "Phonetic translation": "abate yät näw?",
    "Notes": "Male speaker, asking for family member"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "ልጄ የት ነው?",
    "English translation": "Where is my child?",
    "Phonetic translation": "ləǧe yät näw?",
    "Notes": "Parent asking for their child"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "ባለቤቴ የት ነው?",
    "English translation": "Where is my spouse?",
    "Phonetic translation": "baläbete yät näw?",
    "Notes": "Asking for husband or wife"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "ወንድሜ የት ነው?",
    "English translation": "Where is my brother?",
    "Phonetic translation": "wändəme yät näw?",
    "Notes": "Asking for a male sibling"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "እህቴ የት ናት?",
    "English translation": "Where is my sister?",
    "Phonetic translation": "əhəte yät nat?",
    "Notes": "Asking for a female sibling"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "የቤተሰብ ክፍል አለ?",
    "English translation": "Is there a family room?",
    "Phonetic translation": "yäbetäsäb kəfl allä?",
    "Notes": "For family accommodations in hotels"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "ልጆች መጫወቻ ቦታ አለ?",
    "English translation": "Is there a playground for kids?",
    "Phonetic translation": "ləǧoč mäčawäčča bota allä?",
    "Notes": "For family-friendly locations"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "የልጆች ምግብ አለ?",
    "English translation": "Is there a kids’ menu?",
    "Phonetic translation": "yäləǧoč məgəb allä?",
    "Notes": "In restaurants for children"
  },
  {
    "Category": "Family/ቤተሰብ/",
    "Amharic phrase": "ቤተሰቤ ጋር ነው",
    "English translation": "I’m with my family",
    "Phonetic translation": "betäsäbe gar näw",
    "Notes": "Indicating family travel"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "መንገድ የት ነው?",
    "English translation": "Where is the road?",
    "Phonetic translation": "mängäd yät näw?",
    "Notes": "Asking for road directions"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "መኪና መከራየት እችላለሁ?",
    "English translation": "Can I rent a car?",
    "Phonetic translation": "mäkina mäkärayät əčəlallähu?",
    "Notes": "For car rentals"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "የነዳጅ ማደያ የት ነው?",
    "English translation": "Where is the gas station?",
    "Phonetic translation": "yänädaǧ madäya yät näw?",
    "Notes": "For refueling"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "ይህ መንገድ ደህንነቱ የተጠበቀ ነው?",
    "English translation": "Is this road safe?",
    "Phonetic translation": "yəh mängäd dähənnätu yätäṭäbäqä näw?",
    "Notes": "Repeated from Transportation for relevance"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "የመኪና ማቆሚያ የት ነው?",
    "English translation": "Where is the parking lot?",
    "Phonetic translation": "yämäkina maqomiya yät näw?",
    "Notes": "Repeated from Transportation"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "የትራፊክ መብራቶች የት ናቸው?",
    "English translation": "Where are the traffic lights?",
    "Phonetic translation": "yätrafik mäbratoč yät naččäw?",
    "Notes": "For navigation"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "ፍጥነት ገደቡ ምንድን ነው?",
    "English translation": "What is the speed limit?",
    "Phonetic translation": "fəṭnät gädbu məndən näw?",
    "Notes": "For driving regulations"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "መንጃ ፍቃድ አለኝ",
    "English translation": "I have a driver’s license",
    "Phonetic translation": "mänǧa fəqad alläň",
    "Notes": "Confirming driving eligibility"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "መኪናዬ ተበላሽቷል",
    "English translation": "My car broke down",
    "Phonetic translation": "mäkinaye tebəlašətwal",
    "Notes": "Reporting vehicle issues"
  },
  {
    "Category": "Driving/ሹፍርና/",
    "Amharic phrase": "መካኒክ የት ነው?",
    "English translation": "Where is a mechanic?",
    "Phonetic translation": "mäkanik yät näw?",
    "Notes": "For vehicle repairs"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "ፖሊስ ጥራ",
    "English translation": "Call the police!",
    "Phonetic translation": "polis ṭərra!",
    "Notes": "Male, repeated from Basic for emergencies"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "የፖሊስ ጣቢያ የት ነው?",
    "English translation": "Where is the police station?",
    "Phonetic translation": "yäpolis ṭabiya yät näw?",
    "Notes": "Locating authorities"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "እርዳታ እፈልጋለሁ",
    "English translation": "I need help",
    "Phonetic translation": "ərdata əfälləgallähu",
    "Notes": "General emergency request"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "ፓስፖርቴን አጣሁ",
    "English translation": "I lost my passport",
    "Phonetic translation": "pasəporteən aṭahu",
    "Notes": "Reporting lost documents"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "የኤምባሲ ቦታ የት ነው?",
    "English translation": "Where is the embassy?",
    "Phonetic translation": "yä’embasi bota yät näw?",
    "Notes": "For consular assistance"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "ሰነዶቼን ማሳየት እችላለሁ?",
    "English translation": "Can I show my documents?",
    "Phonetic translation": "sänädowəčən masayät əčəlallähu?",
    "Notes": "For official interactions"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "ህግ ተላልፌያለሁ?",
    "English translation": "Did I break the law?",
    "Phonetic translation": "həg tälälfəyallähu?",
    "Notes": "Inquiring about legal issues"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "የቅጣት መጠን ምንድን ነው?",
    "English translation": "What is the fine?",
    "Phonetic translation": "yäqəṭat mäṭän məndən näw?",
    "Notes": "For traffic or minor violations"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "እስር ቤት የት ነው?",
    "English translation": "Where is the prison?",
    "Phonetic translation": "əsər bet yät näw?",
    "Notes": "Rare, but for legal inquiries"
  },
  {
    "Category": "Authority/ስልጣን/",
    "Amharic phrase": "እባክህ ማብራሪያ ስጥ",
    "English translation": "Please explain",
    "Phonetic translation": "əbakəh mabrariya səṭ",
    "Notes": "Male, requesting clarification from authorities"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "እንኳን ደህና መጣህ",
    "English translation": "Welcome",
    "Phonetic translation": "ənkwan dähna mäṭṭah",
    "Notes": "Male, repeated from Basic, common greeting"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "እንደምን አለህ?",
    "English translation": "How are you?",
    "Phonetic translation": "əndämən alläh?",
    "Notes": "Male, repeated from Basic, everyday greeting"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "አመሰግናለሁ",
    "English translation": "Thank you",
    "Phonetic translation": "amäsaggänallähw",
    "Notes": "Repeated from Basic, widely used"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "እንደገና እንተያያለን",
    "English translation": "See you again",
    "Phonetic translation": "əndägäna əntäyayallän",
    "Notes": "Common farewell phrase"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "ምንም አይደል",
    "English translation": "You’re welcome",
    "Phonetic translation": "bätäräňňalay",
    "Notes": "Alternative to \"it’s nothing\" for thanks"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "ሁሉም ነገር ጥሩ ነው",
    "English translation": "Everything is fine",
    "Phonetic translation": "hulum nägär ṭəru näw",
    "Notes": "Reassuring phrase"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "በፍጥነት ና",
    "English translation": "Come quickly",
    "Phonetic translation": "bäfəṭnät na",
    "Notes": "Urging haste in casual settings"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "መልካም ጉዞ",
    "English translation": "Safe, travels",
    "Phonetic translation": "melkam guzo",
    "Notes": "Wishing safe travels or actions"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "ብላብላ",
    "English translation": "Eat, eat!",
    "Phonetic translation": "blabla",
    "Notes": "Informal, encouraging eating"
  },
  {
    "Category": "Typical expression/የተለመደ አገላለጽ/",
    "Amharic phrase": "ተደሰት",
    "English translation": "Enjoy yourself",
    "Phonetic translation": "tädäsät",
    "Notes": "Wishing enjoyment"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ደደብ",
    "English translation": "Fool/Stupid",
    "Phonetic translation": "dedeb",
    "Notes": "Insult, use with caution"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ቦዘኔ",
    "English translation": "Lazy",
    "Phonetic translation": "bozangne",
    "Notes": "Derogatory term for laziness"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ጅል",
    "English translation": "Idiot",
    "Phonetic translation": "moň",
    "Notes": "Strong insult, highly offensive"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ቅዘናም",
    "English translation": "Coward",
    "Phonetic translation": "qəzənam",
    "Notes": "Insult implying lack of bravery"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "አሳፋሪ",
    "English translation": "Shameful",
    "Phonetic translation": "asafari",
    "Notes": "Used to call someone disgraceful"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "አረመኔ",
    "English translation": "Cruel",
    "Phonetic translation": "aramane",
    "Notes": "Describes harsh or mean behavior"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ቅማላም",
    "English translation": "Liar",
    "Phonetic translation": "qəmalam",
    "Notes": "Accusation of dishonesty"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ቦርጫም",
    "English translation": "Fat",
    "Phonetic translation": "borcham",
    "Notes": "Offensive term for body size"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "ቆሻሻ",
    "English translation": "Dirty",
    "Phonetic translation": "qošaša",
    "Notes": "Insult for uncleanliness"
  },
  {
    "Category": "Offensive words/አጸያፊ ቃላት/",
    "Amharic phrase": "አዝግ",
    "English translation": "Annoying",
    "Phonetic translation": "azg",
    "Notes": "Describes irritating behavior"
  }
];

// Function to process raw data into the desired format
const processPhraseData = (data: any[]): Category[] => {
  const categoriesMap: Map<string, Category> = new Map();

  data.forEach(item => {
    const rawCategoryName = item.Category;
    // Ensure rawCategoryName is a string before splitting
    const categoryName = (rawCategoryName ?? '').split('/')[0].trim();
    const categoryId = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!categoriesMap.has(categoryId)) {
      categoriesMap.set(categoryId, {
        id: categoryId,
        name: categoryName,
        phrases: [],
      });
    }

    // Ensure all phrase properties are strings before using .replace() or other string methods
    const amharicPhrase = item["Amharic phrase"] ?? '';
    const englishTranslation = item["English translation"] ?? '';
    const phoneticTranslation = item["Phonetic translation"] ?? '';
    const notes = item.Notes ?? '';

    const phrase: Phrase = {
      // Ensure amharicPhrase is not empty before attempting replace, or provide a fallback.
      // Using a more robust ID generation that doesn't rely solely on amharicPhrase might be better.
      // For now, if amharicPhrase is empty, we'll use a generic placeholder for ID generation.
      id: `${categoryId}-${amharicPhrase.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 15) || 'no-amharic'}-${Math.random().toString(36).substring(2, 6)}`,
      amharic: amharicPhrase,
      english: englishTranslation,
      pronunciation: phoneticTranslation,
      notes: notes,
    };

    categoriesMap.get(categoryId)?.phrases.push(phrase);
  });

  return Array.from(categoriesMap.values());
};

const processedPhraseData: Category[] = processPhraseData(rawPhraseData);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentView, setCurrentView] = useState<'categories' | 'phrases'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false); // State for scroll to top button visibility
  const itemsPerPage = 9;

  // Filtered categories based on search term (memoized for performance)
  const filteredCategories = useMemo(() => {
    return processedPhraseData
      .map(categoryData => ({
        ...categoryData,
        // Filter phrases if on CategoryListPage and searching
        phrases: categoryData.phrases.filter(
          phrase =>
            phrase.amharic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (phrase.notes && phrase.notes.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
      }))
      .filter(categoryData => categoryData.phrases.length > 0); // Only show categories with matching phrases
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Handlers for navigation
  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setCurrentView('phrases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
    setCurrentView('categories');
    setCurrentPage(1); // Reset pagination when going back to categories
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Function to scroll to the top of the page
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Effect to show/hide scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 text-gray-800 bg-gradient-to-br from-blue-50 to-indigo-100 font-inter">
      {/* Header */}
      <header className="flex flex-col items-center justify-between w-full max-w-4xl p-6 mb-8 text-white shadow-lg bg-gradient-to-r from-red-600 to-red-800 rounded-xl sm:flex-row">
        <div className="mb-4 text-center sm:text-left sm:mb-0">
          <h1 className="mb-2 text-4xl font-extrabold sm:text-5xl drop-shadow-md">
            AMHARIC<span className="text-yellow-300">PhraseBook</span>
          </h1>
          <p className="text-lg font-light sm:text-xl opacity-90">Your essential guide for communicating in Ethiopia!</p>
        </div>
        <img
          src="/images/Rock_hewn_church.jpg" 
          alt="Amharic Landscape"
          className="object-cover h-24 rounded-lg shadow-md w-36 sm:w-48 sm:h-32"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x100/CCCCCC/333333?text=Image+Error'; }} // Fallback
        />
      </header>

      {/* Main Content Area based on currentView */}
      {currentView === 'categories' && (
        <CategoryListPage
          categories={filteredCategories}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSelectCategory={handleSelectCategory}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {currentView === 'phrases' && selectedCategory && (
        <PhraseListPage
          category={selectedCategory}
          onBack={handleBackToCategories}
        />
      )}

      {/* Scroll to Top Button (Global) */}
      {showScrollTopButton && (
        <button
          onClick={handleScrollToTop}
          className="fixed z-50 p-3 text-white transition-all duration-300 bg-red-600 rounded-full shadow-lg bottom-8 right-8 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="w-full max-w-4xl p-6 mt-12 text-sm text-center text-gray-600 bg-gray-100 shadow-inner rounded-xl">
        <p className="mb-2 leading-relaxed">
          100% free Amharic Phrasebook app, built for travel and offline use. Add it to your Home screen and access 670+ essential phrases in 17 topics. Requires no internet connection.
        </p>
        <div className="flex justify-center mt-4 space-x-6">
          {/* Placeholder SVG Icons for Social Media */}
          <a href="https://web.facebook.com/Eyu.reaper/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-6 h-6 text-blue-700 transition-colors duration-200 hover:text-blue-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 13.5h2.5l1-4H14v-2c0-1.5 0.5-2 2-2h1.5V2.14c-0.326-0.053-1.66-.14-3.13-.14C11.5 2 9 3.57 9 7.37V9.5H7v4h2v8h4v-8z"/></svg>
          </a>
          <a href="https://x.com/eyu_gx" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="w-6 h-6 text-blue-400 transition-colors duration-200 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.36 4.6 17.2 4 15.96 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.7-1.89-8.81-4.48-.37.64-.58 1.39-.58 2.19 0 1.49.75 2.81 1.91 3.59-.7-.02-1.37-.2-1.95-.5v.06c0 2.08 1.48 3.82 3.44 4.2-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.93 4.02 2.97-1.46 1.14-3.3 1.83-5.32 1.83-.34 0-.68-.02-1.02-.06C3.96 20.3 6.13 21 8.5 21c7.2 0 11.15-5.96 11.15-11.15 0-.17-.0-.33-.01-.5A8.094 8.094 0 0022.46 6z"/></svg>
          </a>
 <a href="https://github.com/eyureaper" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg className="w-6 h-6 text-gray-800 transition-colors duration-200 hover:text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
            </svg>
          </a>        </div>
        <p className="mt-4">
          Developed with ♥ by <a href="mailto:eyureaper@gmail.com" className="text-red-600 hover:underline">Eyuel Getachew</a>
        </p>
        <p className="mt-1">
          inspired by Manuel Wieser's work on <a href="https://www.japanese-phrasebook.com" className="text-red-600 hover:underline">Japanese Phrasebook</a>
          <br />
          &copy; 2025 Eyuel Getachew
        </p>
      </footer>
    </div>
  );
};

export default App;
