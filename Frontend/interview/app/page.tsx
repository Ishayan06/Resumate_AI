'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import TextType from '@/components/TextType';

export default function Home() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  if (authenticated) {
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center gap-10 px-6 text-center pt-32 pb-32" style={{ minWidth: 'min(90vw, 700px)' }}>

        {/* Typing headline */}
        <div className="w-full min-h-[80px] flex items-center justify-center">
        <TextType
          text={['Want to test your skills?', "Think you're interview-ready?", "Prove what you're made of."]}
          as="h1"
          typingSpeed={55}
          deletingSpeed={30}
          pauseDuration={2200}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
          cursorBlinkDuration={0.45}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          cursorClassName="text-indigo-400"
          style={{ fontFamily: "'Sora', sans-serif" }}
        />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">

          {/* Primary - Start Interview */}
          <Link
            href="/interview"
            className="cursor-target group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="absolute inset-0 rounded-full border border-indigo-500/50 bg-indigo-600/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-indigo-500/30 group-hover:border-indigo-400/80" />
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: '0 0 32px 4px rgba(99,102,241,0.35)' }}
            />
            <span className="relative z-10 flex h-5 w-5 items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-indigo-300 transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="relative z-10">Start Interview</span>
          </Link>

          {/* Secondary - Learn More */}
          <Link
            href="/about"
            className="cursor-target group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white/60 transition-all duration-300 hover:text-white"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="absolute inset-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20" />
            <span className="relative z-10">Learn More</span>
            <span className="relative z-10 flex h-5 w-5 items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white/70">
                <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

        </div>

      </div>

      {/* ── How It Works ── */}
      <section className="w-full max-w-6xl px-6 py-32 flex flex-col items-center gap-20">

        {/* Section header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-indigo-400/60" style={{ fontFamily: "'DM Mono', monospace" }}>
              The Process
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">works</span>
          </h2>
        </div>

        {/* Steps — alternating layout */}
        <div className="flex flex-col gap-6 w-full">
          {[
            {
              step: '01',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-indigo-300">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Upload Your Resume',
              desc: 'Drop your resume and let the AI scan your experience, skills, and role to personalise every single question for you.',
              detail: 'Supports PDF & DOCX',
            },
            {
              step: '02',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-indigo-300">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Answer in Real Time',
              desc: 'Speak or type your answers under timed conditions — just like a real interview room, no preparation needed.',
              detail: 'Voice + Text supported',
            },
            {
              step: '03',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-indigo-300">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Get Instant AI Feedback',
              desc: 'Receive detailed scoring, keyword analysis, and sharp actionable tips to improve your answers immediately.',
              detail: 'Score + Suggestions',
            },
          ].map(({ step, icon, title, desc, detail }, i) => (
            <div
              key={step}
              className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-8 rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/20 hover:bg-indigo-500/[0.04] ${i % 2 !== 0 ? 'sm:flex-row-reverse' : ''}`}
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)' }}
              />

              {/* Icon block */}
              <div className="relative flex-shrink-0 flex items-center justify-center h-24 w-24 rounded-2xl border border-indigo-500/20 bg-indigo-600/10">
                {icon}
                {/* Step number badge */}
                <span
                  className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[11px] font-bold text-white shadow-lg shadow-indigo-500/30"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {step}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {title}
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-0.5 text-[10px] uppercase tracking-widest text-indigo-400/70"
                    style={{ fontFamily: "'DM Mono', monospace" }}>
                    {detail}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/40 max-w-lg" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {desc}
                </p>
              </div>

              {/* Arrow connector (not last) */}
              {i < 2 && (
                <div className="hidden sm:flex absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 h-8 w-8 items-center justify-center rounded-full border border-indigo-500/20 bg-[#0d0d14]">
                  <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-indigo-400">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="w-full max-w-6xl px-6 pb-40 flex flex-col items-center gap-20">

        {/* Section header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-indigo-400/60" style={{ fontFamily: "'DM Mono', monospace" }}>
              Why Use Us
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">ace it</span>
          </h2>
          <p className="text-sm text-white/30 max-w-md" style={{ fontFamily: "'DM Mono', monospace" }}>
            Built for developers, designers, and everyone in between. No fluff, no filler.
          </p>
        </div>

        {/* Cards grid — mixed sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-indigo-300">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              tag: 'Voice Mode',
              title: 'Speak Your Answers',
              desc: 'Record responses out loud. Practice the real thing, not just typing.',
              accent: 'from-indigo-500/20 to-violet-500/10',
              large: true,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-violet-300">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              tag: 'Personalised',
              title: 'Resume-Tailored Questions',
              desc: 'Every question built from your actual experience.',
              accent: 'from-violet-500/20 to-indigo-500/10',
              large: false,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-sky-300">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              tag: 'Instant',
              title: 'AI Feedback in Seconds',
              desc: 'Get scored immediately with improvement tips.',
              accent: 'from-sky-500/20 to-indigo-500/10',
              large: false,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-emerald-300">
                  <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              tag: 'Multi-Domain',
              title: 'All Roles Covered',
              desc: 'Frontend, Backend, DSA, System Design, Behavioural — pick your track.',
              accent: 'from-emerald-500/20 to-indigo-500/10',
              large: false,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-amber-300">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              tag: 'Progress',
              title: 'Track Your Growth',
              desc: 'See your scores improve over sessions. Know exactly where you stand.',
              accent: 'from-amber-500/20 to-indigo-500/10',
              large: false,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-rose-300">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              tag: 'Timed',
              title: 'Real Interview Pressure',
              desc: 'Countdown timers simulate actual interview conditions.',
              accent: 'from-rose-500/20 to-indigo-500/10',
              large: true,
            },
          ].map(({ icon, tag, title, desc, accent, large }) => (
            <div
              key={title}
              className={`group relative flex flex-col gap-5 rounded-2xl border border-white/5 p-7 backdrop-blur-sm overflow-hidden transition-all duration-400 hover:border-white/10 hover:-translate-y-0.5 ${large ? 'sm:col-span-1' : ''}`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60 transition-opacity duration-400 group-hover:opacity-100`} />

              {/* Top row */}
              <div className="relative flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  {icon}
                </div>
                <span
                  className="text-[9px] uppercase tracking-[0.2em] text-white/30 mt-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {tag}
                </span>
              </div>

              {/* Content */}
              <div className="relative flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-white/35" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {desc}
                </p>
              </div>

              {/* Bottom arrow */}
              <div className="relative flex items-center gap-2 mt-auto">
                <div className="h-px flex-1 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-white/20 group-hover:text-white/40 transition-colors duration-300 group-hover:translate-x-0.5 transform">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-indigo-500/15 bg-indigo-500/5 px-10 py-8">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-base font-semibold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Ready to start practicing?</p>
            <p className="text-xs text-white/30" style={{ fontFamily: "'DM Mono', monospace" }}>Join thousands already sharpening their skills.</p>
          </div>
          <Link
            href="/register"
            className="cursor-target group relative inline-flex items-center gap-3 rounded-full border border-indigo-500/40 bg-indigo-600/20 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:bg-indigo-500/30 hover:border-indigo-400/70 flex-shrink-0"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Get Started Free
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-indigo-300 transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </section>


    </main>
  );
}