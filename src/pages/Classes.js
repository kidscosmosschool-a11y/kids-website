import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Classes.css';
import SEO from '../components/SEO';

import pgImg from '../assets/img/pg.jpg';
import nurseryImg from '../assets/img/nursery.jpg';
import lkgImg from '../assets/img/lkg.jpg';
import ukgImg from '../assets/img/ukg.jpg';
import c1Img from '../assets/img/c1.jpg';
import c2Img from '../assets/img/c2.jpg';
import c3Img from '../assets/img/c3.jpg';
import c4Img from '../assets/img/c4.jpg';


function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io = new IntersectionObserver(
      (e) =>
        e.forEach((entry) => {
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

const CLASSES = [
  {
    id: 1,
    short: 'PG',
    name: 'Play Group',
    age: '2 – 3 Years',
    level: 'Early Childhood',
    emoji: '🎠',
    accent: '#e91e8c',
    light: '#fff0f7',
    dark: '#7a003e',
    tagline: 'Where it all begins',
    highlights: ['Sensory exploration', 'Routine & rhythm', 'Social bonding', 'Language seeds'],
    stats: [{ n: '8', l: 'Kids/class' }, { n: '2×', l: 'Play/week' }, { n: '5', l: 'Sense zones' }],
    image: pgImg,
  },
  {
    id: 2,
    short: 'NUR',
    name: 'Nursery',
    age: '3 – 4 Years',
    level: 'Early Childhood',
    emoji: '🌸',
    accent: '#e67e00',
    light: '#fff8ee',
    dark: '#7a3c00',
    tagline: 'Curiosity takes root',
    highlights: ['A–Z Alphabets', '1–20 Numbers', 'Colors & shapes', 'Rhymes & songs'],
    stats: [{ n: '10', l: 'Kids/class' }, { n: '3×', l: 'Story time' }, { n: '8', l: 'Activity types' }],
    image: nurseryImg,
  },
  {
    id: 3,
    short: 'LKG',
    name: 'Lower KG',
    age: '4 – 5 Years',
    level: 'Kindergarten',
    emoji: '📝',
    accent: '#198754',
    light: '#edfff4',
    dark: '#0a4028',
    tagline: 'Skills bloom here',
    highlights: ['Phonics & reading', 'Number concepts', 'Writing readiness', 'Fine motor skills'],
    stats: [{ n: '12', l: 'Kids/class' }, { n: '5×', l: 'Phonics/wk' }, { n: '4', l: 'Core areas' }],
    image: lkgImg,
  },
  {
    id: 4,
    short: 'UKG',
    name: 'Upper KG',
    age: '5 – 6 Years',
    level: 'Kindergarten',
    emoji: '🔤',
    accent: '#3730a3',
    light: '#eef0ff',
    dark: '#1e1a6e',
    tagline: 'Ready for big school',
    highlights: ['Reading fluency', 'Basic maths', 'Logical thinking', 'Confident speaking'],
    stats: [{ n: '12', l: 'Kids/class' }, { n: '6×', l: 'Maths/wk' }, { n: '3', l: 'Languages' }],
    image: ukgImg,
  },
  {
    id: 5,
    short: 'C1',
    name: 'Class 1',
    age: 'Primary Level',
    level: 'Primary',
    emoji: '📚',
    accent: '#0e7490',
    light: '#e6fafa',
    dark: '#063344',
    tagline: 'Foundation year',
    highlights: ['English grammar', 'Mathematics', 'Env. studies', 'Moral values'],
    stats: [{ n: '15', l: 'Kids/class' }, { n: '6', l: 'Subjects' }, { n: '5×', l: 'Sports/wk' }],
    image: c1Img,
  },
  {
    id: 6,
    short: 'C2',
    name: 'Class 2',
    age: 'Primary Level',
    level: 'Primary',
    emoji: '✏️',
    accent: '#b91c1c',
    light: '#fff1f1',
    dark: '#5c0000',
    tagline: 'Skills deepen',
    highlights: ['Reading fluency', 'Creative writing', 'Maths mastery', 'Science basics'],
    stats: [{ n: '15', l: 'Kids/class' }, { n: '7', l: 'Subjects' }, { n: '4×', l: 'Projects/term' }],
    image: c2Img,
  },
  {
    id: 7,
    short: 'C3',
    name: 'Class 3',
    age: 'Upper Primary',
    level: 'Upper Primary',
    emoji: '🔭',
    accent: '#7e22ce',
    light: '#f8f0ff',
    dark: '#3b0764',
    tagline: 'Critical minds grow',
    highlights: ['Advanced English', 'Mathematics', 'Science concepts', 'Critical thinking'],
    stats: [{ n: '15', l: 'Kids/class' }, { n: '8', l: 'Subjects' }, { n: '2×', l: 'Lab/wk' }],
    image: c3Img,
  },
  {
    id: 8,
    short: 'C4',
    name: 'Class 4',
    age: 'Upper Primary',
    level: 'Upper Primary',
    emoji: '🏆',
    accent: '#b45309',
    light: '#fffbeb',
    dark: '#5c2600',
    tagline: 'Leaders in the making',
    highlights: ['Concept mastery', 'Problem solving', 'Leadership skills', 'Independence'],
    stats: [{ n: '15', l: 'Kids/class' }, { n: '9', l: 'Subjects' }, { n: '1×', l: 'Leadership/wk' }],
    image: c4Img,
  },
];

const LEVELS = [
  { name:'Early Childhood', bar:'#e91e8c', bg:'#fff5fb', desc:'Ages 2–4 · Foundation through play and sensory exploration' },
  { name:'Kindergarten',    bar:'#198754', bg:'#f0fff6', desc:'Ages 4–6 · Pre-primary academics with hands-on activities' },
  { name:'Primary',         bar:'#0e7490', bg:'#f0fafa', desc:'Primary Level · Core subjects with structured learning' },
  { name:'Upper Primary',   bar:'#7e22ce', bg:'#faf5ff', desc:'Upper Primary · Advanced curriculum and leadership focus' },
];

function ClassCard({ cls, i }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="cls-card sr" style={{ '--delay':`${i*0.06}s` }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

      {/* ─ Photo header ─ */}
      <div className="cls-photo-wrap" style={{ '--acc': cls.accent, '--drk': cls.dark }}>
        <img src={cls.image} alt={cls.name}
          onError={(e) => { e.target.src='/img/placeholder.jpg'; }} />
        <div className="cls-photo-gradient" />
        <div className="cls-photo-pattern" />

        {/* Emoji */}
        <div className="cls-card-emoji">{cls.emoji}</div>

        {/* Top right: level + age */}
        <div className="cls-photo-top">
          <span className="cls-lvl-pill" style={{ background:`${cls.accent}cc` }}>{cls.level}</span>
          <span className="cls-age-pill">📅 {cls.age}</span>
        </div>

        {/* Bottom overlay: name */}
        <div className="cls-photo-bottom">
          <div className="cls-code" style={{ background:`${cls.dark}cc`, color:'#fff' }}>{cls.short}</div>
          <div>
            <h3 className="cls-name">{cls.name}</h3>
            <p className="cls-tagline">{cls.tagline}</p>
          </div>
        </div>
      </div>

      {/* ─ Body ─ */}
      <div className="cls-body" style={{ background: cls.light }}>
        <div className="cls-hl-list">
          {cls.highlights.map((h) => (
            <span key={h} className="cls-hl" style={{ color: cls.accent }}>
              <span className="cls-hl-dot" style={{ background: cls.accent }} />{h}
            </span>
          ))}
        </div>

        <div className="cls-stats-row" style={{ borderTop:`2px solid ${cls.accent}28` }}>
          {cls.stats.map((s) => (
            <div key={s.l} className="cls-stat">
              <span className="cls-stat-n" style={{ color: cls.accent }}>{s.n}</span>
              <span className="cls-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─ Hover CTA ─ */}
      <div className={`cls-hover-cta ${hover ? 'visible' : ''}`}
        style={{ background:`linear-gradient(135deg,${cls.accent},${cls.dark})` }}>
        <Link to="/admission" className="cls-btn-enroll">Enroll in {cls.name} →</Link>
        <Link to="/contact"   className="cls-btn-ask">Ask a question</Link>
      </div>
    </div>
  );
}

export default function Classes() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  let idx = 0;

  return (
    <div className="classes-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <header className="cl-hero">
        <div className="cl-hero-blobs">
          <span className="clb clb1"/><span className="clb clb2"/><span className="clb clb3"/>
        </div>
        <div className="cl-hero-dots" aria-hidden="true"/>
        <div className="cl-hero-inner">
          <div className="cl-hero-left">
            <span className="cl-pill"><span className="cl-dot"/> Academic Programs 2024</span>
            <h1>Our <em>Classes</em> 📘</h1>
            <p>Eight age-appropriate programs from Playgroup to Class 4, each crafted to nurture every child's unique spark with joy and purpose.</p>
            <nav className="cl-crumb"><Link to="/">Home</Link><span>›</span><span>Classes</span></nav>
          </div>
          <div className="cl-hero-levels">
            {LEVELS.map((lv) => (
              <div key={lv.name} className="cl-lv-pill" style={{ '--bar':lv.bar }}>
                <div className="cl-lv-stripe"/>
                <div>
                  <strong>{lv.name}</strong>
                  <em>{CLASSES.filter(c=>c.level===lv.name).length} programs</em>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="cl-ticker" aria-hidden="true">
          <div className="cl-ticker-track">
            {[...CLASSES,...CLASSES,...CLASSES].map((c,i) => (
              <span key={i} className="cl-ticker-chip">{c.emoji} {c.short} — {c.name}</span>
            ))}
          </div>
        </div>

        <div className="cl-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0Z" fill="white"/>
          </svg>
        </div>
      </header>

      {/* ══ OVERVIEW BAR ══════════════════════════════════════ */}
      <div className="cl-overview sr">
        {[
          {n:'8',l:'Class Levels',      e:'📘'},
          {n:'2–12',l:'Age Range',      e:'👶'},
          {n:'≤15',l:'Max Class Size',  e:'👩‍🏫'},
          {n:'2',l:'Languages',          e:'🌍'},
        ].map((s,i) => (
          <div key={i} className="cl-ov-item sr" style={{ '--delay':`${i*.1}s` }}>
            <span className="cl-ov-e">{s.e}</span>
            <span className="cl-ov-n">{s.n}</span>
            <span className="cl-ov-l">{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ LEVEL SECTIONS ════════════════════════════════════ */}
      <main className="cl-main">
        {LEVELS.map(({ name, bar, bg, desc }) => {
          const grp = CLASSES.filter((c) => c.level === name);
          const si  = idx;
          idx += grp.length;
          return (
            <section key={name} className="cl-level-sec sr" style={{ '--lvbg': bg }}>
              <div className="cl-container">
                <div className="cl-level-hdr">
                  <div className="cl-level-stripe" style={{ background: bar }}/>
                  <div className="cl-level-txt">
                    <h2 style={{ color: bar }}>{name}</h2>
                    <p>{desc}</p>
                  </div>
                  <div className="cl-level-cnt" style={{ color: bar, borderColor:`${bar}44` }}>
                    {grp.length} program{grp.length>1?'s':''}
                  </div>
                </div>
                <div className="cl-cards-grid">
                  {grp.map((cls,i) => <ClassCard key={cls.id} cls={cls} i={si+i}/>)}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* ══ WHY US ════════════════════════════════════════════ */}
      <section className="cl-why sr">
        <div className="cl-container">
          <div className="cl-why-head sr">
            <span className="cl-section-tag">Our Approach</span>
            <h2>Why Families Choose Kids Cosmos ✨</h2>
          </div>
          <div className="cl-why-grid">
            {[
              {e:'👩‍🏫',t:'Expert Teachers',    d:'Qualified educators with early childhood expertise and nurturing hearts'},
              {e:'📐',t:'Structured Play',     d:'Perfect balance of academics, creativity, and joyful hands-on activities'},
              {e:'🌍',t:'Bilingual Approach',  d:'English & Nepali instruction prepares children for a global world'},
              {e:'💛',t:'Individual Attention', d:'Small class sizes ensure every child receives personal care and focus'},
              {e:'🎨',t:'Creative Curriculum', d:'Arts, music, and sports are woven into every day of learning'},
              {e:'🤝',t:'Parent Partnership',  d:'Regular updates, open-door policy, and strong family communication'},
            ].map((w,i) => (
              <div key={i} className="cl-why-card sr" style={{ '--delay':`${i*.07}s` }}>
                <div className="cl-why-emoji">{w.e}</div>
                <h4>{w.t}</h4>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <div className="cl-cta sr">
        <div className="cl-cta-b c1"/><div className="cl-cta-b c2"/>
        <div className="cl-container cl-cta-in">
          <div>
            <h2>Ready to Begin the Journey? 🎒</h2>
            <p>Admissions are open year-round. Come visit and feel the magic for yourself.</p>
          </div>
          <div className="cl-cta-btns">
            <Link to="/admission" className="cl-btn-w">Apply Now →</Link>
            <Link to="/contact"   className="cl-btn-g">Book a Free Visit</Link>
          </div>
        </div>
      </div>

    </div>
  );
}