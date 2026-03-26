import React, { useState } from 'react';
import { Calculator, Phone, ListNumbers, Question } from '@phosphor-icons/react';

const ToolkitPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [amount, setAmount] = useState<string>('1');
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  
  // Approximate rate - in a real app, fetch this live
  const rates = { USD: 120, EUR: 130 };
  const converted = parseFloat(amount || '0') * rates[currency];

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
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Traveler's Toolkit</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">Essentials for your journey</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Currency Converter */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-600 dark:text-indigo-400 pointer-events-none">
            <Calculator size={120} weight="fill" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-6 space-x-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                <Calculator size={32} weight="duotone" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Currency Estimator</h3>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 focus-within:ring-2 ring-indigo-500 transition-all">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Amount</label>
                <div className="flex items-center justify-between">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent text-3xl font-black text-slate-900 dark:text-white outline-none placeholder-slate-300"
                    placeholder="100"
                  />
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR')}
                    className="bg-white dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300 py-2 px-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center p-2 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <div className="p-6 bg-indigo-600 rounded-3xl text-white text-center shadow-lg shadow-indigo-200 dark:shadow-none">
                <p className="text-indigo-200 font-medium text-sm uppercase tracking-widest mb-1">Approximately</p>
                <p className="text-4xl font-black">{converted.toLocaleString()} ETB</p>
                <p className="text-xs text-indigo-300 mt-2 opacity-70">*Rates are estimates only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-red-600 pointer-events-none">
            <Phone size={120} weight="fill" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-6 space-x-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400">
                <Phone size={32} weight="duotone" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Emergency</h3>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Police', number: '991', icon: '👮‍♂️' },
                { name: 'Ambulance', number: '907', icon: '🚑' },
                { name: 'Fire', number: '939', icon: '🚒' },
              ].map((item) => (
                <a 
                  key={item.name}
                  href={`tel:${item.number}`}
                  className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-black text-slate-900 dark:text-white">{item.number}</span>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-slate-400 group-hover:text-red-500 transition-colors">
                      <Phone size={16} weight="fill" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Numbers Cheat Sheet */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
           <div className="flex items-center mb-8 space-x-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                <ListNumbers size={32} weight="duotone" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Quick Numbers</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: '1', am: 'አንድ (And)' },
                { en: '2', am: 'ሁለት (Hulet)' },
                { en: '3', am: 'ሶስት (Sost)' },
                { en: '4', am: 'አራት (Arat)' },
                { en: '5', am: 'አምስት (Amist)' },
                { en: '6', am: 'ስድስት (Sidist)' },
                { en: '7', am: 'ሰባት (Sebat)' },
                { en: '8', am: 'ስምንት (Simint)' },
                { en: '9', am: 'ዘጠኝ (Zetegn)' },
                { en: '10', am: 'አስር (Asir)' },
                { en: '100', am: 'መቶ (Meto)' },
                { en: '1000', am: 'ሺህ (Shih)' },
              ].map((num) => (
                <div key={num.en} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white mb-1">{num.en}</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{num.am}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolkitPage;
