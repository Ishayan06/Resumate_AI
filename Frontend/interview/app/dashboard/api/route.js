import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile";

export async function POST(req) {
  try {
    const body = await req.json();
    const { skills } = body;

    // FIX: also validate that skills array is not empty
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills array is required and must not be empty" },
        { status: 400 }
      );
    }

const prompt = `
You are a senior ATS evaluator used by FAANG recruiters.

Your job is to evaluate resumes realistically with VARIED scoring distribution.

Analyze the following resume skills:

${skills.join(", ")}

IMPORTANT SCORING BEHAVIOR:
- Do NOT give similar scores to different resumes
- Use full range from 0 to 100
- At least 10% resumes should score above 85
- At least 20% should be below 60 if weak
- Be discriminative

SCORING FACTORS:

1. Technical Depth (0–30)
- shallow skills → low
- advanced stack (system design, backend, devops) → high

2. Practical Experience (0–25)
- only skills listed → low
- projects with real usage → high

3. Skill Relevance (0–20)
- outdated/irrelevant skills → low
- modern stack (React, Node, cloud) → high

4. Impact Evidence (0–15)
- no metrics → low
- measurable results → high

5. Breadth vs Focus (0–10)
- random unrelated skills → low
- consistent stack → high

FINAL RULES:
- Score must reflect ALL 5 factors
- Avoid clustering around a single value
- Be strict but realistic

Return ONLY JSON:

{
  "score": 0,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."]
}

Rules:
- Only JSON
- No markdown
- No explanation
- At least 2 items per array
`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Groq API failed" },
        { status: 500 }
      );
    }

    const content = data?.choices?.[0]?.message?.content || "";

    // Remove markdown fences if AI adds them
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON PARSE ERROR:", err);
      return NextResponse.json(
        { error: "Invalid AI response", raw: content },
        { status: 500 }
      );
    }

    // FIX: Validate parsed shape before returning
    if (
      typeof parsed.score !== "number" ||
      !Array.isArray(parsed.strengths) ||
      !Array.isArray(parsed.weaknesses) ||
      !Array.isArray(parsed.suggestions)
    ) {
      return NextResponse.json(
        { error: "AI returned unexpected structure", raw: parsed },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("ATS ERROR:", error);
    return NextResponse.json(
      { error: "ATS analysis failed" },
      { status: 500 }
    );
  }
}