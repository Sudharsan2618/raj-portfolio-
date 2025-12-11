import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const LegacyVideo: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setShowControls(true);
    };

    return (
        <section id="legacy-video" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-500 font-bold uppercase tracking-widest mb-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                        <span className="w-8 h-[2px] bg-amber-500" />
                        Watch The Story
                        <span className="w-8 h-[2px] bg-amber-500" />
                    </motion.h4>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
                    >
                        The <span className="text-red-500">Legacy</span> Continues
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
                    >
                        A journey through generations of dedication, service, and unwavering commitment to the Dravidian cause
                    </motion.p>
                </div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex justify-center"
                >
                    <div
                        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg group"
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => isPlaying && setShowControls(false)}
                    >
                        {/* Decorative Frame */}
                        <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-red-600 via-amber-500 to-red-600 rounded-2xl sm:rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-br from-red-600/50 to-amber-500/50 rounded-xl sm:rounded-2xl" />

                        {/* Video Wrapper - 9:16 aspect ratio */}
                        <div className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30">
                            <div className="aspect-[9/16] relative">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    src="/videos/Raj Kanna Legacy.mp4"
                                    poster="/img/politics/image3.png"
                                    muted={isMuted}
                                    playsInline
                                    preload="metadata"
                                    onEnded={handleVideoEnd}
                                    onClick={togglePlay}
                                >
                                    Your browser does not support the video tag.
                                </video>

                                {/* Play/Pause Overlay */}
                                <div
                                    className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    onClick={togglePlay}
                                >
                                    {!isPlaying && (
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center shadow-2xl shadow-red-600/50"
                                            aria-label="Play video"
                                        >
                                            <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                                        </motion.button>
                                    )}
                                </div>

                                {/* Bottom Controls */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Play/Pause Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            ) : (
                                                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                                            )}
                                        </button>

                                        <div className="flex items-center gap-2">
                                            {/* Mute Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                                                aria-label={isMuted ? "Unmute" : "Mute"}
                                            >
                                                {isMuted ? (
                                                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                ) : (
                                                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                )}
                                            </button>

                                            {/* Fullscreen Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                                                aria-label="Fullscreen"
                                            >
                                                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Video Title Overlay */}
                                <div className={`absolute top-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls && !isPlaying ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <span className="inline-block px-3 py-1 bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                        Legacy Story
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Side Decorative Text - Desktop Only */}
                        <div className="hidden lg:block absolute -left-32 top-1/2 -translate-y-1/2 -rotate-90">
                            <span className="text-amber-500/30 font-extrabold text-4xl tracking-[0.3em] uppercase whitespace-nowrap">
                                Legacy
                            </span>
                        </div>
                        <div className="hidden lg:block absolute -right-32 top-1/2 -translate-y-1/2 rotate-90">
                            <span className="text-red-500/30 font-extrabold text-4xl tracking-[0.3em] uppercase whitespace-nowrap">
                                Journey
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-10 sm:mt-14"
                >
                    <p className="text-gray-500 text-sm sm:text-base mb-4">
                        Experience the complete story of dedication and service
                    </p>
                    <a
                        href="#legacy"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold uppercase tracking-wider text-sm rounded-full hover:shadow-lg hover:shadow-red-600/30 transition-all"
                    >
                        Explore Heritage
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default LegacyVideo;
