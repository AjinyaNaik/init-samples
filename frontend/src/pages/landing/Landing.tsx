import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-50 overflow-hidden">
      
      {/* Animated Header */}
      <motion.h1 
        className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        init samples
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p 
        className="text-lg md:text-xl text-zinc-400 max-w-2xl text-center mb-10"
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
          className="px-8 py-4 bg-zinc-100 text-zinc-900 font-bold rounded-full hover:bg-emerald-400 hover:text-zinc-900 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse Catalog
        </motion.button>
      </motion.div>
      
    </div>
  )
}