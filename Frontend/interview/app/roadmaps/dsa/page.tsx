"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import api from "@/lib/api";
import { dsaPlan, user } from "@/lib/api";
/* ─── Types ─────────────────────────────────────────────────────────── */
interface Question {
  id: number;
  title: string;
  link: string;
  topic: string;
}

interface PlanData {
  days: number;
  dataLocked: string | null;
  streak: number;
  maxstreak: number;
}

interface StreakData {
  streak: number;
  maxstreak: number;
  totalDays: number;
  visitDates: string[];
}

/* ─── Constants ──────────────────────────────────────────────────────── */
const TOTAL_Q = 250;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TOPIC_COLORS: Record<string, { bg: string; text: string }> = {
  Arrays:        { bg: "rgba(124,109,250,.15)", text: "#a89cff" },
  Strings:       { bg: "rgba(52,211,153,.13)",  text: "#34d399" },
  LinkedList:    { bg: "rgba(251,113,133,.13)",  text: "#fb7185" },
  Trees:         { bg: "rgba(96,165,250,.13)",   text: "#60a5fa" },
  DP:            { bg: "rgba(244,114,182,.13)",  text: "#f472b6" },
  Graphs:        { bg: "rgba(163,230,53,.12)",   text: "#a3e635" },
  Backtracking:  { bg: "rgba(251,191,36,.12)",   text: "#fbbf24" },
  Sorting:       { bg: "rgba(167,139,250,.13)",  text: "#a78bfa" },
  BinarySearch:  { bg: "rgba(45,212,191,.12)",   text: "#2dd4bf" },
  Heap:          { bg: "rgba(248,113,113,.13)",  text: "#f87171" },
  Stack:         { bg: "rgba(56,189,248,.13)",   text: "#38bdf8" },
  Hashing:       { bg: "rgba(74,222,128,.12)",   text: "#4ade80" },
  Greedy:        { bg: "rgba(253,186,116,.12)",  text: "#fb923c" },
  Math:          { bg: "rgba(99,179,237,.13)",   text: "#63b3ed" },
  TwoPointers:   { bg: "rgba(134,239,172,.12)",  text: "#86efac" },
  SlidingWindow: { bg: "rgba(253,224,71,.12)",   text: "#fde047" },
  BitManip:      { bg: "rgba(192,132,252,.13)",  text: "#c084fc" },
  Recursion:     { bg: "rgba(148,163,184,.12)",  text: "#94a3b8" },
  Trie:          { bg: "rgba(139,92,246,.13)",   text: "#8b5cf6" },
  Queue:         { bg: "rgba(236,72,153,.13)",   text: "#ec4899" },
};

