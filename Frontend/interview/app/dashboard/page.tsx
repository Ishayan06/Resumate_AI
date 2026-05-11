"use client";

import React, { useState, useEffect, useRef } from "react";
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

/* ─── STYLES ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --bg:        #0a0a0f;
    --surface:   #111118;
    --surface2:  #16161f;
    --border:    rgba(255,255,255,0.07);
    --border-h:  rgba(255,255,255,0.14);
    --accent:    #7c6dfa;
    --accent2:   #a78bfa;
    --accent3:   #34d399;
    --text:      #f0eeff;
    --muted:     #7e7a9a;
    --danger:    #f87171;
    --warn:      #fbbf24;
    --card-bg:     rgba(124,109,250,0.10);
    --card-border: rgba(124,109,250,0.20);
    --card-shine:  rgba(124,109,250,0.40);
  }

  .db-wrap *, .db-wrap *::before, .db-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .db-wrap {
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    color: var(--text);
    min-height: 100vh;
    padding: clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px) 80px;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }

  .db-inner {
    position: relative; z-index: 1;
    max-width: 1280px; margin: 0 auto;
    width: 100%;
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(124,109,250,0.15) 0%, rgba(167,139,250,0.05) 60%, transparent 100%);
    padding: clamp(28px, 5vw, 52px) clamp(20px, 5vw, 56px);
    margin-bottom: 24px;
    overflow: hidden;
    animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both;
  }
  .hero::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    pointer-events: none;
  }
  .hero-noise {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  }
  .hero-eyebrow {
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent2);
    margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .hero-eyebrow span { display: inline-block; width: 18px; height: 1px; background: var(--accent2); flex-shrink: 0; }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 4vw, 44px);
    font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
    margin-bottom: 10px;
    word-break: break-word;
  }
  .hero h1 em { font-style: normal; color: var(--accent2); }
  .hero p {
    color: var(--muted); font-size: clamp(13px, 2vw, 15px); font-weight: 300;
    margin-bottom: 28px; max-width: 480px; line-height: 1.65;
  }
  .hero-deco {
    position: absolute; right: -60px; top: -80px;
    width: clamp(200px, 30vw, 400px); height: clamp(200px, 30vw, 400px);
    background: conic-gradient(from 180deg at 50% 50%, rgba(124,109,250,0.18), transparent 60%);
    border-radius: 50%; pointer-events: none;
    animation: spin 22s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--accent); color: #fff; border: none;
    padding: clamp(11px, 2vw, 14px) clamp(20px, 3vw, 28px);
    border-radius: 13px;
    font-family: 'DM Sans', sans-serif; font-size: clamp(13px, 2vw, 14px); font-weight: 500;
    cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    position: relative; overflow: hidden;
    box-shadow: 0 8px 28px rgba(124,109,250,0.35);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    white-space: nowrap;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    pointer-events: none;
  }
  .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(124,109,250,0.5); background: #8b7dfb; }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

  .btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    background: transparent; border: 1px solid var(--border-h); color: var(--text);
    padding: clamp(11px, 2vw, 14px) clamp(18px, 3vw, 24px);
    border-radius: 13px;
    font-family: 'DM Sans', sans-serif; font-size: clamp(13px, 2vw, 14px); font-weight: 500;
    cursor: pointer; transition: all 0.2s ease;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .btn-ghost:hover:not(:disabled) {
    border-color: var(--accent); color: var(--accent2);
    background: rgba(124,109,250,0.08);
  }
  .btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Main Grid ── */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 18px;
    animation: fadeUp 0.7s 0.15s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (max-width: 1024px) {
    .main-grid { grid-template-columns: 1fr 1fr; }
    .ats-panel { grid-column: 1 / -1; }
  }
  @media (max-width: 640px) {
    .main-grid { grid-template-columns: 1fr; }
  }

  /* ── Card ── */
  .card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 18px;
    padding: clamp(18px, 2.5vw, 28px);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    position: relative; overflow: hidden;
    width: 100%;
  }
  .card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--card-shine), transparent);
    pointer-events: none;
  }
  .card:hover { border-color: rgba(124,109,250,0.32); }

  /* ── ATS Panel ── */
  .ats-panel { grid-column: span 2; }
  @media (max-width: 640px) { .ats-panel { grid-column: span 1; } }

  .ats-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 24px; gap: 12px;
    flex-wrap: wrap;
  }
  .ats-title { font-family: 'Syne', sans-serif; font-size: clamp(16px, 2.5vw, 20px); font-weight: 700; margin-bottom: 3px; }
  .ats-sub { font-size: 13px; color: var(--muted); font-weight: 300; }

  /* Drop zone */
  .dropzone {
    border: 1.5px dashed rgba(124,109,250,0.3); border-radius: 14px;
    padding: clamp(24px, 4vw, 40px) 20px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.25s ease;
    background: rgba(124,109,250,0.03);
    position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .dropzone:hover { border-color: var(--accent); background: rgba(124,109,250,0.07); }
  .dropzone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .dz-icon {
    width: 48px; height: 48px; background: rgba(124,109,250,0.12);
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px; transition: all 0.25s ease;
  }
  .dropzone:hover .dz-icon { background: rgba(124,109,250,0.22); transform: scale(1.04); }
  .dz-title { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
  .dz-sub { font-size: 11px; color: var(--muted); }

  /* ATS Loader */
  .ats-loader { display: flex; flex-direction: column; align-items: center; padding: 36px 0 16px; gap: 14px; }
  .loader-ring {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(124,109,250,0.15); border-top-color: var(--accent);
    animation: spin 0.8s linear infinite;
  }
  .loader-text { font-size: 13px; color: var(--muted); }

  /* ATS Tips */
  .ats-tips-section { margin-top: 6px; }
  .ats-tips-label { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .ats-tip-item {
    display: flex; align-items: flex-start; gap: 9px;
    font-size: 12px; font-weight: 300; color: rgba(240,238,255,0.7);
    line-height: 1.55; padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ats-tip-item:last-child { border-bottom: none; }
  .ats-tip-num {
    font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 700;
    color: var(--accent); background: rgba(124,109,250,0.15); border-radius: 5px;
    width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }

  /* Score ring */
  .score-section {
    margin-top: 28px; display: flex; gap: 20px; align-items: center;
    background: rgba(124,109,250,0.06); border: 1px solid rgba(124,109,250,0.12);
    border-radius: 14px; padding: clamp(16px,2.5vw,24px);
    animation: fadeUp 0.4s ease both;
    flex-wrap: wrap;
  }
  .score-ring-wrap { flex-shrink: 0; position: relative; }
  .score-ring-wrap svg { transform: rotate(-90deg); display: block; }
  .score-ring-center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
  }
  .score-num { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--accent2); line-height: 1; }
  .score-label { font-size: 9px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
  .score-meta { flex: 1; min-width: 160px; }
  .score-meta-title { font-family: 'Syne', sans-serif; font-size: clamp(14px,2vw,16px); font-weight: 700; margin-bottom: 6px; }
  .score-meta-desc { font-size: 12px; color: var(--muted); font-weight: 300; line-height: 1.5; }

  /* Results grid */
  .results-grid {
    margin-top: 20px; display: grid;
    grid-template-columns: 1fr 1fr; gap: 14px;
    animation: fadeUp 0.5s 0.1s ease both;
  }
  @media (max-width: 500px) { .results-grid { grid-template-columns: 1fr; } }

  .result-block { background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; }
  .result-block-header {
    display: flex; align-items: center; gap: 7px;
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;
  }
  .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .dot-green { background: var(--accent3); box-shadow: 0 0 6px var(--accent3); }
  .dot-red { background: var(--danger); box-shadow: 0 0 6px var(--danger); }
  .dot-accent { background: var(--accent); box-shadow: 0 0 6px var(--accent); }

  .result-item {
    font-size: 12px; font-weight: 300; line-height: 1.55;
    padding: 8px 10px; border-radius: 9px; margin-bottom: 6px;
    display: flex; align-items: flex-start; gap: 7px;
  }
  .result-item:last-child { margin-bottom: 0; }
  .result-item.green { background: rgba(52,211,153,0.07); color: #86efac; }
  .result-item.red { background: rgba(248,113,113,0.07); color: #fca5a5; }
  .result-item.purple { background: rgba(124,109,250,0.07); color: var(--accent2); }
  .result-icon { flex-shrink: 0; margin-top: 2px; opacity: 0.7; }
  .suggestions-block { grid-column: 1 / -1; }

  /* ── Side col ── */
  .side-col { display: flex; flex-direction: column; gap: 18px; }
  .stat-icon-wrap {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px; background: rgba(124,109,250,0.14);
    flex-shrink: 0;
  }
  .stat-card-label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 7px; }
  .stat-card-value {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 42px); font-weight: 800;
    letter-spacing: -0.03em; color: var(--text); line-height: 1; margin-bottom: 5px;
  }
  .stat-card-sub { font-size: 12px; color: var(--muted); font-weight: 300; }

  /* Tips card */
  .tips-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.02em; margin-bottom: 16px; color: var(--accent2); }
  .tip-item {
    display: flex; align-items: flex-start; gap: 9px;
    font-size: 12px; font-weight: 300; color: rgba(240,238,255,0.75);
    line-height: 1.5; padding: 7px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tip-item:last-child { border-bottom: none; }
  .tip-num {
    font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 700;
    color: var(--accent); background: rgba(124,109,250,0.15); border-radius: 5px;
    width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* ── Bottom Grid ── */
  .bottom-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
    margin-top: 18px;
    animation: fadeUp 0.7s 0.25s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (max-width: 640px) { .bottom-grid { grid-template-columns: 1fr; } }

  /* Section title */
  .section-title { font-family: 'Syne', sans-serif; font-size: clamp(15px,2.2vw,18px); font-weight: 700; margin-bottom: 4px; }
  .section-sub { font-size: 12px; color: var(--muted); font-weight: 300; margin-bottom: 18px; }

  /* Form */
  .form-group { margin-bottom: 12px; }
  .form-label { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }
  .form-input, .form-textarea {
    width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 11px; padding: 10px 13px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text);
    outline: none; resize: none; transition: border-color 0.2s ease;
  }
  .form-input:focus, .form-textarea:focus { border-color: rgba(124,109,250,0.5); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }

  /* Upcoming features */
  .feature-item {
    padding: 16px; border-radius: 15px;
    border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
    margin-bottom: 12px;
  }
  .feature-item:last-child { margin-bottom: 0; }
  .feature-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; gap: 10px; }
  .feature-info { display: flex; align-items: center; gap: 9px; flex: 1; min-width: 0; }
  .feature-emoji { font-size: 20px; flex-shrink: 0; }
  .feature-title { font-family: 'Syne', sans-serif; font-size: clamp(12px,2vw,14px); font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .feature-lock {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    background: rgba(120,81,169,0.18); display: flex; align-items: center; justify-content: center;
    font-size: 13px; border: 1px solid rgba(168,85,247,0.35);
  }
  .feature-desc { font-size: 12px; color: var(--muted); line-height: 1.65; font-weight: 300; }

  /* Points badge */
  .pts-badge {
    position: absolute; top: 16px; right: 16px;
    background: rgba(124,109,250,0.14); border: 1px solid rgba(124,109,250,0.25);
    color: var(--accent2); padding: 6px 10px; border-radius: 999px;
    font-size: 11px; font-weight: 600;
    display: flex; align-items: center; gap: 5px;
    white-space: nowrap;
  }

  /* ── Keyframes ── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes dash { from { stroke-dashoffset: 283; } }
  .score-progress { animation: dash 1s cubic-bezier(.25,.8,.25,1) both; }

  /* ── Scrollbar ── */
  .db-wrap ::-webkit-scrollbar { width: 3px; }
  .db-wrap ::-webkit-scrollbar-track { background: transparent; }
  .db-wrap ::-webkit-scrollbar-thumb { background: rgba(124,109,250,0.3); border-radius: 3px; }

  /* ── Prevent overflow ── */
  .db-wrap, .db-wrap * { max-width: 100%; }

  /* ── Reduce motion ── */
  @media (prefers-reduced-motion: reduce) {
    .hero, .main-grid, .bottom-grid { animation: none; opacity: 1; transform: none; }
    .hero-deco { animation: none; }
    .loader-ring { animation: none; border-top-color: var(--accent); }
  }
`;

/* ─── HELPERS ─── */
function ScoreRing({ score }: { score: number }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#34d399" : score >= 50 ? "#7c6dfa" : "#f87171";

  return (
    <div className="score-ring-wrap" style={{ width: 90, height: 90 }}>
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r} fill="none"
          stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="score-progress"
          style={{ filter: `drop-shadow(0 0 5px ${color}88)` }}
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
  'Use standard headings: "Experience", "Education", "Skills".',
  "Avoid tables, columns, headers/footers — they confuse ATS parsers.",
  'Quantify achievements: "Increased sales by 32%" beats "improved sales".',
  "Keep to one page if you have less than 5 years of experience.",
  "Save as a plain PDF or .docx — avoid image-based or scanned resumes.",
];

/* ─── PORTFOLIO BUILDER ─── */
function PortfolioBuilder() {
  const router = useRouter();
  return (
    <div className="card">
      <div className="section-title">Resume Builder</div>
      <div className="section-sub">Build your developer resume in seconds</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["✨ Resume design", "🚀 Showcase your projects & skills", "📱 Fully responsive layout", "⚡ Ready in one click"].map((point) => (
          <div key={point} style={{ padding: "11px 13px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 11, background: "rgba(255,255,255,0.03)", fontSize: 13, fontWeight: 400 }}>
            {point}
          </div>
        ))}
      </div>
      <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={() => router.push("/portfolio")}>
        Get Your Resume
      </button>
    </div>
  );
}

/* ─── DISCUSSION / UPCOMING ─── */
function DiscussionBoard() {
  const upcomingFeatures = [
    { icon: "💬", title: "Community Discussion Page", desc: "Ask doubts, share interview experiences, and get answers from other students & developers." },
    { icon: "🗺️", title: "Company-wise Roadmaps", desc: "Detailed preparation roadmaps for companies like Amazon, Google, Microsoft, Adobe, and more." },
    { icon: "🏆", title: "Global Leaderboard", desc: "Compete with other learners based on streaks, solved problems, contests, and activity." },
  ];
  return (
    <div className="card">
      <div className="section-title">Upcoming Features</div>
      <div className="section-sub">Powerful community & preparation features coming soon</div>
      <div>
        {upcomingFeatures.map((f, i) => (
          <div key={i} className="feature-item">
            <div className="feature-header">
              <div className="feature-info">
                <span className="feature-emoji">{f.icon}</span>
                <span className="feature-title">{f.title}</span>
              </div>
              <div className="feature-lock">🔒</div>
            </div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <button
        className="btn-primary"
        style={{
          width: "100%", justifyContent: "center", marginTop: 16,
          background: "linear-gradient(135deg, #4c1d95 0%, #312e81 100%)",
          border: "1px solid rgba(168,85,247,0.25)",
          boxShadow: "0 8px 24px rgba(76,29,149,0.35)",
        }}
      >
        🔒 More Features Coming Soon
      </button>
    </div>
  );
}

/* ─── DASHBOARD ─── */
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
    const id = "db-styles-v2";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id; el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) router.push("/login");
  }, [router]);

  useEffect(() => {
    interview.getDashboardStats().then((r) => setAverageScore(r.data.averageScore ?? null)).catch(() => {});
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
    if (file.type !== "application/pdf") { toast.error("PDF files only"); return; }

    try {
      setAtsLoading(true); setAtsScore(null); setStrengths([]); setWeaknesses([]); setSuggestions([]);
      const formData = new FormData();
      formData.append("resume", file);
      const r = await resume.upload(formData);
      const skills: string[] = r.data.skills || [];
      if (!skills.length) { toast.error("No skills detected — try a different file."); return; }

      const atsRes = await fetch("/dashboard/api", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ skills }) });
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

  const showTips = !atsLoading && atsScore === null;
  const showResults = !atsLoading && atsScore !== null;

  return (
    <div className="db-wrap">
      <div className="db-inner">

        {/* Hero */}
        <div className="hero">
          <div className="hero-noise" />
          <div className="hero-deco" aria-hidden="true" />
          <div className="hero-eyebrow"><span />Interview Coach</div>
          <h1>Hey, <em>{user?.name?.split(" ")[0]}</em>.<br />Ready to level up?</h1>
          <p>AI-powered practice sessions and live resume scoring — all in one place.</p>
          <button className="btn-primary" onClick={startInterview} disabled={loading}>
            <PlayIcon style={{ width: 15, height: 15 }} />
            {loading ? "Starting session…" : "Begin Interview"}
          </button>
        </div>

        {/* Main Grid */}
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

            <label className="dropzone">
              <div className="dz-icon">
                <ArrowUpTrayIcon style={{ width: 20, height: 20, color: "var(--accent2)" }} />
              </div>
              <div className="dz-title">Upload Resume</div>
              <div className="dz-sub">PDF only · max 5 MB</div>
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleATSUpload} />
            </label>

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

            {atsLoading && (
              <div className="ats-loader">
                <div className="loader-ring" />
                <div className="loader-text">Analyzing your resume…</div>
              </div>
            )}

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
                        ? "Well-optimised for ATS parsing. A few tweaks could push it further."
                        : atsScore! >= 50
                        ? "Good foundation. Address the weak areas below to improve your chances."
                        : "Significant gaps detected. Follow the suggestions to boost your score."}
                    </div>
                  </div>
                </div>
                <div className="results-grid">
                  {strengths.length > 0 && (
                    <div className="result-block">
                      <div className="result-block-header"><span className="dot dot-green" />Strengths</div>
                      {strengths.map((s, i) => (
                        <div key={i} className="result-item green">
                          <CheckCircleIcon className="result-icon" style={{ width: 13, height: 13 }} />{s}
                        </div>
                      ))}
                    </div>
                  )}
                  {weaknesses.length > 0 && (
                    <div className="result-block">
                      <div className="result-block-header"><span className="dot dot-red" />Weak Areas</div>
                      {weaknesses.map((w, i) => (
                        <div key={i} className="result-item red">
                          <ExclamationTriangleIcon className="result-icon" style={{ width: 13, height: 13 }} />{w}
                        </div>
                      ))}
                    </div>
                  )}
                  {suggestions.length > 0 && (
                    <div className="result-block suggestions-block">
                      <div className="result-block-header"><span className="dot dot-accent" />Suggestions</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 7 }}>
                        {suggestions.map((s, i) => (
                          <div key={i} className="result-item purple">
                            <span style={{ fontSize: 10, opacity: 0.6, flexShrink: 0 }}>→</span>{s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Side col */}
          <div className="side-col">

            {/* Daily Practice */}
            <div className="card" style={{ position: "relative" }}>
              <div className="pts-badge">⭐ {user?.points || 0} PTS</div>
              <div className="stat-icon-wrap">
                <PlayIcon style={{ width: 20, height: 20, color: "var(--accent2)" }} />
              </div>
              <div className="stat-card-label">Daily Practice</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 700, marginBottom: 8 }}>
                Communication Booster
              </div>
              <div className="stat-card-sub" style={{ marginBottom: 18, lineHeight: 1.6 }}>
                Get daily reminders and speak about your day for 5 minutes to improve confidence and speaking skills.
              </div>
              <button className="btn-ghost" onClick={() => router.push("/comm")} disabled={loading}>
                <PlayIcon style={{ width: 14, height: 14 }} />
                {loading ? "Starting…" : "Start 5-Min Session"}
              </button>
            </div>

            {/* Avg Score */}
            <div className="card">
              <div className="stat-icon-wrap">
                <ChartBarIcon style={{ width: 20, height: 20, color: "var(--accent2)" }} />
              </div>
              <div className="stat-card-label">Avg. Score</div>
              <div className="stat-card-value">
                {averageScore === null ? "—" : `${averageScore}`}
                <span style={{ fontSize: 18 }}>{averageScore !== null ? "%" : ""}</span>
              </div>
              <div className="stat-card-sub">Across all completed sessions</div>
            </div>

            {/* Roadmaps */}
            <div className="card">
              <div className="tips-title">Placement & Internship Roadmaps</div>
              <div className="tip-item"><span className="tip-num">1</span>DSA Roadmap for coding interviews and problem solving.</div>
              <div className="tip-item"><span className="tip-num">2</span>Full Stack Development roadmap with MERN projects.</div>
              <div className="tip-item"><span className="tip-num">3</span>Aptitude + HR interview preparation tutorials.</div>
              <div className="tip-item"><span className="tip-num">4</span>Resume building and LinkedIn optimisation guides.</div>
              <button className="btn-primary" style={{ width: "100%", marginTop: 18, justifyContent: "center" }} onClick={() => router.push("/roadmaps")}>
                Explore Tutorials
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          <PortfolioBuilder />
          <DiscussionBoard />
        </div>
      </div>
    </div>
  );
}