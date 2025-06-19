import React, { useState, useEffect } from 'react';
import './App.css';

// Define TypeScript interfaces for data structure
interface Phrase {
  amharic: string;
  english: string;
  pronunciation: string;
}

interface CategoryData {
  category: string;
  phrases: Phrase[];
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMessage?: string }
> {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center text-red-600 bg-white border border-red-300 rounded-lg shadow-md">
          <p>Error: {this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const PhraseTable: React.FC<{ category: string; phrases?: Phrase[] }> = ({ category, phrases }) => {
  if (!Array.isArray(phrases) || phrases.length === 0) {
    return (
      <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
        <h3 className="mb-2 text-lg font-semibold text-center text-gray-800">{category}</h3>
        <p className="text-center text-gray-600">No phrases available for this category.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-center text-gray-800">{category}</h3>
      <ul className="p-0 m-0 list-none">
        {phrases.map((phrase: Phrase, index: number) => (
          <li key={index} className="py-2 border-b border-gray-200 last:border-0">
            <div className="text-center text-gray-600">
              <p className="font-bold text-black">{phrase.amharic}</p>
              <p>{phrase.english}</p>
              <p className="text-sm italic text-gray-500">{phrase.pronunciation}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  const [phraseData, setPhraseData] = useState<CategoryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Show 9 categories per page for a 3x3 grid

  useEffect(() => {
    fetch('/amharic_phrases.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load amharic_phrases.json: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) {
          throw new Error('Fetched data is not an array');
        }
        const validatedData = data.map((item: any) => ({
          category: item.category || 'Unknown Category',
          phrases: Array.isArray(item.phrases) ? item.phrases : [],
        }));
        console.log('Fetched and validated data (first 3 items):', validatedData.slice(0, 3));
        setPhraseData(validatedData);
      })
      .catch((err: Error) => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(phraseData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = phraseData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 text-white bg-red-600">
        <h1 className="text-2xl font-bold">AMHARIC<span className="text-yellow-300">PhraseBook</span></h1>
        <img src="/Rock_hewn_church.jpg" alt="Amharic Landscape" className="object-cover h-32" />
      </header>
      <main className="flex-grow p-4">
        <div className="flex justify-center">
          <section className="w-full">
            <h2 className="mb-4 text-xl font-semibold text-center">Topics</h2>
            {error ? (
              <div className="text-center text-red-600">
                <p>Error: {error}</p>
              </div>
            ) : phraseData.length === 0 ? (
              <div className="text-center text-gray-600">
                <p>Loading phrases...</p>
              </div>
            ) : (
              <ErrorBoundary>
                <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                  {currentItems.map((item: CategoryData, index: number) => (
                    <PhraseTable
                      key={index}
                      category={item.category}
                      phrases={item.phrases}
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded ${currentPage === page ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-red-500 hover:text-white`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </ErrorBoundary>
            )}
          </section>
        </div>
      </main>
      <footer className="p-4 text-sm text-center bg-gray-100">
        <p>100% free Amharic Phrasebook app, built for travel and offline use. Add it to your Home screen and access 670+ essential phrases in 19 topics. Requires no internet connection and offers speech synthesis, so you know how to pronounce Amharic phrases...</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/facebook.png" alt="Facebook" className="h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/twitter.png" alt="Twitter" className="h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/instagram.png" alt="Instagram" className="h-5" />
          </a>
        </div>
        <p className="mt-2">
          Developed with ♥ by <a href="mailto:eyureaper@gmail.com" className="text-red-600">Eyuel Getachew</a>
        </p>
        <p>
          Logo by Kienan | Pictures by Daily | Data from Wikitravel
          <br />
          © 2025 Eyuel Getachew
        </p>
      </footer>
    </div>
  );
};

export default App;