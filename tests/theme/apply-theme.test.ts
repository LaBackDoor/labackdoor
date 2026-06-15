import { describe, it, expect, beforeEach, vi } from 'vitest';
import { applyThemeChoice } from '@/theme/apply-theme';
import { THEME_STORAGE_KEY } from '@/theme/theme-script';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('applyThemeChoice', () => {
  it('sets and persists an explicit light/dark choice', () => {
    applyThemeChoice('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('system clears storage and applies the OS preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: true, media: q, addEventListener() {}, removeEventListener() {} }));
    applyThemeChoice('system');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    vi.unstubAllGlobals();
  });
});
