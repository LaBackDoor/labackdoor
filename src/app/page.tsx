import { getLab, getBlogPosts, getTeamMembers, getProjects, getResearch, getPublications, getNews, getRecentActivity } from '@/content/loader';
import { buildVfs } from '@/vfs/build-vfs';
import { Terminal } from '@/terminal/Terminal';
import { NewsPanel } from '@/components/NewsPanel';

const NOSCRIPT_HTML = `
<nav aria-label="Site sections" style="padding:20px">
  <p>JavaScript is disabled. Browse the site directly:</p>
  <ul>
    <li><a href="/lab">/lab</a></li>
    <li><a href="/research">/research</a></li>
    <li><a href="/publications">/publications</a></li>
    <li><a href="/blog">/blog</a></li>
    <li><a href="/news">/news</a></li>
    <li><a href="/team">/team</a></li>
    <li><a href="/contact">/contact</a></li>
  </ul>
</nav>
`;

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

  return (
    <>
      <Terminal root={root} />
      <NewsPanel news={getNews()} activity={getRecentActivity(8)} />
      {/* eslint-disable-next-line react/no-danger */}
      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_HTML }} />
    </>
  );
}
