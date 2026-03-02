export function initCommon() {
  // ── 1. Scroll-reveal observer ─────────────────────────────────────────
  const revealSelectors = [
    '.reveal',
    '.reveal-left',
    '.reveal-right',
    '.reveal-scale',
    '.reveal-flip',
    '.stagger-children',
  ].join(', ');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // Once revealed, stop observing to save memory
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,      // trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px',
    }
  );

  const revealEls = document.querySelectorAll(revealSelectors);
  revealEls.forEach((el) => revealObserver.observe(el));

  // ── 2. Back-to-top button ─────────────────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');
  let toggleBackToTop; // Declare in outer scope so cleanup can access

  if (backToTop) {
    toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 3. Active nav link highlight ──────────────────────────────────────
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  // ── 4. Cleanup function (call on React route change) ─────────────────
  return () => {
    revealObserver.disconnect();
    if (toggleBackToTop) {
      window.removeEventListener('scroll', toggleBackToTop);
    }
  };
}

// Auto-init if not in a module/React context (plain HTML pages)
if (typeof window !== 'undefined' && !window.__KIDS_COSMOS_INIT__) {
  window.__KIDS_COSMOS_INIT__ = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
  } else {
    initCommon();
  }
}