import Link from 'next/link';
import { getResearch, getPublications, publicationsForArea } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export const metadata = { title: 'Research' };

export default function ResearchIndex() {
  const areas = getResearch();
  const pubs = getPublications();
  return (
    <PageShell title="Research" subtitle="$ ls ~/research">
      <div style={{ display: 'grid', gap: 28 }}>
        {areas.map((a) => {
          const matched = publicationsForArea(a.frontmatter.keywords, pubs);
          return (
            <section key={a.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
              <Link href={`/research/${a.slug}`} style={{ fontSize: 20, fontWeight: 700, color: 'var(--fg)', textDecoration: 'none' }}>
                {a.frontmatter.title}
              </Link>
              <p style={{ color: 'var(--fg-muted)', margin: '6px 0 10px' }}>{a.frontmatter.summary}</p>
              {Object.keys(a.frontmatter.links).length > 0 && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '0 0 10px', fontFamily: 'var(--font-mono), monospace', fontSize: 12 }}>
                  {Object.entries(a.frontmatter.links).map(([k, v]) => (
                    <a key={k} href={v} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-2)' }}>{k} ↗</a>
                  ))}
                </div>
              )}
              {matched.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                  {matched.slice(0, 4).map((p, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>
                      <span style={{ color: 'var(--fg-muted)' }}>{p.year} · </span>
                      <span style={{ color: 'var(--fg)' }}>{p.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
