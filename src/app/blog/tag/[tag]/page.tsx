import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogTags, getBlogPostsByTag } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export function generateStaticParams() {
  return getBlogTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return { title: `#${tag}` };
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getBlogPostsByTag(tag);
  if (posts.length === 0) notFound();
  return (
    <PageShell title={`#${tag}`} subtitle={`$ ls ~/blog --tag ${tag}`}>
      <p style={{ marginTop: -12, marginBottom: 18 }}>
        <Link href="/blog" style={{ color: 'var(--accent-2)', fontFamily: 'var(--font-mono), monospace', fontSize: 12 }}>← all posts</Link>
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 18 }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>{p.frontmatter.date}</div>
            <Link href={`/blog/${p.slug}`} style={{ fontSize: 20, color: 'var(--fg)', textDecoration: 'none', fontWeight: 600 }}>
              {p.frontmatter.title}
            </Link>
            <p style={{ color: 'var(--fg-muted)', margin: '6px 0 0' }}>{p.frontmatter.summary}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
