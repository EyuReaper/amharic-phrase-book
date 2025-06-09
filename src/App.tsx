import React from 'react';
import PhraseTableWithErrorBoundary from './PhraseTable';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 text-white bg-red-600">
        <h1 className="text-2xl font-bold">AMHARIC<span className="text-yellow-300">PhraseBook</span></h1>
        <img src="/Rock_hewn_church.jpg" alt="Amharic Landscape" className="object-cover h-32" />
      </header>
      <main className="flex-grow p-4">
        <div className="flex justify-center">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-center">Topics</h2>
            <PhraseTableWithErrorBoundary />
          </section>
        </div>
      </main>
      <footer className="p-4 text-sm text-center bg-gray-100">
        <p>100% free Amharic Phrasebook app, built for travel and offline use. Add it to your Home screen and access 670+ essential phrases in 19 topics. Requires no internet connection and offers speech synthesis, so you know how to pronounce Amharic phrases...</p>
        <div className="flex justify-center mt-2 space-x-4">
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