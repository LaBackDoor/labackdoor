'use client';

import { useState } from 'react';
import type { VfsDir } from '@/vfs/types';
import type { ContentRecord, NewsFrontmatter, ActivityItem } from '@/content/types';
import { Terminal } from '@/terminal/Terminal';
import { NewsPanel } from '@/components/NewsPanel';
import { Window } from './Window';
import { Dock } from './Dock';
import type { WindowState } from './types';

export function Desktop({
  root,
  news,
  activity,
}: {
  root: VfsDir;
  news: ContentRecord<NewsFrontmatter>[];
  activity: ActivityItem[];
}) {
  const [win, setWin] = useState<WindowState | null>(null);

  function openWindow(route: string, title: string) {
    setWin({ route, title, status: 'open' });
  }

  return (
    <>
      <Terminal root={root} onOpenWindow={openWindow} />
      <NewsPanel news={news} activity={activity} />
      {win && (
        <Window
          win={win}
          onClose={() => setWin(null)}
          onMinimize={() => setWin((w) => (w ? { ...w, status: 'minimized' } : w))}
          onToggleMax={() =>
            setWin((w) => (w ? { ...w, status: w.status === 'maximized' ? 'open' : 'maximized' } : w))
          }
        />
      )}
      <Dock win={win} onRestore={() => setWin((w) => (w ? { ...w, status: 'open' } : w))} />
    </>
  );
}
