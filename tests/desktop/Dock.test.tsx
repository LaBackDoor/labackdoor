import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dock } from '@/desktop/Dock';

describe('Dock', () => {
  it('renders nothing when there is no minimized window', () => {
    const { container } = render(<Dock win={null} onRestore={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows a pill for a minimized window and restores on click', () => {
    const onRestore = vi.fn();
    render(<Dock win={{ route: '/blog/x', title: 'x.md', status: 'minimized' }} onRestore={onRestore} />);
    fireEvent.click(screen.getByRole('button', { name: /restore x\.md/i }));
    expect(onRestore).toHaveBeenCalled();
  });

  it('renders nothing when the window is open (not minimized)', () => {
    const { container } = render(<Dock win={{ route: '/x', title: 'x', status: 'open' }} onRestore={() => {}} />);
    expect(container.firstChild).toBeNull();
  });
});
