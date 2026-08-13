import type { FilterItem } from "../../../hooks/filterHooks";

interface CatalogSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: FilterItem[];
  loadingCategories: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeFormat: string;
  setActiveFormat: (format: string) => void;
  sampleTypes: FilterItem[];
  loadingSampleTypes: boolean;
  activeTypes: string[];
  toggleType: (type: string) => void;
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
  toggleType,
  genres,
  loadingGenres,
  selectedGenres,
  toggleGenre,
}: CatalogSidebarProps) {
  return (
    <div className="md:col-span-1 flex flex-col gap-6 pr-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search catalog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-zinc-500 shadow-sm"
        />
      </div>

      {/* 1. Category Filter Card */}
      <div
        className="border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Category</h3>
        {loadingCategories ? (
          <p className="text-xs text-zinc-500 px-2 animate-pulse">Loading...</p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                toggleGenre(""); // Resets selections
              }}
              className={`text-left px-4 py-2.5 rounded-lg font-bold transition-all duration-300 capitalize ${
                activeCategory === cat.name
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {cat.name}
            </button>
          ))
        )}
      </div>

      {/* 2. Format Filter Card */}
      <div
        className="border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Format</h3>
        {["packs", "standalones"].map((format) => (
          <button
            key={format}
            onClick={() => setActiveFormat(format)}
            className={`text-left px-4 py-2.5 rounded-lg font-bold transition-all duration-300 capitalize ${
              activeFormat === format
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            {format}
          </button>
        ))}
      </div>

      {/* 3. Type Filter Card */}
      <div
        className="border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Type</h3>
        {loadingSampleTypes ? (
          <p className="text-xs text-zinc-500 px-2 animate-pulse">Loading...</p>
        ) : (
          sampleTypes.map((type) => {
            const isSelected = activeTypes.includes(type.name);
            return (
              <button
                key={type.id}
                onClick={() => toggleType(type.name)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg font-bold transition-all duration-300 capitalize ${
                  isSelected
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                <span>{type.name}</span>
                {isSelected && (
                  <svg className="w-5 h-5 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        className="border border-zinc-800 rounded-xl p-4 flex flex-col shadow-sm"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
      >
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 border-b border-zinc-800/80 pb-3 px-2">
          System Genres
        </h3>
        {loadingGenres ? (
          <p className="text-xs text-zinc-500 px-2 animate-pulse">Loading...</p>
        ) : (
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.name);
              return (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.name)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm font-semibold text-left ${
                    isSelected
                      ? "bg-zinc-800 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
                >
                  <span>{genre.name}</span>
                  {isSelected && (
                    <svg className="w-4 h-4 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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