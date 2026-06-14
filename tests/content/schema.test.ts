import { describe, it, expect } from 'vitest';
import { blogFrontmatterSchema, teamFrontmatterSchema } from '@/content/schema';

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
