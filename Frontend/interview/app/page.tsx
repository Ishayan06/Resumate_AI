'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import TextType from '@/components/TextType';

/* ─── STYLES ─── */
const HOME_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --hp-accent:   #7c6dfa;
    --hp-accent2:  #a78bfa;
    --hp-accent3:  #34d399;
    --hp-text:     #f0eeff;
    --hp-muted:    #7e7a9a;
    --hp-border:   rgba(255,255,255,0.07);
    --hp-border-h: rgba(255,255,255,0.14);
    --hp-card-bg:  rgba(124,109,250,0.08);
    --hp-card-bd:  rgba(124,109,250,0.18);
    --hp-card-sh:  rgba(124,109,250,0.35);
  }

  .hp *, .hp *::before, .hp *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .hp {
    font-family: 'DM Sans', sans-serif;
    color: var(--hp-text);
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }

  /* ── Background grid ── */
  .hp-grid {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(124,109,250,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,109,250,0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 60% at 50% 10%, black 20%, transparent 75%);
  }

  /* ── Orbs ── */
  .hp-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
  .hp-orb-a {
    width: clamp(300px, 50vw, 700px); height: clamp(300px, 50vw, 700px);
    top: -20%; left: -10%;
    background: radial-gradient(circle, rgba(124,109,250,0.15) 0%, transparent 68%);
    filter: blur(80px);
    animation: hpFloat1 20s ease-in-out infinite;
  }
  .hp-orb-b {
    width: clamp(220px, 35vw, 520px); height: clamp(220px, 35vw, 520px);
    top: 38%; right: -10%;
    background: radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 68%);
    filter: blur(70px);
    animation: hpFloat2 25s ease-in-out infinite;
  }
  .hp-orb-c {
    display: none; /* hide on mobile for perf */
  }
  @media (min-width: 768px) {
    .hp-orb-c {
      display: block;
      width: 420px; height: 420px;
      bottom: 8%; left: 18%;
      background: radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 68%);
      filter: blur(70px);
      animation: hpFloat3 30s ease-in-out infinite;
    }
  }
  @keyframes hpFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,50px)} }
  @keyframes hpFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,-40px)} }
  @keyframes hpFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,-30px)} }

  /* ── Noise ── */
  .hp-noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .hp-z { position: relative; z-index: 1; }

  /* ─── HERO ─── */
  .hp-hero {
    min-height: 100svh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    padding: clamp(80px, 12vw, 120px) clamp(16px, 5vw, 32px) clamp(60px, 8vw, 100px);
  }

  /* Eyebrow pill */
  .hp-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Syne', sans-serif; font-size: clamp(9px, 2vw, 11px); font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--hp-accent2);
    padding: 7px 16px; border: 1px solid rgba(124,109,250,0.28);
    border-radius: 999px; background: rgba(124,109,250,0.09);
    margin-bottom: clamp(20px, 4vw, 36px);
    animation: hpFadeUp 0.7s 0.1s cubic-bezier(.22,.68,0,1.2) both;
    white-space: nowrap;
  }
  .hp-eyebrow-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
    background: var(--hp-accent3); box-shadow: 0 0 8px var(--hp-accent3);
    animation: hpPulse 2.2s ease-in-out infinite;
  }
  @keyframes hpPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }

  /* Typing headline */
  .hp-typing-wrap {
    width: 100%;
    min-height: clamp(56px, 10vw, 96px);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 6px;
    animation: hpFadeUp 0.7s 0.2s cubic-bezier(.22,.68,0,1.2) both;
    overflow: hidden;
  }

  /* Sub headline */
  .hp-sub-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(24px, 5vw, 58px);
    font-weight: 800; letter-spacing: -0.03em; line-height: 1.07;
    margin-bottom: clamp(18px, 3vw, 26px);
    animation: hpFadeUp 0.7s 0.3s cubic-bezier(.22,.68,0,1.2) both;
    width: 100%;
    word-break: break-word;
  }
  .hp-sub-headline .w-outline {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(167,139,250,0.5);
  }
  .hp-sub-headline .w-grad {
    background: linear-gradient(118deg, #a5b4fc 0%, #7c6dfa 48%, #c084fc 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .hp-hero-desc {
    font-size: clamp(13px, 2.5vw, 16px); font-weight: 300; color: var(--hp-muted);
    max-width: 470px; line-height: 1.75;
    margin-bottom: clamp(28px, 5vw, 48px);
    animation: hpFadeUp 0.7s 0.4s cubic-bezier(.22,.68,0,1.2) both;
    padding: 0 8px;
  }

  /* Buttons */
  .hp-cta-row {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;
    animation: hpFadeUp 0.7s 0.5s cubic-bezier(.22,.68,0,1.2) both;
    width: 100%;
    padding: 0 8px;
  }
  .hp-btn-p {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--hp-accent); color: #fff; text-decoration: none;
    padding: clamp(12px, 2vw, 15px) clamp(22px, 4vw, 34px);
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif; font-size: clamp(13px, 2vw, 14px); font-weight: 500;
    cursor: pointer; border: none;
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
    position: relative; overflow: hidden;
    box-shadow: 0 8px 32px rgba(124,109,250,0.42);
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .hp-btn-p::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 60%);
    pointer-events: none;
  }
  .hp-btn-p:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(124,109,250,0.55); background: #8b7dfb; }
  .hp-btn-s {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--hp-text); text-decoration: none;
    padding: clamp(11px, 2vw, 14px) clamp(18px, 3vw, 28px);
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif; font-size: clamp(13px, 2vw, 14px); font-weight: 500;
    border: 1px solid var(--hp-border-h); transition: all 0.22s ease;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .hp-btn-s:hover { border-color: var(--hp-accent); color: var(--hp-accent2); background: rgba(124,109,250,0.09); }

  /* Scroll hint — hide on mobile */
  .hp-scroll {
    position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.16);
    animation: hpFadeUp 1.2s 1s ease both;
  }
  @media (max-width: 480px) { .hp-scroll { display: none; } }
  .hp-scroll-bar {
    width: 1px; height: 38px;
    background: linear-gradient(to bottom, rgba(124,109,250,0.7), transparent);
    animation: hpScroll 2.2s ease-in-out infinite;
  }
  @keyframes hpScroll {
    0%   { transform: scaleY(0); transform-origin: top; }
    49%  { transform: scaleY(1); transform-origin: top; }
    50%  { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }

  /* ─── TICKER ─── */
  .hp-ticker-outer {
    border-top: 1px solid var(--hp-border);
    border-bottom: 1px solid var(--hp-border);
    background: rgba(124,109,250,0.04);
    overflow: hidden; padding: 16px 0;
    width: 100%;
  }
  .hp-ticker-track {
    display: flex; width: max-content;
    animation: hpTick 28s linear infinite;
    will-change: transform;
  }
  .hp-ti { display: flex; align-items: center; gap: 10px; padding: 0 40px; white-space: nowrap; }
  .hp-ti-val { font-family: 'Syne', sans-serif; font-size: clamp(14px,2vw,17px); font-weight: 800; color: var(--hp-accent2); }
  .hp-ti-sep { width: 4px; height: 4px; border-radius: 50%; background: rgba(124,109,250,0.4); flex-shrink: 0; }
  .hp-ti-lbl { font-family: 'DM Mono', monospace; font-size: clamp(9px,1.5vw,10px); letter-spacing: 0.13em; text-transform: uppercase; color: var(--hp-muted); }
  @keyframes hpTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ─── PLACEMENT SECTION ─── */
  .hp-place { padding: clamp(60px,8vw,120px) clamp(16px,5vw,32px); }
  .hp-place-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: center;
  }
  @media(max-width:860px){ .hp-place-inner{grid-template-columns:1fr;gap:40px} }

  .hp-sec-tag {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--hp-accent2);
    margin-bottom: 18px;
  }
  .hp-sec-tag .tl { width: 18px; height: 1px; background: var(--hp-accent2); display: inline-block; flex-shrink: 0; }

  .hp-place-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(26px,4vw,52px);
    font-weight: 800; letter-spacing: -0.03em; line-height: 1.06;
    margin-bottom: 18px;
    word-break: break-word;
  }
  .hp-place-title .tw-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(167,139,250,0.5); }
  .hp-place-title .tw-grad {
    background: linear-gradient(118deg, #a5b4fc, #7c6dfa, #c084fc);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hp-place-desc { font-size: clamp(13px,2vw,15px); font-weight: 300; color: var(--hp-muted); line-height: 1.75; margin-bottom: 28px; max-width: 420px; }
  .hp-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .hp-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: 999px;
    border: 1px solid rgba(124,109,250,0.22); background: rgba(124,109,250,0.07);
  }
  .hp-pill-v { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--hp-accent2); }
  .hp-pill-sep { width: 1px; height: 12px; background: rgba(255,255,255,0.1); }
  .hp-pill-l { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--hp-muted); }

  /* Feat mini cards */
  .hp-feats { display: flex; flex-direction: column; gap: 10px; }
  .hp-fc {
    background: var(--hp-card-bg); border: 1px solid var(--hp-card-bd);
    border-radius: 16px; padding: 16px 18px;
    display: flex; align-items: center; gap: 14px;
    position: relative; overflow: hidden;
    transition: all 0.25s ease;
  }
  .hp-fc::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--hp-card-sh), transparent);
    pointer-events: none;
  }
  .hp-fc:hover { border-color: rgba(124,109,250,0.38); transform: translateX(5px); }
  .hp-fc-icon {
    width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
    background: rgba(124,109,250,0.13); border: 1px solid rgba(124,109,250,0.22);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; transition: all 0.25s ease;
  }
  .hp-fc:hover .hp-fc-icon { background: rgba(124,109,250,0.24); transform: scale(1.06); }
  .hp-fc-name { font-family: 'Syne', sans-serif; font-size: clamp(12px,2vw,14px); font-weight: 700; margin-bottom: 2px; }
  .hp-fc-desc { font-size: clamp(11px,1.8vw,12px); font-weight: 300; color: var(--hp-muted); line-height: 1.5; }
  .hp-fc-arr { margin-left: auto; color: rgba(124,109,250,0.38); flex-shrink: 0; transition: all 0.2s ease; }
  .hp-fc:hover .hp-fc-arr { color: var(--hp-accent2); transform: translateX(4px); }

  /* ─── HOW IT WORKS ─── */
  .hp-how { padding: clamp(60px,8vw,100px) clamp(16px,5vw,32px); }
  .hp-sec-hdr { text-align: center; margin-bottom: clamp(36px,5vw,64px); }
  .hp-sec-title {
    font-family: 'Syne', sans-serif; font-size: clamp(22px,3.2vw,42px);
    font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px;
  }
  .hp-sec-title em {
    font-style: normal;
    background: linear-gradient(118deg, #a5b4fc, #7c6dfa);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hp-sec-sub { font-size: clamp(12px,2vw,14px); font-weight: 300; color: var(--hp-muted); }

  .hp-steps-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 18px;
    position: relative;
  }
  @media(max-width:720px){ .hp-steps-grid{grid-template-columns:1fr;gap:14px} }
  @media(min-width:721px) and (max-width:960px){ .hp-steps-grid{grid-template-columns:repeat(2,1fr)} }

  .hp-step {
    background: var(--hp-card-bg); border: 1px solid var(--hp-card-bd);
    border-radius: 20px; padding: clamp(20px,3vw,32px) clamp(18px,2.5vw,28px);
    position: relative; overflow: hidden;
    transition: all 0.3s ease;
  }
  .hp-step::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--hp-card-sh), transparent);
    pointer-events: none;
  }
  .hp-step:hover { border-color: rgba(124,109,250,0.38); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(124,109,250,0.12); }
  .hp-step-num {
    font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; color: var(--hp-accent);
    background: rgba(124,109,250,0.14); border-radius: 7px;
    padding: 3px 9px; display: inline-block; margin-bottom: 16px;
  }
  .hp-step-ico {
    width: 48px; height: 48px; border-radius: 14px;
    background: rgba(124,109,250,0.11); border: 1px solid rgba(124,109,250,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 16px; transition: all 0.3s ease;
  }
  .hp-step:hover .hp-step-ico { background: rgba(124,109,250,0.22); transform: scale(1.07); }
  .hp-step-title { font-family: 'Syne', sans-serif; font-size: clamp(15px,2vw,18px); font-weight: 700; margin-bottom: 8px; }
  .hp-step-desc { font-size: clamp(12px,1.8vw,13px); font-weight: 300; color: var(--hp-muted); line-height: 1.65; margin-bottom: 16px; }
  .hp-step-badge {
    font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--hp-accent);
    background: rgba(124,109,250,0.1); border: 1px solid rgba(124,109,250,0.22);
    padding: 4px 11px; border-radius: 999px; display: inline-block;
  }

  /* ─── FEATURE CARDS ─── */
  .hp-feat-sec { padding: clamp(60px,8vw,100px) clamp(16px,5vw,32px); }
  .hp-feat-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 14px;
  }
  @media(max-width:860px){ .hp-feat-grid{grid-template-columns:repeat(2,1fr)} }
  @media(max-width:520px){ .hp-feat-grid{grid-template-columns:1fr} }

  .hp-fcard {
    background: var(--hp-card-bg); border: 1px solid var(--hp-card-bd);
    border-radius: 18px; padding: clamp(18px,2.5vw,28px);
    position: relative; overflow: hidden;
    transition: all 0.3s ease;
  }
  .hp-fcard::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--hp-card-sh), transparent);
    pointer-events: none;
  }
  .hp-fcard:hover { border-color: rgba(124,109,250,0.38); transform: translateY(-4px); box-shadow: 0 18px 44px rgba(124,109,250,0.11); }
  .hp-fcard-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
  .hp-fcard-ico {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(124,109,250,0.12); border: 1px solid rgba(124,109,250,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
    transition: all 0.25s ease;
  }
  .hp-fcard:hover .hp-fcard-ico { background: rgba(124,109,250,0.24); transform: scale(1.06); }
  .hp-fcard-tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--hp-muted); padding-top: 2px; }
  .hp-fcard-title { font-family: 'Syne', sans-serif; font-size: clamp(13px,2vw,15px); font-weight: 700; margin-bottom: 7px; line-height: 1.3; }
  .hp-fcard-desc { font-size: clamp(11px,1.8vw,12px); font-weight: 300; color: var(--hp-muted); line-height: 1.6; margin-bottom: 16px; }
  .hp-fcard-foot { display: flex; align-items: center; gap: 8px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05); }
  .hp-fcard-line { flex: 1; height: 1px; background: rgba(124,109,250,0.14); }
  .hp-fcard-arr { color: rgba(124,109,250,0.35); transition: all 0.2s ease; }
  .hp-fcard:hover .hp-fcard-arr { color: var(--hp-accent2); transform: translateX(3px); }

  /* ─── BOTTOM CTA ─── */
  .hp-cta { padding: clamp(40px,6vw,60px) clamp(16px,5vw,32px) clamp(60px,8vw,120px); }
  .hp-cta-box {
    max-width: 1200px; margin: 0 auto;
    background: var(--hp-card-bg); border: 1px solid var(--hp-card-bd);
    border-radius: 24px; padding: clamp(40px,6vw,72px) clamp(20px,5vw,64px);
    text-align: center; position: relative; overflow: hidden;
  }
  .hp-cta-box::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--hp-card-sh), transparent);
    pointer-events: none;
  }
  .hp-cta-box::after {
    content: ''; position: absolute;
    bottom: -80px; left: 50%; transform: translateX(-50%);
    width: 400px; height: 240px;
    background: radial-gradient(ellipse, rgba(124,109,250,0.16) 0%, transparent 70%);
    pointer-events: none;
  }
  .hp-cta-title {
    font-family: 'Syne', sans-serif; font-size: clamp(22px,3.5vw,44px);
    font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px;
    word-break: break-word;
  }
  .hp-cta-title em {
    font-style: normal;
    background: linear-gradient(118deg, #a5b4fc, #7c6dfa, #c084fc);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hp-cta-sub { font-size: clamp(12px,2vw,15px); font-weight: 300; color: var(--hp-muted); margin-bottom: 36px; }
  .hp-cta-btns { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }

  /* ─── SCROLL REVEAL ─── */
  .hp-rv { opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(.22,.68,0,1.2), transform 0.6s cubic-bezier(.22,.68,0,1.2); }
  .hp-rv.hp-vis { opacity: 1; transform: translateY(0); }
  .hp-d1 { transition-delay: 0.08s; }
  .hp-d2 { transition-delay: 0.18s; }
  .hp-d3 { transition-delay: 0.28s; }

  /* ─── KEYFRAMES ─── */
  @keyframes hpFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  /* ─── PREVENT OVERFLOW ─── */
  .hp, .hp * { max-width: 100%; }
  img, video, svg { max-width: 100%; height: auto; }

  /* ─── REDUCE MOTION ─── */
  @media (prefers-reduced-motion: reduce) {
    .hp-rv, .hp-eyebrow, .hp-typing-wrap, .hp-sub-headline, .hp-hero-desc, .hp-cta-row { animation: none; opacity: 1; transform: none; }
    .hp-orb-a, .hp-orb-b, .hp-orb-c { animation: none; }
    .hp-ticker-track { animation: none; }
  }
`;

/* ─── SCROLL REVEAL ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hp-rv');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('hp-vis'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── DATA ─── */
const TICKER = [
  { v: '12,000+', l: 'Mock Interviews' },
  { v: '94%', l: 'Score Improvement' },
  { v: '6 AI Tools', l: 'All-in-One' },
  { v: '4.9 ★', l: 'Average Rating' },
  { v: 'Free', l: 'To Start' },
  { v: '50ms', l: 'AI Response' },
  { v: '3 Min', l: 'Setup Time' },
  { v: '24/7', l: 'Available' },
];

const FEATS = [
  { icon: '🎙️', name: 'AI Interview Simulator', desc: 'Adaptive questions personalised from your resume and role.' },
  { icon: '📄', name: 'Resume ATS Analyzer', desc: 'Instant score with strengths, gaps, and keyword fixes.' },
  { icon: '🗺️', name: 'Learning Roadmaps', desc: 'DSA, Full Stack, AI/ML — curated paths for every track.' },
  { icon: '📊', name: 'DSA Heatmap + XP', desc: 'Streak calendar, XP points, and milestone badges.' },
  { icon: '🧠', name: 'Communication Coach', desc: 'Daily 5-min sessions to eliminate filler words.' },
];

const STEPS = [
  { num: '01', icon: '📄', title: 'Upload Your Resume', desc: 'Drop your PDF or DOCX. Our AI scans your experience and builds a fully personalised question bank just for you.', badge: 'PDF & DOCX' },
  { num: '02', icon: '🎙️', title: 'Answer in Real Time', desc: 'Speak or type under timed conditions — just like a real interview room. Voice analysis tracks pace and clarity.', badge: 'Voice + Text' },
  { num: '03', icon: '⚡', title: 'Get Instant Feedback', desc: 'Receive a detailed score, keyword analysis, and actionable tips to sharpen every answer immediately.', badge: 'Score + Tips' },
];

const CARDS = [
  { icon: '🎙️', tag: 'AI Interview', title: 'AI Interview Simulator', desc: 'Realistic mock interviews with adaptive AI questions and instant scoring after every session.' },
  { icon: '🗣️', tag: 'Communication', title: 'Communication Enhancer', desc: 'Improve fluency and speaking clarity with daily 5-minute AI-powered analysis sessions.' },
  { icon: '📄', tag: 'Resume', title: 'AI Resume Maker', desc: 'Generate ATS-ready, beautiful resumes instantly using AI-powered templates and smart suggestions.' },
  { icon: '🗺️', tag: 'Roadmaps', title: 'Structured Roadmaps', desc: 'Frontend, Backend, DSA, AI/ML — curated paths for every tech track, always up to date.' },
  { icon: '📊', tag: 'DSA Tracker', title: 'DSA Heatmap + XP', desc: 'Track consistency with streak heatmaps, XP points, coding milestones, and smart deadlines.' },
  { icon: '✅', tag: 'ATS Analyzer', title: 'ATS Score Calculator', desc: 'Analyze your resume with ATS scoring, keyword optimisation, and detailed improvement suggestions.' },
];

/* ─── COMPONENT ─── */
export default function Home() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  useReveal();

  useEffect(() => {
    const id = 'hp-styles-v4';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = HOME_STYLES;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    if (authenticated) router.push('/dashboard');
  }, [authenticated, router]);

  return (
    <div className="hp">
      <div className="hp-grid" />
      <div className="hp-orb hp-orb-a" />
      <div className="hp-orb hp-orb-b" />
      <div className="hp-orb hp-orb-c" />
      <div className="hp-noise" />

      {/* ══ HERO ══ */}
      <section className="hp-hero hp-z">
        <div className="hp-eyebrow">
          <span className="hp-eyebrow-dot" />
          AI-Powered Interview Coaching
        </div>

        <div className="hp-typing-wrap">
          <TextType
            text={['Want to test your skills?', "Get interview-ready?", "Prove yourself"]}
            as="h1"
            typingSpeed={52}
            deletingSpeed={28}
            pauseDuration={2200}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            cursorBlinkDuration={0.45}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(26px, 5.5vw, 68px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--hp-text)',
              lineHeight: 1.05,
              wordBreak: 'break-word',
              width: '100%',
              textAlign: 'center',
            }}
          />
        </div>

        <div className="hp-sub-headline">
          <span className="w-outline">Master</span>{' '}
          <span className="w-grad">Interviews</span>{' '}
          &amp;{' '}
          <span className="w-grad">Land</span>{' '}
          <span>your</span>{' '}
          <span className="w-outline">Dream</span>{' '}
          <span>Role.</span>
        </div>

        <p className="hp-hero-desc">
          AI-powered mock interviews, instant resume scoring, personalised roadmaps — everything you need to go from prep to placement.
        </p>

        <div className="hp-cta-row">
          <Link href="/login" className="hp-btn-p">
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Interview
          </Link>
          <Link href="/about" className="hp-btn-s">
            Learn More
            <svg viewBox="0 0 16 16" fill="none" width="11" height="11" aria-hidden="true">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hp-scroll">
          <div className="hp-scroll-bar" />
          <span>scroll</span>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="hp-ticker-outer hp-z" aria-hidden="true">
        <div className="hp-ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <div key={i} className="hp-ti">
              <span className="hp-ti-val">{t.v}</span>
              <span className="hp-ti-sep" />
              <span className="hp-ti-lbl">{t.l}</span>
              <span className="hp-ti-sep" />
            </div>
          ))}
        </div>
      </div>

      {/* ══ PLACEMENT SECTION ══ */}
      <section className="hp-place hp-z">
        <div className="hp-place-inner">
          <div className="hp-rv">
            <div className="hp-sec-tag">
              <span className="tl" />
              Your Placement Partner
            </div>
            <h2 className="hp-place-title">
              Everything you need<br />
              to <span className="tw-outline">get</span>{' '}
              <span className="tw-grad">hired faster.</span>
            </h2>
            <p className="hp-place-desc">
              From your first mock interview to final offer — our AI coach adapts to your resume, your role, and your weaknesses to give you a decisive edge.
            </p>
            <div className="hp-pills">
              {[{ v: '12k+', l: 'Interviews' }, { v: '94%', l: 'Improved' }, { v: '6 Tools', l: 'All-in-one' }, { v: 'Free', l: 'To start' }].map(({ v, l }) => (
                <div key={l} className="hp-pill">
                  <span className="hp-pill-v">{v}</span>
                  <span className="hp-pill-sep" />
                  <span className="hp-pill-l">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hp-feats">
            {FEATS.map(({ icon, name, desc }, i) => (
              <div key={name} className={`hp-fc hp-rv hp-d${Math.min(i + 1, 3)}`}>
                <div className="hp-fc-icon" aria-hidden="true">{icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="hp-fc-name">{name}</div>
                  <div className="hp-fc-desc">{desc}</div>
                </div>
                <svg className="hp-fc-arr" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="hp-how hp-z">
        <div className="hp-sec-hdr hp-rv">
          <div className="hp-sec-tag" style={{ justifyContent: 'center' }}>
            <span className="tl" />The Process<span className="tl" />
          </div>
          <h2 className="hp-sec-title">How it <em>works</em></h2>
          <p className="hp-sec-sub">Three steps from upload to offer-ready.</p>
        </div>

        <div className="hp-steps-grid">
          {STEPS.map(({ num, icon, title, desc, badge }, i) => (
            <div key={num} className={`hp-step hp-rv hp-d${i + 1}`}>
              <div className="hp-step-num">STEP {num}</div>
              <div className="hp-step-ico" aria-hidden="true">{icon}</div>
              <div className="hp-step-title">{title}</div>
              <div className="hp-step-desc">{desc}</div>
              <div className="hp-step-badge">{badge}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURE CARDS ══ */}
      <section className="hp-feat-sec hp-z">
        <div className="hp-sec-hdr hp-rv">
          <div className="hp-sec-tag" style={{ justifyContent: 'center' }}>
            <span className="tl" />Why Use Us<span className="tl" />
          </div>
          <h2 className="hp-sec-title">Features you <em>get</em></h2>
          <p className="hp-sec-sub">Powerful AI tools to prepare smarter, improve faster, and stay consistent.</p>
        </div>

        <div className="hp-feat-grid">
          {CARDS.map(({ icon, tag, title, desc }, i) => (
            <div key={title} className={`hp-fcard hp-rv hp-d${(i % 3) + 1}`}>
              <div className="hp-fcard-top">
                <div className="hp-fcard-ico" aria-hidden="true">{icon}</div>
                <span className="hp-fcard-tag">{tag}</span>
              </div>
              <div className="hp-fcard-title">{title}</div>
              <div className="hp-fcard-desc">{desc}</div>
              <div className="hp-fcard-foot">
                <div className="hp-fcard-line" />
                <svg className="hp-fcard-arr" viewBox="0 0 16 16" fill="none" width="11" height="11" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="hp-cta hp-z">
        <div className="hp-cta-box hp-rv">
          <div className="hp-sec-tag" style={{ justifyContent: 'center', marginBottom: 18 }}>
            <span className="tl" />Get Started Today<span className="tl" />
          </div>
          <h2 className="hp-cta-title">Ready to <em>ace</em> your next interview?</h2>
          <p className="hp-cta-sub">Join thousands already sharpening their skills. Free to start — no card needed.</p>
          <div className="hp-cta-btns">
            <Link href="/register" className="hp-btn-p">
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Get Started Free
            </Link>
            <Link href="/login" className="hp-btn-s">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}