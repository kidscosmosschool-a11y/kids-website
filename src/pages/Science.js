import React, { useState, useEffect, useRef } from 'react';
import '../css/pages/Science.css';
import SEO from '../components/SEO';
// Import school images
import s1 from '../assets/img/s1.jpg';
import s2 from '../assets/img/s2.jpg';
import s3 from '../assets/img/s3.jpg';
import s4 from '../assets/img/s4.jpg';
import s5 from '../assets/img/s5.jpg';
import s6 from '../assets/img/s6.jpg';
import s7 from '../assets/img/s7.jpg';
import s8 from '../assets/img/s8.jpg';
import s9 from '../assets/img/s9.jpg';
import s10 from '../assets/img/10.jpg';
import s11 from '../assets/img/s11.jpg';

// ─── Floating Gadgets Background ─────────────────────────────────────────────
function FloatingGadgets() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const gadgets = ['🔬', '🧪', '🧬', '⚗️', '🌡️', '🧲', '💡', '🛰️', '🔭', '🧫', '⚡', '🌋'];

    const created = [];
    for (let i = 0; i < 60; i++) {
      const g = document.createElement('div');
      g.className = 'gadget';
      g.style.left = Math.random() * 100 + 'vw';
      g.style.bottom = '-60px';
      g.style.animationDuration = 8 + Math.random() * 14 + 's';
      g.style.animationDelay = Math.random() * 10 + 's';
      g.style.fontSize = 10 + Math.random() * 14 + 'px';
      g.style.opacity = 0.25 + Math.random() * 0.45;
      g.innerText = gadgets[Math.floor(Math.random() * gadgets.length)];
      container.appendChild(g);
      created.push(g);
    }
    return () => created.forEach((g) => g.remove());
  }, []);

  return <div className="floating-science" ref={containerRef} />;
}

// ─── Door Card ────────────────────────────────────────────────────────────────
function DoorCard({ image, caption, idx }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`door-card reveal`}
      style={{ animationDelay: `${idx * 0.07}s` }}
    >
      <div
        className={`door ${open ? 'open' : ''} ${hovered && !open ? 'peek' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Door panels */}
        <div className="door-left">
          <span className="door-icon">🔬</span>
        </div>
        <div className="door-right">
          <span className="door-icon">🧪</span>
        </div>

        {/* Hinge decorations */}
        <div className="hinge hinge-top-left" />
        <div className="hinge hinge-bottom-left" />
        <div className="hinge hinge-top-right" />
        <div className="hinge hinge-bottom-right" />

        {/* Door handle */}
        <div className={`door-handle door-handle-left ${open ? 'handle-hidden' : ''}`} />
        <div className={`door-handle door-handle-right ${open ? 'handle-hidden' : ''}`} />

        {/* Inside content */}
        <div className="inside">
          <img
            src={image}
            alt={caption}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="img-fallback">🔬</div>
          <p className="caption">{caption}</p>
          <div className="click-hint">{open ? 'Click to close' : ''}</div>
        </div>

        {/* Closed state overlay text */}
        {!open && (
          <div className="closed-hint">
            <span>Click to open!</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Counter Animation ────────────────────────────────────────────────────────
function StatCounter({ value, label, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .door-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Main Science Page ────────────────────────────────────────────────────────
function Science() {
  useScrollReveal();
  const experiments = [
    { image: s1,  caption: 'Experiment 1' },
    { image: s2,  caption: 'Experiment 2' },
    { image: s3,  caption: 'Experiment 3' },
    { image: s4,  caption: 'Experiment 4' },
    { image: s5,  caption: 'Experiment 5' },
    { image: s6,  caption: 'Experiment 6' },
    { image: s7,  caption: 'Experiment 7' },
    { image: s8,  caption: 'Experiment 8' },
    { image: s9,  caption: 'Experiment 9' },
    { image: s10, caption: 'Experiment 10' },
    { image: s11, caption: 'Experiment 11' },
  ];

  const stats = [
    { value: 20,  label: 'Experiments',    icon: '🧪' },
    { value: 150, label: 'Happy Students',  icon: '👦' },
    { value: 12,  label: 'Science Kits',    icon: '🔬' },
    { value: 5,   label: 'Annual Events',   icon: '🏆' },
  ];

  return (
    <div className="science-page">

      {/* ── Hero / Header ── */}
      <div className="science-hero">
        <FloatingGadgets />
        <div className="science-hero-content">
          <div className="hero-badge animated slideInDown">Science Lab</div>
          <h1 className="animated slideInDown delay-1">🔬 Fun Science</h1>
          <p className="animated slideInUp delay-2">
            Explore, experiment, and enjoy scientific wonders!
          </p>
          <div className="hero-bubbles">
            {['🧪', '⚗️', '🔭', '🧬', '💡', '🌋'].map((e, i) => (
              <span key={i} className="bubble-emoji" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="stats-bar reveal">
        {stats.map((s, i) => (
          <StatCounter key={i} {...s} />
        ))}
      </div>

      {/* ── Instruction Banner ── */}
      <div className="instruction-banner reveal">
        <span className="instruction-icon">👆</span>
        <p>Click on any door to reveal an exciting science experiment!</p>
      </div>

      {/* ── Door Cards Section ── */}
      <div className="fun-science-section">
        <div className="card-grid">
          {experiments.map((exp, idx) => (
            <DoorCard key={idx} image={exp.image} caption={exp.caption} idx={idx} />
          ))}
        </div>
      </div>

      {/* ── Fun Facts Strip ── */}
      <div className="facts-strip">
        <div className="facts-track">
          {[
            '🔬 Science is everywhere!',
            '💧 Water has memory',
            '🌍 Earth is 4.5 billion years old',
            '⚡ Lightning is hotter than the sun',
            '🧬 DNA uncoiled = 6 feet long',
            '🌙 Moon moves 3.8cm away each year',
            '🦋 Butterflies taste with their feet',
            '🔬 Science is everywhere!',
            '💧 Water has memory',
            '🌍 Earth is 4.5 billion years old',
          ].map((fact, i) => (
            <span key={i} className="fact-item">
              {fact}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Science;