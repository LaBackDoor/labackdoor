import { describe, it, expect } from 'vitest';
import { buildVfs } from '@/vfs/build-vfs';
import type { ContentRecord } from '@/content/types';

const blog: ContentRecord<any>[] = [
  { slug: '2026-06-10-rust-loader', body: 'b', frontmatter: { title: 'Rust loader', date: '2026-06-10', authors: [], tags: ['re'], summary: 'A summary.', draft: false } },
];
const team: ContentRecord<any>[] = [
  { slug: 'aba', body: 't', frontmatter: { name: 'Aba', role: 'Founder', avatar: '/a.png', links: {}, skills: ['re'], order: 1 } },
];
const projects: ContentRecord<any>[] = [
  { slug: 'ids', body: 'p', frontmatter: { title: 'IDS', status: 'active', summary: 'Sensor.', tags: [] } },
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
