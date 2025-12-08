
import React from 'react';
import { APP_CONTENT } from '../constants';
import { motion } from 'framer-motion';
import akVilvamImage from '../A_K_Vilvam.png';
import arunmozhiVilvamImage from '../Arunmozhi_vilvam.png';
import swaminathanImage from '../swaminathan.png';
import nsKrishnanImage from '../N_S_Krishnan.png';

const Legacy: React.FC = () => {
  return (
    <section id="legacy" className="py-16 sm:py-20 md:py-24 bg-zinc-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h4 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-red-500 font-bold uppercase tracking-widest mb-2 text-sm sm:text-base"
          >
            Family Heritage
          </motion.h4>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6"
          >
            {APP_CONTENT.legacy.title}
          </motion.h2>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-zinc-800/50 p-4 sm:p-6 rounded-lg inline-block border border-zinc-700 backdrop-blur-sm"
          >
             <p className="text-lg sm:text-xl md:text-2xl font-['Noto_Sans_Tamil'] text-gray-200 italic">
              "{APP_CONTENT.legacy.quote_tamil}"
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {APP_CONTENT.legacy.ancestors.map((ancestor, index) => {
            const imageMap: { [key: string]: string } = {
              "A_K_Vilvam.png": akVilvamImage,
              "Arunmozhi_vilvam.png": arunmozhiVilvamImage,
              "swaminathan.png": swaminathanImage,
              "N_S_Krishnan.png": nsKrishnanImage
            };
            const imageSrc = ancestor.image && imageMap[ancestor.image] 
              ? imageMap[ancestor.image] 
              : null;
            
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-zinc-800 p-4 sm:p-6 hover:bg-red-900 focus-within:bg-red-900 transition-colors duration-300 rounded-sm"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" aria-hidden="true"></div>
              
              <div className="mb-4 h-40 sm:h-48 bg-zinc-700 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                 {imageSrc ? (
                   <img 
                     src={imageSrc} 
                     alt={`${ancestor.name} - ${ancestor.role}`}
                     className="w-full h-full object-cover"
                     loading="lazy"
                     onError={(e) => {
                       console.error(`Failed to load image: ${imageSrc}`, e);
                       e.currentTarget.style.display = 'none';
                     }}
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm" aria-label="Image not available">
                     Image not available
                   </div>
                 )}
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" aria-hidden="true"></div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">{ancestor.name}</h3>
              <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">{ancestor.role}</p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-200">
                {ancestor.desc}
              </p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Legacy;
