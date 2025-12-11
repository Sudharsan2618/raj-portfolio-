import React, { useState, useEffect } from 'react';
import { Play, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const videos = [
  { id: 1, name: 'Video 1', path: '/videos/v1.mp4' },
  { id: 2, name: 'Video 2', path: '/videos/v2.mp4' },
];

const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 sm:px-6 sm:py-12 sm:pt-32">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors font-medium group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Reels Campaign</h3>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
          Short-form digital storytelling. Watch our latest reels and visual narratives designed for the youth.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="relative bg-black rounded-xl overflow-hidden shadow-xl cursor-pointer group border border-gray-800"
            onClick={() => setSelectedVideo(video.path)}
          >
            <div className="aspect-[9/16] relative">
              <video
                src={video.path}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                onMouseEnter={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.play().catch(() => { });
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.pause();
                  target.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60 group-hover:opacity-40 transition-opacity" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600/90 text-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h4 className="text-white font-bold text-sm sm:text-base line-clamp-2 drop-shadow-md">{video.name}</h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative h-[85vh] aspect-[9/16] max-w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-red-600 rounded-full p-2 transition-all z-10"
                  aria-label="Close video"
                >
                  <X size={24} />
                </button>
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoGallery;
