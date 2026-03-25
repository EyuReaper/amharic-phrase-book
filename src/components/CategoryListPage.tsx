import React from 'react';
import CategoryCard from './CategoryCard';
import { Category } from '../data/dataProcessor';

interface CategoryListPageProps {
  categories: Category[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectCategory: (category: Category) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CategoryListPage: React.FC<CategoryListPageProps> = ({ 
  categories, 
  searchTerm, 
  onSearchChange, 
  onSelectCategory, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="animate-fade-in">
      {/* Search Section */}
      <div className="relative w-full max-w-2xl px-4 mx-auto mb-16">
        <div className="relative group">
          <div className="absolute inset-0 transition-opacity rounded-3xl bg-indigo-600/20 dark:bg-indigo-400/20 blur-xl opacity-0 group-focus-within:opacity-100" />
          <div className="relative flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400 focus-within:border-transparent transition-all">
            <div className="pl-6 text-slate-400 dark:text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Find phrases (Amharic, English, Notes)..."
              className="w-full px-5 py-5 text-xl bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.length > 0 ? (
          currentItems.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              onSelect={onSelectCategory} 
            />
          ))
        ) : (
          <div className="py-20 text-center col-span-full">
            <div className="inline-block p-6 mb-4 bg-slate-100 dark:bg-slate-800 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-2xl font-semibold text-slate-600 dark:text-slate-400">No matches found</p>
            <p className="mt-2 text-slate-400 dark:text-slate-500">Try a different search term or browse by category.</p>
          </div>
        )}
      </div>

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-16 space-x-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[48px] h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 shadow-sm
                ${currentPage === page 
                  ? 'bg-red-600 text-white shadow-red-200 dark:shadow-none shadow-lg scale-110' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-700'}
              `}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
