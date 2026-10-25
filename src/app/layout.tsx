import './globals.css';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { THEME_INIT_SCRIPT } from '@/theme/theme-script';
import { Nav } from '@/components/Nav';
import { EmbedMode } from '@/components/EmbedMode';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  metadataBase: new URL('https://labackdoor.com'),
  title: { default: 'Abanisenioluwa Orojo · Security & AI Researcher', template: '%s · Abanisenioluwa Orojo' },
  description: 'Abanisenioluwa Orojo, PhD candidate at Baylor University: AI agents for autonomous vulnerability remediation, detection and response, SysRepair-Bench. Home of the la backdoor security lab.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Abanisenioluwa Orojo · Security & AI Researcher',
    description: 'Security research lab — data-driven threat detection, AI security, and network intelligence.',
    url: 'https://labackdoor.com',
    siteName: 'la backdoor',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abanisenioluwa Orojo · Security & AI Researcher',
    description: 'PhD candidate at Baylor. AI agents for autonomous vulnerability remediation, SysRepair-Bench, detection and response.',
    images: ['/og.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abanisenioluwa Orojo',
  alternateName: 'Abanisenioluwa Kolawole Orojo',
  url: 'https://labackdoor.com',
  jobTitle: 'PhD Candidate in Computer Science',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Baylor University' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Webster University' },
  knowsAbout: ['AI security', 'autonomous vulnerability remediation', 'threat detection', 'network security', 'reinforcement learning'],
  sameAs: [
    'https://www.linkedin.com/in/abaniseorojo/',
    'https://scholar.google.com/citations?user=c2Ctag4AAAAJ',
    'https://orcid.org/0009-0005-9448-1929',
    'https://dblp.org/pid/397/9457.html',
    'https://github.com/AKOrojo',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <EmbedMode />
        <Nav />
        {children}
        <footer className="site-footer">
          <div className="container">
            <span>© {new Date().getFullYear()} Abanisenioluwa Orojo · la backdoor, Central Texas Cyber Range, Baylor University</span>
            <span style={{ display: 'flex', gap: 'var(--s-4)', flexWrap: 'wrap' }}>
              <a href="/abanisenioluwa-orojo-cv.pdf">CV</a>
              <a href="mailto:akorojo@labackdoor.com">Email</a>
              <a href="https://www.linkedin.com/in/abaniseorojo/">LinkedIn</a>
              <a href="https://scholar.google.com/citations?user=c2Ctag4AAAAJ">Scholar</a>
              <a href="https://github.com/AKOrojo">GitHub</a>
            </span>
          </div>
        </footer>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      </body>
    </html>
  );
}
