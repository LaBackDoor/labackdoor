import { getProjects } from '@/content/loader';
import { PageShell } from '@/components/PageShell';

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <PageShell title="Projects" subtitle="$ ls ~/projects">
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
        {projects.map((p) => (
          <li key={p.slug} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 16, background: 'var(--bg-elev)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{p.frontmatter.title}</strong>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
                {p.frontmatter.status}
              </span>
            </div>
            <p style={{ color: 'var(--fg-muted)', margin: '8px 0 0' }}>{p.frontmatter.summary}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
