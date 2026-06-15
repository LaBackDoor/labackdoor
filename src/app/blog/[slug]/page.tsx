import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPost } from '@/content/loader';
import { PageShell } from '@/components/PageShell';
import { Mdx } from '@/components/Mdx';

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return { title: post?.frontmatter.title ?? 'Post', description: post?.frontmatter.summary };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return (
    <PageShell title={post.frontmatter.title} subtitle={`${post.frontmatter.date} · ${post.frontmatter.tags.join(', ')}`}>
      <Mdx source={post.body} />
    </PageShell>
  );
}
