import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/Mdx', () => ({
  Mdx: ({ source }: { source: string }) => <div data-testid="mdx">{source}</div>,
}));

import LabPage from '@/app/lab/page';

describe('Lab page', () => {
  it('renders the lab title', () => {
    render(LabPage());
    expect(screen.getByRole('heading', { name: /la backdoor/i })).toBeInTheDocument();
  });
});
