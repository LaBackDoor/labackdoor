import type { ReactNode } from 'react';

export function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, margin: 0, color: 'var(--fg)' }}>{title}</h1>
        {subtitle && (
          <p style={{ color: 'var(--fg-muted)', marginTop: 8, fontFamily: 'var(--font-mono), monospace', fontSize: 14 }}>
            {subtitle}
          </p>
        )}
      </header>
      <article style={{ lineHeight: 1.7, color: 'var(--fg)' }}>{children}</article>
    </main>
  );
}
