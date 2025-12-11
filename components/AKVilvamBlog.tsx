import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import akVilvamImage from '../A_K_Vilvam.png';

const AKVilvamBlog: React.FC = () => {
    const [blogContent, setBlogContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);

        // Fetch the blog content from the text file
        fetch('/blog/akvilvam.txt')
            .then(response => response.text())
            .then(text => {
                setBlogContent(text);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error loading blog content:', error);
                setIsLoading(false);
            });
    }, []);

    // Split content into paragraphs for better formatting
    const paragraphs = blogContent.split('\n').filter(p => p.trim() !== '');

    return (
        <section className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white">
            {/* Hero Section with Image */}
            <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={akVilvamImage}
                        alt="A.K. Vilvam"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-900" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
                </div>


                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="text-red-500" size={24} />
                            <span className="text-red-400 font-bold uppercase tracking-widest text-sm">
                                Dravidian Legacy
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
                            <span className="text-white">A.K. </span>
                            <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-500 bg-clip-text text-transparent">
                                Vilvam
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 font-medium">
                            எழுத்தழகன் | Murasoli Editor | MLC
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Blog Content Section */}
            <div className="relative py-12 sm:py-16 md:py-20">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-red-600 opacity-5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Quote Box */}
                        <div className="bg-gradient-to-r from-red-900/30 to-amber-900/20 border-l-4 border-red-600 p-6 sm:p-8 rounded-r-xl mb-10 backdrop-blur-sm">
                            <Quote className="text-red-500 mb-4" size={32} />
                            <p className="text-xl sm:text-2xl font-bold text-white font-['Noto_Sans_Tamil'] leading-relaxed">
                                "நீங்கள் என் நண்பர்... ஆனால் கலைஞர் என் ஆன்மா."
                            </p>
                            <p className="text-amber-400 mt-4 text-sm uppercase tracking-widest font-semibold">
                                — A.K. Vilvam to MGR
                            </p>
                        </div>

                        {/* Blog Content */}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {paragraphs.map((paragraph, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                        className="text-lg sm:text-xl text-gray-200 leading-relaxed font-['Noto_Sans_Tamil'] tracking-wide"
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>
                        )}

                        {/* Footer Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="mt-16 pt-10 border-t border-zinc-700"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold transition-all duration-300 shadow-lg hover:shadow-red-600/30"
                                >
                                    <ArrowLeft size={18} />
                                    Return to Portfolio
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AKVilvamBlog;
