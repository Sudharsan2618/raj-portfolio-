import React, { useState } from 'react';
import { X, Video, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoGallery from './VideoGallery';
import PDFGallery from './PDFGallery';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'reels' | 'documentaries'>('reels');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-black to-red-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-red-600">
              <h2 className="text-2xl sm:text-3xl font-bold">Digital Content</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setActiveSection('reels')}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  activeSection === 'reels'
                    ? 'bg-white text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
                }`}
              >
                <Video size={20} />
                <span>Reels Campaign</span>
              </button>
              <button
                onClick={() => setActiveSection('documentaries')}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  activeSection === 'documentaries'
                    ? 'bg-white text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
                }`}
              >
                <FileText size={20} />
                <span>Documentaries</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeSection === 'reels' ? (
                  <motion.div
                    key="reels"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VideoGallery />
                  </motion.div>
                ) : (
                  <motion.div
                    key="documentaries"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PDFGallery />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;
