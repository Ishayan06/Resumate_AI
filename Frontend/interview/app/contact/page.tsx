'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const contactMethods = [
  {
    icon: '📧',
    title: 'Email Us',
    detail: 'hello@interviewai.dev',
    sub: 'We reply within 24 hours',
    href: 'mailto:hello@interviewai.dev',
  },
  {
    icon: '💬',
    title: 'Live Chat',
    detail: 'Available in-app',
    sub: 'Mon – Fri, 9am – 6pm IST',
    href: '#',
  },
  {
    icon: '🐦',
    title: 'Twitter / X',
    detail: '@InterviewAI',
    sub: 'DMs open for quick queries',
    href: 'https://twitter.com/InterviewAI',
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    detail: 'InterviewAI Official',
    sub: 'Follow for updates & tips',
    href: 'https://linkedin.com/company/interviewai',
  },
];

const faqs = [
  {
    q: 'Is InterviewAI completely free to start?',
    a: 'Yes — you can run your first 3 mock interviews at no cost, no credit card required. Upgrade anytime for unlimited sessions.',
  },
  {
    q: 'How does the resume-aware question generation work?',
    a: 'You upload your CV and our model extracts your skills, projects, and experience level to generate questions tailored specifically to your background.',
  },
  {
    q: 'What job roles are supported?',
    a: 'Over 200 roles across Software Engineering, Product Management, Data Science, Design, Finance, Marketing and more.',
  },
  {
    q: 'Is my resume data kept private?',
    a: 'Absolutely. All uploads are end-to-end encrypted and never shared with third parties. You can delete your data at any time.',
  },
  {
    q: 'Can I use InterviewAI on mobile?',
    a: 'Yes — the platform is fully responsive and works on any modern browser on phone, tablet or desktop.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

        .ct-root {
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
          overflow-x: hidden;
        }
        .ct-root *, .ct-root *::before, .ct-root *::after { box-sizing: border-box; }

        /* ── HERO ── */
        .ct-hero {
          min-height: 52vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 5rem 1.5rem 3rem;
          position: relative;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 100px; padding: 6px 16px;
          font-size: 0.75rem; color: #a5b4fc;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
        }
        .ct-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 6vw, 5rem);
          line-height: 1.08; color: #fff;
          letter-spacing: -0.02em; max-width: 700px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .ct-title em {
          font-style: italic;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ct-sub {
          max-width: 480px; margin-top: 1.4rem;
          font-size: 1rem; color: rgba(255,255,255,0.42);
          line-height: 1.72;
          animation: fadeUp 0.6s 0.2s ease both;
        }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.16; }
        .orb-1 { width: 380px; height: 380px; background: #6366f1; top: 0%; left: -8%; }
        .orb-2 { width: 280px; height: 280px; background: #8b5cf6; bottom: 5%; right: -4%; }

        /* ── CONTACT METHODS ── */
        .methods-section {
          max-width: 960px; margin: 0 auto 5rem; padding: 0 1.5rem;
        }
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media(min-width: 768px) { .methods-grid { grid-template-columns: repeat(4, 1fr); } }
        .method-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 1.6rem 1.2rem;
          text-align: center; text-decoration: none;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
        }
        .method-card:hover {
          border-color: rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.06);
          transform: translateY(-3px);
        }
        .method-icon {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.18));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
        }
        .method-title { font-size: 0.88rem; font-weight: 600; color: #fff; }
        .method-detail { font-size: 0.8rem; color: #a5b4fc; font-weight: 500; }
        .method-sub { font-size: 0.72rem; color: rgba(255,255,255,0.28); }

        /* ── MAIN CONTENT ── */
        .contact-body {
          max-width: 960px; margin: 0 auto; padding: 0 1.5rem 6rem;
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media(min-width: 768px) { .contact-body { grid-template-columns: 1fr 1fr; align-items: start; } }

        /* ── FORM ── */
        .form-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px; padding: 2.4rem 2rem;
        }
        .form-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; color: #fff; margin-bottom: 0.4rem;
        }
        .form-sub { font-size: 0.83rem; color: rgba(255,255,255,0.36); margin-bottom: 2rem; line-height: 1.6; }
        .field { margin-bottom: 1.2rem; }
        .field label { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.45); margin-bottom: 0.45rem; letter-spacing: 0.04em; text-transform: uppercase; }
        .field input, .field textarea, .field select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px; padding: 0.75rem 1rem;
          color: #e2e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }
        .field input:focus, .field textarea:focus, .field select:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
        }
        .field textarea { min-height: 120px; resize: vertical; }
        .field select option { background: #1e1b4b; color: #e2e8f0; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .submit-btn {
          width: 100%; padding: 0.9rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none; border-radius: 12px;
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer; margin-top: 0.5rem;
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(99,102,241,0.45); }
        .success-state {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 1rem; padding: 3rem 1rem;
          text-align: center;
        }
        .success-icon {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 20px; display: flex; align-items: center;
          justify-content: center; font-size: 2rem;
          box-shadow: 0 8px 28px rgba(99,102,241,0.4);
        }
        .success-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #fff; }
        .success-sub { font-size: 0.85rem; color: rgba(255,255,255,0.38); max-width: 260px; line-height: 1.6; }

        /* ── INFO SIDE ── */
        .info-side { display: flex; flex-direction: column; gap: 1.5rem; }

        .info-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 1.8rem;
        }
        .info-card-title { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: #818cf8; margin-bottom: 1rem; }
        .info-list { display: flex; flex-direction: column; gap: 0.9rem; }
        .info-row { display: flex; align-items: flex-start; gap: 12px; }
        .info-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          flex-shrink: 0; margin-top: 5px;
        }
        .info-row-title { font-size: 0.88rem; font-weight: 600; color: #fff; }
        .info-row-sub { font-size: 0.78rem; color: rgba(255,255,255,0.35); margin-top: 2px; }

        .office-card {
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.07));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 20px; padding: 1.8rem; position: relative; overflow: hidden;
        }
        .office-card::before {
          content: ''; position: absolute;
          top: -40px; right: -40px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);
          pointer-events: none;
        }
        .office-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: #818cf8; margin-bottom: 0.75rem; }
        .office-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem; }
        .office-addr { font-size: 0.83rem; color: rgba(255,255,255,0.38); line-height: 1.65; }
        .office-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.25);
          border-radius: 8px; padding: 4px 10px;
          font-size: 0.72rem; color: #a5b4fc; margin-top: 1rem;
        }
        .online-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; animation: blink 2s ease-in-out infinite; }

        /* ── FAQ ── */
        .faq-section { max-width: 720px; margin: 0 auto 6rem; padding: 0 1.5rem; }
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1.3rem 0;
        }
        .faq-q {
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; gap: 1rem;
        }
        .faq-q-text { font-size: 0.92rem; font-weight: 500; color: #fff; }
        .faq-chevron {
          width: 24px; height: 24px; border-radius: 8px;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; color: #a5b4fc; flex-shrink: 0;
          transition: transform 0.2s, background 0.2s;
        }
        .faq-chevron.open { transform: rotate(180deg); background: rgba(99,102,241,0.25); }
        .faq-a {
          font-size: 0.85rem; color: rgba(255,255,255,0.38);
          line-height: 1.7; max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.2s;
        }
        .faq-a.open { max-height: 200px; padding-top: 0.9rem; }

        /* ── CTA ── */
        .cta-section { max-width: 900px; margin: 0 auto 6rem; padding: 0 1.5rem; }
        .cta-card {
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 24px; padding: 3.5rem 2rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-card::before {
          content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);
          pointer-events: none;
        }
        .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 4vw, 2.4rem); color: #fff; letter-spacing: -0.02em; position: relative; }
        .cta-sub { font-size: 0.9rem; color: rgba(255,255,255,0.42); margin: 0.8rem auto 2rem; max-width: 440px; position: relative; }
        .btn-primary {
          padding: 0.8rem 1.8rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none; border-radius: 12px; color: #fff;
          font-size: 0.9rem; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
          transition: transform 0.15s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,0.45); }

        /* shared */
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-tag { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: #818cf8; margin-bottom: 0.75rem; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.6rem); color: #fff; letter-spacing: -0.02em; }
        .divider { width: 40px; height: 2px; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 2px; margin: 0.75rem auto 0; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
      `}</style>

      <div className="ct-root">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="hero-badge">✦ Get In Touch</div>
          <h1 className="ct-title">
            We&apos;d love to<br /><em>hear from you.</em>
          </h1>
          <p className="ct-sub">
            Whether you have a question, a bug to report, or just want to say hello —
            our team is here and responds fast.
          </p>
        </section>

        {/* ── CONTACT METHODS ── */}
        <section className="methods-section reveal">
          <div className="methods-grid">
            {contactMethods.map((m, i) => (
              <a href={m.href} key={i} className={`method-card reveal reveal-delay-${i + 1}`} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                <div className="method-icon">{m.icon}</div>
                <div className="method-title">{m.title}</div>
                <div className="method-detail">{m.detail}</div>
                <div className="method-sub">{m.sub}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FORM + INFO ── */}
        <div className="contact-body">

          {/* Form */}
          <div className="form-wrap reveal">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">✅</div>
                <div className="success-title">Message sent!</div>
                <p className="success-sub">Thanks {form.name}! We'll get back to you at {form.email} within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-heading">Send a message</div>
                <p className="form-sub">Fill in the details below and we'll be in touch shortly.</p>

                <div className="field-row">
                  <div className="field">
                    <label>Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Aryan Mehta" />
                  </div>
                  <div className="field">
                    <label>Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="aryan@email.com" />
                  </div>
                </div>

                <div className="field">
                  <label>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Select a topic…</option>
                    <option>General Question</option>
                    <option>Bug Report</option>
                    <option>Billing & Subscription</option>
                    <option>Feature Request</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="field">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what's on your mind…" />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                  Send Message →
                </button>
              </>
            )}
          </div>

          {/* Info side */}
          <div className="info-side">

            <div className="info-card reveal reveal-delay-1">
              <div className="info-card-title">✦ Support Hours</div>
              <div className="info-list">
                {[
                  { title: 'Email Support', sub: 'Mon – Sun · Reply within 24 hrs' },
                  { title: 'Live Chat', sub: 'Mon – Fri · 9:00am – 6:00pm IST' },
                  { title: 'Critical Issues', sub: 'Always on · P0 response in 2 hrs' },
                ].map((r, i) => (
                  <div className="info-row" key={i}>
                    <div className="info-dot" />
                    <div>
                      <div className="info-row-title">{r.title}</div>
                      <div className="info-row-sub">{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="office-card reveal reveal-delay-2">
              <div className="office-label">✦ Headquarters</div>
              <div className="office-name">InterviewAI, Inc.</div>
              <div className="office-addr">
                91 Springboard, Koramangala<br />
                Bengaluru, Karnataka 560095<br />
                India
              </div>
              <div className="office-badge">
                <span className="online-dot" />
                Fully remote-friendly team
              </div>
            </div>

            <div className="info-card reveal reveal-delay-3">
              <div className="info-card-title">✦ Quick Links</div>
              <div className="info-list">
                {[
                  { title: 'Help Center', sub: 'Browse 80+ support articles', href: '#' },
                  { title: 'System Status', sub: 'Live uptime & incident updates', href: '#' },
                  { title: 'Privacy Policy', sub: 'How we handle your data', href: '#' },
                  { title: 'Terms of Service', sub: 'Usage terms & conditions', href: '#' },
                ].map((r, i) => (
                  <a href={r.href} key={i} className="info-row" style={{ textDecoration: 'none' }}>
                    <div className="info-dot" />
                    <div>
                      <div className="info-row-title">{r.title}</div>
                      <div className="info-row-sub">{r.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── FAQ ── */}
        <section className="faq-section">
          <div className="section-header reveal">
            <div className="section-tag">✦ FAQ</div>
            <h2 className="section-title">Common questions</h2>
            <div className="divider" />
          </div>
          {faqs.map((faq, i) => (
            <div className="faq-item reveal" key={i}>
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="faq-q-text">{faq.q}</span>
                <span className={`faq-chevron${openFaq === i ? ' open' : ''}`}>▾</span>
              </div>
              <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{faq.a}</div>
            </div>
          ))}
        </section>

        {/* ── CTA ── */}
        <section className="cta-section reveal">
          <div className="cta-card">
            <h2 className="cta-title">Ready to start practicing?</h2>
            <p className="cta-sub">Join thousands of candidates preparing smarter with InterviewAI — free to start, no card needed.</p>
            <Link href="/register" className="btn-primary">Create Free Account →</Link>
          </div>
        </section>

      </div>
    </>
  );
}