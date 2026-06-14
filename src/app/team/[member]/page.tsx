import { notFound } from 'next/navigation';
import { getTeamMembers, getTeamMember } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Mdx } from '@/components/Mdx';

export function generateStaticParams() {
  return getTeamMembers().map((m) => ({ member: m.slug }));
}

export default async function MemberPage({ params }: { params: Promise<{ member: string }> }) {
  const { member } = await params;
  const record = getTeamMember(member);
  if (!record) notFound();
  const { name, role, skills, links } = record.frontmatter;
  return (
    <PageShell title={name} subtitle={role}>
      <section style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--fg-muted)' }}>
          {skills.join(' · ')}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          {Object.entries(links).map(([k, v]) => (
            <a key={k} href={v} style={{ color: 'var(--accent-2)' }}>
              {k}
            </a>
          ))}
        </div>
      </section>
      <Mdx source={record.body} />
    </PageShell>
  );
}
