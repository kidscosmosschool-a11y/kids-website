import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Dramas.css';
import SEO from '../components/SEO';
// ── Image imports from src/assets/img/ ──
import dr1 from '../assets/img/sp.jpg';
import dr2 from '../assets/img/sp1.jpg';
import dr3 from '../assets/img/sp2.jpg';
import dr4 from '../assets/img/sp3.jpg';
import dr5 from '../assets/img/sp5.jpg';
import dr6 from '../assets/img/sp6.jpg';
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

const DRAMAS = [
  {
    title: 'Fairy Tales',       image: dr1, icon: '🧚', type: 'Classic',
    accent: '#2bb0ed', bg: '#e8f5ff',
    desc: 'Classic stories like Cinderella, Snow White, and Sleeping Beauty brought to vivid, magical life on stage by our young performers.',
    skills: ['Storytelling','Costumes','Memory','Expression'],
    duration: '30 mins', cast: '8–12 children',
  },
  {
    title: 'Puppet Shows',      image: dr2, icon: '🎭', type: 'Interactive',
    accent: '#1a6fa3', bg: '#dff2ff',
    desc: 'Hand-crafted puppets controlled by the children themselves — interactive shows that delight audiences of all ages.',
    skills: ['Coordination','Voice','Craft','Narrative'],
    duration: '20 mins', cast: '4–8 children',
  },
  {
    title: 'Role Play',         image: dr3, icon: '🎪', type: 'Immersive',
    accent: '#0d5490', bg: '#e4f3ff',
    desc: 'Acting out everyday scenarios from doctors to firefighters — role play that builds empathy, communication, and real-world understanding.',
    skills: ['Empathy','Communication','Creativity','Confidence'],
    duration: '15 mins', cast: '6–10 children',
  },
  {
    title: 'Skits',             image: dr4, icon: '😄', type: 'Comedy',
    accent: '#2bb0ed', bg: '#e8f5ff',
    desc: 'Short, punchy comedy and drama skits that teach timing, delivery, and teamwork while bringing laughter to every audience.',
    skills: ['Timing','Delivery','Teamwork','Humour'],
    duration: '10 mins', cast: '3–6 children',
  },
  {
    title: 'Stage Performance', image: dr5, icon: '🌟', type: 'Full Show',
    accent: '#1a6fa3', bg: '#dff2ff',
    desc: 'Full-length stage productions with lighting, costumes, music, and rehearsed scripts — our grandest theatrical showcase of the year.',
    skills: ['Stage Presence','Blocking','Projection','Ensemble'],
    duration: '60 mins', cast: '15–30 children',
  },
  {
    title: 'Improv Games',      image: dr6, icon: '⚡', type: 'Spontaneous',
    accent: '#0d5490', bg: '#e4f3ff',
    desc: 'Fast-thinking improvisational games that challenge children to react, adapt, and perform without a script — pure creative joy.',
    skills: ['Quick Thinking','Listening','Adaptability','Play'],
    duration: '25 mins', cast: '6–12 children',
  },
];

const TYPES = ['All', 'Classic', 'Interactive', 'Immersive', 'Comedy', 'Full Show', 'Spontaneous'];

const BENEFITS = [
  ['🎤', 'Vocal Confidence',      'Children find and project their voice in front of an audience.'],
  ['👁️', 'Body Awareness',        'Drama teaches gesture, movement, and expressive physicality.'],
  ['🧩', 'Emotional Intelligence','Playing different roles builds deep empathy and social insight.'],
  ['🤝', 'Collaboration',          'Theatre is a team sport — every child learns to lift others up.'],
];

