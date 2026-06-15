import type { ScholarEntry } from './types';

interface SerpApiArticle {
  title?: string;
  link?: string;
  authors?: string;
  publication?: string;
  year?: string;
}

function normalizeTitle(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function parseScholarAuthor(json: unknown): ScholarEntry[] {
  const articles = (json as { articles?: SerpApiArticle[] } | null)?.articles;
  if (!Array.isArray(articles)) return [];
  const out: ScholarEntry[] = [];
  for (const a of articles) {
    if (!a.title) continue;
    // Some Scholar entries have no year; keep them (year = 0 → shown as "Undated").
    const parsed = Number.parseInt(String(a.year ?? ''), 10);
    const year = Number.isFinite(parsed) && parsed >= 1900 ? parsed : 0;
    out.push({
      title: a.title,
      authors: (a.authors ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      venue: a.publication ?? '',
      year,
      link: a.link,
    });
  }
  return out;
}

export function mergeEntries(lists: ScholarEntry[][]): ScholarEntry[] {
  const byTitle = new Map<string, ScholarEntry>();
  for (const list of lists) {
    for (const e of list) {
      const key = normalizeTitle(e.title);
      const existing = byTitle.get(key);
      if (!existing || e.year > existing.year) byTitle.set(key, e);
    }
  }
  return [...byTitle.values()].sort((a, b) => b.year - a.year);
}
