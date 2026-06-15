import type { MetadataRoute } from 'next';
import { getBlogPosts, getTeamMembers, getResearch } from '@/content/loader';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://labackdoor.com';
  const staticPaths = ['', '/lab', '/research', '/publications', '/blog', '/news', '/team', '/projects', '/contact'];
  const out: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}/`,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
  for (const b of getBlogPosts()) out.push({ url: `${base}/blog/${b.slug}/` });
  for (const m of getTeamMembers()) out.push({ url: `${base}/team/${m.slug}/` });
  for (const a of getResearch()) out.push({ url: `${base}/research/${a.slug}/` });
  return out;
}
