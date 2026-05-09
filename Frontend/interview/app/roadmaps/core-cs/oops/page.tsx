"use client";

const sections = [
  {
    id: "01",
    title: "OOPs Basics",
    emoji: "🧩",
    desc: "Introduction to OOP, classes, objects, procedures vs OOP paradigm and OOP languages.",
    tags: ["Intro to OOP", "Classes", "Objects", "Paradigm", "OOP vs Proc"],
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.13)",
    iconBg: "rgba(167,139,250,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/",
    links: [
      { label: "Intro to OOP", url: "https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/" },
      { label: "Classes and Objects", url: "https://www.geeksforgeeks.org/c-classes-and-objects/" },
      { label: "OOP vs Procedural", url: "https://www.geeksforgeeks.org/differences-between-procedural-and-object-oriented-programming/" },
      { label: "OOP Concepts", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" },
    ],
  },
  {
    id: "02",
    title: "Encapsulation",
    emoji: "📦",
    desc: "Data hiding, access modifiers (public, private, protected), getters/setters, abstraction.",
    tags: ["Data Hiding", "Access Modifiers", "Getters/Setters", "Abstraction", "Capsule"],
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.13)",
    iconBg: "rgba(139,92,246,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/encapsulation-in-java/",
    links: [
      { label: "Encapsulation", url: "https://www.geeksforgeeks.org/encapsulation-in-java/" },
      { label: "Access Modifiers", url: "https://www.geeksforgeeks.org/access-modifiers-in-java/" },
      { label: "Data Abstraction", url: "https://www.geeksforgeeks.org/abstraction-in-java-2/" },
      { label: "Abstraction vs Encapsulation", url: "https://www.geeksforgeeks.org/difference-between-abstraction-and-encapsulation-in-java-with-examples/" },
    ],
  },
  {
    id: "03",
    title: "Inheritance",
    emoji: "🌳",
    desc: "Single, multiple, multilevel, hierarchical, hybrid inheritance, super keyword and method overriding.",
    tags: ["Single", "Multiple", "Multilevel", "Hierarchical", "Method Overriding"],
    accent: "#C4B5FD",
    glow: "rgba(196,181,253,0.13)",
    iconBg: "rgba(196,181,253,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/inheritance-in-java/",
    links: [
      { label: "Inheritance in OOP", url: "https://www.geeksforgeeks.org/inheritance-in-java/" },
      { label: "Types of Inheritance", url: "https://www.geeksforgeeks.org/types-of-inheritance-python/" },
      { label: "Method Overriding", url: "https://www.geeksforgeeks.org/overriding-in-java/" },
      { label: "super Keyword", url: "https://www.geeksforgeeks.org/super-keyword-in-java/" },
    ],
  },
  {
    id: "04",
    title: "Polymorphism",
    emoji: "🔀",
    desc: "Compile-time vs runtime polymorphism, method overloading, overriding, virtual functions.",
    tags: ["Overloading", "Overriding", "Runtime Poly", "Virtual Funcs", "Dynamic Dispatch"],
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.12)",
    iconBg: "rgba(167,139,250,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/polymorphism-in-java/",
    links: [
      { label: "Polymorphism", url: "https://www.geeksforgeeks.org/polymorphism-in-java/" },
      { label: "Method Overloading", url: "https://www.geeksforgeeks.org/overloading-in-java/" },
      { label: "Runtime Polymorphism", url: "https://www.geeksforgeeks.org/dynamic-method-dispatch-runtime-polymorphism-java/" },
      { label: "Virtual Functions", url: "https://www.geeksforgeeks.org/virtual-function-cpp/" },
    ],
  },
  {
    id: "05",
    title: "Abstraction & Interfaces",
    emoji: "🎭",
    desc: "Abstract classes, interfaces, pure virtual functions, abstract vs interface comparison.",
    tags: ["Abstract Class", "Interfaces", "Pure Virtual", "Abstract Methods", "IS-A"],
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.13)",
    iconBg: "rgba(139,92,246,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/abstract-classes-in-java/",
    links: [
      { label: "Abstract Classes", url: "https://www.geeksforgeeks.org/abstract-classes-in-java/" },
      { label: "Interfaces in Java", url: "https://www.geeksforgeeks.org/interfaces-in-java/" },
      { label: "Abstract vs Interface", url: "https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/" },
      { label: "Pure Virtual Functions", url: "https://www.geeksforgeeks.org/pure-virtual-functions-and-abstract-classes/" },
    ],
  },
  {
    id: "06",
    title: "Constructors & Destructors",
    emoji: "⚙️",
    desc: "Default, parameterized, copy constructors, constructor chaining, destructors and finalizers.",
    tags: ["Default Ctor", "Copy Ctor", "Constructor Chain", "Destructors", "Finalizers"],
    accent: "#C4B5FD",
    glow: "rgba(196,181,253,0.13)",
    iconBg: "rgba(196,181,253,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/constructors-in-java/",
    links: [
      { label: "Constructors", url: "https://www.geeksforgeeks.org/constructors-in-java/" },
      { label: "Copy Constructor", url: "https://www.geeksforgeeks.org/copy-constructor-in-java/" },
      { label: "Constructor Chaining", url: "https://www.geeksforgeeks.org/constructor-chaining-java-examples/" },
      { label: "Destructors in C++", url: "https://www.geeksforgeeks.org/destructors-c/" },
    ],
  },
  {
    id: "07",
    title: "Design Patterns",
    emoji: "🏛️",
    desc: "Creational, structural, behavioural patterns — Singleton, Factory, Observer, Strategy.",
    tags: ["Singleton", "Factory", "Observer", "Strategy", "Decorator"],
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.13)",
    iconBg: "rgba(167,139,250,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/software-design-patterns/",
    links: [
      { label: "Design Patterns", url: "https://www.geeksforgeeks.org/software-design-patterns/" },
      { label: "Singleton Pattern", url: "https://www.geeksforgeeks.org/singleton-class-java/" },
      { label: "Factory Pattern", url: "https://www.geeksforgeeks.org/factory-method-design-pattern-in-java/" },
      { label: "Observer Pattern", url: "https://www.geeksforgeeks.org/observer-pattern-set-1-introduction/" },
    ],
  },
  {
    id: "08",
    title: "Interview & Practice",
    emoji: "🎯",
    desc: "OOP interview questions, practice problems, last-minute notes, quizzes and coding exercises.",
    tags: ["Interview Qs", "Last Minute", "Quizzes", "Coding Qs", "SOLID Principles"],
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.12)",
    iconBg: "rgba(139,92,246,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/oops-interview-questions/",
    links: [
      { label: "OOP Interview Questions", url: "https://www.geeksforgeeks.org/oops-interview-questions/" },
      { label: "SOLID Principles", url: "https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/" },
      { label: "OOP Quiz", url: "https://www.geeksforgeeks.org/quiz-corner-gq/" },
      { label: "OOP MCQ", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-mcq/" },
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

export default function OOPSPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .oops-root { background:rgba(6,2,14,0.75);color:#f5f3ff;font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden;position:relative; }
        .bg-grid { position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(167,139,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.04) 1px,transparent 1px);background-size:56px 56px; }
        .bg-orb { position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(139,92,246,0.12);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(167,139,250,0.08);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(109,40,217,0.08);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .oops-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip { display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(167,139,250,0.28);background:rgba(167,139,250,0.07);border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both; }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#A78BFA;box-shadow:0 0 10px #A78BFA;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#A78BFA;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#8B5CF6;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(167,139,250,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#A78BFA 0%,#8B5CF6 50%,#C4B5FD 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#6b5a8a;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#6d28d9;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#8b5cf6;transform:translateY(-2px);box-shadow:0 12px 32px rgba(139,92,246,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04);color:#C4B5FD;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#f5f3ff;border-color:rgba(167,139,250,0.45);background:rgba(167,139,250,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(167,139,250,0.08);border-radius:16px;background:rgba(6,2,14,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(167,139,250,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#f5f3ff;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#3b1f6e;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#3b1f6e;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(167,139,250,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(167,139,250,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(4,1,12,0.85);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(8,2,22,0.9); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(167,139,250,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#3b1f6e;border:1px solid rgba(167,139,250,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#f5f3ff;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#6b5a8a;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(167,139,250,0.08);border-radius:6px;padding:4px 10px;color:#3b1f6e;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(167,139,250,0.16);color:#5b3fa0; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b5a8a;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(167,139,250,0.06);background:rgba(167,139,250,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#f5f3ff;border-color:rgba(167,139,250,0.18);background:rgba(167,139,250,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#A78BFA);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(4,1,12,0.85);border:1px solid rgba(167,139,250,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(167,139,250,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:140px;color:rgba(167,139,250,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#6b5a8a;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
        .bottom-ctas { display:flex;gap:14px;flex-wrap:wrap;position:relative; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:640px) {
          .metrics-bar { grid-template-columns:1fr 1fr; }
          .metric { border-right:none;border-bottom:1px solid rgba(167,139,250,0.08); }
          .metric:nth-child(1),.metric:nth-child(2) { border-right:1px solid rgba(167,139,250,0.08); }
          .metric:last-child,.metric:nth-last-child(2) { border-bottom:none; }
          .card-grid { grid-template-columns:1fr; }
          .bottom-cta { padding:36px 24px; }
          .bottom-decor { display:none; }
        }
      `}</style>
      <div className="oops-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="oops-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · Object-Oriented Programming</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">OOP Paradigm Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Master</span>
              <span className="hero-title-grad">OOPs &</span>
              Design
            </h1>
            <p className="hero-body">
              A complete OOP guide — from classes and objects to design patterns and SOLID principles.
              Built for SWE interviews, competitive coding and clean architecture mastery.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Learning
              </a>
              <a href="https://www.geeksforgeeks.org/oops-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Interview Questions →
              </a>
            </div>
          </section>
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "100%", label: "Interview Coverage" },
              { num: "4", label: "OOP Pillars" },
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
            <div className="bottom-decor">OOP</div>
            <h2 className="bottom-title">Why OOP is the foundation<br />of modern software</h2>
            <p className="bottom-body">
              Object-oriented programming is the lingua franca of software engineering. Mastering
              encapsulation, inheritance, polymorphism, and design patterns is what lets you
              write code that other engineers can read, extend, and maintain years later.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/software-design-patterns/" target="_blank" rel="noopener noreferrer" className="btn-outline">Design Patterns →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}