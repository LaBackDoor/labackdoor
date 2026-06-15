import { getProjects } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import type { RepoProject } from '@/content/types';

function byOrg(repos: RepoProject[]): [string, RepoProject[]][] {
  const m = new Map<string, RepoProject[]>();
  for (const r of repos) { const l = m.get(r.org) ?? []; l.push(r); m.set(r.org, l); }
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export default function ProjectsPage() {
  const groups = byOrg(getProjects());
  return (
    <PageShell title="Projects" subtitle="$ ls ~/projects">
      {groups.length === 0 && <p style={{ color: 'var(--fg-muted)' }}>No projects yet.</p>}
      {groups.map(([org, repos]) => (
        <section key={org} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, color: 'var(--accent)', fontFamily: 'var(--font-mono), monospace' }}>{org}</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
            {repos.map((r) => (
              <li key={r.name} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <a href={r.url} target="_blank" rel="noreferrer" style={{ fontWeight: 600, color: 'var(--fg)' }}>{r.name}</a>
                {r.description && <p style={{ color: 'var(--fg-muted)', margin: '4px 0 0' }}>{r.description}</p>}
                <div style={{ display: 'flex', gap: 12, marginTop: 4, fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
                  {r.language && <span>{r.language}</span>}
                  {r.stars > 0 && <span>★ {r.stars}</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
