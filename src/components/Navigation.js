import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/navigation.css';
import logo from '../assets/img/logo.png';

const NAV_ITEMS = [
  { label: 'Home',     path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Classes',  path: '/classes' },
  {
    label: 'Activities',
    dropdown: [
      { emoji: '🎨', label: 'Art & Craft',     path: '/Art-Crafts'   },
      { emoji: '🎵', label: 'Music & Dance',   path: '/Music'        },
      { emoji: '⚽', label: 'Sports & Games',  path: '/Sports'       },
      { emoji: '📖', label: 'Storytelling',    path: '/Story'        },
      { emoji: '🔬', label: 'Fun Science',     path: '/Science'      },
      { emoji: '🚌', label: 'Outdoor Trips',   path: '/Trip'         },
      { emoji: '👨‍👩‍👧', label: 'Parents Day',  path: '/Parents-Day'  },
      { emoji: '🎬', label: 'Dramas',          path: '/Dramas'       },
    ],
  },
  { label: 'Gallery', path: '/Gallery' },
  { label: 'Blog',    path: '/blog' },
  { label: 'Contact', path: '/Contact' },
];

function Navigation() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [dropOpen,   setDropOpen]         = useState(false);
  const [scrolled,   setScrolled]         = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const navRef   = useRef(null);
  const location = useLocation();

  // Shrink navbar on scroll
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  // Active link indicator underline (desktop only)
  useEffect(() => {
    if (!navRef.current) return;
    const active = navRef.current.querySelector('.nav-link.is-active');
    if (active) {
      const navRect  = navRef.current.getBoundingClientRect();
      const linkRect = active.getBoundingClientRect();
      setActiveIndicator({
        left:  linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const isDropActive = NAV_ITEMS
    .find((i) => i.dropdown)
    ?.dropdown.some((d) => location.pathname.startsWith(d.path));

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">

        {/* ── Brand ── */}
        <Link to="/" className="navbar-brand" aria-label="Kids Cosmos School Home">
          <img src={logo} alt="Kids Cosmos School Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name">Kid's Cosmos School</span>
            <span className="brand-tagline">Where Minds Grow 🌱</span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="desktop-nav" ref={navRef}>
          {/* sliding underline indicator */}
          <div className="nav-indicator"
            style={{ left: activeIndicator.left, width: activeIndicator.width }} />

          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key="activities" className={`nav-item dropdown ${isDropActive ? 'is-active' : ''}`}>
                <button className={`nav-link dropdown-toggle ${isDropActive ? 'is-active' : ''}`}
                  aria-haspopup="true" aria-expanded="false">
                  {item.label}
                  <svg className="drop-chevron" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-grid">
                    {item.dropdown.map((d) => (
                      <Link key={d.path} to={d.path} className={`dropdown-item ${location.pathname === d.path ? 'drop-active' : ''}`} role="menuitem">
                        <span className="drop-emoji">{d.emoji}</span>
                        <span>{d.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.path} to={item.path}
                className={`nav-link ${isActive(item.path) ? 'is-active' : ''}`}>
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* ── Enroll button (desktop) ── */}
        <Link to="/Admission" className="btn-enroll-nav" aria-label="Enroll Now">
          <span>Enroll Now</span>
          <i className="fa fa-child" />
        </Link>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`hamburger ${mobileOpen ? 'ham-open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className="ham-bar bar-1" />
          <span className="ham-bar bar-2" />
          <span className="ham-bar bar-3" />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`mobile-drawer ${mobileOpen ? 'drawer-open' : ''}`}
        aria-hidden={!mobileOpen}>
        <div className="drawer-inner">

          {/* Drawer header */}
          <div className="drawer-header">
            <img src={logo} alt="Logo" className="drawer-logo" />
            <div>
              <strong>Kid's Cosmos School</strong>
              <small>Where Minds Grow 🌱</small>
            </div>
          </div>

          {/* Links */}
          <div className="drawer-links">
            {NAV_ITEMS.map((item) =>
              item.dropdown ? (
                <div key="activities-mob" className="drawer-group">
                  <button
                    className={`drawer-link drawer-toggle ${dropOpen ? 'drop-open' : ''}`}
                    onClick={() => setDropOpen(!dropOpen)}
                  >
                    <span>Activities</span>
                    <svg className="drawer-chevron" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <div className={`drawer-sub ${dropOpen ? 'sub-open' : ''}`}>
                    {item.dropdown.map((d) => (
                      <Link key={d.path} to={d.path} className="drawer-sub-link"
                        onClick={() => setMobileOpen(false)}>
                        <span className="drop-emoji">{d.emoji}</span>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.path} to={item.path}
                  className={`drawer-link ${isActive(item.path) ? 'drawer-active' : ''}`}
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA inside drawer */}
          <div className="drawer-cta">
            <Link to="/Admission" className="btn-enroll-drawer" onClick={() => setMobileOpen(false)}>
              🎒 Enroll Your Child Now
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className="drawer-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
    </nav>
  );
}

export default Navigation;