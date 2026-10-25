import { describe, it, expect } from 'vitest';
import { getAwards, getTalks } from '@/content/loader';

describe('awards and talks content', () => {
  it('loads awards newest first with a featured WaCode entry', () => {
    const awards = getAwards();
    expect(awards.length).toBeGreaterThan(0);
    const years = awards.map((a) => a.frontmatter.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(awards.some((a) => a.slug.includes('wacode') && a.frontmatter.featured)).toBe(true);
  });

  it('loads talks newest first and every linked local file exists', async () => {
    const fs = await import('node:fs');
    const talks = getTalks();
    expect(talks.some((t) => t.slug.includes('texas-security-workshop'))).toBe(true);
    for (const t of talks) {
      const local = [...Object.values(t.frontmatter.links), ...t.frontmatter.images].filter((l) => l.startsWith('/') && /\.[a-z0-9]+$/i.test(l));
      for (const l of local) expect(fs.existsSync(`public${l}`), l).toBe(true);
    }
  });
});
