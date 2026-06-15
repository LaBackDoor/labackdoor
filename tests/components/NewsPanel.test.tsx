import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewsPanel } from '@/components/NewsPanel';

const news = [{ slug: 'n1', body: '', frontmatter: { title: 'Launch day', date: '2026-06-14', summary: 'live' } }] as any;
const activity = [{ kind: 'blog', title: 'A post', date: '2026-06-10', route: '/blog/x' }] as any;

describe('NewsPanel', () => {
  it('shows news headlines and recent activity', () => {
    render(<NewsPanel news={news} activity={activity} />);
    expect(screen.getByText(/Launch day/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /A post/i })).toHaveAttribute('href', '/blog/x');
  });
});
