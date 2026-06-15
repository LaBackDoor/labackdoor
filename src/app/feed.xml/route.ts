import { getBlogPosts } from '@/content/loader';

export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const base = 'https://labackdoor.com';
  const items = getBlogPosts()
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.frontmatter.title)}</title>
      <link>${base}/blog/${p.slug}/</link>
      <guid>${base}/blog/${p.slug}/</guid>
      <pubDate>${new Date(`${p.frontmatter.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(p.frontmatter.summary)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>la backdoor</title>
    <link>${base}/blog/</link>
    <description>Research notes and updates from la backdoor.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
