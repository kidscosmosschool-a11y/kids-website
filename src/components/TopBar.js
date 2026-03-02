import React, { useState, useEffect } from 'react';
import '../css/topbar.css';

function TopBar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY]     = useState(0);

  // Hide topbar on scroll down, show on scroll up
  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setVisible(y <= lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [lastY]);

  return (
    <div className={`topbar ${visible ? 'topbar-visible' : 'topbar-hidden'}`}>
      <div className="topbar-inner">

        {/* ── Left: phones ── */}
        <div className="tb-group tb-phones">
          <a href="tel:014822227" className="tb-item">
            <span className="tb-icon-wrap"><i className="fa fa-phone-alt" /></span>
            <span>01-4822227</span>
          </a>
          <span className="tb-divider" aria-hidden="true" />
          <a href="tel:9860667648" className="tb-item">
            <span className="tb-icon-wrap"><i className="fa fa-phone-alt" /></span>
            <span>9860667648</span>
          </a>
        </div>

        {/* ── Centre: scrolling marquee ── */}
        <div className="tb-marquee-wrap">
          <div className="tb-marquee">
            {[
              '📚 Admissions Open — Playgroup to Class 4',
              '🌟 Award-Winning School in Chabahil, Kathmandu',
              '🎨 Fun Activities Every Day — Art, Music, Science & More!',
              '📚 Admissions Open — Playgroup to Class 4',
              '🌟 Award-Winning School in Chabahil, Kathmandu',
              '🎨 Fun Activities Every Day — Art, Music, Science & More!',
            ].map((text, i) => (
              <span key={i} className="tb-marquee-item">{text}</span>
            ))}
          </div>
        </div>

        {/* ── Right: email + socials ── */}
        <div className="tb-group tb-right">
          <a href="mailto:kidscosmosschool@gmail.com" className="tb-item tb-email">
            <span className="tb-icon-wrap"><i className="fa fa-envelope" /></span>
            <span>kidscosmosschool@gmail.com</span>
          </a>
          <span className="tb-divider" aria-hidden="true" />
          <div className="tb-socials">
            <a href="https://www.facebook.com/kidscosmos/"  target="_blank" rel="noopener noreferrer" className="tb-social" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com/kidscosmospreschool/" target="_blank" rel="noopener noreferrer" className="tb-social" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.youtube.com/channel/UCXCvKbBtpldnVptyx4AFbFg"   target="_blank" rel="noopener noreferrer" className="tb-social" aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TopBar;