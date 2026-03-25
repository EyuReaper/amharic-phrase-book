import React from 'react';
import { Category } from '../data/dataProcessor';

const CategoryCard: React.FC<{
  category: Category;
  onSelect: (category: Category) => void;
}> = React.memo(({ category, onSelect }) => {
  return (
    <button
      className="group relative flex flex-col items-start justify-end p-8 text-left transition-all duration-500 bg-white dark:bg-slate-800 shadow-lg dark:shadow-2xl cursor-pointer rounded-3xl hover:shadow-2xl hover:-translate-y-2 overflow-hidden border border-slate-100 dark:border-slate-700 w-full min-h-[200px]"
      onClick={() => onSelect(category)}
    >
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-indigo-600/5 to-red-600/5 dark:from-indigo-400/10 dark:to-red-400/10 group-hover:opacity-100" />
      
      {/* Icon/Circle Decor */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {category.name}
        </h3>
        <div className="flex items-center mt-2">
          <span className="px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
            {category.phrases.length} Phrases
          </span>
        </div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity dark:text-slate-400">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
    </button>
  );
});

export default CategoryCard;
