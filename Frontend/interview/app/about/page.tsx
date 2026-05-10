'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const stats = [
  { value: '50K+', label: 'Interviews Conducted' },
  { value: '94%', label: 'Success Rate' },
  { value: '200+', label: 'Job Roles Covered' },
  { value: '4.9★', label: 'Average Rating' },
];

const features = [
  {
    icon: '🧠',
    title: 'AI-Powered Questions',
    desc: 'Our model analyzes your resume and generates role-specific questions tailored to your exact experience level.',
  },
  {
    icon: '📄',
    title: 'Resume Intelligence',
    desc: 'Upload your CV and watch the system extract your skills, projects, and gaps to craft a personalized interview.',
  },
  {
    icon: '📊',
    title: 'Instant Feedback',
    desc: 'Every answer is evaluated for clarity, depth, and relevance — giving you a score and improvement tips.',
  },
  {
    icon: '🔁',
    title: 'Unlimited Practice',
    desc: 'Run as many mock interviews as you need. Each session is unique, adapting to your improving responses.',
  },
  {
    icon: '🎯',
    title: 'Role Targeting',
    desc: 'From SWE to product management, finance to design — we tailor the difficulty and domain to your target role.',
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'Your resume and interview data are encrypted and never shared. Your preparation stays yours alone.',
  },
];

