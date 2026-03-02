import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Music.css';
import SEO from '../components/SEO';

import m1 from '../assets/img/m1.jpg';
import m2 from '../assets/img/m2.jpg';
import m3 from '../assets/img/m3.jpg';
import m4 from '../assets/img/m4.jpg';

import d1 from '../assets/img/d1.jpg';
import d2 from '../assets/img/d2.jpg';
import d3 from '../assets/img/d3.jpg';
import d4 from '../assets/img/d4.jpg';


function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io = new IntersectionObserver(
      (e) => e.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-on');
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function spawnGlitter(count = 200) {
  for (let i = 0; i < count; i++) {
    const g = document.createElement('div');
    g.className = 'mu-glitter';
    g.style.left = Math.random() * window.innerWidth + 'px';
    g.style.top  = Math.random() * window.innerHeight + 'px';
    g.style.setProperty('--gx', (Math.random() - 0.5) * 600 + 'px');
    g.style.setProperty('--gy', Math.random() * 500 + 'px');
    const sz = Math.random() * 7 + 3;
    g.style.width = sz + 'px';
    g.style.height = sz + 'px';
    g.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    document.body.appendChild(g);
    g.addEventListener('animationend', () => g.remove());
  }
}

const MUSIC = [
  { title:'Vocal Training',    sub:'Finding their voice',     image:m2, e:'🎤', color:'#e91e8c', bg:'#fff0f7', desc:'Breathing exercises, pitch practice, and joyful singing that builds confidence and vocal range.' },
  { title:'Keyboard Practice', sub:'88 keys of wonder',       image:m1, e:'🎹', color:'#3730a3', bg:'#eef0ff', desc:'Hand coordination, note recognition, and simple melodies that introduce the joy of music theory.' },
  { title:'Rhythm & Beats',    sub:'Feel the groove',         image:m3, e:'🥁', color:'#e67e00', bg:'#fff8ee', desc:'Percussion instruments, clapping patterns, and body rhythm that develop timing and coordination.' },
  { title:'Music Appreciation',sub:'Listening deeply',        image:m4, e:'🎵', color:'#198754', bg:'#edfff4', desc:'Exploring world music styles, identifying instruments, and building an emotional connection to sound.' },
];

const DANCE = [
  { title:'Creative Movement', sub:'Move freely',             image:d1, e:'💃', color:'#b91c1c', bg:'#fff1f1', desc:'Freestyle movement to music builds body awareness, spatial intelligence, and pure expressive joy.' },
  { title:'Classical Basics',  sub:'Tradition meets fun',     image:d2, e:'🩰', color:'#7e22ce', bg:'#f8f0ff', desc:'Introduction to classical dance forms including Nepali folk and basic ballet foundation.' },
  { title:'Free Dance',        sub:'Just feel it',            image:d3, e:'🌀', color:'#0e7490', bg:'#e6fafa', desc:'Open-form dance time where children move however the music inspires — no rules, just joy.' },
  { title:'Stage Performance', sub:'Shine under the lights',  image:d4, e:'🌟', color:'#b45309', bg:'#fffbeb', desc:'Preparing for school events with choreography, costumes, and the pride of performing for an audience.' },
];

const INSTRUMENTS = ['🎹','🎸','🥁','🎺','🎻','🎷','🪗','🎵'];

function ActivityCard({ act, i }) {
  return (
    <div className="mu-card sr" style={{ '--delay':`${i*.08}s` }}>
      <div className="mu-card-img">
        <img src={act.image} alt={act.title} onError={(e) => { e.target.src='/img/placeholder.jpg'; }} />
        <div className="mu-card-veil" style={{ background:`${act.color}44` }} />
        <div className="mu-card-emoji">{act.e}</div>
        <span className="mu-card-sub">{act.sub}</span>
      </div>
      <div className="mu-card-body" style={{ background: act.bg }}>
        <h3 style={{ color: act.color }}>{act.title}</h3>
        <p>{act.desc}</p>
        <div className="mu-card-accent" style={{ background: act.color }} />
      </div>
    </div>
  );
}

export default function Music() {
  useScrollReveal();

  useEffect(() => {
    spawnGlitter(300);
    let interval = setInterval(() => spawnGlitter(8), 60);
    setTimeout(() => clearInterval(interval), 2500);
    window.scrollTo(0, 0);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="music-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <header className="mu-hero">
        <div className="mu-hero-blob mhb1"/><div className="mu-hero-blob mhb2"/>
        {/* Animated soundwave bars */}
        <div className="mu-bars" aria-hidden="true">
          {Array.from({length:20},(_,i) => (
            <div key={i} className="mu-bar" style={{ '--bi':`${i}` }} />
          ))}
        </div>
        <div className="mu-hero-inner">
          <span className="mu-pill" onClick={() => spawnGlitter(200)}>
            <span className="mu-dot"/>Click for glitter! ✨
          </span>
          <h1>Music &amp; <em>Dance</em> 🎵</h1>
          <p>Rhythm, movement, melody — three forces that light up a child's brain and fill their heart with joy every single day.</p>
          <nav className="mu-crumb"><Link to="/">Home</Link><span>›</span><Link to="/">Activities</Link><span>›</span><span>Music & Dance</span></nav>
          <button className="mu-glitter-btn" onClick={() => spawnGlitter(250)}>✨ Sprinkle Glitter!</button>
        </div>
        {/* Instrument ticker */}
        <div className="mu-instrument-bar" aria-hidden="true">
          <div className="mu-inst-track">
            {[...INSTRUMENTS,...INSTRUMENTS,...INSTRUMENTS].map((e,i) => (
              <span key={i} className="mu-inst-item">{e}</span>
            ))}
          </div>
        </div>
        <div className="mu-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0Z" fill="white"/>
          </svg>
        </div>
      </header>

      {/* ══ STAT BAR ══════════════════════════════════════════ */}
      <div className="mu-statbar sr">
        {[
          {n:'4',  l:'Music Activities',  e:'🎵'},
          {n:'4',  l:'Dance Activities',  e:'💃'},
          {n:'5×', l:'Sessions/Week',     e:'📅'},
          {n:'2',  l:'Live Performances', e:'🎭'},
        ].map((s,i) => (
          <div key={i} className="mu-stat sr" style={{ '--delay':`${i*.1}s` }}>
            <span className="mu-stat-e">{s.e}</span>
            <span className="mu-stat-n">{s.n}</span>
            <span className="mu-stat-l">{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ MUSIC SECTION ═════════════════════════════════════ */}
      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-sec-head sr">
            <span className="mu-tag music">Music Activities 🎵</span>
            <h2>Making Music</h2>
            <p>From finding their voice to playing instruments — every child discovers the musician within.</p>
          </div>
          <div className="mu-grid">
            {MUSIC.map((act,i) => <ActivityCard key={i} act={act} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══ WAVE DIVIDER ══════════════════════════════════════ */}
      <div className="mu-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60Z"
            fill="url(#muGrad)"/>
          <defs>
            <linearGradient id="muGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#2e0ba2"/>
              <stop offset="100%" stopColor="#22a9ce"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ══ DANCE SECTION ═════════════════════════════════════ */}
      <section className="mu-section dance-section">
        <div className="mu-container">
          <div className="mu-sec-head sr">
            <span className="mu-tag dance">Dance Activities 💃</span>
            <h2>Let's Dance</h2>
            <p>From free movement to classical forms — dance teaches coordination, confidence, and the joy of expression.</p>
          </div>
          <div className="mu-grid">
            {DANCE.map((act,i) => <ActivityCard key={i} act={act} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ══════════════════════════════════════════ */}
      <section className="mu-benefits sr">
        <div className="mu-container">
          <div className="mu-sec-head sr">
            <span className="mu-tag music">Why It Matters</span>
            <h2>Music &amp; Dance Benefits 🌟</h2>
          </div>
          <div className="mu-benefits-grid">
            {[
              {e:'🧠',t:'Brain Development', d:'Music training strengthens neural connections and improves memory'},
              {e:'🎯',t:'Concentration',      d:'Learning rhythms and steps builds focus and attention span'},
              {e:'💃',t:'Coordination',       d:'Dance integrates mind and body, improving balance and motor skills'},
              {e:'😊',t:'Emotional Health',   d:'Musical expression releases emotions and reduces stress naturally'},
              {e:'🤝',t:'Teamwork',           d:'Group performances teach harmony, listening, and collaboration'},
              {e:'🌟',t:'Performance Confidence',d:'Taking the stage builds public speaking and lifelong self-belief'},
            ].map((b,i) => (
              <div key={i} className="mu-benefit-card sr" style={{ '--delay':`${i*.07}s` }}>
                <div className="mu-bc-e">{b.e}</div>
                <h4>{b.t}</h4>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <div className="mu-cta sr">
        <div className="mu-cta-b c1"/><div className="mu-cta-b c2"/>
        <div className="mu-container mu-cta-in">
          <div>
            <h2>Let Your Child Find Their Rhythm 🎵</h2>
            <p>Enroll now and watch them shine on and off the stage.</p>
          </div>
          <div className="mu-cta-btns">
            <Link to="/admission" className="mu-btn-w">Enroll Now →</Link>
            <button className="mu-btn-glitter" onClick={() => spawnGlitter(250)}>✨ Sprinkle!</button>
          </div>
        </div>
      </div>

    </div>
  );
}