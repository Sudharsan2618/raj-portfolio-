
import React from 'react';
import { motion } from 'framer-motion';
import { APP_CONTENT } from '../constants';
import { ChevronDown } from 'lucide-react';
import heroImage from '../raj_kanna_hero.png';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Gradient / Abstract Rising Sun */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-red-900/40 to-transparent opacity-80" />
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10 relative flex flex-col md:flex-row items-center py-20 md:py-0">
        {/* Text Content */}
        <div className="w-full md:w-1/2 pt-24 md:pt-0 space-y-6 md:space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-red-500 font-bold tracking-[0.2em] text-xs sm:text-sm uppercase mb-3 inline-block border-b border-red-900/50 pb-2">
              {APP_CONTENT.hero.subtitle}
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight mb-4">
              RAJ <span className="text-red-600">KANNA S</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-zinc-900/60 border-l-4 border-red-600 p-4 sm:p-6 md:p-8 backdrop-blur-sm rounded-r-lg max-w-xl mx-auto md:mx-0"
          >
             <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white italic leading-relaxed font-['Noto_Sans_Tamil'] mb-4">
              "{APP_CONTENT.hero.tagline_tamil}"
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-widest font-semibold">
              {APP_CONTENT.hero.tagline_english}
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-4"
          >
            <a 
              href="#initiatives" 
              className="px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white font-bold rounded-sm transition-all shadow-lg hover:shadow-red-600/30 focus:shadow-red-600/30 uppercase tracking-wider text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
            >
              {APP_CONTENT.hero.cta_primary}
            </a>
            <a 
              href="#legacy" 
              className="px-6 sm:px-8 py-3 border-2 border-zinc-600 hover:border-white focus:border-white text-gray-300 hover:text-white focus:text-white font-medium rounded-sm transition-all uppercase tracking-wider text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              {APP_CONTENT.hero.cta_secondary}
            </a>
          </motion.div>
        </div>

        {/* Image Placeholder */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 border-2 border-red-600 translate-x-2 sm:translate-x-4 translate-y-2 sm:translate-y-4 -z-10 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 md:group-hover:translate-x-6 md:group-hover:translate-y-6" aria-hidden="true" />
            <img 
              src={heroImage} 
              alt="Raj Kanna S - Political leader and advocate for Dravidian ideology" 
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-cover shadow-2xl rounded-sm"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>

      <motion.a 
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded-full p-2"
        aria-label="Scroll to about section"
      >
        <ChevronDown size={32} aria-hidden="true" />
      </motion.a>
    </section>
  );
};

export default Hero;
