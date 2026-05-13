"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { communication } from "@/lib/api"; // adjust path to your api.ts

const API_URL = "https://resumate-ai-2cg5.onrender.com";

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

const OnboardingGate = ({ onComplete }: { onComplete: () => void }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

        // ── get real userId from localStorage (adjust key if needed) ──
        const authRaw =
          localStorage.getItem("user") ||
          localStorage.getItem("authUser") ||
          "{}";
        let userId: string | null = null;
        try {
          const parsed = JSON.parse(authRaw);
          userId = parsed?.id || parsed?._id || parsed?.userId || null;
        } catch {
          userId = null;
        }

        if (!userId) {
          setError("Please log in first.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/api/telegram/save-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            telegramUsername: clean,
          }),
        });

        if (!res.ok) throw new Error("Failed to save");

        setSaved(true);

        // pass real userId so bot can link the chat_id
        window.open(`https://t.me/${BOT_USERNAME}?start=${userId}`, "_blank");

        await new Promise((r) => setTimeout(r, 2000));
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#0f1117",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: leaving
          ? "opacity 0.48s ease, transform 0.48s ease"
          : "none",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.04)" : "scale(1)",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          background: "#1a1d27",
          border: "0.5px solid rgba(255,255,255,0.10)",
          borderRadius: "22px",
          padding: "36px 32px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(37,99,235,0.14)",
            border: "0.5px solid rgba(59,130,246,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          🎙
        </div>

        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 6px",
          }}
        >
          Daily speaking reminders
        </h1>

        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.38)",
            margin: "0 0 28px",
            lineHeight: 1.6,
          }}
        >
          Get a daily nudge on{" "}
          <span style={{ color: "#60a5fa" }}>Telegram</span> to practice your
          English — completely free.
        </p>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            Telegram Username
          </span>

          <div
            style={{
              marginTop: "6px",
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: `0.5px solid ${
                error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.10)"
              }`,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                padding: "0 12px",
                fontSize: "15px",
                lineHeight: "44px",
                borderRight: "0.5px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              ✈️
            </span>

            <input
              type="text"
              placeholder="@your_username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              style={{
                flex: 1,
                height: "44px",
                padding: "0 14px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f1f5f9",
                fontSize: "14px",
              }}
            />
          </div>

          {error && (
            <span
              style={{
                fontSize: "11px",
                color: "#f87171",
                marginTop: "5px",
                display: "block",
              }}
            >
              {error}
            </span>
          )}
        </label>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          <button
            onClick={() => proceed(true)}
            disabled={loading}
            style={{
              height: "44px",
              borderRadius: "10px",
              border: "none",
              background: loading ? "#1e3a8a" : "#2563eb",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {loading
              ? "Opening Telegram…"
              : "✈️ Connect Telegram & get reminders"}
          </button>

          <button
            onClick={() => proceed(false)}
            style={{
              height: "44px",
              borderRadius: "10px",
              border: "0.5px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "rgba(255,255,255,0.38)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Already done
          </button>
        </div>
      </div>
    </div>
  );
};

const MILESTONES = [
  { sec: 60, pts: 2, msg: "+2 pts — 1 minute done!" },
  { sec: 120, pts: 3, msg: "+3 pts — 2 minutes!" },
  { sec: 180, pts: 5, msg: "+5 pts — Great focus! 3 min" },
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
];

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0",
  )}`;

const MainPage = () => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);

  // ── refs to track awarded milestones & bonus ──
  const awardedMilestones = useRef(new Set<number>());
  const lastBonusAt = useRef(0);

  // ── save points to backend ──
  const savePoints = useCallback(async (pts: number) => {
    try {
      await communication.updatePoints(pts);
    } catch (err) {
      console.error("Failed to save points", err);
    }
  }, []);

  useEffect(() => {
    const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = stream;
    setCameraReady(true);

    // wait for React to render the <video> element, then assign
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
      }
    }, 100);
  } catch (err) {
    console.error(err);
  }
};

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ── timer ──
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // ── milestone + bonus point awarding ──
  useEffect(() => {
    if (!isRunning) return;

    // Milestones
    MILESTONES.forEach((m) => {
      if (seconds === m.sec && !awardedMilestones.current.has(m.sec)) {
        awardedMilestones.current.add(m.sec);
        setPoints((prev) => prev + m.pts);
        savePoints(m.pts);

        // ── at 5 min mark, tell backend session is done ──
        // so the daily reminder is skipped for today
        if (m.sec === 300) {
          fetch(`${API_URL}/api/session/complete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }).catch(console.error);
        }
      }
    });

    // Bonus every 5 min after 10:00
    if (
      seconds > 600 &&
      seconds % BONUS_INTERVAL_SEC === 0 &&
      seconds !== lastBonusAt.current
    ) {
      lastBonusAt.current = seconds;
      setPoints((prev) => prev + BONUS_PTS);
      savePoints(BONUS_PTS);
    }
  }, [seconds, isRunning, savePoints]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setPoints(0);
    awardedMilestones.current.clear();
    lastBonusAt.current = 0;
  };

  const progressPct = Math.min((seconds / 300) * 100, 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        padding: "14px",
        color: "white",
      }}
    >
      <div className="main-layout">
        {/* LEFT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#1a1d27",
              border: "0.5px solid rgba(255,255,255,0.08)",
              height: "52vh",
              minHeight: "320px",
              maxHeight: "620px",
            }}
          >
            {cameraReady ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scaleX(-1)", // mirrors like a selfie camera
                }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                📷 Camera permission needed
              </div>
            )}

            <div
              style={{
                position: "absolute",
                bottom: "14px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(30px,6vw,42px)",
                fontWeight: 600,
                letterSpacing: "2px",
              }}
            >
              {fmt(seconds)}
            </div>
          </div>

          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#f1f5f9",
                    marginBottom: "3px",
                  }}
                >
                  Daily Communication
                </h2>

                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  Speak English for 5+ min
                </p>
              </div>

              <button
                onClick={() => router.back()}
                style={{
                  background: "transparent",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.45)",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                ← Back
              </button>
            </div>

            <div
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "99px",
                marginTop: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#3b82f6",
                  borderRadius: "99px",
                  width: `${progressPct}%`,
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
              gap: "8px",
            }}
          >
            <button
              onClick={handleStart}
              disabled={isRunning}
              style={{
                ...btnBase,
                background: "#2563eb",
                color: "white",
              }}
            >
              ▶ Start
            </button>

            <button
              onClick={handleStop}
              style={{
                ...btnBase,
                background: "#dc2626",
                color: "white",
              }}
            >
              ⏸ Pause
            </button>

            <button
              onClick={handleReset}
              style={{
                ...btnBase,
                background: "#1a1d27",
                color: "rgba(255,255,255,0.38)",
                border: "0.5px solid rgba(255,255,255,0.08)",
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
              gap: "10px",
            }}
          >
            <div style={cardStyle}>
              <div style={labelStyle}>Practice Time</div>
              <div style={valStyle}>{fmt(seconds)}</div>
            </div>

            <div style={cardStyle}>
              <div style={labelStyle}>Points Earned</div>
              <div style={valStyle}>{points}</div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>⚡ Point System</div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",
                marginTop: "10px",
              }}
            >
              {MILESTONES.map((m) => (
                <div
                  key={m.sec}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    background: awardedMilestones.current.has(m.sec)
                      ? "rgba(37,99,235,0.12)"
                      : "rgba(255,255,255,0.03)",
                    border: awardedMilestones.current.has(m.sec)
                      ? "0.5px solid rgba(59,130,246,0.3)"
                      : "0.5px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.55)",
                      fontWeight: 500,
                    }}
                  >
                    {fmt(m.sec)}
                  </span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#60a5fa",
                      fontWeight: 700,
                    }}
                  >
                    +{m.pts} pts
                  </span>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: "10px",
                  background: "rgba(59,130,246,0.08)",
                  border: "0.5px solid rgba(59,130,246,0.16)",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(147,197,253,0.75)",
                    fontWeight: 500,
                  }}
                >
                  Every 5 min after 10:00
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#93c5fd",
                    fontWeight: 700,
                  }}
                >
                  +{BONUS_PTS} pts
                </span>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>💬 Speaking prompts</div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginTop: "8px",
              }}
            >
              {PROMPTS.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    padding: "8px 10px",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.5,
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 1024px) {
          .main-layout {
            grid-template-columns: minmax(0,1fr) 340px;
            align-items: start;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

const Page = () => {
  const [gateCleared, setGateCleared] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleComplete = () => {
    setGateCleared(true);
    setTimeout(() => setShowMain(true), 500);
  };

  return (
    <>
      {!gateCleared && <OnboardingGate onComplete={handleComplete} />}
      {showMain && <MainPage />}
    </>
  );
};

const cardStyle: React.CSSProperties = {
  background: "#1a1d27",
  borderRadius: "14px",
  border: "0.5px solid rgba(255,255,255,0.08)",
  padding: "14px 16px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "rgba(255,255,255,0.38)",
  marginBottom: "4px",
};

const valStyle: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: 600,
  color: "#f1f5f9",
};

const btnBase: React.CSSProperties = {
  padding: "11px 8px",
  borderRadius: "11px",
  border: "none",
  fontWeight: 600,
  fontSize: "13px",
  cursor: "pointer",
};

export default Page;