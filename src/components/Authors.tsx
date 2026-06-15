import { Fragment } from 'react';

// Lab members (by surname) get their names bolded in author lists.
const LAB_MEMBER = /\b(orojo|elumelu)\b/i;

export function Authors({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((a, i) => (
        <Fragment key={i}>
          {i > 0 ? ', ' : ''}
          {LAB_MEMBER.test(a) ? <strong style={{ color: 'var(--fg)' }}>{a}</strong> : a}
        </Fragment>
      ))}
    </>
  );
}
