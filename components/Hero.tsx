
import React from 'react';
import { motion } from 'framer-motion';
import { APP_CONTENT } from '../constants';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/image.png"
          alt="Raj Kanna.S Background"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 z-10 relative py-20 md:py-0">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-amber-500 font-bold tracking-[0.2em] text-xs sm:text-sm uppercase mb-4 inline-block">
              {APP_CONTENT.hero.subtitle}
            </h2>


            {/* Main Title with Credentials */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[1.2]">
                <span
                  className="hero-name-raj"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 25%, #ffffff 50%, #cbd5e1 75%, #ffffff 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
                    letterSpacing: '0.02em',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  Raj
                </span>{' '}
                <span className="hero-name-kanna bg-gradient-to-r from-red-500 via-red-400 to-amber-500 bg-clip-text text-transparent">
                  kanna.S
                </span>
              </h1>

            </div>
          </motion.div>

          {/* Quote Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-black/40 border-l-4 border-red-600 p-4 sm:p-6 md:p-8 backdrop-blur-md rounded-r-lg mb-8"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white italic leading-relaxed font-['Noto_Sans_Tamil'] mb-3">
              "{APP_CONTENT.hero.tagline_tamil}"
            </p>
            <p className="text-xs sm:text-sm md:text-base text-amber-400 uppercase tracking-widest font-semibold">
              {APP_CONTENT.hero.tagline_english}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a
              href="#initiatives"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white font-bold rounded transition-all shadow-lg hover:shadow-red-600/40 focus:shadow-red-600/40 uppercase tracking-wider text-sm text-center focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
            >
              {APP_CONTENT.hero.cta_primary}
            </a>
            <a
              href="#legacy"
              className="px-8 py-4 border-2 border-white/30 hover:border-white focus:border-white text-white hover:bg-white/10 focus:bg-white/10 font-medium rounded transition-all uppercase tracking-wider text-sm text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black backdrop-blur-sm"
            >
              {APP_CONTENT.hero.cta_secondary}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#legacy-video"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded-full p-2 z-20"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={36} aria-hidden="true" />
      </motion.a>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
