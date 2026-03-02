import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Story.css';
import SEO from '../components/SEO';

import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpg';
import img3 from '../assets/img/3.jpg';
import img4 from '../assets/img/4.jpg';
import img5 from '../assets/img/5.jpg';
import img6 from '../assets/img/6.jpg';
import img7 from '../assets/img/7.jpg';
import img8 from '../assets/img/8.jpg';
import img9 from '../assets/img/9.jpg';
import img10 from '../assets/img/10.jpg';


const PAGES = [
  { image: img1,  memory:'Our first storytelling day!',      sub:'The adventure begins…',         e:'📖' },
  { image: img2,  memory:'Fun with puppet shows.',            sub:'Characters come to life!',      e:'🎭' },
  { image: img3,  memory:'Storytime in the garden.',          sub:'Nature as our classroom.',      e:'🌿' },
  { image: img4,  memory:'Kids performing tales.',            sub:'Stars of the stage!',           e:'⭐' },
  { image: img5,  memory:'Making our storybooks.',            sub:'Authors at age 5!',             e:'✏️' },
  { image: img6,  memory:'Storytelling with music.',          sub:'When melody meets narrative.',  e:'🎵' },
  { image: img7,  memory:'Imagination time!',                 sub:'Where dreams have no limit.',   e:'✨' },
  { image: img8,  memory:'Reading under the tree.',           sub:'Our favourite spot to read.',   e:'🌳' },
  { image: img9,  memory:'Crafting story props.',             sub:'Making magic with our hands.',  e:'🎨' },
  { image: img10, memory:'Happy storytelling finale!',        sub:'Until the next chapter…',       e:'🏅' },
];
export default function Story() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('next');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goTo = useCallback((idx) => {
    if (idx === current || flipping || idx < 0 || idx >= PAGES.length) return;
    setFlipDir(idx > current ? 'next' : 'prev');
    setFlipping(true);
    setTimeout(() => { setCurrent(idx); setFlipping(false); }, 480);
  }, [current, flipping]);

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    const h = (e) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [current, flipping]);

  const progress = (current / (PAGES.length - 1)) * 100;
  const page = PAGES[current];

  return (
    <div className="story-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <header className="st-hero">
        <div className="st-hero-blob shb1"/><div className="st-hero-blob shb2"/>
        <div className="st-particles" aria-hidden="true">
          {['📖','⭐','✨','🌟','💫','📚','🎭','🌈'].map((e,i) => (
            <span key={i} className="st-particle" style={{ '--pi':`${i}`, '--pd':`${i*.4}s` }}>{e}</span>
          ))}
        </div>
        <div className="st-hero-inner">
          <span className="st-pill"><span className="st-dot-pulse"/>Interactive Storybook</span>
          <h1>Our <em>Story</em> 📖</h1>
          <p>Ten magical moments of joy, learning, and laughter — turn the pages of our most cherished memories.</p>
          <nav className="st-crumb"><Link to="/">Home</Link><span>›</span><Link to="/">Activities</Link><span>›</span><span>Story Time</span></nav>
        </div>
        <div className="st-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0Z" fill="#fff9f0"/>
          </svg>
        </div>
      </header>

      {/* ══ BOOK SCENE ════════════════════════════════════════ */}
      <div className="st-scene">

        {/* Top progress */}
        <div className="st-prog-wrap">
          <div className="st-prog-bar" style={{ width:`${progress}%` }}/>
          <span className="st-prog-label">Page {current + 1} / {PAGES.length}</span>
        </div>

        <div className="st-layout">

          {/* ── Thumbnail sidebar ── */}
          <div className="st-sidebar">
            <div className="st-sidebar-title">📚 All Pages</div>
            <div className="st-thumbs">
              {PAGES.map((p, i) => (
                <button key={i} className={`st-thumb ${i===current?'active':''}`}
                  onClick={() => goTo(i)} aria-label={`Go to page ${i+1}`}>
                  <img src={p.image} alt={p.memory}
                    onError={(e) => { e.target.src='/img/placeholder.jpg'; }} />
                  <span className="st-thumb-e">{p.e}</span>
                  <span className="st-thumb-n">{i+1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Book ── */}
          <div className="st-book-col">
            <div className={`st-book ${flipping ? `flip-${flipDir}` : ''}`}>

              {/* LEFT PAGE */}
              <div className="st-page st-page-left">
                <div className="st-page-inner">
                  <div className="st-chapter-label">Chapter {current + 1}</div>
                  <div className="st-decorative-lines">
                    <div className="st-dline"/><div className="st-dline st-dline-mid"/><div className="st-dline"/>
                  </div>
                  <div className="st-left-quote">
                    <span className="st-qmark">"</span>
                    <p>{page.sub}</p>
                    <span className="st-qmark st-qmark-close">"</span>
                  </div>
                  <div className="st-left-emoji">{page.e}</div>
                  <div className="st-page-num-left">{current + 1}</div>
                </div>
              </div>

              {/* SPINE */}
              <div className="st-spine"/>

              {/* RIGHT PAGE */}
              <div className="st-page st-page-right">
                <div className="st-page-inner">
                  <div className="st-photo-frame">
                    <img key={current} src={page.image} alt={page.memory}
                      onError={(e) => { e.target.src='/img/placeholder.jpg'; }} />
                    {/* Polaroid corners */}
                    <div className="stc stc-tl"/><div className="stc stc-tr"/>
                    <div className="stc stc-bl"/><div className="stc stc-br"/>
                  </div>
                  <div className="st-caption">
                    <span className="st-cap-emoji">{page.e}</span>
                    <span>{page.memory}</span>
                  </div>
                  <div className="st-page-num-right">{current + 2}</div>
                </div>
              </div>

            </div>

            {/* Navigation controls */}
            <div className="st-controls">
              <button className="st-ctrl-btn" onClick={prev} disabled={current===0}>‹ Prev</button>
              <div className="st-dot-nav">
                {PAGES.map((_,i) => (
                  <button key={i} className={`st-nav-dot ${i===current?'active':''}`}
                    onClick={() => goTo(i)} aria-label={`Page ${i+1}`}/>
                ))}
              </div>
              <button className="st-ctrl-btn st-ctrl-next" onClick={next} disabled={current===PAGES.length-1}>Next ›</button>
            </div>
            <p className="st-hint">💡 Use ← → keys or click dots to navigate</p>
          </div>

          {/* ── Info panel ── */}
          <div className="st-info">
            <div className="st-info-emoji">{page.e}</div>
            <div className="st-info-page">Page {current + 1}</div>
            <h3 className="st-info-memory">{page.memory}</h3>
            <p className="st-info-sub">{page.sub}</p>
            <div className="st-info-sep"/>
            <div className="st-info-nums">
              {[{n:PAGES.length,l:'Pages'},{n:current+1,l:'Current'},{n:PAGES.length-current-1,l:'Left'}].map((s) => (
                <div key={s.l} className="st-info-num">
                  <span>{s.n}</span><small>{s.l}</small>
                </div>
              ))}
            </div>
            <div className="st-info-prog-wrap">
              <div className="st-info-prog-labels">
                <span>Reading progress</span><span>{Math.round(progress)}%</span>
              </div>
              <div className="st-info-prog-bg">
                <div className="st-info-prog-fill" style={{ width:`${progress}%` }}/>
              </div>
            </div>
            <Link to="/gallery" className="st-gallery-link">📷 View Full Gallery →</Link>
          </div>

        </div>
      </div>

    </div>
  );
}