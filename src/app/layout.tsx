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
  title: { default: 'la backdoor', template: '%s · la backdoor' },
  description: 'Security research lab — data-driven threat detection, AI security, and network intelligence.',
  openGraph: {
    title: 'la backdoor',
    description: 'Security research lab — data-driven threat detection, AI security, and network intelligence.',
    url: 'https://labackdoor.com',
    siteName: 'la backdoor',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'la backdoor',
    description: 'Security research lab — threat detection, AI security, network intelligence.',
    images: ['/og.png'],
  },
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
      </body>
    </html>
  );
}
