import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Sports.css';
import SEO from '../components/SEO';
import sp1 from '../assets/img/sp1.jpg';
import sp2 from '../assets/img/sp2.jpg';
import sp3 from '../assets/img/sp3.jpg';
import sp4 from '../assets/img/sp4.jpg';
import sp5 from '../assets/img/sp5.jpg';
import sp6 from '../assets/img/sp6.jpg';
import sp7 from '../assets/img/sp7.jpg';
import sp from '../assets/img/sp.jpg';


function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io = new IntersectionObserver(
      (e) => e.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('sr-on'); io.unobserve(entry.target); } }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function spawnGlitter(count = 200) {
  const colors = ['#fff','#ffd700','#7ce8ff','#a8ff78','#ff9a9e'];
  for (let i = 0; i < count; i++) {
    const g = document.createElement('div');
    g.className = 'sp-glitter';
    g.style.left = Math.random() * window.innerWidth + 'px';
    g.style.top  = Math.random() * window.innerHeight * .6 + 'px';
    g.style.setProperty('--gx', (Math.random() - 0.5) * 700 + 'px');
    g.style.setProperty('--gy', (Math.random() * 600 + 100) + 'px');
    const sz = Math.random() * 7 + 3;
    g.style.width = sz + 'px';
    g.style.height = sz + 'px';
    g.style.background = colors[Math.floor(Math.random()*colors.length)];
    g.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
    document.body.appendChild(g);
    g.addEventListener('animationend', () => g.remove());
  }
}

const SPORTS = [
  { title:'Football',     image:sp3, e:'⚽', color:'#198754', bg:'#edfff4', desc:'Dribbling, passing, and teamwork on the field.' },
  { title:'Basketball',   image:sp1, e:'🏀', color:'#e67e00', bg:'#fff8ee', desc:'Shooting hoops and building coordination skills.' },
  { title:'Volleyball',   image:sp2, e:'🏐', color:'#3730a3', bg:'#eef0ff', desc:'Net play, serving, and team communication.' },
  { title:'Cricket',      image:sp4, e:'🏏', color:'#b45309', bg:'#fffbeb', desc:'Batting, bowling, and understanding strategy.' },
  { title:'Tennis',       image:sp5, e:'🎾', color:'#e91e8c', bg:'#fff0f7', desc:'Racquet skills, hand-eye coordination.' },
  { title:'Table Tennis', image:sp6, e:'🏓', color:'#0e7490', bg:'#e6fafa', desc:'Reflexes, precision, and quick decision-making.' },
  { title:'Handball',     image:sp7, e:'🤾', color:'#7e22ce', bg:'#f8f0ff', desc:'Fast-paced ball control and spatial awareness.' },
  { title:'Martial Arts', image:sp,  e:'🥋', color:'#b91c1c', bg:'#fff1f1', desc:'Discipline, focus, self-defence, and respect.' },
];


const VALUES = [
  {e:'🏆',t:'Team Spirit',     d:'Sports teach cooperation, trust, and collective achievement'},
  {e:'💪',t:'Physical Fitness', d:'Daily activity builds strong bodies and healthy habits for life'},
  {e:'🧘',t:'Mental Discipline',d:'Every sport demands focus, patience, and self-control'},
  {e:'🌟',t:'Fair Play',        d:'Children learn sportsmanship, respect, and resilience'},
];

