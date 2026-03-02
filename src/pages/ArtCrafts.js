import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/ArtCrafts.css';
import SEO from '../components/SEO';
import creativeImg from '../assets/img/25.jpg';
import colorImg from '../assets/img/27.jpg';
import imaginationImg from '../assets/img/30.jpg';
import handsonImg from '../assets/img/32.jpg';
import littlecampsImg from '../assets/img/33.jpg';

  
function useSR() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io  = new IntersectionObserver(
      (e) => e.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('sr-on');
          io.unobserve(en.target);
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const ACTIVITIES = [
  {
    title: 'Creative Freedom',
    image: creativeImg,
    color: '#e8f5ff',
    accent: '#1a6fa3',
    icon: '🎨',
    desc: 'Unlimited self-expression through drawing, painting, and mixed-media exploration that builds identity and imagination.',
  },
  {
    title: 'Color Confidence',
    image: colorImg,
    color: '#dff2ff',
    accent: '#2bb0ed',
    icon: '🖌️',
    desc: 'Learning color theory through hands-on painting and playful color-mixing experiments that develop aesthetic sense.',
  },
  {
    title: 'Imagination Boost',
    image: imaginationImg,
    color: '#e4f3ff',
    accent: '#0d5490',
    icon: '✨',
    desc: 'Children craft imaginative worlds using clay, fabric, and found materials that spark lateral thinking.',
  },
  {
    title: 'Hands-on Learning',
    image: handsonImg,
    color: '#e8f5ff',
    accent: '#1a6fa3',
    icon: '🖐️',
    desc: 'Tactile activities — cutting, folding, pasting, sculpting — that build fine motor skills and spatial awareness.',
  },
  {
    title: 'Proud Little Artists',
    image: littlecampsImg,
    color: '#dff2ff',
    accent: '#2bb0ed',
    icon: '⭐',
    desc: 'Gallery exhibitions where children present their artwork to family with pride, confidence, and genuine joy.',
  },
];

const BENEFITS = [
  ['🧠', 'Fine Motor Skills',     'Cutting, pasting, and painting strengthen hand muscles and precise coordination critical for writing.'],
  ['💡', 'Creative Thinking',     'Open-ended art builds problem-solving capacity and innovative thought that extends into every subject.'],
  ['😊', 'Emotional Expression',  'Art gives children a safe, joyful language to process and communicate their inner feelings.'],
  ['🤝', 'Social Confidence',     'Sharing and displaying artwork with peers builds communication, pride, and a sense of accomplishment.'],
];

const BRUSH_COLORS = ['#2bb0ed', '#5fc8f4', '#7dd4f7', '#1a6fa3', '#0d5490', '#a8daff'];

export default function ArtCrafts() {
  useSR();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="ac-page">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <header className="ac-hero">
        <div className="ac-orb ac-o1" />
        <div className="ac-orb ac-o2" />
        <div className="ac-orb ac-o3" />

        <div className="ac-dots" aria-hidden="true">
          {BRUSH_COLORS.map((c, i) => (
            <span key={i} className="ac-dot-ring"
              style={{
                borderColor: c,
                left: `${8 + i * 15}%`,
                top: `${15 + Math.sin(i * 1.2) * 40}%`,
                animationDelay: `${i * 0.5}s`
              }} />
          ))}
        </div>

        <div className="ac-tools" aria-hidden="true">
          {['🖌️','✏️','🎨','✂️','📐','🖍️'].map((t, i) => (
            <span key={i} className="ac-tool"
              style={{ left: `${4 + i * 16}%`, animationDelay: `${i * 0.38}s` }}>
              {t}
            </span>
          ))}
        </div>

        <div className="ac-hero-inner">
          <span className="ac-pill"><span className="ac-live" />Creative Arts Program</span>
          <h1>Art &amp; <em>Craft</em> 🎨</h1>
          <p>A hands-on space for colors, textures, and boundless creativity. Children turn their inner ideas into vibrant physical creations that build confidence and fine motor skills.</p>
          <div className="ac-hero-btns">
            <Link to="/admission" className="ac-btn-solid">Enroll Today →</Link>
            <Link to="/gallery" className="ac-btn-ghost">View Gallery 🖼️</Link>
          </div>
          <nav className="ac-crumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/activities">Activities</Link><span>›</span>
            <span>Art &amp; Craft</span>
          </nav>
        </div>

        <div className="ac-color-strip" aria-hidden="true">
          {BRUSH_COLORS.map((c) => (
            <div key={c} className="ac-strip-swatch" style={{ background: c }} />
          ))}
        </div>

        <div className="ac-hero-wave">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0Z" fill="white" />
          </svg>
        </div>
      </header>

      {/* ══ ACTIVITY CARDS ════════════════════════════════════ */}
      <section className="ac-activities">
        <div className="ac-wrap">
          <div className="ac-sec-head sr">
            <span className="ac-tag">What We Create</span>
            <h2>Our Art Activities</h2>
            <p>Every session is a new adventure — different materials, different techniques, always creative and always joyful.</p>
          </div>

          <div className="ac-grid">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="ac-card sr"
                style={{ '--delay': `${i * 0.08}s`, '--acc': act.accent, '--cbg': act.color }}>
                <div className="ac-card-img">
                  <img src={act.image} alt={act.title} />
                  <div className="ac-card-veil" />
                  <span className="ac-card-icon">{act.icon}</span>
                  <div className="ac-drip" style={{ background: act.accent }} />
                </div>
                <div className="ac-card-body">
                  <h3>{act.title}</h3>
                  <p>{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ══════════════════════════════════════════ */}
      <section className="ac-benefits">
        <div className="ac-wrap">
          <div className="ac-sec-head sr">
            <span className="ac-tag">Why Art Matters</span>
            <h2>How Art Shapes Young Minds 🧠</h2>
          </div>
          <div className="ac-ben-grid">
            {BENEFITS.map(([icon, title, desc], i) => (
              <div key={i} className="ac-ben-card sr" style={{ '--delay': `${i * 0.09}s` }}>
                <div className="ac-ben-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <div className="ac-cta">
        <div className="ac-cta-b1" /><div className="ac-cta-b2" />
        <div className="ac-wrap ac-cta-inner sr">
          <div className="ac-cta-quote">
            <div className="ac-qm">"</div>
            <p>Every brushstroke builds a brighter mind.</p>
            <em>Creativity today. Confidence forever. ✨</em>
          </div>
          <div className="ac-cta-btns">
            <Link to="/admission" className="ac-btn-enroll">Enroll Today →</Link>
            <Link to="/gallery" className="ac-btn-gallery">View Gallery 🖼️</Link>
          </div>
        </div>
      </div>

    </div>
  );
}