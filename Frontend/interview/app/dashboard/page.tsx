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
   STYLES – injected once at mount so the file stays self-contained
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

  /* ── Hero ── */
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

  /* ── Grid ── */
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

  /* ── Cards ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .card:hover { border-color: var(--border-h); box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset; }

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
    background: var(--surface2);
    border: 1px solid var(--border);
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

  /* suggestions full width */
  .suggestions-block { grid-column: 1 / -1; }

  /* ── Side cards ── */
  .side-col { display: flex; flex-direction: column; gap: 20px; }

  .stat-card {}
  .stat-icon-wrap {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    background: rgba(124,109,250,0.1);
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

  /* Tips card */
  .tips-card {
    background: linear-gradient(145deg, rgba(124,109,250,0.18) 0%, rgba(52,211,153,0.06) 100%);
    border: 1px solid rgba(124,109,250,0.2);
    position: relative;
    overflow: hidden;
  }
  .tips-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,109,250,0.5), transparent);
  }
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

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dash {
    from { stroke-dashoffset: 283; }
  }
  .score-progress { animation: dash 1s cubic-bezier(.25,.8,.25,1) both; }

  /* scrollbar */
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
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="score-progress"
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div className="score-ring-center">
        <span className="score-num" style={{ color }}>
          {score}
        </span>
        <span className="score-label">/ 100</span>
      </div>
    </div>
  );
}

