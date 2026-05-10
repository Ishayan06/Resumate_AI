"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const USER_ID = "YOUR_USER_ID";

// ─────────────────────────────────────────────────────────────
// SPEECH RECOGNITION TYPES FIX
// ─────────────────────────────────────────────────────────────
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }

  interface SpeechRecognitionInstance {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    start(): void;
    stop(): void;
  }
}

// ─────────────────────────────────────────────────────────────
// ONBOARDING GATE
// ─────────────────────────────────────────────────────────────
const OnboardingGate = ({ onComplete }: { onComplete: () => void }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [leaving, setLeaving]   = useState(false);
  const [saved, setSaved]       = useState(false);

  const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

  const proceed = async (withTelegram: boolean) => {
    if (withTelegram) {
      const clean = username.replace(/^@/, "").trim();
      if (clean.length < 3) {
        setError("Please enter a valid Telegram username.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      if (withTelegram) {
        const clean = username.replace(/^@/, "").trim();
        const res = await fetch("http://localhost:3001/api/telegram/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, telegramUsername: clean }),
        });
        if (!res.ok) throw new Error("Failed to save");
        setSaved(true);
        window.open(`https://t.me/${BOT_USERNAME}?start=${USER_ID}`, "_blank");
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    setLeaving(true);
    setTimeout(onComplete, 480);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "#0f1117",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: leaving ? "opacity 0.48s ease, transform 0.48s ease" : "none",
      opacity: leaving ? 0 : 1,
      transform: leaving ? "scale(1.04)" : "scale(1)",
    }}>
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "420px", margin: "0 16px",
        background: "#1a1d27",
        border: "0.5px solid rgba(255,255,255,0.10)",
        borderRadius: "22px",
        padding: "36px 32px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        animation: "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* Icon */}
        <div style={{
          width: "52px", height: "52px", borderRadius: "14px",
          background: "rgba(37,99,235,0.14)",
          border: "0.5px solid rgba(59,130,246,0.28)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px", marginBottom: "20px",
        }}>🎙</div>

        <h1 style={{
          fontSize: "20px", fontWeight: 700, color: "#f1f5f9",
          margin: "0 0 6px", fontFamily: "system-ui, sans-serif",
        }}>
          Daily speaking reminders
        </h1>
        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.38)",
          margin: "0 0 28px", lineHeight: 1.6,
        }}>
          Get a daily nudge on{" "}
          <span style={{ color: "#60a5fa" }}>Telegram</span> to practice your
          English — completely free, no phone number needed.
        </p>

        {/* How it works */}
        <div style={{
          background: "rgba(37,99,235,0.07)",
          border: "0.5px solid rgba(59,130,246,0.18)",
          borderRadius: "12px", padding: "12px 14px",
          marginBottom: "20px",
        }}>
          <p style={{
            fontSize: "11px", color: "rgba(147,197,253,0.8)",
            margin: "0 0 8px", fontWeight: 600, letterSpacing: "0.5px",
          }}>
            HOW IT WORKS
          </p>
          {([
            ["1", "Enter your Telegram @username below"],
            ["2", "We'll open our Telegram bot — tap Start"],
            ["3", "Get daily reminders every morning 🌅"],
          ] as [string, string][]).map(([n, t]) => (
            <div key={n} style={{
              display: "flex", gap: "10px", alignItems: "flex-start",
              marginBottom: n === "3" ? 0 : "6px",
            }}>
              <span style={{
                minWidth: "20px", height: "20px", borderRadius: "50%",
                background: "rgba(59,130,246,0.25)", color: "#93c5fd",
                fontSize: "10px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{n}</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Username input */}
        <label style={{ display: "block", marginBottom: "8px" }}>
          <span style={{
            fontSize: "11px", color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.8px", textTransform: "uppercase",
          }}>
            Telegram Username
          </span>
          <div style={{
            marginTop: "6px", display: "flex", alignItems: "center",
            background: "rgba(255,255,255,0.04)",
            border: `0.5px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.10)"}`,
            borderRadius: "10px", overflow: "hidden",
            transition: "border-color 0.2s",
          }}>
            <span style={{
              padding: "0 12px", fontSize: "15px", lineHeight: "44px",
              borderRight: "0.5px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.3)",
            }}>✈️</span>
            <input
              type="text"
              placeholder="@your_username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(""); }}
              style={{
                flex: 1, height: "44px", padding: "0 14px",
                background: "transparent", border: "none", outline: "none",
                color: "#f1f5f9", fontSize: "14px",
                fontFamily: "system-ui, sans-serif",
              }}
            />
          </div>
          <p style={{
            fontSize: "11px", color: "rgba(255,255,255,0.22)",
            marginTop: "6px", lineHeight: 1.5,
          }}>
            Find your username in Telegram → Settings → Username
          </p>
          {error && (
            <span style={{ fontSize: "11px", color: "#f87171", marginTop: "5px", display: "block" }}>
              {error}
            </span>
          )}
        </label>

        {/* Success banner */}
        {saved && (
          <div style={{
            background: "rgba(22,163,74,0.1)",
            border: "0.5px solid rgba(34,197,94,0.25)",
            borderRadius: "10px", padding: "10px 14px",
            marginTop: "12px", marginBottom: "4px",
            fontSize: "12px", color: "#4ade80", lineHeight: 1.5,
          }}>
            ✅ Saved! A Telegram window just opened — tap{" "}
            <strong>Start</strong> in the bot chat to activate your reminders.
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
          <button
            onClick={() => proceed(true)}
            disabled={loading}
            style={{
              height: "44px", borderRadius: "10px", border: "none",
              background: loading ? "#1e3a8a" : "#2563eb",
              color: loading ? "rgba(255,255,255,0.4)" : "white",
              fontSize: "13px", fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s, transform 0.15s",
              fontFamily: "system-ui, sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}
            onMouseDown={e => { if (!loading) (e.currentTarget.style.transform = "scale(0.98)"); }}
            onMouseUp={e => { (e.currentTarget.style.transform = "scale(1)"); }}
          >
            {loading ? "Opening Telegram…" : <><span>✈️</span> Connect Telegram & get reminders</>}
          </button>

          <button
            onClick={() => proceed(false)}
            disabled={loading}
            style={{
              height: "44px", borderRadius: "10px",
              border: "0.5px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "rgba(255,255,255,0.38)",
              fontSize: "13px", fontWeight: 500,
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s, transform 0.15s",
              fontFamily: "system-ui, sans-serif",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.38)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
            onMouseDown={e => { (e.currentTarget.style.transform = "scale(0.98)"); }}
            onMouseUp={e => { (e.currentTarget.style.transform = "scale(1)"); }}
          >
            No thanks — just start practicing
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
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

const MainPage = () => {
  const router = useRouter();
  const videoRef        = useRef<HTMLVideoElement | null>(null);
  const streamRef       = useRef<MediaStream | null>(null);
  const recognitionRef  = useRef<SpeechRecognitionInstance | null>(null);
  const bonusTrackerRef = useRef(0);
  const pointsSavedRef  = useRef(false);

  const [seconds, setSeconds]       = useState(0);
  const [isRunning, setIsRunning]   = useState(false);
  const [points, setPoints]         = useState(0);
  const [reachedMilestones, setReachedMilestones] = useState<Set<number>>(new Set());
  const [toast, setToast]           = useState<string | null>(null);
  const [cameraReady, setCameraReady]     = useState(false);
  const [isListening, setIsListening]     = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [langWarning, setLangWarning]     = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraReady(true);
      } catch (err) { console.error("Camera access denied", err); }
    };
    startCamera();
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const savePointsToDB = useCallback(async (totalPoints: number) => {
    if (pointsSavedRef.current) return;
    pointsSavedRef.current = true;
    try {
      const res = await fetch("http://localhost:3001/comm/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, points: totalPoints }),
      });
      const data = await res.json();
      console.log("Points saved:", data);
    } catch (err) { console.error("Failed to save points", err); }
  }, []);

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
      if (recognitionRef.current) { try { recognition.start(); } catch (_) {} }
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

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    let newPoints = 0;
    MILESTONES.forEach(m => {
      if (seconds >= m.sec && !reachedMilestones.has(m.sec)) {
        setReachedMilestones(prev => new Set([...prev, m.sec]));
        setPoints(prev => prev + m.pts);
        newPoints += m.pts;
        showToast(m.msg);
      }
    });
    if (seconds > 600) {
      const bonusCount = Math.floor((seconds - 600) / BONUS_INTERVAL_SEC);
      if (bonusCount > bonusTrackerRef.current) {
        bonusTrackerRef.current = bonusCount;
        setPoints(prev => prev + BONUS_PTS);
        newPoints += BONUS_PTS;
        showToast(`+${BONUS_PTS} pts — Keep going! 🔥`);
      }
    }
    if (seconds === 300) {
      setPoints(prev => { const total = prev + newPoints; savePointsToDB(total); return total; });
    }
  }, [seconds]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800); };
  const handleStart = () => { setIsRunning(true); startSpeechRecognition(); };
  const handleStop  = () => { setIsRunning(false); stopSpeechRecognition(); };
  const handleReset = () => {
    handleStop(); setSeconds(0); setPoints(0);
    setReachedMilestones(new Set());
    bonusTrackerRef.current = 0; pointsSavedRef.current = false;
  };

  const progressPct   = Math.min((seconds / 300) * 100, 100);
  const nextMilestone = MILESTONES.find(m => !reachedMilestones.has(m.sec));

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 340px",
      gap: "14px", height: "100vh", padding: "14px",
      background: "#0f1117", color: "white",
      fontFamily: "system-ui, sans-serif", boxSizing: "border-box",
    }}>
      {/* LEFT */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          }}>{fmt(seconds)}</div>
          <div style={{
            position: "absolute", top: "16px", left: "50%",
            transform: toast ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-80px)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            background: "#16a34a", color: "white",
            padding: "9px 18px", borderRadius: "30px",
            fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap",
            pointerEvents: "none", zIndex: 10,
          }}>{toast}</div>
        </div>

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
            }}>← Back</button>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", marginTop: "10px", overflow: "hidden" }}>
            <div style={{
              height: "100%", background: "#3b82f6", borderRadius: "99px",
              width: `${progressPct}%`, transition: "width 1s linear",
            }} />
          </div>
        </div>

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

      {/* RIGHT */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
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

        <div style={cardStyle}>
          <div style={labelStyle}>Milestones</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "8px" }}>
            {MILESTONES.map(m => {
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

        <div style={{ ...cardStyle, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={labelStyle}>💬 Speaking prompts</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", overflow: "hidden", marginTop: "6px" }}>
            {PROMPTS.map((p, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.05)",
                borderRadius: "8px", padding: "6px 10px",
                fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4,
              }}>{p}</div>
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

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
const Page = () => {
  const [gateCleared, setGateCleared] = useState(false);
  const [showMain, setShowMain]       = useState(false);

  const handleComplete = () => {
    setGateCleared(true);
    setTimeout(() => setShowMain(true), 500);
  };

  return (
    <>
      {!gateCleared && <OnboardingGate onComplete={handleComplete} />}
      {showMain      && <MainPage />}
    </>
  );
};

// ── Shared styles ──
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