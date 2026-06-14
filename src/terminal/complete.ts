import type { VfsDir } from '@/vfs/types';
import { normalizePath, findNode } from '@/vfs/resolve';
import { COMMAND_NAMES } from './commands';

// Returns candidate completions for the current input.
// - First word (no space yet): complete command names.
// - Otherwise: complete the final argument as a path within the VFS.
export function complete(root: VfsDir, cwd: string, input: string): string[] {
  if (!input.includes(' ')) {
    return COMMAND_NAMES.filter((c) => c.startsWith(input));
  }

  const parts = input.split(/\s+/);
  const partial = parts[parts.length - 1];
  const slash = partial.lastIndexOf('/');
  const base = slash >= 0 ? partial.slice(slash + 1) : partial;
  const prefix = slash >= 0 ? partial.slice(0, slash + 1) : '';
  const dirPart = slash >= 0 ? partial.slice(0, slash) : '';

  const dirPath = normalizePath(cwd, dirPart === '' ? '.' : dirPart);
  const node = findNode(root, dirPath);
  if (!node || node.type !== 'dir') return [];

  return node.children
    .filter((c) => c.name.startsWith(base))
    .map((c) => prefix + (c.type === 'dir' ? c.name + '/' : c.name));
}
