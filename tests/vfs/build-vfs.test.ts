import { describe, it, expect } from 'vitest';
import { buildVfs } from '@/vfs/build-vfs';
import type { ContentRecord, RepoProject } from '@/content/types';

const blog: ContentRecord<any>[] = [
  { slug: '2026-06-10-rust-loader', body: 'b', frontmatter: { title: 'Rust loader', date: '2026-06-10', authors: [], tags: ['re'], summary: 'A summary.', draft: false } },
];
const team: ContentRecord<any>[] = [
  { slug: 'aba', body: 't', frontmatter: { name: 'Aba', role: 'Founder', avatar: '/a.png', links: {}, skills: ['re'], order: 1 } },
];
const projects: RepoProject[] = [
  { name: 'ids', org: 'LaBackDoor', description: 'Sensor.', language: 'Python', stars: 0, url: 'https://github.com/LaBackDoor/ids' },
];
const lab: ContentRecord<any> = { slug: 'lab', body: 'l', frontmatter: { title: 'la backdoor', mission: 'Research.' } };

describe('buildVfs', () => {
  const root = buildVfs({ lab, blog, team, projects });

  it('creates a root dir with the expected top-level entries', () => {
    expect(root.type).toBe('dir');
    expect(root.path).toBe('/');
    const names = root.children.map((c) => c.name).sort();
    expect(names).toEqual(['blog', 'contact.md', 'lab.md', 'projects', 'team']);
  });

  it('places blog posts as files with real routes and previews', () => {
    const blogDir = root.children.find((c) => c.name === 'blog');
    expect(blogDir?.type).toBe('dir');
    const file = (blogDir as any).children[0];
    expect(file.name).toBe('2026-06-10-rust-loader.md');
    expect(file.path).toBe('/blog/2026-06-10-rust-loader.md');
    expect(file.route).toBe('/blog/2026-06-10-rust-loader');
    expect(file.preview).toContain('A summary.');
  });

  it('gives navigation dirs their listing routes', () => {
    const blogDir = root.children.find((c) => c.name === 'blog') as any;
    expect(blogDir.route).toBe('/blog');
  });

  it('handles a null lab gracefully (no lab.md)', () => {
    const r2 = buildVfs({ lab: null, blog: [], team: [], projects: [] });
    expect(r2.children.map((c) => c.name)).not.toContain('lab.md');
    expect(r2.children.map((c) => c.name)).toContain('contact.md');
  });
});

describe('buildVfs new sections', () => {
  it('adds research, publications, and news dirs when provided', () => {
    const root = buildVfs({
      lab: null,
      blog: [],
      team: [],
      projects: [],
      research: [{ slug: 'threat-detection', body: 'r', frontmatter: { title: 'Threat Detection', summary: 'sum', keywords: ['vuln'], order: 1 } }] as any,
      publications: [{ title: 'Paper X', authors: ['A'], venue: 'V', year: 2025, type: 'paper', links: {}, source: 'manual' }] as any,
      news: [{ slug: '2026-06-14-launch', body: 'n', frontmatter: { title: 'Launch', date: '2026-06-14', summary: 'live' } }] as any,
    });
    const names = root.children.map((c) => c.name);
    expect(names).toEqual(expect.arrayContaining(['research', 'publications', 'news']));
    const research = root.children.find((c) => c.name === 'research') as any;
    expect(research.route).toBe('/research');
    expect(research.children[0].route).toBe('/research/threat-detection');
    const pubs = root.children.find((c) => c.name === 'publications') as any;
    expect(pubs.route).toBe('/publications');
  });

  it('omits new dirs when their inputs are empty/absent (back-compat)', () => {
    const root = buildVfs({ lab: null, blog: [], team: [], projects: [] });
    const names = root.children.map((c) => c.name);
    expect(names).not.toContain('research');
    expect(names).not.toContain('news');
  });
});
