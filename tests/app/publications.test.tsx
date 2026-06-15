import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicationsPage from '@/app/publications/page';

describe('Publications page', () => {
  it('renders the Publications heading', () => {
    render(PublicationsPage());
    expect(screen.getByRole('heading', { name: /publications/i })).toBeInTheDocument();
  });

  it('shows an empty state when there are no publications (Scholar-driven, none yet)', () => {
    // Publications come solely from the Google Scholar automation
    // (content/publications/scholar.generated.json); with none synced it is empty.
    render(PublicationsPage());
    expect(screen.getByText(/no publications yet/i)).toBeInTheDocument();
  });
});
