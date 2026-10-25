import { getAwards } from '@/content/loader';
import { AwardCard, PageHead, Timeline, TimelineItem } from '@/components/ui';

export const metadata = {
  title: 'Awards',
  description: 'Competition results, honors and grants: WaCode 2026 2nd place, Southwest CCDC 2nd place, National Cyber League Top 30.',
};

export default function AwardsPage() {
  const awards = getAwards();
  return (
    <>
      <PageHead
        eyebrow="$ cat awards.log"
        title="Awards and Honors"
        lede="Hackathons, cyber defense competitions, national rankings and academic honors."
      />
      <div className="container" style={{ paddingBottom: 'var(--s-8)' }}>
        <Timeline>
          {awards.map((a) => (
            <TimelineItem key={a.slug} year={a.frontmatter.year}>
              <AwardCard {...a.frontmatter} />
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </>
  );
}
