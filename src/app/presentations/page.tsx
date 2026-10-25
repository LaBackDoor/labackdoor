import { getTalks } from '@/content/loader';
import { PageHead, TalkCard } from '@/components/ui';

export const metadata = {
  title: 'Presentations',
  description: 'Talks, pitches and slide decks: Texas Security Workshop 2026 and the WaCode 2026 hackathon.',
};

export default function PresentationsPage() {
  const talks = getTalks();
  return (
    <>
      <PageHead
        eyebrow="$ ls talks/"
        title="Presentations"
        lede="Conference talks, workshop presentations and pitches, with the full slides."
      />
      <div className="container" style={{ display: 'grid', gap: 'var(--s-5)', paddingBottom: 'var(--s-8)' }}>
        {talks.map((t) => (
          <TalkCard key={t.slug} {...t.frontmatter} />
        ))}
      </div>
    </>
  );
}
