import './globals.css';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { THEME_INIT_SCRIPT } from '@/theme/theme-script';
import { Nav } from '@/components/Nav';
import { EmbedMode } from '@/components/EmbedMode';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  title: 'la backdoor',
  description: 'Security research lab — systems & malware, AI security, IDS.',
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
