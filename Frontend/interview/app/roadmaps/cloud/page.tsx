"use client";

const sections = [
  {
    id: "01",
    title: "Cloud Fundamentals",
    emoji: "☁️",
    desc: "Cloud computing concepts, service models (IaaS/PaaS/SaaS), deployment models, and cloud economics.",
    tags: ["IaaS/PaaS/SaaS", "Deployment", "Economics", "Virtualization", "Intro"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.13)",
    iconBg: "rgba(251,191,36,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/cloud-computing/",
    links: [
      { label: "Cloud Computing Intro", url: "https://www.geeksforgeeks.org/cloud-computing/" },
      { label: "IaaS vs PaaS vs SaaS", url: "https://www.geeksforgeeks.org/iaas-paas-saas/" },
      { label: "Cloud Deployment Models", url: "https://www.geeksforgeeks.org/cloud-deployment-models/" },
      { label: "Virtualization", url: "https://www.geeksforgeeks.org/virtualization-cloud-computing-types/" },
    ],
  },
  {
    id: "02",
    title: "AWS Core Services",
    emoji: "🟠",
    desc: "Amazon Web Services — EC2, S3, RDS, Lambda, VPC, IAM, CloudFront and core AWS architecture.",
    tags: ["EC2", "S3", "Lambda", "VPC", "IAM"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.13)",
    iconBg: "rgba(245,158,11,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/amazon-web-services/",
    links: [
      { label: "AWS Tutorial", url: "https://www.geeksforgeeks.org/amazon-web-services/" },
      { label: "AWS EC2", url: "https://www.geeksforgeeks.org/amazon-ec2/" },
      { label: "AWS S3", url: "https://www.geeksforgeeks.org/amazon-s3/" },
      { label: "AWS Lambda", url: "https://www.geeksforgeeks.org/aws-lambda/" },
    ],
  },
  {
    id: "03",
    title: "Azure & GCP",
    emoji: "🔷",
    desc: "Microsoft Azure services, Google Cloud Platform, multi-cloud strategies and service comparisons.",
    tags: ["Azure", "GCP", "Multi-Cloud", "Compute", "Storage"],
    accent: "#FCD34D",
    glow: "rgba(252,211,77,0.13)",
    iconBg: "rgba(252,211,77,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/microsoft-azure/",
    links: [
      { label: "Microsoft Azure", url: "https://www.geeksforgeeks.org/microsoft-azure/" },
      { label: "Google Cloud Platform", url: "https://www.geeksforgeeks.org/google-cloud-platform/" },
      { label: "AWS vs Azure vs GCP", url: "https://www.geeksforgeeks.org/aws-vs-azure-vs-google-cloud-platform/" },
      { label: "Azure Services Overview", url: "https://www.geeksforgeeks.org/azure-services/" },
    ],
  },
  {
    id: "04",
    title: "Containers & Kubernetes",
    emoji: "🐳",
    desc: "Docker containers, Kubernetes orchestration, pods, deployments, services and cluster management.",
    tags: ["Docker", "Kubernetes", "Pods", "Deployments", "Helm"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.12)",
    iconBg: "rgba(251,191,36,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/docker-tutorial/",
    links: [
      { label: "Docker Tutorial", url: "https://www.geeksforgeeks.org/docker-tutorial/" },
      { label: "Kubernetes Tutorial", url: "https://www.geeksforgeeks.org/kubernetes-tutorial/" },
      { label: "Docker Compose", url: "https://www.geeksforgeeks.org/docker-compose/" },
      { label: "K8s Architecture", url: "https://www.geeksforgeeks.org/kubernetes-architecture/" },
    ],
  },
  {
    id: "05",
    title: "Serverless & Functions",
    emoji: "⚡",
    desc: "Serverless architecture, FaaS, event-driven design, AWS Lambda, Azure Functions and cold starts.",
    tags: ["Serverless", "FaaS", "Event-Driven", "Lambda", "Cold Start"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.13)",
    iconBg: "rgba(245,158,11,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/serverless-computing/",
    links: [
      { label: "Serverless Computing", url: "https://www.geeksforgeeks.org/serverless-computing/" },
      { label: "AWS Lambda Functions", url: "https://www.geeksforgeeks.org/aws-lambda/" },
      { label: "Event-Driven Architecture", url: "https://www.geeksforgeeks.org/event-driven-architecture/" },
      { label: "Azure Functions", url: "https://www.geeksforgeeks.org/azure-functions/" },
    ],
  },
  {
    id: "06",
    title: "Cloud Networking",
    emoji: "🌐",
    desc: "VPC, subnets, load balancers, CDN, DNS, VPN, security groups and cloud network architecture.",
    tags: ["VPC", "Load Balancer", "CDN", "DNS", "Security Groups"],
    accent: "#FCD34D",
    glow: "rgba(252,211,77,0.13)",
    iconBg: "rgba(252,211,77,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/virtual-private-cloud-vpc/",
    links: [
      { label: "VPC Networking", url: "https://www.geeksforgeeks.org/virtual-private-cloud-vpc/" },
      { label: "Load Balancing", url: "https://www.geeksforgeeks.org/load-balancing-algorithms/" },
      { label: "CDN Tutorial", url: "https://www.geeksforgeeks.org/content-delivery-networks/" },
      { label: "Cloud Security", url: "https://www.geeksforgeeks.org/cloud-security/" },
    ],
  },
  {
    id: "07",
    title: "DevOps & IaC",
    emoji: "🔧",
    desc: "Infrastructure as Code with Terraform, Ansible, CI/CD pipelines, monitoring and observability.",
    tags: ["Terraform", "Ansible", "CI/CD", "Monitoring", "IaC"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.13)",
    iconBg: "rgba(251,191,36,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/devops-tutorial/",
    links: [
      { label: "DevOps Tutorial", url: "https://www.geeksforgeeks.org/devops-tutorial/" },
      { label: "Terraform IaC", url: "https://www.geeksforgeeks.org/terraform/" },
      { label: "Ansible Tutorial", url: "https://www.geeksforgeeks.org/ansible/" },
      { label: "CI/CD Pipelines", url: "https://www.geeksforgeeks.org/what-is-ci-cd/" },
    ],
  },
  {
    id: "08",
    title: "Cloud Interview & Certs",
    emoji: "🎯",
    desc: "Cloud interview questions, AWS certification guide, GCP Associate prep, and architecture practice.",
    tags: ["Interview Qs", "AWS Cert", "GCP Cert", "Architecture", "Practice"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
    iconBg: "rgba(245,158,11,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/cloud-computing-interview-questions/",
    links: [
      { label: "Cloud Interview Questions", url: "https://www.geeksforgeeks.org/cloud-computing-interview-questions/" },
      { label: "AWS Interview Questions", url: "https://www.geeksforgeeks.org/aws-interview-questions/" },
      { label: "DevOps Interview Questions", url: "https://www.geeksforgeeks.org/devops-interview-questions/" },
      { label: "System Design — Cloud", url: "https://www.geeksforgeeks.org/system-design-tutorial/" },
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

export default function CloudPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .cl-root { background:rgba(2,4,12,0.82);color:#fefce8;font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden;position:relative; }
        .bg-grid { position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(251,191,36,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,0.04) 1px,transparent 1px);background-size:56px 56px; }
        .bg-orb { position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(245,158,11,0.11);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(251,191,36,0.07);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(180,120,0,0.07);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .cl-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip { display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(251,191,36,0.28);background:rgba(251,191,36,0.07);border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both; }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#FBBF24;box-shadow:0 0 10px #FBBF24;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#FBBF24;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#F59E0B;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(251,191,36,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#FBBF24 0%,#F59E0B 50%,#FCD34D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#78683a;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#b45309;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#d97706;transform:translateY(-2px);box-shadow:0 12px 32px rgba(251,191,36,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(251,191,36,0.2);background:rgba(251,191,36,0.04);color:#FCD34D;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#fefce8;border-color:rgba(251,191,36,0.45);background:rgba(251,191,36,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(251,191,36,0.08);border-radius:16px;background:rgba(2,4,12,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(251,191,36,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#fefce8;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#5a4a1e;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#5a4a1e;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(251,191,36,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(251,191,36,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(2,3,10,0.88);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(4,6,18,0.92); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(251,191,36,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#5a4a1e;border:1px solid rgba(251,191,36,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#fefce8;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#78683a;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(251,191,36,0.08);border-radius:6px;padding:4px 10px;color:#5a4a1e;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(251,191,36,0.16);color:#a07830; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#78683a;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(251,191,36,0.06);background:rgba(251,191,36,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#fefce8;border-color:rgba(251,191,36,0.18);background:rgba(251,191,36,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#FBBF24);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(2,3,10,0.88);border:1px solid rgba(251,191,36,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(251,191,36,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:140px;color:rgba(251,191,36,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#78683a;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
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
      <div className="cl-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="cl-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · Cloud Computing</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">Cloud Engineering Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Scale</span>
              <span className="hero-title-grad">Cloud &</span>
              Infrastructure
            </h1>
            <p className="hero-body">
              A complete cloud computing guide — from AWS fundamentals to Kubernetes, serverless
              and DevOps. Built for cloud engineer roles, AWS/GCP certifications and system design.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/cloud-computing/" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Learning
              </a>
              <a href="https://www.geeksforgeeks.org/cloud-computing-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Interview Questions →
              </a>
            </div>
          </section>
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "3", label: "Major Providers" },
              { num: "#1", label: "Industry Demand" },
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
            <div className="bottom-decor">CL</div>
            <h2 className="bottom-title">Why Cloud is the<br />engine of modern software</h2>
            <p className="bottom-body">
              Every scalable application runs on cloud infrastructure. Understanding virtual
              networks, container orchestration, serverless patterns, and IaC tooling is what
              separates engineers who ship features from engineers who design systems that scale.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/cloud-computing/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/cloud-computing-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">Interview Questions →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}