function DramaCard({ d, i }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="dr-card sr" style={{ '--delay': `${i * 0.08}s`, '--acc': d.accent, '--cbg': d.bg }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="dr-card-img">
        <img src={d.image} alt={d.title} onError={(e) => { e.target.src = placeholder; }} />
        <div className="dr-card-veil" />
        <span className="dr-card-icon">{d.icon}</span>
        <span className="dr-card-type">{d.type}</span>
        <div className="dr-curtain-l" /><div className="dr-curtain-r" />
      </div>
      <div className="dr-card-body">
        <h3>{d.title}</h3>
        <p>{d.desc}</p>
        <div className="dr-chips">
          {d.skills.map((s) => <span key={s} className="dr-chip" style={{ color: d.accent, borderColor: `${d.accent}44` }}>{s}</span>)}
        </div>
        <div className={`dr-meta ${hover ? 'dr-meta-show' : ''}`}>
          <span className="dr-meta-item">🕐 {d.duration}</span>
          <span className="dr-meta-item">👦 {d.cast}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dramas() {
  useSR();
  const [filter, setFilter] = useState('All');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const shown = filter === 'All' ? DRAMAS : DRAMAS.filter(d => d.type === filter);

  return (
    <div className="dr-page">

      <header className="dr-hero">
        <div className="dr-spot dr-sp1" /><div className="dr-spot dr-sp2" />
        <div className="dr-spot dr-sp3" /><div className="dr-spot dr-sp4" />
        <div className="dr-hero-curtain dr-hcl" /><div className="dr-hero-curtain dr-hcr" />
        <div className="dr-stars" aria-hidden="true">
          {[...Array(18)].map((_, i) => (
            <span key={i} className="dr-star"
              style={{ left: `${3 + i * 5.4}%`, top: `${10 + Math.sin(i) * 35}%`, animationDelay: `${i * 0.22}s`, fontSize: `${10 + (i%4)*4}px` }}>✦</span>
          ))}
        </div>
        <div className="dr-hero-inner">
          <span className="dr-pill">🎭 Drama &amp; Theater Program</span>
          <h1>Drama &amp; <em>Theater</em> 🎭</h1>
          <p>Where imagination comes to life on stage. Children discover the power of their voice, body, and emotion through the transformative art of theater.</p>
          <div className="dr-hero-btns">
            <Link to="/admission" className="dr-btn-solid">Join Drama Club →</Link>
            <Link to="/contact"   className="dr-btn-ghost">Enquire Now</Link>
          </div>
          <nav className="dr-crumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/activities">Activities</Link><span>›</span>
            <span>Drama &amp; Theater</span>
          </nav>
        </div>
        <div className="dr-stage-boards" aria-hidden="true">
          {[...Array(12)].map((_, i) => <div key={i} className="dr-board" />)}
        </div>
        <div className="dr-hero-wave">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0Z" fill="#e4f3ff" />
          </svg>
        </div>
      </header>

      <div className="dr-stats sr">
        {[
          ['🎭','6+',  'Drama Formats'],
          ['👦','200+','Young Performers'],
          ['🌟','12+', 'Shows Per Year'],
          ['🏆','10+', 'Years On Stage'],
        ].map(([icon, num, label], i) => (
          <div key={i} className="dr-stat">
            <span>{icon}</span>
            <strong>{num}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <section className="dr-grid-sec">
        <div className="dr-wrap">
          <div className="dr-sec-head sr">
            <span className="dr-tag">On Stage</span>
            <h2>Our Drama Formats 🎭</h2>
            <p>Six distinct types of theater, each crafted to develop a different dimension of your child's expressive potential.</p>
          </div>
          <div className="dr-filters sr">
            {TYPES.map((t) => (
              <button key={t} className={`dr-filter-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
            ))}
          </div>
          <div className="dr-grid">
            {shown.map((d, i) => <DramaCard key={d.title} d={d} i={i} />)}
          </div>
        </div>
      </section>

      <section className="dr-benefits">
        <div className="dr-wrap">
          <div className="dr-sec-head sr">
            <span className="dr-tag dr-tag-light">Why Drama Matters</span>
            <h2>How Theater Shapes Young Minds ✨</h2>
          </div>
          <div className="dr-ben-grid">
            {BENEFITS.map(([icon, title, desc], i) => (
              <div key={i} className="dr-ben-card sr" style={{ '--delay': `${i * 0.09}s` }}>
                <div className="dr-ben-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dr-quote sr">
        <div className="dr-wrap dr-quote-inner">
          <div className="dr-qmark">"</div>
          <blockquote>All the world's a stage — and at Kids Cosmos, every child gets their moment in the spotlight.</blockquote>
        </div>
      </div>

      <div className="dr-cta">
        <div className="dr-cta-b1" /><div className="dr-cta-b2" />
        <div className="dr-wrap dr-cta-inner sr">
          <div>
            <h2>Ready to Take the Stage? 🌟</h2>
            <p>Enroll your child and let their inner performer shine bright for the whole world to see.</p>
          </div>
          <div className="dr-cta-btns">
            <Link to="/admission" className="dr-btn-enroll">Enroll Now →</Link>
            <Link to="/gallery"   className="dr-btn-gallery">See Performances</Link>
          </div>
        </div>
      </div>

    </div>
  );
}