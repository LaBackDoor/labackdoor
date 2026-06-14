import { z } from 'zod';

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  authors: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  summary: z.string().min(1),
  draft: z.boolean().optional().default(false),
});

export const teamFrontmatterSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  avatar: z.string().min(1),
  links: z.record(z.string(), z.string()).default({}),
  skills: z.array(z.string()).default([]),
  order: z.number().optional(),
});

export const labFrontmatterSchema = z.object({
  title: z.string().min(1),
  mission: z.string().min(1),
});

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  status: z.enum(['active', 'archived']).default('active'),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
});
