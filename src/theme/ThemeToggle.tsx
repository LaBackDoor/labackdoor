'use client';

import { useEffect, useState } from 'react';
import { type ResolvedTheme } from './theme-script';
import { applyThemeChoice } from './apply-theme';

function currentTheme(): ResolvedTheme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function toggle() {
    const next: ResolvedTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    applyThemeChoice(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--fg)',
        borderRadius: 6,
        padding: '4px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 13,
      }}
    >
      {theme === 'dark' ? '☾ dark' : '☀ light'}
    </button>
  );
}
