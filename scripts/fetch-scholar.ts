/**
 * Fetches both lab members' Google Scholar profiles via SerpAPI and writes
 * content/publications/scholar.generated.json. Run: `bun run fetch:scholar`.
 * Requires env SERPAPI_KEY.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseScholarAuthor, mergeEntries } from '../src/scholar/parse';
import type { ScholarEntry } from '../src/scholar/types';

const AUTHOR_IDS = ['c2Ctag4AAAAJ', 'ukgh9BkAAAAJ'];
const OUT_PATH = join(process.cwd(), 'content', 'publications', 'scholar.generated.json');

async function fetchAuthor(authorId: string, apiKey: string): Promise<ScholarEntry[]> {
  const url = new URL('https://serpapi.com/search.json');
  url.searchParams.set('engine', 'google_scholar_author');
  url.searchParams.set('author_id', authorId);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('num', '100');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SerpAPI ${authorId} failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return parseScholarAuthor(json);
}

async function main() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    console.error('SERPAPI_KEY is not set; aborting.');
    process.exit(1);
  }
  const lists: ScholarEntry[][] = [];
  for (const id of AUTHOR_IDS) {
    console.log(`Fetching Scholar author ${id}…`);
    lists.push(await fetchAuthor(id, apiKey));
  }
  const merged = mergeEntries(lists);
  writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${merged.length} publications to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
