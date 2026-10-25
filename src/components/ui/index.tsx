import Link from 'next/link';
import type { ReactNode } from 'react';

export function Prompt({ children }: { children: ReactNode }) {
  return <p className="prompt">{children}</p>;
}

export function Section({
  eyebrow,
  title,
  href,
  hrefLabel = 'View All',
  children,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="section container">
      <div className="section-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        {href && (
          <Link href={href} className="link-more">
            {hrefLabel} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <header className="page-head container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  external,
  download,
}: {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  const cls = `btn btn-${variant}`;
  if (external || download || href.startsWith('mailto:') || href.endsWith('.pdf')) {
    return (
      <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...(download ? { download: true } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}

export function Badge({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'accent' | 'gold' }) {
  return <span className={tone === 'muted' ? 'badge' : `badge badge-${tone}`}>{children}</span>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <div className="stat-num">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function Card({
  title,
  href,
  meta,
  body,
  media,
  badges,
  actions,
  className = '',
}: {
  title: string;
  href?: string;
  meta?: string;
  body?: ReactNode;
  media?: string;
  badges?: ReactNode;
  actions?: { label: string; href: string }[];
  className?: string;
}) {
  const isExternal = href?.startsWith('http');
  return (
    <article className={`card ${className}`.trim()}>
      {media && <img className="card-media" src={media} alt="" loading="lazy" />}
      {badges && <div className="badge-row">{badges}</div>}
      {meta && <div className="card-meta">{meta}</div>}
      <h3 className="card-title">
        {href ? (
          isExternal ? (
            <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
          ) : (
            <Link href={href}>{title}</Link>
          )
        ) : (
          title
        )}
      </h3>
      {body && <p className="card-body">{body}</p>}
      {actions && actions.length > 0 && (
        <div className="card-actions">
          {actions.map((a) => (
            <a key={a.label} href={a.href} {...(a.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {a.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="timeline">{children}</ol>;
}

export function TimelineItem({ year, children }: { year: string | number; children: ReactNode }) {
  return (
    <li className="timeline-item">
      <div className="timeline-year">{year}</div>
      {children}
    </li>
  );
}

export function AwardCard({
  title,
  place,
  issuer,
  year,
  summary,
  link,
}: {
  title: string;
  place?: string;
  issuer: string;
  year: number;
  summary: string;
  link?: string;
}) {
  return (
    <Card
      className="award"
      title={title}
      href={link}
      meta={`${issuer} · ${year}`}
      body={summary}
      badges={place ? <Badge tone="gold">{place}</Badge> : undefined}
    />
  );
}

const KIND_LABEL = { talk: 'Talk', invited: 'Invited Talk', pitch: 'Pitch', poster: 'Poster' } as const;

export function TalkCard({
  title,
  event,
  venue,
  date,
  kind,
  summary,
  links,
  images,
}: {
  title: string;
  event: string;
  venue: string;
  date: string;
  kind: keyof typeof KIND_LABEL;
  summary: string;
  links: Record<string, string>;
  images: string[];
}) {
  const labels: Record<string, string> = { slides: 'View Slides', event: 'Event Page', code: 'Code', video: 'Watch Video', project: 'Project Page', live: 'Live App' };
  const actions = Object.entries(links).map(([k, href]) => ({ label: labels[k] ?? k, href }));
  return (
    <article className="card">
      <div className="badge-row">
        <Badge tone="accent">{KIND_LABEL[kind]}</Badge>
        <Badge>{date}</Badge>
      </div>
      <div className="card-meta">{event} · {venue}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{summary}</p>
      {images.length > 0 && (
        <div className="talk-slides">
          {images.map((src) => (
            <img key={src} src={src} alt={`Slide from ${event}`} loading="lazy" />
          ))}
        </div>
      )}
      {actions.length > 0 && (
        <div className="card-actions">
          {actions.map((a) => (
            <a key={a.label} href={a.href} {...(a.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {a.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function Hero({
  name,
  role,
  pitch,
  photo,
  availability,
  children,
  stats,
}: {
  name: string;
  role: string;
  pitch: string;
  photo: string;
  availability: string;
  children: ReactNode;
  stats: ReactNode;
}) {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="pill">
              <span className="dot" aria-hidden="true" />
              {availability}
            </span>
            <h1>{name}</h1>
            <p className="hero-role">{role}</p>
            <p className="hero-pitch">{pitch}</p>
            <div className="cta-row">{children}</div>
          </div>
          <img className="hero-photo" src={photo} alt={`Portrait of ${name}`} />
        </div>
        <div className="stats">{stats}</div>
      </div>
    </div>
  );
}
