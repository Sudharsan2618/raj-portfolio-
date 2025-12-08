
import React from 'react';
import { APP_CONTENT } from '../constants';
import { Video, Film, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Initiatives: React.FC = () => {
  return (
    <section id="initiatives" className="py-24 bg-gray-100 text-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-5/12">
             <motion.div
               initial={{ x: -30, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
             >
              <h4 className="text-red-600 font-bold uppercase tracking-widest mb-2">Digital Campaign</h4>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                {APP_CONTENT.initiatives.title}
              </h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">
                {APP_CONTENT.initiatives.subtitle}
              </h3>

              <div className="bg-white p-6 border-l-4 border-red-600 shadow-md mb-8">
                <p className="text-lg font-['Noto_Sans_Tamil'] italic text-gray-800 leading-relaxed">
                  "{APP_CONTENT.initiatives.quote_tamil}"
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-8">
                {APP_CONTENT.initiatives.description}
              </p>
              
              <button className="flex items-center gap-2 text-black font-bold border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                View All Content <ArrowRight size={18} />
              </button>
             </motion.div>
          </div>

          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Card 1 */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white p-8 shadow-xl border-t-4 border-red-600 rounded-sm relative overflow-hidden"
             >
               <div className="absolute right-0 top-0 opacity-5 transform translate-x-1/4 -translate-y-1/4">
                 <Video size={150} />
               </div>
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center rounded-lg mb-6">
                    <Video size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">{APP_CONTENT.initiatives.projects[0].title}</h3>
                 <p className="text-gray-600 text-sm">
                   {APP_CONTENT.initiatives.projects[0].desc}
                 </p>
               </div>
             </motion.div>

             {/* Card 2 */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-zinc-900 text-white p-8 shadow-xl border-t-4 border-red-600 rounded-sm relative overflow-hidden mt-0 md:mt-12"
             >
               <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                 <Film size={150} />
               </div>
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-zinc-800 text-white flex items-center justify-center rounded-lg mb-6">
                    <Film size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">{APP_CONTENT.initiatives.projects[1].title}</h3>
                 <p className="text-gray-400 text-sm">
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
