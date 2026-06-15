import { describe, it, expect } from 'vitest';
import { blogFrontmatterSchema, teamFrontmatterSchema } from '@/content/schema';
import { researchFrontmatterSchema, publicationFrontmatterSchema, newsFrontmatterSchema } from '@/content/schema';

describe('blogFrontmatterSchema', () => {
  it('accepts valid frontmatter', () => {
    const parsed = blogFrontmatterSchema.parse({
      title: 'Unpacking a Rust loader',
      date: '2026-06-10',
      authors: ['abanisenioluwa'],
      tags: ['re', 'rust'],
      summary: 'Tracing a staged payload.',
    });
    expect(parsed.title).toBe('Unpacking a Rust loader');
  });

  it('rejects missing title', () => {
    expect(() =>
      blogFrontmatterSchema.parse({ date: '2026-06-10', summary: 'x', authors: [], tags: [] }),
    ).toThrow();
  });
});

describe('teamFrontmatterSchema', () => {
  it('accepts valid member frontmatter', () => {
    const parsed = teamFrontmatterSchema.parse({
      name: 'Abanisenioluwa',
      role: 'Founder',
      avatar: '/avatars/aba.png',
      links: { github: 'https://github.com/x' },
      skills: ['re', 'ml'],
    });
    expect(parsed.role).toBe('Founder');
  });
});

describe('new section schemas', () => {
  it('research accepts valid frontmatter and defaults status', () => {
    const r = researchFrontmatterSchema.parse({ title: 'IDS sensor', summary: 's', started: '2026-01-01' });
    expect(r.status).toBe('active');
    expect(r.tags).toEqual([]);
  });

  it('publication requires a numeric year', () => {
    expect(() => publicationFrontmatterSchema.parse({ title: 'P', venue: 'V', year: 'nope' })).toThrow();
    const p = publicationFrontmatterSchema.parse({ title: 'P', venue: 'V', year: 2026 });
    expect(p.type).toBe('paper');
  });

  it('news requires a date', () => {
    const n = newsFrontmatterSchema.parse({ title: 'Talk', date: '2026-06-01', summary: 's' });
    expect(n.title).toBe('Talk');
    expect(() => newsFrontmatterSchema.parse({ title: 'x', summary: 's' })).toThrow();
  });
});
