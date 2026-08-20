import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getStoredUser } from '../../utils/auth';

export default function Landing() {
    const user = getStoredUser();

    return (
        <div
            className="w-full min-h-screen text-zinc-50 bg-zinc-950 bg-center md:bg-top bg-no-repeat bg-cover md:bg-[length:95%_100%] py-6 md:py-12 px-4 md:px-8"
            style={{
                backgroundImage: 'linear-gradient(rgba(9, 9, 11, 0.7), rgba(9, 9, 11, 0.85)), url(/landing-page-2.png)',
            }}
        >
            <Helmet>
                <title>Init Samples | Free & Premium Royalty-Free Audio Samples</title>
                <meta name="description"
                    content="High-quality, royalty-free audio samples and loops designed for modern music producers. 100% human-recorded, no AI samples. Elevate your beats today."
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Init Samples | Free & Premium Royalty-Free Audio Samples" />
                <meta property="og:description" content="High-quality, royalty-free audio samples and loops designed for modern music producers. 100% human-recorded, no AI samples. Elevate your beats today." />
                <meta property="og:image" content="https://initsamples.com/logo.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:url" content="https://initsamples.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://initsamples.com/logo.png" />
                <link rel="canonical" href="https://initsamples.com" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://initsamples.com",
                        "name": "Init Samples",
                        "image": "https://initsamples.com/logo.png",
                        "url": "https://initsamples.com",
                        "description": "Royalty-free audio samples, loops, and sound packs for modern music producers.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Init Samples",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://initsamples.com/logo.png"
                            }
                        },
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://initsamples.com/catalog?search={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>
            </Helmet>

            {/* Top Left Branding Text (Init Samples) */}
            <div className="absolute top-5 left-5 sm:left-10 z-50 flex items-center">
                <motion.span
                    className="text-base sm:text-xl text-zinc-50 font-semibold tracking-wider cursor-default transform-gpu"
                    style={{ willChange: "transform, opacity" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Init Samples
                </motion.span>
            </div>

            {/* Top Right Navigation / Account Icon */}
            <div className="absolute top-5 right-5 sm:right-10 z-50 flex items-center gap-4">
                {user ? (
                    <Link
                        to="/dashboard"
                        title={`Go to ${user.username}'s Dashboard`}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/40 flex items-center justify-center text-purple-300 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-purple-200 bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/40 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-full transition-all duration-300"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center pt-20 pb-12 md:-mt-14">

                {/* Eye-Catching Social Proof Badge (Smaller on mobile, full size on desktop) */}
                <motion.div
                    className="mb-6 relative group cursor-default transform-gpu px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-purple-950/80 via-zinc-900/90 to-purple-950/80 border border-purple-500/40 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                    style={{ willChange: "transform" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        opacity: { duration: 0.6 },
                        scale: { duration: 0.6 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-emerald-400/10 to-purple-500/10 opacity-75 blur-sm pointer-events-none"
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.span
                        className="relative z-10 text-[11px] sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-zinc-100 to-purple-300 tracking-wide transform-gpu block whitespace-nowrap sm:whitespace-normal"
                        style={{ willChange: "transform, opacity" }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        ✨ 3+ artists partnered and creating since recent launch
                    </motion.span>
                </motion.div>

                {/* Animated Neon Header - Larger on mobile (text-5xl) while preserving desktop scaling (md:text-7xl) */}
                <motion.h1
                    className="text-5xl sm:text-5xl md:text-7xl max-w-5xl mb-6 text-purple-300 leading-tight z-10 px-2 transform-gpu"
                    style={{ fontFamily: "'Shrikhand', cursive", willChange: "transform, opacity, text-shadow" }}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{
                        opacity: [1, 0.4, 1, 1, 0.2, 1, 1],
                        y: 0,
                        textShadow: [
                            "0 0 4px #fff, 0 0 8px #fff, 0 0 15px #d8b4fe, 0 0 30px #a855f7",
                            "0 0 0px #fff, 0 0 0px #fff, 0 0 0px #d8b4fe, 0 0 0px #a855f7",
                            "0 0 4px #fff, 0 0 8px #fff, 0 0 15px #d8b4fe, 0 0 30px #a855f7",
                            "0 0 4px #fff, 0 0 8px #fff, 0 0 15px #d8b4fe, 0 0 30px #a855f7",
                            "0 0 0px #fff, 0 0 0px #fff, 0 0 0px #d8b4fe, 0 0 0px #a855f7",
                            "0 0 8px #fff, 0 0 15px #fff, 0 0 30px #d8b4fe, 0 0 60px #a855f7",
                            "0 0 4px #fff, 0 0 8px #fff, 0 0 15px #d8b4fe, 0 0 30px #a855f7"
                        ]
                    }}
                    transition={{
                        y: { duration: 0.8, delay: 0.1, ease: "easeOut" },
                        opacity: { duration: 5, repeat: Infinity, ease: "linear", delay: 0.8 },
                        textShadow: { duration: 5, repeat: Infinity, ease: "linear", delay: 0.8 }
                    }}
                >
                    get FREE and premium recorded samples
                </motion.h1>

                {/* Animated Paragraph */}
                <motion.p
                    className="text-sm sm:text-base md:text-xl text-zinc-300 max-w-2xl mb-8 px-4 leading-relaxed transform-gpu"
                    style={{ willChange: "opacity" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    High-quality, <strong>ROYALTY-FREE</strong> audio samples and loops designed for modern music producers.
                    <strong>NO AI SAMPLES.</strong> All content is human-recorded and produced by professional sound designers.
                </motion.p>

                {/* Call to Action Button */}
                <motion.div
                    className="transform-gpu"
                    style={{ willChange: "transform, opacity" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: [
                                "0px 0px 0px 0px rgba(168, 85, 247, 0)",
                                "0px 0px 20px 6px rgba(168, 85, 247, 0.4)",
                                "0px 0px 0px 0px rgba(168, 85, 247, 0)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="rounded-full inline-block transform-gpu -mt-16 md:-mt-0"
                        style={{ willChange: "transform, box-shadow" }}
                    >
                        <Link
                            to="/catalog"
                            className="inline-block px-7 py-3.5 sm:px-8 sm:py-4 bg-zinc-100 text-zinc-900 text-sm sm:text-base font-bold rounded-full hover:bg-purple-400 hover:text-zinc-900 transition-colors duration-300 relative shadow-lg"
                        >
                            Browse Catalog
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Main Content Sections */}
            <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">

                {/* Trending Packs List */}
                <div className="flex flex-col items-start w-full">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Trending Packs</h2>

                    <div className="flex flex-col w-full border-t border-zinc-500/80">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="flex flex-row items-center cursor-pointer py-3.5 px-2 border-b border-zinc-500/80 hover:bg-zinc-100/10 transition-colors duration-200 group w-full gap-3 sm:gap-4"
                            >
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-400/20 rounded shrink-0"></div>

                                <div className="flex-grow flex flex-col sm:flex-row sm:items-center min-w-0 pr-2">
                                    <span className="font-bold text-sm sm:text-base text-zinc-100 w-auto sm:w-32 sm:mr-4">
                                        Volume {item}
                                    </span>
                                    <span className="text-zinc-400 text-xs sm:text-sm line-clamp-1 sm:truncate">
                                        150+ royalty-free loops, heavy 808s, and meticulously crafted melodies.
                                    </span>
                                </div>

                                <div className="shrink-0 text-emerald-400 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                                        View
                                    </span>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sell Your Samples Section */}
                <div className="flex flex-col items-start text-left pb-12 sm:pb-24 mt-10 w-full">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12">Sell Your Samples</h2>

                    <div className="bg-zinc-900/50 w-full md:w-1/2 p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-zinc-800/40 flex flex-col gap-6 shadow-xl">
                        <div className="flex-grow w-full">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
                                    Join the Community
                                </h3>
                                <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] sm:text-xs font-bold rounded uppercase tracking-widest border border-zinc-700">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                                We are building a dedicated platform for sound designers to share their craft. Soon, you will be able to easily submit, distribute, and monetize your own premium sample packs directly through us.
                            </p>

                            <a href="#" className="mt-auto text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center transition-colors w-fit group text-base sm:text-lg">
                                Click to learn more
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="flex flex-col items-center text-center pb-20 sm:pb-32 px-2">
                    <p className="text-lg sm:text-2xl md:text-4xl font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 leading-relaxed max-w-4xl mx-auto">
                        "For bedroom and studio producers that want quality samples to elevate their craft."
                    </p>
                </div>
            </section>
        </div>
    )
}