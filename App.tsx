import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import VideoGallery from './components/VideoGallery';
import PDFGallery from './components/PDFGallery';
import AKVilvamBlog from './components/AKVilvamBlog';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import BackgroundMusic from './components/BackgroundMusic';
import { ChatbotProvider } from './contexts/ChatbotContext';

const App: React.FC = () => {
  return (
    <ChatbotProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-600 selection:text-white overflow-x-hidden w-full">
          <Navbar />
          <main id="main-content" className="overflow-x-hidden w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<VideoGallery />} />
              <Route path="/editorials" element={<PDFGallery />} />
              <Route path="/blog/ak-vilvam" element={<AKVilvamBlog />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
          <BackgroundMusic />
        </div>
      </Router>
    </ChatbotProvider>
  );
};

export default App;