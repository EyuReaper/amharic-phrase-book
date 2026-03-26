import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "PhraseBook",
    "app.subtitle":
      "Unlock the heartbeat of Ethiopia. Essential phrases for travelers, learners, and dreamers.",
    "nav.practice": "Practice",
    "nav.favorites": "Favorites",
    "nav.toolkit": "Toolkit",
    "search.placeholder": "Find phrases...",
    "footer.made_with": "Made with 🩶 Eyuel Getachew",
    loading: "Loading your Amharic guide...",
    "category.phrases": "Phrrases",
    "practice.exit": "Exit Practice",
    "practice.accuracy": "Accuracy",
    "toolkit.title": "Traveler's Toolkit",
    "favorites.title": "Your Favorites",
    "favorites.practice": "Practice These Phrases",
    back: "Back",
    feed_me_gursha: "Feed me Gursha",
  },
  am: {
    "app.title": "የአማርኛ ሀረግመጽሐፍ",
    "app.subtitle": "የኢትዮጵያን ልብ ይክፈቱ። ለተጓዦች እና ተማሪዎች አስፈላጊ ቃላት።",
    "nav.practice": "ልምምድ",
    "nav.favorites": "የተወደዱ",
    "nav.toolkit": "መሳሪያዎች",
    "search.placeholder": "ቃላትን ይፈልጉ...",
    "footer.made_with": "በ 🩶 ኢዮኤል ጌታቸው የተሰራ",
    loading: "መዝገበ ቃላቱን በመጫን ላይ...",
    "category.phrases": "ቃላት",
    "practice.exit": "ውጣ",
    "practice.accuracy": "ትክክለኛነት",
    "toolkit.title": "የተጓዥ መሳሪያዎች",
    "favorites.title": "የእርስዎ ምርጫዎች",
    "favorites.practice": "እነዚህን ቃላት ይለማመዱ",
    back: "ተመለስ",
    feed_me_gursha: "ጉርሻ አጉርሱሻ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "am" : "en"));
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
