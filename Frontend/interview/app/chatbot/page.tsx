'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import Particles from '@/components/Particles';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Lightweight Markdown Renderer ───────────────────────────────────────────
// Handles: ## headers, **bold**, *italic*, `code`, ``` code blocks,
//          - bullet lists, 1. numbered lists, blank-line paragraphs
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  const inlineFormat = (line: string, key: string | number): React.ReactNode => {
    // Split on bold (**), italic (*), inline code (`)
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return (
      <span key={key}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**'))
            return <strong key={j} style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
          if (part.startsWith('*') && part.endsWith('*'))
            return <em key={j}>{part.slice(1, -1)}</em>;
          if (part.startsWith('`') && part.endsWith('`'))
            return (
              <code key={j} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                padding: '1px 6px',
                fontSize: '13px',
                fontFamily: "'DM Mono', monospace",
                color: '#a5b4fc',
              }}>{part.slice(1, -1)}</code>
            );
          return part;
        })}
      </span>
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push(
        <pre key={i} style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '14px 16px',
          overflowX: 'auto',
          margin: '8px 0',
          fontFamily: "'DM Mono', monospace",
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'rgba(255,255,255,0.75)',
        }}>
          {lang && <span style={{ color: '#818cf8', display: 'block', marginBottom: '6px', fontSize: '11px' }}>{lang}</span>}
          {codeLines.join('\n')}
        </pre>
      );
      i++;
      continue;
    }

    // H1
    if (/^# /.test(line)) {
      nodes.push(<h1 key={i} style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.95)', margin: '14px 0 6px' }}>{inlineFormat(line.slice(2), 'h1')}</h1>);
      i++; continue;
    }

    // H2
    if (/^## /.test(line)) {
      nodes.push(<h2 key={i} style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.90)', margin: '14px 0 4px', letterSpacing: '0.01em' }}>{inlineFormat(line.slice(3), 'h2')}</h2>);
      i++; continue;
    }

    // H3
    if (/^### /.test(line)) {
      nodes.push(<h3 key={i} style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: '10px 0 4px' }}>{inlineFormat(line.slice(4), 'h3')}</h3>);
      i++; continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '12px 0' }} />);
      i++; continue;
    }

    // Bullet list (collect consecutive items)
    if (/^[-*] /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(<li key={i} style={{ marginBottom: '4px' }}>{inlineFormat(lines[i].replace(/^[-*] /, ''), i)}</li>);
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} style={{ margin: '6px 0 6px 4px', paddingLeft: '18px', listStyleType: 'disc', color: 'rgba(255,255,255,0.75)' }}>
          {items}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(<li key={i} style={{ marginBottom: '4px' }}>{inlineFormat(lines[i].replace(/^\d+\. /, ''), i)}</li>);
        i++;
      }
      nodes.push(
        <ol key={`ol-${i}`} style={{ margin: '6px 0 6px 4px', paddingLeft: '20px', color: 'rgba(255,255,255,0.75)' }}>
          {items}
        </ol>
      );
      continue;
    }

    // Blank line → small spacer
    if (line.trim() === '') {
      nodes.push(<div key={i} style={{ height: '8px' }} />);
      i++; continue;
    }

    // Normal paragraph line
    nodes.push(
      <p key={i} style={{ margin: 0, lineHeight: '1.75', color: 'rgba(255,255,255,0.78)' }}>
        {inlineFormat(line, i)}
      </p>
    );
    i++;
  }

  return nodes;
}
// ─────────────────────────────────────────────────────────────────────────────

const MessageBubble = memo(({ msg, isLast }: { msg: Message; isLast: boolean }) => (
  <div
    className={`group w-full ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
    style={{ animation: isLast ? 'msgIn 0.18s ease-out both' : 'none' }}
  >
    {msg.role === 'assistant' && (
      <div className="flex gap-3 max-w-[90%] md:max-w-[80%]">
        <div className="flex-shrink-0 mt-1 h-7 w-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-[15px] pt-0.5 min-w-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {renderMarkdown(msg.content)}
        </div>
      </div>
    )}

    {msg.role === 'user' && (
      <div
        className="max-w-[90%] md:max-w-[80%] rounded-[20px] rounded-br-[6px] px-4 py-2.5 text-[15px] leading-7 text-white whitespace-pre-wrap"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.08)',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {msg.content}
      </div>
    )}
  </div>
));
MessageBubble.displayName = 'MessageBubble';

const TypingDots = memo(() => (
  <div className="flex justify-start w-full" style={{ animation: 'msgIn 0.18s ease-out both' }}>
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-0.5 h-7 w-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex items-center gap-[5px] py-2">
        {[0, 1, 2].map(i => (
          <span key={i} className="h-[5px] w-[5px] rounded-full bg-white/30"
            style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  </div>
));
TypingDots.displayName = 'TypingDots';

const PARTICLE_CONFIG = {
  particleCount: 60,
  particleSpread: 12,
  speed: 0.03,
  particleColors: ['#ffffff', '#c7d2fe'] as string[],
  alphaParticles: true,
  particleBaseSize: 55,
  sizeRandomness: 0.8,
  cameraDistance: 28,
  disableRotation: true,
} as const;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI interview coach. Ask me anything — mock questions, tips, or how to answer tough interview scenarios.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const userMessage: Message = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/chatbot/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${data.error || 'Something went wrong.'}` }]);
        return;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Network error. Please check your connection.' }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }, [sendMessage]);

  const canSend = input.trim().length > 0 && !loading;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        body { background: #0d0d0d !important; }
        * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
        *::-webkit-scrollbar { display: none !important; }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
        .input-glow:focus-within {
          box-shadow: 0 0 0 1px rgba(99,102,241,0.35), 0 4px 24px rgba(99,102,241,0.1);
        }
        .send-btn:not(:disabled):hover {
          background: rgba(99,102,241,0.7) !important;
          transform: scale(1.05);
        }
        .send-btn { transition: all 0.15s ease; }
      `}</style>

      <div className="fixed inset-0 flex flex-col" style={{ background: '#0d0d0d' }}>
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Particles {...PARTICLE_CONFIG} />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-center py-4 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(13,13,13,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="brand-title" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontWeight: 400, letterSpacing: '0.01em' }}>
              RESUMATE-AI
            </span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-4xl px-6 py-8 flex flex-col gap-6">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} />
            ))}
            {loading && <TypingDots />}
            <div ref={bottomRef} className="h-2" />
          </div>
        </div>

        {/* Input */}
        <div className="relative z-10"
          style={{ background: 'rgba(13,13,13,0.9)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto w-full max-w-4xl px-6 py-4">
            <div className="input-glow flex items-end gap-3 rounded-2xl px-4 py-3 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message PrepAI..."
                rows={1}
                className="flex-1 resize-none bg-transparent outline-none leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.85)', maxHeight: '160px', caretColor: '#818cf8' }}
              />
              <button onClick={sendMessage} disabled={!canSend}
                className="send-btn flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-xl"
                style={{
                  background: canSend ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${canSend ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: canSend ? 'pointer' : 'not-allowed',
                }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 13V3M3 8l5-5 5 5" stroke={canSend ? '#fff' : 'rgba(255,255,255,0.25)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Sans', sans-serif" }}>
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </>
  );
}