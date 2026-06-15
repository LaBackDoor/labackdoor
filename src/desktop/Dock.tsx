'use client';

import type { WindowState } from './types';

export function Dock({ win, onRestore }: { win: WindowState | null; onRestore: () => void }) {
  if (!win || win.status !== 'minimized') return null;
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        display: 'flex',
        gap: 8,
        padding: '6px 10px',
        background: 'color-mix(in srgb, var(--bg-elev) 85%, transparent)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <button
        type="button"
        aria-label={`Restore ${win.title}`}
        onClick={onRestore}
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--fg-muted)',
          background: 'var(--bg-elev)',
          border: '1px solid var(--border)',
          borderRadius: 4,
          padding: '2px 10px',
          cursor: 'pointer',
        }}
      >
        ▢ {win.title}
      </button>
    </div>
  );
}
