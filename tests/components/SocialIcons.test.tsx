import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialIcons } from '@/components/SocialIcons';

describe('SocialIcons', () => {
  it('renders a labeled link per platform with correct href', () => {
    render(<SocialIcons links={{ github: 'https://github.com/x', email: 'mailto:a@b.com' }} />);
    expect(screen.getByRole('link', { name: 'github' })).toHaveAttribute('href', 'https://github.com/x');
    expect(screen.getByRole('link', { name: 'email' })).toHaveAttribute('href', 'mailto:a@b.com');
  });
  it('renders nothing for empty links', () => {
    const { container } = render(<SocialIcons links={{}} />);
    expect(container.firstChild).toBeNull();
  });
});
