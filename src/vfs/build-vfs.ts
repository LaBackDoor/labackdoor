import type {
  ContentRecord,
  BlogFrontmatter,
  TeamFrontmatter,
  LabFrontmatter,
  ProjectFrontmatter,
} from '@/content/types';
import type { VfsDir, VfsFile, VfsNode } from './types';

export interface VfsInput {
  lab: ContentRecord<LabFrontmatter> | null;
  blog: ContentRecord<BlogFrontmatter>[];
  team: ContentRecord<TeamFrontmatter>[];
  projects: ContentRecord<ProjectFrontmatter>[];
}

const CONTACT_PREVIEW = ['email: b.korojo@gmail.com', 'github: github.com/example'].join('\n');

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

  return { type: 'dir', name: '', path: '/', children };
}
