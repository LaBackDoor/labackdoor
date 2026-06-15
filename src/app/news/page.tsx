import { getNews, getRecentActivity } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export const metadata = { title: 'News' };

export default function NewsPage() {
  const news = getNews();
  const activity = getRecentActivity(12);
  return (
    <PageShell title="News" subtitle="$ cat ~/news">
      <section style={{ marginBottom: 32 }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
          {news.map((n) => (
            <li key={n.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>{n.frontmatter.date}</div>
              <div style={{ fontWeight: 600 }}>
                {n.frontmatter.link ? <a href={n.frontmatter.link} style={{ color: 'var(--fg)' }}>{n.frontmatter.title}</a> : n.frontmatter.title}
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '4px 0 0' }}>{n.frontmatter.summary}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 style={{ fontSize: 16, color: 'var(--accent)', fontFamily: 'var(--font-mono), monospace' }}>Recent activity</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {activity.map((a, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>
              <span style={{ color: 'var(--fg-muted)' }}>{a.date.slice(0, 10)} [{a.kind}] </span>
              <a href={a.route} style={{ color: 'var(--accent-2)' }}>{a.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
