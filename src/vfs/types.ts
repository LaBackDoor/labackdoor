export interface VfsBase {
  name: string;
  path: string;        // absolute vfs path, e.g. "/blog/x.md" ("/" for root)
  route?: string;      // real site URL that `open` navigates to (optional)
}

export interface VfsFile extends VfsBase {
  type: 'file';
  preview: string;     // text shown by `cat`
}

export interface VfsDir extends VfsBase {
  type: 'dir';
  children: VfsNode[];
}

export type VfsNode = VfsDir | VfsFile;
