import React from 'react';
import { Phrase } from '../data/dataProcessor';
import { SpeakerHigh } from '@phosphor-icons/react';

interface FavoritesPageProps {
  favorites: string[];
  phrases: Phrase[];
  onToggleFavorite: (id: string) => void;
  onPractice: () => void;
  onBack: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ 
  favorites, 
  phrases, 
  onToggleFavorite, 
  onPractice,
  onBack
}) => {
  const favoritePhrases = phrases.filter(p => favorites.includes(p.id));

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'am-ET';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-between mb-12 space-y-6 md:flex-row md:space-y-0">
        <button
          onClick={onBack}
          className="group flex items-center px-6 py-3 font-bold text-slate-700 dark:text-slate-300 transition-all bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="text-center md:text-right">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Your Favorites</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">{favoritePhrases.length} Saved Phrases</p>
        </div>
      </div>

      {favoritePhrases.length > 0 ? (
        <>
          {/* Practice Action */}
          <div className="mb-12 flex justify-center">
             <button
                onClick={onPractice}
                className="px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Practice These Phrases
              </button>
          </div>

          {/* List */}
          <div className="grid gap-6">
            {favoritePhrases.map((phrase) => (
              <div 
                key={phrase.id} 
                className="relative group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 rounded-3xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-red-500 transition-colors duration-300" />
                
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white font-amharic leading-relaxed">
                        {phrase.amharic}
                      </p>
                      <button 
                        onClick={() => handlePlayAudio(phrase.amharic)}
                        className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-slate-50 dark:bg-slate-900 rounded-full"
                        title="Listen"
                      >
                        <SpeakerHigh size={20} weight="duotone" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="text-lg font-medium text-slate-400 font-sans italic">
                        [{phrase.pronunciation}]
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide">
                      {phrase.english}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onToggleFavorite(phrase.id)}
                    className="mt-6 md:mt-0 p-3 rounded-2xl transition-all duration-300 bg-red-50 text-red-500 dark:bg-red-900/20 hover:bg-slate-100 dark:hover:bg-slate-700"
                    aria-label="Remove from favorites"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="py-32 text-center bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-300 dark:text-slate-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">No favorites yet</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Browse categories and tap the heart icon to save phrases you want to practice later.
          </p>
          <button 
            onClick={onBack}
            className="mt-8 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Start Browsing
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
