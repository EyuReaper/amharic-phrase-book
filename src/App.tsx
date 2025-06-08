import React from 'react';
import PhraseTableWithErrorBoundary from './PhraseTable';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-red-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AMHARIC<span className="text-yellow-300">PhraseBook</span></h1>
        <img src="/Rock_hewn_church.jpg" alt="Amharic Landscape" className="h-32 object-cover" />
      </header>
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">Topics</h2>
            <PhraseTableWithErrorBoundary />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Guides</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded shadow">
                <h3 className="font-medium">Pronunciation</h3>
                <p>Read Wikitravel's pronunciation guide...</p>
              </div>
              <div className="p-4 border rounded shadow">
                <h3 className="font-medium">Grammar</h3>
                <p>Read Wikitravel's grammar guide...</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-gray-100 p-4 text-center text-sm">
        <p>100% free Amharic Phrasebook app, built for travel and offline use. Add it to your Home screen and access 670+ essential phrases in 19 topics. Requires no internet connection and offers speech synthesis, so you know how to pronounce Amharic phrases...</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/20" alt="Facebook" className="h-5" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/20" alt="Twitter" className="h-5" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/20" alt="Instagram" className="h-5" /></a>
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