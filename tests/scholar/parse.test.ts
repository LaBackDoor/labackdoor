import { describe, it, expect } from 'vitest';
import fixture from './fixtures/serpapi-author.json';
import { parseScholarAuthor, mergeEntries } from '@/scholar/parse';

describe('parseScholarAuthor', () => {
  const entries = parseScholarAuthor(fixture);

  it('extracts title, authors, venue, year, link', () => {
    const e = entries.find((x) => x.title === 'Detecting staged malware loaders')!;
    expect(e.authors).toEqual(['A Orojo', 'J Doe']);
    expect(e.venue).toBe('Workshop on Systems Security, 2024');
    expect(e.year).toBe(2024);
    expect(e.link).toContain('scholar.google.com');
  });

  it('keeps articles without a parseable year (year 0)', () => {
    const e = entries.find((x) => x.title === 'No year article');
    expect(e).toBeDefined();
    expect(e!.year).toBe(0);
  });

  it('returns [] for malformed input', () => {
    expect(parseScholarAuthor({})).toEqual([]);
    expect(parseScholarAuthor(null)).toEqual([]);
  });
});

describe('mergeEntries', () => {
  it('dedupes across authors by normalized title, keeping highest year', () => {
    const a = [{ title: 'Shared Paper', authors: ['X'], venue: 'V', year: 2022 }];
    const b = [{ title: 'shared  paper', authors: ['X', 'Y'], venue: 'V', year: 2023 }];
    const merged = mergeEntries([a, b]);
    expect(merged.filter((e) => e.title.toLowerCase().includes('shared')).length).toBe(1);
    expect(merged[0].year).toBe(2023);
  });

  it('sorts newest year first', () => {
    const merged = mergeEntries([[{ title: 'Old', authors: [], venue: '', year: 2010 }, { title: 'New', authors: [], venue: '', year: 2024 }]]);
    expect(merged[0].title).toBe('New');
  });
});