const team = [
  { name: 'Aryan Mehta', role: 'Founder & AI Lead', emoji: '👨‍💻' },
  { name: 'Priya Sharma', role: 'Product Designer', emoji: '👩‍🎨' },
  { name: 'Rohan Das', role: 'Backend Engineer', emoji: '👨‍🔧' },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

        .about-root {
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
          overflow-x: hidden;
        }
        .about-root *, .about-root *::before, .about-root *::after {
          box-sizing: border-box;
        }

        /* ── HERO ── */
        .hero {
          min-height: 75vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 1.5rem 3rem;
          position: relative;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.75rem;
          color: #a5b4fc;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 1.08;
          color: #fff;
          letter-spacing: -0.02em;
          max-width: 820px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .hero-title em {
          font-style: italic;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          max-width: 560px;
          margin-top: 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          animation: fadeUp 0.6s 0.2s ease both;
        }
        .hero-cta {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.6s 0.3s ease both;
        }
        .btn-primary {
          padding: 0.8rem 1.8rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,0.45); }
        .btn-ghost {
          padding: 0.8rem 1.8rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }

        /* floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.18;
        }
        .orb-1 { width: 400px; height: 400px; background: #6366f1; top: 5%; left: -10%; }
        .orb-2 { width: 300px; height: 300px; background: #8b5cf6; bottom: 10%; right: -5%; }

        /* ── STATS ── */
        .stats-section {
          padding: 3rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
        }
        @media(min-width: 640px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .stat-cell {
          padding: 2rem 1.5rem;
          background: rgba(255,255,255,0.02);
          text-align: center;
          transition: background 0.2s;
        }
        .stat-cell:hover { background: rgba(99,102,241,0.07); }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #fff;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.5rem;
        }

        /* ── MISSION ── */
        .mission-section {
          max-width: 900px;
          margin: 4rem auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media(min-width: 768px) { .mission-section { grid-template-columns: 1fr 1fr; align-items: center; } }
        .mission-tag {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #818cf8;
          margin-bottom: 1rem;
        }
        .mission-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .mission-body {
          margin-top: 1.2rem;
          font-size: 0.93rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
        }
        .mission-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .mission-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 12px;
          padding: 0.9rem 1.1rem;
        }
        .mission-pill-icon { font-size: 1.4rem; }
        .mission-pill-text { font-size: 0.85rem; color: rgba(255,255,255,0.65); line-height: 1.4; }
        .mission-pill-text strong { color: #fff; display: block; font-size: 0.9rem; }

        /* ── FEATURES ── */
        .features-section {
          max-width: 1000px;
          margin: 5rem auto;
          padding: 0 1.5rem;
        }
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-tag {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #818cf8;
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #fff;
          letter-spacing: -0.02em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media(min-width: 640px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width: 900px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }
        .feature-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 1.6rem;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          border-color: rgba(99,102,241,0.3);
          background: rgba(99,102,241,0.05);
          transform: translateY(-3px);
        }
        .feature-icon {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          display: block;
        }
        .feature-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .feature-desc {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
        }

        /* ── TEAM ── */
        .team-section {
          max-width: 700px;
          margin: 5rem auto;
          padding: 0 1.5rem;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 2.5rem;
        }
        .team-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 1.8rem 1.2rem;
          text-align: center;
          transition: border-color 0.2s, transform 0.2s;
        }
        .team-card:hover {
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-3px);
        }
        .team-avatar {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1rem;
          box-shadow: 0 6px 20px rgba(99,102,241,0.3);
        }
        .team-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: #fff;
        }
        .team-role {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          margin-top: 0.3rem;
        }

        /* ── CTA BANNER ── */
        .cta-section {
          max-width: 900px;
          margin: 4rem auto 6rem;
          padding: 0 1.5rem;
        }
        .cta-card {
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 24px;
          padding: 3.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-card::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          color: #fff;
          letter-spacing: -0.02em;
          position: relative;
        }
        .cta-sub {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.45);
          margin: 0.8rem auto 2rem;
          max-width: 440px;
          position: relative;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        .divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 2px;
          margin: 1rem 0;
        }
      `}</style>

      <div className="about-root">

        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="hero-badge">✦ About InterviewAI</div>
          <h1 className="hero-title">
            We help you walk in<br /><em>confident.</em>
          </h1>
          <p className="hero-sub">
            InterviewAI is an AI-powered mock interview platform that studies your resume
            and runs personalized interview sessions — so you're never caught off guard.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn-primary">Start for Free →</Link>
            {/* <Link href="/login" className="btn-ghost">Sign In</Link> */}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-section reveal">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-cell" key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MISSION ── */}
        <section className="mission-section">
          <div className="reveal">
            <div className="mission-tag">✦ Our Mission</div>
            <h2 className="mission-title">Built for the nervous, the ambitious, the ready.</h2>
            <div className="divider" />
            <p className="mission-body">
              Most people fail interviews not because they lack skill — but because they lack
              practice. We built InterviewAI to close that gap. Upload your resume, pick your
              role, and get grilled by an AI that knows your background inside out.
            </p>
          </div>
          <div className="mission-card reveal reveal-delay-1">
            <div className="mission-pill">
              <span className="mission-pill-icon">📄</span>
              <div className="mission-pill-text">
                <strong>Resume-Aware AI</strong>
                Questions built directly from your experience
              </div>
            </div>
            <div className="mission-pill">
              <span className="mission-pill-icon">⚡</span>
              <div className="mission-pill-text">
                <strong>Real-Time Evaluation</strong>
                Instant scoring on every answer you give
              </div>
            </div>
            <div className="mission-pill">
              <span className="mission-pill-icon">🔄</span>
              <div className="mission-pill-text">
                <strong>Iterative Practice</strong>
                Each session gets harder as you improve
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="features-section">
          <div className="section-header reveal">
            <div className="section-tag">✦ What We Offer</div>
            <h2 className="section-title">Everything you need to prepare</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className={`feature-card reveal reveal-delay-${(i % 3) + 1}`} key={i}>
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        {/* <section className="team-section">
          <div className="section-header reveal">
            <div className="section-tag">✦ The Team</div>
            <h2 className="section-title">Made by people who've been there</h2>
          </div>
          <div className="team-grid">
            {team.map((t, i) => (
              <div className={`team-card reveal reveal-delay-${i + 1}`} key={i}>
                <div className="team-avatar">{t.emoji}</div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── CTA ── */}
        <section className="cta-section reveal">
          <div className="cta-card">
            <h2 className="cta-title">Your next interview starts here.</h2>
            <p className="cta-sub">Join thousands of candidates who practice smarter and land offers faster.</p>
            <Link href="/register" className="btn-primary">Create Free Account →</Link>
          </div>
        </section>

      </div>
    </>
  );
}