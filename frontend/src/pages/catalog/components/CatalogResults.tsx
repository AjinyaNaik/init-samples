interface CatalogResultsProps {
  activeCategory: string;
  activeFormat: string;
  activeTypes: string[];
  selectedGenres: string[];
  results: any[];
  isLoading: boolean;
}

export default function CatalogResults({
  activeCategory,
  activeFormat,
  activeTypes,
  selectedGenres,
  results,
  isLoading,
}: CatalogResultsProps) {
  return (
    <div className="md:col-span-3">
      <div
        className="border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.8)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800/80 pb-6">
          <h2 className="text-3xl font-bold flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="capitalize">{activeCategory}</span>
              <span className="capitalize text-zinc-400">{activeFormat}</span>
              <span className="ml-4 px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full border border-zinc-700">
                {results.length} Results
              </span>
            </div>

            {(activeTypes.length > 0 || selectedGenres.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mt-2 text-base font-normal text-zinc-400">
                {activeTypes.length > 0 && (
                  <span>
                    Types: <span className="text-zinc-200">{activeTypes.join(", ")}</span>
                  </span>
                )}
                {activeTypes.length > 0 && selectedGenres.length > 0 && <span className="text-zinc-600">|</span>}
                {selectedGenres.length > 0 && (
                  <span>
                    Genres: <span className="text-zinc-200">{selectedGenres.join(", ")}</span>
                  </span>
                )}
              </div>
            )}
          </h2>
        </div>

        {/* Results List */}
        <div className="flex flex-col flex-grow">
          {isLoading ? (
            <p className="text-zinc-400 text-lg py-20 text-center animate-pulse">Fetching catalogs...</p>
          ) : (
            results.map((result, index) => {
              // Graceful property mappings for both packs and samples
              const title = result.name || "Untitled";
              const genreLabel = Array.isArray(result.genres) ? result.genres.join(", ") : (result.genre || "Global");
              const artworkUrl = result.cover_image || "";
              const price = result.is_selling ? "$ Buy" : "FREE";

              return (
                <div
                  key={result.id}
                  className={`flex flex-row items-center py-5 transition-colors duration-200 group rounded-xl px-4 cursor-pointer hover:bg-zinc-800/50 ${
                    index !== results.length - 1 ? "border-b border-zinc-800/50 mb-1" : ""
                  }`}
                >
                  <div 
                    className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-lg shrink-0 mr-6 group-hover:border-purple-400/50 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] transition-all duration-305 bg-cover bg-center"
                    style={artworkUrl ? { backgroundImage: `url(${artworkUrl})` } : undefined}
                  ></div>

                  <div className="flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-zinc-100 group-hover:text-purple-400 transition-colors duration-200">
                      {title}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1">{genreLabel}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className={`font-semibold ${price === "FREE" ? "text-purple-400" : "text-zinc-300"}`}>
                      {price}
                    </span>
                    <button className="px-5 py-2.5 bg-zinc-800 group-hover:bg-zinc-700 text-zinc-100 rounded-lg font-medium transition-colors hidden md:block">
                      Preview
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {!isLoading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-lg">No results found matching those filter bounds.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}