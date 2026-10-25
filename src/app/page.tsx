import Link from 'next/link';
import { getAwards, getTalks, getBlogPosts, getTeamMembers, getProjects, getResearch, getPublications, getNews, getPreprints, getLab } from '@/content/loader';
import { buildVfs } from '@/vfs/build-vfs';
import { Desktop } from '@/desktop/Desktop';
import { AwardCard, ButtonLink, Card, Hero, Section, Stat, TalkCard } from '@/components/ui';

const NOSCRIPT_HTML = `
<nav aria-label="Site sections" style="padding:20px">
  <p>JavaScript is disabled. Browse the site directly:</p>
  <ul>
    <li><a href="/research">/research</a></li>
    <li><a href="/publications">/publications</a></li>
    <li><a href="/presentations">/presentations</a></li>
    <li><a href="/awards">/awards</a></li>
    <li><a href="/blog">/blog</a></li>
    <li><a href="/lab">/lab</a></li>
    <li><a href="/contact">/contact</a></li>
  </ul>
</nav>
`;

const CV = '/abanisenioluwa-orojo-cv.pdf';

export default function Home() {
  const root = buildVfs({
    lab: getLab(),
    blog: getBlogPosts(),
    team: getTeamMembers(),
    projects: getProjects(),
    research: getResearch(),
    publications: getPublications(),
    news: getNews(),
  });
  const preprints = getPreprints().slice(0, 3);
  const awards = getAwards().filter((a) => a.frontmatter.featured);
  const talks = getTalks().filter((t) => t.frontmatter.featured);
  const pubs = getPublications().filter((p) => p.year > 0).slice(0, 5);
  const news = getNews().slice(0, 3);

  return (
    <main>
      <Hero
        name="Abanisenioluwa Orojo"
        role="PhD Candidate, Baylor University · Security & AI Researcher"
        pitch="I build and evaluate AI agents that find and fix vulnerabilities on live systems, and the cyber ranges, benchmarks and detection tooling around them. Creator of SysRepair-Bench, 313 reproducible attack-and-repair scenarios."
        photo="/avatars/akorojo.jpg"
        availability="Open to Summer 2027 Internships · Detection & Response, AI Security"
        stats={
          <>
            <Stat value="313" label="Scenarios in SysRepair-Bench" />
            <Stat value="Multi-Site" label="GPU Training for RL Self-Play" />
            <Stat value="10+" label="Papers and Preprints" />
            <Stat value="2nd" label="WaCode 2026 · SWCCDC 2025" />
          </>
        }
      >
        <ButtonLink href={CV} download>Download CV</ButtonLink>
        <ButtonLink href="/publications" variant="secondary">Read the Papers</ButtonLink>
        <ButtonLink href="mailto:akorojo@labackdoor.com" variant="secondary">Email Me</ButtonLink>
        <ButtonLink href="https://www.linkedin.com/in/abaniseorojo/" variant="ghost" external>LinkedIn ↗</ButtonLink>
      </Hero>

      <Section eyebrow="$ ls research/" title="Selected Research" href="/research" hrefLabel="All Research">
        <div className="grid-cards">
          <Card
            title="SysRepair-Bench"
            meta="Benchmark · ICLR 2027 (Under Review)"
            body="313 Dockerized and VM scenarios scored on two objectives: the exploit is closed and the service still serves. Six agent architectures evaluated."
            href="/research/autonomous-remediation"
            actions={[{ label: 'Code', href: 'https://github.com/CybearsecurityLab/sysrepair-bench' }]}
          />
          <Card
            title="NeuroPlan"
            meta="Solver · Neural-Symbolic"
            body="Lifts a live host into PDDL via osquery and runs a precondition-checked plan an operator can review first. 76% end-to-end remediation."
            href="/research/autonomous-remediation"
          />
          <Card
            title="ByteFlow"
            meta="ACSAC Workshops 2025"
            body="A byte-level LLM for deep packet inspection and network traffic intelligence."
            href="/research/network-intelligence"
          />
          <Card
            title="Red/Blue Self-Play RL"
            meta="2026 – Present"
            body="Asynchronous attacker/defender training on a multi-site GPU cluster."
            href="/research/ai-security"
          />
        </div>
      </Section>

      <Section eyebrow="$ cat awards.log" title="Awards" href="/awards">
        <div className="grid-cards">
          {awards.map((a) => (
            <AwardCard key={a.slug} {...a.frontmatter} />
          ))}
        </div>
      </Section>

      <Section eyebrow="$ ls talks/" title="Recent Presentations" href="/presentations">
        <div className="grid-cards">
          {talks.map((t) => (
            <TalkCard key={t.slug} {...t.frontmatter} />
          ))}
        </div>
      </Section>

      <Section eyebrow="$ git log --papers" title="Latest Publications" href="/publications">
        <div className="grid-cards">
          {preprints.map((p) => (
            <Card
              key={p.slug}
              title={p.frontmatter.title}
              meta={p.frontmatter.venue}
              actions={Object.entries(p.frontmatter.links).map(([label, href]) => ({ label, href }))}
            />
          ))}
          {pubs.slice(0, 3).map((p) => (
            <Card key={p.title} title={p.title} meta={`${p.venue.split(',')[0]} · ${p.year}`} href={p.links.scholar} />
          ))}
        </div>
      </Section>

      {news.length > 0 && (
        <Section eyebrow="$ tail news.log" title="News" href="/news">
          <div className="grid-cards">
            {news.map((n) => (
              <Card key={n.slug} title={n.frontmatter.title} meta={n.frontmatter.date} body={n.frontmatter.summary} href={n.frontmatter.link} />
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="$ ssh visitor@labackdoor" title="Poke Around in the Shell">
        <p className="prompt" style={{ marginBottom: 'var(--s-4)' }}>type help to see commands, or <Link href="/lab">read about the lab</Link></p>
        <Desktop root={root} />
      </Section>
      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_HTML }} />
    </main>
  );
}
