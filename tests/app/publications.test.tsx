import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicationsPage from '@/app/publications/page';

describe('Publications page', () => {
  it('renders the manual sample publication grouped under its year', () => {
    render(PublicationsPage());
    expect(screen.getByText(/A manual sample paper/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '2025' })).toBeInTheDocument();
  });
});
