import { notFound } from 'next/navigation';
import { getResearch, getResearchItem, getPublications, getPreprints, publicationsForArea } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Mdx } from '@/components/Mdx';
import { Authors } from '@/components/Authors';

export function generateStaticParams() {
  return getResearch().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getResearchItem(slug);
  return { title: area?.frontmatter.title ?? 'Research', description: area?.frontmatter.summary };
}

export default async function ResearchAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getResearchItem(slug);
  if (!area) notFound();
  const matched = publicationsForArea(area.frontmatter.keywords, getPublications());
  const kws = area.frontmatter.keywords.map((k) => k.toLowerCase());
  const preprints = getPreprints().filter((pp) =>
    kws.some((k) => pp.frontmatter.title.toLowerCase().includes(k)),
  );
  return (
    <PageShell title={area.frontmatter.title} subtitle={area.frontmatter.summary}>
      {Object.keys(area.frontmatter.links).length > 0 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>
          {Object.entries(area.frontmatter.links).map(([k, v]) => (
            <a key={k} href={v} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-2)' }}>{k} ↗</a>
          ))}
        </div>
      )}
      <div style={{ lineHeight: 1.7, color: 'var(--fg)' }}>
        <Mdx source={area.body} />
      </div>
      {preprints.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 16, color: 'var(--accent)', fontFamily: 'var(--font-mono), monospace' }}>Preprints</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
            {preprints.map((pp) => (
              <li key={pp.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{pp.frontmatter.title}</div>
                <div style={{ color: 'var(--fg-muted)', fontSize: 14 }}>
                  <Authors authors={pp.frontmatter.authors} />{pp.frontmatter.authors.length ? ' · ' : ''}{pp.frontmatter.venue}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 4, fontFamily: 'var(--font-mono), monospace', fontSize: 12 }}>
                  {Object.entries(pp.frontmatter.links).map(([k, v]) => (<a key={k} href={v} style={{ color: 'var(--accent-2)' }}>{k}</a>))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 16, color: 'var(--accent)', fontFamily: 'var(--font-mono), monospace' }}>Related publications</h2>
        {matched.length === 0 ? (
          <p style={{ color: 'var(--fg-muted)' }}>No publications mapped to this area yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
            {matched.map((p, i) => (
              <li key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{p.title}</div>
                <div style={{ color: 'var(--fg-muted)', fontSize: 14 }}>
                  <Authors authors={p.authors} />{p.authors.length ? ' · ' : ''}{p.venue} ({p.year || 'n.d.'})
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 4, fontFamily: 'var(--font-mono), monospace', fontSize: 12 }}>
                  {Object.entries(p.links).map(([k, v]) => (<a key={k} href={v} style={{ color: 'var(--accent-2)' }}>{k}</a>))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
