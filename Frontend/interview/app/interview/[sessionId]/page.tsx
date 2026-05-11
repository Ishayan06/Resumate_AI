"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { interview } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { Question } from "@/types";
import toast from "react-hot-toast";

function getQuestionText(q: Question): string {
  return (q as any).questionText || (q as any).title || (q as any).text || "";
}
function getQuestionType(q: Question): string {
  return (q as any).type || (q as any).category || "General";
}

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { overflow: hidden; }

  @keyframes spin      { to { transform: rotate(360deg); } }
  @keyframes blink     { 0%,100%{ opacity:1 } 50%{ opacity:0.15 } }
  @keyframes pulseRing {
    0%,100%{ box-shadow: 0 0 0 0 rgba(99,102,241,0.45), 0 0 48px rgba(99,102,241,0.2); }
    50%     { box-shadow: 0 0 0 18px rgba(99,102,241,0), 0 0 48px rgba(99,102,241,0.2); }
  }
  @keyframes waveAnim {
    0%,100%{ transform: scaleY(1);   opacity: 0.5; }
    50%    { transform: scaleY(2.2); opacity: 1; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  textarea::placeholder { color: #252530; }
  textarea:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }

  button { transition: opacity 0.15s, transform 0.15s; font-family: 'DM Sans', sans-serif; }
  button:hover:not(:disabled) { opacity: 0.88; }
  button:active:not(:disabled) { transform: scale(0.96); }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }

  /* ── Interview shell — fullscreen, so no navbar offset needed ── */
  .iv-shell {
    display: flex; flex-direction: column;
    width: 100vw; height: 100dvh;
    overflow: hidden;
    background: #0a0a0f; color: #e8e8f0;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Top bar ── */
  .iv-topbar {
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
    padding: 8px 14px;
    background: #0d0d14; border-bottom: 1px solid #1e1e2a;
    gap: 10px;
    min-height: 44px;
  }
  .iv-session-id {
    font-size: 11px; color: #555; font-family: monospace;
    display: flex; align-items: center; gap: 6px;
    flex-shrink: 0; min-width: 0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .iv-progress-wrap {
    flex: 1; display: flex; align-items: center; gap: 8px;
    max-width: 280px; margin: 0 auto;
  }
  .iv-progress-bar {
    flex: 1; height: 3px; border-radius: 2px;
    background: #1e1e2a; overflow: hidden;
  }
  .iv-progress-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .iv-progress-label { font-size: 10px; color: #555; font-family: monospace; white-space: nowrap; flex-shrink: 0; }
  .iv-violations { font-size: 10px; color: #555; flex-shrink: 0; white-space: nowrap; }

  /* ── Body: desktop 2-col, mobile single column ── */
  .iv-body {
    flex: 1; min-height: 0;
    display: grid;
    grid-template-columns: 280px 1fr;
    overflow: hidden;
  }

  /* ── Sidebar ── */
  .iv-sidebar {
    display: flex; flex-direction: column;
    background: #0d0d14; border-right: 1px solid #1e1e2a;
    overflow: hidden;
    flex-shrink: 0;
  }

  .iv-camera {
    position: relative; flex-shrink: 0;
    background: #000; overflow: hidden;
    height: 190px;
  }
  .iv-video {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: opacity 0.5s ease;
  }
  .iv-cam-placeholder {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  }
  .iv-cam-badge {
    position: absolute; top: 7px; left: 7px;
    display: flex; align-items: center; gap: 4px;
    padding: 3px 8px; border-radius: 5px;
    background: rgba(0,0,0,0.65);
  }

  .iv-wave-bar {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px; border-bottom: 1px solid #1e1e2a; flex-shrink: 0;
  }
  .iv-waves { display: flex; align-items: center; gap: 2px; }
  .iv-wave-bar span { font-size: 11px; color: #555; flex: 1; }
  .iv-replay-btn {
    font-size: 10px; padding: 3px 9px; border-radius: 18px;
    background: #1a1a26; border: 1px solid #2a2a3a;
    color: #a78bfa; cursor: pointer; flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .iv-qlist { flex: 1; overflow-y: auto; padding: 4px 0; }
  .iv-qitem {
    display: flex; align-items: flex-start; gap: 9px;
    padding: 7px 12px;
    border-left: 2px solid transparent;
    transition: all 0.18s ease;
  }
  .iv-qnum { font-size: 10px; font-family: monospace; font-weight: 600; min-width: 16px; padding-top: 1px; flex-shrink: 0; }
  .iv-qtext { font-size: 11px; line-height: 1.45; flex: 1; min-width: 0; }

  .iv-main {
    display: flex; flex-direction: column;
    padding: clamp(12px, 2vw, 20px);
    gap: 12px;
    overflow: hidden;
    background: #0a0a0f;
  }

  .iv-question-card {
    border-radius: 16px; padding: clamp(16px, 2.5vw, 20px) clamp(16px, 2.5vw, 24px);
    background: #0d0d14; border: 1px solid #1e1e2a;
    position: relative; overflow: hidden; flex-shrink: 0;
  }
  .iv-question-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, transparent);
    pointer-events: none;
  }
  .iv-q-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
  .iv-q-badge {
    font-size: 10px; padding: 2px 10px; border-radius: 18px;
    font-family: monospace; background: #1a1a2e;
    border: 1px solid #2a2a40; color: #a78bfa;
    white-space: nowrap;
  }
  .iv-q-type { font-size: 10px; color: #444; flex-shrink: 0; }
  .iv-q-text {
    font-size: clamp(14px, 2.2vw, 18px); color: #e8e8f0;
    line-height: 1.65; font-weight: 500;
  }
  .iv-q-placeholder { font-size: 13px; color: #444; font-style: italic; }

  .iv-answer-wrap {
    display: flex; flex-direction: column;
    flex: 1; min-height: 0; gap: 7px;
  }
  .iv-answer-label {
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .iv-answer-label span { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 600; }
  .iv-recording-dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #ef4444; animation: blink 0.8s infinite; }
  .iv-textarea {
    flex: 1; min-height: 0;
    border-radius: 13px; padding: clamp(12px, 2vw, 16px);
    background: #0d0d14; color: #e8e8f0;
    font-size: clamp(13px, 2vw, 15px); line-height: 1.65; font-family: 'DM Sans', sans-serif;
    border: 1px solid #1e1e2a; resize: none; outline: none;
    transition: border-color 0.25s ease;
    -webkit-appearance: none;
  }

  .iv-actions {
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
    flex-wrap: wrap;
  }
  .iv-mic-btn {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1.5px solid #2a2a3a;
    background: #0d0d14; color: #555;
    font-size: 18px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .iv-word-count { font-size: 11px; color: #444; font-family: monospace; }
  .iv-submit-btn {
    margin-left: auto;
    display: flex; align-items: center; gap: 7px;
    padding: 11px clamp(18px, 3vw, 28px); border-radius: 100px; border: none;
    font-weight: 600; font-size: clamp(12px, 2vw, 14px);
    cursor: pointer; transition: all 0.2s ease;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .iv-submit-spinner {
    width: 13px; height: 13px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
    animation: spin 0.7s linear infinite; flex-shrink: 0;
  }

  /* ════════════════════════════════════
     MOBILE LAYOUT  (≤ 700px)
  ════════════════════════════════════ */
  @media (max-width: 700px) {
    body { overflow: hidden; }

    .iv-body {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }

    .iv-sidebar {
      flex-direction: row;
      border-right: none;
      border-bottom: 1px solid #1e1e2a;
      height: auto;
      overflow: visible;
      align-items: stretch;
    }

    .iv-camera {
      width: 110px;
      height: auto;
      min-height: 80px;
      flex-shrink: 0;
      border-right: 1px solid #1e1e2a;
    }

    .iv-qlist { display: none; }

    .iv-wave-bar {
      flex: 1; border-bottom: none;
      padding: 8px 10px;
      flex-direction: column; align-items: flex-start; justify-content: center;
      gap: 6px;
    }
    .iv-wave-bar span { font-size: 10px; }

    .iv-main {
      padding: 10px 12px 12px;
      gap: 8px;
      overflow: hidden;
    }

    .iv-question-card { padding: 12px 14px; border-radius: 13px; }
    .iv-q-text { font-size: 15px; line-height: 1.55; }

    .iv-textarea { font-size: 14px; padding: 12px; border-radius: 11px; }

    .iv-actions { flex-wrap: nowrap; gap: 8px; }
    .iv-mic-btn { width: 40px; height: 40px; font-size: 16px; }
    .iv-submit-btn { padding: 11px 18px; font-size: 13px; }
    .iv-word-count { display: none; }

    .iv-mobile-dots { display: flex; }

    .iv-topbar { padding: 6px 10px; min-height: 38px; }
    .iv-session-id { font-size: 10px; }
    .iv-progress-label { font-size: 9px; }
  }

  .iv-mobile-dots { display: none; }

  /* ── Gate screen — needs navbar offset since not in fullscreen ── */
  .iv-gate {
    width: 100vw; height: calc(100dvh - 64px);
    margin-top: 64px;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0f; font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
    padding: 16px;
  }
  .iv-gate-glow {
    position: absolute; width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 65%);
    top: 0; left: 50%; transform: translateX(-50%); pointer-events: none;
  }
  .iv-gate-inner {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    gap: 16px; width: 100%; max-width: 380px;
    animation: fadeSlideUp 0.5s ease both;
  }
  .iv-gate-icon {
    width: 72px; height: 72px; border-radius: 50%; font-size: 30px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    animation: pulseRing 2s ease-in-out infinite; flex-shrink: 0;
  }
  .iv-gate-title { font-size: clamp(20px,5vw,28px); font-weight: 600; color: #f0f0ff; line-height: 1.2; }
  .iv-gate-desc { font-size: clamp(12px,3vw,14px); color: #555; line-height: 1.7; }
  .iv-gate-rules {
    width: 100%; background: #0d0d14;
    border: 1px solid #1e1e2a; border-radius: 13px;
    padding: 14px 16px; text-align: left;
  }
  .iv-gate-rules-label { font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; margin-bottom: 9px; }
  .iv-gate-rule { display: flex; align-items: center; gap: 9px; padding: 4px 0; }
  .iv-gate-rule-dot { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }
  .iv-gate-rule span { font-size: 12px; color: #888; }
  .iv-gate-start {
    width: 100%; padding: clamp(12px,3vw,14px) 0; border-radius: 100px; border: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff; font-weight: 600; font-size: clamp(13px,3.5vw,15px);
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .iv-gate-violations { font-size: 11px; color: #ef4444; }

  /* ── Loading screen — needs navbar offset since not in fullscreen ── */
  .iv-loading {
    width: 100vw; height: calc(100dvh - 64px);
    margin-top: 64px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
    background: #0a0a0f;
  }
  .iv-loading-ring {
    width: 34px; height: 34px; border-radius: 50%;
    border: 2px solid #6366f1; border-top-color: transparent;
    animation: spin 0.8s linear infinite;
  }
  .iv-loading-text { font-size: 12px; color: #444; font-family: monospace; }

  @media (prefers-reduced-motion: reduce) {
    .iv-gate-icon { animation: none; }
    .iv-loading-ring { animation: none; border-top-color: #6366f1; }
  }
`;

export default function InterviewSession() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [loading, setLoading]           = useState(true);
  const [questions, setQuestions]       = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer]             = useState("");
  const [isListening, setIsListening]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violations, setViolations]     = useState(0);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [cameraReady, setCameraReady]   = useState(false);

  const videoRef       = useRef<HTMLVideoElement>(null);
  const streamRef      = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const voicesReadyRef = useRef(false);

  useEffect(() => {
    const id = "iv-global-css";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id; el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) router.replace("/login");
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      try {
        const res = await interview.getSession(sessionId);
        setQuestions(res.data.questions || []);
      } catch {
        toast.error("Failed to load session");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  const speakText = useCallback((text: string) => {
    if (!text || typeof window === "undefined") return;
    const doSpeak = () => {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang === "en-US" && /samantha|karen|victoria|zira|female/i.test(v.name)) ||
        voices.find((v) => v.lang === "en-US") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];
      if (preferred) utt.voice = preferred;
      utt.rate = 0.92; utt.pitch = 1.08; utt.volume = 1;
      utt.onstart = () => setIsSpeaking(true);
      utt.onend   = () => setIsSpeaking(false);
      utt.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utt);
    };
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) { voicesReadyRef.current = true; setTimeout(doSpeak, 350); }
    else {
      let tries = 0;
      const interval = setInterval(() => {
        tries++;
        const v = window.speechSynthesis.getVoices();
        if (v.length > 0 || tries > 15) {
          voicesReadyRef.current = true; clearInterval(interval); setTimeout(doSpeak, 200);
        }
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (!isFullscreen || questions.length === 0) return;
    const q = questions[currentIndex];
    if (q) { const text = getQuestionText(q); if (text) speakText(text); }
  }, [currentIndex, isFullscreen, questions, speakText]);

  useEffect(() => {
    if (!isFullscreen) return;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; setCameraReady(true); }
      } catch {
        toast.error("Camera/mic blocked — please allow permissions and refresh.");
      }
    })();
  }, [isFullscreen]);

  const stopAll = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    window.speechSynthesis.cancel();
    recognitionRef.current?.stop();
    setCameraReady(false); setIsListening(false); setIsSpeaking(false);
  }, []);

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        toast.error("Exited fullscreen — violation recorded");
        setIsFullscreen(false); setViolations((v) => v + 1); stopAll();
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [isFullscreen, stopAll]);

  useEffect(() => {
    const handle = () => {
      if (document.hidden) { toast.error("Tab switch detected — violation recorded"); setViolations((v) => v + 1); }
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      window.speechSynthesis.resume();
      setIsFullscreen(true);
    } catch {
      setIsFullscreen(true);
      toast("Fullscreen unavailable, continuing anyway.");
    }
  };

  const replayQuestion = () => {
    const q = questions[currentIndex];
    if (q) speakText(getQuestionText(q));
  };

  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("Speech recognition not supported in this browser."); return; }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const rec = new SR();
    rec.lang = "en-US"; rec.continuous = true; rec.interimResults = true;
    rec.onresult = (e: any) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setAnswer(t);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend   = () => { if (isListening) rec.start(); };
    recognitionRef.current = rec;
    rec.start(); setIsListening(true);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    recognitionRef.current?.stop(); setIsListening(false); setSubmitting(true);
    try {
      const res = await interview.submitAnswer({ sessionId, questionId: questions[currentIndex].id, answerText: answer });
      if (res.data.completed) { stopAll(); router.push(`/results/${sessionId}`); }
      else { setCurrentIndex((p) => p + 1); setAnswer(""); }
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const wordCount    = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const progressPct  = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;
  const isLast       = currentIndex + 1 === questions.length;
  const currentQ     = questions[currentIndex];
  const questionText = currentQ ? getQuestionText(currentQ) : "";
  const questionType = currentQ ? getQuestionType(currentQ) : "";

  if (loading) {
    return (
      <div className="iv-loading">
        <div className="iv-loading-ring" />
        <p className="iv-loading-text">Loading interview session…</p>
      </div>
    );
  }

  if (!isFullscreen) {
    return (
      <div className="iv-gate">
        <div className="iv-gate-glow" aria-hidden="true" />
        <div className="iv-gate-inner">
          <div className="iv-gate-icon" aria-hidden="true">🎙</div>
          <h1 className="iv-gate-title">Ready for your Interview?</h1>
          <p className="iv-gate-desc">
            The AI interviewer will speak each question aloud.<br />
            Answer by typing or using your microphone.
          </p>
          <div className="iv-gate-rules">
            <div className="iv-gate-rules-label">Before you begin</div>
            {["Camera & microphone access required", "Stay in fullscreen throughout", "No tab switching allowed", "AI reads questions automatically"].map((r) => (
              <div key={r} className="iv-gate-rule">
                <div className="iv-gate-rule-dot" />
                <span>{r}</span>
              </div>
            ))}
          </div>
          <button className="iv-gate-start" onClick={enterFullscreen}>
            Start Interview
          </button>
          {violations > 0 && (
            <p className="iv-gate-violations">⚠ {violations} violation{violations > 1 ? "s" : ""} recorded</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="iv-shell">
      <div className="iv-topbar">
        <div className="iv-session-id">
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "blink 1.2s infinite", flexShrink: 0 }} />
          #{sessionId?.slice(0, 8).toUpperCase() || "DEMO"}
        </div>
        <div className="iv-progress-wrap">
          <div className="iv-progress-bar">
            <div className="iv-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="iv-progress-label">{currentIndex + 1}/{questions.length}</span>
        </div>
        <div className="iv-violations">
          {violations > 0
            ? <span style={{ color: "#ef4444" }}>⚠ {violations}</span>
            : <span>No violations</span>
          }
        </div>
      </div>

      <div className="iv-body">
        <div className="iv-sidebar">
          <div className="iv-camera">
            <video
              ref={videoRef} autoPlay muted playsInline
              className="iv-video"
              style={{ opacity: cameraReady ? 1 : 0 }}
            />
            {!cameraReady && (
              <div className="iv-cam-placeholder">
                <div style={{ fontSize: 28, opacity: 0.2 }}>📷</div>
                <p style={{ fontSize: 11, color: "#333" }}>Starting…</p>
              </div>
            )}
            {cameraReady && (
              <div className="iv-cam-badge">
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444", animation: "blink 1.2s infinite" }} />
                <span style={{ fontSize: 9, color: "#ef4444", fontFamily: "monospace", fontWeight: 600 }}>LIVE</span>
              </div>
            )}
          </div>

          <div className="iv-wave-bar">
            <div className="iv-waves">
              {[6, 12, 8, 15, 8, 12, 6].map((h, i) => (
                <div key={i} style={{
                  width: 3, height: h, borderRadius: 2,
                  background: isSpeaking ? "#6366f1" : "#2a2a3a",
                  animation: isSpeaking ? `waveAnim 0.7s ease-in-out ${i * 0.08}s infinite` : "none",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <span>AI <span style={{ color: isSpeaking ? "#a78bfa" : "#333" }}>{isSpeaking ? "speaking…" : "ready"}</span></span>
            <button className="iv-replay-btn" onClick={replayQuestion}>↩ Replay</button>
            <div className="iv-mobile-dots" style={{ display: "none", alignItems: "center", gap: 5, marginTop: 4 }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: i < currentIndex ? "#22c55e" : i === currentIndex ? "#6366f1" : "#2a2a3a",
                  transition: "background 0.2s",
                }} />
              ))}
            </div>
          </div>

          <div className="iv-qlist">
            {questions.map((q, i) => (
              <div key={(q as any).id || i} className="iv-qitem" style={{
                background: i === currentIndex ? "rgba(99,102,241,0.1)" : i < currentIndex ? "rgba(34,197,94,0.05)" : "transparent",
                borderLeftColor: i === currentIndex ? "#6366f1" : i < currentIndex ? "#22c55e" : "#1e1e2a",
              }}>
                <div className="iv-qnum" style={{ color: i < currentIndex ? "#22c55e" : i === currentIndex ? "#a78bfa" : "#333" }}>
                  {i < currentIndex ? "✓" : i + 1}
                </div>
                <p className="iv-qtext" style={{ color: i === currentIndex ? "#bbb" : i < currentIndex ? "#444" : "#2e2e3a" }}>
                  {getQuestionText(q).slice(0, 52)}{getQuestionText(q).length > 52 ? "…" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="iv-main">
          <div className="iv-question-card">
            <div className="iv-q-meta">
              <div className="iv-q-badge">Question {currentIndex + 1}</div>
              <span className="iv-q-type">{questionType}</span>
            </div>
            {questionText
              ? <p className="iv-q-text">{questionText}</p>
              : <p className="iv-q-placeholder">Loading question…</p>
            }
          </div>

          <div className="iv-answer-wrap">
            <div className="iv-answer-label">
              <span>Your Answer</span>
              {isListening && (
                <span style={{ fontSize: 11, color: "#ef4444", display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="iv-recording-dot" />
                  Recording
                </span>
              )}
            </div>
            <textarea
              className="iv-textarea"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here, or tap the mic to speak…"
              style={{
                borderColor: isListening ? "#ef444450" : answer.trim() ? "#3a3a5a" : "#1e1e2a",
              }}
            />
          </div>

          <div className="iv-actions">
            <button
              className="iv-mic-btn"
              onClick={toggleMic}
              title={isListening ? "Stop recording" : "Start voice input"}
              aria-label={isListening ? "Stop recording" : "Start voice input"}
              style={{
                borderColor: isListening ? "#ef4444" : "#2a2a3a",
                background: isListening ? "rgba(239,68,68,0.12)" : "#0d0d14",
                color: isListening ? "#ef4444" : "#555",
                boxShadow: isListening ? "0 0 0 4px rgba(239,68,68,0.1)" : "none",
              }}
            >
              🎤
            </button>
            <span className="iv-word-count">{wordCount} {wordCount === 1 ? "word" : "words"}</span>
            <button
              className="iv-submit-btn"
              onClick={handleSubmit}
              disabled={!answer.trim() || submitting}
              style={{
                background: answer.trim() && !submitting ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1a1a22",
                color: answer.trim() && !submitting ? "#fff" : "#333",
                cursor: answer.trim() && !submitting ? "pointer" : "not-allowed",
              }}
            >
              {submitting
                ? <><div className="iv-submit-spinner" />Submitting…</>
                : <>{isLast ? "Finish" : "Next"} →</>
              }
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .iv-mobile-dots { display: flex !important; }
        }
      `}</style>
    </div>
  );
}