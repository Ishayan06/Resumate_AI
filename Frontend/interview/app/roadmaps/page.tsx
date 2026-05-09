"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; // your existing axios instance

/* ─── Roadmap Data ──────────────────────────────────────────────────── */
const roadmaps = [
  {
    title: "DSA & Coding Interviews",
    icon: "⚡",
    color: "#7c6dfa",
    rgb: "124,109,250",
    category: "Fundamentals",
    level: "Intermediate" as const,
    weeks: 8,
    desc: "Master data structures, algorithms and crack competitive coding rounds.",
    topics: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming", "Recursion", "LeetCode"],
    route: "/roadmaps/dsa",
  },
  {
    title: "CS Core Subjects",
    icon: "🖥️",
    color: "#34d399",
    rgb: "52,211,153",
    category: "Fundamentals",
    level: "Beginner" as const,
    weeks: 6,
    desc: "Learn OS, DBMS, Networks and OOPs — the fundamentals every interviewer expects.",
    topics: ["Operating Systems", "DBMS", "Computer Networks", "OOPs", "System Design", "SQL"],
    route: "/roadmaps/cs-core",
  },
  {
    title: "Web Development",
    icon: "🌐",
    color: "#60a5fa",
    rgb: "96,165,250",
    category: "Development",
    level: "Beginner" as const,
    weeks: 12,
    desc: "Become a full stack developer with modern frontend and backend technologies.",
    topics: ["HTML/CSS/JS", "React & Next.js", "Node & Express", "MongoDB", "Auth", "Deployments"],
    route: "/roadmaps/web-dev",
  },
  {
    title: "AI / ML Learning",
    icon: "🤖",
    color: "#f472b6",
    rgb: "244,114,182",
    category: "Emerging Tech",
    level: "Advanced" as const,
    weeks: 10,
    desc: "Start your AI and machine learning journey from basics to real-world projects.",
    topics: ["Python for AI", "NumPy & Pandas", "Machine Learning", "Deep Learning", "LLMs", "AI Projects"],
    route: "/roadmaps/ai-ml",
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    color: "#f59e0b",
    rgb: "245,158,11",
    category: "Emerging Tech",
    level: "Intermediate" as const,
    weeks: 8,
    desc: "Learn cloud computing, DevOps pipelines and scalable deployments.",
    topics: ["AWS Basics", "Docker", "CI/CD", "Kubernetes", "Linux", "Cloud Projects"],
    route: "/roadmaps/cloud",
  },
  {
    title: "Build Real Projects",
    icon: "🚀",
    color: "#fb7185",
    rgb: "251,113,133",
    category: "Development",
    level: "Advanced" as const,
    weeks: 0,
    desc: "Create resume-worthy projects that get you noticed in internships and placements.",
    topics: ["MERN Projects", "AI SaaS Apps", "Portfolio", "Realtime Chat", "Interview Platform", "Hosting"],
    route: "/roadmaps/projects",
  },
];

const CATEGORIES = ["All", "Fundamentals", "Development", "Emerging Tech"];
const LEVEL_STEPS: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface StreakInfo {
  streak: number;
  maxstreak: number;
  totalDays: number;
  visitDates: string[]; // ["2025-08-01", "2025-08-02", ...]
  updated: boolean;
}

