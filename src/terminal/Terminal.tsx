'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { VfsDir } from '@/vfs/types';
import type { ShellState } from './types';
import { runCommand, welcomeLines, formatPrompt } from './commands';
import { complete } from './complete';
import { applyThemeChoice } from '@/theme/apply-theme';

export function Terminal({ root }: { root: VfsDir }) {
  const router = useRouter();
  const [state, setState] = useState<ShellState>(() => ({ cwd: '/', lines: welcomeLines(), history: [] }));
  const [input, setInput] = useState('');
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(raw: string) {
    const { state: next, effect } = runCommand(root, state, raw);
    setState(next);
    setInput('');
    setHistIndex(null);
    if (effect.type === 'navigate') router.push(effect.route);
    if (effect.type === 'theme') applyThemeChoice(effect.choice);
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(input);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.history.length === 0) return;
      const idx = histIndex === null ? state.history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setInput(state.history[idx]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === null) return;
      const idx = histIndex + 1;
      if (idx >= state.history.length) {
        setHistIndex(null);
        setInput('');
      } else {
        setHistIndex(idx);
        setInput(state.history[idx]);
      }
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const candidates = complete(root, state.cwd, input);
      if (candidates.length === 1) {
        const parts = input.split(/\s+/);
        if (parts.length <= 1) setInput(candidates[0]);
        else {
          parts[parts.length - 1] = candidates[0];
          setInput(parts.join(' '));
        }
      } else if (candidates.length > 1) {
        setState((s) => ({ ...s, lines: [...s.lines, { kind: 'output', text: candidates.join('  ') }] }));
      }
    }
  }

  const lineColor = (kind: string) =>
    kind === 'error' ? 'var(--accent-2)' : kind === 'input' ? 'var(--fg-muted)' : 'var(--term-fg)';

  return (
    <main
      onClick={() => inputRef.current?.focus()}
      style={{
        background: 'var(--term-bg)',
        color: 'var(--term-fg)',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 14,
        lineHeight: 1.5,
        minHeight: 'calc(100vh - 49px)',
        padding: '16px',
        cursor: 'text',
      }}
    >
      <div ref={scrollRef} style={{ maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
        {state.lines.map((l, i) => (
          <div key={i} style={{ color: lineColor(l.kind) }}>{l.text}</div>
        ))}
        <div style={{ display: 'flex' }}>
          <span style={{ color: 'var(--accent)' }}>{formatPrompt(state.cwd)}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--term-fg)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          />
        </div>
      </div>
    </main>
  );
}
