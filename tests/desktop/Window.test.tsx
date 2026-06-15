import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Window } from '@/desktop/Window';

const base = { route: '/blog/x', title: 'x.md', status: 'open' as const };

describe('Window', () => {
  it('renders the title and an iframe pointing at the route in window mode', () => {
    render(<Window win={base} onClose={() => {}} onMinimize={() => {}} onToggleMax={() => {}} />);
    expect(screen.getByText('x.md')).toBeInTheDocument();
    const frame = screen.getByTitle('x.md') as HTMLIFrameElement;
    expect(frame.tagName).toBe('IFRAME');
    expect(frame.getAttribute('src')).toBe('/blog/x/?window=1');
  });

  it('fires the control callbacks', () => {
    const onClose = vi.fn();
    const onMinimize = vi.fn();
    const onToggleMax = vi.fn();
    render(<Window win={base} onClose={onClose} onMinimize={onMinimize} onToggleMax={onToggleMax} />);
    fireEvent.click(screen.getByRole('button', { name: /close window/i }));
    fireEvent.click(screen.getByRole('button', { name: /minimize window/i }));
    fireEvent.click(screen.getByRole('button', { name: /maximize window/i }));
    expect(onClose).toHaveBeenCalled();
    expect(onMinimize).toHaveBeenCalled();
    expect(onToggleMax).toHaveBeenCalled();
  });

  it('renders nothing when minimized', () => {
    const { container } = render(
      <Window win={{ ...base, status: 'minimized' }} onClose={() => {}} onMinimize={() => {}} onToggleMax={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
