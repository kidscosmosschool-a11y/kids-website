import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/About.css';
import SEO from '../components/SEO';
import img12        from '../assets/img/12.jpg';
import principalImg from '../assets/img/user.jpeg';

import gallery1 from '../assets/img/1.jpg';
import gallery2 from '../assets/img/32.jpg';
import gallery3 from '../assets/img/3.jpg';
import gallery4 from '../assets/img/4.jpg';
import gallery5 from '../assets/img/11.jpg';
import gallery6 from '../assets/img/21.jpg';


/* ─── Scroll Reveal ───────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io  = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('sr-visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.09, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Page Header ──────────────────────────────────────────── */
function PageHeader() {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${img12})` }}>
      <div className="header-overlay">
        <div className="header-content">
          <span className="carousel-badge">Kids Cosmos School</span>
          <h1 className="animated slideInDown">About Us</h1>
          <nav className="breadcrumb-nav animated slideInUp delay-2" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <span className="breadcrumb-current">About Us</span>
          </nav>
        </div>
      </div>

      {/* Scroll-down hint */}
      <div className="header-scroll-hint" aria-hidden="true">
        <span className="scroll-dot" />
        <span className="scroll-text">Scroll Down</span>
      </div>
    </div>
  );
}

/* ─── Principal Section ────────────────────────────────────── */
function PrincipalSection() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="principals-section">
      <div className="container">
        <div className="principal-grid">

          {/* Text */}
          <div className="principal-text sr sr-left">
            <span className="section-tag">Message from the Principal</span>
            <h2>A Message from Our Principal 👩‍🏫</h2>

            <p>
              As a mother of two and a medical student, I understand deeply how important the early
              years of education are. The foundation built in preschool shapes <strong>confident,
              expressive, and emotionally secure</strong> children.
            </p>
            <p>
              At <strong>Kids' Cosmos</strong>, we believe every child deserves to be seen, heard,
              and encouraged. Each child is unique, with their own strengths and pace of growth.
              When given a fair chance, they bloom naturally.
            </p>
            <p>
              Play is the language of children. Through meaningful play, children explore,
              communicate, and learn joyfully. <strong>Learning should never feel like a burden.</strong>
            </p>
            <p>
              Our goal is to create a warm, safe, and empowering preschool where children grow
              holistically and confidently — ready for the world ahead.
            </p>

            <div className="principal-signature">
              <div className="signature-line" />
              <div className="signature-info">
                <strong>Shila Oli</strong>
                <span>Principal, Kids Cosmos School</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="principal-image-wrap sr sr-right">
            <div className={`principal-img-container ${imgLoaded ? 'img-loaded' : ''}`}>
              <img
                src={principalImg}
                alt="Principal Shila Oli"
                className="principal-circle-img"
                onLoad={() => setImgLoaded(true)}
              />
              {/* Decorative rings */}
              <div className="p-ring ring-1" />
              <div className="p-ring ring-2" />
              <div className="p-ring ring-3" />
              {/* Badge */}
              <div className="principal-badge">
                <span>👩‍🏫</span>
                <div>
                  <strong>Principal</strong>
                  <small>Since 2015</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Philosophy Section ───────────────────────────────────── */
function PhilosophySection() {
  const philosophies = [
    { icon:'🎨', title:'Learning Through Play',       desc:'Play-based learning helps children explore concepts naturally while enjoying the learning process.', bg:'#b3e5fc', accent:'#0288d1' },
    { icon:'🤝', title:'Emotional & Social Growth',   desc:'We nurture empathy, cooperation, communication, and emotional intelligence in everyday activities.',  bg:'#81d4fa', accent:'#0277bd' },
    { icon:'🌈', title:'Creativity & Curiosity',      desc:'Children are encouraged to ask questions, imagine freely, and express their ideas creatively.',       bg:'#4fc3f7', accent:'#0288d1' },
    { icon:'🧒', title:'Individual Attention',        desc:'Every child is unique. We respect individual learning styles, pace, and personal strengths.',         bg:'#e1f5fe', accent:'#039be5' },
    { icon:'🏡', title:'Safe & Caring Environment',   desc:'A warm, secure, and loving environment helps children feel confident and ready to learn.',            bg:'#b2ebf2', accent:'#0097a7' },
    { icon:'🌱', title:'Holistic Development',        desc:'We focus on intellectual, emotional, physical, and social development equally and intentionally.',    bg:'#e0f2f1', accent:'#00897b' },
    { icon:'🎵', title:'Joyful Learning',             desc:'Music, movement, stories, and activities make learning engaging, vibrant, and stress-free.',          bg:'#e8f5e9', accent:'#43a047' },
    { icon:'⭐', title:'Confidence Building',         desc:'Children are encouraged to express themselves, participate actively, and believe in their abilities.', bg:'#fffde7', accent:'#f9a825' },
  ];

  return (
    <section className="philosophy-section">
      <div className="container">
        <div className="section-header sr">
          <span className="section-tag">What We Believe</span>
          <h2>Our Philosophy 🌟</h2>
          <p className="section-sub">
            At Kids Cosmos School, our philosophy is built on care, creativity, and child-centered learning.
          </p>
        </div>

        <div className="philosophy-grid">
          {philosophies.map((item, idx) => (
            <div
              key={idx}
              className="philosophy-card sr"
              style={{
                '--card-bg':     item.bg,
                '--card-accent': item.accent,
                '--delay':       `${idx * 0.07}s`,
              }}
            >
              <div className="philosophy-icon">{item.icon}</div>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
              <div className="philosophy-accent-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Values Strip ─────────────────────────────────────────── */
function ValuesStrip() {
  const values = [
    { icon:'💙', label:'Trust' },
    { icon:'🌟', label:'Excellence' },
    { icon:'🤝', label:'Teamwork' },
    { icon:'🌱', label:'Growth' },
    { icon:'🎨', label:'Creativity' },
    { icon:'🏆', label:'Achievement' },
  ];
  return (
    <div className="values-strip sr">
      {values.map((v, i) => (
        <div key={i} className="value-item" style={{ '--delay': `${i * 0.1}s` }}>
          <span className="value-icon">{v.icon}</span>
          <span className="value-label">{v.label}</span>
        </div>
      ))}
    </div>
  );
}


/* ─── About (Root) ─────────────────────────────────────────── */
function About() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="about-page">
      <PageHeader />
      <PrincipalSection />
      <ValuesStrip />
      <PhilosophySection />
    </div>
  );
}

export default About;
