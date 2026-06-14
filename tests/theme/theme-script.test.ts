import { describe, it, expect } from 'vitest';
import { THEME_INIT_SCRIPT, resolveTheme } from '@/theme/theme-script';

describe('resolveTheme', () => {
  it('returns stored theme when set to light or dark', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('falls back to system pref when stored is system or null', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
});

describe('THEME_INIT_SCRIPT', () => {
  it('is a non-empty string referencing data-theme', () => {
    expect(typeof THEME_INIT_SCRIPT).toBe('string');
    expect(THEME_INIT_SCRIPT).toContain('data-theme');
  });
});
