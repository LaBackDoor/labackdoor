import { describe, it, expect } from 'vitest';
import { publicationsByMember } from '@/content/loader';
import type { Publication } from '@/content/types';

const pub: Publication = {
  title: 'x',
  authors: ['WC Elumelu'],
  venue: 'V',
  year: 2024,
  type: 'paper',
  links: {},
  source: 'scholar',
};

describe('publicationsByMember', () => {
  it('matches a publication by surname (case-insensitive)', () => {
    expect(publicationsByMember('Webster Elumelu', [pub]).length).toBe(1);
  });

  it('returns empty array when no publications match', () => {
    expect(publicationsByMember('Jane Doe', [pub]).length).toBe(0);
  });

  it('returns empty array when name is empty', () => {
    expect(publicationsByMember('', [pub]).length).toBe(0);
  });

  it('matches surname regardless of author name format', () => {
    const pubs: Publication[] = [
      { ...pub, authors: ['AK Orojo', 'WC Elumelu', 'OO Orojo'] },
    ];
    expect(publicationsByMember('Abanisenioluwa Orojo', pubs).length).toBe(1);
  });

  it('filters correctly when multiple pubs are present', () => {
    const pubs: Publication[] = [
      { ...pub, authors: ['WC Elumelu'] },
      { ...pub, title: 'y', authors: ['A Freeman'] },
    ];
    const result = publicationsByMember('Webster Elumelu', pubs);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('x');
  });
});
