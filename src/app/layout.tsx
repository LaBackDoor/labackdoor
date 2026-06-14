import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'la backdoor',
  description: 'Security research lab — systems & malware, AI security, IDS.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
