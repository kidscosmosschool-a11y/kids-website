import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

import gallery1 from '../assets/img/1.jpg';
import gallery2 from '../assets/img/32.jpg';
import gallery3 from '../assets/img/3.jpg';
import gallery4 from '../assets/img/4.jpg';
import gallery5 from '../assets/img/11.jpg';
import gallery6 from '../assets/img/21.jpg';

function Footer() {
  const footerRef = useRef(null);

  // Scroll-reveal for footer columns
  useEffect(() => {
    const els = footerRef.current?.querySelectorAll('.fc-reveal') ?? [];
    const io  = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('fc-visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const quickLinks = [
    ['About Us',    '/about'      ],
    ['Classes',     '/classes'    ],
    ['Activities',  '/activities' ],
    ['Gallery',     '/Gallery'    ],
    ['Blog',        '/Blog'       ],
    ['Contact Us',  '/Contact'    ],
  ];

  const galleryImgs = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  const socials = [
    { icon: 'fab fa-facebook-f',  href: 'https://www.facebook.com/kidscosmos/',  label: 'Facebook'  },
    { icon: 'fab fa-instagram',   href: 'https://www.instagram.com/kidscosmospreschool/', label: 'Instagram' },
    { icon: 'fab fa-youtube',     href: 'https://www.youtube.com/channel/UCXCvKbBtpldnVptyx4AFbFg',   label: 'YouTube'   },
  ];

  return (
    <footer className="site-footer" ref={footerRef}>

      {/* ── Wave divider ── */}
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* ── Main grid ── */}
      <div className="footer-container">
        <div className="footer-grid">

          {/* ── Col 1: Brand + Contact ── */}
          <div className="footer-col fc-reveal">
            <div className="footer-brand">
              <div className="footer-brand-dot" aria-hidden="true" />
              <h3>Get In Touch</h3>
            </div>

            <ul className="footer-contact-list">
              <li>
                <span className="fc-icon"><i className="fa fa-map-marker-alt" /></span>
                <span>Saraswati Nagar Marga,<br />Chabahil, Kathmandu, Nepal</span>
              </li>
              <li>
                <span className="fc-icon"><i className="fa fa-phone-alt" /></span>
                <a href="tel:014822227">01-4822227</a>
                <span className="fc-sep">·</span>
                <a href="tel:9860667648">9860667648</a>
              </li>
              <li>
                <span className="fc-icon"><i className="fa fa-envelope" /></span>
                <a href="mailto:kidscosmosschool@gmail.com">kidscosmosschool@gmail.com</a>
              </li>
            </ul>

            <div className="footer-socials">
              {socials.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label={label}>
                  <i className={icon} />
                  <span className="social-ripple" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div className="footer-col fc-reveal" style={{ '--delay': '.1s' }}>
            <div className="footer-brand">
              <div className="footer-brand-dot" aria-hidden="true" />
              <h3>Quick Links</h3>
            </div>
            <nav className="footer-links" aria-label="Quick links">
              {quickLinks.map(([label, path]) => (
                <Link key={path} to={path} className="footer-link">
                  <span className="fl-arrow" aria-hidden="true">›</span>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Gallery ── */}
          <div className="footer-col fc-reveal" style={{ '--delay': '.2s' }}>
            <div className="footer-brand">
              <div className="footer-brand-dot" aria-hidden="true" />
              <h3>
                <Link to="/Gallery" className="footer-gallery-title">Photo Gallery</Link>
              </h3>
            </div>
            <div className="footer-gallery">
              {galleryImgs.map((img, i) => (
                <Link key={i} to="/Gallery" className="footer-gallery-item">
                  <img src={img} alt={`School photo ${i + 1}`} loading="lazy" />
                  <div className="gallery-hover-overlay" aria-hidden="true">
                    <i className="fa fa-search-plus" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 4: School Info ── */}
          <div className="footer-col fc-reveal" style={{ '--delay': '.3s' }}>
            <div className="footer-brand">
              <div className="footer-brand-dot" aria-hidden="true" />
              <h3>School Information</h3>
            </div>

            <div className="info-card">
              <span className="info-icon"><i className="fa fa-clock" /></span>
              <div>
                <strong>Office Hours</strong>
                <p>Sunday – Friday<br />8:30 AM – 4:00 PM</p>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon"><i className="fa fa-calendar-check" /></span>
              <div>
                <strong>Admissions</strong>
                <p>Open throughout the year.<br />Contact us for details.</p>
              </div>
            </div>

            <Link to="/Contact" className="btn-footer-contact">
              <i className="fa fa-paper-plane" />
              Contact School
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <span>© <strong>Kids Cosmos School</strong>. All Rights Reserved.</span>
          <div className="footer-bottom-badges">
            <span className="footer-badge">🏆 Award Winning</span>
            <span className="footer-badge">🌱 Est. 2015</span>
          </div>
          <span>Designed &amp; Developed by <strong>Aspire Team</strong></span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;