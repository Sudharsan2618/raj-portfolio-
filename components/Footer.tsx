
import React from 'react';
import { APP_CONTENT } from '../constants';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t-4 border-red-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Quote */}
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold tracking-tighter uppercase">
              Raj <span className="text-red-600">Kanna S</span>
            </h3>
            <blockquote className="text-gray-400 italic text-sm leading-relaxed border-l-2 border-red-600 pl-4">
              "{APP_CONTENT.contact.footer_quote}"
            </blockquote>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-red-500">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#about" className="hover:text-white hover:pl-2 transition-all">About Leader</a></li>
              <li><a href="#legacy" className="hover:text-white hover:pl-2 transition-all">Heritage</a></li>
              <li><a href="#initiatives" className="hover:text-white hover:pl-2 transition-all">Vision</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-red-500">Contact</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <Phone className="text-red-600 shrink-0" size={18} />
                <a href={`tel:${APP_CONTENT.contact.phone}`} className="hover:text-white">{APP_CONTENT.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-600 shrink-0" size={18} />
                <a href={`mailto:${APP_CONTENT.contact.email}`} className="hover:text-white">{APP_CONTENT.contact.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Raj Kanna S. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Upholding the Dravidian Ideology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
