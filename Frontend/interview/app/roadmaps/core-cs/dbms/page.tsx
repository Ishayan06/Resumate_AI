"use client";

const sections = [
  {
    id: "01",
    title: "DBMS Basics",
    emoji: "🗄️",
    desc: "Introduction to DBMS, database architecture, data models, schema, instances and users.",
    tags: ["Intro to DBMS", "Architecture", "Data Models", "Schema", "Instances"],
    accent: "#60A5FA",
    glow: "rgba(96,165,250,0.13)",
    iconBg: "rgba(96,165,250,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/",
    links: [
      { label: "Introduction to DBMS", url: "https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/" },
      { label: "DBMS Architecture", url: "https://www.geeksforgeeks.org/dbms-architecture-2-level-3-level/" },
      { label: "Data Models", url: "https://www.geeksforgeeks.org/data-models-in-dbms/" },
      { label: "Database Languages", url: "https://www.geeksforgeeks.org/database-languages/" },
    ],
  },
  {
    id: "02",
    title: "ER Model",
    emoji: "📊",
    desc: "Entity-Relationship model, attributes, relationships, cardinality, ER diagram notation.",
    tags: ["Entity Sets", "Attributes", "Relationships", "Cardinality", "ER Diagram"],
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.13)",
    iconBg: "rgba(59,130,246,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/introduction-of-er-model/",
    links: [
      { label: "ER Model", url: "https://www.geeksforgeeks.org/introduction-of-er-model/" },
      { label: "ER Diagram", url: "https://www.geeksforgeeks.org/introduction-of-er-model/" },
      { label: "Generalization/Specialization", url: "https://www.geeksforgeeks.org/generalization-specialization-and-aggregation-in-er-model/" },
      { label: "ER to Relational", url: "https://www.geeksforgeeks.org/mapping-from-er-model-to-relational-model/" },
    ],
  },
  {
    id: "03",
    title: "Relational Model",
    emoji: "📋",
    desc: "Relational algebra, relational calculus, keys, integrity constraints, functional dependencies.",
    tags: ["Relational Algebra", "Keys", "FD", "Integrity", "Tuple Calculus"],
    accent: "#93C5FD",
    glow: "rgba(147,197,253,0.13)",
    iconBg: "rgba(147,197,253,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/relational-model-in-dbms/",
    links: [
      { label: "Relational Model", url: "https://www.geeksforgeeks.org/relational-model-in-dbms/" },
      { label: "Relational Algebra", url: "https://www.geeksforgeeks.org/introduction-of-relational-algebra-in-dbms/" },
      { label: "Keys in DBMS", url: "https://www.geeksforgeeks.org/types-of-keys-in-relational-model-candidate-super-primary-alternate-and-foreign/" },
      { label: "Functional Dependencies", url: "https://www.geeksforgeeks.org/functional-dependency-and-attribute-closure/" },
    ],
  },
  {
    id: "04",
    title: "Normalization",
    emoji: "✨",
    desc: "1NF, 2NF, 3NF, BCNF, 4NF, 5NF — decomposition, lossless joins and dependency preservation.",
    tags: ["1NF/2NF/3NF", "BCNF", "Decomposition", "Lossless Join", "Dependency"],
    accent: "#60A5FA",
    glow: "rgba(96,165,250,0.12)",
    iconBg: "rgba(96,165,250,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/introduction-of-database-normalization/",
    links: [
      { label: "Database Normalization", url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/" },
      { label: "1NF, 2NF, 3NF", url: "https://www.geeksforgeeks.org/normal-forms-in-dbms/" },
      { label: "BCNF", url: "https://www.geeksforgeeks.org/boyce-codd-normal-form-bcnf/" },
      { label: "Lossless Decomposition", url: "https://www.geeksforgeeks.org/lossless-decomposition-in-dbms/" },
    ],
  },
  {
    id: "05",
    title: "Transactions & Concurrency",
    emoji: "🔄",
    desc: "ACID properties, transaction states, concurrency control, 2PL, MVCC and serializability.",
    tags: ["ACID", "Serializability", "2PL", "MVCC", "Deadlock"],
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.13)",
    iconBg: "rgba(59,130,246,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
    links: [
      { label: "ACID Properties", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/" },
      { label: "Concurrency Control", url: "https://www.geeksforgeeks.org/concurrency-control-in-dbms/" },
      { label: "2-Phase Locking", url: "https://www.geeksforgeeks.org/two-phase-locking-protocol/" },
      { label: "Serializability", url: "https://www.geeksforgeeks.org/serializability-in-dbms/" },
    ],
  },
  {
    id: "06",
    title: "File Organization & Indexing",
    emoji: "📁",
    desc: "File organization techniques, B-Trees, B+ Trees, dense/sparse indexes and hashing.",
    tags: ["B+ Tree", "Hashing", "Dense Index", "Sparse Index", "File Org"],
    accent: "#93C5FD",
    glow: "rgba(147,197,253,0.13)",
    iconBg: "rgba(147,197,253,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/",
    links: [
      { label: "Indexing in DBMS", url: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/" },
      { label: "B and B+ Trees", url: "https://www.geeksforgeeks.org/introduction-of-b-tree/" },
      { label: "File Organization", url: "https://www.geeksforgeeks.org/file-organization-in-dbms-set-1/" },
      { label: "Hashing in DBMS", url: "https://www.geeksforgeeks.org/hashing-in-dbms/" },
    ],
  },
  {
    id: "07",
    title: "Recovery & Log Management",
    emoji: "💾",
    desc: "Failure classification, log-based recovery, checkpointing, ARIES, shadow paging.",
    tags: ["Log Recovery", "Checkpointing", "ARIES", "Shadow Paging", "Undo/Redo"],
    accent: "#60A5FA",
    glow: "rgba(96,165,250,0.13)",
    iconBg: "rgba(96,165,250,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/log-based-recovery-in-dbms/",
    links: [
      { label: "Log-Based Recovery", url: "https://www.geeksforgeeks.org/log-based-recovery-in-dbms/" },
      { label: "Database Recovery", url: "https://www.geeksforgeeks.org/database-recovery/" },
      { label: "Checkpointing", url: "https://www.geeksforgeeks.org/checkpoint-in-dbms/" },
      { label: "Shadow Paging", url: "https://www.geeksforgeeks.org/shadow-paging-dbms/" },
    ],
  },
  {
    id: "08",
    title: "Interview & GATE Prep",
    emoji: "🎯",
    desc: "DBMS interview questions, last-minute notes, GATE PYQs, quizzes and practice sets.",
    tags: ["Interview Qs", "Last Minute", "GATE PYQs", "Quizzes", "Practice"],
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.12)",
    iconBg: "rgba(59,130,246,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/commonly-asked-dbms-interview-questions/",
    links: [
      { label: "DBMS Interview Questions", url: "https://www.geeksforgeeks.org/commonly-asked-dbms-interview-questions/" },
      { label: "Last Minute Notes DBMS", url: "https://www.geeksforgeeks.org/last-minute-notes-dbms/" },
      { label: "DBMS Quiz", url: "https://www.geeksforgeeks.org/quiz-corner-gq/" },
      { label: "GATE DBMS Questions", url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/" },
    ],
  },
];

type Section = (typeof sections)[0];

function ModuleCard({ s, delay }: { s: Section; delay: number }) {
  return (
    <div
      className="mod-card"
      style={{ "--card-glow": s.glow, "--card-accent": s.accent, animationDelay: `${delay}s` } as React.CSSProperties}
    >
      <div className="mod-top">
        <div className="mod-icon" style={{ background: s.iconBg }}>{s.emoji}</div>
        <div className="mod-id">{s.id}</div>
      </div>
      <div className="mod-title">{s.title}</div>
      <div className="mod-desc">{s.desc}</div>
      <div className="mod-tags">
        {s.tags.map((t) => <span key={t} className="mod-tag">{t}</span>)}
      </div>
      <div className="mod-links">
        {s.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="mod-link">
            <span className="mod-link-dot" style={{ background: s.accent }} />
            {l.label}
            <span className="mod-link-arr">↗</span>
          </a>
        ))}
      </div>
      <a href={s.primaryLink} target="_blank" rel="noopener noreferrer" className="mod-cta">
        Explore Module <span className="mod-arrow">→</span>
      </a>
    </div>
  );
}

