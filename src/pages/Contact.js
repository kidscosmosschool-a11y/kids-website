import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Contact.css';
import SEO from '../components/SEO';

  
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr');
    const io  = new IntersectionObserver(
      (e) => e.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('sr-on'); io.unobserve(entry.target); }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Floating-label field */
function Field({ id, label, type='text', value, onChange, required, rows }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const Tag    = rows ? 'textarea' : 'input';
  return (
    <div className={`ff ${focused ? 'ff-focus' : ''} ${filled ? 'ff-filled' : ''}`}>
      <Tag id={id} type={rows ? undefined : type} rows={rows}
        value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required} className="ff-input" placeholder=" " />
      <label htmlFor={id} className="ff-label">{label}</label>
      <span className="ff-bar" />
    </div>
  );
}

const INFO_CARDS = [
  { icon:'fa fa-map-marker-alt', title:'Our Location',  color:'#e8f5ff', accent:'#2bb0ed',
    lines:['Saraswati Nagar Marga,','Chabahil, Kathmandu, Nepal'],
    href:'https://maps.google.com/?q=Kids+Cosmos+School+Chabahil', cta:'Open in Maps' },
  { icon:'fa fa-envelope',       title:'Email Us',      color:'#fff4e6', accent:'#e67e00',
    lines:['kidscosmosschool@gmail.com','upadhyaya9sheelu@gmail.com'],
    href:'mailto:kidscosmosschool@gmail.com', cta:'Send Email' },
  { icon:'fa fa-phone-alt',      title:'Call Us',       color:'#e8fff0', accent:'#198754',
    lines:['01-4822227','986-0667648'],
    href:'tel:014822227', cta:'Call Now' },
  { icon:'fa fa-clock',          title:'Office Hours',  color:'#f3e8ff', accent:'#7e22ce',
    lines:['Sunday – Friday','9:00 AM – 4:00 PM'],
    href:null, cta:null },
];

const FAQS = [
  ['When are admissions open?',         'Admissions are open all year for Playgroup to Class 4.'],
  ['Can I visit the school first?',      'Yes! Call us or fill the form to schedule a free visit.'],
  ['What curriculum do you follow?',    'A blended Nepal & American curriculum for holistic growth.'],
  ['Is transportation available?',       'Contact us directly to enquire about transport options.'],
];

