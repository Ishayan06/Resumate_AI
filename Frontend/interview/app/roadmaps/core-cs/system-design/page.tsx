"use client";

const sections = [
  {
    id: "01",
    title: "SD Fundamentals",
    emoji: "🏗️",
    desc: "Scalability, reliability, availability, latency, throughput and core design principles.",
    tags: ["Scalability", "Availability", "Reliability", "Latency", "Throughput"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.13)",
    iconBg: "rgba(244,114,182,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/system-design-tutorial/",
    links: [
      { label: "System Design Intro", url: "https://www.geeksforgeeks.org/system-design-tutorial/" },
      { label: "Scalability", url: "https://www.geeksforgeeks.org/scalability-in-system-design/" },
      { label: "Availability vs Consistency", url: "https://www.geeksforgeeks.org/consistency-and-availability-in-system-design/" },
      { label: "CAP Theorem", url: "https://www.geeksforgeeks.org/the-cap-theorem-in-dbms/" },
    ],
  },
  {
    id: "02",
    title: "Load Balancing",
    emoji: "⚖️",
    desc: "Load balancers, algorithms (Round Robin, Least Connections), L4 vs L7, health checks.",
    tags: ["Round Robin", "Least Conn", "L4/L7", "Health Checks", "Sticky Sessions"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.13)",
    iconBg: "rgba(236,72,153,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/load-balancing-in-system-design/",
    links: [
      { label: "Load Balancing", url: "https://www.geeksforgeeks.org/load-balancing-in-system-design/" },
      { label: "Load Balancing Algorithms", url: "https://www.geeksforgeeks.org/load-balancing-algorithms/" },
      { label: "Reverse Proxy", url: "https://www.geeksforgeeks.org/what-is-reverse-proxy/" },
      { label: "Nginx vs HAProxy", url: "https://www.geeksforgeeks.org/nginx-vs-apache/" },
    ],
  },
  {
    id: "03",
    title: "Caching",
    emoji: "⚡",
    desc: "Cache strategies, Redis, Memcached, CDN, write-through, write-back, cache invalidation.",
    tags: ["Redis", "CDN", "Write-Through", "Cache-Aside", "Invalidation"],
    accent: "#FB7185",
    glow: "rgba(251,113,133,0.13)",
    iconBg: "rgba(251,113,133,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/caching-system-design-concept-for-beginners/",
    links: [
      { label: "Caching in System Design", url: "https://www.geeksforgeeks.org/caching-system-design-concept-for-beginners/" },
      { label: "Redis Tutorial", url: "https://www.geeksforgeeks.org/redis-tutorial/" },
      { label: "CDN in System Design", url: "https://www.geeksforgeeks.org/designing-content-delivery-network-cdn-system-design/" },
      { label: "Cache Eviction Policies", url: "https://www.geeksforgeeks.org/cache-eviction-policies-system-design/" },
    ],
  },
  {
    id: "04",
    title: "Databases at Scale",
    emoji: "🗃️",
    desc: "SQL vs NoSQL, sharding, replication, partitioning, consistent hashing and database selection.",
    tags: ["Sharding", "Replication", "NoSQL", "Partitioning", "Consistent Hashing"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.12)",
    iconBg: "rgba(244,114,182,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/sql-vs-nosql-which-one-is-better-to-use/",
    links: [
      { label: "SQL vs NoSQL", url: "https://www.geeksforgeeks.org/sql-vs-nosql-which-one-is-better-to-use/" },
      { label: "Database Sharding", url: "https://www.geeksforgeeks.org/database-sharding-a-system-design-concept/" },
      { label: "Consistent Hashing", url: "https://www.geeksforgeeks.org/consistent-hashing/" },
      { label: "Database Replication", url: "https://www.geeksforgeeks.org/data-replication-in-dbms/" },
    ],
  },
  {
    id: "05",
    title: "Message Queues",
    emoji: "📨",
    desc: "Kafka, RabbitMQ, pub-sub pattern, event-driven architecture, async processing.",
    tags: ["Kafka", "RabbitMQ", "Pub-Sub", "Event-Driven", "Async"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.13)",
    iconBg: "rgba(236,72,153,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/message-queues-system-design/",
    links: [
      { label: "Message Queues", url: "https://www.geeksforgeeks.org/message-queues-system-design/" },
      { label: "Apache Kafka", url: "https://www.geeksforgeeks.org/apache-kafka/" },
      { label: "Pub-Sub Architecture", url: "https://www.geeksforgeeks.org/pub-sub-model-in-system-design/" },
      { label: "Event-Driven Design", url: "https://www.geeksforgeeks.org/event-driven-architecture-system-design/" },
    ],
  },
  {
    id: "06",
    title: "Microservices",
    emoji: "🔬",
    desc: "Microservices vs monolith, API gateway, service discovery, circuit breaker pattern.",
    tags: ["Microservices", "API Gateway", "Service Mesh", "Circuit Breaker", "gRPC"],
    accent: "#FB7185",
    glow: "rgba(251,113,133,0.13)",
    iconBg: "rgba(251,113,133,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/microservices/",
    links: [
      { label: "Microservices Architecture", url: "https://www.geeksforgeeks.org/microservices/" },
      { label: "API Gateway", url: "https://www.geeksforgeeks.org/api-gateway-in-system-design/" },
      { label: "Service Discovery", url: "https://www.geeksforgeeks.org/service-discovery-and-health-checks/" },
      { label: "Circuit Breaker", url: "https://www.geeksforgeeks.org/circuit-breaker-pattern/" },
    ],
  },
  {
    id: "07",
    title: "Design Case Studies",
    emoji: "📐",
    desc: "Design YouTube, Twitter, Uber, WhatsApp, URL Shortener, Rate Limiter, Notification System.",
    tags: ["Design YouTube", "Design Twitter", "URL Shortener", "Rate Limiter", "Uber"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.13)",
    iconBg: "rgba(244,114,182,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/system-design-of-youtube-a-complete-architecture/",
    links: [
      { label: "Design YouTube", url: "https://www.geeksforgeeks.org/system-design-of-youtube-a-complete-architecture/" },
      { label: "Design Twitter", url: "https://www.geeksforgeeks.org/design-twitter-a-system-design-interview-question/" },
      { label: "URL Shortener", url: "https://www.geeksforgeeks.org/system-design-url-shortening-service/" },
      { label: "Design WhatsApp", url: "https://www.geeksforgeeks.org/system-design-of-whatsapp/" },
    ],
  },
  {
    id: "08",
    title: "Interview Prep",
    emoji: "🎯",
    desc: "Top interview questions, how to approach SD interviews, estimation, trade-offs and frameworks.",
    tags: ["Interview Qs", "Estimation", "Trade-offs", "HLD", "LLD"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.12)",
    iconBg: "rgba(236,72,153,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/system-design-interview-guide/",
    links: [
      { label: "SD Interview Guide", url: "https://www.geeksforgeeks.org/system-design-interview-guide/" },
      { label: "Top SD Questions", url: "https://www.geeksforgeeks.org/top-system-design-interview-questions/" },
      { label: "HLD vs LLD", url: "https://www.geeksforgeeks.org/difference-between-high-level-design-and-low-level-design/" },
      { label: "Back-of-Envelope", url: "https://www.geeksforgeeks.org/back-of-envelope-estimation/" },
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

export default function SystemDesignPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .sd-root { background:rgba(10,2,6,0.75);color:#fdf2f8;font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden;position:relative; }
        .bg-grid { position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(244,114,182,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(244,114,182,0.04) 1px,transparent 1px);background-size:56px 56px; }
        .bg-orb { position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(244,114,182,0.10);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(236,72,153,0.07);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(251,113,133,0.06);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .sd-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip { display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(244,114,182,0.28);background:rgba(244,114,182,0.07);border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both; }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#F472B6;box-shadow:0 0 10px #F472B6;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#F472B6;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#EC4899;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(244,114,182,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#F472B6 0%,#EC4899 50%,#FB7185 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#9d6b7a;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#be185d;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#ec4899;transform:translateY(-2px);box-shadow:0 12px 32px rgba(236,72,153,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(244,114,182,0.2);background:rgba(244,114,182,0.04);color:#FB7185;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#fdf2f8;border-color:rgba(244,114,182,0.45);background:rgba(244,114,182,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(244,114,182,0.08);border-radius:16px;background:rgba(10,2,6,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(244,114,182,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#fdf2f8;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#7c2d56;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#7c2d56;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(244,114,182,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(244,114,182,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(8,1,5,0.85);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(14,2,9,0.9); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(244,114,182,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#7c2d56;border:1px solid rgba(244,114,182,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#fdf2f8;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#9d6b7a;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(244,114,182,0.08);border-radius:6px;padding:4px 10px;color:#7c2d56;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(244,114,182,0.16);color:#9d3a68; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#9d6b7a;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(244,114,182,0.06);background:rgba(244,114,182,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#fdf2f8;border-color:rgba(244,114,182,0.18);background:rgba(244,114,182,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#F472B6);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(8,1,5,0.85);border:1px solid rgba(244,114,182,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(244,114,182,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:140px;color:rgba(244,114,182,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#9d6b7a;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
        .bottom-ctas { display:flex;gap:14px;flex-wrap:wrap;position:relative; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:640px) {
          .metrics-bar { grid-template-columns:1fr 1fr; }
          .metric { border-right:none;border-bottom:1px solid rgba(244,114,182,0.08); }
          .metric:nth-child(1),.metric:nth-child(2) { border-right:1px solid rgba(244,114,182,0.08); }
          .metric:last-child,.metric:nth-last-child(2) { border-bottom:none; }
          .card-grid { grid-template-columns:1fr; }
          .bottom-cta { padding:36px 24px; }
          .bottom-decor { display:none; }
        }
      `}</style>
      <div className="sd-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="sd-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · System Design</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">Architecture Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Master</span>
              <span className="hero-title-grad">System</span>
              Design
            </h1>
            <p className="hero-body">
              A complete system design guide — from fundamentals to designing Twitter at scale.
              Built for FAANG interviews and real-world distributed systems engineering.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/system-design-tutorial/" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Learning
              </a>
              <a href="https://www.geeksforgeeks.org/system-design-interview-guide/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Interview Guide →
              </a>
            </div>
          </section>
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "100%", label: "Interview Coverage" },
              { num: "#1", label: "FAANG Essential" },
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
            <div className="bottom-decor">SD</div>
            <h2 className="bottom-title">Why system design<br />makes or breaks careers</h2>
            <p className="bottom-body">
              System design separates senior engineers from the rest. Knowing how to scale
              a service from 1 to 1 billion users — handling load balancing, caching, and
              database partitioning — is the skill interviewers test hardest at top companies.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/system-design-tutorial/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/top-system-design-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">Top Interview Qs →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}