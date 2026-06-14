import { PageShell } from '@/components/PageShell';

export default function ContactPage() {
  return (
    <PageShell title="Contact" subtitle="$ cat ~/contact">
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, fontFamily: 'var(--font-mono), monospace' }}>
        <li>email: <a href="mailto:b.korojo@gmail.com" style={{ color: 'var(--accent-2)' }}>b.korojo@gmail.com</a></li>
        <li>github: <a href="https://github.com/example" style={{ color: 'var(--accent-2)' }}>github.com/example</a></li>
      </ul>
    </PageShell>
  );
}
