import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChatbot } from '../contexts/ChatbotContext';

const BackgroundMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);
    const [wasPlayingBeforeVideo, setWasPlayingBeforeVideo] = useState(false);
    const { isChatbotOpen, isVideoPlaying, registerMusicControls } = useChatbot();

    const handlePlay = useCallback(async () => {
        if (audioRef.current) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setAutoplayBlocked(false);
                setShowTooltip(false);
                localStorage.setItem('bgMusicPlaying', 'true');
            } catch (error) {
                console.log('Audio play failed:', error);
            }
        }
    }, []);

    const handlePause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            localStorage.setItem('bgMusicPlaying', 'false');
        }
    }, []);

    // Register music controls with the context
    useEffect(() => {
        registerMusicControls({
            pause: () => {
                if (audioRef.current && isPlaying) {
                    setWasPlayingBeforeVideo(true);
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
            },
            resume: () => {
                if (audioRef.current && wasPlayingBeforeVideo) {
                    audioRef.current.play().catch(console.log);
                    setIsPlaying(true);
                    setWasPlayingBeforeVideo(false);
                }
            }
        });
    }, [registerMusicControls, isPlaying, wasPlayingBeforeVideo]);

    // Auto-play music on page load
    useEffect(() => {
        const attemptAutoplay = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    localStorage.setItem('bgMusicPlaying', 'true');
                } catch (error) {
                    console.log('Autoplay blocked by browser:', error);
                    setAutoplayBlocked(true);
                    setShowTooltip(true);
                    // Hide tooltip after 8 seconds
                    setTimeout(() => setShowTooltip(false), 8000);
                }
            }
        };

        // Small delay to ensure component is fully mounted
        const timer = setTimeout(attemptAutoplay, 500);
        return () => clearTimeout(timer);
    }, []);

    const toggleMusic = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src="/audio/a1.mpeg"
                loop
                preload="auto"
            />

            {/* Floating Music Control - Hidden when chatbot is open */}
            <div
                className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 transition-all duration-500 ease-out ${isVisible && !isChatbotOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Tooltip */}
                <div
                    className={`absolute -top-12 right-0 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                        }`}
                >
                    {autoplayBlocked ? '🎵 Click to enable music' : '🎵 Play Music'}
                    <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-black/80"></div>
                </div>

                {/* Main Control Button */}
                <button
                    onClick={toggleMusic}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-black shadow-lg shadow-red-900/30 hover:shadow-red-600/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden"
                    aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
                    title={isPlaying ? 'Pause music' : 'Play music'}
                >
                    {/* Animated ring when playing */}
                    {isPlaying && (
                        <>
                            <span className="absolute inset-0 rounded-full border-2 border-red-400/50 animate-ping"></span>
                            <span className="absolute inset-1 rounded-full border border-red-500/30 animate-pulse"></span>
                        </>
                    )}

                    {/* Glowing background effect */}
                    <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-red-600/20 to-transparent animate-pulse"></div>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 text-white transition-transform duration-300 group-hover:scale-110">
                        {isPlaying ? (
                            /* Sound waves animation when playing */
                            <div className="flex items-end justify-center gap-0.5 h-6 w-6">
                                <span className="w-1 bg-white rounded-full animate-soundwave1" style={{ height: '60%' }}></span>
                                <span className="w-1 bg-white rounded-full animate-soundwave2" style={{ height: '100%' }}></span>
                                <span className="w-1 bg-white rounded-full animate-soundwave3" style={{ height: '40%' }}></span>
                                <span className="w-1 bg-white rounded-full animate-soundwave4" style={{ height: '80%' }}></span>
                                <span className="w-1 bg-white rounded-full animate-soundwave5" style={{ height: '50%' }}></span>
                            </div>
                        ) : (
                            /* Music note icon when paused */
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {/* Minimize/Show Toggle - Also hidden when chatbot is open */}
            <button
                onClick={toggleVisibility}
                className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-8 h-8 rounded-full bg-gray-800/80 backdrop-blur-sm text-white/70 hover:text-white hover:bg-gray-700 transition-all duration-300 flex items-center justify-center ${isVisible || isChatbotOpen ? 'translate-x-0 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
                    }`}
                aria-label="Show music controls"
                title="Show music controls"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            </button>

            {/* CSS for sound wave animations */}
            <style>{`
        @keyframes soundwave1 {
          0%, 100% { height: 20%; }
          50% { height: 80%; }
        }
        @keyframes soundwave2 {
          0%, 100% { height: 60%; }
          50% { height: 30%; }
        }
        @keyframes soundwave3 {
          0%, 100% { height: 40%; }
          50% { height: 90%; }
        }
        @keyframes soundwave4 {
          0%, 100% { height: 80%; }
          50% { height: 40%; }
        }
        @keyframes soundwave5 {
          0%, 100% { height: 50%; }
          50% { height: 70%; }
        }
        .animate-soundwave1 { animation: soundwave1 0.8s ease-in-out infinite; }
        .animate-soundwave2 { animation: soundwave2 0.6s ease-in-out infinite; }
        .animate-soundwave3 { animation: soundwave3 0.7s ease-in-out infinite; }
        .animate-soundwave4 { animation: soundwave4 0.5s ease-in-out infinite; }
        .animate-soundwave5 { animation: soundwave5 0.9s ease-in-out infinite; }
      `}</style>
        </>
    );
};

export default BackgroundMusic;
