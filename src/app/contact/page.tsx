import { ButtonLink, Card, PageHead } from '@/components/ui';

export const metadata = {
  title: 'Contact',
  description: 'Email, LinkedIn, Google Scholar, ORCID and GitHub for Abanisenioluwa Orojo. Open to Summer 2027 internships.',
};

const LINKS = [
  { label: 'Email', value: 'akorojo@labackdoor.com', href: 'mailto:akorojo@labackdoor.com' },
  { label: 'LinkedIn', value: 'abaniseorojo', href: 'https://www.linkedin.com/in/abaniseorojo/' },
  { label: 'Google Scholar', value: 'Publications and Citations', href: 'https://scholar.google.com/citations?user=c2Ctag4AAAAJ' },
  { label: 'GitHub', value: 'AKOrojo', href: 'https://github.com/AKOrojo' },
  { label: 'ORCID', value: '0009-0005-9448-1929', href: 'https://orcid.org/0009-0005-9448-1929' },
  { label: 'DBLP', value: 'Publication Record', href: 'https://dblp.org/pid/397/9457.html' },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="$ cat contact"
        title="Get in Touch"
        lede="I am looking for Summer 2027 internships in detection and response and AI security, and I am happy to talk research, collaboration or mentoring. Email is fastest."
      />
      <div className="container" style={{ paddingBottom: 'var(--s-8)' }}>
        <div className="cta-row" style={{ marginBottom: 'var(--s-6)' }}>
          <ButtonLink href="mailto:akorojo@labackdoor.com">Email Me</ButtonLink>
          <ButtonLink href="/abanisenioluwa-orojo-cv.pdf" variant="secondary" download>Download CV</ButtonLink>
        </div>
        <div className="grid-cards">
          {LINKS.map((l) => (
            <Card key={l.label} title={l.label} meta={l.value} href={l.href} />
          ))}
        </div>
      </div>
    </>
  );
}
