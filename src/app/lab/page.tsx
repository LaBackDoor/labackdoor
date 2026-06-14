import { getLab } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Mdx } from '@/components/Mdx';

export default function LabPage() {
  const lab = getLab();
  const title = lab?.frontmatter.title ?? 'la backdoor';
  const mission = lab?.frontmatter.mission ?? '';
  return (
    <PageShell title={title} subtitle={mission}>
      {lab ? <Mdx source={lab.body} /> : <p>Lab overview coming soon.</p>}
    </PageShell>
  );
}
