import type { FilterItem } from "../../../hooks/filterHooks";

interface CatalogSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: FilterItem[];
  loadingCategories: boolean;
  activeCategory: string[];
  setActiveCategory: (cats: string[]) => void;
  activeFormat: string;
  setActiveFormat: (format: string) => void;
  sampleTypes: FilterItem[];
  loadingSampleTypes: boolean;
  activeTypes: string[];
  setActiveTypes: (types: string[]) => void;
  genres: FilterItem[];
  loadingGenres: boolean;
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
}

export default function CatalogSidebar({
  searchQuery,
  setSearchQuery,
  categories,
  loadingCategories,
  activeCategory,
  setActiveCategory,
  activeFormat,
  setActiveFormat,
  sampleTypes,
  loadingSampleTypes,
  activeTypes,
  setActiveTypes,
  genres,
  loadingGenres,
  selectedGenres,
  toggleGenre,
}: CatalogSidebarProps) {

  const handleTypeClick = (typeName: string) => {
    if (activeFormat === "standalones") {
      if (activeTypes.includes(typeName)) {
        setActiveTypes([]);
      } else {
        setActiveTypes([typeName]);
      }
    } else {
      if (activeTypes.includes(typeName)) {
        setActiveTypes(activeTypes.filter((t) => t !== typeName));
      } 
      else {
        setActiveTypes([...activeTypes, typeName]);
      }
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (activeFormat === "standalones") {
      if (activeCategory.includes(catName)) {
        setActiveCategory([]);
      } else {
        setActiveCategory([catName]);
      }
    } else {
      if (activeCategory.includes(catName)) {
        setActiveCategory(activeCategory.filter((c) => c !== catName));
      } else {
        setActiveCategory([...activeCategory, catName]);
      }
    }
    toggleGenre("");
  };

  return (
    <div className="w-full md:col-span-1 flex flex-col gap-5 md:pr-0">
      {/* Search Bar */}
      <div className="relative mb-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="h-4.5 w-4.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search catalog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl py-2.5 pl-10 pr-3.5 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors shadow-sm"
        />
      </div>

      {/* 2. Format Filter Card */}
      <div
        className="w-full border border-zinc-800 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 px-1">Format</h3>
        {["packs", "standalones"].map((format) => (
          <button
            key={format}
            onClick={() => {
              setActiveFormat(format);
              setActiveTypes([]);
              setActiveCategory([]);
            }}
            className={`text-left px-3 py-1.5 rounded-md text-[13px] font-bold transition-all duration-300 capitalize ${activeFormat === format
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
          >
            {format}
          </button>
        ))}
      </div>


      {/* 1. Category Filter Card */}
      <div
        className="w-full border border-zinc-800 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 px-1">Category</h3>
        {loadingCategories ? (
          <p className="text-[10px] text-zinc-500 px-1 animate-pulse">Loading...</p>
        ) : (
          categories.map((cat) => {
            const isSelected = activeCategory.includes(cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-md text-[13px] font-bold transition-all duration-300 capitalize ${
                  isSelected
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* 3. Type Filter Card */}
      <div
        className="w-full border border-zinc-800 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 px-1">Type</h3>
        {loadingSampleTypes ? (
          <p className="text-[10px] text-zinc-500 px-1 animate-pulse">Loading...</p>
        ) : (
          sampleTypes.map((type) => {
            const isSelected = activeTypes.includes(type.name);
            return (
              <button
                key={type.id}
                onClick={() => handleTypeClick(type.name)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-md text-[13px] font-bold transition-all duration-300 capitalize ${isSelected
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
              >
                <span>{type.name}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* 4. Genre List Card */}
      <div
        className="w-full border border-zinc-800 rounded-xl p-4 flex flex-col shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 border-b border-zinc-800/80 pb-2 px-1">
          System Genres
        </h3>
        {loadingGenres ? (
          <p className="text-[10px] text-zinc-500 px-1 animate-pulse">Loading...</p>
        ) : (
          <div className="flex flex-col gap-1 max-h-52 overflow-y-auto pr-0.5">
            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.name);
              return (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.name)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-md text-[13px] font-semibold text-left transition-all duration-300 ${isSelected
                      ? "bg-zinc-800 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                    }`}
                >
                  <span>{genre.name}</span>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}