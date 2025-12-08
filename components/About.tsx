
import React from 'react';
import { APP_CONTENT } from '../constants';
import { BookOpen, Flag, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-white text-gray-900 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* The Journey Summary */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start md:items-center">
            <div className="w-full md:w-1/2">
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-red-600 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-sm sm:text-base"
              >
                <span className="w-8 h-[2px] bg-red-600" aria-hidden="true"></span>
                About Leader
              </motion.h4>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6"
              >
                {APP_CONTENT.about.title}
              </motion.h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                {APP_CONTENT.about.description}
              </p>
            </div>
            
            <div className="w-full md:w-1/2 grid grid-cols-1 gap-3 sm:gap-4">
               {APP_CONTENT.about.highlights.map((item, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ delay: idx * 0.1 }}
                   className="p-4 sm:p-6 bg-gray-50 border-l-4 border-red-600 rounded-r-lg"
                 >
                   <h3 className="font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                   <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 my-12 sm:my-16" aria-hidden="true"></div>

        {/* Timeline Section */}
        <div className="overflow-x-hidden w-full">
           <div className="text-center mb-12 sm:mb-16">
             <h3 className="text-2xl sm:text-3xl font-bold mb-2">Timeline</h3>
             <p className="text-gray-500 text-sm sm:text-base">A track record of excellence and leadership</p>
           </div>

           <div className="relative max-w-4xl mx-auto w-full px-4 overflow-x-hidden">
             {/* Center Line */}
             <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 sm:w-px bg-red-200 transform md:-translate-x-1/2" aria-hidden="true"></div>

             {APP_CONTENT.about.timeline.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-8 sm:mb-12 w-full ${
                   idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                 }`}
               >
                 {/* Content Side */}
                 <div className="flex-1 w-full md:w-[calc(50%-1rem)] ml-12 md:ml-0 min-w-0 max-w-full">
                   <div className={`p-4 sm:p-6 bg-white shadow-xl rounded-lg border border-gray-100 relative w-full max-w-full break-words-safe ${idx % 2 === 0 && 'md:text-right'}`}>
                      <span className="inline-block px-2 sm:px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-full mb-3">
                        {item.year}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                   </div>
                 </div>

                 {/* Center Dot */}
                 <div className="absolute left-0 md:left-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full border-2 sm:border-4 border-white shadow-lg transform md:-translate-x-1/2 flex items-center justify-center z-10 flex-shrink-0" aria-hidden="true">
                   <CheckCircle size={12} className="text-white sm:w-3.5 sm:h-3.5" />
                 </div>

                 {/* Empty Side for alignment */}
                 <div className="hidden md:block flex-1 min-w-0 max-w-[calc(50%-1rem)]" aria-hidden="true"></div>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;
