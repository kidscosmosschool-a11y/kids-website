import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export default function Blog() {
  useScrollReveal();
  const [featured, ...rest] = blogs;

  return (
    <div className="blog-page">
      <SEO
        title="Child Care & Parenting Blogs | Kids Cosmos School"
        description="Helpful insights, tips, and guidance for parents to support their child's learning, growth, and emotional well-being."
        url="/blog"
      />

      {/* Hero */}
      <div className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="container">
          <div className="blog-hero-inner sr">
            <span className="section-tag">Latest Insights</span>
            <h1>Child Care &amp; Parenting Blogs</h1>
            <p>Helpful insights, tips, and guidance for parents to support their child's<br />learning, growth, and emotional well-being.</p>
          </div>
        </div>
      </div>

      <div className="container blog-container">

        {/* Featured Post */}
        <div className="blog-featured sr">
          <div className="bf-image">
            <img src={featured.image} alt={featured.title} />
            <span className="blog-tag-pill" style={{ background: featured.tagColor, color: featured.tagTextColor }}>
              {featured.tag}
            </span>
          </div>
          <div className="bf-content">
            <div className="blog-meta">
              <span>📅 {featured.date}</span>
              <span>⏱ {featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <Link to={`/blog/${featured.slug}`} className="btn-primary-pill">
              Read Article <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Section heading */}
        <div className="blog-section-label sr">
          <h3>More Articles</h3>
          <div className="bsl-line" />
        </div>

        {/* Grid */}
        <div className="blog-grid-page">
          {rest.map((blog, i) => (
            <div key={blog.id} className="blog-card sr" style={{ '--delay': `${i * 0.1}s` }}>
              <div className="blog-img-wrap">
                <img src={blog.image} alt={blog.title} loading="lazy" />
                <span className="blog-tag-pill" style={{ background: blog.tagColor, color: blog.tagTextColor }}>
                  {blog.tag}
                </span>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>📅 {blog.date}</span>
                  <span>⏱ {blog.readTime}</span>
                </div>
                <h5>{blog.title}</h5>
                <p>{blog.excerpt}</p>
                <Link to={`/blog/${blog.slug}`} className="blog-link">Read More <span>→</span></Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}