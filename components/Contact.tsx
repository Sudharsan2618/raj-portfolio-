
import React from 'react';
import { motion } from 'framer-motion';
import { APP_CONTENT } from '../constants';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gray-50 shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* Left Side: Info */}
          <div className="w-full md:w-5/12 bg-black text-white p-10 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl translate-x-10 -translate-y-10 opacity-40"></div>
             
             <div>
               <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Connect</h4>
               <h3 className="text-3xl font-bold mb-6">Join the <br/>Movement</h3>
               <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                 Be a part of the digital Dravidian revolution. Connect with Raj Kanna S to volunteer, invite for events, or share your thoughts.
               </p>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-zinc-900 rounded-lg border-l-4 border-red-600">
                  <p className="text-xs text-gray-500 uppercase mb-1">Office Line</p>
                  <p className="text-lg font-bold text-white mb-2">{APP_CONTENT.contact.phone}</p>
                  <p className="text-xs text-gray-400">{APP_CONTENT.contact.email}</p>
                </div>
             </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input type="text" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none rounded-sm transition-all text-sm" placeholder="Your Name" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input type="email" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none rounded-sm transition-all text-sm" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea rows={4} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none rounded-sm transition-all text-sm resize-none" placeholder="How can we help you?" />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 text-white font-bold py-3 uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                Send Message <Send size={16} />
              </motion.button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
