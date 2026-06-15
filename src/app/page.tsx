import { getLab, getBlogPosts, getTeamMembers, getProjects } from '@/content/loader';
import { buildVfs } from '@/vfs/build-vfs';
import { Terminal } from '@/terminal/Terminal';

const NOSCRIPT_HTML = `
<nav aria-label="Site sections" style="padding:20px">
  <p>JavaScript is disabled. Browse the site directly:</p>
  <ul>
    <li><a href="/lab">/lab</a></li>
    <li><a href="/team">/team</a></li>
    <li><a href="/blog">/blog</a></li>
    <li><a href="/projects">/projects</a></li>
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
  });

  return (
    <>
      <Terminal root={root} />
      {/* eslint-disable-next-line react/no-danger */}
      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_HTML }} />
    </>
  );
}
