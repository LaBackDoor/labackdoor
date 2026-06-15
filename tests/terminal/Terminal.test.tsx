import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

import { Terminal } from '@/terminal/Terminal';
import { buildVfs } from '@/vfs/build-vfs';

const root = buildVfs({
  lab: { slug: 'lab', body: 'l', frontmatter: { title: 'la backdoor', mission: 'm' } } as any,
  blog: [{ slug: 'post', body: 'b', frontmatter: { title: 'P', date: '2026-01-01', authors: [], tags: [], summary: 's', draft: false } }] as any,
  team: [],
  projects: [],
});

function type(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } });
}

beforeEach(() => {
  push.mockClear();
});

describe('Terminal', () => {
  it('shows the welcome banner', () => {
    render(<Terminal root={root} />);
    expect(screen.getByText(/security research lab/i)).toBeInTheDocument();
  });

  it('runs a command on Enter and shows output', () => {
    render(<Terminal root={root} />);
    const input = screen.getByRole('textbox');
    type(input, 'ls');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText(/blog\//)).toBeInTheDocument();
  });

  it('navigates via router on `open`', () => {
    render(<Terminal root={root} />);
    const input = screen.getByRole('textbox');
    type(input, 'open blog');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(push).toHaveBeenCalledWith('/blog');
  });

  it('recalls the previous command with ArrowUp', () => {
    render(<Terminal root={root} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    type(input, 'pwd');
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('pwd');
  });
});
