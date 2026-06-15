import type { ReactNode } from 'react';

const ICONS: Record<string, ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.26 3.4.96.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z"/></svg>
  ),
  scholar: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/><path d="M5 13.18v3.82c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.82-7-3.82z"/></svg>
  ),
  orcid: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 17.9H5.86V7.78h1.51V17.9zM6.62 6.74a.92.92 0 1 1 0-1.84.92.92 0 0 1 0 1.84zm11.27 11.16h-3.4c-2.86 0-4.4-2.06-4.4-5.05 0-3.06 1.86-5.07 4.6-5.07h3.2v1.4h-3.04c-2.07 0-3.18 1.5-3.18 3.67 0 2.35 1.3 3.65 3.32 3.65h1.39V8.9h1.51V17.9z"/></svg>
  ),
  dblp: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 5v2h8V8H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z"/></svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>
  ),
};

export function SocialIcons({ links }: { links: Record<string, string> }) {
  const entries = Object.entries(links).filter(([, v]) => v);
  if (entries.length === 0) return null;
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
      {entries.map(([key, href]) => {
        const external = !href.startsWith('mailto:');
        return (
          <a
            key={key}
            href={href}
            aria-label={key}
            title={key}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            style={{ color: 'var(--fg-muted)', display: 'inline-flex' }}
          >
            {ICONS[key] ?? ICONS.website}
          </a>
        );
      })}
    </div>
  );
}
