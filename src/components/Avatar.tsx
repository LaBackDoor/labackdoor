'use client';

import { useState } from 'react';

export function Avatar({ src, name, size = 48 }: { src?: string; name: string; size?: number }) {
  const [err, setErr] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (!src || err) {
    return (
      <div
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--bg-elev)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: Math.round(size * 0.36),
          fontWeight: 700,
          flex: 'none',
        }}
      >
        {initials}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setErr(true)}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)', flex: 'none' }}
    />
  );
}
