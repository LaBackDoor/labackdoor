import type { VfsDir, VfsNode } from './types';

export function normalizePath(cwd: string, arg: string): string {
  const raw = arg.trim();
  let start: string[];
  let rest: string;
  if (raw === '~' || raw.startsWith('~/')) {
    start = [];
    rest = raw === '~' ? '' : raw.slice(2);
  } else if (raw.startsWith('/')) {
    start = [];
    rest = raw.slice(1);
  } else {
    start = cwd.split('/').filter(Boolean);
    rest = raw;
  }

  const segments = start.slice();
  for (const seg of rest.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') {
      segments.pop();
      continue;
    }
    segments.push(seg);
  }
  return segments.length === 0 ? '/' : '/' + segments.join('/');
}

export function findNode(root: VfsDir, path: string): VfsNode | null {
  if (path === '/') return root;
  const segments = path.split('/').filter(Boolean);
  let current: VfsNode = root;
  for (const seg of segments) {
    if (current.type !== 'dir') return null;
    const next: VfsNode | undefined = current.children.find((c) => c.name === seg);
    if (!next) return null;
    current = next;
  }
  return current;
}
