import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  blogFrontmatterSchema,
  teamFrontmatterSchema,
  labFrontmatterSchema,
  researchFrontmatterSchema,
  publicationFrontmatterSchema,
  newsFrontmatterSchema,
} from './schema';
import type {
  BlogFrontmatter,
  TeamFrontmatter,
  LabFrontmatter,
  ContentRecord,
  ResearchFrontmatter,
  PublicationFrontmatter,
  NewsFrontmatter,
  Publication,
  ActivityItem,
  RepoProject,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readDir(sub: string): string[] {
  const dir = path.join(CONTENT_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

function readRecord<T>(filePath: string, schema: { parse: (v: unknown) => T }): ContentRecord<T> {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, '.mdx');
  let frontmatter: T;
  try {
    frontmatter = schema.parse(data);
  } catch (err) {
    throw new Error(`Invalid frontmatter in ${filePath}: ${(err as Error).message}`);
  }
  return { slug, frontmatter, body: content };
}

export function getBlogPosts(): ContentRecord<BlogFrontmatter>[] {
  return readDir('blog')
    .map((f) => readRecord<BlogFrontmatter>(path.join(CONTENT_DIR, 'blog', f), blogFrontmatterSchema))
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getBlogPost(slug: string): ContentRecord<BlogFrontmatter> | null {
  return getBlogPosts().find((p) => p.slug === slug) ?? null;
}

export function getTeamMembers(): ContentRecord<TeamFrontmatter>[] {
  return readDir('team')
    .map((f) => readRecord<TeamFrontmatter>(path.join(CONTENT_DIR, 'team', f), teamFrontmatterSchema))
    .sort((a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999));
}

export function getTeamMember(slug: string): ContentRecord<TeamFrontmatter> | null {
  return getTeamMembers().find((m) => m.slug === slug) ?? null;
}

export function getProjects(): RepoProject[] {
  const file = path.join(CONTENT_DIR, 'projects', 'github.generated.json');
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as RepoProject[];
  return raw;
}

export function getLab(): ContentRecord<LabFrontmatter> | null {
  const file = path.join(CONTENT_DIR, 'lab.mdx');
  if (!fs.existsSync(file)) return null;
  return readRecord<LabFrontmatter>(file, labFrontmatterSchema);
}

export function getResearch(): ContentRecord<ResearchFrontmatter>[] {
  return readDir('research')
    .map((f) => readRecord<ResearchFrontmatter>(path.join(CONTENT_DIR, 'research', f), researchFrontmatterSchema))
    .sort((a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999));
}

export function getResearchItem(slug: string): ContentRecord<ResearchFrontmatter> | null {
  return getResearch().find((r) => r.slug === slug) ?? null;
}

export function publicationsForArea(keywords: string[], pubs: Publication[]): Publication[] {
  const kws = keywords.map((k) => k.toLowerCase());
  return pubs.filter((p) => kws.some((k) => p.title.toLowerCase().includes(k)));
}

export function getNews(): ContentRecord<NewsFrontmatter>[] {
  return readDir('news')
    .map((f) => readRecord<NewsFrontmatter>(path.join(CONTENT_DIR, 'news', f), newsFrontmatterSchema))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

function normalizeTitle(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function getPublications(): Publication[] {
  const manual: Publication[] = readDir('publications')
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readRecord<PublicationFrontmatter>(path.join(CONTENT_DIR, 'publications', f), publicationFrontmatterSchema))
    .map((rec) => ({
      title: rec.frontmatter.title,
      authors: rec.frontmatter.authors,
      venue: rec.frontmatter.venue,
      year: rec.frontmatter.year,
      type: rec.frontmatter.type,
      links: rec.frontmatter.links,
      source: 'manual' as const,
    }));

  const scholarPath = path.join(CONTENT_DIR, 'publications', 'scholar.generated.json');
  let scholar: Publication[] = [];
  if (fs.existsSync(scholarPath)) {
    const raw = JSON.parse(fs.readFileSync(scholarPath, 'utf8')) as Array<{
      title: string;
      authors?: string[];
      venue?: string;
      year: number;
      link?: string;
    }>;
    scholar = raw.map((e) => ({
      title: e.title,
      authors: e.authors ?? [],
      venue: e.venue ?? '',
      year: e.year,
      type: 'paper',
      links: (e.link ? { scholar: e.link } : {}) as Record<string, string>,
      source: 'scholar' as const,
    }));
  }

  const seen = new Set(manual.map((p) => normalizeTitle(p.title)));
  const merged = [...manual, ...scholar.filter((p) => !seen.has(normalizeTitle(p.title)))];
  return merged.sort((a, b) => b.year - a.year);
}

export function publicationsByMember(name: string, pubs: Publication[]): Publication[] {
  const surname = name.trim().split(/\s+/).pop()?.toLowerCase() ?? '';
  if (!surname) return [];
  return pubs.filter((p) => p.authors.some((a) => a.toLowerCase().includes(surname)));
}

export function getRecentActivity(limit = 8): ActivityItem[] {
  const items: ActivityItem[] = [];
  for (const p of getBlogPosts()) {
    items.push({ kind: 'blog', title: p.frontmatter.title, date: p.frontmatter.date, route: `/blog/${p.slug}` });
  }
  for (const n of getNews()) {
    items.push({ kind: 'news', title: n.frontmatter.title, date: n.frontmatter.date, route: '/news' });
  }
  for (const pub of getPublications()) {
    items.push({ kind: 'publication', title: pub.title, date: `${pub.year}-01-01`, route: '/publications' });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, limit);
}
