/** Fetches public repos from the lab GitHub orgs into content/projects/github.generated.json. */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ORGS = ['LaBackDoor', 'BaylorSecurityLab'];
const OUT = join(process.cwd(), 'content', 'projects', 'github.generated.json');

interface Repo { name: string; org: string; description: string; language: string; stars: number; url: string; }

async function fetchOrg(org: string): Promise<Repo[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100&type=public`, { headers });
  if (!res.ok) throw new Error(`GitHub ${org} failed: ${res.status} ${res.statusText}`);
  const json = (await res.json()) as Array<Record<string, any>>;
  return json
    .filter((r) => !r.archived && !r.fork)
    .map((r) => ({ name: r.name, org, description: r.description ?? '', language: r.language ?? '', stars: r.stargazers_count ?? 0, url: r.html_url }));
}

async function main() {
  const all: Repo[] = [];
  for (const org of ORGS) all.push(...(await fetchOrg(org)));
  all.sort((a, b) => b.stars - a.stars || a.org.localeCompare(b.org) || a.name.localeCompare(b.name));
  writeFileSync(OUT, JSON.stringify(all, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${all.length} repos to ${OUT}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
