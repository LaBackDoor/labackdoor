import { notFound } from 'next/navigation';
import { getTeamMember, getPublications, publicationsByMember } from '@/content/loader';
import { Avatar } from '@/components/Avatar';
import { SocialIcons } from '@/components/SocialIcons';
import { Authors } from '@/components/Authors';
import { Mdx } from '@/components/Mdx';

export const metadata = { title: 'Resume' };

export default function ResumePage() {
  const m = getTeamMember('abanisenioluwa');
  if (!m) notFound();
  const { name, role, avatar, skills, links } = m.frontmatter;
  const pubs = publicationsByMember(name, getPublications());
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar src={avatar} name={name} size={96} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 style={{ fontSize: 28, margin: 0, color: 'var(--fg)' }}>{name}</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 14 }}>{role}</p>
          <div style={{ marginTop: 8 }}><SocialIcons links={links} /></div>
        </div>
        <a
          href="/abanisenioluwa-orojo-cv.pdf"
          download
          style={{ alignSelf: 'flex-start', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 6, padding: '8px 14px', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}
        >
          ↓ Download CV (PDF)
        </a>
      </header>

      {skills && skills.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '20px 0' }}>
          {skills.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      )}

      <article style={{ lineHeight: 1.7, color: 'var(--fg)', marginTop: 8 }}>
        <Mdx source={m.body} />
      </article>

      {pubs.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 16, color: 'var(--accent)', fontFamily: 'var(--font-mono), monospace' }}>Publications</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
            {pubs.map((p, i) => (
              <li key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{p.title}</div>
                <div style={{ color: 'var(--fg-muted)', fontSize: 14 }}>
                  <Authors authors={p.authors} />{p.authors.length ? ' · ' : ''}{p.venue} ({p.year || 'n.d.'})
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
