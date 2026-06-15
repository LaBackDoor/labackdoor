import type { ContentRecord, NewsFrontmatter, ActivityItem } from '@/content/types';

export function NewsPanel({
  news,
  activity,
}: {
  news: ContentRecord<NewsFrontmatter>[];
  activity: ActivityItem[];
}) {
  return (
    <aside
      aria-label="News and recent activity"
      style={{
        background: 'var(--bg-elev)',
        borderTop: '1px solid var(--border)',
        padding: '14px 16px',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 13,
        display: 'grid',
        gap: 18,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      }}
    >
      <div>
        <div style={{ color: 'var(--accent)', marginBottom: 6 }}># news</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
          {news.slice(0, 4).map((n) => (
            <li key={n.slug}>
              <span style={{ color: 'var(--fg-muted)' }}>{n.frontmatter.date} </span>
              {n.frontmatter.link ? (
                <a href={n.frontmatter.link} style={{ color: 'var(--fg)' }}>{n.frontmatter.title}</a>
              ) : (
                <span style={{ color: 'var(--fg)' }}>{n.frontmatter.title}</span>
              )}
            </li>
          ))}
          {news.length === 0 && <li style={{ color: 'var(--fg-muted)' }}>no news yet</li>}
        </ul>
      </div>
      <div>
        <div style={{ color: 'var(--accent)', marginBottom: 6 }}># recent activity</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
          {activity.slice(0, 5).map((a, i) => (
            <li key={i}>
              <span style={{ color: 'var(--fg-muted)' }}>[{a.kind}] </span>
              <a href={a.route} style={{ color: 'var(--accent-2)' }}>{a.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
