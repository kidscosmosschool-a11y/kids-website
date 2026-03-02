import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Import all page components
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import ArtCrafts from './pages/ArtCrafts';
import Music from './pages/Music';
import Sports from './pages/Sports';
import Story from './pages/Story';
import Science from './pages/Science';
import Trip from './pages/Trip';
import ParentsDay from './pages/ParentsDay';
import Dramas from './pages/Dramas';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admission from './pages/Admission';

// Import CSS
import './css/common.css';

function App() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      {/* Top Bar with contact info and social links */}
      <TopBar />

      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Main Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          
          {/* Activities Pages */}
          <Route path="/art-crafts" element={<ArtCrafts />} />
          <Route path="/Art-Crafts" element={<ArtCrafts />} />
          
          <Route path="/music" element={<Music />} />
          <Route path="/Music" element={<Music />} />
          
          <Route path="/sports" element={<Sports />} />
          <Route path="/Sports" element={<Sports />} />
          
          <Route path="/story" element={<Story />} />
          <Route path="/Story" element={<Story />} />
          
          <Route path="/science" element={<Science />} />
          <Route path="/Science" element={<Science />} />
          
          <Route path="/trip" element={<Trip />} />
          <Route path="/Trip" element={<Trip />} />
          
          <Route path="/parents-day" element={<ParentsDay />} />
          <Route path="/Parents-Day" element={<ParentsDay />} />
          
          <Route path="/dramas" element={<Dramas />} />
          <Route path="/Dramas" element={<Dramas />} />

          {/* Fallback - Home for any unmatched route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;