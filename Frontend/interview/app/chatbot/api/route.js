// import { NextResponse } from 'next/server';

// // Groq API — OpenAI-compatible, free tier with high rate limits
// const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
// const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
// const MODEL = 'llama-3.3-70b-versatile';

// const SYSTEM_PROMPT = `You are PrepAI — an elite, empathetic AI interview coach with deep expertise across software engineering, product management, data science, design, finance, and general behavioural interviews.

// ## YOUR MISSION
// Help users land their dream job by providing brutally honest, actionable, and encouraging coaching.

// ## WHAT YOU DO
// 1. **Mock Interviews** — Give realistic interview questions for any role/company when asked. Vary difficulty.
// 2. **Answer Feedback** — When a user shares their answer, critique it with a score (1–10), what worked, what missed, and an improved version.
// 3. **STAR Method** — Guide users to structure behavioural answers with Situation, Task, Action, Result.
// 4. **Company Prep** — Give company-specific tips (culture, values, interview style) for FAANG, startups, finance, consulting, etc.
// 5. **Tough Questions** — Coach users on "What's your greatest weakness?", salary negotiation, gaps in resume, etc.
// 6. **Coding Interviews** — Explain DSA concepts, walk through problems, review solutions.
// 7. **Resume Bullets** — Help rewrite experience bullets to be impact-driven.

// ## RESPONSE STYLE
// - Be direct, warm, and mentor-like — not robotic
// - Use clear structure: headers, bullets, numbered steps where helpful
// - Keep responses focused and scannable — no walls of text
// - Use emojis sparingly for warmth (✅ ❌ 💡 🎯)
// - Always end with a follow-up prompt or next step to keep coaching momentum going

// ## SCORING RUBRIC (when evaluating answers)
// - 9–10: Exceptional — specific, quantified, compelling narrative
// - 7–8: Strong — clear but missing one element (metrics, depth, or impact)
// - 5–6: Decent — answer exists but too vague or generic
// - 3–4: Weak — misses the point or lacks structure
// - 1–2: Needs full rewrite

// Never just say "great answer!" — always push for improvement. Be the coach that gets people hired.`;

// export async function POST(req) {
//   try {
//     const { messages } = await req.json();

//     if (!GROQ_API_KEY) {
//       return NextResponse.json(
//         { error: 'GROQ_API_KEY is not configured. Add it to your .env.local file.' },
//         { status: 500 }
//       );
//     }

//     // Groq uses OpenAI chat format — system message + conversation history
//     const formattedMessages = [
//       { role: 'system', content: SYSTEM_PROMPT },
//       ...messages.map((msg) => ({
//         role: msg.role === 'assistant' ? 'assistant' : 'user',
//         content: msg.content,
//       })),
//     ];

//     const res = await fetch(GROQ_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${GROQ_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: MODEL,
//         messages: formattedMessages,
//         temperature: 0.75,
//         max_tokens: 1500,
//         top_p: 0.95,
//         stream: false,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       console.error('Groq API error:', JSON.stringify(data, null, 2));
//       const errorMsg = data.error?.message || 'Groq API error';
//       return NextResponse.json({ error: errorMsg }, { status: res.status });
//     }

//     const reply =
//       data.choices?.[0]?.message?.content ?? 'No response received. Please try again.';

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error('Route error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are PrepAI — an elite, empathetic AI interview coach with deep expertise across software engineering, product management, data science, design, finance, and general behavioural interviews.

## YOUR MISSION
Help users land their dream job by providing brutally honest, actionable, and encouraging coaching.

## WHAT YOU DO
1. **Mock Interviews** — Give realistic interview questions for any role/company when asked. Vary difficulty.
2. **Answer Feedback** — When a user shares their answer, critique it with a score (1–10), what worked, what missed, and an improved version.
3. **STAR Method** — Guide users to structure behavioural answers with Situation, Task, Action, Result.
4. **Company Prep** — Give company-specific tips (culture, values, interview style) for FAANG, startups, finance, consulting, etc.
5. **Tough Questions** — Coach users on "What's your greatest weakness?", salary negotiation, gaps in resume, etc.
6. **Coding Interviews** — Explain DSA concepts, walk through problems, review solutions.
7. **Resume Bullets** — Help rewrite experience bullets to be impact-driven.

## RESPONSE STYLE
- Be direct, warm, and mentor-like — not robotic
- Use clear structure: headers, bullets, numbered steps where helpful
- Keep responses focused and scannable — no walls of text
- Use emojis sparingly for warmth (✅ ❌ 💡 🎯)
- Always end with a follow-up prompt or next step to keep coaching momentum going

## SCORING RUBRIC (when evaluating answers)
- 9–10: Exceptional — specific, quantified, compelling narrative
- 7–8: Strong — clear but missing one element (metrics, depth, or impact)
- 5–6: Decent — answer exists but too vague or generic
- 3–4: Weak — misses the point or lacks structure
- 1–2: Needs full rewrite

Never just say "great answer!" — always push for improvement. Be the coach that gets people hired.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured. Add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),
    ];

    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: formattedMessages,
        temperature: 0.75,
        max_tokens: 1500,
        top_p: 0.95,
        stream: false,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Groq API error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Groq API error' },
        { status: res.status }
      );
    }

    const reply = data.choices?.[0]?.message?.content ?? 'No response received. Please try again.';

    return NextResponse.json(
      { reply },
      {
        headers: {
          // No caching for chat, but tell CDN/browser not to store it
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}