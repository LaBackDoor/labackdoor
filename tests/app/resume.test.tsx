import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/Mdx', () => ({ Mdx: () => null }));

import ResumePage from '@/app/resume/page';

describe('Resume page', () => {
  it('shows a CV download link', () => {
    render(ResumePage());
    expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute('href', '/abanisenioluwa-orojo-cv.pdf');
  });
});
