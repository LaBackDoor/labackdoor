import Link from 'next/link';
import { getResearch } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export default function ResearchIndex() {
  const items = getResearch();
  return (
    <PageShell title="Research" subtitle="$ ls ~/research">
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 18 }}>
        {items.map((r) => (
          <li key={r.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
              {r.frontmatter.status} · since {r.frontmatter.started} · {r.frontmatter.tags.join(', ')}
            </div>
            <Link href={`/research/${r.slug}`} style={{ fontSize: 20, color: 'var(--fg)', textDecoration: 'none', fontWeight: 600 }}>
              {r.frontmatter.title}
            </Link>
            <p style={{ color: 'var(--fg-muted)', margin: '6px 0 0' }}>{r.frontmatter.summary}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
