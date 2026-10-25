import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

import Home from '@/app/page';

describe('Home page', () => {
  it('leads with the recruiter hero: name, availability, CV and email', () => {
    render(Home());
    expect(screen.getByRole('heading', { level: 1, name: /Abanisenioluwa Orojo/ })).toBeInTheDocument();
    expect(screen.getByText(/Open to Summer 2027 internships/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Download CV/i })).toHaveAttribute('href', '/abanisenioluwa-orojo-cv.pdf');
    expect(screen.getByRole('link', { name: /Email me/i })).toHaveAttribute('href', 'mailto:akorojo@labackdoor.com');
  });

  it('shows awards and presentations, and still embeds the terminal', () => {
    render(Home());
    expect(screen.getByRole('heading', { name: 'Awards' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent Presentations' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
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
