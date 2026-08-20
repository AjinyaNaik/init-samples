import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 6; // 6 items per page

interface CatalogResultsProps {
  activeCategory: string[];
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
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pagedResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 whenever filters or format change
  useEffect(() => {
    setPage(1);
  }, [activeFormat, activeCategory, activeTypes, selectedGenres]);

  const handleRouteToDetail = (id: number) => {
    if (activeFormat === "packs") {
      navigate(`/catalog/pack/${id}`);
    } 
    else {
      navigate(`/catalog/sample/${id}`);
    }
  };

  return (
    <div className="md:col-span-3">

      <style>{`
        @keyframes neon-flicker {
          0%, 9%, 11%, 13%, 15%, 30%, 32%, 50%, 52%, 53%, 55%, 68%, 70%, 100% {
            text-shadow: 0 0 4px #d8b4fe, 0 0 10px #a855f7;
            opacity: 1;
          }
          10%, 14%, 31%, 51%, 54%, 69% {
            text-shadow: none;
            opacity: 0.55;
          }
        }
      `}
      </style>

      <div
        className="border border-zinc-800 rounded-2xl p-6 md:p-7 shadow-sm flex flex-col"
        style={{ backgroundColor: "rgba(24, 24, 27, 0.8)", height: "933px" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-zinc-800/80 pb-4 flex-shrink-0">
          <h2 className="text-xl font-bold flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xl">
              <span className="capitalize">{activeCategory.join(", ")}</span>
              <span className="capitalize text-zinc-400">{activeFormat}</span>
              <span className="ml-2 px-2.5 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full border border-zinc-700">
                {results.length} Results
              </span>
            </div>

            {(activeTypes.length > 0 || selectedGenres.length > 0) && (
              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs font-normal text-zinc-400">
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

        {/* Results List - Optimized padding to prevent clipping */}
        <div className="flex flex-col flex-grow overflow-hidden min-h-0">
          {isLoading ? (
            <p className="text-zinc-400 text-sm py-16 text-center animate-pulse">Fetching catalogs...</p>
          ) : (
            pagedResults.map((result, index) => {
              const title = result.name || "Untitled";
              const genreLabel = Array.isArray(result.genres) ? result.genres.join(", ") : (result.genre || "Global");
              const artworkUrl = activeFormat === "packs"
                ? (result.cover_image || "")
                : "/wave-image-fallback.png";
              const price = result.price === 0 ? "FREE" : `$${result.price.toFixed(2)}`;
              const packName = activeFormat !== "packs" && result.sample_pack ? result.sample_pack.name : null;

              return (
                <div
                  key={result.id}
                  onClick={() => handleRouteToDetail(result.id)}
                  className={`flex flex-row items-center py-4 px-5 transition-colors duration-200 group rounded-2xl cursor-pointer hover:bg-zinc-800/50 ${
                    index !== pagedResults.length - 1 ? "border-b border-zinc-800/40 mb-1.5" : ""
                  }`}
                >
                  {/* Thumbnail Scaled to 80px x 80px */}
                  <div className="w-[80px] h-[80px] bg-zinc-800 border border-zinc-700 rounded-xl shrink-0 mr-5 group-hover:border-purple-400/50 group-hover:shadow-[0_0_20px_rgba(167,139,250,0.18)] transition-all duration-300 overflow-hidden">
                    {artworkUrl ? (
                      <img
                        src={artworkUrl}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex-grow flex flex-col min-w-0 pr-4">
                    {/* Title Text set to wrap nicely on mobile */}
                    <h3 className="font-bold text-lg text-zinc-100 group-hover:text-purple-400 transition-colors duration-200 break-words">
                      {title}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 flex flex-wrap items-center gap-1.5 leading-snug">
                      <span>{genreLabel}</span>
                      {packName && (
                        <span className="text-zinc-500 font-normal">
                          &bull; Part of{" "}
                          <span
                            className="text-purple-300 transition-all duration-300 tracking-wide text-xs px-1 hover:text-purple-400"
                            style={{
                              fontFamily: "'Shrikhand', cursive",
                              animation: "neon-flicker 4s infinite alternate"
                            }}
                          >
                            {packName}
                          </span>{" "}
                          pack.
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    {/* Price Pill */}
                    <span className="px-5 py-2.5 bg-zinc-800/60 border border-zinc-700 rounded-xl font-extrabold text-zinc-100 text-sm shrink-0 shadow-sm">
                      {price}
                    </span>
                    {/* Preview Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRouteToDetail(result.id);
                      }}
                      className="px-8 py-3.5 bg-zinc-800 text-zinc-100 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95 hover:scale-105 hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer hidden md:block"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {!isLoading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
              <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-sm">No results found matching those filter bounds.</p>
            </div>
          )}
        </div>

        {/* Pagination Stepper */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800/60 flex-shrink-0">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-400 bg-zinc-800/60 border border-zinc-700 rounded-lg hover:bg-zinc-700 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${
                    p === page
                      ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                      : "bg-zinc-800/60 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-400 bg-zinc-800/60 border border-zinc-700 rounded-lg hover:bg-zinc-700 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}