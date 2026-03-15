import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogs } from './BlogData';
import '../css/pages/Blog.css';

function useScrollReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.sr');
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('sr-visible'); io.unobserve(e.target); }
        }),
        { threshold: 0.01 }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
}

function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encoded     = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
      color: '#1877f2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      name: 'Instagram',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
      color: '#e1306c',
      href: `https://www.instagram.com/`,
      note: 'instagram',
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.428a.75.75 0 00.921.921l5.576-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.515-5.228-1.415l-.374-.22-3.875 1.022 1.022-3.875-.22-.374A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      ),
      color: '#25d366',
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
    },
    {
      name: 'Twitter',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: '#000000',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="share-section">
      <h4>Share this article</h4>
      <div className="share-buttons">
        {platforms.map((p) => (
          p.note === 'instagram' ? (
            <button
              key={p.name}
              className="share-btn"
              style={{ '--share-color': p.color }}
              onClick={() => alert('Copy the link and share it on your Instagram story or bio!')}
              title={`Share on ${p.name}`}
            >
              {p.icon}
              <span>{p.name}</span>
            </button>
          ) : (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
              style={{ '--share-color': p.color }}
              title={`Share on ${p.name}`}
            >
              {p.icon}
              <span>{p.name}</span>
            </a>
          )
        ))}
        <button className="share-btn share-copy" onClick={handleCopy} title="Copy link">
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          )}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}

function RenderContent({ blocks }) {
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'intro':
            return <p key={i} className="article-intro">{block.text}</p>;
          case 'heading':
            return <h3 key={i} className="article-heading">{block.text}</h3>;
          case 'paragraph':
            return <p key={i} className="article-paragraph">{block.text}</p>;
          case 'list':
            return (
              <ul key={i} className="article-list">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case 'quote':
            return (
              <blockquote key={i} className="article-quote">
                <span className="quote-mark">"</span>
                {block.text.replace(/^"|"$/g, '')}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  useScrollReveal();

  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    if (!blog) navigate('/blog');
  }, [blog, navigate]);

  if (!blog) return null;

  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const prev = blogs[currentIndex - 1] || null;
  const next = blogs[currentIndex + 1] || null;

  const related = blogs.filter((b) => b.slug !== slug).slice(0, 3);
  const pageUrl = `${window.location.origin}/blog/${blog.slug}`;

  return (
    <div className="blog-post-page">
      <SEO
        title={`${blog.title} | Kids Cosmos School`}
        description={blog.excerpt}
        url={`/blog/${blog.slug}`}
        image={blog.image}
      />

      {/* Hero */}
      <div className="post-hero">
        <img src={blog.image} alt={blog.title} className="post-hero-img" />
        <div className="post-hero-overlay" />
        <div className="container post-hero-content sr">
          <span className="blog-tag-pill" style={{ background: blog.tagColor, color: blog.tagTextColor }}>
            {blog.tag}
          </span>
          <h1>{blog.title}</h1>
          <div className="post-meta">
            <span>📅 {blog.date}</span>
            <span>⏱ {blog.readTime}</span>
            <span>✍️ {blog.author}</span>
          </div>
        </div>
      </div>

      <div className="container post-container">
        <div className="post-layout">

          {/* Article */}
          <article className="post-article sr">
            <RenderContent blocks={blog.content} />
            <ShareButtons title={blog.title} url={pageUrl} />
          </article>

          {/* Sidebar */}
          <aside className="post-sidebar sr">
            <div className="sidebar-card">
              <h4>📚 More Articles</h4>
              <div className="sidebar-posts">
                {related.map((b) => (
                  <Link key={b.id} to={`/blog/${b.slug}`} className="sidebar-post-item">
                    <img src={b.image} alt={b.title} />
                    <div>
                      <span className="sb-tag" style={{ color: b.tagTextColor }}>{b.tag}</span>
                      <p>{b.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-card sidebar-enroll">
              <div className="se-emoji">🎒</div>
              <h4>Enroll Your Child</h4>
              <p>Give your child the best start at Kids Cosmos School.</p>
              <Link to="/admission" className="btn-primary-pill" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                Apply Now →
              </Link>
            </div>
          </aside>

        </div>

        {/* Prev / Next navigation */}
        <div className="post-navigation sr">
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className="post-nav-btn post-nav-prev">
              <span className="nav-direction">← Previous</span>
              <span className="nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/blog/${next.slug}`} className="post-nav-btn post-nav-next">
              <span className="nav-direction">Next →</span>
              <span className="nav-title">{next.title}</span>
            </Link>
          ) : <div />}
        </div>

        {/* Back to blog */}
        <div className="back-to-blog sr">
          <Link to="/blog" className="back-blog-link">← Back to All Articles</Link>
        </div>

      </div>
    </div>
  );
}