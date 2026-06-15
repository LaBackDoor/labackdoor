import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Authors } from '@/components/Authors';

describe('Authors', () => {
  it('bolds lab members and leaves others plain', () => {
    const { container } = render(<Authors authors={['A K Orojo', 'Jane External', 'W C Elumelu']} />);
    const bold = [...container.querySelectorAll('strong')].map((s) => s.textContent);
    expect(bold).toContain('A K Orojo');
    expect(bold).toContain('W C Elumelu');
    expect(bold).not.toContain('Jane External');
    expect(container.textContent).toContain('Jane External');
  });
});
