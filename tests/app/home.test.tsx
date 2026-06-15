import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

import Home from '@/app/page';

describe('Home page', () => {
  it('renders the terminal and news panel', () => {
    render(Home());
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/security research lab/i)).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /news and recent activity/i })).toBeInTheDocument();
  });

  it('opens a window from the terminal', () => {
    render(Home());
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'open blog' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByRole('dialog', { name: 'blog' })).toBeInTheDocument();
  });

  it('includes a no-JS fallback with section links', () => {
    const { container } = render(Home());
    const noscript = container.querySelector('noscript');
    expect(noscript).not.toBeNull();
    expect(noscript!.textContent).toContain('/research');
  });
});
