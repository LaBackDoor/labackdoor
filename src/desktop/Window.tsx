'use client';

import type { WindowState } from './types';

const SEP = (route: string) => (route.includes('?') ? '&' : '?');

function TrafficButton({ bg, label, onClick }: { bg: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ width: 12, height: 12, borderRadius: '50%', border: 'none', background: bg, cursor: 'pointer', padding: 0 }}
    />
  );
}

export function Window({
  win,
  onClose,
  onMinimize,
  onToggleMax,
}: {
  win: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
}) {
  if (win.status === 'minimized') return null;
  const maximized = win.status === 'maximized';

  return (
    <div
      role="dialog"
      aria-label={win.title}
      style={{
        position: 'fixed',
        zIndex: 50,
        left: maximized ? 0 : '6vw',
        right: maximized ? 0 : '6vw',
        top: maximized ? 49 : 80,
        bottom: maximized ? 0 : 70,
        background: 'var(--bg-elev)',
        border: '1px solid var(--border)',
        borderRadius: maximized ? 0 : 10,
        boxShadow: '0 24px 60px rgba(0,0,0,.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'var(--bg-elev)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <TrafficButton bg="#ff5f57" label="Close window" onClick={onClose} />
        <TrafficButton bg="#febc2e" label="Minimize window" onClick={onMinimize} />
        <TrafficButton bg="#28c840" label="Maximize window" onClick={onToggleMax} />
        <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
          {win.title}
        </span>
      </div>
      <iframe
        title={win.title}
        src={`${win.route}${SEP(win.route)}window=1`}
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{ flex: 1, width: '100%', border: 'none', background: 'var(--bg)' }}
      />
    </div>
  );
}
