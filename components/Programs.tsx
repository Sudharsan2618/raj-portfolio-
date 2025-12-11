import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Award } from 'lucide-react';

// Program data with images and descriptions
const programsData = [
    {
        id: 'pongal-felicitation',
        title: 'Pongal Felicitation Program',
        description: 'This prestigious program was organized for the entire Tamil Nadu Police Department, conducted by Raj Kanna as Vice President of Lion\'s Club. The event was graced by A.K. Vishwanathan, the Police Commissioner, honoring the brave officers who serve and protect our community.',
        coverImage: '/programs/pongal-felisitation/image1.png',
        images: [
            '/programs/pongal-felisitation/image1.png',
            '/programs/pongal-felisitation/image2.png',
            '/programs/pongal-felisitation/image3.png',
            '/programs/pongal-felisitation/image4.png',
            '/programs/pongal-felisitation/image5.png',
            '/programs/pongal-felisitation/image6.png',
        ],
        location: 'Tamil Nadu',
        highlight: 'Lion\'s Club Initiative',
        color: 'from-amber-500 to-orange-600',
    },
    {
        id: 'inauguration',
        title: 'MGR University Inauguration',
        description: 'A momentous occasion marking the inauguration ceremony at the prestigious MGR University. This event symbolizes the commitment to education and the legacy of the great leader Dr. M.G. Ramachandran in fostering academic excellence.',
        coverImage: '/programs/inagration/image1.png',
        images: [
            '/programs/inagration/image1.png',
            '/programs/inagration/image2.png',
        ],
        location: 'Chennai',
        highlight: 'Education Initiative',
        color: 'from-blue-500 to-indigo-600',
    },
    {
        id: 'jallikattu',
        title: 'Sivagangai Jallikattu',
        description: 'The legendary Sivagangai District Jallikattu event, a celebration of Tamil culture and tradition. This historic event was registered for the Guinness India Book of Records, showcasing the valor and heritage of our people.',
        coverImage: '/programs/jallikattu/image1.png',
        images: [
            '/programs/jallikattu/image1.png',
            '/programs/jallikattu/image2.png',
            '/programs/jallikattu/image3.png',
            '/programs/jallikattu/image4.png',
        ],
        location: 'Sivagangai District',
        highlight: 'Guinness India Record',
        color: 'from-red-500 to-rose-600',
    },
    {
        id: 'water-conservation',
        title: 'Water Conservation Initiative',
        description: 'A vital environmental initiative focused on water conservation and sustainable practices. This program emphasizes the importance of preserving our precious water resources for future generations through community awareness and action.',
        coverImage: '/programs/water-conservation/image.png',
        images: [
            '/programs/water-conservation/image.png',
        ],
        location: 'Tamil Nadu',
        highlight: 'Environmental Initiative',
        color: 'from-cyan-500 to-teal-600',
    },
];

const ITEMS_PER_PAGE = 4;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

