import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeamIndex from '@/app/team/page';

describe('Team index', () => {
  it('renders a link to each member', () => {
    render(TeamIndex());
    expect(screen.getByRole('link', { name: /Abanisenioluwa/i })).toBeInTheDocument();
  });
});
