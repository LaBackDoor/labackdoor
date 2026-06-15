import Link from 'next/link';
import { getResearch, getPublications, getPreprints, publicationsForArea } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export const metadata = { title: 'Research' };

export default function ResearchIndex() {
  const areas = getResearch();
  const pubs = getPublications();
  const allPreprints = getPreprints();
  return (
    <PageShell title="Research" subtitle="$ ls ~/research">
      <div style={{ display: 'grid', gap: 28 }}>
        {areas.map((a) => {
          const matched = publicationsForArea(a.frontmatter.keywords, pubs);
          const preprints = allPreprints.filter((pp) => pp.frontmatter.area === a.slug);
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
              {preprints.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px', display: 'grid', gap: 6 }}>
                  {preprints.map((pp) => {
                    const href = pp.frontmatter.links.pdf ?? Object.values(pp.frontmatter.links)[0];
                    return (
                      <li key={pp.slug} style={{ fontSize: 13 }}>
                        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)' }}>preprint · </span>
                        {href ? (
                          <a href={href} style={{ color: 'var(--fg)' }}>{pp.frontmatter.title}</a>
                        ) : (
                          <span style={{ color: 'var(--fg)' }}>{pp.frontmatter.title}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
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
