import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Film, Users, Eye } from 'lucide-react';

// Acting images
const actingImages = [
    { src: '/img/act/image1.png', alt: 'Acting moments - Scene 1' },
    { src: '/img/act/image2.png', alt: 'Acting moments - Scene 2' },
    { src: '/img/act/image3.png', alt: 'Acting moments - Scene 3' },
    { src: '/img/act/image4.png', alt: 'Acting moments - Scene 4' },
    { src: '/img/act/image5.png', alt: 'Acting moments - Scene 5' },
    { src: '/img/act/image6.png', alt: 'Acting moments - Scene 6' },
];

// Political images
const politicsImages = [
    { src: '/img/politics/image.png', alt: 'Political journey - Event 1' },
    { src: '/img/politics/image1.png', alt: 'Political journey - Event 2' },
    { src: '/img/politics/image2.png', alt: 'Political journey - Event 3' },
    { src: '/img/politics/image3.png', alt: 'Political journey - Event 4' },
    { src: '/img/politics/image4.png', alt: 'Political journey - Event 5' },
    { src: '/img/politics/image5.png', alt: 'Political journey - Event 6' },
    { src: '/img/politics/image6.png', alt: 'Political journey - Event 7' },
    { src: '/img/politics/image7.png', alt: 'Political journey - Event 8' },
    { src: '/img/politics/image8.png', alt: 'Political journey - Event 9' },
    { src: '/img/politics/image9.png', alt: 'Political journey - Event 10' },
];

type GalleryCategory = 'all' | 'acting' | 'politics';

interface ImageData {
    src: string;
    alt: string;
    category: 'acting' | 'politics';
}

