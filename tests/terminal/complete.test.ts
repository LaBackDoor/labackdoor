import { describe, it, expect } from 'vitest';
import { complete } from '@/terminal/complete';
import { buildVfs } from '@/vfs/build-vfs';

const root = buildVfs({
  lab: { slug: 'lab', body: 'l', frontmatter: { title: 't', mission: 'm' } } as any,
  blog: [{ slug: 'post', body: 'b', frontmatter: { title: 'P', date: '2026-01-01', authors: [], tags: [], summary: 's', draft: false } }] as any,
  team: [],
  projects: [],
});

describe('complete', () => {
  it('completes command names when typing the first word', () => {
    expect(complete(root, '/', 'c')).toEqual(expect.arrayContaining(['cat', 'cd', 'clear']));
  });

  it('completes paths in cwd for an argument', () => {
    const candidates = complete(root, '/', 'cd b');
    expect(candidates).toContain('blog/');
  });

  it('completes files inside a nested dir', () => {
    const candidates = complete(root, '/', 'cat blog/p');
    expect(candidates).toContain('blog/post.md');
  });

  it('returns empty when nothing matches', () => {
    expect(complete(root, '/', 'cd zzz')).toEqual([]);
  });
});
