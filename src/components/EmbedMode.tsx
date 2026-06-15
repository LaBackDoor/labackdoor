'use client';

import { useEffect } from 'react';

// When a page is rendered inside a desktop window (iframe with ?window=1),
// mark the body so CSS can hide the global nav for a clean embedded view.
export function EmbedMode() {
  useEffect(() => {
    const embedded = new URLSearchParams(window.location.search).get('window') === '1';
    if (embedded) document.body.setAttribute('data-embed', '1');
    return () => document.body.removeAttribute('data-embed');
  }, []);
  return null;
}
