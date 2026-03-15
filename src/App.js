import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

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
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

import './css/common.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <TopBar />
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/classes"     element={<Classes />} />
          <Route path="/gallery"     element={<Gallery />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/admission"   element={<Admission />} />
          <Route path="/art-crafts"  element={<ArtCrafts />} />
          <Route path="/music"       element={<Music />} />
          <Route path="/sports"      element={<Sports />} />
          <Route path="/story"       element={<Story />} />
          <Route path="/science"     element={<Science />} />
          <Route path="/trip"        element={<Trip />} />
          <Route path="/parents-day" element={<ParentsDay />} />
          <Route path="/dramas"      element={<Dramas />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/blog/:slug"  element={<BlogPost />} />
          <Route path="*"            element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;