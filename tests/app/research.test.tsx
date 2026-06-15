import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResearchIndex from '@/app/research/page';

describe('Research index', () => {
  it('renders a link to each research area', () => {
    render(ResearchIndex());
    expect(screen.getByRole('link', { name: /Threat Detection/i })).toBeInTheDocument();
  });
});
