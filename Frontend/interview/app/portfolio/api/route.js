// PLACE THIS FILE AT: app/resume/api/route.js
// Handles POST /resume/api

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const {
      template,
      basics,
      education,
      skills,
      internships,
      projects,
      achievements,
      certifications,
    } = body;

    // ─── Template style tokens ───────────────────────────────────────────────
    const templateStyles = {
      classic: `
        FONT FAMILY: 'Times New Roman', Georgia, serif for entire document.
        NAME SIZE: 28px, bold.
        SECTION HEADING SIZE: 13px, bold, ALL-CAPS, with a 1.5px solid #000 bottom-border spanning full width, margin-bottom 6px.
        ROLE/COMPANY SIZE: 12px, font-weight 600.
        BODY/BULLET TEXT SIZE: 11px, font-weight 400, color #1a1a1a.
        DATE TEXT: 11px, normal weight, float right or flex justify-end.
        BACKGROUND: #ffffff. ACCENT: none — pure black/gray only.
        SPACING: Section gap 14px, bullet line-height 1.45.
      `,
      modern: `
        LAYOUT: Two-column — left sidebar 28% dark navy (#0f172a), right 72% white.
        FONT FAMILY: 'DM Sans', sans-serif (load from Google Fonts).
        NAME SIZE: 26px, bold, white on sidebar.
        SECTION HEADING SIZE: 11px, bold, letter-spacing 1.5px, ALL-CAPS, with a 1px solid bottom border.
        ROLE/COMPANY SIZE: 12px, font-weight 600.
        BODY TEXT SIZE: 11px, color #374151.
        ACCENT: #6366f1 for sidebar headings and links.
        DATE: 10.5px, italic, right-aligned.
        SPACING: Section gap 14px, bullet line-height 1.45.
      `,
      elegant: `
        FONT FAMILY: 'Cormorant Garamond', serif for headings; 'Lato', sans-serif for body (load from Google Fonts).
        NAME SIZE: 30px, bold, centered, letter-spacing 3px.
        SECTION HEADING SIZE: 12px, bold, centered, ALL-CAPS, letter-spacing 2px, with thin gold (#8b6914) bottom-border.
        ROLE/COMPANY SIZE: 12px, font-weight 600.
        BODY TEXT SIZE: 11px, color #2c2417.
        BACKGROUND: #faf8f5. DATE: 11px, italic, right.
        SPACING: Section gap 16px, line-height 1.5.
      `,
      compact: `
        FONT FAMILY: 'Roboto', sans-serif (load from Google Fonts).
        NAME SIZE: 24px, bold.
        SECTION HEADING SIZE: 11px, bold, ALL-CAPS, color #0f4c81, border-bottom 1.5px solid #0f4c81, margin-bottom 5px.
        ROLE/COMPANY SIZE: 11.5px, font-weight 600.
        BODY TEXT SIZE: 10.5px, color #1e293b.
        DATE: 10.5px, right-aligned.
        BACKGROUND: #f8fafc.
        SPACING: Section gap 12px, line-height 1.4, very tight padding.
      `,
      creative: `
        LAYOUT: Two-column — left accent panel 32% deep purple (#1a0533), right white.
        FONT FAMILY: 'Raleway', sans-serif for headings; 'Nunito', sans-serif for body (load from Google Fonts).
        NAME SIZE: 26px, bold, white on left panel.
        SECTION HEADING SIZE: 11px, bold, ALL-CAPS, letter-spacing 1.5px, purple accent (#c084fc) on left, #1a0533 on right.
        ROLE/COMPANY SIZE: 12px, font-weight 600.
        BODY TEXT SIZE: 11px.
        DATE: 11px, italic, right.
        SPACING: Section gap 14px, line-height 1.45.
      `,
      minimal: `
        FONT FAMILY: 'Inter', system-ui, sans-serif (load from Google Fonts).
        NAME SIZE: 26px, font-weight 500, letter-spacing -0.5px.
        SECTION HEADING SIZE: 10px, font-weight 600, ALL-CAPS, letter-spacing 2px, color #9ca3af, border-bottom 1px solid #e5e7eb.
        ROLE/COMPANY SIZE: 12px, font-weight 500.
        BODY TEXT SIZE: 11px, color #374151.
        DATE: 11px, color #9ca3af, right.
        BACKGROUND: #ffffff. NO colored accents.
        SPACING: Section gap 16px, line-height 1.5.
      `,
    };

    // ─── Format resume data as structured text for the prompt ─────────────────
    const educationText =
      education?.length
        ? education
            .map(
              (e, i) =>
                `  ${i + 1}. ${e.degree}${e.field ? ` in ${e.field}` : ""} — ${e.institution}${e.year ? ` (${e.year})` : ""}${e.cgpa ? `, CGPA: ${e.cgpa}` : ""}`
            )
            .join("\n")
        : "Not provided";

    const skillsText =
      skills?.length ? skills.join(", ") : "None listed";

    const experienceText =
      internships?.length
        ? internships
            .map(
              (int, i) =>
                `  ${i + 1}. ${int.role} at ${int.company}${int.duration ? ` (${int.duration})` : ""}\n     ${int.description || ""}`
            )
            .join("\n\n")
        : "None";

    const projectsText =
      projects?.length
        ? projects
            .map(
              (p, i) =>
                `  ${i + 1}. ${p.name}${p.tech ? ` | Tech: ${p.tech}` : ""}${p.link ? ` | Link: ${p.link}` : ""}\n     ${p.description || ""}`
            )
            .join("\n\n")
        : "None";

    const achievementsText =
      achievements?.length
        ? achievements.map((a, i) => `  ${i + 1}. ${a}`).join("\n")
        : "None";

    const certificationsText =
      certifications?.length
        ? certifications
            .map(
              (c, i) =>
                `  ${i + 1}. ${c.name}${c.issuer ? ` — ${c.issuer}` : ""}${c.year ? ` (${c.year})` : ""}`
            )
            .join("\n")
        : "None";

    // ─── Master prompt ────────────────────────────────────────────────────────
    const prompt = `You are an expert resume typesetter. Generate a COMPLETE, PRINT-READY, single-file HTML resume that looks exactly like a high-quality LaTeX-compiled PDF resume.

═══════════════════════════════════════════
TEMPLATE: ${template}
${templateStyles[template] || templateStyles.classic}
═══════════════════════════════════════════

━━━ TYPOGRAPHIC HIERARCHY (NON-NEGOTIABLE) ━━━
Follow this exact size scale — no exceptions:

  1. CANDIDATE NAME         → 26–30px, font-weight 700, color #111
  2. CONTACT LINE           → 11px, font-weight 400, color #444, single line below name
  3. SECTION HEADINGS       → 12–13px, font-weight 700, ALL-CAPS or small-caps,
                              full-width bottom border (1.5px solid), margin-bottom 5px
  4. ENTRY TITLE / ROLE     → 12px, font-weight 600, color #111
  5. INSTITUTION / COMPANY  → 12px, font-weight 400, color #111 (same line as title via flex)
  6. DATE / DURATION        → 11px, font-weight 400, color #555, RIGHT-aligned on the same row
  7. SUBTITLE (degree/field)→ 11px, font-weight 400, italic, color #444
  8. BULLET POINTS          → 11px, font-weight 400, color #222, line-height 1.45
  9. SKILLS LABEL           → 11px, font-weight 700, color #111 (e.g. "Languages:")
     SKILLS VALUE           → 11px, font-weight 400, color #333

━━━ SKILLS SECTION — STRICT FORMAT ━━━
Render skills EXACTLY like this (no pills, no badges, no backgrounds):

  Languages:    Java, Python, C
  Core CS:      Operating Systems, OOP, DBMS, Computer Networks
  Backend:      Node.js, Express.js, REST APIs, JWT Authentication
  Frontend:     React.js, Next.js, HTML, CSS, Tailwind CSS
  Databases:    MySQL, MongoDB, PostgreSQL
  Tools:        Git, GitHub, Docker

Each row is a single <div> with:
  - Bold label + colon on the left (min-width ~110px)
  - Plain comma-separated value text on the right
  - No background color, no border, no bullet

━━━ LAYOUT RULES ━━━
• Every entry header row must use display:flex + justify-content:space-between
  so the title is on the LEFT and the date is on the RIGHT — same line.
• Section container: margin-bottom 14px
• Bullet <ul>: margin 3px 0 0 16px; padding 0
• Bullet <li>: margin-bottom 2px
• Page: centered, max-width 794px, background white, padding 36px 44px
• @page { size: A4 portrait; margin: 14mm 16mm; }
• @media print: remove shadow, remove page background

━━━ PROJECT ENTRIES ━━━
For each project, render like:
  [Project Name — bold]          [Live / link — italic, right]
    • bullet 1
    • bullet 2

If a link exists, wrap the right-side text in an <a> tag.

━━━ ABSOLUTE PROHIBITIONS ━━━
✗ No pill badges or rounded tags
✗ No colored card boxes or backgrounds on any section
✗ No excessive bold inside bullet points
✗ No icon libraries (unicode only if needed)
✗ No gradients anywhere
✗ No font-size below 10.5px or above 30px (except the name)
✗ Do NOT use <table> for layout
✗ Do NOT add any footer or watermark

━━━ CANDIDATE DATA ━━━
Name:               ${basics.name}
Target Role:        ${basics.role || ""}
Email:              ${basics.email || ""}
Phone:              ${basics.phone || ""}
Location:           ${basics.location || ""}
GitHub:             ${basics.github || ""}
LinkedIn:           ${basics.linkedin || ""}
Summary:            ${basics.summary || ""}

EDUCATION:
${educationText}

SKILLS (raw — group intelligently into the categories above):
${skillsText}

WORK EXPERIENCE / INTERNSHIPS:
${experienceText}

PROJECTS:
${projectsText}

ACHIEVEMENTS / AWARDS:
${achievementsText}

CERTIFICATIONS:
${certificationsText}

━━━ OUTPUT RULES ━━━
1. Start IMMEDIATELY with <!DOCTYPE html> — no preamble, no markdown fences.
2. All CSS must be inline inside a single <style> tag in <head>.
3. Load fonts from Google Fonts if specified in the template.
4. Skip any section that has no data.
5. Use semantic HTML: <header>, <section>, <ul>, <li>, <a>.
6. Ensure all links are clickable (<a href="...">).
7. The rendered page must look indistinguishable from a professional LaTeX PDF resume.

START NOW WITH <!DOCTYPE html>`;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error: GROQ_API_KEY missing" },
        { status: 500 }
      );
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 8000,
          temperature: 0.3,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);
      return NextResponse.json(
        { error: `Groq API error ${groqRes.status}` },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    let html = data?.choices?.[0]?.message?.content || "";

    if (!html) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    // Strip any markdown fences the model may have added
    html = html
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    if (
      !html.toLowerCase().startsWith("<!doctype") &&
      !html.toLowerCase().startsWith("<html")
    ) {
      console.error("Non-HTML response:", html.slice(0, 300));
      return NextResponse.json(
        { error: "AI returned unexpected content." },
        { status: 500 }
      );
    }

    return NextResponse.json({ html });
  } catch (err) {
    console.error("Resume generation error:", err);
    return NextResponse.json(
      { error: err.message || "Generation failed" },
      { status: 500 }
    );
  }
}