const Gallery: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [heroSlide, setHeroSlide] = useState(0);
    const [lightboxLoading, setLightboxLoading] = useState(false);

    // Combine all images with category tags
    const allImages: ImageData[] = [
        ...actingImages.map(img => ({ ...img, category: 'acting' as const })),
        ...politicsImages.map(img => ({ ...img, category: 'politics' as const })),
    ];

    // Filter images based on category
    const filteredImages = activeCategory === 'all'
        ? allImages
        : allImages.filter(img => img.category === activeCategory);

    // Hero slider images (mix of best from both categories)
    const heroImages = [
        politicsImages[0],
        actingImages[0],
        politicsImages[3],
        actingImages[2],
        politicsImages[7],
    ];

    // Auto-advance hero slider
    useEffect(() => {
        const timer = setInterval(() => {
            setHeroSlide(prev => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowRight') navigateImage(1);
            if (e.key === 'ArrowLeft') navigateImage(-1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, filteredImages.length]);

    // Set loading state when image changes
    useEffect(() => {
        if (selectedImage !== null) {
            setLightboxLoading(true);
        }
    }, [selectedImage]);

    const navigateImage = useCallback((direction: number) => {
        if (selectedImage === null) return;
        setLightboxLoading(true);
        const newIndex = (selectedImage + direction + filteredImages.length) % filteredImages.length;
        setSelectedImage(newIndex);
    }, [selectedImage, filteredImages.length]);

    const handleImageLoad = () => {
        setLightboxLoading(false);
    };

    const navigateHero = (direction: number) => {
        setHeroSlide(prev => (prev + direction + heroImages.length) % heroImages.length);
    };

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const categories = [
        { id: 'all', label: 'All Moments', icon: Eye },
        { id: 'acting', label: 'Cinema & Arts', icon: Film },
        { id: 'politics', label: 'Political Journey', icon: Users },
    ];

    return (
        <section id="gallery" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Hero Image Slider */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] mb-16 sm:mb-20 overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={heroSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroImages[heroSlide]?.src}
                            alt={heroImages[heroSlide]?.alt}
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-2 bg-amber-500/90 text-black text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full mb-4">
                            Capturing Moments
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
                            A Life in <span className="text-amber-400">Pictures</span>
                        </h2>
                        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                            From the silver screen to the political arena - moments that define a legacy
                        </p>
                    </motion.div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => navigateHero(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group z-20"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={() => navigateHero(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group z-20"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setHeroSlide(idx)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${idx === heroSlide ? 'bg-amber-500 w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-600 font-bold uppercase tracking-widest mb-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                        <span className="w-8 h-[2px] bg-amber-500" />
                        Photo Gallery
                        <span className="w-8 h-[2px] bg-amber-500" />
                    </motion.h4>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
                    >
                        The Journey from <span className="text-red-600">Zero</span> to <span className="text-amber-600">Hero</span>
                    </motion.h3>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        Explore memorable moments from cinema and politics - a visual chronicle of dedication, passion, and service
                    </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
                    {categories.map(({ id, label, icon: Icon }) => (
                        <motion.button
                            key={id}
                            onClick={() => setActiveCategory(id as GalleryCategory)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all flex items-center gap-2 ${activeCategory === id
                                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-500/30'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-400 hover:text-amber-600 shadow-sm'
                                }`}
                        >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {label}
                        </motion.button>
                    ))}
                </div>

                {/* True Masonry Layout with CSS Columns */}
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4 md:space-y-5">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, idx) => (
                            <motion.div
                                key={`${image.category}-${image.src}`}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: idx * 0.03 }}
                                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg break-inside-avoid mb-3 sm:mb-4 md:mb-5"
                                onClick={() => setSelectedImage(idx)}
                            >
                                {/* Image with natural aspect ratio */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    loading="lazy"
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category Badge */}
                                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg ${image.category === 'acting'
                                    ? 'bg-purple-500/90 text-white'
                                    : 'bg-amber-500/90 text-black'
                                    }`}>
                                    {image.category === 'acting' ? 'Cinema' : 'Politics'}
                                </div>

                                {/* View Icon on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                                        <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>

                                {/* Bottom gradient info bar */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-xs sm:text-sm font-medium">
                                        {image.category === 'acting' ? 'Cinema & Arts' : 'Political Journey'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Stats Section */}
                <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {[
                        { number: '15+', label: 'Years in Cinema', color: 'text-purple-600' },
                        { number: '20+', label: 'Years in Politics', color: 'text-amber-600' },
                        { number: '100+', label: 'Community Programs', color: 'text-red-600' },
                        { number: '∞', label: 'Dedication', color: 'text-emerald-600' },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${stat.color} mb-2`}>
                                {stat.number}
                            </div>
                            <div className="text-gray-600 text-sm sm:text-base font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-50"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-all z-50"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-all z-50"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </button>

                        {/* Image with Loading State */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl max-h-[85vh] relative flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Loading Spinner Overlay */}
                            {lightboxLoading && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="relative">
                                        {/* Outer spinning ring */}
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/20 border-t-amber-500 animate-spin" />
                                        {/* Inner pulsing circle */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/30 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Main Image */}
                            <img
                                src={filteredImages[selectedImage]?.src}
                                alt={filteredImages[selectedImage]?.alt}
                                onLoad={handleImageLoad}
                                className={`max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${lightboxLoading ? 'opacity-0' : 'opacity-100'
                                    }`}
                            />

                            {/* Image Info */}
                            <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg transition-opacity duration-300 ${lightboxLoading ? 'opacity-0' : 'opacity-100'
                                }`}>
                                <div className="flex items-center justify-between">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${filteredImages[selectedImage]?.category === 'acting'
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-amber-500 text-black'
                                        }`}>
                                        {filteredImages[selectedImage]?.category === 'acting' ? 'Cinema & Arts' : 'Political Journey'}
                                    </span>
                                    <span className="text-white/70 text-sm">
                                        {selectedImage + 1} / {filteredImages.length}
                                    </span>
                                </div>
                            </div>

                            {/* Preload adjacent images for smoother navigation */}
                            <div className="hidden">
                                {selectedImage !== null && selectedImage > 0 && (
                                    <img src={filteredImages[selectedImage - 1]?.src} alt="" />
                                )}
                                {selectedImage !== null && selectedImage < filteredImages.length - 1 && (
                                    <img src={filteredImages[selectedImage + 1]?.src} alt="" />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
