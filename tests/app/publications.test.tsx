import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicationsPage from '@/app/publications/page';

describe('Publications page', () => {
  it('renders the Publications heading', () => {
    render(PublicationsPage());
    expect(screen.getByRole('heading', { name: /publications/i })).toBeInTheDocument();
  });

  it('renders publications from scholar.generated.json', () => {
    // Publications come solely from the Google Scholar automation
    // (content/publications/scholar.generated.json)
    render(PublicationsPage());
    expect(screen.getByText(/ByteFlow/i)).toBeInTheDocument();
  });
});
