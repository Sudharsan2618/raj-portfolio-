
import React from 'react';
import { APP_CONTENT } from '../constants';
import { BookOpen, Flag, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white text-gray-900">
      <div className="container mx-auto px-6">
        
        {/* The Journey Summary */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-red-600 font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
              >
                <span className="w-8 h-[2px] bg-red-600"></span>
                About Leader
              </motion.h4>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-extrabold mb-6"
              >
                {APP_CONTENT.about.title}
              </motion.h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {APP_CONTENT.about.description}
              </p>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-1 gap-4">
               {APP_CONTENT.about.highlights.map((item, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="p-6 bg-gray-50 border-l-4 border-red-600 rounded-r-lg"
                 >
                   <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                   <p className="text-gray-600 text-sm">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 my-16"></div>

        {/* Timeline Section */}
        <div>
           <div className="text-center mb-16">
             <h3 className="text-3xl font-bold">Timeline</h3>
             <p className="text-gray-500 mt-2">A track record of excellence and leadership</p>
           </div>

           <div className="relative max-w-4xl mx-auto">
             {/* Center Line */}
             <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-red-200 transform md:-translate-x-1/2 ml-4 md:ml-0"></div>

             {APP_CONTENT.about.timeline.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className={`relative flex items-center gap-8 mb-12 ${
                   idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                 }`}
               >
                 {/* Content Side */}
                 <div className="flex-1 ml-12 md:ml-0">
                   <div className={`p-6 bg-white shadow-xl rounded-lg border border-gray-100 relative ${idx % 2 === 0 && 'md:text-right'}`}>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-full mb-3">
                        {item.year}
                      </span>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 </div>

                 {/* Center Dot */}
                 <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 flex items-center justify-center z-10">
                   <CheckCircle size={14} className="text-white" />
                 </div>

                 {/* Empty Side for alignment */}
                 <div className="hidden md:block flex-1"></div>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;
