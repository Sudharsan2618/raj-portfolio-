import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import VideoGallery from './components/VideoGallery';
import PDFGallery from './components/PDFGallery';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-600 selection:text-white overflow-x-hidden w-full">
        <Navbar />
        <main id="main-content" className="overflow-x-hidden w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<VideoGallery />} />
            <Route path="/editorials" element={<PDFGallery />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;