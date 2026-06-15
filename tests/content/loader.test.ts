import { describe, it, expect } from 'vitest';
import { getBlogPosts, getBlogPost, getTeamMembers } from '@/content/loader';
import { getResearch, getResearchItem, getPublications, getNews, getRecentActivity } from '@/content/loader';

describe('content loader', () => {
  it('lists blog posts sorted newest-first', () => {
    const posts = getBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].frontmatter.title).toBe('Welcome to la backdoor');
    expect(posts[0].slug).toBe('2026-06-14-welcome');
  });

  it('loads a single post by slug with body', () => {
    const post = getBlogPost('2026-06-14-welcome');
    expect(post).not.toBeNull();
    expect(post!.body).toContain('security research lab');
  });

  it('returns null for unknown slug', () => {
    expect(getBlogPost('does-not-exist')).toBeNull();
  });

  it('lists team members', () => {
    const members = getTeamMembers();
    expect(members.some((m) => m.slug === 'abanisenioluwa')).toBe(true);
  });
});

describe('new section loaders', () => {
  it('lists research items', () => {
    expect(getResearch().some((r) => r.slug === 'vulnerability-forecasting')).toBe(true);
  });

  it('loads a single research item with body', () => {
    const r = getResearchItem('vulnerability-forecasting');
    expect(r).not.toBeNull();
    expect(r!.body).toContain('Multi-Recurrent');
  });

  it('returns publications as an array (Scholar-driven via scholar.generated.json)', () => {
    const pubs = getPublications();
    expect(Array.isArray(pubs)).toBe(true);
    expect(pubs.every((p) => typeof p.year === 'number')).toBe(true);
  });

  it('sorts publications newest-year first', () => {
    const years = getPublications().map((p) => p.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it('lists news newest-first', () => {
    const news = getNews();
    expect(news.length).toBeGreaterThan(0);
    expect(news[0].frontmatter.date >= news[news.length - 1].frontmatter.date).toBe(true);
  });

  it('aggregates recent activity across sections with routes', () => {
    const activity = getRecentActivity(10);
    expect(activity.length).toBeGreaterThan(0);
    expect(activity.every((a) => a.route.startsWith('/'))).toBe(true);
    const dates = activity.map((a) => a.date);
    expect(dates).toEqual([...dates].sort((a, b) => (a < b ? 1 : -1)));
  });
});
