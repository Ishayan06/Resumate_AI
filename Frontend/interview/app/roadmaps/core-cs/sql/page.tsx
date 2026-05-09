"use client";

const sections = [
  {
    id: "01",
    title: "SQL Basics",
    emoji: "🗄️",
    desc: "Introduction to SQL, DDL, DML, DCL, TCL commands, data types and basic syntax.",
    tags: ["Intro to SQL", "DDL", "DML", "DCL", "Data Types"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.13)",
    iconBg: "rgba(251,191,36,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/sql-tutorial/",
    links: [
      { label: "Introduction to SQL", url: "https://www.geeksforgeeks.org/sql-tutorial/" },
      { label: "DDL Commands", url: "https://www.geeksforgeeks.org/ddl-full-form/" },
      { label: "DML Commands", url: "https://www.geeksforgeeks.org/dml-full-form/" },
      { label: "SQL Data Types", url: "https://www.geeksforgeeks.org/sql-data-types/" },
    ],
  },
  {
    id: "02",
    title: "Queries & Clauses",
    emoji: "🔍",
    desc: "SELECT, WHERE, ORDER BY, GROUP BY, HAVING, DISTINCT and filtering techniques.",
    tags: ["SELECT", "WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.13)",
    iconBg: "rgba(245,158,11,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/sql-select-query/",
    links: [
      { label: "SELECT Statement", url: "https://www.geeksforgeeks.org/sql-select-query/" },
      { label: "WHERE Clause", url: "https://www.geeksforgeeks.org/sql-where-clause/" },
      { label: "GROUP BY Clause", url: "https://www.geeksforgeeks.org/sql-group-by/" },
      { label: "HAVING Clause", url: "https://www.geeksforgeeks.org/sql-having-clause-with-examples/" },
    ],
  },
  {
    id: "03",
    title: "Joins",
    emoji: "🔗",
    desc: "INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF joins with practical examples.",
    tags: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "SELF JOIN"],
    accent: "#FCD34D",
    glow: "rgba(252,211,77,0.13)",
    iconBg: "rgba(252,211,77,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/",
    links: [
      { label: "SQL Joins", url: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/" },
      { label: "INNER JOIN", url: "https://www.geeksforgeeks.org/sql-inner-join/" },
      { label: "LEFT JOIN", url: "https://www.geeksforgeeks.org/sql-left-join/" },
      { label: "FULL OUTER JOIN", url: "https://www.geeksforgeeks.org/sql-full-join/" },
    ],
  },
  {
    id: "04",
    title: "Subqueries",
    emoji: "📦",
    desc: "Nested queries, correlated subqueries, EXISTS, IN, ANY, ALL operators.",
    tags: ["Nested Queries", "Correlated", "EXISTS", "IN Operator", "ANY/ALL"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.12)",
    iconBg: "rgba(251,191,36,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/sql-subquery/",
    links: [
      { label: "Subqueries in SQL", url: "https://www.geeksforgeeks.org/sql-subquery/" },
      { label: "Correlated Subquery", url: "https://www.geeksforgeeks.org/sql-correlated-subqueries/" },
      { label: "EXISTS Operator", url: "https://www.geeksforgeeks.org/sql-exists/" },
      { label: "IN vs EXISTS", url: "https://www.geeksforgeeks.org/difference-between-in-and-exists-in-sql/" },
    ],
  },
  {
    id: "05",
    title: "Functions & Aggregates",
    emoji: "⚙️",
    desc: "Aggregate functions, string functions, numeric functions, date/time functions and window functions.",
    tags: ["COUNT/SUM/AVG", "String Funcs", "Date Funcs", "Window Funcs", "RANK"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.13)",
    iconBg: "rgba(245,158,11,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/aggregate-functions-in-sql/",
    links: [
      { label: "Aggregate Functions", url: "https://www.geeksforgeeks.org/aggregate-functions-in-sql/" },
      { label: "String Functions", url: "https://www.geeksforgeeks.org/sql-string-functions/" },
      { label: "Date Functions", url: "https://www.geeksforgeeks.org/sql-date-functions/" },
      { label: "Window Functions", url: "https://www.geeksforgeeks.org/window-functions-in-sql/" },
    ],
  },
  {
    id: "06",
    title: "Indexes & Views",
    emoji: "📑",
    desc: "Creating and managing indexes, views, materialized views and their performance impact.",
    tags: ["Indexes", "Clustered", "Non-Clustered", "Views", "Materialized"],
    accent: "#FCD34D",
    glow: "rgba(252,211,77,0.13)",
    iconBg: "rgba(252,211,77,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/sql-indexes/",
    links: [
      { label: "SQL Indexes", url: "https://www.geeksforgeeks.org/sql-indexes/" },
      { label: "Clustered vs Non-Clustered", url: "https://www.geeksforgeeks.org/difference-between-clustered-and-non-clustered-index/" },
      { label: "SQL Views", url: "https://www.geeksforgeeks.org/sql-views/" },
      { label: "Materialized Views", url: "https://www.geeksforgeeks.org/materialized-views-in-sql/" },
    ],
  },
  {
    id: "07",
    title: "Transactions & ACID",
    emoji: "🔐",
    desc: "ACID properties, transaction control, COMMIT, ROLLBACK, SAVEPOINT and isolation levels.",
    tags: ["ACID", "Transactions", "COMMIT", "ROLLBACK", "Isolation"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.13)",
    iconBg: "rgba(251,191,36,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
    links: [
      { label: "ACID Properties", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/" },
      { label: "SQL Transactions", url: "https://www.geeksforgeeks.org/sql-transactions/" },
      { label: "COMMIT & ROLLBACK", url: "https://www.geeksforgeeks.org/sql-transactions/" },
      { label: "Isolation Levels", url: "https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/" },
    ],
  },
  {
    id: "08",
    title: "Practice & Interview",
    emoji: "🏆",
    desc: "SQL interview questions, practice problems, GATE PYQs, and last-minute revision notes.",
    tags: ["Interview Qs", "Practice Problems", "GATE PYQs", "Last Minute", "Quizzes"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
    iconBg: "rgba(245,158,11,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/sql-interview-questions/",
    links: [
      { label: "SQL Interview Questions", url: "https://www.geeksforgeeks.org/sql-interview-questions/" },
      { label: "SQL Practice Problems", url: "https://www.geeksforgeeks.org/sql-exercises/" },
      { label: "SQL Quiz", url: "https://www.geeksforgeeks.org/quiz-corner-gq/" },
      { label: "Last Minute Notes SQL", url: "https://www.geeksforgeeks.org/last-minute-notes-dbms/" },
    ],
  },
];

type Section = (typeof sections)[0];

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
      <div className="mod-links">
        { s.links.map((l, idx) => (
  <a
    key={`${s.id}-${l.url}-${idx}`}
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
      <a href={s.primaryLink} target="_blank" rel="noopener noreferrer" className="mod-cta">
        Explore Module <span className="mod-arrow">→</span>
      </a>
    </div>
  );
}

export default function SQLPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .sql-root {
          background: rgba(10, 8, 2, 0.75);
          color: #fefce8;
          font-family: 'Cabinet Grotesk', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .bg-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .bg-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(251,191,36,0.10);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(245,158,11,0.07);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(252,211,77,0.06);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .sql-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip {
          display:inline-flex;align-items:center;gap:10px;
          border:1px solid rgba(251,191,36,0.28);background:rgba(251,191,36,0.07);
          border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both;
        }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#FBBF24;box-shadow:0 0 10px #FBBF24;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#FBBF24;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#F59E0B;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(251,191,36,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#FBBF24 0%,#F59E0B 50%,#FCD34D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#78716c;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#d97706;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#f59e0b;transform:translateY(-2px);box-shadow:0 12px 32px rgba(245,158,11,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(251,191,36,0.2);background:rgba(251,191,36,0.04);color:#FCD34D;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#fefce8;border-color:rgba(251,191,36,0.45);background:rgba(251,191,36,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(251,191,36,0.08);border-radius:16px;background:rgba(10,8,2,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(251,191,36,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#fefce8;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#78550a;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#78550a;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(251,191,36,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(251,191,36,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(8,6,1,0.85);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(14,10,2,0.9); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(251,191,36,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#78550a;border:1px solid rgba(251,191,36,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#fefce8;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#78716c;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(251,191,36,0.08);border-radius:6px;padding:4px 10px;color:#78550a;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(251,191,36,0.16);color:#a16207; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#78716c;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(251,191,36,0.06);background:rgba(251,191,36,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#fefce8;border-color:rgba(251,191,36,0.18);background:rgba(251,191,36,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#FBBF24);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(8,6,1,0.85);border:1px solid rgba(251,191,36,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(251,191,36,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:160px;color:rgba(251,191,36,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#78716c;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
        .bottom-ctas { display:flex;gap:14px;flex-wrap:wrap;position:relative; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:640px) {
          .metrics-bar { grid-template-columns:1fr 1fr; }
          .metric { border-right:none;border-bottom:1px solid rgba(251,191,36,0.08); }
          .metric:nth-child(1),.metric:nth-child(2) { border-right:1px solid rgba(251,191,36,0.08); }
          .metric:last-child,.metric:nth-last-child(2) { border-bottom:none; }
          .card-grid { grid-template-columns:1fr; }
          .bottom-cta { padding:36px 24px; }
          .bottom-decor { display:none; }
        }
      `}</style>
      <div className="sql-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="sql-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · SQL & Databases</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">Query Language Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Master</span>
              <span className="hero-title-grad">SQL &</span>
              Queries
            </h1>
            <p className="hero-body">
              A complete SQL guide — from basic queries to advanced window functions.
              Built for SWE interviews, GATE, and real-world database mastery.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/sql-tutorial/" target="_blank" rel="noopener noreferrer" className="btn-fill">
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
              { num: "#1", label: "DB Fundamental" },
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
            {sections.map((s, i) => (
              <ModuleCard key={s.id} s={s} delay={i * 0.06} />
            ))}
          </div>
          <div className="bottom-cta">
            <div className="bottom-decor">SQL</div>
            <h2 className="bottom-title">Why every engineer<br />must know SQL</h2>
            <p className="bottom-body">
              SQL is the universal language of data. Whether you're building APIs, doing analytics,
              or designing systems — mastering joins, indexes, and query optimization separates
              engineers who ship fast from those who bottleneck on the database.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/sql-tutorial/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/sql-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">Interview Questions →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}