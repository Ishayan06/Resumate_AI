"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const MILESTONES = [
  { sec: 60,  pts: 2,  msg: "+2 pts — 1 minute done!" },
  { sec: 120, pts: 3,  msg: "+3 pts — 2 minutes!" },
  { sec: 180, pts: 5,  msg: "+5 pts — Great focus! 3 min" },
  { sec: 300, pts: 10, msg: "+10 pts — 5 minutes! Amazing!" },
  { sec: 600, pts: 20, msg: "+20 pts — 10 minutes! Superstar!" },
];

const BONUS_INTERVAL_SEC = 300;
const BONUS_PTS = 15;

const PROMPTS = [
  "Describe your morning routine in detail",
  "Talk about your favourite meal and why you love it",
  "What would be your perfect weekend day?",
  "Describe a memorable trip or place you visited",
  "Talk about a goal you are working towards",
  "What are three things you are grateful for today?",
  "Describe your home and neighbourhood",
  "Talk about a book, film, or show you enjoyed recently",
];

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// ── Replace with your actual logged-in user ID ──
const USER_ID = "YOUR_USER_ID";

const Page = () => {
  const router = useRouter();
  const videoRef        = useRef<HTMLVideoElement | null>(null);
  const streamRef       = useRef<MediaStream | null>(null);
  const recognitionRef  = useRef<SpeechRecognition | null>(null);
  const bonusTrackerRef = useRef(0);
  const pointsSavedRef  = useRef(false);

  const [seconds, setSeconds]       = useState(0);
  const [isRunning, setIsRunning]   = useState(false);
  const [points, setPoints]         = useState(0);
  const [reachedMilestones, setReachedMilestones] = useState<Set<number>>(new Set());
  const [toast, setToast]           = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isListening, setIsListening]   = useState(false);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [langWarning, setLangWarning]   = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");

  // ── Camera ─────────────────────────────────────────────
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraReady(true);
      } catch (err) {
        console.error("Camera access denied", err);
      }
    };
    startCamera();
    return () => { streamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, []);

  // ── Save points to DB — calls /comm/api ────────────────
  const savePointsToDB = useCallback(async (totalPoints: number) => {
    if (pointsSavedRef.current) return;
    pointsSavedRef.current = true;
    try {
      const res = await fetch("/comm/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, points: totalPoints }),
      });
      const data = await res.json();
      console.log("Points saved:", data);
    } catch (err) {
      console.error("Failed to save points", err);
    }
  }, []);

  // ── Speech Recognition ──────────────────────────────────
  const startSpeechRecognition = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      setIsSpeaking(false);
      if (recognitionRef.current) {
        try { recognition.start(); } catch (_) {}
      }
    };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "", final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += t; else interim += t;
      }
      const spoken = (final || interim).trim();
      if (spoken) {
        setIsSpeaking(true);
        setLastTranscript(spoken.slice(-100));
        const nonEnglish = /[\u0900-\u097F\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF]/.test(spoken);
        setLangWarning(nonEnglish);
        setTimeout(() => setIsSpeaking(false), 1500);
      }
    };
    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== "no-speech") console.error("Speech error:", e.error);
    };

    recognitionRef.current = recognition;
    try { recognition.start(); } catch (_) {}
  }, []);

  const stopSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setIsSpeaking(false);
    setLangWarning(false);
    setLastTranscript("");
  }, []);

  // ── Stopwatch ───────────────────────────────────────────
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // ── Milestones + Bonus + Save at 5 min ─────────────────
  useEffect(() => {
    let newPoints = 0;

    MILESTONES.forEach((m) => {
      if (seconds >= m.sec && !reachedMilestones.has(m.sec)) {
        setReachedMilestones((prev) => new Set([...prev, m.sec]));
        setPoints((prev) => prev + m.pts);
        newPoints += m.pts;
        showToast(m.msg);
      }
    });

    if (seconds > 600) {
      const bonusCount = Math.floor((seconds - 600) / BONUS_INTERVAL_SEC);
      if (bonusCount > bonusTrackerRef.current) {
        bonusTrackerRef.current = bonusCount;
        setPoints((prev) => prev + BONUS_PTS);
        newPoints += BONUS_PTS;
        showToast(`+${BONUS_PTS} pts — Keep going! 🔥`);
      }
    }

    // ✅ Exactly at 5 min → save all accumulated points to DB
    if (seconds === 300) {
      setPoints((prev) => {
        const total = prev + newPoints;
        savePointsToDB(total);
        return total;
      });
    }
  }, [seconds]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleStart = () => { setIsRunning(true); startSpeechRecognition(); };
  const handleStop  = () => { setIsRunning(false); stopSpeechRecognition(); };
  const handleReset = () => {
    handleStop();
    setSeconds(0); setPoints(0);
    setReachedMilestones(new Set());
    bonusTrackerRef.current = 0;
    pointsSavedRef.current = false;
  };

  const progressPct   = Math.min((seconds / 300) * 100, 100);
  const nextMilestone = MILESTONES.find((m) => !reachedMilestones.has(m.sec));

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 340px",
      gap: "14px",
      height: "100vh",
      padding: "14px",
      background: "#0f1117",
      color: "white",
      fontFamily: "system-ui, sans-serif",
      boxSizing: "border-box",
    }}>

      {/* ── LEFT ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        {/* Camera */}
        <div style={{
          position: "relative", borderRadius: "18px", overflow: "hidden",
          background: "#1a1d27", border: "0.5px solid rgba(255,255,255,0.08)",
          flex: "0 0 52vh",
        }}>
          {cameraReady ? (
            <video ref={videoRef} autoPlay muted playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "12px", color: "rgba(255,255,255,0.3)", fontSize: "13px",
            }}>
              <span style={{ fontSize: "36px" }}>📷</span>
              <span>Camera permission needed</span>
            </div>
          )}

          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          {isRunning && (
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              display: "flex", alignItems: "center", gap: "7px",
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              padding: "6px 12px", borderRadius: "30px", fontSize: "12px",
              color: "rgba(255,255,255,0.85)", border: "0.5px solid rgba(255,255,255,0.12)",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444",
                display: "inline-block", animation: "blink 1.2s infinite",
              }} />
              Live
            </div>
          )}

          {isRunning && (
            <div style={{
              position: "absolute", top: "12px", right: "12px",
              background: isSpeaking
                ? (langWarning ? "rgba(220,38,38,0.85)" : "rgba(22,163,74,0.85)")
                : "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              padding: "6px 12px", borderRadius: "30px", fontSize: "12px",
              color: "white", border: "0.5px solid rgba(255,255,255,0.12)",
              transition: "background 0.3s",
            }}>
              {isSpeaking
                ? (langWarning ? "⚠ Non-English detected" : "🎙 Speaking English")
                : (isListening ? "👂 Listening…" : "🔇 Silent")}
            </div>
          )}

          <div style={{
            position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
            fontSize: "42px", fontWeight: 600, letterSpacing: "2px",
            color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.7)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {fmt(seconds)}
          </div>

          <div style={{
            position: "absolute", top: "16px", left: "50%",
            transform: toast ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-80px)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            background: "#16a34a", color: "white",
            padding: "9px 18px", borderRadius: "30px",
            fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap",
            pointerEvents: "none", zIndex: 10,
          }}>
            {toast}
          </div>
        </div>

        {/* Transcript */}
        {isRunning && (
          <div style={{
            background: "#1a1d27", border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", padding: "9px 14px", fontSize: "12px",
            color: lastTranscript ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.22)",
            fontStyle: lastTranscript ? "normal" : "italic", lineHeight: 1.5,
          }}>
            {lastTranscript || "Start speaking — transcript appears here…"}
          </div>
        )}

        {/* Title + progress + Back */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9", marginBottom: "3px" }}>
                Daily Communication
              </h2>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>
                Speak English for 5+ min — points saved automatically
              </p>
            </div>
            <button onClick={() => router.back()} style={{
              background: "transparent", border: "0.5px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.45)", padding: "4px 10px",
              borderRadius: "8px", cursor: "pointer", fontSize: "11px",
            }}>
              ← Back
            </button>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", marginTop: "10px", overflow: "hidden" }}>
            <div style={{
              height: "100%", background: "#3b82f6", borderRadius: "99px",
              width: `${progressPct}%`, transition: "width 1s linear",
            }} />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleStart} disabled={isRunning} style={{
            ...btnBase, flex: 1,
            background: isRunning ? "#1e3a8a" : "#2563eb",
            color: isRunning ? "rgba(255,255,255,0.35)" : "white",
            cursor: isRunning ? "not-allowed" : "pointer",
          }}>▶ Start</button>
          <button onClick={handleStop} style={{
            ...btnBase, flex: 1,
            background: isRunning ? "#dc2626" : "#1a1d27",
            color: isRunning ? "white" : "rgba(255,255,255,0.35)",
            border: "0.5px solid rgba(255,255,255,0.1)",
          }}>⏸ Pause</button>
          <button onClick={handleReset} style={{
            ...btnBase, flex: 1,
            background: "#1a1d27", color: "rgba(255,255,255,0.38)",
            border: "0.5px solid rgba(255,255,255,0.08)",
          }}>↺ Reset</button>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>

        {/* Timer + Points */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={cardStyle}>
            <div style={labelStyle}>Practice Time</div>
            <div style={valStyle}>{fmt(seconds)}</div>
            <div style={subStyle}>Goal: 5 min</div>
          </div>
          <div style={cardStyle}>
            <div style={labelStyle}>Points Earned</div>
            <div style={valStyle}>{points}</div>
            <div style={subStyle}>
              {nextMilestone
                ? `Next +${nextMilestone.pts} @ ${fmt(nextMilestone.sec)}`
                : `+${BONUS_PTS} every 5 min 🔥`}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div style={cardStyle}>
          <div style={labelStyle}>Milestones</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "8px" }}>
            {MILESTONES.map((m) => {
              const done = reachedMilestones.has(m.sec);
              return (
                <div key={m.sec} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "6px 10px", borderRadius: "8px",
                  background: done ? "rgba(22,163,74,0.1)" : "rgba(255,255,255,0.02)",
                  border: `0.5px solid ${done ? "rgba(22,163,74,0.25)" : "rgba(255,255,255,0.05)"}`,
                }}>
                  <span style={{ fontSize: "12px", color: done ? "#4ade80" : "rgba(255,255,255,0.38)" }}>
                    {done ? "✓" : "○"} {fmt(m.sec)}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: done ? "#4ade80" : "rgba(255,255,255,0.2)" }}>
                    +{m.pts} pts
                  </span>
                </div>
              );
            })}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "6px 10px", borderRadius: "8px",
              background: "rgba(59,130,246,0.07)", border: "0.5px solid rgba(59,130,246,0.18)",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(147,197,253,0.65)" }}>🔁 Every 5 min after 10:00</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(147,197,253,0.65)" }}>+{BONUS_PTS} pts</span>
            </div>
          </div>
        </div>

        {/* Speaking Prompts */}
        <div style={{ ...cardStyle, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={labelStyle}>💬 Speaking prompts</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", overflow: "hidden", marginTop: "6px" }}>
            {PROMPTS.map((p, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.05)",
                borderRadius: "8px", padding: "6px 10px",
                fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4,
              }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  background: "#1a1d27", borderRadius: "14px",
  border: "0.5px solid rgba(255,255,255,0.08)", padding: "14px 16px",
};
const labelStyle: React.CSSProperties = {
  fontSize: "11px", textTransform: "uppercase",
  letterSpacing: "1px", color: "rgba(255,255,255,0.38)", marginBottom: "4px",
};
const valStyle: React.CSSProperties = {
  fontSize: "30px", fontWeight: 600, color: "#f1f5f9", fontVariantNumeric: "tabular-nums",
};
const subStyle: React.CSSProperties = {
  fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "2px",
};
const btnBase: React.CSSProperties = {
  padding: "11px 8px", borderRadius: "11px",
  border: "none", fontWeight: 600, fontSize: "13px", cursor: "pointer",
};

export default Page;