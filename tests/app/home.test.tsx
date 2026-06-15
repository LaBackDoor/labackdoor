import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

import Home from '@/app/page';

describe('Home page', () => {
  it('renders the terminal with content from the loader', () => {
    render(Home());
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/security research lab/i)).toBeInTheDocument();
  });

  it('includes a no-JS fallback with section links', () => {
    const { container } = render(Home());
    const noscript = container.querySelector('noscript');
    expect(noscript).not.toBeNull();
    expect(noscript!.textContent).toContain('/blog');
  });
});
