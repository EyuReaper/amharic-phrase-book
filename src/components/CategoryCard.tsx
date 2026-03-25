import React, { useMemo } from 'react';
import { Category } from '../data/dataProcessor';
import { 
  Sparkle, 
  Airplane, 
  Bed, 
  ForkKnife, 
  BeerBottle, 
  ShoppingBag, 
  Bank, 
  Clock, 
  Hash, 
  Users, 
  ShieldCheck, 
  ChatCircleText, 
  WarningOctagon, 
  PhoneCall, 
  Palette, 
  Warning,
  SteeringWheel,
  FirstAid,
  Question
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ElementType> = {
  'basic': Sparkle,
  'transportation': Airplane,
  'lodging': Bed,
  'eating': ForkKnife,
  'bars': BeerBottle,
  'shopping': ShoppingBag,
  'money': Bank,
  'time': Clock,
  'numbers': Hash,
  'family': Users,
  'authority': ShieldCheck,
  'typicalexpression': ChatCircleText,
  'signs': WarningOctagon,
  'phonecalls': PhoneCall,
  'color': Palette,
  'offensivewords': Warning,
  'driving': SteeringWheel,
  'health': FirstAid,
};

const colorMap: Record<string, { bg: string, text: string, darkBg: string, darkText: string, accent: string }> = {
  'basic': { bg: 'bg-indigo-50', text: 'text-indigo-600', darkBg: 'dark:bg-indigo-900/30', darkText: 'dark:text-indigo-400', accent: 'indigo' },
  'transportation': { bg: 'bg-blue-50', text: 'text-blue-600', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-400', accent: 'blue' },
  'lodging': { bg: 'bg-amber-50', text: 'text-amber-600', darkBg: 'dark:bg-amber-900/30', darkText: 'dark:text-amber-400', accent: 'amber' },
  'eating': { bg: 'bg-red-50', text: 'text-red-600', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-400', accent: 'red' },
  'bars': { bg: 'bg-purple-50', text: 'text-purple-600', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-400', accent: 'purple' },
  'shopping': { bg: 'bg-emerald-50', text: 'text-emerald-600', darkBg: 'dark:bg-emerald-900/30', darkText: 'dark:text-emerald-400', accent: 'emerald' },
  'money': { bg: 'bg-green-50', text: 'text-green-600', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-400', accent: 'green' },
  'time': { bg: 'bg-cyan-50', text: 'text-cyan-600', darkBg: 'dark:bg-cyan-900/30', darkText: 'dark:text-cyan-400', accent: 'cyan' },
  'numbers': { bg: 'bg-slate-100', text: 'text-slate-600', darkBg: 'dark:bg-slate-800', darkText: 'dark:text-slate-400', accent: 'slate' },
  'family': { bg: 'bg-rose-50', text: 'text-rose-600', darkBg: 'dark:bg-rose-900/30', darkText: 'dark:text-rose-400', accent: 'rose' },
  'authority': { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/40', darkText: 'dark:text-blue-300', accent: 'blue' },
  'typicalexpression': { bg: 'bg-sky-50', text: 'text-sky-600', darkBg: 'dark:bg-sky-900/30', darkText: 'dark:text-sky-400', accent: 'sky' },
  'signs': { bg: 'bg-orange-50', text: 'text-orange-600', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-400', accent: 'orange' },
  'phonecalls': { bg: 'bg-teal-50', text: 'text-teal-600', darkBg: 'dark:bg-teal-900/30', darkText: 'dark:text-teal-400', accent: 'teal' },
  'color': { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', darkBg: 'dark:bg-fuchsia-900/30', darkText: 'dark:text-fuchsia-400', accent: 'fuchsia' },
  'offensivewords': { bg: 'bg-red-100', text: 'text-red-700', darkBg: 'dark:bg-red-900/40', darkText: 'dark:text-red-300', accent: 'red' },
  'driving': { bg: 'bg-amber-100', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/40', darkText: 'dark:text-amber-300', accent: 'amber' },
  'health': { bg: 'bg-rose-100', text: 'text-rose-700', darkBg: 'dark:bg-rose-900/40', darkText: 'dark:text-rose-300', accent: 'rose' },
};

const CategoryCard: React.FC<{
  category: Category;
  onSelect: (category: Category) => void;
}> = React.memo(({ category, onSelect }) => {
  const normalizedId = useMemo(() => 
    category.id.toLowerCase().replace(/[^a-z]/g, ''), 
  [category.id]);

  const Icon = useMemo(() => iconMap[normalizedId] || Question, [normalizedId]);
  const colors = useMemo(() => 
    colorMap[normalizedId] || { bg: 'bg-slate-50', text: 'text-slate-600', darkBg: 'dark:bg-slate-900', darkText: 'dark:text-slate-400', accent: 'slate' }, 
  [normalizedId]);

  return (
    <button
      className="group relative flex flex-col items-start justify-end p-8 text-left transition-all duration-500 bg-white dark:bg-slate-800 shadow-lg dark:shadow-2xl cursor-pointer rounded-3xl hover:shadow-2xl hover:-translate-y-2 overflow-hidden border border-slate-100 dark:border-slate-700 w-full min-h-[220px]"
      onClick={() => onSelect(category)}
    >
      {/* Dynamic Decorative Gradient Background */}
      <div className={`absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-${colors.accent}-500/5 to-transparent dark:from-${colors.accent}-400/10 group-hover:opacity-100`} />
      
      {/* Colorful Icon Wrapper */}
      <div className={`absolute top-6 right-6 w-16 h-16 rounded-2xl ${colors.bg} ${colors.darkBg} ${colors.text} ${colors.darkText} flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 group-hover:scale-110`}>
        <Icon weight="duotone" size={32} className="transition-transform duration-500 group-hover:rotate-12" />
      </div>

      <div className="relative z-10 w-full">
        <div className="flex flex-col space-y-3">
          <h3 className={`text-2xl font-black text-slate-800 dark:text-white group-hover:${colors.text} dark:group-hover:${colors.darkText} transition-colors tracking-tight`}>
            {category.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-widest ${colors.text} ${colors.darkText} ${colors.bg} ${colors.darkBg} rounded-full border border-current opacity-80`}>
              {category.phrases.length} Phrases
            </span>
          </div>
        </div>
      </div>

      {/* Large Colorful Pattern Overlay */}
      <div className={`absolute bottom-[-20%] right-[-10%] p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 ${colors.text} dark:${colors.darkText} pointer-events-none group-hover:scale-110 group-hover:-rotate-12`}>
        <Icon weight="fill" size={160} />
      </div>
    </button>
  );
});

export default CategoryCard;

