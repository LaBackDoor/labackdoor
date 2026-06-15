import Link from 'next/link';
import { ThemeToggle } from '@/theme/ThemeToggle';

const LINKS: { href: string; label: string }[] = [
  { href: '/lab', label: 'Lab' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/blog', label: 'Blog' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '10px 18px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-elev)',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 14,
      }}
    >
      <Link
        href="/"
        aria-label="la backdoor home"
        style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
      >
        <span className="brand-mark" aria-hidden="true" />
        la_backdoor
      </Link>
      <div style={{ display: 'flex', gap: 16, marginLeft: 'auto', alignItems: 'center' }}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>
            {l.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
