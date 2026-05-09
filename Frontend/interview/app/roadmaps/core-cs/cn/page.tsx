"use client";

const sections = [
  {
    id: "01",
    title: "Network Basics",
    emoji: "🌐",
    desc: "Network models, OSI vs TCP/IP layers, protocols, transmission media and topologies.",
    tags: ["OSI Model", "TCP/IP", "Protocols", "Topologies", "Network Types"],
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.13)",
    iconBg: "rgba(56,189,248,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    links: [
      { label: "Introduction to CN", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" },
      { label: "OSI Model", url: "https://www.geeksforgeeks.org/open-systems-interconnection-model-osi/" },
      { label: "TCP/IP Model", url: "https://www.geeksforgeeks.org/tcp-ip-model/" },
      { label: "Network Topologies", url: "https://www.geeksforgeeks.org/types-of-network-topology/" },
    ],
  },
  {
    id: "02",
    title: "Physical & Data Link",
    emoji: "📡",
    desc: "Signals, encoding, framing, error detection, MAC protocols, Ethernet and switching.",
    tags: ["Framing", "Error Detection", "MAC", "Ethernet", "Switching"],
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,0.13)",
    iconBg: "rgba(14,165,233,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/data-link-layer/",
    links: [
      { label: "Data Link Layer", url: "https://www.geeksforgeeks.org/data-link-layer/" },
      { label: "Error Detection", url: "https://www.geeksforgeeks.org/error-detection-in-computer-networks/" },
      { label: "MAC Protocols", url: "https://www.geeksforgeeks.org/multiple-access-protocols-in-computer-network/" },
      { label: "Ethernet", url: "https://www.geeksforgeeks.org/what-is-ethernet/" },
    ],
  },
  {
    id: "03",
    title: "Network Layer",
    emoji: "🗺️",
    desc: "IP addressing, IPv4 vs IPv6, subnetting, CIDR, routing algorithms and ARP/ICMP.",
    tags: ["IP Addressing", "IPv4/IPv6", "Subnetting", "CIDR", "Routing"],
    accent: "#7DD3FC",
    glow: "rgba(125,211,252,0.13)",
    iconBg: "rgba(125,211,252,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/network-layer-introduction-ipv4/",
    links: [
      { label: "Network Layer", url: "https://www.geeksforgeeks.org/network-layer-introduction-ipv4/" },
      { label: "IP Addressing", url: "https://www.geeksforgeeks.org/what-is-an-ip-address/" },
      { label: "Subnetting", url: "https://www.geeksforgeeks.org/introduction-to-subnetting/" },
      { label: "Routing Algorithms", url: "https://www.geeksforgeeks.org/classification-of-routing-algorithms/" },
    ],
  },
  {
    id: "04",
    title: "Transport Layer",
    emoji: "🚚",
    desc: "TCP vs UDP, 3-way handshake, flow control, congestion control, ports and sockets.",
    tags: ["TCP", "UDP", "3-Way Handshake", "Flow Control", "Congestion"],
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.12)",
    iconBg: "rgba(56,189,248,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/transport-layer-responsibilities/",
    links: [
      { label: "Transport Layer", url: "https://www.geeksforgeeks.org/transport-layer-responsibilities/" },
      { label: "TCP vs UDP", url: "https://www.geeksforgeeks.org/differences-between-tcp-and-udp/" },
      { label: "TCP 3-Way Handshake", url: "https://www.geeksforgeeks.org/tcp-3-way-handshake-process/" },
      { label: "Congestion Control", url: "https://www.geeksforgeeks.org/congestion-control-in-computer-networks/" },
    ],
  },
  {
    id: "05",
    title: "Application Layer",
    emoji: "💻",
    desc: "HTTP, HTTPS, DNS, DHCP, FTP, SMTP, and application layer protocols explained.",
    tags: ["HTTP/HTTPS", "DNS", "DHCP", "FTP", "SMTP"],
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,0.13)",
    iconBg: "rgba(14,165,233,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/application-layer-in-osi-model/",
    links: [
      { label: "Application Layer", url: "https://www.geeksforgeeks.org/application-layer-in-osi-model/" },
      { label: "HTTP & HTTPS", url: "https://www.geeksforgeeks.org/difference-between-http-and-https/" },
      { label: "DNS in Detail", url: "https://www.geeksforgeeks.org/domain-name-system-dns-in-application-layer/" },
      { label: "DHCP Protocol", url: "https://www.geeksforgeeks.org/dynamic-host-configuration-protocol-dhcp/" },
    ],
  },
  {
    id: "06",
    title: "Network Security",
    emoji: "🔐",
    desc: "Firewalls, VPN, SSL/TLS, cryptography basics, attacks and network security protocols.",
    tags: ["Firewalls", "VPN", "SSL/TLS", "Cryptography", "Attacks"],
    accent: "#7DD3FC",
    glow: "rgba(125,211,252,0.13)",
    iconBg: "rgba(125,211,252,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/network-security/",
    links: [
      { label: "Network Security", url: "https://www.geeksforgeeks.org/network-security/" },
      { label: "SSL vs TLS", url: "https://www.geeksforgeeks.org/difference-between-secure-socket-layer-ssl-and-transport-layer-security-tls/" },
      { label: "Firewalls", url: "https://www.geeksforgeeks.org/introduction-of-firewall-in-computer-network/" },
      { label: "VPN", url: "https://www.geeksforgeeks.org/virtual-private-network-vpn/" },
    ],
  },
  {
    id: "07",
    title: "Routing Protocols",
    emoji: "🔀",
    desc: "RIP, OSPF, BGP, distance vector vs link state routing, NAT and IPv6 migration.",
    tags: ["RIP", "OSPF", "BGP", "Distance Vector", "Link State"],
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.13)",
    iconBg: "rgba(56,189,248,0.11)",
    primaryLink: "https://www.geeksforgeeks.org/routing-protocols/",
    links: [
      { label: "Routing Protocols", url: "https://www.geeksforgeeks.org/routing-protocols/" },
      { label: "OSPF Protocol", url: "https://www.geeksforgeeks.org/open-shortest-path-first-ospf-protocol/" },
      { label: "BGP Protocol", url: "https://www.geeksforgeeks.org/border-gateway-protocol-bgp/" },
      { label: "NAT", url: "https://www.geeksforgeeks.org/network-address-translation-nat/" },
    ],
  },
  {
    id: "08",
    title: "Interview & GATE",
    emoji: "🎯",
    desc: "CN interview questions, last-minute notes, GATE PYQs, quizzes and practice problems.",
    tags: ["Interview Qs", "Last Minute", "GATE PYQs", "Quizzes", "Practice"],
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,0.12)",
    iconBg: "rgba(14,165,233,0.09)",
    primaryLink: "https://www.geeksforgeeks.org/computer-network-interview-questions/",
    links: [
      { label: "CN Interview Questions", url: "https://www.geeksforgeeks.org/computer-network-interview-questions/" },
      { label: "Last Minute Notes CN", url: "https://www.geeksforgeeks.org/last-minute-notes-computer-networks/" },
      { label: "CN Quiz", url: "https://www.geeksforgeeks.org/quiz-corner-gq/" },
      { label: "GATE CN Questions", url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/" },
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

export default function CNPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .cn-root { background:rgba(2,8,14,0.75);color:#f0f9ff;font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden;position:relative; }
        .bg-grid { position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(56,189,248,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px);background-size:56px 56px; }
        .bg-orb { position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(130px); }
        .orb-a { width:700px;height:700px;background:rgba(56,189,248,0.10);top:-220px;right:-180px;animation:drift 18s ease-in-out infinite alternate; }
        .orb-b { width:500px;height:500px;background:rgba(14,165,233,0.07);bottom:-100px;left:-120px;animation:drift 22s ease-in-out infinite alternate-reverse; }
        .orb-c { width:380px;height:380px;background:rgba(125,211,252,0.06);top:42%;left:38%;animation:drift 15s ease-in-out infinite alternate; }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(28px,-28px)} }
        .cn-page { position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:64px 28px 100px; }
        .header-chip { display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(56,189,248,0.28);background:rgba(56,189,248,0.07);border-radius:100px;padding:7px 18px;margin-bottom:44px;animation:fadeUp 0.55s ease both; }
        .chip-dot { width:8px;height:8px;border-radius:50%;background:#38BDF8;box-shadow:0 0 10px #38BDF8;flex-shrink:0;animation:blink 2.5s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .chip-label { font-family:'Fira Code',monospace;font-size:11px;color:#38BDF8;letter-spacing:0.1em; }
        .hero { margin-bottom:64px; }
        .hero-eyebrow { font-family:'Fira Code',monospace;font-size:12px;color:#0EA5E9;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:18px;animation:fadeUp 0.55s 0.08s ease both; }
        .hero-title { font-family:'Instrument Serif',serif;font-size:clamp(54px,8vw,100px);font-weight:400;line-height:0.95;letter-spacing:-0.02em;margin-bottom:8px;animation:fadeUp 0.55s 0.14s ease both; }
        .hero-title-outline { font-style:italic;color:transparent;-webkit-text-stroke:1.5px rgba(56,189,248,0.5);display:block; }
        .hero-title-grad { font-style:italic;display:block;background:linear-gradient(120deg,#38BDF8 0%,#0EA5E9 50%,#7DD3FC 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-body { font-size:16px;color:#5a7a8a;max-width:520px;line-height:1.82;margin:28px 0 36px;font-weight:400;animation:fadeUp 0.55s 0.19s ease both; }
        .hero-ctas { display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.55s 0.23s ease both; }
        .btn-fill { display:inline-flex;align-items:center;gap:9px;background:#0369a1;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s;border:1px solid transparent; }
        .btn-fill:hover { background:#0ea5e9;transform:translateY(-2px);box-shadow:0 12px 32px rgba(14,165,233,0.28); }
        .btn-outline { display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(56,189,248,0.2);background:rgba(56,189,248,0.04);color:#7DD3FC;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:500;border-radius:12px;padding:13px 26px;text-decoration:none;transition:all 0.2s; }
        .btn-outline:hover { color:#f0f9ff;border-color:rgba(56,189,248,0.45);background:rgba(56,189,248,0.08); }
        .metrics-bar { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(56,189,248,0.08);border-radius:16px;background:rgba(2,8,14,0.6);overflow:hidden;margin-bottom:72px;animation:fadeUp 0.55s 0.28s ease both; }
        .metric { padding:22px 26px;border-right:1px solid rgba(56,189,248,0.08); }
        .metric:last-child { border-right:none; }
        .metric-num { font-family:'Instrument Serif',serif;font-size:38px;color:#f0f9ff;line-height:1;margin-bottom:6px; }
        .metric-label { font-family:'Fira Code',monospace;font-size:10.5px;color:#0c4a6e;letter-spacing:0.08em;text-transform:uppercase; }
        .sec-divider { display:flex;align-items:center;gap:16px;margin-bottom:36px;animation:fadeUp 0.5s 0.33s ease both; }
        .sec-label { font-family:'Fira Code',monospace;font-size:10px;color:#0c4a6e;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap; }
        .sec-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(56,189,248,0.15),transparent); }
        .card-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:1px;background:rgba(56,189,248,0.07);border-radius:20px;overflow:hidden; }
        .mod-card { background:rgba(1,6,12,0.85);padding:32px 28px;position:relative;overflow:hidden;transition:background 0.25s;display:flex;flex-direction:column;animation:fadeUp 0.5s ease both; }
        .mod-card::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 85% 15%,var(--card-glow,transparent),transparent 60%);opacity:0;transition:opacity 0.35s;pointer-events:none; }
        .mod-card:hover { background:rgba(2,10,20,0.9); }
        .mod-card:hover::after { opacity:1; }
        .mod-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px; }
        .mod-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(56,189,248,0.10); }
        .mod-id { font-family:'Fira Code',monospace;font-size:11px;color:#0c4a6e;border:1px solid rgba(56,189,248,0.08);border-radius:6px;padding:4px 9px; }
        .mod-title { font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:20px;margin-bottom:10px;color:#f0f9ff;letter-spacing:-0.01em; }
        .mod-desc { font-size:13.5px;color:#5a7a8a;line-height:1.75;margin-bottom:20px; }
        .mod-tags { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px; }
        .mod-tag { font-family:'Fira Code',monospace;font-size:10.5px;border:1px solid rgba(56,189,248,0.08);border-radius:6px;padding:4px 10px;color:#0c4a6e;transition:all 0.2s; }
        .mod-card:hover .mod-tag { border-color:rgba(56,189,248,0.16);color:#1e7aa8; }
        .mod-links { display:flex;flex-direction:column;gap:7px;margin-bottom:24px;flex:1; }
        .mod-link { display:flex;align-items:center;gap:8px;font-size:12.5px;color:#5a7a8a;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(56,189,248,0.06);background:rgba(56,189,248,0.02);transition:all 0.18s; }
        .mod-link:hover { color:#f0f9ff;border-color:rgba(56,189,248,0.18);background:rgba(56,189,248,0.06); }
        .mod-link-dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
        .mod-link-arr { margin-left:auto;font-size:11px;opacity:0.4; }
        .mod-link:hover .mod-link-arr { opacity:0.9; }
        .mod-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--card-accent,#38BDF8);text-decoration:none;transition:gap 0.2s;margin-top:auto; }
        .mod-cta:hover { gap:10px; }
        .mod-arrow { font-size:17px;display:inline-block;transition:transform 0.2s; }
        .mod-cta:hover .mod-arrow { transform:translateX(3px); }
        .bottom-cta { margin-top:72px;background:rgba(1,6,12,0.85);border:1px solid rgba(56,189,248,0.08);border-radius:22px;padding:60px 56px;position:relative;overflow:hidden;animation:fadeUp 0.5s 0.48s ease both; }
        .bottom-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 90% 50%,rgba(56,189,248,0.07),transparent 60%);pointer-events:none; }
        .bottom-decor { position:absolute;right:48px;top:50%;transform:translateY(-50%);font-family:'Instrument Serif',serif;font-size:160px;color:rgba(56,189,248,0.03);font-style:italic;letter-spacing:-0.05em;user-select:none;pointer-events:none;line-height:1; }
        .bottom-title { font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);font-weight:400;font-style:italic;margin-bottom:16px;line-height:1.1;position:relative; }
        .bottom-body { font-size:15px;color:#5a7a8a;max-width:580px;line-height:1.88;margin-bottom:36px;position:relative; }
        .bottom-ctas { display:flex;gap:14px;flex-wrap:wrap;position:relative; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:640px) {
          .metrics-bar { grid-template-columns:1fr 1fr; }
          .metric { border-right:none;border-bottom:1px solid rgba(56,189,248,0.08); }
          .metric:nth-child(1),.metric:nth-child(2) { border-right:1px solid rgba(56,189,248,0.08); }
          .metric:last-child,.metric:nth-last-child(2) { border-bottom:none; }
          .card-grid { grid-template-columns:1fr; }
          .bottom-cta { padding:36px 24px; }
          .bottom-decor { display:none; }
        }
      `}</style>
      <div className="cn-root">
        <div className="bg-grid" aria-hidden />
        <div className="bg-orb orb-a" aria-hidden />
        <div className="bg-orb orb-b" aria-hidden />
        <div className="bg-orb orb-c" aria-hidden />
        <div className="cn-page">
          <div className="header-chip">
            <span className="chip-dot" />
            <span className="chip-label">// CS Core · Computer Networks</span>
          </div>
          <section className="hero">
            <div className="hero-eyebrow">Networking Roadmap</div>
            <h1 className="hero-title">
              <span className="hero-title-outline">Master</span>
              <span className="hero-title-grad">Computer</span>
              Networks
            </h1>
            <p className="hero-body">
              A complete CN guide — from OSI layers to TCP/IP, routing protocols and network security.
              Built for SWE interviews, GATE, and deep networking expertise.
            </p>
            <div className="hero-ctas">
              <a href="https://www.geeksforgeeks.org/computer-network-tutorials/" target="_blank" rel="noopener noreferrer" className="btn-fill">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Start Learning
              </a>
              <a href="https://www.geeksforgeeks.org/last-minute-notes-computer-networks/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Quick Revision Notes →
              </a>
            </div>
          </section>
          <div className="metrics-bar">
            {[
              { num: "08", label: "Core Modules" },
              { num: "40+", label: "Key Topics" },
              { num: "100%", label: "Interview Coverage" },
              { num: "7", label: "OSI Layers" },
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
            <div className="bottom-decor">CN</div>
            <h2 className="bottom-title">Why networks underpin<br />everything you build</h2>
            <p className="bottom-body">
              Every application you write runs over a network. Understanding TCP handshakes,
              DNS resolution, HTTP headers, and routing protocols turns you from a developer
              who guesses at latency into one who engineers for it.
            </p>
            <div className="bottom-ctas">
              <a href="https://www.geeksforgeeks.org/computer-network-tutorials/" target="_blank" rel="noopener noreferrer" className="btn-fill">View Full Tutorial</a>
              <a href="https://www.geeksforgeeks.org/computer-network-interview-questions/" target="_blank" rel="noopener noreferrer" className="btn-outline">Interview Questions →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}