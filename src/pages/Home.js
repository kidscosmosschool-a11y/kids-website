import React, { useState, useEffect, useRef } from 'react';
import '../css/pages/Home.css';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import img20 from '../assets/img/20.jpg';
import img2  from '../assets/img/2.jpg';
import img12 from '../assets/img/12.jpg';
import img30 from '../assets/img/30.jpg';
import img9  from '../assets/img/9.jpg';
import principalImg from '../assets/img/user.jpeg';
import video1 from '../assets/img/video1.mp4';

import gallery1 from '../assets/img/1.jpg';
import gallery2 from '../assets/img/32.jpg';
import gallery3 from '../assets/img/3.jpg';
import gallery4 from '../assets/img/4.jpg';
import gallery5 from '../assets/img/11.jpg';
import gallery6 from '../assets/img/21.jpg';

import ramImg     from '../assets/img/ram.jpeg';
import chandraImg from '../assets/img/chandra.jpeg';
import shobitagImg from '../assets/img/shobita.jpeg';
import nimaImg    from '../assets/img/nima.jpeg';
import rajeshImg  from '../assets/img/rajesh.jpeg';

import childImg  from '../assets/img/child.avif';
import habitsImg from '../assets/img/habits.jpg';
import parentsImg from '../assets/img/parents.jpg';


function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('sr-visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ end, label, icon, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const duration = 1800;
        const steps    = 60;
        const inc      = Math.ceil(end / steps);
        let cur        = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, end);
          setCount(cur);
          if (cur >= end) clearInterval(t);
        }, duration / steps);
      }
    }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-num">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Particles({ count = 14 }) {
  const emojis = ['🌟','✨','🎨','🎶','📚','🌱','💡','🎭','🌈','⭐'];
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="particle" style={{
          left:              `${(i / count) * 95 + 2}%`,
          animationDelay:    `${(i * 0.55) % 9}s`,
          animationDuration: `${7 + (i % 6)}s`,
          fontSize:          `${11 + (i % 4) * 4}px`,
          opacity:           0.13 + (i % 5) * 0.04,
        }}>
          {emojis[i % emojis.length]}
        </span>
      ))}
    </div>
  );
}


function Carousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState('next'); 

  const slides = [
    { image: img20, title: 'Where Little Minds Grow Big Dreams 🌱', desc: 'A safe, joyful and creative learning environment for your child.', btn1: { text: 'Learn More', link: '/about' },      btn2: { text: 'Enroll Now',   link: '/admission' } },
    { image: img2,  title: 'Learning Through Play & Fun 🧩',        desc: 'Activities designed to inspire creativity, confidence, and curiosity.', btn1: { text: 'Our Activities', link: '/activities' }, btn2: { text: 'View Gallery', link: '/gallery' } },
    { image: img12, title: 'Caring Teachers, Happy Children 👩‍🏫',   desc: 'Our experienced teachers nurture every child with love and care.', btn1: { text: 'Meet Our Team', link: '/team' },       btn2: { text: 'Contact Us',   link: '/contact' } },
    { image: img30, title: 'A Bright Start for a Brighter Future 🌟',desc: 'Building strong foundations for lifelong learning.', btn1: { text: 'Our Classes',   link: '/classes' },     btn2: { text: 'Join Today',   link: '/admission' } },
    { image: img9,  title: 'A Second Home for Your Child 🏡',        desc: 'Where safety, care, and happiness come first.', btn1: { text: 'Get In Touch',  link: '/contact' },      btn2: { text: 'Enroll Now',   link: '/admission' } },
  ];

  const go = (idx) => {
    setDir(idx > current ? 'next' : 'prev');
    setCurrent((idx + slides.length) % slides.length);
  };

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [current]);

  return (
    <div className="carousel" role="region" aria-label="School highlights">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div key={idx}
          className={`carousel-slide ${idx === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={idx !== current}
        >
          <div className="carousel-overlay" />
          <div className="carousel-content">
            <div className={`carousel-inner ${idx === current ? `content-active content-${dir}` : ''}`}>
              <span className="carousel-badge">Kids Cosmos School</span>
              <h1 className="carousel-title">{slide.title}</h1>
              <p  className="carousel-desc">{slide.desc}</p>
              <div className="carousel-buttons">
                <Link to={slide.btn1.link} className="btn-carousel-primary">{slide.btn1.text}</Link>
                <Link to={slide.btn2.link} className="btn-carousel-secondary">{slide.btn2.text}</Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide counter top-right */}
      <div className="carousel-counter" aria-hidden="true">
        <span className="c-curr">{String(current + 1).padStart(2, '0')}</span>
        <span className="c-sep"> / </span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Arrows */}
      <button className="carousel-arrow carousel-prev" onClick={() => go(current - 1)} aria-label="Previous slide">&#8249;</button>
      <button className="carousel-arrow carousel-next" onClick={() => go(current + 1)} aria-label="Next slide">&#8250;</button>

      {/* Dot indicators */}
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button key={idx}
            className={`indicator ${idx === current ? 'active' : ''}`}
            onClick={() => go(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Auto-play progress bar */}
      <div className="carousel-progress-wrap">
        <div className="carousel-progress-bar" key={current} />
      </div>
    </div>
  );
}

function StatsStrip() {
  return (
    <div className="stats-strip sr">
      <Counter end={500} label="Happy Students"     icon="👶" />
      <Counter end={25}  label="Dedicated Staff"    icon="👩‍🏫" />
      <Counter end={10}  label="Years Excellence"   icon="🏆" />
      <Counter end={8}   label="Fun Activities"     icon="🎨" />
    </div>
  );
}

function AboutSection() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="about-section">
      <div className="container">
        <div className="about-grid">

          {/* ── Text ── */}
          <div className="about-text sr sr-left">
            <span className="section-tag">Who We Are</span>
            <h2>About Kids Cosmos School 🌟</h2>

            <p><strong>Kids Cosmos School</strong> is a trusted and joyful learning home for young
              minds, proudly educating children from <strong>Playgroup to Class 4</strong>. We
              nurture every child's unique talents in a safe, supportive, and stimulating environment.</p>

            <p>Our school focuses on <strong>learning through fun, creativity, and discovery</strong> —
              art &amp; craft, music, dance, sports, storytelling, science experiments, outdoor
              adventures, and technology learning.</p>

            <div className="about-highlights">
              {[
                ['🏆', 'Award-Winning Excellence',     'Multiple awards for academic excellence, innovative teaching &amp; holistic development.'],
                ['🌈', 'World-Class Facilities',       'Bright classrooms, safe playgrounds, creative studios &amp; a well-equipped library.'],
                ['🤝', 'Community &amp; Values',       'Kindness, respect, teamwork &amp; responsibility at our core.'],
                ['🎉', 'Fun &amp; Memorable Experiences', 'Workshops, field trips, themed events &amp; storytelling sessions every single day.'],
              ].map(([icon, title, desc], i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-icon">{icon}</span>
                  <div>
                    <strong dangerouslySetInnerHTML={{ __html: title }} />
                    <p dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="about-action">
              <Link to="/about" className="btn-primary-pill">Read More <span className="btn-arrow">→</span></Link>
              <div className="principal-info">
                <div className="principal-avatar-wrap">
                  <img src={principalImg} alt="Principal" />
                  <div className="principal-ring" />
                </div>
                <div>
                  <h6>Principal</h6>
                  <small>Kids Cosmos School</small>
                </div>
              </div>
            </div>
          </div>

          {/* ── Video ── */}
          <div className="about-video sr sr-right">
            <div className="video-frame">
              <div className="vf-corner tl" /><div className="vf-corner tr" />
              <div className="vf-corner bl" /><div className="vf-corner br" />
              <video autoPlay loop playsInline muted={isMuted}>
                <source src={video1} type="video/mp4" />
              </video>
              <button className="sound-btn" onClick={() => setIsMuted(!isMuted)} aria-label="Toggle sound">
                {isMuted ? '🔇' : '🔊'}
              </button>
              <div className="video-badge">
                <span>📍</span> Chabahil, Kathmandu
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


function CallToActionSection() {
  return (
    <div className="cta-section">
      <div className="container">
        <div className="cta-card sr">
          <div className="cta-image">
            <img src={img20} alt="Kids Cosmos School" loading="lazy" />
            <div className="cta-img-overlay" />
          </div>
          <div className="cta-text">
            <span className="section-tag light">Join Our Family</span>
            <h2>Become A Part of<br />Kids Cosmos 🌈</h2>
            <p>
              It is often said that children are the fallen stars of the earth. At{' '}
              <strong>Kids Cosmos School</strong>, our dedicated team nurtures each child with care,
              guidance, and inspiration — helping them grow into confident, capable, and outstanding
              individuals. Join us and watch your child shine ✨
            </p>
            <Link to="/admission" className="btn-primary-pill">
              Get Started Now <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivitiesSection() {
  const activities = [
    { icon:'🎶', title:'Music, Vocal & Dance',      desc:'Singing, rhythm, and dance movements help children express emotions, build confidence, and improve coordination.', link:'/music',       color:'#fff0f8' },
    { icon:'🎨', title:'Art & Craft',               desc:'Drawing, painting, and creative crafts develop imagination, fine motor skills, and joyful self-expression.',      link:'/art-crafts',  color:'#f0fff4' },
    { icon:'🎭', title:'Drama',                     desc:'Role-play and performances help children develop communication skills, imagination, and self-confidence.',         link:'/dramas',      color:'#fff8ee' },
    { icon:'⚽', title:'Sports & Games',            desc:'Fun sports improve strength, teamwork, discipline, and promote a healthy and active lifestyle for children.',      link:'/sports',      color:'#f0f8ff' },
    { icon:'🔬', title:'Fun Science',               desc:'Hands-on experiments spark curiosity and help children explore science through joyful play and discovery.',         link:'/science',     color:'#f5f0ff' },
    { icon:'📖', title:'Storytelling & Oratory',   desc:'Stories, show-and-tell, and speaking activities build language skills and confident communication.',               link:'/story',       color:'#fffef0' },
    { icon:'🚌', title:'Outdoor Trips',             desc:'Educational trips give children real-world exposure, fun learning experiences, and joyful shared memories.',       link:'/trip',        color:'#f0fff8' },
    { icon:'🌟', title:'Parents Day & Talent Show',desc:'Celebrations where children showcase their talents and parents share joyful school moments together.',             link:'/parents-day', color:'#fff5f0' },
  ];

  return (
    <div className="activities-section">
      <Particles count={12} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header sr">
          <span className="section-tag">What We Do</span>
          <h2>Our Activities 🎨🎶⚽</h2>
          <p>Learning goes beyond classrooms. Our joyful activities help children grow
            creatively, emotionally, socially, and physically.</p>
        </div>

        <div className="activities-grid">
          {activities.map((a, i) => (
            <div key={i} className="activity-card sr"
              style={{ '--delay': `${i * 0.07}s`, '--card-bg': a.color }}>
              <div className="activity-icon-wrap">
                <span className="activity-icon">{a.icon}</span>
                <div className="activity-glow" />
              </div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
              <Link to={a.link} className="activity-btn">Explore <span>→</span></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonials = [
    { name:'Ram Sharma Upreti',    role:'Parent', image:ramImg,      text:'My three-year-old child is improving very quickly — not only academically but also in social activities and personal behavior. I truly appreciate the effort of Kids Cosmos School and hope for the best in the future.' },
    { name:'E. Chandra P. Subedi', role:'Parent', image:chandraImg,  text:"My remark is that the school is successfully fulfilling its mission. I am fully satisfied with my child's learning and overall development. I am truly thankful to Kids Cosmos School for their dedication and care." },
    { name:'Shobha Poudyal Sharma',role:'Parent', image:shobitagImg, text:"I recently shifted my son from another school, and I am extremely satisfied. The school feels safe and secure, and the teachers are approachable, friendly, and supportive. My son loves every day!" },
    { name:'Nima Kafle',           role:'Parent', image:nimaImg,     text:'किड्स कसमसमा भर्ना गरेको दिन देखि आजसम्म मेरो छोराले स्कूल नजाने भनेको छैन । त्यो मेरो लागि निक्कै खुशीको कुरा हो ।' },
    { name:'Rajesh Rai',           role:'Parent', image:rajeshImg,   text:"The school always meets parents' expectations and continuously helps children develop. The teaching methods are remarkable, with extra care and attention whenever needed." },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4800);
    return () => clearInterval(t);
  }, [active]);

  const stars = '★★★★★';

  return (
    <div className="testimonials-section">
      <div className="container">
        <div className="section-header sr">
          <span className="section-tag">Parent Stories</span>
          <h2>What Parents Say 💬</h2>
          <p>Parents trust Kids Cosmos School for its caring environment, quality education, and joyful learning experiences.</p>
        </div>

        <div className="testimonials-layout sr">
          {/* Big featured quote */}
          <div className="testimonial-featured">
            <div className="t-quote-mark">"</div>
            <p className="t-text" key={active}>{testimonials[active].text}</p>
            <div className="t-stars">{stars}</div>
            <div className="t-author">
              <img src={testimonials[active].image} alt={testimonials[active].name} />
              <div>
                <strong>{testimonials[active].name}</strong>
                <span>{testimonials[active].role}</span>
              </div>
            </div>
          </div>

          {/* Thumb selector */}
          <div className="testimonial-thumbs">
            {testimonials.map((t, i) => (
              <button key={i}
                className={`t-thumb ${i === active ? 'thumb-active' : ''}`}
                onClick={() => setActive(i)}>
                <img src={t.image} alt={t.name} />
                <div className="t-thumb-info">
                  <strong>{t.name.split(' ')[0]}</strong>
                  <span>{t.role}</span>
                </div>
                {i === active && <div className="thumb-indicator" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogSection() {
  const blogs = [
    { image:childImg,  title:'Importance of Early Childhood Education',  desc:'Early education builds strong foundations for learning, confidence, communication, and social skills in young children.', link:'/blog/1', tag:'Education' },
    { image:habitsImg, title:'Developing Healthy Habits in Children',     desc:'Simple daily routines like proper sleep, nutrition, and playtime help children grow healthier and happier.',            link:'/blog/2', tag:'Health'    },
    { image:parentsImg,title:'Role of Parents & Teachers Together',      desc:'When parents and teachers work together, children feel more secure, motivated, and confident in their learning journey.',  link:'/blog/3', tag:'Community' },
  ];

  return (
    <div className="blog-section">
      <div className="container">
        <div className="section-header sr">
          <span className="section-tag">Latest Insights</span>
          <h2>Child Care &amp; Parenting Blogs</h2>
          <p>Helpful insights, tips, and guidance for parents to support their child's learning, growth, and emotional well-being.</p>
        </div>

        <div className="blog-grid">
          {blogs.map((b, i) => (
            <div key={i} className="blog-card sr" style={{ '--delay': `${i * 0.14}s` }}>
              <div className="blog-img-wrap">
                <img src={b.image} alt={b.title} loading="lazy" />
                <span className="blog-tag">{b.tag}</span>
              </div>
              <div className="blog-body">
                <h5>{b.title}</h5>
                <p>{b.desc}</p>
                <Link to={b.link} className="blog-link">Read More <span>→</span></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnrollBanner() {
  return (
    <div className="enroll-banner">
      <div className="eb-bg-shapes" aria-hidden="true">
        <span className="eb-shape s1" /><span className="eb-shape s2" /><span className="eb-shape s3" />
      </div>
      <div className="container eb-inner sr">
        <div className="eb-text">
          <h2>Enroll Your Child Today! 🏫👶</h2>
          <p>Give your child the best start with Kids Cosmos School. Fun, safety, and holistic growth guaranteed!</p>
        </div>
        <Link to="/admission" className="btn-enroll">
          Enroll Now <span className="btn-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}


export default function Home() {
  useScrollReveal();

  return (
    <div className="home-page">

      <SEO
        isHome
        title="Best Preschool & Primary School in Nepal"
        description="Kids Cosmos School — the best preschool and primary school in Nepal. Playgroup, Nursery, LKG, UKG and primary classes in a safe, joyful environment."
        image="/img/hero.jpg"
        url="/"
      />

      <Carousel />
      <StatsStrip />
      <AboutSection />
      <CallToActionSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <BlogSection />
      <EnrollBanner />

    </div>
  );
}