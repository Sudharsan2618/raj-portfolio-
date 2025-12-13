
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_CONTENT } from '../constants';
import { Send, User, Mail, MessageSquare, Loader2, CheckCircle, XCircle } from 'lucide-react';

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = 'ccc0882b-316a-41c2-9bd6-0a37249ba8d4';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: 'Raj Kanna.S Portfolio'
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-gray-50 shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row border border-gray-100">

          {/* Left Side: Info */}
          <div className="w-full md:w-5/12 bg-black text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl translate-x-10 -translate-y-10 opacity-40" aria-hidden="true"></div>

            <div>
              <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2 text-xs sm:text-sm">Connect</h4>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Join the <br />Movement</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                Be a part of the digital Dravidian revolution. Connect with Raj Kanna.S to volunteer, invite for events, or share your thoughts.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-3 sm:p-4 bg-zinc-900 rounded-lg border-l-4 border-red-600">
                <p className="text-xs text-gray-500 uppercase mb-1">Office Line</p>
                <p className="text-base sm:text-lg font-bold text-white mb-2">
                  <a href={`tel:${APP_CONTENT.contact.phone}`} className="hover:text-red-500 focus:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
                    {APP_CONTENT.contact.phone}
                  </a>
                </p>
                <p className="text-xs text-gray-400">
                  <a href={`mailto:${APP_CONTENT.contact.email}`} className="hover:text-red-500 focus:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
                    {APP_CONTENT.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10">
            {/* Success/Error Messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-green-800 font-semibold">Message Sent Successfully!</p>
                    <p className="text-green-600 text-sm">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                >
                  <XCircle className="text-red-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-red-800 font-semibold">Failed to Send Message</p>
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Full Name <span className="text-red-600" aria-label="required">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} aria-hidden="true" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-600 outline-none rounded-sm transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your Name"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Email Address <span className="text-red-600" aria-label="required">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} aria-hidden="true" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-600 outline-none rounded-sm transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Message <span className="text-red-600" aria-label="required">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={18} aria-hidden="true" />
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-600 outline-none rounded-sm transition-all text-sm resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="How can we help you?"
                    aria-required="true"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                className="w-full bg-red-600 text-white font-bold py-3 uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-red-700 focus:bg-red-700 transition-colors shadow-lg shadow-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={16} aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
