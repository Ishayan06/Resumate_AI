"use client";

const sections = [
  {
    id: "01",
    title: "ML Fundamentals",
    emoji: "🧠",
    desc: "Supervised, unsupervised and reinforcement learning, bias-variance tradeoff, train/test splits.",
    tags: ["Supervised", "Unsupervised", "RL", "Bias-Variance", "Evaluation"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.13)",
    iconBg: "rgba(244,114,182,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/machine-learning/",
    links: [
      { label: "ML Introduction", url: "https://www.geeksforgeeks.org/machine-learning/" },
      { label: "Supervised Learning", url: "https://www.geeksforgeeks.org/supervised-unsupervised-learning/" },
      { label: "Bias-Variance Tradeoff", url: "https://www.geeksforgeeks.org/ml-bias-variance-trade-off/" },
      { label: "Model Evaluation", url: "https://www.geeksforgeeks.org/model-evaluation-classification/" },
    ],
  },
  {
    id: "02",
    title: "Math for AI/ML",
    emoji: "📐",
    desc: "Linear algebra, calculus (gradients, chain rule), probability, statistics and information theory.",
    tags: ["Linear Algebra", "Calculus", "Probability", "Statistics", "Gradients"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.13)",
    iconBg: "rgba(236,72,153,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/mathematics-for-machine-learning/",
    links: [
      { label: "Math for ML", url: "https://www.geeksforgeeks.org/mathematics-for-machine-learning/" },
      { label: "Linear Algebra in ML", url: "https://www.geeksforgeeks.org/linear-algebra-machine-learning/" },
      { label: "Probability for ML", url: "https://www.geeksforgeeks.org/probability-in-machine-learning/" },
      { label: "Statistics in ML", url: "https://www.geeksforgeeks.org/statistics-for-machine-learning/" },
    ],
  },
  {
    id: "03",
    title: "Classical ML Algorithms",
    emoji: "⚙️",
    desc: "Linear/logistic regression, decision trees, SVMs, k-NN, Naive Bayes, clustering algorithms.",
    tags: ["Regression", "Decision Trees", "SVM", "k-NN", "Clustering"],
    accent: "#F9A8D4",
    glow: "rgba(249,168,212,0.13)",
    iconBg: "rgba(249,168,212,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/ml-classification-vs-regression/",
    links: [
      { label: "Linear Regression", url: "https://www.geeksforgeeks.org/ml-linear-regression/" },
      { label: "Decision Tree", url: "https://www.geeksforgeeks.org/decision-tree/" },
      { label: "Support Vector Machine", url: "https://www.geeksforgeeks.org/support-vector-machine-algorithm/" },
      { label: "K-Means Clustering", url: "https://www.geeksforgeeks.org/k-means-clustering-introduction/" },
    ],
  },
  {
    id: "04",
    title: "Deep Learning",
    emoji: "🔮",
    desc: "Neural networks, backpropagation, CNNs, RNNs, LSTMs, batch norm and regularization techniques.",
    tags: ["Neural Nets", "CNN", "RNN/LSTM", "Backprop", "Regularization"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.12)",
    iconBg: "rgba(244,114,182,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/deep-learning-tutorial/",
    links: [
      { label: "Deep Learning Tutorial", url: "https://www.geeksforgeeks.org/deep-learning-tutorial/" },
      { label: "Neural Networks", url: "https://www.geeksforgeeks.org/artificial-neural-networks-and-its-applications/" },
      { label: "CNN Architecture", url: "https://www.geeksforgeeks.org/introduction-convolution-neural-network/" },
      { label: "RNN & LSTM", url: "https://www.geeksforgeeks.org/understanding-of-lstm-networks/" },
    ],
  },
  {
    id: "05",
    title: "NLP & Transformers",
    emoji: "💬",
    desc: "Text preprocessing, word embeddings, attention mechanism, transformers, BERT and GPT models.",
    tags: ["Tokenization", "Embeddings", "Attention", "BERT", "Transformers"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.13)",
    iconBg: "rgba(236,72,153,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/",
    links: [
      { label: "NLP Tutorial", url: "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/" },
      { label: "Word Embeddings", url: "https://www.geeksforgeeks.org/word-embeddings-in-nlp/" },
      { label: "Transformer Architecture", url: "https://www.geeksforgeeks.org/transformer-neural-network/" },
      { label: "BERT Model", url: "https://www.geeksforgeeks.org/explanation-of-bert-model-nlp/" },
    ],
  },
  {
    id: "06",
    title: "Computer Vision",
    emoji: "👁️",
    desc: "Image classification, object detection, segmentation, GANs, transfer learning and OpenCV.",
    tags: ["Classification", "Detection", "GAN", "Segmentation", "OpenCV"],
    accent: "#F9A8D4",
    glow: "rgba(249,168,212,0.13)",
    iconBg: "rgba(249,168,212,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/computer-vision/",
    links: [
      { label: "Computer Vision", url: "https://www.geeksforgeeks.org/computer-vision/" },
      { label: "Object Detection", url: "https://www.geeksforgeeks.org/object-detection-vs-object-recognition-vs-image-segmentation/" },
      { label: "GANs Tutorial", url: "https://www.geeksforgeeks.org/generative-adversarial-network-gan/" },
      { label: "Transfer Learning", url: "https://www.geeksforgeeks.org/ml-introduction-to-transfer-learning/" },
    ],
  },
  {
    id: "07",
    title: "MLOps & Deployment",
    emoji: "🚢",
    desc: "ML pipelines, model serving, Flask/FastAPI, Docker for ML, monitoring and feature stores.",
    tags: ["ML Pipelines", "Model Serving", "FastAPI", "Monitoring", "MLflow"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.13)",
    iconBg: "rgba(244,114,182,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/mlops-machine-learning-operations/",
    links: [
      { label: "MLOps Tutorial", url: "https://www.geeksforgeeks.org/mlops-machine-learning-operations/" },
      { label: "Deploy ML with Flask", url: "https://www.geeksforgeeks.org/deploy-machine-learning-model-using-flask/" },
      { label: "Model Monitoring", url: "https://www.geeksforgeeks.org/machine-learning-model-monitoring/" },
      { label: "Feature Engineering", url: "https://www.geeksforgeeks.org/what-is-feature-engineering/" },
    ],
  },
  {
    id: "08",
    title: "AI/ML Interview & GATE",
    emoji: "🎯",
    desc: "ML interview questions, GATE AI PYQs, deep learning quizzes, data science practice sets.",
    tags: ["Interview Qs", "GATE AI", "DS Quizzes", "Practice", "Last Minute"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.12)",
    iconBg: "rgba(236,72,153,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/machine-learning-interview-questions/",
    links: [
      { label: "ML Interview Questions", url: "https://www.geeksforgeeks.org/machine-learning-interview-questions/" },
      { label: "Deep Learning Interview Qs", url: "https://www.geeksforgeeks.org/deep-learning-interview-questions/" },
      { label: "Data Science Interview Qs", url: "https://www.geeksforgeeks.org/data-science-interview-questions/" },
      { label: "NLP Interview Questions", url: "https://www.geeksforgeeks.org/nlp-interview-questions/" },
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

export default function AIMLPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .ai-root { background:rgba(4,1,12,0.82);color:#fdf2f8;font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden;position:relative; }
        .bg-grid { position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(244,114,182,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(244,114,182,0.04) 1px,transparent 1px);background-size:56px 56px; }
        .bg-orb { position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(236,72,153,0.11);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(244,114,182,0.07);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(157,23,77,0.07);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .ai-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip { display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(244,114,182,0.28);background:rgba(244,114,182,0.07);border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both; }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#F472B6;box-shadow:0 0 10px #F472B6;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#F472B6;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#EC4899;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(244,114,182,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#F472B6 0%,#EC4899 50%,#F9A8D4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#7a3a5e;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#9d174d;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#db2777;transform:translateY(-2px);box-shadow:0 12px 32px rgba(244,114,182,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(244,114,182,0.2);background:rgba(244,114,182,0.04);color:#F9A8D4;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#fdf2f8;border-color:rgba(244,114,182,0.45);background:rgba(244,114,182,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(244,114,182,0.08);border-radius:16px;background:rgba(4,1,12,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(244,114,182,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#fdf2f8;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#5a1a3e;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#5a1a3e;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(244,114,182,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(244,114,182,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(4,1,12,0.88);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(8,2,20,0.92); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(244,114,182,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#5a1a3e;border:1px solid rgba(244,114,182,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#fdf2f8;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#7a3a5e;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(244,114,182,0.08);border-radius:6px;padding:4px 10px;color:#5a1a3e;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(244,114,182,0.16);color:#a0306a; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#7a3a5e;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(244,114,182,0.06);background:rgba(244,114,182,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#fdf2f8;border-color:rgba(244,114,182,0.18);background:rgba(244,114,182,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#F472B6);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(4,1,12,0.88);border:1px solid rgba(244,114,182,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(244,114,182,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:140px;color:rgba(244,114,182,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#7a3a5e;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
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
      <div className="ai-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="ai-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · AI/ML</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">Artificial Intelligence & ML Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Learn</span>
              <span className="hero-title-grad">AI &</span>
              Intelligence
            </h1>
            <p className="hero-body">
              A complete AI/ML guide — from linear regression to transformers, deep learning and MLOps.
              Built for ML engineer roles, GATE AI, research foundations and real-world model deployment.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/machine-learning/" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Learning
              </a>
              <a href="https://www.geeksforgeeks.org/machine-learning-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Interview Questions →
              </a>
            </div>
          </section>
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "100%", label: "Interview Coverage" },
              { num: "#1", label: "Future of Tech" },
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
            <div className="bottom-decor">AI</div>
            <h2 className="bottom-title">Why AI/ML is the<br />frontier of every industry</h2>
            <p className="bottom-body">
              Every company is becoming an AI company. Understanding gradient descent, attention
              mechanisms, transformer architectures and model deployment is what separates engineers
              who use AI tools from engineers who build the intelligence inside them.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/machine-learning/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/machine-learning-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">Interview Questions →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}