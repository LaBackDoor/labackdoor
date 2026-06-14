import { describe, it, expect } from 'vitest';
import { getBlogPosts, getBlogPost, getTeamMembers } from '@/content/loader';

describe('content loader', () => {
  it('lists blog posts sorted newest-first', () => {
    const posts = getBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].frontmatter.title).toBe('Unpacking a Rust loader');
    expect(posts[0].slug).toBe('2026-06-10-rust-loader');
  });

  it('loads a single post by slug with body', () => {
    const post = getBlogPost('2026-06-10-rust-loader');
    expect(post).not.toBeNull();
    expect(post!.body).toContain('stage-2 payload');
  });

  it('returns null for unknown slug', () => {
    expect(getBlogPost('does-not-exist')).toBeNull();
  });

  it('lists team members', () => {
    const members = getTeamMembers();
    expect(members.some((m) => m.slug === 'abanisenioluwa')).toBe(true);
  });
});
