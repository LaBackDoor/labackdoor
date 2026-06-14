import { describe, it, expect } from 'vitest';
import { normalizePath, findNode } from '@/vfs/resolve';
import { buildVfs } from '@/vfs/build-vfs';

const root = buildVfs({
  lab: { slug: 'lab', body: 'l', frontmatter: { title: 'la backdoor', mission: 'm' } } as any,
  blog: [{ slug: 'post', body: 'b', frontmatter: { title: 'P', date: '2026-01-01', authors: [], tags: [], summary: 's', draft: false } }] as any,
  team: [],
  projects: [],
});

describe('normalizePath', () => {
  it('resolves absolute paths', () => {
    expect(normalizePath('/blog', '/team')).toBe('/team');
  });
  it('resolves relative paths against cwd', () => {
    expect(normalizePath('/', 'blog')).toBe('/blog');
    expect(normalizePath('/blog', 'post.md')).toBe('/blog/post.md');
  });
  it('handles . and ..', () => {
    expect(normalizePath('/blog', '..')).toBe('/');
    expect(normalizePath('/blog', '.')).toBe('/blog');
    expect(normalizePath('/blog', '../team')).toBe('/team');
  });
  it('treats ~ as root', () => {
    expect(normalizePath('/blog', '~')).toBe('/');
    expect(normalizePath('/blog', '~/team')).toBe('/team');
  });
  it('never goes above root', () => {
    expect(normalizePath('/', '../..')).toBe('/');
  });
  it('strips trailing slashes except root', () => {
    expect(normalizePath('/', 'blog/')).toBe('/blog');
    expect(normalizePath('/', '/')).toBe('/');
  });
});

describe('findNode', () => {
  it('finds the root', () => {
    expect(findNode(root, '/')?.type).toBe('dir');
  });
  it('finds a nested file', () => {
    const n = findNode(root, '/blog/post.md');
    expect(n?.type).toBe('file');
    expect(n?.name).toBe('post.md');
  });
  it('returns null for missing paths', () => {
    expect(findNode(root, '/blog/nope.md')).toBeNull();
  });
});
