import Link from 'next/link';
import { getTeamMembers } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Avatar } from '@/components/Avatar';

export const metadata = { title: 'Team' };

export default function TeamIndex() {
  const members = getTeamMembers();
  return (
    <PageShell title="Team" subtitle="$ ls ~/team">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {members.map((m) => (
          <Link key={m.slug} href={`/team/${m.slug}`} style={{ display: 'flex', gap: 12, alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, padding: 16, textDecoration: 'none', color: 'var(--fg)', background: 'var(--bg-elev)' }}>
            <Avatar src={m.frontmatter.avatar} name={m.frontmatter.name} size={48} />
            <span>
              <span style={{ display: 'block', fontWeight: 700 }}>{m.frontmatter.name}</span>
              <span style={{ display: 'block', color: 'var(--fg-muted)', fontSize: 13, marginTop: 2 }}>{m.frontmatter.role}</span>
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
