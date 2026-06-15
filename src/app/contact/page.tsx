import { PageShell } from '@/components/PageShell';

export default function ContactPage() {
  return (
    <PageShell title="Contact" subtitle="$ cat ~/contact">
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, fontFamily: 'var(--font-mono), monospace' }}>
        <li>email: <a href="mailto:akorojo@labackdoor.com" style={{ color: 'var(--accent-2)' }}>akorojo@labackdoor.com</a></li>
        <li>github: <a href="https://github.com/LaBackDoor" style={{ color: 'var(--accent-2)' }}>github.com/LaBackDoor</a></li>
      </ul>
    </PageShell>
  );
}
