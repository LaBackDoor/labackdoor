import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

import { Desktop } from '@/desktop/Desktop';
import { buildVfs } from '@/vfs/build-vfs';

const root = buildVfs({
  lab: { slug: 'lab', body: 'l', frontmatter: { title: 'la backdoor', mission: 'm' } } as any,
  blog: [{ slug: 'post', body: 'b', frontmatter: { title: 'P', date: '2026-01-01', authors: [], tags: [], summary: 's', draft: false } }] as any,
  team: [],
  projects: [],
});

function run(cmd: string) {
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: cmd } });
  fireEvent.keyDown(input, { key: 'Enter' });
}

describe('Desktop', () => {
  it('opens a window when the terminal runs open, and closes it', () => {
    render(<Desktop root={root} news={[]} activity={[]} />);
    expect(screen.queryByRole('dialog')).toBeNull();
    run('open blog');
    expect(screen.getByRole('dialog', { name: 'blog' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /close window/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('minimizes to the dock and restores', () => {
    render(<Desktop root={root} news={[]} activity={[]} />);
    run('open blog');
    fireEvent.click(screen.getByRole('button', { name: /minimize window/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /restore blog/i }));
    expect(screen.getByRole('dialog', { name: 'blog' })).toBeInTheDocument();
  });
});
