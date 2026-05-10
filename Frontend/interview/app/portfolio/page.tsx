"use client";

import html2pdf from "html2pdf.js";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "@/lib/auth";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --accent:  #7c6dfa;
    --accent2: #a78bfa;
    --accent3: #34d399;
    --text:    #f0eeff;
    --muted:   #7e7a9a;
    --danger:  #f87171;
    --card-bg:     rgba(124,109,250,0.10);
    --card-border: rgba(124,109,250,0.20);
  }

  .pf-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .pf-wrap {
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    color: var(--text);
    min-height: 100vh;
    padding: 40px 32px 80px;
  }
  .pf-inner { max-width: 860px; margin: 0 auto; }

  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; border: 1px solid rgba(255,255,255,0.12);
    color: var(--muted); padding: 9px 16px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
    transition: all 0.2s; margin-bottom: 32px;
  }
  .back-btn:hover { border-color: var(--accent); color: var(--accent2); }

  .pf-header { margin-bottom: 36px; }
  .pf-eyebrow {
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent2);
    margin-bottom: 10px; display: flex; align-items: center; gap: 8px;
  }
  .pf-eyebrow span { display: inline-block; width: 20px; height: 1px; background: var(--accent2); }
  .pf-title { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; }
  .pf-title em { font-style: normal; color: var(--accent2); }
  .pf-sub { font-size: 14px; color: var(--muted); font-weight: 300; }

  /* Progress bar */
  .progress-bar-wrap {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 56px; position: relative;
  }
  .progress-bar-wrap::before {
    content: ''; position: absolute; top: 18px; left: 18px; right: 18px;
    height: 1px; background: rgba(255,255,255,0.07); z-index: 0;
  }
  .progress-fill {
    position: absolute; top: 18px; left: 18px; height: 1px;
    background: var(--accent); z-index: 1; transition: width 0.4s ease;
  }
  .step-dot {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    background: #0a0a0f;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
    color: var(--muted); z-index: 2; flex-shrink: 0;
    transition: all 0.3s ease; cursor: default; position: relative;
  }
  .step-dot.active { border-color: var(--accent); color: var(--accent2); background: rgba(124,109,250,0.15); box-shadow: 0 0 0 4px rgba(124,109,250,0.1); }
  .step-dot.done { border-color: var(--accent3); background: rgba(52,211,153,0.12); color: var(--accent3); }
  .step-connector { flex: 1; }
  .step-label {
    position: absolute; top: 42px; left: 50%; transform: translateX(-50%);
    font-size: 10px; font-weight: 500; white-space: nowrap; color: var(--muted);
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .step-dot.active .step-label { color: var(--accent2); }
  .step-dot.done .step-label { color: var(--accent3); }

  /* Card */
  .pf-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px; padding: 32px;
    position: relative; overflow: hidden;
    animation: fadeUp 0.4s ease both;
  }
  .pf-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,109,250,0.4), transparent);
  }

  .card-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 4px; }
  .card-sub { font-size: 13px; color: var(--muted); font-weight: 300; margin-bottom: 28px; }

  /* Template picker */
  .template-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 640px) { .template-grid { grid-template-columns: 1fr 1fr; } }
  .template-card {
    border: 2px solid rgba(255,255,255,0.08); border-radius: 14px;
    padding: 0; cursor: pointer; text-align: center;
    transition: all 0.2s; background: rgba(0,0,0,0.2);
    overflow: hidden;
  }
  .template-card:hover { border-color: rgba(124,109,250,0.4); transform: translateY(-2px); }
  .template-card.selected { border-color: var(--accent); background: rgba(124,109,250,0.08); }
  .template-thumb {
    width: 100%; height: 110px; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-start;
    padding: 10px; gap: 4px; position: relative; overflow: hidden;
  }
  .thumb-line { border-radius: 2px; }
  .template-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); padding: 8px 10px; display: block; border-top: 1px solid rgba(255,255,255,0.06); }
  .template-card.selected .template-label { color: var(--accent2); }
  .template-badge {
    position: absolute; top: 6px; right: 6px;
    background: var(--accent); color: #fff; font-size: 9px; font-weight: 700;
    padding: 2px 6px; border-radius: 4px; letter-spacing: 0.08em; text-transform: uppercase;
  }

  /* Form */
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-row.single { grid-template-columns: 1fr; }
  .form-row.triple { grid-template-columns: 1fr 1fr 1fr; }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .form-input, .form-textarea {
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px; padding: 11px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text);
    outline: none; resize: none; transition: border-color 0.2s;
  }
  .form-input:focus, .form-textarea:focus { border-color: rgba(124,109,250,0.5); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }

  /* Skill tags */
  .skill-input-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .skill-input-row .form-input { flex: 1; margin: 0; }
  .add-btn {
    background: rgba(124,109,250,0.15); border: 1px solid rgba(124,109,250,0.3);
    color: var(--accent2); border-radius: 12px; padding: 11px 18px;
    font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
    white-space: nowrap;
  }
  .add-btn:hover { background: rgba(124,109,250,0.25); }
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; min-height: 20px; }
  .skill-tag {
    display: flex; align-items: center; gap: 6px;
    background: rgba(124,109,250,0.13); border: 1px solid rgba(124,109,250,0.25);
    color: var(--accent2); padding: 5px 12px; border-radius: 99px; font-size: 12px;
    animation: fadeUp 0.2s ease both;
  }
  .tag-remove { cursor: pointer; opacity: 0.5; font-size: 14px; line-height: 1; transition: opacity 0.15s; }
  .tag-remove:hover { opacity: 1; }

  /* Yes/No toggle */
  .yn-toggle { display: flex; gap: 10px; margin-bottom: 20px; }
  .yn-btn {
    flex: 1; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.2); color: var(--muted);
  }
  .yn-btn.yes.active { background: rgba(52,211,153,0.12); border-color: rgba(52,211,153,0.35); color: var(--accent3); }
  .yn-btn.no.active { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.25); color: var(--danger); }

  /* Dynamic entries */
  .entry-card {
    background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px; padding: 18px; margin-bottom: 12px;
    animation: fadeUp 0.3s ease both;
  }
  .entry-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .entry-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: var(--accent2); }
  .remove-entry {
    background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2);
    color: var(--danger); border-radius: 8px; padding: 5px 10px;
    font-size: 11px; cursor: pointer; transition: all 0.2s;
  }
  .remove-entry:hover { background: rgba(248,113,113,0.2); }
  .add-entry-btn {
    width: 100%; padding: 12px; border-radius: 12px;
    border: 1.5px dashed rgba(124,109,250,0.3); background: transparent;
    color: var(--muted); font-size: 13px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .add-entry-btn:hover { border-color: var(--accent); color: var(--accent2); background: rgba(124,109,250,0.05); }

  /* Nav buttons */
  .nav-row { display: flex; gap: 12px; margin-top: 28px; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--accent); color: #fff; border: none;
    padding: 14px 28px; border-radius: 14px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 32px rgba(124,109,250,0.35);
  }
  .btn-primary:hover:not(:disabled) { background: #8b7dfb; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; border: 1px solid rgba(255,255,255,0.14);
    color: var(--text); padding: 14px 24px; border-radius: 14px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent2); background: rgba(124,109,250,0.08); }

  /* Generating */
  .generating-wrap { text-align: center; padding: 60px 20px; }
  .gen-ring {
    width: 64px; height: 64px; border-radius: 50%;
    border: 3px solid rgba(124,109,250,0.15);
    border-top-color: var(--accent);
    animation: spin 0.9s linear infinite;
    margin: 0 auto 24px;
  }
  .gen-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .gen-sub { font-size: 13px; color: var(--muted); font-weight: 300; }
  .gen-dots span {
    display: inline-block; width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); margin: 0 3px;
    animation: bounce 1.2s ease infinite;
  }
  .gen-dots span:nth-child(2) { animation-delay: 0.2s; }
  .gen-dots span:nth-child(3) { animation-delay: 0.4s; }

  /* Preview */
  .preview-actions { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
  .iframe-wrap {
    border: 1px solid var(--card-border); border-radius: 14px; overflow: hidden;
    height: 700px; background: #fff; box-shadow: 0 24px 64px rgba(0,0,0,0.4);
  }
  .iframe-wrap iframe { width: 100%; height: 100%; border: none; }

  /* Section divider */
  .section-divider {
    display: flex; align-items: center; gap: 12px; margin: 24px 0 20px;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: var(--accent2);
  }
  .section-divider::after { content: ''; flex: 1; height: 1px; background: rgba(124,109,250,0.15); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .pf-wrap ::-webkit-scrollbar { width: 4px; }
  .pf-wrap ::-webkit-scrollbar-thumb { background: rgba(124,109,250,0.3); border-radius: 4px; }

  @media (max-width: 640px) {
    .pf-wrap { padding: 24px 16px 60px; }
    .form-row { grid-template-columns: 1fr; }
    .form-row.triple { grid-template-columns: 1fr 1fr; }
    .pf-title { font-size: 28px; }
    .nav-row { flex-direction: column; }
    .btn-primary, .btn-ghost { width: 100%; justify-content: center; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */
interface Project { name: string; description: string; link: string; tech: string; }
interface Certification { name: string; issuer: string; year: string; }
interface Internship { company: string; role: string; duration: string; description: string; }
interface Education { institution: string; degree: string; field: string; year: string; cgpa: string; }

/* ─────────────────────────────────────────────────────────────────────────────
   TEMPLATES
───────────────────────────────────────────────────────────────────────────── */
const TEMPLATES = [
  {
    id: "classic",
    label: "Classic",
    badge: "Most Used",
    thumb: { bg: "#ffffff", accent: "#1a1a2e", lines: ["#1a1a2e", "#555", "#888", "#aaa"] },
  },
  {
    id: "modern",
    label: "Modern",
    badge: "Popular",
    thumb: { bg: "#0f172a", accent: "#7c6dfa", lines: ["#ffffff", "#a78bfa", "#667", "#445"] },
  },
  {
    id: "elegant",
    label: "Elegant",
    badge: null,
    thumb: { bg: "#faf8f5", accent: "#8b6914", lines: ["#2c2417", "#8b6914", "#666", "#999"] },
  },
  {
    id: "compact",
    label: "Compact",
    badge: "ATS Safe",
    thumb: { bg: "#f8fafc", accent: "#0f4c81", lines: ["#0f4c81", "#333", "#666", "#999"] },
  },
  {
    id: "creative",
    label: "Creative",
    badge: null,
    thumb: { bg: "#1a0533", accent: "#c084fc", lines: ["#ffffff", "#c084fc", "#9ca3af", "#6b7280"] },
  },
  {
    id: "minimal",
    label: "Minimal",
    badge: null,
    thumb: { bg: "#ffffff", accent: "#000000", lines: ["#000000", "#333", "#666", "#ccc"] },
  },
];

const STEPS = ["Template", "Basics", "Education", "Skills", "Experience", "Projects", "Extras", "Generate"];

/* ─────────────────────────────────────────────────────────────────────────────
   TEMPLATE THUMBNAIL RENDERER
───────────────────────────────────────────────────────────────────────────── */
function TemplateThumbnail({ t, selected }: { t: typeof TEMPLATES[0]; selected: boolean }) {
  const { bg, accent, lines } = t.thumb;
  return (
    <div className="template-thumb" style={{ background: bg }}>
      {t.badge && <span className="template-badge" style={{ background: accent }}>{t.badge}</span>}
      {/* Name bar */}
      <div className="thumb-line" style={{ width: "60%", height: 8, background: lines[0] }} />
      {/* Title */}
      <div className="thumb-line" style={{ width: "42%", height: 5, background: lines[1], marginTop: 2 }} />
      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: lines[2], marginTop: 6 }} />
      {/* Section label */}
      <div className="thumb-line" style={{ width: "28%", height: 4, background: lines[1], marginTop: 5 }} />
      {/* Content lines */}
      {[80, 65, 72, 55].map((w, i) => (
        <div key={i} className="thumb-line" style={{ width: `${w}%`, height: 3, background: lines[3], marginTop: 3 }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function ResumeCreate() {
  const router = useRouter();
  const user = getUser();

  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  // Form state
  const [template, setTemplate] = useState("classic");
  const [basics, setBasics] = useState({
    name: user?.name || "",
    role: "",
    email: user?.email || "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    summary: "",
  });

  const [education, setEducation] = useState<Education[]>([
    { institution: "", degree: "", field: "", year: "", cgpa: "" },
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const [internships, setInternships] = useState<Internship[]>([
    { company: "", role: "", duration: "", description: "" },
  ]);

  const [hasProjects, setHasProjects] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    { name: "", description: "", link: "", tech: "" },
  ]);

  const [hasAchievements, setHasAchievements] = useState<boolean | null>(null);
  const [achievements, setAchievements] = useState<string[]>([""]);

  const [hasCertifications, setHasCertifications] = useState<boolean | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: "", issuer: "", year: "" },
  ]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const id = "resume-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) router.push("/login");
  }, [router]);

  /* ── Education helpers ── */
  const updateEducation = (i: number, field: keyof Education, val: string) =>
    setEducation(education.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
  const addEducation = () => setEducation([...education, { institution: "", degree: "", field: "", year: "", cgpa: "" }]);
  const removeEducation = (i: number) => setEducation(education.filter((_, idx) => idx !== i));

  /* ── Skill helpers ── */
  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || skills.includes(s)) return;
    setSkills([...skills, s]);
    setSkillInput("");
  };
  const removeSkill = (s: string) => setSkills(skills.filter((x) => x !== s));

  /* ── Internship helpers ── */
  const updateInternship = (i: number, field: keyof Internship, val: string) =>
    setInternships(internships.map((int, idx) => idx === i ? { ...int, [field]: val } : int));
  const addInternship = () => setInternships([...internships, { company: "", role: "", duration: "", description: "" }]);
  const removeInternship = (i: number) => setInternships(internships.filter((_, idx) => idx !== i));

  /* ── Project helpers ── */
  const updateProject = (i: number, field: keyof Project, val: string) =>
    setProjects(projects.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  const addProject = () => setProjects([...projects, { name: "", description: "", link: "", tech: "" }]);
  const removeProject = (i: number) => setProjects(projects.filter((_, idx) => idx !== i));

  /* ── Achievement helpers ── */
  const updateAchievement = (i: number, val: string) =>
    setAchievements(achievements.map((a, idx) => idx === i ? val : a));
  const addAchievement = () => setAchievements([...achievements, ""]);
  const removeAchievement = (i: number) => setAchievements(achievements.filter((_, idx) => idx !== i));

  /* ── Cert helpers ── */
  const updateCert = (i: number, field: keyof Certification, val: string) =>
    setCertifications(certifications.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  const addCert = () => setCertifications([...certifications, { name: "", issuer: "", year: "" }]);
  const removeCert = (i: number) => setCertifications(certifications.filter((_, idx) => idx !== i));

  /* ── Validation ── */
  const canProceed = () => {
    if (step === 0) return !!template;
    if (step === 1) return basics.name.trim() && basics.role.trim() && basics.email.trim();
    if (step === 2) return education.some(e => e.institution.trim() && e.degree.trim());
    if (step === 3) return skills.length > 0;
    if (step === 4) return hasExperience !== null;
    if (step === 5) return hasProjects !== null;
    if (step === 6) return hasAchievements !== null && hasCertifications !== null;
    return true;
  };

  /* ── Generate ── */
  const generate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/portfolio/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template,
          basics,
          education,
          skills,
          internships: hasExperience ? internships.filter(i => i.company.trim()) : [],
          projects: hasProjects ? projects.filter(p => p.name.trim()) : [],
          achievements: hasAchievements ? achievements.filter(a => a.trim()) : [],
          certifications: hasCertifications ? certifications.filter(c => c.name.trim()) : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setGeneratedHtml(data.html);
      setStep(7);
      toast.success("Resume generated!");
    } catch (err: any) {
      toast.error(err.message || "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  /* ── Download HTML ── */
//   const downloadHTML = () => {
//     if (!generatedHtml) return;
//     const blob = new Blob([generatedHtml], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${basics.name.replace(/\s+/g, "_")}_resume.html`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success("Downloaded!");
//   };

const downloadHTML = () => {
  if (!generatedHtml) return;

  // 1. Inject a full-size hidden iframe so the browser renders
  //    the COMPLETE HTML (head + styles + fonts) — not a stripped div.
  const iframe = document.createElement("iframe");
  iframe.style.cssText = [
    "position:fixed",
    "top:0",
    "left:-9999px",       // off-screen, not display:none (html2canvas needs layout)
    "width:794px",        // A4 at 96 dpi
    "height:1123px",
    "border:none",
    "visibility:hidden",  // invisible but still laid-out
    "pointer-events:none",
    "z-index:-1",
  ].join(";");

  document.body.appendChild(iframe);

  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    return;
  }

  // 2. Write the FULL generated HTML (preserves <head>, fonts, @page, etc.)
  doc.open();
  doc.write(generatedHtml);
  doc.close();

  const cleanup = () => {
    try { document.body.removeChild(iframe); } catch { /* already removed */ }
  };

  const generate = () => {
    html2pdf()
      .set({
        margin: 0,
        filename: `${basics.name.replace(/\s+/g, "_")}_resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,           // high-DPI — crisp text
          useCORS: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 794,   // match iframe width so nothing reflows
          windowHeight: 1123,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      })
      // capture the full <html> element so nothing is cut off
      .from(doc.documentElement)
      .save()
      .then(cleanup)
      .catch(cleanup);
  };

  // 3. Give Google Fonts + images time to load before we snapshot
  iframe.addEventListener("load", () => {
    // 800 ms is enough for most Google Font @font-face files
    setTimeout(generate, 800);
  });
};
  /* ── Print / Save as PDF ── */
  const printPDF = () => {
  if (!generatedHtml) return;

  const newWindow = window.open("", "_blank");

  if (!newWindow) {
    toast.error("Popup blocked. Please allow popups.");
    return;
  }

  newWindow.document.open();
  newWindow.document.write(generatedHtml);
  newWindow.document.close();

  // Wait for content to render before printing
  newWindow.onload = () => {
    newWindow.focus();
    newWindow.print();

    // Optional: auto close after print
    newWindow.onafterprint = () => {
      newWindow.close();
    };
  };

  toast.success("Print dialog opened — choose 'Save as PDF'");
};

  /* ─────────────────────────────────────────────────────────────────────────
     STEP RENDERS
  ───────────────────────────────────────────────────────────────────────── */
  const renderStep = () => {

    /* Step 0: Template */
    if (step === 0) return (
      <div className="pf-card">
        <div className="card-title">Choose a resume template</div>
        <div className="card-sub">Select a visual style — all are ATS-friendly and print-optimised</div>
        <div className="template-grid">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className={`template-card${template === t.id ? " selected" : ""}`}
              onClick={() => setTemplate(t.id)}
            >
              <TemplateThumbnail t={t} selected={template === t.id} />
              <span className="template-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    );

    /* Step 1: Basics */
    if (step === 1) return (
      <div className="pf-card">
        <div className="card-title">Personal information</div>
        <div className="card-sub">Appears in the header of your resume</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full name *</label>
            <input className="form-input" placeholder="Aryan Sharma" value={basics.name} onChange={(e) => setBasics({ ...basics, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Job title / Role *</label>
            <input className="form-input" placeholder="Full Stack Developer" value={basics.role} onChange={(e) => setBasics({ ...basics, role: e.target.value })} />
          </div>
        </div>
        <div className="form-row triple">
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input className="form-input" placeholder="you@email.com" value={basics.email} onChange={(e) => setBasics({ ...basics, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" placeholder="+91 98765 43210" value={basics.phone} onChange={(e) => setBasics({ ...basics, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="form-input" placeholder="Mumbai, India" value={basics.location} onChange={(e) => setBasics({ ...basics, location: e.target.value })} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input className="form-input" placeholder="https://github.com/username" value={basics.github} onChange={(e) => setBasics({ ...basics, github: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input className="form-input" placeholder="https://linkedin.com/in/username" value={basics.linkedin} onChange={(e) => setBasics({ ...basics, linkedin: e.target.value })} />
          </div>
        </div>
        <div className="form-row single">
          <div className="form-group">
            <label className="form-label">Professional summary (optional)</label>
            <textarea className="form-textarea" rows={3} placeholder="Results-driven developer with X years of experience in…" value={basics.summary} onChange={(e) => setBasics({ ...basics, summary: e.target.value })} />
          </div>
        </div>
      </div>
    );

    /* Step 2: Education */
    if (step === 2) return (
      <div className="pf-card">
        <div className="card-title">Education</div>
        <div className="card-sub">Add your degrees, diplomas, or courses</div>
        {education.map((e, i) => (
          <div key={i} className="entry-card">
            <div className="entry-header">
              <span className="entry-title">Education {i + 1}</span>
              {education.length > 1 && <button className="remove-entry" onClick={() => removeEducation(i)}>Remove</button>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Institution *</label>
                <input className="form-input" placeholder="IIT Bombay" value={e.institution} onChange={(ev) => updateEducation(i, "institution", ev.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Degree *</label>
                <input className="form-input" placeholder="B.Tech / B.E. / MCA" value={e.degree} onChange={(ev) => updateEducation(i, "degree", ev.target.value)} />
              </div>
            </div>
            <div className="form-row triple">
              <div className="form-group">
                <label className="form-label">Field of study</label>
                <input className="form-input" placeholder="Computer Science" value={e.field} onChange={(ev) => updateEducation(i, "field", ev.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Graduation year</label>
                <input className="form-input" placeholder="2025" value={e.year} onChange={(ev) => updateEducation(i, "year", ev.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">CGPA / %</label>
                <input className="form-input" placeholder="8.5 / 10" value={e.cgpa} onChange={(ev) => updateEducation(i, "cgpa", ev.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button className="add-entry-btn" onClick={addEducation}>+ Add another qualification</button>
      </div>
    );

    /* Step 3: Skills */
    if (step === 3) return (
      <div className="pf-card">
        <div className="card-title">Skills & technologies</div>
        <div className="card-sub">Add languages, frameworks, tools, and soft skills</div>
        <div className="skill-input-row">
          <input
            className="form-input"
            placeholder="e.g. React, Python, Docker…"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />
          <button className="add-btn" onClick={addSkill}>+ Add</button>
        </div>
        <div className="tags-wrap">
          {skills.length === 0 && <span style={{ fontSize: 12, color: "var(--muted)" }}>No skills added yet</span>}
          {skills.map((s) => (
            <span key={s} className="skill-tag">
              {s}
              <span className="tag-remove" onClick={() => removeSkill(s)}>×</span>
            </span>
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Quick add</div>
          <div className="tags-wrap">
            {["React", "Node.js", "Python", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "AWS", "Docker", "Flutter", "Java", "C++", "Git", "Figma", "REST APIs", "Linux"].filter(s => !skills.includes(s)).map((s) => (
              <span key={s} style={{ cursor: "pointer", opacity: 0.6, fontSize: 12, padding: "4px 10px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.1)", color: "var(--muted)" }}
                onClick={() => setSkills([...skills, s])}>+ {s}</span>
            ))}
          </div>
        </div>
      </div>
    );

    /* Step 4: Experience */
    if (step === 4) return (
      <div className="pf-card">
        <div className="card-title">Work experience</div>
        <div className="card-sub">Internships, part-time roles, or freelance work</div>
        <div className="yn-toggle">
          <button className={`yn-btn yes${hasExperience === true ? " active" : ""}`} onClick={() => setHasExperience(true)}>✓ Yes, I have experience</button>
          <button className={`yn-btn no${hasExperience === false ? " active" : ""}`} onClick={() => setHasExperience(false)}>✗ No experience yet</button>
        </div>
        {hasExperience && (
          <>
            {internships.map((int, i) => (
              <div key={i} className="entry-card">
                <div className="entry-header">
                  <span className="entry-title">Experience {i + 1}</span>
                  {internships.length > 1 && <button className="remove-entry" onClick={() => removeInternship(i)}>Remove</button>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" placeholder="Google" value={int.company} onChange={(e) => updateInternship(i, "company", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role / Title</label>
                    <input className="form-input" placeholder="Software Engineer Intern" value={int.role} onChange={(e) => updateInternship(i, "role", e.target.value)} />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input className="form-input" placeholder="May 2024 – Aug 2024" value={int.duration} onChange={(e) => updateInternship(i, "duration", e.target.value)} />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Key contributions (use bullet points or sentences)</label>
                    <textarea className="form-textarea" rows={3} placeholder="• Built REST APIs serving 10k+ users&#10;• Reduced latency by 30% through query optimization&#10;• Collaborated with cross-functional teams" value={int.description} onChange={(e) => updateInternship(i, "description", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button className="add-entry-btn" onClick={addInternship}>+ Add another role</button>
          </>
        )}
      </div>
    );

    /* Step 5: Projects */
    if (step === 5) return (
      <div className="pf-card">
        <div className="card-title">Projects</div>
        <div className="card-sub">Showcase your best work — personal, academic, or open-source</div>
        <div className="yn-toggle">
          <button className={`yn-btn yes${hasProjects === true ? " active" : ""}`} onClick={() => setHasProjects(true)}>✓ Yes, I have projects</button>
          <button className={`yn-btn no${hasProjects === false ? " active" : ""}`} onClick={() => setHasProjects(false)}>✗ No projects yet</button>
        </div>
        {hasProjects && (
          <>
            {projects.map((p, i) => (
              <div key={i} className="entry-card">
                <div className="entry-header">
                  <span className="entry-title">Project {i + 1}</span>
                  {projects.length > 1 && <button className="remove-entry" onClick={() => removeProject(i)}>Remove</button>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Project name</label>
                    <input className="form-input" placeholder="My Awesome App" value={p.name} onChange={(e) => updateProject(i, "name", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tech stack</label>
                    <input className="form-input" placeholder="React, Node.js, MongoDB" value={p.tech} onChange={(e) => updateProject(i, "tech", e.target.value)} />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">GitHub / Live link (optional)</label>
                    <input className="form-input" placeholder="https://github.com/…" value={p.link} onChange={(e) => updateProject(i, "link", e.target.value)} />
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" rows={2} placeholder="What does it do? Impact, features, or key metrics." value={p.description} onChange={(e) => updateProject(i, "description", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button className="add-entry-btn" onClick={addProject}>+ Add another project</button>
          </>
        )}
      </div>
    );

    /* Step 6: Extras (Achievements + Certifications) */
    if (step === 6) return (
      <div className="pf-card">
        <div className="card-title">Achievements & certifications</div>
        <div className="card-sub">Hackathons, awards, rankings, and professional certificates</div>

        <div style={{ marginBottom: 28 }}>
          <div className="section-divider">Achievements</div>
          <div className="yn-toggle">
            <button className={`yn-btn yes${hasAchievements === true ? " active" : ""}`} onClick={() => setHasAchievements(true)}>✓ Yes</button>
            <button className={`yn-btn no${hasAchievements === false ? " active" : ""}`} onClick={() => setHasAchievements(false)}>✗ No</button>
          </div>
          {hasAchievements && (
            <>
              {achievements.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input className="form-input" style={{ flex: 1 }} placeholder="e.g. 1st place at HackIndia 2024, Top 10 at Smart India Hackathon" value={a} onChange={(e) => updateAchievement(i, e.target.value)} />
                  {achievements.length > 1 && <button className="remove-entry" onClick={() => removeAchievement(i)}>×</button>}
                </div>
              ))}
              <button className="add-entry-btn" onClick={addAchievement}>+ Add achievement</button>
            </>
          )}
        </div>

        <div>
          <div className="section-divider">Certifications</div>
          <div className="yn-toggle">
            <button className={`yn-btn yes${hasCertifications === true ? " active" : ""}`} onClick={() => setHasCertifications(true)}>✓ Yes</button>
            <button className={`yn-btn no${hasCertifications === false ? " active" : ""}`} onClick={() => setHasCertifications(false)}>✗ No</button>
          </div>
          {hasCertifications && (
            <>
              {certifications.map((c, i) => (
                <div key={i} className="entry-card">
                  <div className="entry-header">
                    <span className="entry-title">Certification {i + 1}</span>
                    {certifications.length > 1 && <button className="remove-entry" onClick={() => removeCert(i)}>Remove</button>}
                  </div>
                  <div className="form-row triple">
                    <div className="form-group" style={{ gridColumn: "span 1" }}>
                      <label className="form-label">Certificate name</label>
                      <input className="form-input" placeholder="AWS Solutions Architect" value={c.name} onChange={(e) => updateCert(i, "name", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Issuing body</label>
                      <input className="form-input" placeholder="Amazon / Coursera / NPTEL" value={c.issuer} onChange={(e) => updateCert(i, "issuer", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input className="form-input" placeholder="2024" value={c.year} onChange={(e) => updateCert(i, "year", e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="add-entry-btn" onClick={addCert}>+ Add certification</button>
            </>
          )}
        </div>
      </div>
    );

    /* Step 7: Preview */
    if (step === 7 && generatedHtml) return (
      <div className="pf-card">
        <div className="card-title">Your resume is ready 🎉</div>
        <div className="card-sub">Preview below — download as PDF directly or save the HTML file</div>
        <div className="preview-actions">
          {/* <button className="btn-primary" style={{ background: "#059669", boxShadow: "0 8px 32px rgba(5,150,105,0.3)" }} onClick={printPDF}>
            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button> */}
          <button className="btn-primary" onClick={downloadHTML}>
            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download
          </button>
          <button className="btn-ghost" style={{ width: "auto" }} onClick={() => { setStep(0); setGeneratedHtml(null); }}>
            Start over
          </button>
        </div>
        <div className="iframe-wrap">
          <iframe
            ref={iframeRef}
            srcDoc={generatedHtml}
            title="Resume Preview"
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
        </div>
      </div>
    );

    return null;
  };

  const progressWidth = step === 0 ? "0%" : `${(step / (STEPS.length - 1)) * 100}%`;

  return (
    <div className="pf-wrap">
      <div className="pf-inner">

        <button className="back-btn" onClick={() => router.push("/dashboard")}>
          ← Back to Dashboard
        </button>

        <div className="pf-header">
          <div className="pf-eyebrow"><span />Resume Builder</div>
          <h1 className="pf-title">Build your <em>resume</em>.</h1>
          <p className="pf-sub">Answer a few questions and AI crafts a professional, PDF-ready resume.</p>
        </div>

        {!generating && (
          <div className="progress-bar-wrap">
            <div className="progress-fill" style={{ width: progressWidth }} />
            {STEPS.map((label, i) => (
              <React.Fragment key={i}>
                <div className={`step-dot${step === i ? " active" : ""}${step > i ? " done" : ""}`}>
                  {step > i ? "✓" : i + 1}
                  <span className="step-label">{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="step-connector" />}
              </React.Fragment>
            ))}
          </div>
        )}

        {generating ? (
          <div className="pf-card">
            <div className="generating-wrap">
              <div className="gen-ring" />
              <div className="gen-title">Generating your resume…</div>
              <div className="gen-sub" style={{ marginBottom: 16 }}>AI is crafting your personalised, print-ready resume</div>
              <div className="gen-dots"><span /><span /><span /></div>
            </div>
          </div>
        ) : (
          renderStep()
        )}

        {!generating && step < 7 && (
          <div className="nav-row">
            {step > 0 && (
              <button className="btn-ghost" style={{ width: "auto" }} onClick={() => setStep(step - 1)}>
                ← Back
              </button>
            )}
            {step < 6 && (
              <button className="btn-primary" disabled={!canProceed()} onClick={() => setStep(step + 1)}>
                Continue →
              </button>
            )}
            {step === 6 && (
              <button className="btn-primary" disabled={!canProceed()} onClick={generate}>
                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Resume
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}