export default function Contact() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm]   = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle');

  const change = (e) => {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    setStatus('sending');
    const go = () => {
      if (window.emailjs) {
        window.emailjs
          .send('service_pdkqwkv','template_rse8l96',{
            from_name:form.name, from_email:form.email,
            subject:form.subject, message:form.message,
          },'FkPbkrgFMA6Je3_0J')
          .then(() => {
            setStatus('success');
            setForm({ name:'', email:'', phone:'', subject:'', message:'' });
            setTimeout(() => setStatus('idle'), 6000);
          })
          .catch(() => setStatus('error'));
      } else {
        setTimeout(() => {
          setStatus('success');
          setForm({ name:'', email:'', phone:'', subject:'', message:'' });
          setTimeout(() => setStatus('idle'), 6000);
        }, 1200);
      }
    };
    go();
  };

  return (
    <div className="contact-page">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <header className="ct-hero">
        <div className="cth-blob b1" /><div className="cth-blob b2" /><div className="cth-blob b3" />
        <div className="ct-hero-inner">
          <span className="ct-pill"><span className="ct-dot" />We'd love to hear from you</span>
          <h1>Get In <em>Touch</em> 👋</h1>
          <p>Questions about admissions, visiting the school, or just saying hello — we're always here for you.</p>
          <nav className="ct-crumb">
            <Link to="/">Home</Link><span>›</span><span>Contact</span>
          </nav>
        </div>
        <div className="ct-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0Z" fill="white" />
          </svg>
        </div>
      </header>

      {/* ══ INFO CARDS ════════════════════════════════════════ */}
      <section className="ct-cards-wrap">
        <div className="ct-container">
          <div className="ct-cards-grid">
            {INFO_CARDS.map((c, i) => (
              <div key={i} className="ct-card sr" style={{ '--delay':`${i*.1}s`, '--cbg':c.color, '--cacc':c.accent }}>
                <div className="ct-card-icon">
                  <i className={c.icon} />
                  <div className="ct-icon-ring" />
                </div>
                <h3>{c.title}</h3>
                {c.lines.map((l,j) => <p key={j}>{l}</p>)}
                {c.href && (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="ct-card-cta">
                    {c.cta} <span>→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORM + MAP ════════════════════════════════════════ */}
      <section className="ct-split sr">
        <div className="ct-container ct-split-inner">

          {/* Form */}
          <div className="ct-form-panel">
            <span className="section-tag">Send a Message</span>
            <h2>We reply within<br /><em>24 hours</em> ⚡</h2>

            {status === 'success' && (
              <div className="ct-alert success" role="alert">
                <i className="fa fa-check-circle" />
                <div><strong>Message sent!</strong><p>Thank you — we'll get back to you very soon.</p></div>
              </div>
            )}
            {status === 'error' && (
              <div className="ct-alert error" role="alert">
                <i className="fa fa-exclamation-circle" />
                <div><strong>Oops!</strong><p>Something went wrong — please try calling us directly.</p></div>
              </div>
            )}

            <form onSubmit={submit} noValidate className="ct-form">
              <div className="ff-row">
                <Field id="name"    label="Full Name"      value={form.name}    onChange={change} required />
                <Field id="email"   label="Email Address"  type="email" value={form.email}   onChange={change} required />
              </div>
              <div className="ff-row">
                <Field id="phone"   label="Phone Number"   type="tel"   value={form.phone}   onChange={change} />
                <Field id="subject" label="Subject"        value={form.subject} onChange={change} required />
              </div>
              <div className="ff-row single">
                <Field id="message" label="Your Message"   value={form.message} onChange={change} required rows={5} />
              </div>
              <button type="submit" className="ct-submit" disabled={status==='sending'}>
                {status === 'sending'
                  ? <><span className="ct-spinner" />Sending…</>
                  : <><i className="fa fa-paper-plane" />Send Message</>}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="ct-map-panel">
            <span className="section-tag">Find Us</span>
            <h2>We're in <em>Chabahil</em>,<br />Kathmandu 📍</h2>
            <p>Saraswati Nagar Marga, Chabahil, Kathmandu, Nepal</p>
            <a href="https://maps.google.com/?q=Kids+Cosmos+School+Chabahil"
              target="_blank" rel="noopener noreferrer" className="ct-dir-btn">
              <i className="fa fa-route" /> Get Directions
            </a>
            <div className="ct-map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.7054595395416!2d85.3551572!3d27.726378999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b9f2b93a3a5%3A0x4802a9efda8753a3!2sKids'%20Cosmos%20English%20Preschool%20and%20Day%20Care!5e0!3m2!1sen!2snp!4v1766047125545!5m2!1sen!2snp"
                title="Kids Cosmos School" width="100%" height="100%"
                style={{ border:0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="ct-map-strip">
              <span><i className="fa fa-clock" /> Sun–Fri · 9AM–4PM</span>
              <span><i className="fa fa-phone-alt" /> 01-4822227</span>
              <span><i className="fa fa-envelope" /> Email anytime</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section className="ct-faq sr">
        <div className="ct-container">
          <div className="ct-faq-head sr">
            <span className="section-tag">Quick Answers</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="ct-faq-grid">
            {FAQS.map(([q, a], i) => (
              <div key={i} className="ct-faq-card sr" style={{ '--delay':`${i*.1}s` }}>
                <div className="ct-faq-q"><i className="fa fa-question-circle" />{q}</div>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}