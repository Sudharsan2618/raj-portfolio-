
import React from 'react';
import { APP_CONTENT } from '../constants';
import { Video, Film, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Initiatives: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="initiatives" className="py-16 sm:py-20 md:py-24 bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 sm:gap-12 lg:gap-16">

          <div className="w-full lg:w-5/12">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h4 className="text-red-600 font-bold uppercase tracking-widest mb-2 text-sm sm:text-base">Digital Campaign</h4>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
                {APP_CONTENT.initiatives.title}
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">
                {APP_CONTENT.initiatives.subtitle}
              </h3>

              <div className="bg-white p-4 sm:p-6 border-l-4 border-red-600 shadow-md mb-6 sm:mb-8">
                <p className="text-base sm:text-lg font-['Noto_Sans_Tamil'] italic text-gray-800 leading-relaxed">
                  "{APP_CONTENT.initiatives.quote_tamil}"
                </p>
              </div>

              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                {APP_CONTENT.initiatives.description}
              </p>

              <button
                onClick={() => navigate('/videos')}
                className="flex items-center gap-2 text-black font-bold border-b-2 border-red-600 pb-1 hover:text-red-600 focus:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded px-2 py-1"
              >
                View All Content <ArrowRight size={18} aria-hidden="true" />
              </button>
            </motion.div>
          </div>

          <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/videos')}
              className="cursor-pointer bg-white p-6 sm:p-8 shadow-xl border-t-4 border-red-600 rounded-sm relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 opacity-5 transform translate-x-1/4 -translate-y-1/4" aria-hidden="true">
                <Video size={150} />
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 text-red-600 flex items-center justify-center rounded-lg">
                    <Video size={24} className="sm:w-7 sm:h-7" aria-hidden="true" />
                  </div>
                  {/* Video Previews */}
                  <div className="flex gap-2">
                    <div className="w-8 h-14 sm:w-9 sm:h-16 rounded-md overflow-hidden border-2 border-red-200 hover:border-red-500 transition-colors shadow-sm">
                      <video
                        src="/videos/v1.mp4"
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                    </div>
                    <div className="w-8 h-14 sm:w-9 sm:h-16 rounded-md overflow-hidden border-2 border-red-200 hover:border-red-500 transition-colors shadow-sm">
                      <video
                        src="/videos/v2.mp4"
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{APP_CONTENT.initiatives.projects[0].title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {APP_CONTENT.initiatives.projects[0].desc}
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/editorials')}
              className="cursor-pointer bg-zinc-900 text-white p-6 sm:p-8 shadow-xl border-t-4 border-red-600 rounded-sm relative overflow-hidden mt-0 md:mt-8 lg:mt-12"
            >
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4" aria-hidden="true">
                <Film size={150} />
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 text-white flex items-center justify-center rounded-lg">
                    <Film size={24} className="sm:w-7 sm:h-7" aria-hidden="true" />
                  </div>
                  {/* Document Previews */}
                  <div className="flex gap-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 border-zinc-700 hover:border-red-500 transition-colors shadow-sm relative">
                      <iframe
                        src="/editorials/e1.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                        className="w-[200%] h-[200%] scale-50 origin-top-left border-0 pointer-events-none"
                        title="PDF Preview 1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 border-zinc-700 hover:border-red-500 transition-colors shadow-sm relative">
                      <iframe
                        src="/editorials/e2.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                        className="w-[200%] h-[200%] scale-50 origin-top-left border-0 pointer-events-none"
                        title="PDF Preview 2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{APP_CONTENT.initiatives.projects[1].title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {APP_CONTENT.initiatives.projects[1].desc}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Initiatives;
