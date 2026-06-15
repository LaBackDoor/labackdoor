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
  cv: z.string().optional(),
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

export const researchFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  keywords: z.array(z.string()).default([]),
  links: z.record(z.string(), z.string()).default({}),
  order: z.number().optional(),
});

export const publicationFrontmatterSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string()).default([]),
  venue: z.string().min(1),
  year: z.number().int(),
  type: z.enum(['paper', 'preprint', 'disclosure']).default('paper'),
  links: z.record(z.string(), z.string()).default({}),
});

export const preprintFrontmatterSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string()).default([]),
  venue: z.string().default('Preprint'),
  year: z.number().int().optional(),
  links: z.record(z.string(), z.string()).default({}),
  area: z.string().optional(), // research-area slug this preprint belongs to
  order: z.number().optional(),
});

export const newsFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  summary: z.string().min(1),
  link: z.string().optional(),
});
