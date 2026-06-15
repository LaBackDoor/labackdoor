import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResearchIndex from '@/app/research/page';

describe('Research index', () => {
  it('renders a link to each research item', () => {
    render(ResearchIndex());
    expect(screen.getByRole('link', { name: /Low-overhead IDS sensor/i })).toBeInTheDocument();
  });
});
