import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Phrase } from '../data/dataProcessor';

interface AnkiModeProps {
  phrases: Phrase[];
  onExit: () => void;
}

const AnkiMode: React.FC<AnkiModeProps> = ({ phrases, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [shuffledPhrases, setShuffledPhrases] = useState<Phrase[]>([]);
  const [direction, setDirection] = useState<'next' | 'prev' | 'none'>('none');

  useEffect(() => {
    const shuffled = [...phrases].sort(() => Math.random() - 0.5);
    setShuffledPhrases(shuffled);
  }, [phrases]);

  const currentPhrase = shuffledPhrases[currentIndex];

  const handleNext = useCallback((isCorrect: boolean) => {
    setScore(prev => ({ 
      correct: prev.correct + (isCorrect ? 1 : 0), 
      total: prev.total + 1 
    }));
    
    setDirection('next');
    setIsFlipped(false);
    
    setTimeout(() => {
      if (currentIndex < shuffledPhrases.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        const reshuffled = [...phrases].sort(() => Math.random() - 0.5);
        setShuffledPhrases(reshuffled);
        setCurrentIndex(0);
      }
      setDirection('none');
    }, 300);
  }, [currentIndex, shuffledPhrases.length, phrases]);

  if (!currentPhrase) return null;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in px-4">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onExit}
          className="group flex items-center px-5 py-2.5 text-sm font-bold transition-all bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Exit Practice
        </button>
        <div className="flex items-center space-x-4">
          <div className="text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Accuracy</p>
             <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
               {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
             </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 mb-12 overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-full shadow-inner">
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-700 ease-out bg-gradient-to-r from-indigo-500 to-red-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
          style={{ width: `${((currentIndex + 1) / shuffledPhrases.length) * 100}%` }}
        />
      </div>

      {/* Flashcard Container */}
      <div className={`perspective-1000 w-full h-[450px] transition-all duration-300 ${direction === 'next' ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full h-full cursor-pointer transition-all duration-700 preserve-3d shadow-2xl rounded-[3rem] ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full p-12 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 backface-hidden rounded-[3rem] overflow-hidden">
            <div className="absolute top-8 left-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600">
              Amharic
            </div>
            
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-red-50 dark:bg-red-900/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-50" />

            <h3 className="relative z-10 text-6xl font-black text-slate-900 dark:text-white font-amharic leading-tight mb-8">
              {currentPhrase.amharic}
            </h3>
            
            <p className="relative z-10 px-6 py-2 bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-widest text-[10px] rounded-full animate-pulse">
              Tap to Flip
            </p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full p-12 flex flex-col items-center justify-center text-center bg-indigo-600 dark:bg-indigo-900 border border-indigo-500 rotate-y-180 backface-hidden rounded-[3rem] shadow-indigo-500/50 shadow-2xl">
            <div className="absolute top-8 left-12 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200/50">
              English
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl font-black text-white tracking-tight">
                {currentPhrase.english}
              </h3>
              <div className="h-1 w-12 mx-auto bg-white/20 rounded-full" />
              <p className="text-2xl font-medium text-indigo-100 italic font-sans">
                [{currentPhrase.pronunciation}]
              </p>
              {currentPhrase.notes && (
                <p className="max-w-xs mx-auto text-sm text-indigo-200/80 leading-relaxed font-medium">
                  "{currentPhrase.notes}"
                </p>
              )}
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute bottom-12 flex space-x-6">
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                className="group relative px-8 py-3.5 font-black text-xs uppercase tracking-widest text-white transition-all bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl active:scale-95"
              >
                Hard
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                className="px-10 py-3.5 font-black text-xs uppercase tracking-widest text-indigo-600 transition-all bg-white hover:bg-indigo-50 rounded-2xl shadow-xl active:scale-95"
              >
                Easy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-3 animate-pulse"></span>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
            {shuffledPhrases.length - currentIndex} Cards remaining
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnkiMode;
