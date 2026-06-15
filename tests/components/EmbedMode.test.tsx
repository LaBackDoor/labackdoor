import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { EmbedMode } from '@/components/EmbedMode';

beforeEach(() => {
  document.body.removeAttribute('data-embed');
  window.history.replaceState({}, '', '/');
});

describe('EmbedMode', () => {
  it('sets body[data-embed] when ?window=1 is present', () => {
    window.history.replaceState({}, '', '/blog/x?window=1');
    render(<EmbedMode />);
    expect(document.body.getAttribute('data-embed')).toBe('1');
  });

  it('does not set it otherwise', () => {
    window.history.replaceState({}, '', '/blog/x');
    render(<EmbedMode />);
    expect(document.body.getAttribute('data-embed')).toBeNull();
  });
});
