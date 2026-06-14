import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  blogFrontmatterSchema,
  teamFrontmatterSchema,
  labFrontmatterSchema,
  projectFrontmatterSchema,
} from './schema';
import type {
  BlogFrontmatter,
  TeamFrontmatter,
  LabFrontmatter,
  ProjectFrontmatter,
  ContentRecord,
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

export function getProjects(): ContentRecord<ProjectFrontmatter>[] {
  return readDir('projects')
    .map((f) =>
      readRecord<ProjectFrontmatter>(path.join(CONTENT_DIR, 'projects', f), projectFrontmatterSchema),
    )
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export function getLab(): ContentRecord<LabFrontmatter> | null {
  const file = path.join(CONTENT_DIR, 'lab.mdx');
  if (!fs.existsSync(file)) return null;
  return readRecord<LabFrontmatter>(file, labFrontmatterSchema);
}
