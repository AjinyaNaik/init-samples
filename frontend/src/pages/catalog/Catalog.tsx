import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCategories, useSampleTypes, useGenres } from "../../hooks/filterHooks";
import { useFilteredSamplePacks } from "../../hooks/samplePackHooks";
import { useFilteredSamples } from "../../hooks/sampleHooks";
import CatalogSidebar from "./components/CatalogSidebar";
import CatalogResults from "./components/CatalogResults";
import { Link } from "react-router-dom";
import { getStoredUser } from '../../utils/auth';

export default function Catalog() {
  const { categories, isLoading: loadingCategories } = useCategories();
  const { sampleTypes, isLoading: loadingSampleTypes } = useSampleTypes();
  const { genres, isLoading: loadingGenres } = useGenres();

  const { samplePacks, fetchFilteredSamplePacks, isLoading: loadingPacks } = useFilteredSamplePacks();
  const { samples, fetchFilteredSamples, isLoading: loadingSamples } = useFilteredSamples();

  const [activeCategory, setActiveCategory] = useState<string[]>(["Samples"]);
  const [activeFormat, setActiveFormat] = useState<string>("packs");

  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filters = {
      category: activeCategory,
      sample_type: activeTypes,
      genre: selectedGenres,
    };

    if (activeFormat === "packs") {
      fetchFilteredSamplePacks(filters).catch(err => console.error(err));
    }
    else {
      fetchFilteredSamples(filters).catch(err => console.error(err));
    }
  }, [activeCategory, activeFormat, activeTypes, selectedGenres]);

  const toggleType = (type: string) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleGenre = (genre: string) => {
    if (!genre) {
      setSelectedGenres([]);
      return;
    }
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Select which data list to display on-screen
  const currentResults = activeFormat === "packs" ? samplePacks : samples;
  const isResultsLoading = activeFormat === "packs" ? loadingPacks : loadingSamples;

  // Simple client-side search query match filter
  const filteredResults = currentResults.filter((item: any) =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const user = getStoredUser();

  return (
    <div
      className="w-full min-h-screen text-zinc-50 pt-24 px-8 pb-32 bg-zinc-950 bg-top bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(9, 9, 11, 0.6), rgba(9, 9, 11, 0.8)), url(/catalog-page-1.png)",
        backgroundSize: "90% 100%",
      }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="absolute top-6 right-10 mr-[2%] z-50 flex items-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              title={`Go to ${user.username}'s Dashboard`}
              className="w-11 h-11 rounded-full bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/40 flex items-center justify-center text-purple-300 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-bold text-purple-200 bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/40 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-full transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        <motion.h1
          className="text-6xl md:text-7xl pb-4 mb-8 text-center md:text-left text-purple-300"
          style={{ fontFamily: "'Shrikhand', cursive" }}
          animate={{
            opacity: [1, 0.4, 1, 1, 0.2, 1, 1],
            textShadow: [
              "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
              "0 0 0px #fff, 0 0 0px #fff, 0 0 0px #d8b4fe, 0 0 0px #a855f7, 0 0 0px #a855f7",
              "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
              "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
              "0 0 0px #fff, 0 0 0px #fff, 0 0 0px #d8b4fe, 0 0 0px #a855f7, 0 0 0px #a855f7",
              "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #d8b4fe, 0 0 80px #a855f7, 0 0 120px #a855f7",
              "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          The Init Catalog
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <CatalogSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            loadingCategories={loadingCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeFormat={activeFormat}
            setActiveFormat={setActiveFormat}
            sampleTypes={sampleTypes}
            loadingSampleTypes={loadingSampleTypes}
            activeTypes={activeTypes}
            setActiveTypes={setActiveTypes}
            genres={genres}
            loadingGenres={loadingGenres}
            selectedGenres={selectedGenres}
            toggleGenre={toggleGenre}
          />

          <CatalogResults
            activeCategory={activeCategory}
            activeFormat={activeFormat}
            activeTypes={activeTypes}
            selectedGenres={selectedGenres}
            results={filteredResults}
            isLoading={isResultsLoading}
          />

        </div>
      </div>
    </div>
  );
}