import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryType, FormatType, InstrumentType } from '../../utils/enums/catalog';

const sampleGenres = ['Hip Hop', 'R&B', 'Trap', 'Lofi', 'Drill', 'Pop', 'Soul'];
const trackGenres = ['House', 'Techno', 'Synthwave', 'Synth Pop', 'Cinematic', 'Ambient'];
const loopGenres = ['Hip Hop', 'R&B', 'Trap', 'Lofi', 'Drill', 'Pop', 'Soul'];

const dummyResults = [
    { id: 1, title: 'Midnight R&B Vol 1', genre: 'R&B', price: '$29.99' },
    { id: 2, title: 'Lo-Fi Chill Beats', genre: 'Lofi', price: 'FREE' },
    { id: 3, title: 'Hard Hitting Trap', genre: 'Trap', price: '$19.99' },
    { id: 4, title: 'Soulful Chords', genre: 'Soul', price: '$24.99' },
    { id: 5, title: 'Analog Synth Textures', genre: 'Synthwave', price: '$34.99' },
    { id: 6, title: 'Deep House Essentials', genre: 'House', price: '$19.99' },
];

export default function Catalog() {
    // Single Selects (for primary navigation)
    const [activeCategory, setActiveCategory] = useState<CategoryType>('samples');
    const [activeFormat, setActiveFormat] = useState<FormatType>('packs');

    // Multi Selects (Arrays)
    const [activeTypes, setActiveTypes] = useState<InstrumentType[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const activeGenresList =
        activeCategory === 'samples' ? sampleGenres :
            activeCategory === 'loops' ? loopGenres :
                trackGenres;

    // Helper functions for multi-select logic
    const toggleType = (type: InstrumentType) => {
        setActiveTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    return (
        <div
            className="w-full min-h-screen text-zinc-50 pt-24 px-8 pb-32 bg-zinc-950 bg-top bg-no-repeat"
            style={{
                backgroundImage: 'linear-gradient(rgba(9, 9, 11, 0.8), rgba(9, 9, 11, 0.95)), url(/catalog-page-1.png)',
                backgroundSize: '90% 100%'
            }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    className="text-6xl md:text-7xl pb-4 mb-8 text-center md:text-left text-purple-300"
                    style={{ fontFamily: "'Shrikhand', cursive" }}
                    animate={{
                        opacity: [1, 0.4, 1, 1, 0.2, 1, 1], // Flickering sequence
                        textShadow: [
                            "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
                            "0 0 0px #fff, 0 0 0px #fff, 0 0 0px #d8b4fe, 0 0 0px #a855f7, 0 0 0px #a855f7",
                            "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
                            "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7",
                            "0 0 0px #fff, 0 0 0px #fff, 0 0 0px #d8b4fe, 0 0 0px #a855f7, 0 0 0px #a855f7",
                            "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #d8b4fe, 0 0 80px #a855f7, 0 0 120px #a855f7", // Extra bright surge
                            "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7"
                        ]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    The Init Catalog
                </motion.h1>

                {/* Main 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Sidebar / Left Column */}
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
                                /* Changed focus rings from emerald to purple */
                                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-zinc-500 shadow-sm"
                            />
                        </div>

                        {/* 1. Category Filter Card (Single Select) */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Category</h3>

                            {(['samples', 'loops', 'tracks'] as CategoryType[]).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setSelectedGenres([]); // Reset genres when category changes
                                    }}
                                    className={`text-left px-4 py-2.5 rounded-lg font-bold transition-all duration-300 capitalize ${activeCategory === cat
                                        ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                        }`}
                                >
                                    {cat === 'tracks' ? 'Tracks (Stems)' : cat}
                                </button>
                            ))}
                        </div>

                        {/* 2. Format Filter Card (Single Select) */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Format</h3>

                            {(['packs', 'standalones'] as FormatType[]).map((format) => (
                                <button
                                    key={format}
                                    onClick={() => setActiveFormat(format)}
                                    className={`text-left px-4 py-2.5 rounded-lg font-bold transition-all duration-300 capitalize ${activeFormat === format
                                        ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                        }`}
                                >
                                    {format}
                                </button>
                            ))}
                        </div>

                        {/* 3. Type Filter Card (Multi Select with Checkmarks) */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Type</h3>

                            {(['drums', 'bass', 'mids', 'highs', 'vocals'] as InstrumentType[]).map((type) => {
                                const isSelected = activeTypes.includes(type);
                                return (
                                    <button
                                        key={type}
                                        onClick={() => toggleType(type)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-lg font-bold transition-all duration-300 capitalize ${isSelected
                                            ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                            }`}
                                    >
                                        <span>{type}</span>
                                        {isSelected && (
                                            <svg className="w-5 h-5 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 4. Genre List Card (Multi Select with Checkmarks) */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col shadow-sm">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 border-b border-zinc-800/80 pb-3 px-2">
                                {activeCategory === 'samples' ? 'Sample Genres' : activeCategory === 'loops' ? 'Loop Genres' : 'Track Genres'}
                            </h3>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-1"
                                >
                                    {activeGenresList.map((genre) => {
                                        const isSelected = selectedGenres.includes(genre);
                                        return (
                                            <button
                                                key={genre}
                                                onClick={() => toggleGenre(genre)}
                                                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${isSelected
                                                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                                                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                                    }`}
                                            >
                                                <span>{genre}</span>
                                                {isSelected && (
                                                    <svg className="w-4 h-4 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>


                    {/* Content / Right Column */}
                    <div className="md:col-span-3">
                        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-zinc-800/80 pb-6">
                                <h2 className="text-3xl font-bold flex flex-col gap-2">
                                    {/* Main dynamically built title row */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="capitalize">
                                            {activeCategory === 'tracks' ? 'Tracks' : activeCategory}
                                        </span>
                                        <span className="capitalize text-zinc-400">
                                            {activeFormat}
                                        </span>
                                        <span className="ml-4 px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full border border-zinc-700">
                                            {dummyResults.length} Results
                                        </span>
                                    </div>

                                    {/* Subtitle row showing selected multi-filters */}
                                    {(activeTypes.length > 0 || selectedGenres.length > 0) && (
                                        <div className="flex flex-wrap items-center gap-2 mt-2 text-base font-normal text-zinc-400">
                                            {activeTypes.length > 0 && <span>Types: <span className="text-zinc-200">{activeTypes.join(', ')}</span></span>}
                                            {activeTypes.length > 0 && selectedGenres.length > 0 && <span className="text-zinc-600">|</span>}
                                            {selectedGenres.length > 0 && <span>Genres: <span className="text-zinc-200">{selectedGenres.join(', ')}</span></span>}
                                        </div>
                                    )}
                                </h2>
                            </div>

                            {/* Results List */}
                            <div className="flex flex-col flex-grow">
                                {dummyResults.map((result, index) => (
                                    <div
                                        key={result.id}
                                        className={`flex flex-row items-center py-5 transition-colors duration-200 group rounded-xl px-4 cursor-pointer hover:bg-zinc-800/50 
                                            ${index !== dummyResults.length - 1 ? 'border-b border-zinc-800/50 mb-1' : ''}`
                                        }
                                    >
                                        {/* Thumbnail changed border/shadow to purple on hover */}
                                        <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-lg shrink-0 mr-6 group-hover:border-purple-400/50 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] transition-all duration-300"></div>

                                        {/* Info changed text to purple on hover */}
                                        <div className="flex-grow flex flex-col">
                                            <h3 className="font-bold text-lg text-zinc-100 group-hover:text-purple-400 transition-colors duration-200">
                                                {result.title}
                                            </h3>
                                            <p className="text-zinc-500 text-sm mt-1">{result.genre}</p>
                                        </div>

                                        {/* Price / Action */}
                                        <div className="flex items-center gap-6">
                                            <span className={`font-semibold ${result.price === 'FREE' ? 'text-purple-400' : 'text-zinc-300'}`}>
                                                {result.price}
                                            </span>
                                            <button className="px-5 py-2.5 bg-zinc-800 group-hover:bg-zinc-700 text-zinc-100 rounded-lg font-medium transition-colors hidden md:block">
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty State Fallback */}
                                {dummyResults.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                                        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <p className="text-lg">No results found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}