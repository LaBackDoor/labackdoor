import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from '@/components/Nav';

describe('Nav', () => {
  it('renders the recruiter escape-hatch links', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    for (const label of ['Lab', 'Team', 'Research', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });
});
