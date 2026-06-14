import type { z } from 'zod';
import type {
  blogFrontmatterSchema,
  teamFrontmatterSchema,
  labFrontmatterSchema,
  projectFrontmatterSchema,
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