const TIPS = [
  "Mirror exact keywords from the job description",
  "Keep resume to one page when possible",
  "Quantify achievements with metrics",
  "Use clean, ATS-friendly formatting",
];

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

  // Inject styles once
  useEffect(() => {
    const id = "db-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => {
      document.getElementById(id)?.remove();
    };
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

  return (
    <div className="db-wrap">
      <div className="db-inner">
        {/* ── Hero ── */}
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
          <p>
            AI-powered practice sessions and live resume scoring — all in one
            place.
          </p>
          <button
            className="btn-primary"
            onClick={startInterview}
            disabled={loading}
          >
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
                <div className="ats-sub">
                  Drop your PDF to get an instant compatibility score
                </div>
              </div>
              <Folder color="#7c6dfa" size={1} items={[null, null, null]} />
            </div>

            {/* Drop Zone */}
            <label className="dropzone">
              <div className="dz-icon">
                <ArrowUpTrayIcon
                  style={{ width: 22, height: 22, color: "var(--accent2)" }}
                />
              </div>
              <div className="dz-title">Upload Resume</div>
              <div className="dz-sub">PDF only · max 5 MB</div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleATSUpload}
              />
            </label>

            {/* Loader */}
            {atsLoading && (
              <div className="ats-loader">
                <div className="loader-ring" />
                <div className="loader-text">Analyzing your resume…</div>
              </div>
            )}

            {/* Results */}
            {atsScore !== null && !atsLoading && (
              <>
                {/* Score */}
                <div className="score-section">
                  <ScoreRing score={atsScore} />
                  <div className="score-meta">
                    <div className="score-meta-title">
                      {atsScore >= 75
                        ? "Strong Match"
                        : atsScore >= 50
                          ? "Moderate Match"
                          : "Needs Work"}
                    </div>
                    <div className="score-meta-desc">
                      {atsScore >= 75
                        ? "Your resume is well-optimised for ATS parsing. A few tweaks could push it further."
                        : atsScore >= 50
                          ? "Good foundation. Address the weak areas below to improve your chances."
                          : "Significant gaps detected. Follow the suggestions to boost your score."}
                    </div>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="results-grid">
                  {strengths.length > 0 && (
                    <div className="result-block">
                      <div className="result-block-header">
                        <span className="dot dot-green" />
                        Strengths
                      </div>
                      {strengths.map((s, i) => (
                        <div key={i} className="result-item green">
                          <CheckCircleIcon
                            className="result-icon"
                            style={{ width: 14, height: 14, marginTop: 1 }}
                          />
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
                          <ExclamationTriangleIcon
                            className="result-icon"
                            style={{ width: 14, height: 14, marginTop: 1 }}
                          />
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
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        }}
                      >
                        {suggestions.map((s, i) => (
                          <div key={i} className="result-item purple">
                            <span
                              style={{
                                fontSize: 11,
                                marginTop: 2,
                                opacity: 0.6,
                                flexShrink: 0,
                              }}
                            >
                              →
                            </span>
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
            {/* Practice interviews */}
            {/* <div className="card stat-card">
              <div className="stat-icon-wrap">
                <PlayIcon
                  style={{ width: 22, height: 22, color: "var(--accent2)" }}
                />
              </div>

              <div className="stat-card-label">Daily Practice</div>

              <div
                className="stat-card-value"
                style={{ fontSize: 22, marginBottom: 10 }}
              >
                Communication Booster
              </div>

              <div className="stat-card-sub" style={{ marginBottom: 20 }}>
                Get daily WhatsApp reminders and speak about your day for 5
                minutes to improve communication confidence and speaking skills.
              </div>

              <button
                className="btn-ghost"
                onClick={() => router.push("/comm")}
                disabled={loading}
              >
                <PlayIcon style={{ width: 15, height: 15 }} />
                {loading ? "Starting…" : "Start 5-Min Session"}
              </button>
            </div> */}
            {/* Practice interviews */}
<div className="card stat-card" style={{ position: "relative" }}>

  {/* Points Badge */}
  <div
    style={{
      position: "absolute",
      top: 18,
      right: 18,
      background: "rgba(124,109,250,0.14)",
      border: "1px solid rgba(124,109,250,0.25)",
      color: "var(--accent2)",
      padding: "8px 12px",
      borderRadius: "999px",
      fontSize: 12,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 6,
      backdropFilter: "blur(10px)",
    }}
  >
    ⭐ {user?.points || 0} PTS
  </div>

  <div className="stat-icon-wrap">
    <PlayIcon
      style={{ width: 22, height: 22, color: "var(--accent2)" }}
    />
  </div>

  <div className="stat-card-label">Daily Practice</div>

  <div
    className="stat-card-value"
    style={{ fontSize: 22, marginBottom: 10 }}
  >
    Communication Booster
  </div>

  <div className="stat-card-sub" style={{ marginBottom: 20 }}>
    Get daily WhatsApp reminders and speak about your day for 5
    minutes to improve communication confidence and speaking skills.
  </div>

  <button
    className="btn-ghost"
    onClick={() => router.push("/comm")}
    disabled={loading}
  >
    <PlayIcon style={{ width: 15, height: 15 }} />
    {loading ? "Starting…" : "Start 5-Min Session"}
  </button>
</div>

            {/* Average score */}
            <div className="card stat-card">
              <div className="stat-icon-wrap">
                <ChartBarIcon
                  style={{ width: 22, height: 22, color: "var(--accent2)" }}
                />
              </div>
              <div className="stat-card-label">Avg. Score</div>
              <div className="stat-card-value">
                {formatScore()}
                <span style={{ fontSize: 20 }}>
                  {averageScore !== null ? "%" : ""}
                </span>
              </div>
              <div className="stat-card-sub">Across all completed sessions</div>
            </div>

            {/* Tips */}
            {/* Placement & Internship Roadmaps */}
<div className="card tips-card">
  <div className="tips-title">Placement & Internship Roadmaps</div>

  <div className="tip-item">
    <span className="tip-num">1</span>
    DSA Roadmap for coding interviews and problem solving.
  </div>

  <div className="tip-item">
    <span className="tip-num">2</span>
    Full Stack Development roadmap with MERN projects.
  </div>

  <div className="tip-item">
    <span className="tip-num">3</span>
    Aptitude + HR interview preparation tutorials.
  </div>

  <div className="tip-item">
    <span className="tip-num">4</span>
    Resume building and LinkedIn optimisation guides.
  </div>

  <button
    className="btn-primary"
    style={{
      width: "100%",
      marginTop: "20px",
      justifyContent: "center",
    }}
    onClick={() => router.push("/roadmaps")}
  >
    Explore Tutorials
  </button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
