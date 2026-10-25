import { getProjects } from '@/content/loader';
import { Badge, Card, PageHead, Section } from '@/components/ui';
import type { RepoProject } from '@/content/types';

function byOrg(repos: RepoProject[]): [string, RepoProject[]][] {
  const m = new Map<string, RepoProject[]>();
  for (const r of repos) { const l = m.get(r.org) ?? []; l.push(r); m.set(r.org, l); }
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export const metadata = {
  title: 'Projects',
  description: 'Featured projects and open-source repositories: Kyerɛ (WaCode 2026, 2nd place), SysRepair-Bench and more.',
};

export default function ProjectsPage() {
  const groups = byOrg(getProjects());
  return (
    <>
      <PageHead eyebrow="$ ls ~/projects" title="Projects" lede="Featured builds, then every repository from the lab organizations." />
      <Section eyebrow="$ ls featured/" title="Featured">
        <div className="grid-cards">
          <Card
            className="award"
            title="Kyerɛ: Watching Isn’t Knowing"
            href="/projects/kyere"
            meta="WaCode 2026 · Baylor University"
            badges={<Badge tone="gold">2nd Place</Badge>}
            media="/img/kyere/06-radar.jpg"
            body="A study app where watching fills at most half of each concept radar and the rest is earned by answering alone and by teaching an AI student."
          />
          <Card
            title="SysRepair-Bench"
            href="/research/autonomous-remediation"
            meta="Benchmark · ICLR 2027 (Under Review)"
            body="313 reproducible Docker and VM scenarios scored on closing the exploit and keeping the service up."
            actions={[{ label: 'Code', href: 'https://github.com/BaylorSecurityLab/sysrepair-bench' }]}
          />
        </div>
      </Section>
      {groups.length === 0 && <p className="container card-body">No repositories yet.</p>}
      {groups.map(([org, repos]) => (
        <Section key={org} eyebrow="$ gh repo list" title={org}>
          <div className="grid-cards">
            {repos.map((r) => (
              <Card
                key={r.name}
                title={r.name}
                href={r.url}
                meta={[r.language, r.stars > 0 ? `★ ${r.stars}` : ''].filter(Boolean).join(' · ')}
                body={r.description || undefined}
              />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
