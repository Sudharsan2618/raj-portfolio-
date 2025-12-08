import React, { useState } from 'react';
import { FileText, Download, ExternalLink, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const pdfs = [
  { id: 1, name: 'Editorial 1', path: '/editorials/e1.pdf' },
  { id: 2, name: 'Editorial 2', path: '/editorials/e2.pdf' },
  { id: 3, name: 'Editorial 3', path: '/editorials/e3.pdf' },
];

const PDFGallery: React.FC = () => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  const handleViewPDF = (path: string) => {
    setSelectedPDF(path);
  };

  const handleDownloadPDF = (path: string, name: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 sm:px-6 sm:py-12 sm:pt-32">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-4 transition-colors font-medium group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Documentaries</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          In-depth visual narratives of Dravidian history.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {pdfs.map((pdf) => (
          <motion.div
            key={pdf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:border-red-600 transition-all"
          >
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <FileText size={64} className="text-red-600" />
            </div>
            <div className="p-4 sm:p-6">
              <h4 className="font-bold text-base sm:text-lg mb-3">{pdf.name}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewPDF(pdf.path)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleDownloadPDF(pdf.path, pdf.name)}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold py-2 px-4 rounded transition-colors text-sm"
                  aria-label="Download PDF"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedPDF && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPDF(null)}
              className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white p-3 flex items-center justify-between z-10">
                  <h4 className="font-bold">PDF Viewer</h4>
                  <button
                    onClick={() => setSelectedPDF(null)}
                    className="hover:text-red-600 transition-colors p-1"
                    aria-label="Close PDF"
                  >
                    <X size={24} />
                  </button>
                </div>
                <iframe
                  src={selectedPDF}
                  className="w-full h-full mt-12"
                  title="PDF Viewer"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PDFGallery;
