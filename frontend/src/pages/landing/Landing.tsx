import { motion } from 'framer-motion';

export default function Landing() {
    return (
        <div
            className="w-full text-zinc-50 bg-zinc-950 bg-top bg-no-repeat"
            style={{
                backgroundImage: 'linear-gradient(rgba(9, 9, 11, 0.7), rgba(9, 9, 11, 0.9)), url(/landing-page-1.png)',
                backgroundSize: '95% 100%'
            }}
        >

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center mt-[-4rem]">
                {/* Floating, Shining Badge with Sparkles */}
                <motion.div
                    className="mb-8 relative group cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    // Combine the entry animation and the infinite floating animation
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        opacity: { duration: 0.6 },
                        scale: { duration: 0.6 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" } // Smooth continuous float
                    }}
                >
                    {/* Sparkle 1 (Top Left) */}
                    <motion.svg
                        className="absolute -top-8 -left-4 text-purple-400 w-5 h-5 pointer-events-none"
                        viewBox="0 0 24 24" fill="currentColor"
                        animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3], rotate: [0, 45, 90] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </motion.svg>

                    {/* Sparkle 2 (Bottom Right) */}
                    <motion.svg
                        className="absolute -bottom-2 -right-3 text-emerald-400 w-4 h-4 pointer-events-none"
                        viewBox="0 0 24 24" fill="currentColor"
                        animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.4, 0.9, 0.4], rotate: [0, -45, -90] }}
                        transition={{ duration: 3.2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </motion.svg>

                    {/* Roll-in Eyebrow Text */}
                    <motion.h2
                        className="mb-4 text-lg md:text-xl text-zinc-50 font-medium"
                        initial={{ opacity: 0, y: -40, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                            delay: 0.1
                        }}
                        style={{ perspective: 1000, transformOrigin: "top" }}
                    >
                        init samples
                    </motion.h2>
                </motion.div>

                {/* Animated Header */}
                <motion.h1
                    className="text-5xl md:text-7xl max-w-5xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text line-height-tight leading-[1.1]"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    get FREE and premium recorded samples
                </motion.h1>

                {/* Animated Paragraph */}
                <motion.p
                    className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    High-quality, royalty-free audio samples and loops designed for modern music producers.
                    Elevate your tracks with our premium, meticulously engineered sample packs.
                </motion.p>

                {/* Animated Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.button
                        className="px-8 py-4 bg-zinc-100 text-zinc-900 font-bold rounded-full hover:bg-emerald-400 hover:text-zinc-900 transition-colors duration-300 relative"
                        animate={{
                            boxShadow: [
                                "0px 0px 0px 0px rgba(52, 211, 153, 0)",
                                "0px 0px 25px 8px rgba(52, 211, 153, 0.5)",
                                "0px 0px 0px 0px rgba(52, 211, 153, 0)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Browse Catalog
                    </motion.button>
                </motion.div>
            </section>

            {/* Placeholder Content to allow scrolling */}
            <section className="py-16 px-8 max-w-7xl mx-auto space-y-24">
                {/* Popular Packs List - Inbox Style */}
                <div className="flex flex-col items-start w-full">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Trending Packs</h2>

                    <div className="flex flex-col w-full border-t border-zinc-500/30">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="flex flex-row items-center cursor-pointer py-3 px-2 border-b border-zinc-500/30 hover:bg-zinc-100/10 transition-colors duration-200 group w-full"
                            >
                                {/* Tiny Thumbnail */}
                                <div className="w-10 h-10 bg-zinc-400/20 rounded shrink-0 mr-4"></div>

                                {/* Text Content - Inline */}
                                <div className="flex-grow flex flex-col md:flex-row md:items-center min-w-0 pr-4">
                                    <span className="font-bold whitespace-nowrap text-zinc-100 w-32 md:mr-4">
                                        Volume {item}
                                    </span>
                                    <span className="text-zinc-300 text-sm truncate">
                                        150+ royalty-free loops, heavy 808s, and meticulously crafted melodies.
                                    </span>
                                </div>

                                {/* Hover Action Indicator */}
                                <div className="shrink-0 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">
                                        View
                                    </span>
                                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sell Your Samples Section */}
                <div className="flex flex-col items-start text-left pb-24 mt-20 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">Sell Your Samples</h2>

                    <div className="bg-zinc-900/40 w-1/2 p-10 md:p-14 rounded-3xl backdrop-blur-sm border border-zinc-800/30 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                        <div className="flex-grow w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-3xl font-bold text-emerald-400">
                                    Join the Community
                                </h3>
                                <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-bold rounded uppercase tracking-widest border border-zinc-700">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8">
                                We are building a dedicated platform for sound designers to share their craft. Soon, you will be able to easily submit, distribute, and monetize your own premium sample packs directly through us.
                            </p>

                            {/* Click to learn more link */}
                            <a href="#" className="mt-auto text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center transition-colors w-fit group text-lg">
                                Click to learn more
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="flex flex-col items-center text-center pb-32">
                    <p className="text-2xl md:text-4xl font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 leading-relaxed max-w-4xl mx-auto px-4">
                        "For bedroom and studio producers that want quality samples to elevate their craft."
                    </p>
                </div>

            </section>

        </div>
    )
}