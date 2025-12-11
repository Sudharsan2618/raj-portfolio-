
import React from 'react';
import { APP_CONTENT } from '../constants';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8 border-t-4 border-red-600" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">

          {/* Brand & Quote */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tighter">
              <span className="text-white">Raj</span>{' '}
              <span className="text-red-600">kanna S</span>
            </h3>
            <blockquote className="text-gray-400 italic text-sm leading-relaxed border-l-2 border-red-600 pl-4">
              "{APP_CONTENT.contact.footer_quote}"
            </blockquote>
            <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 focus:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Follow on Twitter"
              >
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 focus:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Follow on Facebook"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 focus:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Follow on Instagram"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider mb-4 sm:mb-6 text-red-500">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white focus:text-white hover:pl-2 focus:pl-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-1"
                  >
                    About Leader
                  </a>
                </li>
                <li>
                  <a
                    href="#legacy"
                    className="hover:text-white focus:text-white hover:pl-2 focus:pl-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-1"
                  >
                    Heritage
                  </a>
                </li>
                <li>
                  <a
                    href="#initiatives"
                    className="hover:text-white focus:text-white hover:pl-2 focus:pl-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-1"
                  >
                    Vision
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider mb-4 sm:mb-6 text-red-500">Contact</h4>
            <ul className="space-y-3 sm:space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <Phone className="text-red-600 shrink-0" size={18} aria-hidden="true" />
                <a
                  href={`tel:${APP_CONTENT.contact.phone}`}
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-1"
                >
                  {APP_CONTENT.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-600 shrink-0" size={18} aria-hidden="true" />
                <a
                  href={`mailto:${APP_CONTENT.contact.email}`}
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-1 break-all"
                >
                  {APP_CONTENT.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>&copy; {new Date().getFullYear()} Raj Kanna.S. All rights reserved.</p>
          <p>Upholding the Dravidian Ideology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
