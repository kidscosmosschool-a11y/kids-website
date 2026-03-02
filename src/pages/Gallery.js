import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Gallery.css';
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
import img11 from '../assets/img/11.jpg';
import img12 from '../assets/img/12.jpg';
import img13 from '../assets/img/13.jpg';
import img14 from '../assets/img/14.jpg';
import img15 from '../assets/img/15.jpg';
import img16 from '../assets/img/16.jpg';
import img17 from '../assets/img/17.jpg';
import img18 from '../assets/img/18.jpg';
import img19 from '../assets/img/19.jpg';
import img20 from '../assets/img/20.jpg';
import img21 from '../assets/img/21.jpg';
import img22 from '../assets/img/22.jpg';
import img23 from '../assets/img/23.jpg';
import img24 from '../assets/img/24.jpg';
import img25 from '../assets/img/25.jpg';
import img26 from '../assets/img/26.jpg';
import img27 from '../assets/img/27.jpg';
import img28 from '../assets/img/28.jpg';
import img29 from '../assets/img/29.jpg';
import img30 from '../assets/img/30.jpg';

  
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io  = new IntersectionObserver(
      (e) => e.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-on');
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const IMG_LIST = [
  img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,
  img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,
  img21,img22,img23,img24,img25,img26,img27,img28,img29,img30,
];

const ALL_IMAGES = IMG_LIST.map((src, i) => ({
  id:      i + 1,
  src,
  caption: `Happy Learning Moment ${i + 1}`,
  sub:     'Kids Cosmos School',
  cat:     ['All','Activities','Classroom','Events','Outdoor'][(i % 4) + 1],
}));

const CATS = ['All','Classroom','Activities','Events','Outdoor'];
const PER_PAGE = 12;

/* ── Lightbox ── */
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);

  const prev = useCallback(
    () => setIdx((p) => (p - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((p) => (p + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [prev, next, onClose]);

  const img = images[idx];

  return (
    <div className="lb-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>

      <button className="lb-arrow lb-prev"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous">‹</button>

      <button className="lb-arrow lb-next"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next">›</button>

      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <div className="lb-img-wrap">
          <img src={img.src} alt={img.caption} />
        </div>
        <div className="lb-caption">
          <span className="lb-emoji">🌈</span>
          <div>
            <strong>{img.caption}</strong>
            <small>{img.sub}</small>
          </div>
          <div className="lb-counter">{idx + 1} / {images.length}</div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [cat, setCat]     = useState('All');
  const [page, setPage]   = useState(1);
  const [lightbox, setLb] = useState(null);

  const filtered    = cat === 'All' ? ALL_IMAGES : ALL_IMAGES.filter((i) => i.cat === cat);
  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const currentImgs = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changeCat = (c) => { setCat(c); setPage(1); };
  const changePage = (p) => {
    setPage(p);
    document.getElementById('gal-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openLb = (idx) => setLb({ images: currentImgs, idx });

  return (
    <div className="gallery-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <header className="gl-hero">
        <div className="glh-blob gb1" />
        <div className="glh-blob gb2" />
        <div className="glh-blob gb3" />

        <div className="gl-hero-inner">
          <span className="gl-pill"><span className="gl-dot" />School Gallery</span>
          <h1>Our Happy <em>Moments</em> 🌈</h1>
          <p>Glimpses of joy, learning, and beautiful memories from our school family.</p>
          <nav className="gl-crumb">
            <Link to="/">Home</Link><span>›</span><span>Gallery</span>
          </nav>
        </div>

        {/* Floating image peeks */}
        <div className="gl-peeks" aria-hidden="true">
          {[1,5,9,14,20].map((n, i) => (
            <div key={n} className="gl-peek" style={{ animationDelay:`${i*.4}s` }}>
              <img src={IMG_LIST[n - 1]} alt="" />
            </div>
          ))}
        </div>

        <div className="gl-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0Z" fill="#f4fbff" />
          </svg>
        </div>
      </header>

      {/* ══ STATS ROW ═════════════════════════════════════════ */}
      <div className="gl-stats sr">
        {[
          { num:'30+', label:'Photos',       icon:'🖼️' },
          { num:'5',   label:'Categories',   icon:'🏷️' },
          { num:'10+', label:'Years of Joy', icon:'🎉' },
          { num:'∞',   label:'Memories',     icon:'💛' },
        ].map((s, i) => (
          <div key={i} className="gl-stat" style={{ '--delay':`${i*.1}s` }}>
            <div className="gl-stat-icon">{s.icon}</div>
            <div className="gl-stat-num">{s.num}</div>
            <div className="gl-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══ FILTER + GRID ═════════════════════════════════════ */}
      <div className="gl-body">
        <div className="gl-container">

          <div className="gl-filters sr" role="tablist">
            {CATS.map((c) => (
              <button key={c}
                role="tab"
                aria-selected={cat === c}
                className={`gl-filter-btn ${cat === c ? 'active' : ''}`}
                onClick={() => changeCat(c)}>
                {c}
              </button>
            ))}
          </div>

          <p className="gl-count sr">
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''} {cat !== 'All' ? `in ${cat}` : 'total'}
          </p>

          <div className="gl-grid sr" id="gal-grid">
            {currentImgs.map((img, i) => (
              <div key={img.id}
                className="gl-card"
                style={{ '--delay':`${i*.04}s` }}
                onClick={() => openLb(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLb(i)}
                aria-label={img.caption}>
                <div className="gl-card-img">
                  <img src={img.src} alt={img.caption} loading="lazy" />
                  <div className="gl-card-overlay">
                    <div className="gl-card-zoom">🔍</div>
                  </div>
                </div>
                <div className="gl-card-caption">
                  <span className="gl-cat-pill">{img.cat}</span>
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="gl-pagination sr">
              <button className="gl-page-btn nav-btn"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}>‹</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p}
                  className={`gl-page-btn ${page === p ? 'active' : ''}`}
                  onClick={() => changePage(p)}>{p}</button>
              ))}

              <button className="gl-page-btn nav-btn"
                disabled={page === totalPages}
                onClick={() => changePage(page + 1)}>›</button>
            </div>
          )}

        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIdx={lightbox.idx}
          onClose={() => setLb(null)}
        />
      )}

    </div>
  );
}