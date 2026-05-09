"use client";

// ─── DATA ────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "01",
    title: "OS Basics",
    emoji: "🖥️",
    desc: "Kernel architecture, system calls, OS types, process structure and boot sequence.",
    tags: ["Intro to OS", "OS Types", "Kernel", "System Calls", "Booting"],
    accent: "#4ADE80",
    glow: "rgba(74,222,128,0.13)",
    iconBg: "rgba(74,222,128,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/what-is-an-operating-system/",
    links: [
      { label: "Introduction to OS", url: "https://www.geeksforgeeks.org/what-is-an-operating-system/" },
      { label: "Types of OS", url: "https://www.geeksforgeeks.org/types-of-operating-systems/" },
      { label: "Kernel in OS", url: "https://www.geeksforgeeks.org/kernel-in-operating-system/" },
      { label: "System Calls", url: "https://www.geeksforgeeks.org/introduction-of-system-call/" },
    ],
  },
  {
    id: "02",
    title: "Process Scheduling",
    emoji: "🔄",
    desc: "CPU scheduling algorithms, process states, preemptive vs non-preemptive, starvation and aging.",
    tags: ["Process States", "FCFS", "Round Robin", "SJF", "Priority"],
    accent: "#34D399",
    glow: "rgba(52,211,153,0.13)",
    iconBg: "rgba(52,211,153,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
    links: [
      { label: "CPU Scheduling", url: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/" },
      { label: "Process States", url: "https://www.geeksforgeeks.org/states-of-a-process-in-operating-systems/" },
      { label: "FCFS Scheduling", url: "https://www.geeksforgeeks.org/program-for-fcfs-cpu-scheduling-set-1/" },
      { label: "Round Robin", url: "https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-the-same-arrival-time/" },
    ],
  },
  {
    id: "03",
    title: "Process Sync",
    emoji: "🔒",
    desc: "Semaphores, mutex, critical sections, race conditions, monitors and classic IPC problems.",
    tags: ["Race Conditions", "Critical Section", "Semaphores", "Mutex", "IPC"],
    accent: "#6EE7B7",
    glow: "rgba(110,231,183,0.13)",
    iconBg: "rgba(110,231,183,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/introduction-of-process-synchronization/",
    links: [
      { label: "Process Synchronization", url: "https://www.geeksforgeeks.org/introduction-of-process-synchronization/" },
      { label: "Critical Section", url: "https://www.geeksforgeeks.org/g-fact-70/" },
      { label: "Semaphores", url: "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/" },
      { label: "Mutex vs Semaphore", url: "https://www.geeksforgeeks.org/mutex-vs-semaphore/" },
    ],
  },
  {
    id: "04",
    title: "Deadlocks",
    emoji: "🔗",
    desc: "Deadlock prevention, avoidance, detection and recovery. Banker's Algorithm and resource graphs.",
    tags: ["Deadlock Basics", "Prevention", "Banker's Algo", "Detection", "Recovery"],
    accent: "#A7F3D0",
    glow: "rgba(167,243,208,0.12)",
    iconBg: "rgba(167,243,208,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/",
    links: [
      { label: "Intro to Deadlocks", url: "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" },
      { label: "Deadlock Prevention", url: "https://www.geeksforgeeks.org/deadlock-prevention/" },
      { label: "Banker's Algorithm", url: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/" },
      { label: "Deadlock Detection", url: "https://www.geeksforgeeks.org/deadlock-detection-recovery/" },
    ],
  },
  {
    id: "05",
    title: "Memory Management",
    emoji: "🧠",
    desc: "Paging, segmentation, virtual memory, fragmentation, TLB, and page replacement algorithms.",
    tags: ["Paging", "Segmentation", "Virtual Memory", "Page Replacement", "Thrashing"],
    accent: "#4ADE80",
    glow: "rgba(74,222,128,0.13)",
    iconBg: "rgba(74,222,128,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/memory-management-in-operating-system/",
    links: [
      { label: "Memory Management", url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/" },
      { label: "Paging in OS", url: "https://www.geeksforgeeks.org/paging-in-operating-system/" },
      { label: "Virtual Memory", url: "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/" },
      { label: "Page Replacement", url: "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/" },
    ],
  },
  {
    id: "06",
    title: "Multithreading",
    emoji: "⚡",
    desc: "Threads, multithreading models, user vs kernel threads, benefits, and multitasking architectures.",
    tags: ["Threads", "Thread Models", "User Threads", "Kernel Threads", "Multitasking"],
    accent: "#34D399",
    glow: "rgba(52,211,153,0.13)",
    iconBg: "rgba(52,211,153,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/thread-in-operating-system/",
    links: [
      { label: "Threads in OS", url: "https://www.geeksforgeeks.org/thread-in-operating-system/" },
      { label: "Multithreading Models", url: "https://www.geeksforgeeks.org/multithreading-models/" },
      { label: "User vs Kernel Threads", url: "https://www.geeksforgeeks.org/difference-between-user-level-thread-and-kernel-level-thread/" },
      { label: "Multitasking in OS", url: "https://www.geeksforgeeks.org/multitasking-in-operating-system/" },
    ],
  },
  {
    id: "07",
    title: "Disk Management",
    emoji: "💾",
    desc: "File systems, directory structures, disk scheduling, spooling, buffering and secondary storage.",
    tags: ["File Systems", "Directory", "Disk Scheduling", "SSTF", "Spooling"],
    accent: "#6EE7B7",
    glow: "rgba(110,231,183,0.13)",
    iconBg: "rgba(110,231,183,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/file-systems-in-operating-system/",
    links: [
      { label: "File Systems in OS", url: "https://www.geeksforgeeks.org/file-systems-in-operating-system/" },
      { label: "Disk Scheduling", url: "https://www.geeksforgeeks.org/disk-scheduling-algorithms/" },
      { label: "Directory Structure", url: "https://www.geeksforgeeks.org/structures-of-directory-in-operating-system/" },
      { label: "Disk Management", url: "https://www.geeksforgeeks.org/disk-management-in-operating-system/" },
    ],
  },
  {
    id: "08",
    title: "Quick Notes & Practice",
    emoji: "📋",
    desc: "Last-minute revision notes, interview questions, GATE PYQs, quizzes and practice problems.",
    tags: ["Last Minute Notes", "Interview Qs", "GATE PYQs", "Quizzes", "Practice"],
    accent: "#A7F3D0",
    glow: "rgba(167,243,208,0.12)",
    iconBg: "rgba(167,243,208,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/last-minute-notes-operating-systems/",
    links: [
      { label: "Last Minute Notes", url: "https://www.geeksforgeeks.org/last-minute-notes-operating-systems/" },
      { label: "OS Interview Questions", url: "https://www.geeksforgeeks.org/operating-systems-interview-questions/" },
      { label: "OS Quiz", url: "https://www.geeksforgeeks.org/quiz-corner-gq/" },
      { label: "GATE OS Questions", url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/" },
    ],
  },
];

type Section = (typeof sections)[0];

// ─── MODULE CARD ─────────────────────────────────────────────────────────────
// FIX: outer wrapper is now a <div> — no more <a> inside <a> hydration error.
// The "Explore Module" CTA and each sub-link are independent <a> elements.

function ModuleCard({ s, delay }: { s: Section; delay: number }) {
  return (
    <div
      className="mod-card"
      style={
        {
          "--card-glow": s.glow,
          "--card-accent": s.accent,
          animationDelay: `${delay}s`,
        } as React.CSSProperties
      }
    >
      <div className="mod-top">
        <div className="mod-icon" style={{ background: s.iconBg }}>
          {s.emoji}
        </div>
        <div className="mod-id">{s.id}</div>
      </div>

      <div className="mod-title">{s.title}</div>
      <div className="mod-desc">{s.desc}</div>

      <div className="mod-tags">
        {s.tags.map((t) => (
          <span key={t} className="mod-tag">{t}</span>
        ))}
      </div>

      {/* Individual topic links — safe, not nested */}
      <div className="mod-links">
        {s.links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mod-link"
          >
            <span className="mod-link-dot" style={{ background: s.accent }} />
            {l.label}
            <span className="mod-link-arr">↗</span>
          </a>
        ))}
      </div>

      {/* Primary CTA — also a safe standalone <a> */}
      <a
        href={s.primaryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mod-cta"
      >
        Explore Module <span className="mod-arrow">→</span>
      </a>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function OSPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .os-root {
          background: rgba(4, 10, 6, 0.75);
          color: #ecfdf5;
          font-family: 'Cabinet Grotesk', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* BACKGROUND */
        .bg-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(74,222,128,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .bg-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          filter: blur(130px);
        }
        .orb-a { width:700px;height:700px;background:rgba(74,222,128,0.10);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(52,211,153,0.07);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(16,185,129,0.06);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }

        /* LAYOUT */
        .os-page {
          position: relative; z-index: 1;
          max-width: 1120px; margin: 0 auto; padding: 64px 28px 100px;
        }

        /* CHIP */
        .header-chip {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(74,222,128,0.28);
          background: rgba(74,222,128,0.07);
          border-radius: 100px; padding: 7px 18px; margin-bottom: 44px;
          animation: fadeUp 0.55s ease both;
        }
        .chip-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4ADE80; box-shadow: 0 0 10px #4ADE80;
          flex-shrink: 0; animation: blink 2.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace; font-size:11px; color:#4ADE80; letter-spacing:0.1em; }

        /* HERO */
        .hero { margin-bottom: 64px; }
        .hero-eyebrow {
          font-family:'Fira Code',monospace; font-size:12px; color:#34D399;
          letter-spacing:0.18em; text-transform:uppercase; margin-bottom:18px;
          animation: fadeUp 0.55s 0.08s ease both;
        }
        .hero-title {
          font-family:'Instrument Serif',serif;
          font-size:clamp(54px,8vw,100px);
          font-weight:400; line-height:0.95; letter-spacing:-0.02em;
          margin-bottom:8px; animation:fadeUp 0.55s 0.14s ease both;
        }
        .hero-title-outline {
          font-style:italic; color:transparent;
          -webkit-text-stroke:1.5px rgba(74,222,128,0.5);
          display:block;
        }
        .hero-title-grad {
          font-style:italic; display:block;
          background:linear-gradient(120deg,#4ADE80 0%,#34D399 50%,#6EE7B7 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .hero-body {
          font-size:16px; color:#5a7a62; max-width:520px;
          line-height:1.82; margin:28px 0 36px; font-weight:400;
          animation:fadeUp 0.55s 0.19s ease both;
        }
        .hero-ctas { display:flex; gap:14px; flex-wrap:wrap; animation:fadeUp 0.55s 0.23s ease both; }

        /* BUTTONS */
        .btn-fill {
          display:inline-flex; align-items:center; gap:9px;
          background:#16a34a; color:#fff;
          font-family:'Cabinet Grotesk',sans-serif; font-weight:700;
          font-size:14px; letter-spacing:0.02em;
          border-radius:12px; padding:13px 26px;
          text-decoration:none; transition:all 0.2s; border:1px solid transparent;
        }
        .btn-fill:hover { background:#22c55e; transform:translateY(-2px); box-shadow:0 12px 32px rgba(34,197,94,0.28); }
        .btn-outline {
          display:inline-flex; align-items:center; gap:9px;
          border:1px solid rgba(74,222,128,0.2); background:rgba(74,222,128,0.04);
          color:#6EE7B7; font-family:'Cabinet Grotesk',sans-serif;
          font-size:14px; font-weight:500; border-radius:12px;
          padding:13px 26px; text-decoration:none; transition:all 0.2s;
        }
        .btn-outline:hover { color:#ecfdf5; border-color:rgba(74,222,128,0.45); background:rgba(74,222,128,0.08); }

        /* METRICS */
        .metrics-bar {
          display:grid; grid-template-columns:repeat(4,1fr);
          border:1px solid rgba(74,222,128,0.08); border-radius:16px;
          background:#071009; overflow:hidden; margin-bottom:72px;
          animation:fadeUp 0.55s 0.28s ease both;
        }
        .metric { padding:22px 26px; border-right:1px solid rgba(74,222,128,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif; font-size:38px; color:#ecfdf5; line-height:1; margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace; font-size:10.5px; color:#2d5a3a; letter-spacing:0.08em; text-transform:uppercase; }

        /* DIVIDER */
        .sec-divider { display:flex; align-items:center; gap:16px; margin-bottom:36px; animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace; font-size:10px; color:#2d5a3a; letter-spacing:0.14em; text-transform:uppercase; white-space:nowrap; }
        .sec-line { flex:1; height:1px; background:linear-gradient(90deg,rgba(74,222,128,0.15),transparent); }

        /* CARD GRID */
        .card-grid {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr));
          gap:1px; background:rgba(74,222,128,0.07);
          border-radius:20px; overflow:hidden;
        }

        /* MODULE CARD — <div> wrapper, zero nesting errors */
        .mod-card {
          background:#060e08; padding:32px 28px;
          position:relative; overflow:hidden;
          transition:background 0.25s;
          display:flex; flex-direction:column;
          animation:fadeUp 0.5s ease both;
        }
        .mod-card::after {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);
          opacity:0; transition:opacity 0.35s; pointer-events:none;
        }
        .mod-card:hover { background:#0c1a0f; }
        .mod-card:hover::after { opacity:1; }

        .mod-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:22px; }
        .mod-icon {
          width:48px; height:48px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          font-size:22px; flex-shrink:0;
          border:1px solid rgba(74,222,128,0.10);
        }
        .mod-id {
          font-family:'Fira Code',monospace; font-size:11px;
          color:#2d5a3a; border:1px solid rgba(74,222,128,0.08);
          border-radius:6px; padding:4px 9px;
        }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif; font-weight:800; font-size:20px; margin-bottom:10px; color:#ecfdf5; letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px; color:#5a7a62; line-height:1.75; margin-bottom:20px; }

        .mod-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px; }
        .mod-tag {
          font-family:'Fira Code',monospace; font-size:10.5px;
          border:1px solid rgba(74,222,128,0.08); border-radius:6px;
          padding:4px 10px; color:#2d5a3a; transition:all 0.2s;
        }
        .mod-card:hover .mod-tag { border-color:rgba(74,222,128,0.16); color:#5a7a62; }

        .mod-links { display:flex; flex-direction:column; gap:7px; margin-bottom:24px; flex:1; }
        .mod-link {
          display:flex; align-items:center; gap:8px;
          font-size:12.5px; color:#5a7a62; text-decoration:none;
          padding:8px 12px; border-radius:8px;
          border:1px solid rgba(74,222,128,0.06);
          background:rgba(74,222,128,0.02);
          transition:all 0.18s;
        }
        .mod-link:hover { color:#ecfdf5; border-color:rgba(74,222,128,0.18); background:rgba(74,222,128,0.06); }
        .mod-link-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
        .mod-link-arr { margin-left:auto; font-size:11px; opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }

        .mod-cta {
          display:inline-flex; align-items:center; gap:6px;
          font-size:13px; font-weight:700;
          color:var(--card-accent,#4ADE80);
          text-decoration:none; transition:gap 0.2s; margin-top:auto;
        }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px; display:inline-block; transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }

        /* BOTTOM CTA */
        .bottom-cta {
          margin-top:72px; background:#071009;
          border:1px solid rgba(74,222,128,0.08);
          border-radius:22px; padding:60px 56px;
          position:relative; overflow:hidden;
          animation:fadeUp 0.5s 0.48s ease both;
        }
        .bottom-cta::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse at 90% 50%,rgba(74,222,128,0.07),transparent 60%);
          pointer-events:none;
        }
        .bottom-decor {
          position:absolute; right:48px; top:50%; transform:translateY(-50%);
          font-family:'Instrument Serif',serif; font-size:160px;
          color:rgba(74,222,128,0.03); font-style:italic;
          letter-spacing:-0.05em; user-select:none; pointer-events:none; line-height:1;
        }
        .bottom-title {
          font-family:'Instrument Serif',serif; font-size:clamp(30px,4vw,52px);
          font-weight:400; font-style:italic; margin-bottom:16px; line-height:1.1; position:relative;
        }
        .bottom-body { font-size:15px; color:#5a7a62; max-width:580px; line-height:1.88; margin-bottom:36px; position:relative; }
        .bottom-ctas { display:flex; gap:14px; flex-wrap:wrap; position:relative; }

        /* ANIMATIONS */
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        /* RESPONSIVE */
        @media (max-width:640px) {
          .metrics-bar { grid-template-columns:1fr 1fr; }
          .metric { border-right:none; border-bottom:1px solid rgba(74,222,128,0.08); }
          .metric:nth-child(1),.metric:nth-child(2) { border-right:1px solid rgba(74,222,128,0.08); }
          .metric:last-child,.metric:nth-last-child(2) { border-bottom:none; }
          .card-grid { grid-template-columns:1fr; }
          .bottom-cta { padding:36px 24px; }
          .bottom-decor { display:none; }
        }
      `}</style>

      <div className="os-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />

        <div className="os-page">

          {/* CHIP */}
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · Operating Systems</span>
          </div>

          {/* HERO */}
          <section className="hero">
            <div className="hero-eyebrow">System Architecture Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Master</span>
              <span className="hero-title-grad">Operating</span>
              Systems
            </h1>
            <p className="hero-body">
              A complete OS guide — from kernel internals to scheduling theory.
              Built for SWE interviews, GATE, and deep systems understanding.
            </p>
            <div className="hero-ctas">
              <a
                href="https://www.geeksforgeeks.org/operating-systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start Learning
              </a>
              <a
                href="https://www.geeksforgeeks.org/last-minute-notes-operating-systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Quick Revision Notes →
              </a>
            </div>
          </section>

          {/* METRICS */}
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "100%", label: "Interview Coverage" },
              { num: "#1",  label: "CS Fundamental" },
            ].map((s) => (
              <div key={s.label} className="metric">
                <div className="metric-num">{s.num}</div>
                <div className="metric-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="sec-divider">
            <span className="sec-label">Curriculum</span>
            <div className="sec-line" />
            <span className="sec-label">8 modules · 40+ topics</span>
          </div>

          {/* CARD GRID */}
          <div className="card-grid">
            {sections.map((s, i) => (
              <ModuleCard key={s.id} s={s} delay={i * 0.06} />
            ))}
          </div>

          {/* BOTTOM CTA */}
          <div className="bottom-cta">
            <div className="bottom-decor">OS</div>
            <h2 className="bottom-title">
              Why every engineer<br />must know OS
            </h2>
            <p className="bottom-body">
              Operating Systems is the invisible foundation beneath every system
              you build. CPU scheduling, memory management, threads, and
              synchronization — understanding these is the difference between
              code that merely works and code that scales.
            </p>
            <div className="bottom-ctas">
              <a
                href="https://www.geeksforgeeks.org/operating-systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill"
              >
                View Full Tutorial
              </a>
              <a
                href="https://www.geeksforgeeks.org/last-minute-notes-operating-systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Revision Notes →
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}