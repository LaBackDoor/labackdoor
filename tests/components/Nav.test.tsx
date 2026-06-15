import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from '@/components/Nav';

describe('Nav', () => {
  it('renders the recruiter escape-hatch links', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    for (const label of ['Lab', 'Research', 'Publications', 'Blog', 'Team', 'Contact', 'CV']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('points Research at /research and Blog at /blog', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Research' })).toHaveAttribute('href', '/research');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });
});
