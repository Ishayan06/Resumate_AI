"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "@/lib/auth";
import { interview, resume } from "@/lib/api";
import {
  PlayIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Folder from "@/components/Folder";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --bg:       #0a0a0f;
    --surface:  #111118;
    --surface2: #16161f;
    --border:   rgba(255,255,255,0.07);
    --border-h: rgba(255,255,255,0.14);
    --accent:   #7c6dfa;
    --accent2:  #a78bfa;
    --accent3:  #34d399;
    --text:     #f0eeff;
    --muted:    #7e7a9a;
    --danger:   #f87171;
    --warn:     #fbbf24;

    /* unified purple card tokens */
    --card-bg:     rgba(124,109,250,0.10);
    --card-border: rgba(124,109,250,0.20);
    --card-shine:  rgba(124,109,250,0.40);
  }

  .db-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

  .db-wrap {
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    color: var(--text);
    min-height: 100vh;
    padding: 40px 32px 80px;
    position: relative;
    overflow-x: hidden;
  }

  .db-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }

  /* ── Hero (unchanged) ── */
  .hero {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(124,109,250,0.15) 0%, rgba(167,139,250,0.05) 60%, transparent 100%);
    backdrop-filter: blur(12px);
    padding: 52px 56px;
    margin-bottom: 32px;
    overflow: hidden;
    animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
  .hero-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
  }
  .hero-eyebrow {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hero-eyebrow span { display: inline-block; width: 20px; height: 1px; background: var(--accent2); }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }
  .hero h1 em { font-style: normal; color: var(--accent2); }
  .hero p {
    color: var(--muted);
    font-size: 15px;
    font-weight: 300;
    margin-bottom: 36px;
    max-width: 480px;
  }
  .hero-deco {
    position: absolute;
    right: -40px; top: -60px;
    width: 400px; height: 400px;
    background: conic-gradient(from 180deg at 50% 50%, rgba(124,109,250,0.2), transparent 60%);
    border-radius: 50%;
    pointer-events: none;
    animation: spin 20s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 14px 28px;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(124,109,250,0.35);
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  }
  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(124,109,250,0.5);
    background: #8b7dfb;
  }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: transparent;
    border: 1px solid var(--border-h);
    color: var(--text);
    padding: 14px 24px;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }
  .btn-ghost:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent2);
    background: rgba(124,109,250,0.08);
    box-shadow: 0 0 0 1px rgba(124,109,250,0.2);
  }
  .btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Main Grid ── */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    animation: fadeUp 0.7s 0.15s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (max-width: 1024px) {
    .main-grid { grid-template-columns: 1fr 1fr; }
    .ats-panel { grid-column: 1 / -1; }
  }
  @media (max-width: 640px) {
    .main-grid { grid-template-columns: 1fr; }
    .db-wrap { padding: 20px 16px 60px; }
    .hero { padding: 36px 28px; }
  }

  /* ── Unified purple card ── */
  .card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 28px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--card-shine), transparent);
    pointer-events: none;
  }
  .card:hover {
    border-color: rgba(124,109,250,0.35);
    box-shadow: 0 0 0 1px rgba(124,109,250,0.06) inset;
  }

  /* ── ATS Panel ── */
  .ats-panel { grid-column: span 2; }
  .ats-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 28px;
    gap: 16px;
  }
  .ats-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin-bottom: 4px;
  }
  .ats-sub { font-size: 13px; color: var(--muted); font-weight: 300; }

  /* Drop zone */
  .dropzone {
    border: 1.5px dashed rgba(124,109,250,0.3);
    border-radius: 16px;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    background: rgba(124,109,250,0.03);
    position: relative;
    overflow: hidden;
  }
  .dropzone:hover {
    border-color: var(--accent);
    background: rgba(124,109,250,0.07);
  }
  .dropzone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .dz-icon {
    width: 52px; height: 52px;
    background: rgba(124,109,250,0.12);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
    transition: all 0.25s ease;
  }
  .dropzone:hover .dz-icon { background: rgba(124,109,250,0.22); transform: scale(1.05); }
  .dz-title { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
  .dz-sub { font-size: 12px; color: var(--muted); }

  /* ATS Loader */
  .ats-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0 20px;
    gap: 16px;
  }
  .loader-ring {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 2px solid rgba(124,109,250,0.15);
    border-top-color: var(--accent);
    animation: spin 0.8s linear infinite;
  }
  .loader-text { font-size: 13px; color: var(--muted); }

  /* ── ATS Tips (shown when no scan yet) ── */
  .ats-tips-section { margin-top: 8px; }
  .ats-tips-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }
  .ats-tip-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    font-weight: 300;
    color: rgba(240,238,255,0.72);
    line-height: 1.55;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ats-tip-item:last-child { border-bottom: none; }
  .ats-tip-num {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    color: var(--accent);
    background: rgba(124,109,250,0.15);
    border-radius: 6px;
    width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Score ring */
  .score-section {
    margin-top: 32px;
    display: flex;
    gap: 24px;
    align-items: center;
    background: rgba(124,109,250,0.06);
    border: 1px solid rgba(124,109,250,0.12);
    border-radius: 16px;
    padding: 24px;
    animation: fadeUp 0.4s ease both;
  }
  .score-ring-wrap { flex-shrink: 0; position: relative; }
  .score-ring-wrap svg { transform: rotate(-90deg); }
  .score-ring-center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 2px;
  }
  .score-num {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: var(--accent2);
    line-height: 1;
  }
  .score-label { font-size: 10px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
  .score-meta { flex: 1; }
  .score-meta-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .score-meta-desc { font-size: 13px; color: var(--muted); font-weight: 300; line-height: 1.5; }

  /* Results grid */
  .results-grid {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    animation: fadeUp 0.5s 0.1s ease both;
  }
  @media (max-width: 600px) { .results-grid { grid-template-columns: 1fr; } }

  .result-block {
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 18px;
  }
  .result-block-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-green { background: var(--accent3); box-shadow: 0 0 8px var(--accent3); }
  .dot-red { background: var(--danger); box-shadow: 0 0 8px var(--danger); }
  .dot-accent { background: var(--accent); box-shadow: 0 0 8px var(--accent); }

  .result-item {
    font-size: 13px;
    font-weight: 300;
    line-height: 1.55;
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .result-item:last-child { margin-bottom: 0; }
  .result-item.green { background: rgba(52,211,153,0.07); color: #86efac; }
  .result-item.red { background: rgba(248,113,113,0.07); color: #fca5a5; }
  .result-item.purple { background: rgba(124,109,250,0.07); color: var(--accent2); }
  .result-icon { flex-shrink: 0; margin-top: 2px; opacity: 0.7; }
  .suggestions-block { grid-column: 1 / -1; }

  /* ── Side cards ── */
  .side-col { display: flex; flex-direction: column; gap: 20px; }
  .stat-icon-wrap {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    background: rgba(124,109,250,0.14);
  }
  .stat-card-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .stat-card-value {
    font-family: 'Syne', sans-serif;
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text);
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-card-sub { font-size: 12px; color: var(--muted); font-weight: 300; }

  /* Roadmaps / tips card */
  .tips-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    margin-bottom: 18px;
    color: var(--accent2);
  }
  .tip-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    font-weight: 300;
    color: rgba(240,238,255,0.75);
    line-height: 1.5;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tip-item:last-child { border-bottom: none; }
  .tip-num {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    color: var(--accent);
    background: rgba(124,109,250,0.15);
    border-radius: 6px;
    width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* ── Bottom Grid (Portfolio + Discussion) ── */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
    animation: fadeUp 0.7s 0.25s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (max-width: 768px) { .bottom-grid { grid-template-columns: 1fr; } }

  /* Portfolio */
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin-bottom: 4px;
  }
  .section-sub { font-size: 13px; color: var(--muted); font-weight: 300; margin-bottom: 22px; }

  .form-group { margin-bottom: 14px; }
  .form-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    display: block;
    margin-bottom: 7px;
  }
  .form-input, .form-textarea {
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--text);
    outline: none;
    resize: none;
    transition: border-color 0.2s ease;
  }
  .form-input:focus, .form-textarea:focus { border-color: rgba(124,109,250,0.5); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }

  .skills-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 6px; }
  .skill-tag {
    font-size: 11px;
    padding: 5px 11px;
    border-radius: 99px;
    background: rgba(124,109,250,0.13);
    border: 1px solid rgba(124,109,250,0.25);
    color: var(--accent2);
    cursor: pointer;
    transition: all 0.15s ease;
    user-select: none;
  }
  .skill-tag:hover { background: rgba(124,109,250,0.25); }
  .skill-tag.active { background: rgba(124,109,250,0.35); border-color: var(--accent); }

  /* Discussion */
  .discussion-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 272px;
    overflow-y: auto;
    margin-bottom: 16px;
    padding-right: 4px;
  }
  .discussion-list::-webkit-scrollbar { width: 3px; }
  .discussion-list::-webkit-scrollbar-thumb { background: rgba(124,109,250,0.3); border-radius: 4px; }

  .d-post {
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 13px;
    padding: 13px 15px;
    animation: fadeUp 0.3s ease both;
  }
  .d-post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
  }
  .d-author { font-size: 12px; font-weight: 500; color: var(--accent2); display: flex; align-items: center; gap: 6px; }
  .d-time { font-size: 10px; color: var(--muted); }
  .d-text { font-size: 13px; font-weight: 300; color: rgba(240,238,255,0.8); line-height: 1.55; }
  .d-badge {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 99px;
  }
  .d-badge.question { background: rgba(251,191,36,0.1); color: #fbbf24; }
  .d-badge.tip { background: rgba(52,211,153,0.1); color: #34d399; }

  .d-input-row { display: flex; gap: 8px; }
  .d-input {
    flex: 1;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s ease;
  }
  .d-input:focus { border-color: rgba(124,109,250,0.5); }
  .d-input::placeholder { color: var(--muted); }
  .d-submit {
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 11px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(124,109,250,0.3);
  }
  .d-submit:hover { background: #8b7dfb; }

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dash { from { stroke-dashoffset: 283; } }
  .score-progress { animation: dash 1s cubic-bezier(.25,.8,.25,1) both; }

  .db-wrap ::-webkit-scrollbar { width: 4px; }
  .db-wrap ::-webkit-scrollbar-track { background: transparent; }
  .db-wrap ::-webkit-scrollbar-thumb { background: rgba(124,109,250,0.3); border-radius: 4px; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const r = 45;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#34d399" : score >= 50 ? "#7c6dfa" : "#f87171";

  return (
    <div className="score-ring-wrap" style={{ width: 100, height: 100 }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="score-progress"
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div className="score-ring-center">
        <span className="score-num" style={{ color }}>{score}</span>
        <span className="score-label">/ 100</span>
      </div>
    </div>
  );
}

const ATS_TIPS = [
  "Mirror exact keywords from the job description — ATS ranks by keyword match.",
  "Use standard headings: \u201cExperience\u201d, \u201cEducation\u201d, \u201cSkills\u201d \u2014 ATS parsers expect them.",
  "Avoid tables, columns, headers/footers — they confuse most ATS parsers.",
  'Quantify achievements: "Increased sales by 32%" beats "improved sales".',
  "Keep to one page if you have less than 5 years of experience.",
  "Save as a plain PDF or .docx — avoid image-based or scanned resumes.",
];

const SEED_POSTS = [
  { author: "Riya M.", type: "question", time: "2m ago", text: "How many projects should I have on my resume for campus placements?" },
  { author: "Karan S.", type: "tip", time: "14m ago", text: "Use STAR format for behavioral questions — it makes answers way more structured." },
  { author: "Priya D.", type: "question", time: "31m ago", text: "Is it okay to apply for SDE roles if I don't know all DSA topics yet?" },
  { author: "Arjun K.", type: "tip", time: "1h ago", text: "Leetcode 75 list is enough for most product companies. Quality over quantity." },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PORTFOLIO BUILDER (sub-component, no router dependency)
───────────────────────────────────────────────────────────────────────────── */
function PortfolioBuilder() {
  const router = useRouter();

  return (
    <div className="card">
      <div className="section-title">Resume Builder</div>
      <div className="section-sub">
        Build your developer resume in seconds
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[
          "✨ Resume design",
          "🚀 Showcase your projects & skills",
          "📱 Fully responsive layout",
          "⚡ Ready in one click",
        ].map((point) => (
          <div
            key={point}
            style={{
              padding: "12px 14px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            {point}
          </div>
        ))}
      </div>

      <button
        className="btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 24,
        }}
        onClick={() => router.push("/portfolio")}
      >
        Get Your Resume
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DISCUSSION BOARD (sub-component)
───────────────────────────────────────────────────────────────────────────── */
function DiscussionBoard() {
  const upcomingFeatures = [
    {
      icon: "💬",
      title: "Community Discussion Page",
      desc: "Ask doubts, share interview experiences, and get answers from other students & developers.",
    },
    {
      icon: "🗺️",
      title: "Company-wise Roadmaps",
      desc: "Detailed preparation roadmaps for companies like Amazon, Google, Microsoft, Adobe, Atlassian, and more.",
    },
    {
      icon: "🏆",
      title: "Global Leaderboard",
      desc: "Compete with other learners based on streaks, solved problems, contests, and activity.",
    },
  ];

  return (
    <div className="card">
      <div className="section-title">Upcoming Features</div>

      <div className="section-sub">
        Powerful community & preparation features coming soon
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {upcomingFeatures.map((feature, i) => (
          <div
            key={i}
            style={{
              padding: "18px",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 24 }}>{feature.icon}</div>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {feature.title}
                </div>
              </div>

              {/* Lock Icon */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(120, 81, 169, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  border: "1px solid rgba(168, 85, 247, 0.35)",
                }}
              >
                🔒
              </div>
            </div>

            <div
              style={{
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              {feature.desc}
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 22,
          background:
            "linear-gradient(135deg, #4c1d95 0%, #312e81 100%)",
          border: "1px solid rgba(168, 85, 247, 0.25)",
          color: "#fff",
          fontWeight: 600,
          boxShadow: "0 8px 24px rgba(76, 29, 149, 0.35)",
        }}
      >
        🔒 More Features Coming Soon
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = getUser();

  useEffect(() => {
    const id = "db-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) router.push("/login");
  }, [router]);

  useEffect(() => {
    interview
      .getDashboardStats()
      .then((r) => setAverageScore(r.data.averageScore ?? null))
      .catch(() => {});
  }, []);

  const startInterview = async () => {
    setLoading(true);
    try {
      const r = await interview.start();
      router.push(`/interview/${r.data.sessionId}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Please upload a resume first");
      router.push("/upload-resume");
    } finally {
      setLoading(false);
    }
  };

  const handleATSUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("PDF files only");
      return;
    }

    try {
      setAtsLoading(true);
      setAtsScore(null);
      setStrengths([]);
      setWeaknesses([]);
      setSuggestions([]);

      const formData = new FormData();
      formData.append("resume", file);
      const r = await resume.upload(formData);
      const skills: string[] = r.data.skills || [];
      if (!skills.length) {
        toast.error("No skills detected — try a different file.");
        return;
      }

      const atsRes = await fetch("/dashboard/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });
      const atsData = await atsRes.json();
      if (!atsRes.ok) throw new Error(atsData.error || "ATS analysis failed");

      setAtsScore(atsData.score ?? 0);
      setStrengths(atsData.strengths || []);
      setWeaknesses(atsData.weaknesses || []);
      setSuggestions(atsData.suggestions || []);
      toast.success("Analysis complete");
    } catch (err: any) {
      toast.error(err.message || "ATS analysis failed");
    } finally {
      setAtsLoading(false);
    }
  };

  const formatScore = () => (averageScore === null ? "—" : `${averageScore}`);

  const showTips = !atsLoading && atsScore === null;
  const showResults = !atsLoading && atsScore !== null;

  return (
    <div className="db-wrap">
      <div className="db-inner">

        {/* ── Hero (unchanged) ── */}
        <div className="hero">
          <div className="hero-noise" />
          <div className="hero-deco" />
          <div className="hero-eyebrow">
            <span />
            Interview Coach
          </div>
          <h1>
            Hey, <em>{user?.name?.split(" ")[0]}</em>.<br />
            Ready to level up?
          </h1>
          <p>AI-powered practice sessions and live resume scoring — all in one place.</p>
          <button className="btn-primary" onClick={startInterview} disabled={loading}>
            <PlayIcon style={{ width: 16, height: 16 }} />
            {loading ? "Starting session…" : "Begin Interview"}
          </button>
        </div>

        {/* ── Main Grid ── */}
        <div className="main-grid">

          {/* ATS Panel */}
          <div className="card ats-panel">
            <div className="ats-header">
              <div>
                <div className="ats-title">Resume ATS Analyzer</div>
                <div className="ats-sub">Drop your PDF to get an instant compatibility score</div>
              </div>
              <Folder color="#7c6dfa" size={1} items={[null, null, null]} />
            </div>

            {/* Drop Zone */}
            <label className="dropzone">
              <div className="dz-icon">
                <ArrowUpTrayIcon style={{ width: 22, height: 22, color: "var(--accent2)" }} />
              </div>
              <div className="dz-title">Upload Resume</div>
              <div className="dz-sub">PDF only · max 5 MB</div>
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleATSUpload} />
            </label>

            {/* Tips — shown before any scan */}
            {showTips && (
              <div className="ats-tips-section">
                <div className="ats-tips-label">Tips for a great resume</div>
                {ATS_TIPS.map((tip, i) => (
                  <div key={i} className="ats-tip-item">
                    <span className="ats-tip-num">{i + 1}</span>
                    {tip}
                  </div>
                ))}
              </div>
            )}

            {/* Loader */}
            {atsLoading && (
              <div className="ats-loader">
                <div className="loader-ring" />
                <div className="loader-text">Analyzing your resume…</div>
              </div>
            )}

            {/* Results — shown after scan, tips hidden */}
            {showResults && (
              <>
                <div className="score-section">
                  <ScoreRing score={atsScore!} />
                  <div className="score-meta">
                    <div className="score-meta-title">
                      {atsScore! >= 75 ? "Strong Match" : atsScore! >= 50 ? "Moderate Match" : "Needs Work"}
                    </div>
                    <div className="score-meta-desc">
                      {atsScore! >= 75
                        ? "Your resume is well-optimised for ATS parsing. A few tweaks could push it further."
                        : atsScore! >= 50
                        ? "Good foundation. Address the weak areas below to improve your chances."
                        : "Significant gaps detected. Follow the suggestions to boost your score."}
                    </div>
                  </div>
                </div>

                <div className="results-grid">
                  {strengths.length > 0 && (
                    <div className="result-block">
                      <div className="result-block-header">
                        <span className="dot dot-green" />
                        Strengths
                      </div>
                      {strengths.map((s, i) => (
                        <div key={i} className="result-item green">
                          <CheckCircleIcon className="result-icon" style={{ width: 14, height: 14, marginTop: 1 }} />
                          {s}
                        </div>
                      ))}
                    </div>
                  )}

                  {weaknesses.length > 0 && (
                    <div className="result-block">
                      <div className="result-block-header">
                        <span className="dot dot-red" />
                        Weak Areas
                      </div>
                      {weaknesses.map((w, i) => (
                        <div key={i} className="result-item red">
                          <ExclamationTriangleIcon className="result-icon" style={{ width: 14, height: 14, marginTop: 1 }} />
                          {w}
                        </div>
                      ))}
                    </div>
                  )}

                  {suggestions.length > 0 && (
                    <div className="result-block suggestions-block">
                      <div className="result-block-header">
                        <span className="dot dot-accent" />
                        Suggestions
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {suggestions.map((s, i) => (
                          <div key={i} className="result-item purple">
                            <span style={{ fontSize: 11, marginTop: 2, opacity: 0.6, flexShrink: 0 }}>→</span>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Side column */}
          <div className="side-col">

            {/* Daily Practice / Communication Booster */}
            <div className="card" style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: 18, right: 18,
                background: "rgba(124,109,250,0.14)",
                border: "1px solid rgba(124,109,250,0.25)",
                color: "var(--accent2)",
                padding: "8px 12px", borderRadius: "999px",
                fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                ⭐ {user?.points || 0} PTS
              </div>
              <div className="stat-icon-wrap">
                <PlayIcon style={{ width: 22, height: 22, color: "var(--accent2)" }} />
              </div>
              <div className="stat-card-label">Daily Practice</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
                Communication Booster
              </div>
              <div className="stat-card-sub" style={{ marginBottom: 20 }}>
                Get daily Telegram reminders and speak about your day for 5 minutes to improve communication confidence and speaking skills.
              </div>
              <button className="btn-ghost" onClick={() => router.push("/comm")} disabled={loading}>
                <PlayIcon style={{ width: 15, height: 15 }} />
                {loading ? "Starting…" : "Start 5-Min Session"}
              </button>
            </div>

            {/* Average score */}
            <div className="card">
              <div className="stat-icon-wrap">
                <ChartBarIcon style={{ width: 22, height: 22, color: "var(--accent2)" }} />
              </div>
              <div className="stat-card-label">Avg. Score</div>
              <div className="stat-card-value">
                {formatScore()}
                <span style={{ fontSize: 20 }}>{averageScore !== null ? "%" : ""}</span>
              </div>
              <div className="stat-card-sub">Across all completed sessions</div>
            </div>

            {/* Placement & Internship Roadmaps */}
            <div className="card">
              <div className="tips-title">Placement & Internship Roadmaps</div>
              <div className="tip-item"><span className="tip-num">1</span>DSA Roadmap for coding interviews and problem solving.</div>
              <div className="tip-item"><span className="tip-num">2</span>Full Stack Development roadmap with MERN projects.</div>
              <div className="tip-item"><span className="tip-num">3</span>Aptitude + HR interview preparation tutorials.</div>
              <div className="tip-item"><span className="tip-num">4</span>Resume building and LinkedIn optimisation guides.</div>
              <button
                className="btn-primary"
                style={{ width: "100%", marginTop: "20px", justifyContent: "center" }}
                onClick={() => router.push("/roadmaps")}
              >
                Explore Tutorials
              </button>
            </div>

          </div>
        </div>

        {/* ── Bottom Grid: Portfolio Builder + Discussion Board ── */}
        <div className="bottom-grid">
          <PortfolioBuilder />
          <DiscussionBoard />
        </div>

      </div>
    </div>
  );
}