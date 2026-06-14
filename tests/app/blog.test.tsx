import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogIndex from '@/app/blog/page';

describe('Blog index', () => {
  it('renders a link to each post', () => {
    render(BlogIndex());
    expect(screen.getByRole('link', { name: /Unpacking a Rust loader/i })).toBeInTheDocument();
  });
});
