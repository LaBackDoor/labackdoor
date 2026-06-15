import { notFound } from 'next/navigation';
import { getTeamMembers, getTeamMember } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Mdx } from '@/components/Mdx';
import { Avatar } from '@/components/Avatar';
import { SocialIcons } from '@/components/SocialIcons';

export function generateStaticParams() {
  return getTeamMembers().map((m) => ({ member: m.slug }));
}

export default async function MemberPage({ params }: { params: Promise<{ member: string }> }) {
  const { member } = await params;
  const record = getTeamMember(member);
  if (!record) notFound();
  const { name, role, avatar, skills, links } = record.frontmatter;
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 20 }}>
        <Avatar src={avatar} name={name} size={96} />
        <div>
          <h1 style={{ fontSize: 28, margin: 0, color: 'var(--fg)' }}>{name}</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 14 }}>{role}</p>
          <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
            <span className="lab-mark" aria-hidden="true" /> la backdoor member
          </p>
        </div>
      </header>
      {links && Object.keys(links).length > 0 && (
        <div style={{ marginBottom: 16 }}><SocialIcons links={links} /></div>
      )}
      {skills && skills.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {skills.map((s) => (<span key={s} className="chip">{s}</span>))}
        </div>
      )}
      <article style={{ lineHeight: 1.7, color: 'var(--fg)' }}>
        <Mdx source={record.body} />
      </article>
    </main>
  );
}
