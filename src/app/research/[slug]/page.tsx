import { notFound } from 'next/navigation';
import { getResearch, getResearchItem } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Mdx } from '@/components/Mdx';

export function generateStaticParams() {
  return getResearch().map((r) => ({ slug: r.slug }));
}

export default async function ResearchItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) notFound();
  const { status, started, tags, collaborators, links } = item.frontmatter;
  return (
    <PageShell title={item.frontmatter.title} subtitle={`${status} · since ${started}`}>
      <section style={{ marginBottom: 20, fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--fg-muted)' }}>
        <div>tags: {tags.join(', ') || '—'}</div>
        <div>collaborators: {collaborators.join(', ') || '—'}</div>
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          {Object.entries(links).map(([k, v]) => (
            <a key={k} href={v} style={{ color: 'var(--accent-2)' }}>{k}</a>
          ))}
        </div>
      </section>
      <Mdx source={item.body} />
    </PageShell>
  );
}