export default function DBMSPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .dbms-root { background:rgba(1,4,16,0.75);color:#eff6ff;font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden;position:relative; }
        .bg-grid { position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(96,165,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.04) 1px,transparent 1px);background-size:56px 56px; }
        .bg-orb { position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(59,130,246,0.12);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(96,165,250,0.08);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(29,78,216,0.08);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .dbms-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip { display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(96,165,250,0.28);background:rgba(96,165,250,0.07);border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both; }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#60A5FA;box-shadow:0 0 10px #60A5FA;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#60A5FA;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#3B82F6;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(96,165,250,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#60A5FA 0%,#3B82F6 50%,#93C5FD 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#475b8a;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#1d4ed8;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#3b82f6;transform:translateY(-2px);box-shadow:0 12px 32px rgba(59,130,246,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(96,165,250,0.2);background:rgba(96,165,250,0.04);color:#93C5FD;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#eff6ff;border-color:rgba(96,165,250,0.45);background:rgba(96,165,250,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(96,165,250,0.08);border-radius:16px;background:rgba(1,4,16,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(96,165,250,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#eff6ff;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#1e3a6e;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#1e3a6e;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(96,165,250,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(96,165,250,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(1,3,14,0.85);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(2,6,24,0.9); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(96,165,250,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#1e3a6e;border:1px solid rgba(96,165,250,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#eff6ff;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#475b8a;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(96,165,250,0.08);border-radius:6px;padding:4px 10px;color:#1e3a6e;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(96,165,250,0.16);color:#2d5bb0; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#475b8a;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(96,165,250,0.06);background:rgba(96,165,250,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#eff6ff;border-color:rgba(96,165,250,0.18);background:rgba(96,165,250,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#60A5FA);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(1,3,14,0.85);border:1px solid rgba(96,165,250,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(96,165,250,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:140px;color:rgba(96,165,250,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#475b8a;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
        .bottom-ctas { display:flex;gap:14px;flex-wrap:wrap;position:relative; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:640px) {
          .metrics-bar { grid-template-columns:1fr 1fr; }
          .metric { border-right:none;border-bottom:1px solid rgba(96,165,250,0.08); }
          .metric:nth-child(1),.metric:nth-child(2) { border-right:1px solid rgba(96,165,250,0.08); }
          .metric:last-child,.metric:nth-last-child(2) { border-bottom:none; }
          .card-grid { grid-template-columns:1fr; }
          .bottom-cta { padding:36px 24px; }
          .bottom-decor { display:none; }
        }
      `}</style>
      <div className="dbms-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="dbms-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · DBMS</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">Database Systems Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Master</span>
              <span className="hero-title-grad">DBMS &</span>
              Databases
            </h1>
            <p className="hero-body">
              A complete DBMS guide — from ER models to normalization, transactions and recovery.
              Built for SWE interviews, GATE, and deep database engineering mastery.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Learning
              </a>
              <a href="https://www.geeksforgeeks.org/last-minute-notes-dbms/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Quick Revision Notes →
              </a>
            </div>
          </section>
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "100%", label: "Interview Coverage" },
              { num: "#1", label: "GATE CS Topic" },
            ].map((s) => (
              <div key={s.label} className="metric">
                <div className="metric-num">{s.num}</div>
                <div className="metric-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="sec-divider">
            <span className="sec-label">Curriculum</span>
            <div className="sec-line" />
            <span className="sec-label">8 modules · 40+ topics</span>
          </div>
          <div className="card-grid">
            {sections.map((s, i) => <ModuleCard key={s.id} s={s} delay={i * 0.06} />)}
          </div>
          <div className="bottom-cta">
            <div className="bottom-decor">DB</div>
            <h2 className="bottom-title">Why DBMS is the backbone<br />of every system</h2>
            <p className="bottom-body">
              Every application ultimately persists data. Understanding normalization, ACID transactions,
              indexing strategies, and concurrency control is what separates engineers who design
              reliable systems from those who discover data corruption in production.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/commonly-asked-dbms-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">Interview Questions →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}