export default function Sports() {
  useScrollReveal();

  useEffect(() => {
    spawnGlitter(300);
    let iv = setInterval(() => spawnGlitter(8), 60);
    setTimeout(() => clearInterval(iv), 1200);
    window.scrollTo(0, 0);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="sports-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <header className="sp-hero">
        <div className="sp-hero-blob shb1"/><div className="sp-hero-blob shb2"/>
        {/* Field lines decoration */}
        <div className="sp-field-lines" aria-hidden="true">
          <div className="sp-line sl1"/><div className="sp-line sl2"/><div className="sp-line sl3"/>
          <div className="sp-circle sc1"/><div className="sp-circle sc2"/>
        </div>
        <div className="sp-hero-inner">
          <span className="sp-pill" onClick={() => spawnGlitter(250)}>
            <span className="sp-dot"/>Click for celebration! 🎉
          </span>
          <h1>Sports &amp; <em>Games</em> 🏆</h1>
          <p>Active, energetic, and fun — our sports program builds champions in character, teamwork, and health.</p>
          <nav className="sp-crumb"><Link to="/">Home</Link><span>›</span><Link to="/">Activities</Link><span>›</span><span>Sports</span></nav>
          <button className="sp-celebrate-btn" onClick={() => spawnGlitter(300)}>🎉 Celebrate!</button>
        </div>

        {/* Scrolling sports emoji ticker */}
        <div className="sp-ticker" aria-hidden="true">
          <div className="sp-ticker-track">
            {[...SPORTS,...SPORTS,...SPORTS].map((s,i) => (
              <span key={i} className="sp-ticker-chip">{s.e} {s.title}</span>
            ))}
          </div>
        </div>

        <div className="sp-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0Z" fill="white"/>
          </svg>
        </div>
      </header>

      {/* ══ STAT BAR ══════════════════════════════════════════ */}
      <div className="sp-statbar sr">
        {[
          {n:'8',  l:'Sports Offered',    e:'🏅'},
          {n:'5×', l:'Sessions/Week',     e:'📅'},
          {n:'2',  l:'Sports Events/Year',e:'🏆'},
          {n:'100%',l:'Outdoor Activity',  e:'☀️'},
        ].map((s,i) => (
          <div key={i} className="sp-stat sr" style={{ '--delay':`${i*.1}s` }}>
            <span className="sp-stat-e">{s.e}</span>
            <span className="sp-stat-n">{s.n}</span>
            <span className="sp-stat-l">{s.l}</span>
          </div>
        ))}
      </div>

      {/* ══ SPORTS GRID ═══════════════════════════════════════ */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head sr">
            <span className="sp-tag">Our Activities</span>
            <h2>Sports We Play 🏅</h2>
            <p>Eight exciting sports that build strength, skill, teamwork, and a love of active life.</p>
          </div>
          <div className="sp-grid">
            {SPORTS.map((sport, i) => (
              <div key={i} className="sp-card sr" style={{ '--delay':`${i*.06}s` }}>
                <div className="sp-card-img" style={{ '--sacc': sport.color }}>
                  <img src={sport.image} alt={sport.title}
                    onError={(e) => { e.target.src='/img/placeholder.jpg'; }} />
                  <div className="sp-card-veil" style={{ background:`${sport.color}44` }} />
                  <div className="sp-card-emoji">{sport.e}</div>
                </div>
                <div className="sp-card-body" style={{ background: sport.bg }}>
                  <div className="sp-card-accent" style={{ background: sport.color }} />
                  <h3 style={{ color: sport.color }}>{sport.title}</h3>
                  <p>{sport.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUES STRIP ══════════════════════════════════════ */}
      <section className="sp-values sr">
        <div className="sp-container">
          <div className="sp-sec-head sr">
            <span className="sp-tag">Our Philosophy</span>
            <h2>More Than Just Playing 🌟</h2>
          </div>
          <div className="sp-values-grid">
            {VALUES.map((v,i) => (
              <div key={i} className="sp-value-card sr" style={{ '--delay':`${i*.1}s` }}>
                <div className="sp-vc-emoji">{v.e}</div>
                <h4>{v.t}</h4>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <div className="sp-cta sr">
        <div className="sp-cta-b c1"/><div className="sp-cta-b c2"/>
        <div className="sp-container sp-cta-in">
          <div>
            <h2>Build a Champion Today! 🏆</h2>
            <p>Every great athlete starts with curiosity, courage, and a great school.</p>
          </div>
          <div className="sp-cta-btns">
            <Link to="/admission" className="sp-btn-w">Enroll Now →</Link>
            <button className="sp-btn-cel" onClick={() => spawnGlitter(300)}>🎉 Celebrate!</button>
          </div>
        </div>
      </div>

    </div>
  );
}