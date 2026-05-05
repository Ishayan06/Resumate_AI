"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { interview } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { Question } from "@/types";
import toast from "react-hot-toast";

// ─── helpers ────────────────────────────────────────────────────────────────
function getQuestionText(q: Question): string {
  return (q as any).questionText || (q as any).title || (q as any).text || "";
}
function getQuestionType(q: Question): string {
  return (q as any).type || (q as any).category || "General";
}

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

  // ─── AUTH ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated()) router.replace("/login");
  }, []);

  // ─── FETCH SESSION ────────────────────────────────────────────────────────
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

  // ─── VOICE ENGINE ─────────────────────────────────────────────────────────
  // Polls until browser voices are loaded, then speaks.
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
      utt.rate   = 0.92;
      utt.pitch  = 1.08;
      utt.volume = 1;

      utt.onstart = () => setIsSpeaking(true);
      utt.onend   = () => setIsSpeaking(false);
      utt.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utt);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesReadyRef.current = true;
      setTimeout(doSpeak, 350);
    } else {
      let tries = 0;
      const interval = setInterval(() => {
        tries++;
        const v = window.speechSynthesis.getVoices();
        if (v.length > 0 || tries > 15) {
          voicesReadyRef.current = true;
          clearInterval(interval);
          setTimeout(doSpeak, 200);
        }
      }, 200);
    }
  }, []);

  // ─── AUTO-SPEAK ON QUESTION CHANGE ───────────────────────────────────────
  useEffect(() => {
    if (!isFullscreen || questions.length === 0) return;
    const q = questions[currentIndex];
    if (!q) return;
    const text = getQuestionText(q);
    if (text) speakText(text);
  }, [currentIndex, isFullscreen, questions, speakText]);

  // ─── CAMERA ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isFullscreen) return;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch {
        toast.error("Camera/mic blocked — please allow permissions and refresh.");
      }
    })();
  }, [isFullscreen]);

  // ─── STOP ALL ─────────────────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    window.speechSynthesis.cancel();
    recognitionRef.current?.stop();
    setCameraReady(false);
    setIsListening(false);
    setIsSpeaking(false);
  }, []);

  // ─── FULLSCREEN GUARD ─────────────────────────────────────────────────────
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        toast.error("Exited fullscreen — violation recorded");
        setIsFullscreen(false);
        setViolations((v) => v + 1);
        stopAll();
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [isFullscreen, stopAll]);

  // ─── TAB SWITCH GUARD ─────────────────────────────────────────────────────
  useEffect(() => {
    const handle = () => {
      if (document.hidden) {
        toast.error("Tab switch detected — violation recorded");
        setViolations((v) => v + 1);
      }
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  // ─── ENTER FULLSCREEN ─────────────────────────────────────────────────────
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

  // ─── REPLAY ───────────────────────────────────────────────────────────────
  const replayQuestion = () => {
    const q = questions[currentIndex];
    if (q) speakText(getQuestionText(q));
  };

  // ─── MIC TOGGLE ───────────────────────────────────────────────────────────
  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("Speech recognition not supported in this browser."); return; }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (e: any) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setAnswer(t);
    };
    rec.onerror  = () => setIsListening(false);
    rec.onend    = () => { if (isListening) rec.start(); };

    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  };

  // ─── SUBMIT ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!answer.trim()) return;
    recognitionRef.current?.stop();
    setIsListening(false);
    setSubmitting(true);
    try {
      const res = await interview.submitAnswer({
        sessionId,
        questionId: questions[currentIndex].id,
        answerText: answer,
      });
      if (res.data.completed) {
        stopAll();
        router.push(`/results/${sessionId}`);
      } else {
        setCurrentIndex((p) => p + 1);
        setAnswer("");
      }
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── DERIVED ──────────────────────────────────────────────────────────────
  const wordCount      = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const progressPct    = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;
  const isLast         = currentIndex + 1 === questions.length;
  const currentQ       = questions[currentIndex];
  const questionText   = currentQ ? getQuestionText(currentQ) : "";
  const questionType   = currentQ ? getQuestionType(currentQ) : "";

  // ─── LOADING ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "#0a0a0f" }}>
        <div className="animate-spin w-9 h-9 rounded-full"
          style={{ border: "2px solid #6366f1", borderTopColor: "transparent" }} />
        <p style={{ color: "#444", fontSize: 13, fontFamily: "monospace" }}>
          Loading interview session…
        </p>
      </div>
    );
  }

  // ─── GATE SCREEN ──────────────────────────────────────────────────────────
  if (!isFullscreen) {
    return (
      <div className="h-screen w-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#0a0a0f", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* Glow */}
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.13), transparent 65%)",
          top: "5%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
        }} />

        <div className="relative z-10 flex flex-col items-center text-center gap-5"
          style={{ maxWidth: 400, width: "100%", padding: "0 24px" }}>

          {/* Icon */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%", fontSize: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            animation: "pulseRing 2s ease-in-out infinite",
          }}>🎙</div>

          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#f0f0ff", margin: 0 }}>
            Ready for your Interview?
          </h1>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: 0 }}>
            The AI interviewer will speak each question aloud.<br />
            Answer by typing or using your microphone.
          </p>

          {/* Rules */}
          <div style={{
            width: "100%", background: "#0d0d14",
            border: "1px solid #1e1e2a", borderRadius: 14,
            padding: "16px 20px", textAlign: "left",
          }}>
            <p style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 10 }}>
              Before you begin
            </p>
            {[
              "Camera & microphone access required",
              "Stay in fullscreen throughout",
              "No tab switching allowed",
              "AI reads questions automatically",
            ].map((r) => (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#888" }}>{r}</span>
              </div>
            ))}
          </div>

          <button onClick={enterFullscreen} style={{
            width: "100%", padding: "14px 0", borderRadius: 100, border: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer",
            fontFamily: "inherit", transition: "transform 0.15s, opacity 0.15s",
          }}>
            Start Interview
          </button>

          {violations > 0 && (
            <p style={{ fontSize: 12, color: "#ef4444" }}>
              ⚠ {violations} violation{violations > 1 ? "s" : ""} recorded
            </p>
          )}
        </div>

        <style>{GLOBAL_CSS}</style>
      </div>
    );
  }

  // ─── MAIN INTERVIEW UI ────────────────────────────────────────────────────
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col"
      style={{ background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between flex-shrink-0"
        style={{ padding: "10px 20px", background: "#0d0d14", borderBottom: "1px solid #1e1e2a" }}>

        {/* Left: session id */}
        <div className="flex items-center gap-2" style={{ minWidth: 160 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", animation: "blink 1.2s infinite" }} />
          <span style={{ fontSize: 12, color: "#555", fontFamily: "monospace" }}>
            Session&nbsp;<span style={{ color: "#a78bfa" }}>#{sessionId?.slice(0, 8).toUpperCase() || "DEMO"}</span>
          </span>
        </div>

        {/* Centre: progress */}
        <div className="flex items-center gap-3 flex-1" style={{ maxWidth: 320, margin: "0 auto" }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#1e1e2a", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              width: `${progressPct}%`,
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
          <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace", whiteSpace: "nowrap" }}>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Right: violations */}
        <div className="flex items-center gap-2" style={{ minWidth: 160, justifyContent: "flex-end" }}>
          {violations > 0 && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />}
          <span style={{ fontSize: 11, color: "#555" }}>
            {violations === 0 ? "No violations" : `${violations} violation${violations > 1 ? "s" : ""}`}
          </span>
        </div>
      </div>

      {/* ── BODY (2-col grid) ── */}
      <div className="flex-1 min-h-0" style={{ display: "grid", gridTemplateColumns: "300px 1fr" }}>

        {/* ── LEFT: CAMERA + SIDEBAR ── */}
        <div className="flex flex-col overflow-hidden"
          style={{ background: "#0d0d14", borderRight: "1px solid #1e1e2a" }}>

          {/* Video — fixed height */}
          <div style={{ position: "relative", flexShrink: 0, height: 210, background: "#000", overflow: "hidden" }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                opacity: cameraReady ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
            {!cameraReady && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <div style={{ fontSize: 32, opacity: 0.2 }}>📷</div>
                <p style={{ fontSize: 12, color: "#333" }}>Starting camera…</p>
              </div>
            )}
            {cameraReady && (
              <div style={{
                position: "absolute", top: 8, left: 8,
                display: "flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 6,
                background: "rgba(0,0,0,0.65)",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "blink 1.2s infinite" }} />
                <span style={{ fontSize: 10, color: "#ef4444", fontFamily: "monospace", fontWeight: 600 }}>LIVE</span>
              </div>
            )}
          </div>

          {/* AI speaking bar */}
          <div className="flex items-center gap-2 flex-shrink-0"
            style={{ padding: "9px 14px", borderBottom: "1px solid #1e1e2a" }}>
            {/* Waveform */}
            <div className="flex items-center gap-0.5">
              {[7, 13, 9, 16, 9, 13, 7].map((h, i) => (
                <div key={i} style={{
                  width: 3, height: h, borderRadius: 2,
                  background: isSpeaking ? "#6366f1" : "#2a2a3a",
                  animation: isSpeaking ? `waveAnim 0.7s ease-in-out ${i * 0.08}s infinite` : "none",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#555", flex: 1 }}>
              AI&nbsp;
              <span style={{ color: isSpeaking ? "#a78bfa" : "#333" }}>
                {isSpeaking ? "speaking…" : "ready"}
              </span>
            </span>
            <button onClick={replayQuestion} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 20,
              background: "#1a1a26", border: "1px solid #2a2a3a",
              color: "#a78bfa", cursor: "pointer", fontFamily: "inherit",
            }}>
              ↩ Replay
            </button>
          </div>

          {/* Question list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
            {questions.map((q, i) => (
              <div key={(q as any).id || i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "8px 14px",
                background: i === currentIndex
                  ? "rgba(99,102,241,0.1)"
                  : i < currentIndex ? "rgba(34,197,94,0.06)" : "transparent",
                borderLeft: `2px solid ${i === currentIndex ? "#6366f1" : i < currentIndex ? "#22c55e" : "#1e1e2a"}`,
                transition: "all 0.2s",
              }}>
                <div style={{
                  fontSize: 11, fontFamily: "monospace", fontWeight: 600, minWidth: 18,
                  paddingTop: 1, flexShrink: 0,
                  color: i < currentIndex ? "#22c55e" : i === currentIndex ? "#a78bfa" : "#333",
                }}>
                  {i < currentIndex ? "✓" : i + 1}
                </div>
                <p style={{
                  fontSize: 12, lineHeight: 1.5, flex: 1, margin: 0,
                  color: i === currentIndex ? "#bbb" : i < currentIndex ? "#444" : "#2e2e3a",
                }}>
                  {getQuestionText(q).slice(0, 50)}{getQuestionText(q).length > 50 ? "…" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: INTERVIEW PANEL ── */}
        <div className="flex flex-col overflow-hidden"
          style={{ padding: 20, gap: 14, background: "#0a0a0f", display: "flex" }}>

          {/* Question card */}
          <div className="flex-shrink-0" style={{
            borderRadius: 18, padding: "20px 24px",
            background: "#0d0d14", border: "1px solid #1e1e2a",
            position: "relative", overflow: "hidden",
          }}>
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)",
            }} />

            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <div style={{
                fontSize: 11, padding: "3px 12px", borderRadius: 20,
                fontFamily: "monospace", background: "#1a1a2e",
                border: "1px solid #2a2a40", color: "#a78bfa",
              }}>
                Question {currentIndex + 1}
              </div>
              <span style={{ fontSize: 11, color: "#444" }}>{questionType}</span>
            </div>

            {/* THE ACTUAL QUESTION TEXT */}
            {questionText ? (
              <p style={{
                fontSize: 18, color: "#e8e8f0", lineHeight: 1.65,
                fontWeight: 500, margin: 0,
              }}>
                {questionText}
              </p>
            ) : (
              <p style={{ fontSize: 14, color: "#444", fontStyle: "italic", margin: 0 }}>
                Loading question…
              </p>
            )}
          </div>

          {/* Answer textarea */}
          <div className="flex flex-col min-h-0" style={{ flex: 1, gap: 8 }}>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span style={{
                fontSize: 11, color: "#555",
                textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600,
              }}>
                Your Answer
              </span>
              {isListening && (
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#ef4444" }}>
                  <span style={{
                    display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                    background: "#ef4444", animation: "blink 0.8s infinite",
                  }} />
                  Recording
                </span>
              )}
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here, or tap the mic to speak your response…"
              style={{
                flex: 1, minHeight: 0, borderRadius: 14, padding: 16,
                background: "#0d0d14", color: "#e8e8f0",
                fontSize: 15, lineHeight: 1.65, fontFamily: "inherit",
                border: `1px solid ${
                  isListening ? "#ef444450" : answer.trim() ? "#3a3a5a" : "#1e1e2a"
                }`,
                resize: "none", outline: "none",
                transition: "border-color 0.25s ease",
              }}
            />
          </div>

          {/* Action row */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mic */}
            <button onClick={toggleMic} title={isListening ? "Stop recording" : "Start voice input"}
              style={{
                width: 46, height: 46, borderRadius: "50%",
                border: `1.5px solid ${isListening ? "#ef4444" : "#2a2a3a"}`,
                background: isListening ? "rgba(239,68,68,0.12)" : "#0d0d14",
                color: isListening ? "#ef4444" : "#555",
                fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
                boxShadow: isListening ? "0 0 0 5px rgba(239,68,68,0.1)" : "none",
                transition: "all 0.2s ease",
              }}>
              🎤
            </button>

            <span style={{ fontSize: 12, color: "#444", fontFamily: "monospace" }}>
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>

            {/* Submit */}
            <button onClick={handleSubmit}
              disabled={!answer.trim() || submitting}
              style={{
                marginLeft: "auto",
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 100, border: "none",
                fontWeight: 600, fontSize: 14, fontFamily: "inherit",
                background: answer.trim() && !submitting
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "#1a1a22",
                color: answer.trim() && !submitting ? "#fff" : "#333",
                cursor: answer.trim() && !submitting ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
              }}>
              {submitting ? (
                <>
                  <div style={{
                    width: 14, height: 14, borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Submitting…
                </>
              ) : (
                <>{isLast ? "Finish Interview" : "Next Question"} →</>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{GLOBAL_CSS}</style>
    </div>
  );
}

// ─── GLOBAL CSS ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.15; }
  }
  @keyframes pulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.45), 0 0 48px rgba(99,102,241,0.2); }
    50%       { box-shadow: 0 0 0 20px rgba(99,102,241,0), 0 0 48px rgba(99,102,241,0.2); }
  }
  @keyframes waveAnim {
    0%, 100% { transform: scaleY(1);   opacity: 0.55; }
    50%       { transform: scaleY(2.1); opacity: 1; }
  }

  textarea::placeholder { color: #252530; }
  textarea:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }

  button { transition: opacity 0.15s, transform 0.15s; }
  button:hover:not(:disabled) { opacity: 0.85; }
  button:active:not(:disabled) { transform: scale(0.97); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }

  /* Mobile: stack camera above interview panel */
  @media (max-width: 700px) {
    [data-body] {
      grid-template-columns: 1fr !important;
      grid-template-rows: 200px 1fr !important;
    }
  }
`;