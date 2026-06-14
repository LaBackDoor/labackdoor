'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, type ResolvedTheme } from './theme-script';

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
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
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
