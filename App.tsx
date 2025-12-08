import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Legacy from './components/Legacy';
import Initiatives from './components/Initiatives';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Legacy />
      <Initiatives />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;