import Link from 'next/link';
import { getTeamMembers } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export default function TeamIndex() {
  const members = getTeamMembers();
  return (
    <PageShell title="Team" subtitle="$ ls ~/team">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {members.map((m) => (
          <Link
            key={m.slug}
            href={`/team/${m.slug}`}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 16,
              textDecoration: 'none',
              color: 'var(--fg)',
              background: 'var(--bg-elev)',
            }}
          >
            <div style={{ fontWeight: 700 }}>{m.frontmatter.name}</div>
            <div style={{ color: 'var(--fg-muted)', fontSize: 13, marginTop: 4 }}>{m.frontmatter.role}</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