/* ─── localStorage helpers ───────────────────────────────────────────── */
function lsGet<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}
function lsSet(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/* ─── Heatmap grid builder ───────────────────────────────────────────── */
function buildHeatmapGrid(activityDates: string[]) {
  const visitSet = new Set(activityDates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 181);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const weeks: { date: Date; active: boolean; isToday: boolean; isFuture: boolean }[][] = [];
  const current = new Date(startDate);
  while (weeks.length < 27) {
    const week: typeof weeks[0] = [];
    for (let d = 0; d < 7; d++) {
      const iso = current.toISOString().split("T")[0];
      week.push({
        date: new Date(current),
        active: visitSet.has(iso),
        isToday: current.getTime() === today.getTime(),
        isFuture: current > today,
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

/* ─── Activity Heatmap ───────────────────────────────────────────────── */
function ActivityHeatmap({
  activityDates,
  totalDone,
  streak,
}: {
  activityDates: string[];
  totalDone: number;
  streak: number;
}) {
  const weeks = useMemo(() => buildHeatmapGrid(activityDates), [activityDates]);
  const activeDays = useMemo(() => new Set(activityDates).size, [activityDates]);

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    weeks.forEach((week, wi) => {
      if (week[0].date.getDate() <= 7)
        labels.push({ label: MONTHS[week[0].date.getMonth()], col: wi });
    });
    return labels;
  }, [weeks]);

  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(124,109,250,.18)",
      borderRadius: "20px",
      padding: "24px 28px",
      marginBottom: "32px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
        <div style={{ width: "16px", height: "1px", background: "rgba(124,109,250,.6)" }} />
        <span style={{ fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(124,109,250,.8)", fontFamily: "'Outfit',sans-serif" }}>Practice Activity</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "20px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
          {[
            { val: String(totalDone),   label: "Questions Done", icon: "✅" },
            { val: String(activeDays),  label: "Active Days",    icon: "📅" },
            { val: String(streak),      label: "Current Streak", icon: "🔥" },
          ].map(({ val, label, icon }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "19px" }}>{icon}</span>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "21px", fontWeight: 800, lineHeight: 1, color: "#fff" }}>{val}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,.32)", marginTop: "2px", fontFamily: "'Outfit',sans-serif" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,.28)", display: "flex", alignItems: "center", gap: "5px", fontFamily: "'Outfit',sans-serif" }}>
          Less
          {[0.07, 0.25, 0.5, 0.75, 1].map((o) => (
            <div key={o} style={{ width: "11px", height: "11px", borderRadius: "3px", background: `rgba(124,109,250,${o})` }} />
          ))}
          More
        </div>
      </div>

      <div style={{ overflowX: "auto", paddingBottom: "2px" }}>
        <div style={{ display: "inline-block" }}>
          <div style={{ display: "flex", gap: "3px", marginBottom: "4px", paddingLeft: "20px" }}>
            {weeks.map((_, wi) => {
              const ml = monthLabels.find((m) => m.col === wi);
              return (
                <div key={wi} style={{ width: "13px", fontSize: "9px", color: "rgba(255,255,255,.28)", whiteSpace: "nowrap", overflow: "visible", fontFamily: "'Outfit',sans-serif" }}>
                  {ml ? ml.label : ""}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "3px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginRight: "2px" }}>
              {["", "M", "", "W", "", "F", ""].map((d, i) => (
                <div key={i} style={{ width: "13px", height: "13px", fontSize: "9px", color: "rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif" }}>{d}</div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {week.map((cell, di) => (
                  <div
                    key={di}
                    title={cell.isFuture ? "" : `${cell.date.toDateString()}${cell.active ? " ✓" : ""}`}
                    style={{
                      width: "13px", height: "13px", borderRadius: "3px", flexShrink: 0,
                      background: cell.isFuture ? "transparent"
                        : cell.isToday ? "rgba(124,109,250,0.9)"
                        : cell.active ? "rgba(124,109,250,0.72)"
                        : "rgba(255,255,255,0.055)",
                      border: cell.isToday ? "1px solid rgba(168,156,255,0.75)" : "1px solid transparent",
                      transition: "transform 0.12s ease",
                      cursor: cell.isFuture ? "default" : "pointer",
                    }}
                    onMouseEnter={(e) => { if (!cell.isFuture) (e.currentTarget as HTMLDivElement).style.transform = "scale(1.45)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Change Plan Modal ──────────────────────────────────────────────── */
function ChangePlanModal({
  currentDays,
  onConfirm,
  onClose,
}: {
  currentDays: number;
  onConfirm: (d: number) => void;
  onClose: () => void;
}) {
  const [days, setDays] = useState(currentDays);
  const perDay = Math.ceil(TOTAL_Q / days);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.75)",
      backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "rgba(10,9,25,0.98)",
        border: "1px solid rgba(124,109,250,.3)",
        borderRadius: "28px", padding: "36px",
        maxWidth: "460px", width: "100%",
        boxShadow: "0 30px 80px rgba(0,0,0,.7)",
        animation: "dsaModalIn .25s cubic-bezier(.23,1,.32,1) both",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span style={{ fontSize: "22px" }}>⚙️</span>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 800, color: "#fff" }}>Change Plan Duration</div>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,.38)", marginBottom: "26px", lineHeight: 1.65, fontFamily: "'Outfit',sans-serif", fontWeight: 300 }}>
          Questions you&apos;ve already completed stay done. Day groupings and locked-day status are recalculated for the new duration.
        </p>
        <div style={{ background: "rgba(255,255,255,.04)", borderRadius: "18px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(255,255,255,.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <input
              type="range" min={5} max={100} step={1} value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#7c6dfa", cursor: "pointer" }}
            />
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg,#7c6dfa,#f472b6)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "26px", fontWeight: 800, lineHeight: 1 }}>{days}</div>
              <div style={{ fontSize: "10px", opacity: 0.85, fontFamily: "'Outfit',sans-serif" }}>days</div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "Questions / day", val: perDay, icon: "📚" },
            { label: "Total questions",  val: TOTAL_Q, icon: "🎯" },
          ].map((m) => (
            <div key={m.label} style={{ background: "rgba(255,255,255,.03)", borderRadius: "14px", padding: "14px", border: "1px solid rgba(255,255,255,.05)" }}>
              <div style={{ fontSize: "17px", marginBottom: "6px" }}>{m.icon}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px", fontFamily: "'Outfit',sans-serif" }}>{m.label}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 800, color: "#fff" }}>{m.val}</div>
            </div>
          ))}
        </div>
        {days !== currentDays && (
          <div style={{ background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.2)", borderRadius: "12px", padding: "10px 14px", marginBottom: "16px", fontSize: "12px", color: "rgba(251,191,36,.85)", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6 }}>
            ⚠️ Changing from {currentDays} → {days} days. Completed-day locks will be recalculated automatically.
          </div>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "13px", borderRadius: "14px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.55)", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Cancel</button>
          <button onClick={() => onConfirm(days)} style={{ flex: 2, padding: "13px", borderRadius: "14px", background: "linear-gradient(135deg,#7c6dfa,#f472b6)", border: "none", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>✓ Apply new duration</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toast ──────────────────────────────────────────────────────────── */
function Toast({ msg, type }: { msg: string; type: "success" | "warn" | "error" }) {
  const colors = {
    success: "linear-gradient(135deg,#7c6dfa,#f472b6)",
    warn:    "linear-gradient(135deg,#f59e0b,#d97706)",
    error:   "linear-gradient(135deg,#ef4444,#dc2626)",
  };
  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 999,
      background: colors[type], color: "#fff",
      padding: "14px 20px", borderRadius: "18px",
      fontSize: "14px", fontWeight: 600, maxWidth: 320,
      boxShadow: "0 10px 40px rgba(0,0,0,.4)",
      animation: "dsaToastIn .3s cubic-bezier(.23,1,.32,1) both",
      fontFamily: "'Outfit',sans-serif",
    }}>{msg}</div>
  );
}

/* ─── Setup Screen ───────────────────────────────────────────────────── */
function SetupScreen({ onStart }: { onStart: (d: number) => void }) {
  const [days, setDays] = useState(50);
  const perDay = Math.ceil(TOTAL_Q / days);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes dsaOrb1{0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(50px,-40px) scale(1.08)}}
        @keyframes dsaOrb2{0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-60px,50px) scale(0.93)}}
        @keyframes dsaFadeUp{from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div style={{ minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden" }}>
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,109,250,.12) 0%,transparent 70%)", animation: "dsaOrb1 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-5%", right: "-12%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,114,182,.09) 0%,transparent 70%)", animation: "dsaOrb2 18s ease-in-out infinite" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "520px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ animation: "dsaFadeUp .5s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "#7c6dfa", marginBottom: "14px", fontFamily: "'Outfit',sans-serif" }}>
              <div style={{ width: "22px", height: "1px", background: "#7c6dfa" }} />DSA Roadmap
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.025em", margin: "0 0 12px", color: "#fff" }}>
              Crush 250 DSA<br />
              <span style={{ background: "linear-gradient(130deg,#7c6dfa 0%,#f472b6 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Problems</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: "15px", lineHeight: 1.7, fontWeight: 300, margin: "0 0 36px", fontFamily: "'Outfit',sans-serif" }}>
              Build consistency with a structured plan — track streaks, lock days, and watch your progress grow.
            </p>
            <div style={{ background: "rgba(255,255,255,.032)", border: "1px solid rgba(255,255,255,.07)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "26px", padding: "32px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "22px", color: "#fff", fontFamily: "'Outfit',sans-serif" }}>Pick your target duration</div>
              <div style={{ background: "rgba(255,255,255,.04)", borderRadius: "20px", padding: "20px", marginBottom: "22px", border: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <input
                    type="range" min={5} max={100} step={1} value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    style={{ flex: 1, accentColor: "#7c6dfa", cursor: "pointer" }}
                  />
                  <div style={{ width: "82px", height: "82px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#7c6dfa,#f472b6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>{days}</div>
                    <div style={{ fontSize: "11px", opacity: 0.85, fontFamily: "'Outfit',sans-serif" }}>days</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
                {[
                  { label: "Questions / day", val: perDay, icon: "📚" },
                  { label: "Total questions",  val: TOTAL_Q, icon: "🎯" },
                ].map((m) => (
                  <div key={m.label} style={{ background: "rgba(255,255,255,.03)", borderRadius: "18px", padding: "16px", border: "1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ fontSize: "20px", marginBottom: "8px" }}>{m.icon}</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px", fontFamily: "'Outfit',sans-serif" }}>{m.label}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: 800, color: "#fff" }}>{m.val}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onStart(days)}
                style={{ width: "100%", padding: "15px", borderRadius: "16px", background: "linear-gradient(135deg,#7c6dfa,#f472b6)", border: "none", color: "#fff", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: ".02em" }}
              >🚀 Start my journey</button>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,.28)", textAlign: "center", marginTop: "14px", lineHeight: 1.6, fontFamily: "'Outfit',sans-serif" }}>
                You can change the duration anytime from the planner header.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function DSAPlannerPage() {
  const [questions, setQuestions]         = useState<Question[]>([]);
  const [questionsReady, setQReady]       = useState(false);
  const [planDays, setPlanDays]           = useState<number | null>(null);
  const [done, setDone]                   = useState<Record<number, boolean>>({});
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [activityDates, setActivityDates] = useState<string[]>([]);
  const [streak, setStreak]               = useState(0);
  const [openDay, setOpenDay]             = useState<number | null>(null);
  const [showChangePlan, setShowChangePlan] = useState(false);
  const [toast, setToast]                 = useState<{ msg: string; type: "success" | "warn" | "error" } | null>(null);

  const dayRefs    = useRef<Record<number, HTMLDivElement | null>>({});
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, type: "success" | "warn" | "error" = "success") => {
    setToast({ msg, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  /* ── Load questions ── */
  useEffect(() => {
    fetch("/data/dsa_all_questions.json")
      .then((r) => r.json())
      .then((data: Question[]) => { setQuestions(data); setQReady(true); })
      .catch(() => showToast("Failed to load questions.", "error"));
  }, [showToast]);

  /* ── Load plan + streak from DB on mount ── */
  useEffect(() => {
    (async () => {
      try {
        const planRes = await dsaPlan.getPlan();
        const { days } = planRes.data;
        if (days) {
          setPlanDays(days);
          lsSet("dsa_plan_days", days);
        }
      } catch { /* fall through */ }

      try {
        const streakRes = await user.getStreak();
        const { streak: s, visitDates } = streakRes.data;
        setStreak(s);
        const lsDates = lsGet<string[]>("dsa_activity_dates", []);
        const merged = Array.from(new Set([...visitDates, ...lsDates]));
        setActivityDates(merged);
        lsSet("dsa_activity_dates", merged);
      } catch {
        setActivityDates(lsGet<string[]>("dsa_activity_dates", []));
      }

      setDone(lsGet("dsa_done", {}));
      setCompletedDays(new Set(lsGet<number[]>("dsa_completed_days", [])));

      const lsDays = lsGet<number | null>("dsa_plan_days", null);
      if (lsDays) setPlanDays((prev) => prev ?? lsDays);
    })();
  }, []);

  /* ── Open first incomplete day once data ready ── */
  useEffect(() => {
    if (!questionsReady || !planDays) return;
    const perDay = Math.ceil(questions.length / planDays);
    const numGroups = Math.ceil(questions.length / perDay);
    const first = Array.from({ length: numGroups }, (_, i) => i).find((i) => !completedDays.has(i)) ?? 0;
    setOpenDay(first);
  }, [questionsReady, planDays, questions.length, completedDays]);

  /* ── Scroll to open day ── */
  useEffect(() => {
    if (openDay !== null)
      setTimeout(() => dayRefs.current[openDay]?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [openDay]);

  /* ── Start plan ── */
  const handleStart = useCallback(async (days: number) => {
    lsSet("dsa_plan_days", days);
    lsSet("dsa_done", {});
    lsSet("dsa_completed_days", []);
    lsSet("dsa_activity_dates", []);
    setPlanDays(days);
    setDone({});
    setCompletedDays(new Set());
    setActivityDates([]);
    setStreak(0);
    setOpenDay(0);
    showToast("Plan locked! Let's crush it 🔒");
    try { await dsaPlan.start(days); } catch { /* silent */ }
  }, [showToast]);

  /* ── Change plan duration ── */
  const handleChangeDuration = useCallback(async (newDays: number) => {
    setShowChangePlan(false);
    if (!questions.length) return;

    const newPerDay = Math.ceil(questions.length / newDays);
    const newGroups: Question[][] = [];
    for (let i = 0; i < questions.length; i += newPerDay)
      newGroups.push(questions.slice(i, i + newPerDay));

    const newCompletedDays = new Set(
      newGroups
        .map((group, idx) => (group.every((q) => done[q.id]) ? idx : -1))
        .filter((idx) => idx !== -1)
    );

    setPlanDays(newDays);
    setCompletedDays(newCompletedDays);

    const cdArray = [...newCompletedDays];
    lsSet("dsa_plan_days", newDays);
    lsSet("dsa_completed_days", cdArray);

    showToast(`Plan updated to ${newDays} days ✓`);

    const first = Array.from({ length: newGroups.length }, (_, i) => i).find((i) => !newCompletedDays.has(i)) ?? 0;
    setOpenDay(first);

    try {
      await dsaPlan.changeDuration(newDays);
    } catch { /* silent */ }
  }, [questions, done, showToast]);

  /* ── Toggle question ── */
  const toggleQ = useCallback((id: number, dayIdx: number) => {
    if (done[id] && completedDays.has(dayIdx)) {
      showToast("Day is locked — can't uncheck.", "warn");
      return;
    }

    const newVal = !done[id];
    const today = new Date().toISOString().split("T")[0];

    setDone((prev) => {
      const next = { ...prev, [id]: newVal };
      lsSet("dsa_done", next);
      return next;
    });

    if (newVal) {
      setActivityDates((prev) => {
        if (prev.includes(today)) return prev;
        const next = [...prev, today];
        lsSet("dsa_activity_dates", next);
        return next;
      });
    }
  }, [done, completedDays, showToast]);

  /* ── Mark day complete ── */
  const markDayComplete = useCallback(async (dayIdx: number, group: Question[]) => {
    if (!group.every((q) => done[q.id])) {
      showToast(`Complete all ${group.length} questions first!`, "warn");
      return;
    }
    if (completedDays.has(dayIdx)) return;

    setCompletedDays((prev) => {
      const next = new Set([...prev, dayIdx]);
      lsSet("dsa_completed_days", [...next]);
      return next;
    });

    const today = new Date().toISOString().split("T")[0];
    setActivityDates((prev) => {
      if (prev.includes(today)) return prev;
      const next = [...prev, today];
      lsSet("dsa_activity_dates", next);
      return next;
    });

    showToast(`🔥 Day ${dayIdx + 1} locked in!`);

    try {
      const res = await dsaPlan.completeDay(dayIdx);
      if (res.data.streak !== undefined) setStreak(res.data.streak);
    } catch { /* silent */ }
  }, [done, completedDays, showToast]);

  /* ── Derived state ── */
  const grouped = useMemo(() => {
    if (!planDays || !questions.length) return [];
    const perDay = Math.ceil(questions.length / planDays);
    const groups: Question[][] = [];
    for (let i = 0; i < questions.length; i += perDay)
      groups.push(questions.slice(i, i + perDay));
    return groups;
  }, [planDays, questions]);

  const totalDone     = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const pct           = questions.length ? Math.round((totalDone / questions.length) * 100) : 0;
  const daysCompleted = completedDays.size;

  /* ── Screens ── */
  if (!planDays) return <SetupScreen onStart={handleStart} />;

  if (!questionsReady) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "rgba(255,255,255,.04)", padding: "28px 32px", borderRadius: "20px", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: "14px", fontSize: "14px", color: "rgba(255,255,255,.55)", fontFamily: "'Outfit',sans-serif" }}>
        <span style={{ display: "inline-block", width: "20px", height: "20px", border: "2.5px solid #7c6dfa", borderTopColor: "transparent", borderRadius: "50%", animation: "dsaSpin .7s linear infinite" }} />
        Loading questions…
      </div>
    </div>
  );

  const qPerDay = Math.ceil(questions.length / planDays);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes dsaOrb1{0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(50px,-40px) scale(1.08)}}
        @keyframes dsaOrb2{0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-60px,50px) scale(.93)}}
        @keyframes dsaOrb3{0%,100%{transform:translate(0,0)} 60%{transform:translate(30px,60px)}}
        @keyframes dsaSpin{to{transform:rotate(360deg)}}
        @keyframes dsaToastIn{from{opacity:0;transform:translateY(14px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes dsaModalIn{from{opacity:0;transform:scale(.96) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes dsaCardIn{from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)}}
        @keyframes dsaSlideDown{from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)}}
        .dsa-page *{box-sizing:border-box}
        .dsa-page{font-family:'Outfit',sans-serif}
        .dsa-day-card{transition:border-color .25s,box-shadow .25s;animation:dsaCardIn .35s ease both}
        .dsa-day-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.25)}
        .dsa-q-row{transition:background .15s}
        .dsa-q-row:hover{background:rgba(255,255,255,.045)!important}
        .dsa-btn-primary{transition:all .22s cubic-bezier(.23,1,.32,1)}
        .dsa-btn-primary:hover{transform:scale(1.02);filter:brightness(1.1)}
        .dsa-change-btn{transition:all .2s ease}
        .dsa-change-btn:hover{background:rgba(124,109,250,.15)!important;border-color:rgba(124,109,250,.4)!important}
        .dsa-toggle-day:hover{border-color:rgba(124,109,250,.2)!important}
        .dsa-day-questions{animation:dsaSlideDown .2s ease both}
      `}</style>

      <div className="dsa-page" style={{ minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden" }}>

        {/* Orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,109,250,.11) 0%,transparent 70%)", animation: "dsaOrb1 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: 0, right: "-12%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,114,182,.08) 0%,transparent 70%)", animation: "dsaOrb2 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "40%", left: "25%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(96,165,250,.06) 0%,transparent 70%)", animation: "dsaOrb3 22s ease-in-out infinite" }} />
        </div>

        {toast && <Toast msg={toast.msg} type={toast.type} />}
        {showChangePlan && (
          <ChangePlanModal
            currentDays={planDays}
            onConfirm={handleChangeDuration}
            onClose={() => setShowChangePlan(false)}
          />
        )}

        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "48px 20px 72px" }}>

          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "#7c6dfa", marginBottom: "12px" }}>
              <div style={{ width: "22px", height: "1px", background: "#7c6dfa" }} />DSA Study Planner
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.025em", margin: "0 0 10px" }}>
                Your DSA{" "}
                <span style={{ background: "linear-gradient(130deg,#7c6dfa 0%,#f472b6 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Roadmap</span>
              </h1>
              <button
                className="dsa-change-btn"
                onClick={() => setShowChangePlan(true)}
                style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 18px", borderRadius: "12px", background: "rgba(124,109,250,.08)", border: "1px solid rgba(124,109,250,.22)", color: "#a89cff", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", flexShrink: 0 }}
              >⚙️ Change Plan</button>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "12px", marginBottom: "28px" }}>
            {[
              { val: `${pct}%`,            label: "Completed",      icon: "🎯", accent: "#7c6dfa" },
              { val: String(totalDone),     label: "Questions Done", icon: "✅", accent: "#34d399" },
              { val: String(daysCompleted), label: "Days Locked",    icon: "🔒", accent: "#f472b6" },
              { val: `${planDays}d`,        label: "Total Duration", icon: "📅", accent: "#60a5fa" },
              { val: `${qPerDay}/day`,      label: "Daily Target",   icon: "📚", accent: "#fbbf24" },
            ].map(({ val, label, icon, accent }) => (
              <div key={label} style={{ background: "rgba(255,255,255,.032)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "18px", padding: "18px 16px", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
                <div style={{ fontSize: "18px", marginBottom: "8px" }}>{icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 800, color: accent, lineHeight: 1, marginBottom: "4px" }}>{val}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,.35)", letterSpacing: ".05em" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: "20px", padding: "18px 22px", marginBottom: "28px", border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,.6)" }}>Overall Progress</span>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "15px", fontWeight: 800, color: "#a89cff" }}>{totalDone} / {questions.length}</span>
            </div>
            <div style={{ height: "8px", background: "rgba(255,255,255,.07)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#7c6dfa,#f472b6)", borderRadius: "999px", transition: "width .5s cubic-bezier(.23,1,.32,1)" }} />
            </div>
          </div>

          {/* Heatmap */}
          <ActivityHeatmap activityDates={activityDates} totalDone={totalDone} streak={streak} />

          {/* Click hint */}
          <div style={{ marginBottom: "20px", padding: "11px 16px", borderRadius: "14px", background: "rgba(124,109,250,.07)", border: "1px solid rgba(124,109,250,.14)", color: "#a89cff", fontSize: "12px", fontWeight: 500, textAlign: "center" }}>
            👆 Click any day card to expand its questions
          </div>

          {/* Day Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {grouped.map((group, idx) => {
              const isOpen    = openDay === idx;
              const groupDone = group.filter((q) => done[q.id]).length;
              const allDone   = groupDone === group.length;
              const isLocked  = completedDays.has(idx);
              const pctDay    = Math.round((groupDone / group.length) * 100);

              return (
                <div
                  key={idx}
                  ref={(el) => { dayRefs.current[idx] = el; }}
                  className="dsa-day-card"
                  style={{
                    background: "rgba(255,255,255,.032)",
                    border: isLocked ? "1px solid rgba(124,109,250,.4)" : "1px solid rgba(255,255,255,.06)",
                    borderRadius: "22px",
                    backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                    overflow: "hidden",
                    animationDelay: `${idx * 0.02}s`,
                  }}
                >
                  <div
                    className="dsa-toggle-day"
                    onClick={() => setOpenDay(isOpen ? null : idx)}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "18px 20px", cursor: "pointer",
                      background: isLocked ? "rgba(124,109,250,.06)" : "transparent",
                      borderBottom: isOpen ? "1px solid rgba(255,255,255,.05)" : "none",
                      transition: "border-color .25s",
                    }}
                  >
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                      background: isLocked ? "linear-gradient(135deg,#7c6dfa,#f472b6)" : "rgba(255,255,255,.06)",
                      border: isLocked ? "none" : "1px solid rgba(255,255,255,.08)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff",
                    }}>
                      {isLocked
                        ? <span style={{ fontSize: "18px" }}>🔒</span>
                        : <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "15px", fontWeight: 800 }}>{idx + 1}</span>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "15px", fontWeight: 800, color: "#fff" }}>Day {idx + 1}</span>
                        {isLocked && <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", background: "rgba(124,109,250,.15)", color: "#a89cff", border: "1px solid rgba(124,109,250,.25)" }}>Locked</span>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,.07)", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pctDay}%`, background: isLocked ? "linear-gradient(90deg,#7c6dfa,#f472b6)" : "#7c6dfa", borderRadius: "999px", transition: "width .4s ease" }} />
                        </div>
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,.35)", flexShrink: 0 }}>{groupDone}/{group.length}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,.3)", flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
                  </div>

                  {isOpen && (
                    <div className="dsa-day-questions" style={{ padding: "16px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
                        {group.map((q) => {
                          const tc = TOPIC_COLORS[q.topic] ?? { bg: "rgba(255,255,255,.06)", text: "rgba(255,255,255,.55)" };
                          const isDone = !!done[q.id];
                          return (
                            <label
                              key={q.id}
                              className="dsa-q-row"
                              style={{
                                display: "flex", alignItems: "center", gap: "12px",
                                padding: "12px 14px", borderRadius: "14px",
                                background: isDone ? "rgba(124,109,250,.06)" : "rgba(255,255,255,.025)",
                                border: isDone ? "1px solid rgba(124,109,250,.15)" : "1px solid rgba(255,255,255,.04)",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleQ(q.id, idx)}
                                disabled={isLocked}
                                style={{ accentColor: "#7c6dfa", width: "16px", height: "16px", cursor: "pointer", flexShrink: 0 }}
                              />
                              <a
                                href={q.link} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  flex: 1, minWidth: 0, fontSize: "13px", fontWeight: 500,
                                  color: isDone ? "rgba(255,255,255,.32)" : "#c4b5fd",
                                  textDecoration: isDone ? "line-through" : "none",
                                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                }}
                              >{q.title}</a>
                              <span style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "8px", flexShrink: 0, background: tc.bg, color: tc.text, fontWeight: 600 }}>{q.topic}</span>
                            </label>
                          );
                        })}
                      </div>
                      <button
                        className={allDone ? "dsa-btn-primary" : ""}
                        onClick={() => markDayComplete(idx, group)}
                        style={{
                          width: "100%", padding: "13px", borderRadius: "14px",
                          background: isLocked ? "rgba(124,109,250,.1)" : allDone ? "linear-gradient(135deg,#7c6dfa,#f472b6)" : "rgba(255,255,255,.04)",
                          border: isLocked ? "1px solid rgba(124,109,250,.25)" : allDone ? "none" : "1px solid rgba(255,255,255,.07)",
                          color: isLocked ? "#a89cff" : allDone ? "#fff" : "rgba(255,255,255,.35)",
                          fontSize: "13px", fontWeight: 700,
                          cursor: allDone && !isLocked ? "pointer" : "not-allowed",
                          fontFamily: "'Outfit',sans-serif",
                        }}
                      >
                        {isLocked ? "✓ Day Locked" : allDone ? "🔥 Mark Day Complete" : `${group.length - groupDone} questions remaining`}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {pct === 100 && (
            <div style={{
              marginTop: "32px", borderRadius: "26px",
              border: "1px solid rgba(124,109,250,.25)",
              background: "linear-gradient(135deg,rgba(124,109,250,.1),rgba(244,114,182,.07) 50%,rgba(96,165,250,.08))",
              padding: "44px 32px", textAlign: "center",
            }}>
              <div style={{ fontSize: "42px", marginBottom: "12px" }}>🏆</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: 800, marginBottom: "10px" }}>You crushed it!</div>
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'Outfit',sans-serif" }}>
                All {TOTAL_Q} DSA problems completed. Your consistency got you here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}