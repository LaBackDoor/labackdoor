import { getLab } from '@/content/loader';
import { Mdx } from '@/components/Mdx';

export default function LabPage() {
  const lab = getLab();
  const mission = lab?.frontmatter.mission ?? '';
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <div className="logo-hero" role="img" aria-label="la backdoor" />
      {mission && (
        <p style={{ textAlign: 'center', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 15, margin: '0 0 32px' }}>{mission}</p>
      )}
      <article style={{ lineHeight: 1.7, color: 'var(--fg)' }}>
        {lab ? <Mdx source={lab.body} /> : <p>Lab overview coming soon.</p>}
      </article>
    </main>
  );
}
