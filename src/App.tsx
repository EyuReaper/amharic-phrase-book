import React, { useState, useCallback, useMemo, useEffect } from "react";
import CategoryListPage from "./components/CategoryListPage";
import PhraseListPage from "./components/PhraseListPage";
import AnkiMode from "./components/AnkiMode";
import FavoritesPage from "./components/FavoritesPage";
import ToolkitPage from "./components/ToolkitPage";
import { Category, Phrase, processPhraseData } from "./data/dataProcessor";
import Fuse from "fuse.js";
import {
  Heart,
  Toolbox,
  BookOpen,
  Fire,
  Globe,
  HandHeart,
} from "@phosphor-icons/react";
import { useLanguage } from "./contexts/LanguageContext";

const App: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentView, setCurrentView] = useState<
    "categories" | "phrases" | "anki" | "favorites" | "toolkit"
  >("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem("streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const itemsPerPage = 9;

  useEffect(() => {
    // Streak Logic
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit === yesterday.toDateString()) {
        setStreak((prev) => {
          const newStreak = prev + 1;
          localStorage.setItem("streak", JSON.stringify(newStreak));
          return newStreak;
        });
      } else {
        setStreak(1);
        localStorage.setItem("streak", JSON.stringify(1));
      }
      localStorage.setItem("lastVisit", today);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetch("/amharic_phrases_v2.json")
      .then((res) => res.json())
      .then((data) => {
        const processed = processPhraseData(data);
        setCategories(processed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load phrases:", err);
        setLoading(false);
      });
  }, []);

  const fuse = useMemo(() => {
    const allPhrases = categories.flatMap((cat) =>
      cat.phrases.map((p) => ({ ...p, categoryName: cat.name })),
    );

    return new Fuse(allPhrases, {
      keys: ["amharic", "english", "notes", "categoryName"],
      threshold: 0.3,
      distance: 100,
    });
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;

    const results = fuse.search(searchTerm);
    const resultIds = new Set(results.map((r) => r.item.id));

    return categories
      .map((categoryData) => ({
        ...categoryData,
        phrases: categoryData.phrases.filter((phrase) =>
          resultIds.has(phrase.id),
        ),
      }))
      .filter((categoryData) => categoryData.phrases.length > 0);
  }, [searchTerm, categories, fuse]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setCurrentView("phrases");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
    setCurrentView("categories");
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-slate-600">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen pb-12 font-sans bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-100 dark:bg-red-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] rounded-full bg-indigo-100 dark:bg-indigo-900/20 blur-[100px]"></div>
      </div>

      {/* Support Button - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <a
          href="https:/gurshaplus.com/EyuReaper"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-orange-200 dark:hover:shadow-none hover:-translate-y-1 transition-all active:scale-95 border-2 border-white/20"
        >
          <HandHeart
            size={20}
            weight="fill"
            className="mr-2 group-hover:animate-bounce"
          />
          <span className="font-amharic">{t("feed_me_gursha")}</span>
        </a>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl px-6 py-12 text-center md:text-left">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex-1">
            {/* Top Navigation */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6 pt-12 md:pt-0">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 bg-white dark:bg-slate-800 shadow-xl rounded-2xl hover:scale-110 active:scale-95 transition-all border border-slate-100 dark:border-slate-700"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <button
                onClick={toggleLanguage}
                className="p-3 bg-white dark:bg-slate-800 shadow-xl rounded-2xl hover:scale-110 active:scale-95 transition-all border border-slate-100 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
                aria-label="Toggle Language"
              >
                <Globe size={20} weight="duotone" />
                {language === "en" ? "AM" : "EN"}
              </button>

              <div
                className="flex items-center px-4 py-3 font-black text-orange-500 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/50 shadow-sm"
                title="Daily Streak"
              >
                <Fire size={20} weight="fill" className="mr-2 animate-pulse" />
                {streak} Days
              </div>

              <button
                onClick={() => setCurrentView("favorites")}
                className={`flex items-center px-5 py-3 font-bold rounded-2xl transition-all shadow-lg active:scale-95 border
                  ${
                    currentView === "favorites"
                      ? "bg-red-500 text-white border-red-500 shadow-red-200 dark:shadow-none"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
              >
                <Heart
                  size={20}
                  weight={currentView === "favorites" ? "fill" : "duotone"}
                  className="mr-2"
                />
                {t("nav.favorites")}
              </button>

              <button
                onClick={() => setCurrentView("toolkit")}
                className={`flex items-center px-5 py-3 font-bold rounded-2xl transition-all shadow-lg active:scale-95 border
                  ${
                    currentView === "toolkit"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200 dark:shadow-none"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
              >
                <Toolbox
                  size={20}
                  weight={currentView === "toolkit" ? "fill" : "duotone"}
                  className="mr-2"
                />
                {t("nav.toolkit")}
              </button>

              {currentView !== "anki" && (
                <button
                  onClick={() => setCurrentView("anki")}
                  className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center"
                >
                  <BookOpen size={20} weight="duotone" className="mr-2" />
                  {t("nav.practice")}
                </button>
              )}
            </div>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              {language === "en" ? (
                <>
                  AMHARIC<span className="text-red-600">.</span>
                  <br className="md:hidden" />
                  <span className="text-indigo-600 dark:text-indigo-400">
                    PhraseBook
                  </span>
                </>
              ) : (
                <>{t("app.title")}</>
              )}
            </h1>
            <p className="mt-4 text-xl font-medium text-slate-500 dark:text-slate-400 max-w-lg">
              {t("app.subtitle")}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="relative p-2 bg-white dark:bg-slate-800 shadow-2xl rounded-3xl rotate-3 border border-slate-100 dark:border-slate-700">
              <img
                src="/images/Rock_hewn_church.jpg"
                alt="Amharic Landscape"
                className="object-cover w-64 h-48 shadow-inner rounded-2xl opacity-90 dark:opacity-80"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300/CCCCCC/333333?text=Ethiopia";
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-5xl px-6">
        {currentView === "categories" ? (
          <CategoryListPage
            categories={filteredCategories}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSelectCategory={handleSelectCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : currentView === "phrases" ? (
          selectedCategory && (
            <PhraseListPage
              category={selectedCategory}
              onBack={handleBackToCategories}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )
        ) : currentView === "anki" ? (
          <AnkiMode
            phrases={
              selectedCategory
                ? selectedCategory.phrases
                : categories.flatMap((c) => c.phrases)
            }
            onExit={() =>
              setCurrentView(selectedCategory ? "phrases" : "categories")
            }
          />
        ) : currentView === "favorites" ? (
          <FavoritesPage
            favorites={favorites}
            phrases={categories.flatMap((c) => c.phrases)}
            onToggleFavorite={handleToggleFavorite}
            onPractice={() => {
              setSelectedCategory({
                id: "favorites",
                name: "My Favorites",
                phrases: categories
                  .flatMap((c) => c.phrases)
                  .filter((p) => favorites.includes(p.id)),
              });
              setCurrentView("anki");
            }}
            onBack={handleBackToCategories}
          />
        ) : (
          <ToolkitPage onBack={handleBackToCategories} />
        )}
      </main>

      {/* Scroll to Top */}
      {showScrollTopButton && (
        <button
          onClick={handleScrollToTop}
          className="fixed z-50 p-4 text-white transition-all duration-300 bg-red-600 rounded-2xl shadow-2xl bottom-8 right-8 hover:bg-red-700 hover:-translate-y-1 active:scale-95"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl px-6 mt-20 text-center border-t border-slate-200 dark:border-slate-800 pt-12">
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="text-left">
            <h3 className="text-2xl font-bold">Amharic Phrasebook</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              100% Free • Offline First • Open Source
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://x.com/@eyu_gx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 transition-all bg-white dark:bg-slate-800 shadow-sm rounded-xl hover:text-black dark:hover:text-white hover:-translate-y-1 active:scale-95 border border-transparent dark:border-slate-700"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.634l4.704 6.223 5.656-6.223zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              href="https://t.me/@EyuReaper"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 transition-all bg-white dark:bg-slate-800 shadow-sm rounded-xl hover:text-blue-500 hover:-translate-y-1 active:scale-95 border border-transparent dark:border-slate-700"
              aria-label="Telegram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.38-.49 1.04-.74 4.06-1.77 6.76-2.93 8.11-3.47 3.85-1.53 4.65-1.8 5.17-1.81.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.14-.03.21z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/eyuel-getachew-37061513b"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 transition-all bg-white dark:bg-slate-800 shadow-sm rounded-xl hover:text-blue-700 hover:-translate-y-1 active:scale-95 border border-transparent dark:border-slate-700"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2.3.7-2.8 1.7V10.2H10v8.3h3v-4.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v4.5h3M6.7 10.2h3v8.3h-3V10.2M7 8.5c1 0 1.8-.8 1.8-1.8S8 4.9 7 4.9s-1.8.8-1.8 1.8.8 1.8 1.8 1.8z" />
              </svg>
            </a>
            <a
              href="https://github.com/EyuReaper"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 transition-all bg-white dark:bg-slate-800 shadow-sm rounded-xl hover:text-black dark:hover:text-white hover:-translate-y-1 active:scale-95 border border-transparent dark:border-slate-700"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-12 text-slate-400 dark:text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Made with 🩶 Eyuel Getachew.
            Inspired by Japanese Phrasebook.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
