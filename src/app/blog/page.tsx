import Link from 'next/link';
import { getBlogPosts } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  const posts = getBlogPosts();
  return (
    <PageShell title="Blog" subtitle="$ ls ~/blog">
      <p style={{ marginTop: -12, marginBottom: 18, fontFamily: 'var(--font-mono), monospace', fontSize: 12 }}>
        <a href="/feed.xml" style={{ color: 'var(--accent-2)' }}>↦ RSS feed</a>
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 18 }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
              {p.frontmatter.date}
              {p.frontmatter.tags.length > 0 && ' · '}
              {p.frontmatter.tags.map((t, i) => (
                <span key={t}>
                  {i > 0 ? ' ' : ''}
                  <Link href={`/blog/tag/${t}`} style={{ color: 'var(--accent-2)', textDecoration: 'none' }}>#{t}</Link>
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${p.slug}`}
              style={{ fontSize: 20, color: 'var(--fg)', textDecoration: 'none', fontWeight: 600 }}
            >
              {p.frontmatter.title}
            </Link>
            <p style={{ color: 'var(--fg-muted)', margin: '6px 0 0' }}>{p.frontmatter.summary}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