/* ─── Heatmap helpers ────────────────────────────────────────────────── */
function buildHeatmapGrid(visitDates: string[]) {
  const visitSet = new Set(visitDates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 181);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // rewind to Sunday

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

/* ─── Heatmap Component ──────────────────────────────────────────────── */
function StreakHeatmap({ info }: { info: StreakInfo }) {
  const weeks = useMemo(() => buildHeatmapGrid(info.visitDates), [info.visitDates]);

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    weeks.forEach((week, wi) => {
      if (week[0].date.getDate() <= 7) {
        labels.push({ label: MONTHS[week[0].date.getMonth()], col: wi });
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(124,109,250,.18)",
      borderRadius: "20px",
      padding: "24px 28px",
      marginBottom: "48px",
    }}>
      {/* Stats row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "20px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[
            { val: String(info.totalDays), label: "Active Days", icon: "📅" },
            { val: String(info.maxstreak), label: "Max Streak", icon: "🏆" },
            { val: String(info.streak),    label: "Current Streak", icon: "🔥" },
          ].map(({ val, label, icon }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "19px" }}>{icon}</span>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "21px", fontWeight: 800, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,.32)", marginTop: "2px" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Legend */}
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,.28)", display: "flex", alignItems: "center", gap: "5px" }}>
          Less
          {[0.07, 0.25, 0.5, 0.75, 1].map((o) => (
            <div key={o} style={{ width: "11px", height: "11px", borderRadius: "3px", background: `rgba(124,109,250,${o})` }} />
          ))}
          More
        </div>
      </div>

      {/* Grid */}
      <div style={{ overflowX: "auto", paddingBottom: "2px" }}>
        <div style={{ display: "inline-block" }}>
          {/* Month labels */}
          <div style={{ display: "flex", gap: "3px", marginBottom: "4px", paddingLeft: "20px" }}>
            {weeks.map((_, wi) => {
              const ml = monthLabels.find((m) => m.col === wi);
              return (
                <div key={wi} style={{ width: "13px", fontSize: "9px", color: "rgba(255,255,255,.28)", whiteSpace: "nowrap", overflow: "visible" }}>
                  {ml ? ml.label : ""}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "3px" }}>
            {/* Day labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginRight: "2px" }}>
              {["", "M", "", "W", "", "F", ""].map((d, i) => (
                <div key={i} style={{ width: "13px", height: "13px", fontSize: "9px", color: "rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>{d}</div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {week.map((cell, di) => (
                  <div
                    key={di}
                    title={cell.isFuture ? "" : `${cell.date.toDateString()}${cell.active ? " ✓" : ""}`}
                    style={{
                      width: "13px", height: "13px", borderRadius: "3px", flexShrink: 0,
                      background: cell.isFuture
                        ? "transparent"
                        : cell.isToday
                        ? "rgba(124,109,250,0.9)"
                        : cell.active
                        ? "rgba(124,109,250,0.72)"
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

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function RoadmapsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const [streakInfo, setStreakInfo] = useState<StreakInfo | null>(null);
  const [streakToast, setStreakToast] = useState(false);
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    (async () => {
      try {
        const res = await api.post<StreakInfo>("/streak");
        setStreakInfo(res.data);
        if (res.data.updated && res.data.streak > 1) {
          setStreakToast(true);
          setTimeout(() => setStreakToast(false), 4000);
        }
      } catch { /* silently fail */ }
    })();
  }, []);

  const filtered = useMemo(
    () => roadmaps.filter((r) => {
      const matchCat = activeCategory === "All" || r.category === activeCategory;
      const q = search.toLowerCase();
      return matchCat && (!q || r.title.toLowerCase().includes(q) || r.topics.some((t) => t.toLowerCase().includes(q)));
    }),
    [activeCategory, search]
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(50px,-40px) scale(1.08)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-60px,50px) scale(0.93)} }
        @keyframes orb3 { 0%,100%{transform:translate(0,0)} 60%{transform:translate(30px,60px)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes toastIn { from{opacity:0;transform:translateY(16px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .rm-page*{box-sizing:border-box}
        .rm-page{font-family:'Outfit',sans-serif}
        .rm-card{animation:cardIn .4s ease both;will-change:transform;transition:transform .3s cubic-bezier(.23,1,.32,1),border-color .3s,box-shadow .3s;cursor:pointer}
        .rm-card:hover{transform:translateY(-5px);box-shadow:0 18px 50px rgba(0,0,0,.35)}
        .rm-card:hover .rm-icon{transform:scale(1.12) rotate(4deg)}
        .rm-card:hover .rm-accent{opacity:1!important}
        .rm-card:hover .rm-glow{opacity:1!important}
        .rm-icon{transition:transform .3s ease}
        .rm-accent{transition:opacity .3s ease}
        .rm-pill{transition:background .18s,border-color .18s,color .18s;cursor:pointer}
        .rm-pill:hover{border-color:rgba(124,109,250,.35)!important;color:rgba(255,255,255,.7)!important}
        .rm-search:focus{border-color:rgba(124,109,250,.4)!important;outline:none}
        .rm-search::placeholder{color:rgba(255,255,255,.22)}
        .rm-btn{transition:all .26s cubic-bezier(.23,1,.32,1);cursor:pointer}
        .rm-btn:hover .rm-arrow{transform:translateX(4px)}
        .rm-arrow{transition:transform .26s ease;display:inline-block}
        .rm-cta-btn{transition:transform .2s ease;cursor:pointer}
        .rm-cta-btn:hover{transform:scale(1.04)}
        .rm-toast{animation:toastIn .4s cubic-bezier(.23,1,.32,1) both}
        .rm-heatmap{animation:fadeIn .5s ease both}
      `}</style>

      <div className="rm-page" style={{ minHeight: "100vh", background: "rgba(7,7,15,0.72)", color: "#fff", position: "relative", overflowX: "hidden" }}>

        {/* Orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,109,250,.13) 0%,transparent 70%)", animation: "orb1 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: 0, right: "-12%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(96,165,250,.1) 0%,transparent 70%)", animation: "orb2 17s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "35%", left: "25%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,114,182,.07) 0%,transparent 70%)", animation: "orb3 20s ease-in-out infinite" }} />
        </div>

        {/* Toast */}
        {streakToast && streakInfo && (
          <div className="rm-toast" style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 999, background: "rgba(14,12,30,0.95)", border: "1px solid rgba(124,109,250,.4)", borderRadius: "18px", padding: "16px 22px", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 8px 48px rgba(0,0,0,.6)" }}>
            <span style={{ fontSize: "28px" }}>🔥</span>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "15px", fontWeight: 800 }}>{streakInfo.streak} day streak!</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.4)", marginTop: "3px" }}>Best: {streakInfo.maxstreak} days — you&apos;re on fire!</div>
            </div>
          </div>
        )}

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 64px" }}>

          {/* Header */}
          <div style={{ marginBottom: "44px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "#7c6dfa", marginBottom: "14px" }}>
              <div style={{ width: "22px", height: "1px", background: "#7c6dfa" }} />Learning Hub
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,5.5vw,66px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.025em", margin: "0 0 14px" }}>
              Placement &amp; Internship<br />
              <span style={{ background: "linear-gradient(130deg,#7c6dfa 0%,#f472b6 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Roadmaps</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,.42)", fontSize: "15.5px", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300, margin: "0 0 28px" }}>
              Structured paths from zero to placement-ready — curated resources, interview prep, and real-world project building.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "28px", marginBottom: "32px", flexWrap: "wrap" }}>
              {[
                ["6", "ROADMAPS"],
                ["36", "TOPICS"],
                ["100%", "FREE"],
                [streakInfo ? `${streakInfo.streak}🔥` : "—", "STREAK"],
              ].map(([n, l]) => (
                <div key={String(l)}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,.32)", marginTop: "4px", letterSpacing: ".08em" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Search + filters */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", flex: "0 1 260px" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.28)", fontSize: "15px", pointerEvents: "none" }}>⌕</span>
                <input className="rm-search" placeholder="Search topics or roadmaps…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "9px 14px 9px 36px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "12px", color: "#fff", fontSize: "13px", fontFamily: "'Outfit',sans-serif" }} />
              </div>
              {CATEGORIES.map((cat) => (
                <button key={cat} className="rm-pill" onClick={() => setActiveCategory(cat)} style={{ padding: "8px 16px", borderRadius: "10px", border: activeCategory === cat ? "1px solid rgba(124,109,250,.5)" : "1px solid rgba(255,255,255,.08)", background: activeCategory === cat ? "rgba(124,109,250,.15)" : "rgba(255,255,255,.03)", color: activeCategory === cat ? "#a89cff" : "rgba(255,255,255,.42)", fontSize: "12px", fontWeight: activeCategory === cat ? 500 : 400, fontFamily: "'Outfit',sans-serif" }}>{cat}</button>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          {/* {streakInfo && (
            <div className="rm-heatmap">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div style={{ width: "16px", height: "1px", background: "rgba(124,109,250,.6)" }} />
                <span style={{ fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(124,109,250,.8)" }}>Your Activity</span>
              </div>
              <StreakHeatmap info={streakInfo} />
            </div>
          )} */}

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "18px", marginBottom: "56px" }}>
            {filtered.map((item, i) => (
              <div key={item.title} className="rm-card" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={() => router.push(item.route)} style={{ position: "relative", borderRadius: "22px", border: hovered === i ? `1px solid rgba(${item.rgb},.36)` : "1px solid rgba(255,255,255,.07)", background: "rgba(255,255,255,.032)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: "26px", overflow: "hidden", animationDelay: `${i * 0.06}s` }}>
                <div className="rm-accent" style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "2px", background: `linear-gradient(90deg,transparent,${item.color},transparent)`, borderRadius: "0 0 3px 3px", opacity: 0.4 }} />
                <div className="rm-glow" style={{ position: "absolute", top: "-40%", right: "-15%", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle,rgba(${item.rgb},.11) 0%,transparent 70%)`, opacity: 0.5, pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px", position: "relative" }}>
                  <div className="rm-icon" style={{ width: "48px", height: "48px", borderRadius: "14px", background: `rgba(${item.rgb},.13)`, border: `1px solid rgba(${item.rgb},.26)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "21px", flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
                    <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "20px", fontWeight: 500, color: item.color, background: `rgba(${item.rgb},.13)`, border: `1px solid rgba(${item.rgb},.22)` }}>{item.category}</span>
                    <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "20px", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.32)" }}>{item.weeks ? `${item.weeks} weeks` : "Ongoing"}</span>
                  </div>
                </div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "17px", fontWeight: 800, marginBottom: "6px", lineHeight: 1.2, position: "relative" }}>{item.title}</h2>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,.4)", lineHeight: 1.6, marginBottom: "16px", position: "relative", fontWeight: 300 }}>{item.desc}</p>
                <div style={{ position: "relative", marginBottom: "18px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.2)", marginBottom: "7px" }}>Topics · {item.topics.length}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {item.topics.map((t) => (<span key={t} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "6px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", color: "rgba(255,255,255,.52)" }}>{t}</span>))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "17px", position: "relative" }}>
                  {[0,1,2].map((idx) => (<div key={idx} style={{ width: "24px", height: "3px", borderRadius: "2px", background: idx < LEVEL_STEPS[item.level] ? item.color : "rgba(255,255,255,.09)" }} />))}
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,.32)" }}>{item.level}</span>
                </div>
                <button className="rm-btn" onClick={(e) => { e.stopPropagation(); router.push(item.route); }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = item.color; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `rgba(${item.rgb},.1)`; (e.currentTarget as HTMLButtonElement).style.color = item.color; }} style={{ position: "relative", width: "100%", padding: "11px", borderRadius: "12px", border: `1px solid rgba(${item.rgb},.28)`, background: `rgba(${item.rgb},.1)`, color: item.color, fontSize: "13px", fontWeight: 600, fontFamily: "'Outfit',sans-serif", letterSpacing: ".02em", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  Start Learning <span className="rm-arrow">→</span>
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,.28)" }}>
              <div style={{ fontSize: "38px", marginBottom: "12px" }}>🔍</div>
              <p>No roadmaps match your search.</p>
            </div>
          )}

          {/* CTA */}
          <div style={{ borderRadius: "26px", border: "1px solid rgba(124,109,250,.16)", background: "linear-gradient(135deg,rgba(124,109,250,.07),rgba(244,114,182,.05) 50%,rgba(96,165,250,.07))", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", padding: "52px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top,rgba(124,109,250,.08),transparent 60%)", pointerEvents: "none" }} />
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, margin: "0 0 12px", position: "relative" }}>Consistency Beats Talent</h2>
            <p style={{ color: "rgba(255,255,255,.4)", maxWidth: "460px", margin: "0 auto 24px", lineHeight: 1.7, fontSize: "14px", position: "relative" }}>
              Follow the roadmap daily, build projects, and prepare consistently. Dedication turns any goal into a placement offer.
            </p>
            {streakInfo && streakInfo.maxstreak > 0 && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,109,250,.1)", border: "1px solid rgba(124,109,250,.22)", borderRadius: "12px", padding: "8px 16px", marginBottom: "20px", position: "relative" }}>
                <span>🏆</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,.65)" }}>Best streak: <strong style={{ color: "#a89cff" }}>{streakInfo.maxstreak} days</strong></span>
              </div>
            )}
            <div style={{ position: "relative" }}>
              <button className="rm-cta-btn" onClick={() => router.push("/dashboard")} style={{ padding: "13px 34px", borderRadius: "13px", background: "linear-gradient(130deg,#7c6dfa,#f472b6)", border: "none", color: "#fff", fontSize: "14px", fontWeight: 600, fontFamily: "'Outfit',sans-serif", letterSpacing: ".02em" }}>
                ← Back to Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}