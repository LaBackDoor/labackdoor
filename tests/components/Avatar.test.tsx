import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/Avatar';

describe('Avatar', () => {
  it('renders an image when src is given', () => {
    render(<Avatar src="/avatars/x.jpg" name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute('src', '/avatars/x.jpg');
  });
  it('renders initials when no src', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
