import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Trip.css';
import SEO from '../components/SEO';
import f1 from '../assets/img/f1.jpg';
import f2 from '../assets/img/f2.jpg';
import f3 from '../assets/img/f3.jpg';
import f4 from '../assets/img/f4.jpg';
import f5 from '../assets/img/f5.jpg';
import f6 from '../assets/img/f6.jpg';
import f7 from '../assets/img/f7.jpg';
import f8 from '../assets/img/34.jpg';
import f9 from '../assets/img/f9.jpg';
import placeholder from '../assets/img/placeholder.jpg';


function useSR(key) {
  useEffect(() => {
    const id = setTimeout(() => {
      const els = document.querySelectorAll('.sr:not(.sr-on)');
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('sr-on'); io.unobserve(en.target); }
        }),
        { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, 80);
    return () => clearTimeout(id);
  }, [key]);
}

function Counter({ end, suffix = '', label, icon }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let cur = 0;
        const step = Math.ceil(end / 50);
        const t = setInterval(() => {
          cur = Math.min(cur + step, end);
          setN(cur);
          if (cur >= end) clearInterval(t);
        }, 28);
      }
    }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);
  return (
    <div className="tp-stat" ref={ref}>
      <span className="tp-stat-icon">{icon}</span>
      <strong>{n}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

const TRIPS = [
  { image: f1, caption: 'Trip to Mountain',   icon: '🏔️', tag: 'Nature',     desc: 'Breathtaking mountain views, fresh air, and the joy of reaching new heights together as a class.' },
  { image: f2, caption: 'Picnic at Lake',     icon: '🏞️', tag: 'Relaxation', desc: 'A perfect day of games, laughter, and exploring the tranquil lakeside with classmates and teachers.' },
  { image: f3, caption: 'Forest Exploration', icon: '🌲', tag: 'Discovery',  desc: 'Discovering the wonders of the forest — plants, insects, birds, and hidden trails all around.' },
  { image: f4, caption: 'Beach Fun',          icon: '🏖️', tag: 'Adventure',  desc: 'Sand castles, wave chasing, and unforgettable seaside memories with friends and teachers.' },
  { image: f5, caption: 'River Adventure',    icon: '🚣', tag: 'Thrill',     desc: 'Navigating the river and learning respect for nature through hands-on exploration together.' },
  { image: f6, caption: 'Nature Walk',        icon: '🌿', tag: 'Learning',   desc: 'Guided nature walks that teach children about ecosystems and environmental care.' },
  { image: f7, caption: 'Camping Night',      icon: '⛺', tag: 'Overnight',  desc: 'Stars, campfires, storytelling, and the magic of sleeping under the open sky.' },
  { image: f8, caption: 'Adventure Park',     icon: '🎡', tag: 'Fun',        desc: 'Swings, slides, and challenges that push limits and build fearless confidence.' },
  { image: f9, caption: 'Waterfall Hike',     icon: '💧', tag: 'Explore',    desc: 'Trekking through lush trails to discover majestic waterfalls and natural pools.' },
];

const PINS = [
  { x: 80,  y: 75  }, { x: 200, y: 190 }, { x: 155, y: 345 },
  { x: 330, y: 420 }, { x: 470, y: 295 }, { x: 555, y: 155 },
  { x: 675, y: 270 }, { x: 760, y: 130 }, { x: 840, y: 375 },
];

const ROUTE = `M 80,75 C 110,110 160,160 200,190 C 175,265 140,305 155,345 C 215,385 280,415 330,420 C 385,405 435,340 470,295 C 505,240 535,195 555,155 C 595,195 635,245 675,270 C 705,195 735,155 760,130 C 790,235 820,315 840,375`;

function RouteMap({ onDone }) {
  const pathRef  = useRef(null);
  const rafRef   = useRef(null);
  const startRef = useRef(null);
  const [pathLen,  setPathLen]  = useState(2200);
  const [progress, setProgress] = useState(0);
  const [visPin,   setVisPin]   = useState([]);
  const DURATION = 5000;

  useEffect(() => {
    if (pathRef.current) {
      try { setPathLen(pathRef.current.getTotalLength()); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      const n = PINS.length;
      const nv = [];
      for (let i = 0; i < n; i++) {
        if (elapsed > ((i + 0.8) / n) * DURATION) nv.push(i);
      }
      setVisPin(nv);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setTimeout(onDone, 900);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onDone]);

  const offset = pathLen * (1 - progress);

  return (
    <div className="tp-map-wrap">
      <div className="tp-map-header">
        <span className="tp-map-bus">🚌</span>
        <span className="tp-map-title">Mapping our adventures…</span>
        <span className="tp-map-count">{visPin.length} / {PINS.length} destinations</span>
      </div>

      <div className="tp-map-board">
        <div className="tp-map-gridlines" />

        <svg className="tp-terrain-svg" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
          <ellipse cx="140" cy="200" rx="110" ry="90" fill="rgba(43,176,237,0.07)" />
          <ellipse cx="480" cy="380" rx="130" ry="75" fill="rgba(43,176,237,0.06)" />
          <ellipse cx="720" cy="210" rx="100" ry="80" fill="rgba(43,176,237,0.07)" />
          <ellipse cx="340" cy="100" rx="85"  ry="60" fill="rgba(43,176,237,0.05)" />
          <ellipse cx="840" cy="300" rx="80"  ry="65" fill="rgba(43,176,237,0.05)" />
        </svg>

        <svg className="tp-route-svg" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="tp-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1a6fa3" floodOpacity="0.25" />
            </filter>
            <filter id="tp-pin-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#2bb0ed" floodOpacity="0.5" />
            </filter>
          </defs>

          <path d={ROUTE} fill="none" stroke="#2bb0ed" strokeWidth="14"
            strokeLinecap="round" strokeLinejoin="round"
            opacity="0.1" strokeDasharray={pathLen} strokeDashoffset={offset} />
          <path ref={pathRef} d={ROUTE} fill="none" stroke="#2bb0ed" strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={pathLen} strokeDashoffset={offset} />
          <path d={ROUTE} fill="none" stroke="white" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray="6 20"
            strokeDashoffset={offset + 12} opacity="0.7" />

          {progress > 0.02 && progress < 1 && (
            <circle r="8" fill="#1a6fa3" filter="url(#tp-shadow)">
              <animateMotion path={ROUTE} dur={`${DURATION / 1000}s`} begin="0s" fill="freeze"
                keyPoints={`0;${progress}`} keyTimes="0;1" calcMode="linear" />
            </circle>
          )}

          {PINS.map((pin, i) => {
            const trip   = TRIPS[i];
            const show   = visPin.includes(i);
            const isLast = i === visPin.length - 1 && show;
            return (
              <g key={i} className={`tp-pin ${show ? 'tp-pin-in' : ''}`} style={{ '--pi': i }}>
                <ellipse cx={pin.x} cy={pin.y + 28} rx="9" ry="3.5"
                  fill="rgba(0,0,0,0.18)" opacity={show ? 1 : 0} />
                <circle cx={pin.x} cy={pin.y} r="20"
                  fill={isLast ? '#0c3347' : '#1a6fa3'} stroke="white" strokeWidth="2.5"
                  filter={isLast ? 'url(#tp-pin-glow)' : undefined} opacity={show ? 1 : 0} />
                <circle cx={pin.x} cy={pin.y} r="15"
                  fill={isLast ? '#2bb0ed' : '#3ab8ef'} opacity={show ? 1 : 0} />
                <polygon points={`${pin.x-8},${pin.y+16} ${pin.x+8},${pin.y+16} ${pin.x},${pin.y+28}`}
                  fill={isLast ? '#0c3347' : '#1a6fa3'} opacity={show ? 1 : 0} />
                {show && (
                  <text x={pin.x} y={pin.y + 7} textAnchor="middle" fontSize="15"
                    style={{ userSelect:'none', pointerEvents:'none' }}>{trip.icon}</text>
                )}
                {isLast && (
                  <g>
                    <rect x={pin.x + 26} y={pin.y - 18}
                      width={Math.max(trip.caption.length * 7.2 + 18, 80)} height="28"
                      rx="7" fill="white" filter="url(#tp-shadow)" />
                    <text x={pin.x + 35} y={pin.y + 1} fontSize="11.5" fontWeight="700" fill="#1a3d52"
                      style={{ userSelect:'none', pointerEvents:'none' }}>{trip.caption}</text>
                  </g>
                )}
                {isLast && (
                  <circle cx={pin.x} cy={pin.y} r="20" fill="none"
                    stroke="#2bb0ed" strokeWidth="2" opacity="0.6" className="tp-pin-ripple" />
                )}
              </g>
            );
          })}
        </svg>

        <div className="tp-map-legend">
          {PINS.map((_, i) => (
            <div key={i} className={`tp-leg-item ${visPin.includes(i) ? 'tp-leg-on' : ''}`} style={{ '--pi': i }}>
              <span>{TRIPS[i].icon}</span>
              <span>{TRIPS[i].caption}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tp-map-bar">
        <div className="tp-map-bar-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <button className="tp-skip" onClick={onDone}>Explore All Trips ↓</button>
    </div>
  );
}

const WHY = [
  ['🧠', 'Real-World Learning',   'Children grasp concepts faster when they experience them directly in the real world.'],
  ['🤝', 'Teamwork & Bonding',    'Shared adventures build lasting friendships and deep cooperation skills.'],
  ['💪', 'Confidence Building',   'Navigating new environments grows courage and independent thinking in every child.'],
  ['🌿', 'Environmental Respect', 'Being in nature teaches children to care for and cherish our beautiful planet.'],
];

export default function Trip() {
  const [phase, setPhase] = useState('map');
  const handleDone = React.useCallback(() => setPhase('grid'), []);

  useSR(phase); // KEY FIX: phase as key so observer re-runs when grid mounts

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="tp-page">
      <header className="tp-hero">
        <div className="tp-cloud tp-cl1" /><div className="tp-cloud tp-cl2" />
        <div className="tp-cloud tp-cl3" /><div className="tp-cloud tp-cl4" />
        <div className="tp-birds" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="tp-bird"
              style={{ top:`${12+i*9}%`, animationDelay:`${i*1.4}s`, animationDuration:`${10+i*2}s` }}>🐦</span>
          ))}
        </div>
        <div className="tp-hero-inner">
          <span className="tp-pill"><span className="tp-live" />Outdoor Adventure Program</span>
          <h1>Outdoor <em>Adventures</em> 🚌</h1>
          <p>Educational trips that bring learning to life — where every journey becomes a cherished memory and a lesson that lasts a lifetime.</p>
          <div className="tp-hero-btns">
            <Link to="/admission" className="tp-btn-solid">Join the Fun →</Link>
            <Link to="/contact"   className="tp-btn-ghost">Plan a Trip</Link>
          </div>
          <nav className="tp-crumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/activities">Activities</Link><span>›</span>
            <span>Outdoor Adventures</span>
          </nav>
        </div>
        <div className="tp-mountains" aria-hidden="true">
          <svg viewBox="0 0 1440 130" preserveAspectRatio="none">
            <path d="M0,130 L0,85 L140,22 L270,72 L410,8 L560,58 L710,2 L860,52 L1000,18 L1140,55 L1290,12 L1440,48 L1440,130Z" fill="rgba(255,255,255,0.07)" />
            <path d="M0,130 L0,95 L190,44 L380,88 L560,32 L740,74 L920,26 L1100,66 L1280,36 L1440,62 L1440,130Z" fill="rgba(255,255,255,0.055)" />
            <path d="M0,130 L0,108 L240,68 L480,102 L720,58 L960,92 L1200,55 L1440,80 L1440,130Z" fill="rgba(255,255,255,0.04)" />
          </svg>
        </div>
        <div className="tp-hero-wave">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0Z" fill="white" />
          </svg>
        </div>
      </header>

      <div className="tp-stats sr">
        <Counter end={9}   suffix="+"  label="Destinations"      icon="📍" />
        <Counter end={50}  suffix="+"  label="Trips Per Year"    icon="🚌" />
        <Counter end={100} suffix="%"  label="Safe & Supervised" icon="🛡️" />
        <Counter end={10}  suffix="+"  label="Years Exploring"   icon="🌟" />
      </div>

      {phase === 'map' && <RouteMap onDone={handleDone} />}

      {phase === 'grid' && (
        <section className="tp-grid-sec">
          <div className="tp-wrap">
            <div className="tp-sec-head sr">
              <span className="tp-tag">Our Destinations</span>
              <h2>Where We've Explored 🗺️</h2>
              <p>Every trip is carefully planned to maximise learning, safety, and unforgettable fun for all children.</p>
            </div>
            <div className="tp-grid">
              {TRIPS.map((trip, i) => (
                <div key={i} className="tp-card sr" style={{ '--delay': `${i * 0.07}s` }}>
                  <div className="tp-card-img">
                    <img src={trip.image} alt={trip.caption}
                      onError={(e) => { e.target.src = placeholder; }} />
                    <div className="tp-card-veil" />
                    <span className="tp-card-icon">{trip.icon}</span>
                    <span className="tp-card-tag">{trip.tag}</span>
                  </div>
                  <div className="tp-card-body">
                    <h3>{trip.caption}</h3>
                    <p>{trip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {phase === 'grid' && (
        <section className="tp-why">
          <div className="tp-wrap">
            <div className="tp-sec-head sr">
              <span className="tp-tag">Why We Go Outside</span>
              <h2>Learning Beyond the Classroom 🌍</h2>
            </div>
            <div className="tp-why-grid">
              {WHY.map(([icon, title, desc], i) => (
                <div key={i} className="tp-why-card sr" style={{ '--delay': `${i * 0.09}s` }}>
                  <div className="tp-why-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {phase === 'grid' && (
        <div className="tp-cta">
          <div className="tp-cta-b1" /><div className="tp-cta-b2" />
          <div className="tp-wrap tp-cta-inner sr">
            <div>
              <h2>Ready for the Next Adventure? 🚌</h2>
              <p>Enroll your child and let them explore the world with us — safely, joyfully, and curiously.</p>
            </div>
            <div className="tp-cta-btns">
              <Link to="/admission" className="tp-btn-white">Enroll Now →</Link>
              <Link to="/contact"   className="tp-btn-ghost-dark">Contact Us</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}