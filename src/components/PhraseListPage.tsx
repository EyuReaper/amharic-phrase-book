import React from 'react';
import { Category } from '../data/dataProcessor';
import { SpeakerHigh } from '@phosphor-icons/react';

interface PhraseListPageProps {
  category: Category;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const PhraseListPage: React.FC<PhraseListPageProps> = ({ category, onBack, favorites, onToggleFavorite }) => {
  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to set Amharic voice if available, otherwise default might be used (often falls back to English pronunciation which is bad, but better than nothing for now?)
      // Actually for Amharic, if the OS doesn't support it, it might just read letters.
      // Let's try setting lang to 'am-ET'
      utterance.lang = 'am-ET';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Navigation Header */}
      <div className="flex flex-col items-center justify-between mb-12 space-y-6 md:flex-row md:space-y-0">
        <button
          onClick={onBack}
          className="group flex items-center px-6 py-3 font-bold text-slate-700 dark:text-slate-300 transition-all bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Categories
        </button>
        <div className="text-center md:text-right">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{category.name}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">{category.phrases.length} Essential Phrases</p>
        </div>
      </div>

      {/* Phrases Grid/List */}
      <div className="grid gap-6">
        {category.phrases.length > 0 ? (
          category.phrases.map((phrase) => {
            const isFavorited = favorites.includes(phrase.id);
            return (
              <div 
                key={phrase.id} 
                className="relative group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 rounded-3xl overflow-hidden"
              >
                {/* Highlight Bar */}
                <div className={`absolute top-0 left-0 w-2 h-full transition-colors duration-300 ${isFavorited ? 'bg-red-500' : 'bg-slate-100 dark:bg-slate-700 group-hover:bg-indigo-600'}`} />
                
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
                  
                  <div className="flex items-center mt-6 md:mt-0 space-x-4">
                    {phrase.notes && (
                      <div className="max-w-xs">
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                           <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                             <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tighter text-xs mr-2">Context</span>
                             {phrase.notes}
                           </p>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={() => onToggleFavorite(phrase.id)}
                      className={`p-3 rounded-2xl transition-all duration-300 ${isFavorited ? 'bg-red-50 text-red-500 dark:bg-red-900/20' : 'bg-slate-50 text-slate-300 hover:text-red-400 dark:bg-slate-900/50'}`}
                      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isFavorited ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-xl font-medium text-slate-500 dark:text-slate-400">No phrases found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhraseListPage;
