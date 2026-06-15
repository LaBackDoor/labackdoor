import type {
  ContentRecord,
  BlogFrontmatter,
  TeamFrontmatter,
  LabFrontmatter,
  ProjectFrontmatter,
  ResearchFrontmatter,
  NewsFrontmatter,
  Publication,
} from '@/content/types';
import type { VfsDir, VfsFile, VfsNode } from './types';

export interface VfsInput {
  lab: ContentRecord<LabFrontmatter> | null;
  blog: ContentRecord<BlogFrontmatter>[];
  team: ContentRecord<TeamFrontmatter>[];
  projects: ContentRecord<ProjectFrontmatter>[];
  research?: ContentRecord<ResearchFrontmatter>[];
  publications?: Publication[];
  news?: ContentRecord<NewsFrontmatter>[];
}

const CONTACT_PREVIEW = ['email: b.korojo@gmail.com', 'github: github.com/LaBackDoor'].join('\n');

export function buildVfs(input: VfsInput): VfsDir {
  const children: VfsNode[] = [];

  if (input.lab) {
    children.push({
      type: 'file',
      name: 'lab.md',
      path: '/lab.md',
      route: '/lab',
      preview: `${input.lab.frontmatter.title}\n\n${input.lab.frontmatter.mission}\n\n(run \`open lab.md\` to read the full page)`,
    });
  }

  children.push({
    type: 'file',
    name: 'contact.md',
    path: '/contact.md',
    route: '/contact',
    preview: CONTACT_PREVIEW,
  });

  const blogFiles: VfsFile[] = input.blog.map((p) => ({
    type: 'file',
    name: `${p.slug}.md`,
    path: `/blog/${p.slug}.md`,
    route: `/blog/${p.slug}`,
    preview: `${p.frontmatter.title}\n${p.frontmatter.date} · ${p.frontmatter.tags.join(', ')}\n\n${p.frontmatter.summary}\n\n(run \`open\` to read the full post)`,
  }));
  children.push({ type: 'dir', name: 'blog', path: '/blog', route: '/blog', children: blogFiles });

  const teamFiles: VfsFile[] = input.team.map((m) => ({
    type: 'file',
    name: `${m.slug}.md`,
    path: `/team/${m.slug}.md`,
    route: `/team/${m.slug}`,
    preview: `${m.frontmatter.name} — ${m.frontmatter.role}\nskills: ${m.frontmatter.skills.join(', ')}\n\n(run \`open\` to view the full profile)`,
  }));
  children.push({ type: 'dir', name: 'team', path: '/team', route: '/team', children: teamFiles });

  const projectFiles: VfsFile[] = input.projects.map((p) => ({
    type: 'file',
    name: `${p.slug}.md`,
    path: `/projects/${p.slug}.md`,
    route: '/projects',
    preview: `${p.frontmatter.title} [${p.frontmatter.status}]\n\n${p.frontmatter.summary}`,
  }));
  children.push({ type: 'dir', name: 'projects', path: '/projects', route: '/projects', children: projectFiles });

  const research = input.research ?? [];
  if (research.length > 0) {
    const researchFiles: VfsFile[] = research.map((r) => ({
      type: 'file',
      name: `${r.slug}.md`,
      path: `/research/${r.slug}.md`,
      route: `/research/${r.slug}`,
      preview: `${r.frontmatter.title} [${r.frontmatter.status}]\n\n${r.frontmatter.summary}`,
    }));
    children.push({ type: 'dir', name: 'research', path: '/research', route: '/research', children: researchFiles });
  }

  const publications = input.publications ?? [];
  if (publications.length > 0) {
    const pubFiles: VfsFile[] = publications.map((p, i) => ({
      type: 'file',
      name: `${String(i + 1).padStart(2, '0')}-${p.year}.md`,
      path: `/publications/${String(i + 1).padStart(2, '0')}-${p.year}.md`,
      route: '/publications',
      preview: `${p.title}\n${p.authors.join(', ')}\n${p.venue} (${p.year})`,
    }));
    children.push({ type: 'dir', name: 'publications', path: '/publications', route: '/publications', children: pubFiles });
  }

  const news = input.news ?? [];
  if (news.length > 0) {
    const newsFiles: VfsFile[] = news.map((n) => ({
      type: 'file',
      name: `${n.slug}.md`,
      path: `/news/${n.slug}.md`,
      route: '/news',
      preview: `${n.frontmatter.date} — ${n.frontmatter.title}\n\n${n.frontmatter.summary}`,
    }));
    children.push({ type: 'dir', name: 'news', path: '/news', route: '/news', children: newsFiles });
  }

  return { type: 'dir', name: '', path: '/', children };
}
