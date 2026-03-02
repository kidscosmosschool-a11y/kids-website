import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/ParentsDay.css';
import SEO from '../components/SEO';

import p1 from '../assets/img/p1.jpg';
import p2 from '../assets/img/p2.jpg';
import p3 from '../assets/img/p3.jpg';
import p4 from '../assets/img/p4.jpg';
import p5 from '../assets/img/p5.jpg';
import p6 from '../assets/img/p6.jpg';
import p7 from '../assets/img/p7.jpg';
import p8 from '../assets/img/p8.jpg';
import placeholder from '../assets/img/placeholder.jpg';

function useSR() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io  = new IntersectionObserver(
      (e) => e.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('sr-on'); io.unobserve(en.target); } }),
      { threshold: 0.07 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const PAGES = [
  { image: p1, memory:'Opening Ceremony',   icon:'🎙️', color:'#e8f5ff', desc:'The big day kicks off with cheers, music, and heartfelt welcoming speeches from our wonderful school family.' },
  { image: p2, memory:'Dance Performance',  icon:'💃',  color:'#eef5ff', desc:'Students take the stage with beautifully rehearsed dance routines that leave every parent amazed and proud.' },
  { image: p3, memory:'Art Exhibition',     icon:'🎨',  color:'#e4f3ff', desc:'A stunning display of student artwork showcasing the creativity and incredible talent of every child.' },
  { image: p4, memory:'Games & Fun',        icon:'🎮',  color:'#dff2ff', desc:'Exciting games and friendly competitions where parents and children laugh and play side by side.' },
  { image: p5, memory:'Group Photo',        icon:'📸',  color:'#e8f5ff', desc:'Capturing the magic moment — a beautiful memory of teachers, students, and families all together.' },
  { image: p6, memory:'Prize Distribution', icon:'🏆',  color:'#eef5ff', desc:'Celebrating the achievements of our brightest stars with certificates, trophies, and proud applause.' },
  { image: p7, memory:'Cultural Show',      icon:'🌸',  color:'#e4f3ff', desc:'A vibrant celebration of cultures through colorful costumes, music, and traditional performances.' },
  { image: p8, memory:'Grand Finale',       icon:'🎆',  color:'#dff2ff', desc:'The day ends with a spectacular finale — fireworks of gratitude, joy, and love from all our families.' },
];

const BALLOONS = [
  '#1e90ff','#2bb0ed','#5f9ce6','#7dd4f7','#0c3347',
  '#1a6fa3','#4db8e8','#c0e8ff','#2bb0ed','#0a4fa3',
];

function Lightbox({ pages, startIdx, onClose }) {
  const [cur, setCur] = useState(startIdx);
  const prev = useCallback(() => setCur(c => (c - 1 + pages.length) % pages.length), [pages.length]);
  const next = useCallback(() => setCur(c => (c + 1) % pages.length), [pages.length]);
  useEffect(() => {
    const h = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [prev, next, onClose]);
  const p = pages[cur];
  return (
    <div className="pd-lb" onClick={onClose}>
      <button className="pd-lb-close" onClick={onClose}>✕</button>
      <button className="pd-lb-arr pd-lba-prev" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
      <button className="pd-lb-arr pd-lba-next" onClick={e => { e.stopPropagation(); next(); }}>›</button>
      <div className="pd-lb-content" onClick={e => e.stopPropagation()}>
        <div className="pd-lb-img">
          <img src={p.image} alt={p.memory} onError={(e) => { e.target.src = placeholder; }} />
        </div>
        <div className="pd-lb-cap">
          <span className="pd-lb-icon">{p.icon}</span>
          <div>
            <strong>{p.memory}</strong>
            <small>{p.desc}</small>
          </div>
          <span className="pd-lb-num">{cur+1} / {pages.length}</span>
        </div>
      </div>
    </div>
  );
}

export default function ParentsDay() {
  useSR();
  const [current, setCurrent]   = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir,  setFlipDir]  = useState('next');
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const flipTo = (idx, dir) => {
    if (flipping || idx < 0 || idx >= PAGES.length) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => { setCurrent(idx); setFlipping(false); }, 640);
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') flipTo(current + 1, 'next');
      if (e.key === 'ArrowLeft')  flipTo(current - 1, 'prev');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [current, flipping]);

  const page = PAGES[current];

  return (
    <div className="pd-page">

      <div className="pd-balloons" aria-hidden="true">
        {BALLOONS.map((color, i) => (
          <span key={i} className="pd-balloon"
            style={{ left:`${4+i*9.5}%`, background: color, animationDuration:`${7+i*0.7}s`, animationDelay:`${i*0.5}s` }} />
        ))}
      </div>

      <header className="pd-hero">
        <div className="pd-hblob pd-hb1" /><div className="pd-hblob pd-hb2" /><div className="pd-hblob pd-hb3" />
        <div className="pd-confetti" aria-hidden="true">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="pd-conf"
              style={{
                left: `${i * 4.2}%`,
                background: ['#7dd4f7','#ffcd57','#2bb0ed','#a8daff','#ffd6a5','#5fc8f4'][i % 6],
                animationDelay: `${(i * 0.14) % 2.8}s`,
                width: `${5 + (i%3)*3}px`, height: `${8 + (i%4)*4}px`,
                borderRadius: i % 3 === 0 ? '50%' : '2px',
              }} />
          ))}
        </div>
        <div className="pd-hero-inner">
          <span className="pd-pill"><span className="pd-live" />Annual Celebration</span>
          <h1>Parents' <em>Day</em> 🎉</h1>
          <p>A magical celebration where families, teachers, and children come together in pure joy, pride, and heartfelt gratitude.</p>
          <div className="pd-hero-btns">
            <Link to="/gallery"   className="pd-btn-solid">View Gallery 🖼️</Link>
            <Link to="/admission" className="pd-btn-ghost">Enroll Your Child</Link>
          </div>
          <nav className="pd-crumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/activities">Activities</Link><span>›</span>
            <span>Parents' Day</span>
          </nav>
        </div>
        <div className="pd-hero-wave">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0Z" fill="#f0f9ff" />
          </svg>
        </div>
      </header>

      <div className="pd-book-section">
        <div className="pd-book-wrap">
          <div className="pd-book-shadow" />
          <div className={`pd-book ${flipping ? `pd-flip-${flipDir}` : ''}`}>
            <div className="pd-spine"><span>Parents' Day 2025</span></div>

            <div className="pd-pg pd-left" style={{ background: current > 0 ? PAGES[current-1].color : '#dff2ff' }}>
              {current > 0 ? (
                <>
                  <div className="pd-pgnum">Page {current}</div>
                  <div className="pd-left-img" onClick={() => setLightbox(current - 1)}>
                    <img src={PAGES[current-1].image} alt={PAGES[current-1].memory}
                      onError={(e) => { e.target.src = placeholder; }} />
                    <div className="pd-left-overlay"><span>🔍</span></div>
                  </div>
                  <div className="pd-left-caption">
                    <span>{PAGES[current-1].icon}</span> {PAGES[current-1].memory}
                  </div>
                </>
              ) : (
                <div className="pd-cover-left">
                  <div className="pd-cover-emoji">🎉</div>
                  <h3>Parents' Day</h3>
                  <p>Kids Cosmos School</p>
                  <div className="pd-cover-year">2025</div>
                  <div className="pd-cover-bl">🎈 🎀 🎈</div>
                </div>
              )}
            </div>

            <div className="pd-pg pd-right" style={{ background: page.color }}>
              <div className="pd-pgnum">Page {current + 1}</div>
              <div className="pd-cf pd-tl" /><div className="pd-cf pd-tr" />
              <div className="pd-cf pd-bl" /><div className="pd-cf pd-br" />
              <div className="pd-right-photo" onClick={() => setLightbox(current)}>
                <div className="pd-photo-mat">
                  <img key={current} src={page.image} alt={page.memory}
                    className="pd-photo-enter"
                    onError={(e) => { e.target.src = placeholder; }} />
                  <div className="pd-photo-hover"><span>🔍</span></div>
                </div>
              </div>
              <div className="pd-right-cap">
                <span className="pd-cap-icon">{page.icon}</span>
                <div>
                  <strong>{page.memory}</strong>
                  <p>{page.desc}</p>
                </div>
              </div>
              <div className="pd-page-curl" />
            </div>
          </div>

          <div className="pd-controls">
            <button className="pd-nav-btn pd-prev" onClick={() => flipTo(current-1,'prev')} disabled={current===0||flipping}>‹ Prev</button>
            <div className="pd-dots">
              {PAGES.map((_, i) => (
                <button key={i} className={`pd-dot ${i === current ? 'active' : ''}`}
                  onClick={() => flipTo(i, i > current ? 'next' : 'prev')} />
              ))}
            </div>
            <button className="pd-nav-btn pd-next" onClick={() => flipTo(current+1,'next')} disabled={current===PAGES.length-1||flipping}>Next ›</button>
          </div>
          <div className="pd-counter">
            <span className="pd-cn">{String(current+1).padStart(2,'0')}</span>
            <span>/</span>
            <span className="pd-ct">{String(PAGES.length).padStart(2,'0')}</span>
          </div>
        </div>
      </div>

      <section className="pd-highlights">
        <div className="pd-wrap">
          <div className="pd-sec-head sr">
            <span className="pd-tag">All Moments</span>
            <h2>Event Highlights 🌟</h2>
            <p>Click any highlight to jump straight to that page in the book above.</p>
          </div>
          <div className="pd-hl-grid">
            {PAGES.map((p, i) => (
              <div key={i} className="pd-hl-card sr" style={{ '--delay': `${i*0.07}s` }}
                onClick={() => { flipTo(i, i > current ? 'next' : 'prev'); document.querySelector('.pd-book-section')?.scrollIntoView({ behavior:'smooth' }); }}>
                <div className="pd-hl-img">
                  <img src={p.image} alt={p.memory} onError={(e) => { e.target.src = placeholder; }} />
                  <div className="pd-hl-veil" />
                  <span className="pd-hl-icon">{p.icon}</span>
                </div>
                <div className="pd-hl-body">
                  <h4>{p.memory}</h4>
                  <p>{p.desc.substring(0, 64)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pd-cta">
        <div className="pd-cta-b1" /><div className="pd-cta-b2" />
        <div className="pd-wrap pd-cta-inner sr">
          <div>
            <h2>Be Part of the Next Celebration! 🎊</h2>
            <p>Enroll your child and become part of our wonderful school family today.</p>
          </div>
          <div className="pd-cta-btns">
            <Link to="/admission" className="pd-btn-enroll">Enroll Now →</Link>
            <Link to="/contact"   className="pd-btn-contact">Contact Us</Link>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox pages={PAGES} startIdx={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}