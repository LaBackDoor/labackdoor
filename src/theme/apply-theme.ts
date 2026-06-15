import { THEME_STORAGE_KEY, resolveTheme, type ThemeChoice } from './theme-script';

// Applies a theme choice: mutates the <html data-theme> attribute and localStorage.
// 'system' removes the stored override and follows prefers-color-scheme.
export function applyThemeChoice(choice: ThemeChoice): void {
  if (choice === 'system') {
    localStorage.removeItem(THEME_STORAGE_KEY);
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', resolveTheme(null, dark));
    return;
  }
  localStorage.setItem(THEME_STORAGE_KEY, choice);
  document.documentElement.setAttribute('data-theme', choice);
}
