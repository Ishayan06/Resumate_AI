"use client";

const sections = [
  {
    id: "01",
    title: "Web Dev Projects",
    emoji: "🌐",
    desc: "Build real-world websites — portfolio sites, landing pages, blogs, e-commerce UIs and dashboards.",
    tags: ["Portfolio", "Landing Page", "Blog", "E-Commerce", "Dashboard"],
    accent: "#92714A",
    glow: "rgba(146,113,74,0.13)",
    iconBg: "rgba(146,113,74,0.10)",
    primaryLink: "https://www.frontendmentor.io/challenges",
    links: [
      { label: "Frontend Mentor Challenges", url: "https://www.frontendmentor.io/challenges" },
      { label: "100 Days of CSS Projects", url: "https://100dayscss.com/" },
      { label: "The Odin Project — Web", url: "https://www.theodinproject.com/paths/full-stack-javascript" },
      { label: "freeCodeCamp Web Projects", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
    ],
  },
  {
    id: "02",
    title: "JavaScript Projects",
    emoji: "⚡",
    desc: "DOM projects, games, clocks, calculators, weather apps, quiz apps and API integrations.",
    tags: ["DOM Projects", "Games", "API Apps", "Calculator", "Quiz App"],
    accent: "#7A5C38",
    glow: "rgba(122,92,56,0.13)",
    iconBg: "rgba(122,92,56,0.10)",
    primaryLink: "https://javascript30.com/",
    links: [
      { label: "JavaScript30 — 30 Free Projects", url: "https://javascript30.com/" },
      { label: "30 JS Projects for Beginners", url: "https://www.geeksforgeeks.org/top-javascript-projects/" },
      { label: "freeCodeCamp JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
      { label: "The Odin Project — JS", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript" },
    ],
  },
  {
    id: "03",
    title: "React Projects",
    emoji: "⚛️",
    desc: "Component-based apps — todo lists, e-commerce carts, movie finders, chat UIs and more.",
    tags: ["Todo App", "Movie Finder", "Chat UI", "Weather App", "Cart"],
    accent: "#B8936A",
    glow: "rgba(184,147,106,0.13)",
    iconBg: "rgba(184,147,106,0.10)",
    primaryLink: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
    links: [
      { label: "freeCodeCamp React Projects", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/" },
      { label: "React Mini Projects — GFG", url: "https://www.geeksforgeeks.org/reactjs-projects/" },
      { label: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact" },
      { label: "React Beginner Projects", url: "https://www.geeksforgeeks.org/top-reactjs-projects/" },
    ],
  },
  {
    id: "04",
    title: "Python Projects",
    emoji: "🐍",
    desc: "Scripting, automation, web scrapers, data tools, GUI apps, games with pygame and CLI utilities.",
    tags: ["Automation", "Web Scraper", "GUI App", "Pygame", "CLI Tools"],
    accent: "#92714A",
    glow: "rgba(146,113,74,0.12)",
    iconBg: "rgba(146,113,74,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/python-projects-beginner-to-advanced/",
    links: [
      { label: "Python Projects — GFG", url: "https://www.geeksforgeeks.org/python-projects-beginner-to-advanced/" },
      { label: "100 Python Projects — Tech With Tim", url: "https://techwithtim.net/tutorials/python-programming/python-projects-for-beginners/" },
      { label: "freeCodeCamp Python", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/" },
      { label: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" },
    ],
  },
  {
    id: "05",
    title: "Full Stack Projects",
    emoji: "🗂️",
    desc: "MERN / PERN stack apps — auth systems, CRUD apps, real-time chats and REST API backends.",
    tags: ["MERN Stack", "Auth System", "REST API", "Real-time", "CRUD App"],
    accent: "#7A5C38",
    glow: "rgba(122,92,56,0.13)",
    iconBg: "rgba(122,92,56,0.10)",
    primaryLink: "https://www.geeksforgeeks.org/full-stack-web-development-projects/",
    links: [
      { label: "Full Stack Projects — GFG", url: "https://www.geeksforgeeks.org/full-stack-web-development-projects/" },
      { label: "The Odin Project Full Stack", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails" },
      { label: "freeCodeCamp Back End", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/" },
      { label: "Node.js Project Ideas", url: "https://www.geeksforgeeks.org/top-node-js-project-ideas/" },
    ],
  },
  {
    id: "06",
    title: "AI / ML Projects",
    emoji: "🤖",
    desc: "Build classifiers, chatbots, recommendation engines, image recognition and sentiment analyzers.",
    tags: ["Classifier", "Chatbot", "Recommender", "Image AI", "Sentiment"],
    accent: "#B8936A",
    glow: "rgba(184,147,106,0.13)",
    iconBg: "rgba(184,147,106,0.10)",
    primaryLink: "https://www.geeksforgeeks.org/machine-learning-projects/",
    links: [
      { label: "ML Projects — GFG", url: "https://www.geeksforgeeks.org/machine-learning-projects/" },
      { label: "Kaggle Free Datasets & Projects", url: "https://www.kaggle.com/projects" },
      { label: "freeCodeCamp ML Course", url: "https://www.freecodecamp.org/learn/machine-learning-with-python/" },
      { label: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai/" },
    ],
  },
  {
    id: "07",
    title: "DSA & Competitive",
    emoji: "🧩",
    desc: "Implement data structures, solve algorithm challenges, build visualizers and coding games.",
    tags: ["DSA Visualizer", "LeetCode", "Sorting Viz", "Graph Projects", "CP"],
    accent: "#92714A",
    glow: "rgba(146,113,74,0.13)",
    iconBg: "rgba(146,113,74,0.10)",
    primaryLink: "https://visualgo.net/",
    links: [
      { label: "VisuAlgo — Algorithm Visualizer", url: "https://visualgo.net/" },
      { label: "LeetCode Free Problems", url: "https://leetcode.com/problemset/" },
      { label: "Project-based DSA — GFG", url: "https://www.geeksforgeeks.org/data-structures-project/" },
      { label: "Build DSA Visualizer", url: "https://www.geeksforgeeks.org/how-to-build-a-sorting-visualizer/" },
    ],
  },
  {
    id: "08",
    title: "Open Source & Portfolio",
    emoji: "🚀",
    desc: "Contribute to open source, find beginner-friendly issues, build a resume-worthy project portfolio.",
    tags: ["GitHub", "Good First Issue", "Portfolio", "Open Source", "Resume"],
    accent: "#7A5C38",
    glow: "rgba(122,92,56,0.12)",
    iconBg: "rgba(122,92,56,0.09)",
    primaryLink: "https://goodfirstissue.dev/",
    links: [
      { label: "Good First Issue", url: "https://goodfirstissue.dev/" },
      { label: "Up For Grabs", url: "https://up-for-grabs.net/" },
      { label: "First Timers Only", url: "https://www.firsttimersonly.com/" },
      { label: "CodeTriage — Open Source", url: "https://www.codetriage.com/" },
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
        Explore Projects <span className="mod-arrow">→</span>
      </a>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .pr-root {
    background: rgba(2,4,12,0.82);
    color: #fefce8;
    font-family: 'Cabinet Grotesk', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(130px);
  }

  .orb-a {
    width: 700px;
    height: 700px;
    background: rgba(245,158,11,0.11);
    top: -220px;
    right: -180px;
    animation: drift 18s ease-in-out infinite alternate;
  }

  .orb-b {
    width: 500px;
    height: 500px;
    background: rgba(251,191,36,0.07);
    bottom: -100px;
    left: -120px;
    animation: drift 22s ease-in-out infinite alternate-reverse;
  }

  .orb-c {
    width: 380px;
    height: 380px;
    background: rgba(180,120,0,0.07);
    top: 42%;
    left: 38%;
    animation: drift 15s ease-in-out infinite alternate;
  }

  @keyframes drift {
    from { transform: translate(0,0) }
    to { transform: translate(28px,-28px) }
  }

  .pr-page {
    position: relative;
    z-index: 1;
    max-width: 1120px;
    margin: 0 auto;
    padding: 64px 28px 100px;
  }

  .header-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(251,191,36,0.28);
    background: rgba(251,191,36,0.07);
    border-radius: 100px;
    padding: 7px 18px;
    margin-bottom: 44px;
    animation: fadeUp 0.55s ease both;
  }

  .chip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FBBF24;
    box-shadow: 0 0 10px #FBBF24;
    flex-shrink: 0;
    animation: blink 2.5s ease-in-out infinite;
  }

  @keyframes blink {
    0%,100% { opacity: 1 }
    50% { opacity: 0.35 }
  }

  .chip-label {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: #FBBF24;
    letter-spacing: 0.1em;
  }

  .hero {
    margin-bottom: 64px;
  }

  .hero-eyebrow {
    font-family: 'Fira Code', monospace;
    font-size: 12px;
    color: #F59E0B;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 18px;
    animation: fadeUp 0.55s 0.08s ease both;
  }

  .hero-title {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(54px, 8vw, 100px);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
    animation: fadeUp 0.55s 0.14s ease both;
  }

  .hero-title-outline {
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(251,191,36,0.5);
    display: block;
  }

  .hero-title-grad {
    font-style: italic;
    display: block;
    background: linear-gradient(
      120deg,
      #FBBF24 0%,
      #F59E0B 50%,
      #FCD34D 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-body {
    font-size: 16px;
    color: #a78b52;
    max-width: 520px;
    line-height: 1.82;
    margin: 28px 0 36px;
    font-weight: 400;
    animation: fadeUp 0.55s 0.19s ease both;
  }

  .hero-ctas {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    animation: fadeUp 0.55s 0.23s ease both;
  }

  .btn-fill {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: #b45309;
    color: #fff;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.02em;
    border-radius: 12px;
    padding: 13px 26px;
    text-decoration: none;
    transition: all 0.2s;
    border: 1px solid transparent;
  }

  .btn-fill:hover {
    background: #d97706;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(251,191,36,0.28);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    border: 1px solid rgba(251,191,36,0.2);
    background: rgba(251,191,36,0.04);
    color: #FCD34D;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    border-radius: 12px;
    padding: 13px 26px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-outline:hover {
    color: #fefce8;
    border-color: rgba(251,191,36,0.45);
    background: rgba(251,191,36,0.08);
  }

  .metrics-bar {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    border: 1px solid rgba(251,191,36,0.08);
    border-radius: 16px;
    background: rgba(2,4,12,0.6);
    overflow: hidden;
    margin-bottom: 72px;
    animation: fadeUp 0.55s 0.28s ease both;
  }

  .metric {
    padding: 22px 26px;
    border-right: 1px solid rgba(251,191,36,0.08);
  }

  .metric:last-child {
    border-right: none;
  }

  .metric-num {
    font-family: 'Instrument Serif', serif;
    font-size: 38px;
    color: #fefce8;
    line-height: 1;
    margin-bottom: 6px;
  }

  .metric-label {
    font-family: 'Fira Code', monospace;
    font-size: 10.5px;
    color: #5a4a1e;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .sec-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 36px;
    animation: fadeUp 0.5s 0.33s ease both;
  }

  .sec-label {
    font-family: 'Fira Code', monospace;
    font-size: 10px;
    color: #5a4a1e;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .sec-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(251,191,36,0.15),
      transparent
    );
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(330px,1fr));
    gap: 1px;
    background: rgba(251,191,36,0.07);
    border-radius: 20px;
    overflow: hidden;
  }

  .mod-card {
    background: rgba(2,3,10,0.88);
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
    display: flex;
    flex-direction: column;
    animation: fadeUp 0.5s ease both;
  }

  .mod-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 85% 15%,
      var(--card-glow,transparent),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.35s;
    pointer-events: none;
  }

  .mod-card:hover {
    background: rgba(4,6,18,0.92);
  }

  .mod-card:hover::after {
    opacity: 1;
  }

  .mod-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  .mod-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    border: 1px solid rgba(251,191,36,0.10);
  }

  .mod-id {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: #5a4a1e;
    border: 1px solid rgba(251,191,36,0.08);
    border-radius: 6px;
    padding: 4px 9px;
  }

  .mod-title {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 10px;
    color: #fefce8;
    letter-spacing: -0.01em;
  }

  .mod-desc {
    font-size: 13.5px;
    color: #a78b52;
    line-height: 1.75;
    margin-bottom: 20px;
  }

  .mod-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 20px;
  }

  .mod-tag {
    font-family: 'Fira Code', monospace;
    font-size: 10.5px;
    border: 1px solid rgba(251,191,36,0.08);
    border-radius: 6px;
    padding: 4px 10px;
    color: #8f6c20;
    transition: all 0.2s;
  }

  .mod-card:hover .mod-tag {
    border-color: rgba(251,191,36,0.16);
    color: #d6a63d;
  }

  .mod-links {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 24px;
    flex: 1;
  }

  .mod-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    color: #a78b52;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid rgba(251,191,36,0.06);
    background: rgba(251,191,36,0.02);
    transition: all 0.18s;
  }

  .mod-link:hover {
    color: #fefce8;
    border-color: rgba(251,191,36,0.18);
    background: rgba(251,191,36,0.06);
  }

  .mod-link-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .mod-link-arr {
    margin-left: auto;
    font-size: 11px;
    opacity: 0.4;
  }

  .mod-link:hover .mod-link-arr {
    opacity: 0.9;
  }

  .mod-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 700;
    color: var(--card-accent,#FBBF24);
    text-decoration: none;
    transition: gap 0.2s;
    margin-top: auto;
  }

  .mod-cta:hover {
    gap: 10px;
  }

  .mod-arrow {
    font-size: 17px;
    display: inline-block;
    transition: transform 0.2s;
  }

  .mod-cta:hover .mod-arrow {
    transform: translateX(3px);
  }

  .bottom-cta {
    margin-top: 72px;
    background: rgba(2,3,10,0.88);
    border: 1px solid rgba(251,191,36,0.08);
    border-radius: 22px;
    padding: 60px 56px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s 0.48s ease both;
  }

  .bottom-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 90% 50%,
      rgba(251,191,36,0.07),
      transparent 60%
    );
    pointer-events: none;
  }

  .bottom-decor {
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Instrument Serif', serif;
    font-size: 140px;
    color: rgba(251,191,36,0.03);
    font-style: italic;
    letter-spacing: -0.05em;
    user-select: none;
    pointer-events: none;
    line-height: 1;
  }

  .bottom-title {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(30px,4vw,52px);
    font-weight: 400;
    font-style: italic;
    margin-bottom: 16px;
    line-height: 1.1;
    position: relative;
  }

  .bottom-body {
    font-size: 15px;
    color: #a78b52;
    max-width: 580px;
    line-height: 1.88;
    margin-bottom: 36px;
    position: relative;
  }

  .bottom-ctas {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    position: relative;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width:640px) {
    .metrics-bar {
      grid-template-columns: 1fr 1fr;
    }

    .metric {
      border-right: none;
      border-bottom: 1px solid rgba(251,191,36,0.08);
    }

    .metric:nth-child(1),
    .metric:nth-child(2) {
      border-right: 1px solid rgba(251,191,36,0.08);
    }

    .metric:last-child,
    .metric:nth-last-child(2) {
      border-bottom: none;
    }

    .card-grid {
      grid-template-columns: 1fr;
    }

    .bottom-cta {
      padding: 36px 24px;
    }

    .bottom-decor {
      display: none;
    }
  }
`}</style>

      <div className="pr-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />

        <div className="pr-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// Build · Free Projects</span>
          </div>

          <section className="hero">
            <div className="hero-eyebrow">Hands-On Project Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Build</span>
              <span className="hero-title-grad">Real &</span>
              Ship It
            </h1>
            <p className="hero-body">
              Curated free project ideas across web dev, Python, AI/ML, DSA and open source —
              every resource is 100% free and accessible. Stop tutorial hell. Start building.
            </p>
            <div className="hero-ctas">
              <a href="https://www.frontendmentor.io/challenges" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Building
              </a>
              <a href="https://goodfirstissue.dev/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Contribute to Open Source →
              </a>
            </div>
          </section>

          <div className="metrics-bar">
            {[
              { num: "08", label: "Project Categories" },
              { num: "30+", label: "Free Resources" },
              { num: "100%", label: "Free & Accessible" },
              { num: "∞", label: "Ideas to Build" },
            ].map((s) => (
              <div key={s.label} className="metric">
                <div className="metric-num">{s.num}</div>
                <div className="metric-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="sec-divider">
            <span className="sec-label">Project Hub</span>
            <div className="sec-line" />
            <span className="sec-label">8 categories · 30+ free resources</span>
          </div>

          <div className="card-grid">
            {sections.map((s, i) => (
              <ModuleCard key={s.id} s={s} delay={i * 0.06} />
            ))}
          </div>

          <div className="bottom-cta">
            <div className="bottom-decor">Build</div>
            <h2 className="bottom-title">Projects are the only<br />portfolio that matters</h2>
            <p className="bottom-body">
              Certificates fade. Degrees blur together. But a GitHub full of real, shipped projects
              tells your story instantly. Every project here is free to start — no paywall,
              no credit card, no excuses. Pick one and ship it today.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.frontendmentor.io/challenges" target="_blank" rel="noopener noreferrer" className="btn-fill">Browse Challenges</a>
              <a href="https://goodfirstissue.dev/" target="_blank" rel="noopener noreferrer" className="btn-outline">Open Source Issues →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}