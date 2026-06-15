import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NewsPage from '@/app/news/page';

describe('News page', () => {
  it('renders news items and a recent-activity section', () => {
    render(NewsPage());
    expect(screen.getAllByText(/la backdoor site launches/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /recent activity/i })).toBeInTheDocument();
  });
});
