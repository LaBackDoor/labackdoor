import type { z } from 'zod';
import type {
  blogFrontmatterSchema,
  teamFrontmatterSchema,
  labFrontmatterSchema,
  projectFrontmatterSchema,
  researchFrontmatterSchema,
  publicationFrontmatterSchema,
  preprintFrontmatterSchema,
  newsFrontmatterSchema,
} from './schema';

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type TeamFrontmatter = z.infer<typeof teamFrontmatterSchema>;
export type LabFrontmatter = z.infer<typeof labFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export interface ContentRecord<T> {
  slug: string;
  frontmatter: T;
  body: string;
}

export type ResearchFrontmatter = z.infer<typeof researchFrontmatterSchema>;
export type PublicationFrontmatter = z.infer<typeof publicationFrontmatterSchema>;
export type PreprintFrontmatter = z.infer<typeof preprintFrontmatterSchema>;
export type NewsFrontmatter = z.infer<typeof newsFrontmatterSchema>;

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  links: Record<string, string>;
  source: 'manual' | 'scholar';
}

export interface ActivityItem {
  kind: 'blog' | 'research' | 'publication' | 'news';
  title: string;
  date: string;
  route: string;
}

export interface RepoProject {
  name: string;
  org: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}
