import '@testing-library/jest-dom/vitest';

// Node.js 26 exposes an experimental (and undefined) localStorage/sessionStorage
// that shadows jsdom's implementations. Restore jsdom's storage globals here.
if (typeof (global as any).jsdom !== 'undefined') {
  const jsdomWindow = (global as any).jsdom.window;
  if (jsdomWindow?.localStorage !== undefined) {
    Object.defineProperty(global, 'localStorage', {
      value: jsdomWindow.localStorage,
      writable: true,
      configurable: true,
    });
  }
  if (jsdomWindow?.sessionStorage !== undefined) {
    Object.defineProperty(global, 'sessionStorage', {
      value: jsdomWindow.sessionStorage,
      writable: true,
      configurable: true,
    });
  }
}