const Programs: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedProgram, setSelectedProgram] = useState<typeof programsData[0] | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

    const totalPages = Math.ceil(programsData.length / ITEMS_PER_PAGE);
    const currentPrograms = programsData.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    // Auto-scroll effect for modal images
    useEffect(() => {
        if (!selectedProgram || selectedProgram.images.length <= 1 || isAutoScrollPaused) return;

        const interval = setInterval(() => {
            setImageLoading(true);
            setCurrentImageIndex(prev => (prev + 1) % selectedProgram.images.length);
        }, AUTO_SCROLL_INTERVAL);

        return () => clearInterval(interval);
    }, [selectedProgram, isAutoScrollPaused]);

    const openModal = (program: typeof programsData[0]) => {
        setSelectedProgram(program);
        setCurrentImageIndex(0);
        setImageLoading(true);
    };

    const closeModal = () => {
        setSelectedProgram(null);
        setCurrentImageIndex(0);
        setIsAutoScrollPaused(false);
    };

    const navigateImage = (direction: number) => {
        if (!selectedProgram) return;
        setImageLoading(true);
        const newIndex = (currentImageIndex + direction + selectedProgram.images.length) % selectedProgram.images.length;
        setCurrentImageIndex(newIndex);
        // Pause auto-scroll when user manually navigates
        setIsAutoScrollPaused(true);
        setTimeout(() => setIsAutoScrollPaused(false), AUTO_SCROLL_INTERVAL * 2);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <section id="programs" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-500 font-bold uppercase tracking-widest mb-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                        <span className="w-8 h-[2px] bg-amber-500" />
                        Community Impact
                        <span className="w-8 h-[2px] bg-amber-500" />
                    </motion.h4>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
                    >
                        Programs & <span className="text-red-500">Initiatives</span>
                    </motion.h3>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        Explore the various programs and initiatives that have made a positive impact on our community
                    </p>
                </div>

                {/* Program Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
                    <AnimatePresence mode="wait">
                        {currentPrograms.map((program, idx) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => openModal(program)}
                            >
                                <div className="relative bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
                                    {/* Cover Image */}
                                    <div className="relative h-48 sm:h-56 overflow-hidden">
                                        <img
                                            src={program.coverImage}
                                            alt={program.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

                                        {/* Badge */}
                                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${program.color} shadow-lg`}>
                                            {program.images.length} Photos
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold mb-2">
                                            <Award className="w-3 h-3" />
                                            {program.highlight}
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                                            {program.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                                            <MapPin className="w-3 h-3" />
                                            {program.location}
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                        <span className="px-6 py-2 bg-amber-500 text-black font-bold text-sm rounded-full">
                                            View Gallery
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            disabled={currentPage === 0}
                            className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${currentPage === idx
                                        ? 'bg-amber-500 w-8'
                                        : 'bg-zinc-600 hover:bg-zinc-500'
                                        }`}
                                    aria-label={`Go to page ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                            disabled={currentPage === totalPages - 1}
                            className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                )}
            </div>

            {/* Modal/Popup */}
            <AnimatePresence>
                {selectedProgram && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-zinc-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-zinc-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className={`p-6 bg-gradient-to-r ${selectedProgram.color} relative`}>
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white pr-12">
                                    {selectedProgram.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {selectedProgram.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        {selectedProgram.highlight}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                                {/* Description */}
                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                                    {selectedProgram.description}
                                </p>

                                {/* Image Gallery */}
                                <div className="relative">
                                    {/* Main Image */}
                                    <div className="relative rounded-xl overflow-hidden bg-zinc-800 mb-4 flex items-center justify-center">
                                        {/* Loading Spinner */}
                                        {imageLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-amber-500 animate-spin" />
                                            </div>
                                        )}
                                        <img
                                            src={selectedProgram.images[currentImageIndex]}
                                            alt={`${selectedProgram.title} - Image ${currentImageIndex + 1}`}
                                            onLoad={handleImageLoad}
                                            className={`max-w-full max-h-[60vh] w-auto h-auto object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                        />

                                        {/* Navigation Arrows */}
                                        {selectedProgram.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => navigateImage(-1)}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                                                    aria-label="Previous image"
                                                >
                                                    <ChevronLeft className="w-6 h-6 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => navigateImage(1)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                                                    aria-label="Next image"
                                                >
                                                    <ChevronRight className="w-6 h-6 text-white" />
                                                </button>
                                            </>
                                        )}

                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                                            {currentImageIndex + 1} / {selectedProgram.images.length}
                                        </div>
                                    </div>

                                    {/* Thumbnail Strip */}
                                    {/* {selectedProgram.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {selectedProgram.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setImageLoading(true);
                                                        setCurrentImageIndex(idx);
                                                        // Pause auto-scroll when user clicks thumbnail
                                                        setIsAutoScrollPaused(true);
                                                        setTimeout(() => setIsAutoScrollPaused(false), AUTO_SCROLL_INTERVAL * 2);
                                                    }}
                                                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx
                                                        ? 'border-amber-500 ring-2 ring-amber-500/50'
                                                        : 'border-zinc-700 hover:border-zinc-500'
                                                        }`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Thumbnail ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Programs;
