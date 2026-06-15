import { getPublications } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Authors } from '@/components/Authors';
import type { Publication } from '@/content/types';

function groupByYear(pubs: Publication[]): [number, Publication[]][] {
  const map = new Map<number, Publication[]>();
  for (const p of pubs) {
    const list = map.get(p.year) ?? [];
    list.push(p);
    map.set(p.year, list);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export default function PublicationsPage() {
  const groups = groupByYear(getPublications());
  return (
    <PageShell title="Publications" subtitle="$ ls ~/publications">
      {groups.length === 0 && <p style={{ color: 'var(--fg-muted)' }}>No publications yet.</p>}
      {groups.map(([year, pubs]) => (
        <section key={year} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: 'var(--accent)', fontFamily: 'var(--font-mono), monospace' }}>{year}</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14 }}>
            {pubs.map((p, i) => (
              <li key={`${p.title}-${i}`} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{p.title}</div>
                <div style={{ color: 'var(--fg-muted)', fontSize: 14 }}>
                  <Authors authors={p.authors} />{p.authors.length ? ' · ' : ''}{p.venue}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 4, fontFamily: 'var(--font-mono), monospace', fontSize: 12 }}>
                  <span style={{ color: 'var(--fg-muted)' }}>{p.type}</span>
                  {Object.entries(p.links).map(([k, v]) => (
                    <a key={k} href={v} style={{ color: 'var(--accent-2)' }}>{k}</a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
