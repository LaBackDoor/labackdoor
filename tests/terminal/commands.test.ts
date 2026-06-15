import { describe, it, expect } from 'vitest';
import { runCommand, formatPrompt } from '@/terminal/commands';
import { buildVfs } from '@/vfs/build-vfs';
import type { ShellState } from '@/terminal/types';

const root = buildVfs({
  lab: { slug: 'lab', body: 'l', frontmatter: { title: 'la backdoor', mission: 'm' } } as any,
  blog: [{ slug: 'post', body: 'b', frontmatter: { title: 'P', date: '2026-01-01', authors: [], tags: ['re'], summary: 'sumthing', draft: false } }] as any,
  team: [],
  projects: [],
});

const fresh = (): ShellState => ({ cwd: '/', lines: [], history: [] });

describe('formatPrompt', () => {
  it('shows ~ for root and ~/x for nested', () => {
    expect(formatPrompt('/')).toContain('~');
    expect(formatPrompt('/blog')).toContain('~/blog');
  });
});

describe('runCommand core', () => {
  it('echoes the input line', () => {
    const { state } = runCommand(root, fresh(), 'pwd');
    expect(state.lines[0].kind).toBe('input');
    expect(state.lines[0].text).toContain('pwd');
  });

  it('pwd prints the cwd', () => {
    const { state } = runCommand(root, { ...fresh(), cwd: '/blog' }, 'pwd');
    const out = state.lines.find((l) => l.kind === 'output');
    expect(out?.text).toBe('/blog');
  });

  it('ls lists children with trailing slash on dirs', () => {
    const { state } = runCommand(root, fresh(), 'ls');
    const out = state.lines.find((l) => l.kind === 'output')!;
    expect(out.text).toContain('blog/');
    expect(out.text).toContain('lab.md');
  });

  it('cd into a dir changes cwd', () => {
    const { state } = runCommand(root, fresh(), 'cd blog');
    expect(state.cwd).toBe('/blog');
  });

  it('cd into a file errors and keeps cwd', () => {
    const { state } = runCommand(root, fresh(), 'cd lab.md');
    expect(state.cwd).toBe('/');
    expect(state.lines.some((l) => l.kind === 'error')).toBe(true);
  });

  it('cd with no arg returns to root', () => {
    const start = { ...fresh(), cwd: '/blog' };
    const { state } = runCommand(root, start, 'cd');
    expect(state.cwd).toBe('/');
  });

  it('clear empties the scrollback', () => {
    const withLines = runCommand(root, fresh(), 'pwd').state;
    const { state } = runCommand(root, withLines, 'clear');
    expect(state.lines).toEqual([]);
  });

  it('unknown command errors', () => {
    const { state } = runCommand(root, fresh(), 'frobnicate');
    expect(state.lines.some((l) => l.kind === 'error' && l.text.includes('command not found'))).toBe(true);
  });

  it('records history (excluding empty input)', () => {
    let s = fresh();
    s = runCommand(root, s, 'pwd').state;
    s = runCommand(root, s, '   ').state;
    s = runCommand(root, s, 'ls').state;
    expect(s.history).toEqual(['pwd', 'ls']);
  });
});

describe('runCommand extra commands', () => {
  it('cat prints a file preview', () => {
    const { state } = runCommand(root, fresh(), 'cat lab.md');
    expect(state.lines.some((l) => l.kind === 'output' && l.text.includes('la backdoor'))).toBe(true);
  });

  it('cat on a dir errors', () => {
    const { state } = runCommand(root, fresh(), 'cat blog');
    expect(state.lines.some((l) => l.kind === 'error' && l.text.includes('Is a directory'))).toBe(true);
  });

  it('cat on a missing file errors', () => {
    const { state } = runCommand(root, fresh(), 'cat nope.md');
    expect(state.lines.some((l) => l.kind === 'error' && l.text.includes('No such file'))).toBe(true);
  });

  it('open returns an open-window effect with route and title', () => {
    const { effect } = runCommand(root, fresh(), 'open blog');
    expect(effect).toEqual({ type: 'open-window', route: '/blog', title: 'blog' });
  });

  it('open on a node without a route errors', () => {
    const { state, effect } = runCommand(root, fresh(), 'open .');
    expect(effect.type).toBe('none');
    expect(state.lines.some((l) => l.kind === 'error')).toBe(true);
  });

  it('theme parses a valid choice into a theme effect', () => {
    const { effect } = runCommand(root, fresh(), 'theme light');
    expect(effect).toEqual({ type: 'theme', choice: 'light' });
  });

  it('theme rejects an invalid choice', () => {
    const { state, effect } = runCommand(root, fresh(), 'theme rainbow');
    expect(effect.type).toBe('none');
    expect(state.lines.some((l) => l.kind === 'error')).toBe(true);
  });

  it('help lists available commands', () => {
    const { state } = runCommand(root, fresh(), 'help');
    const text = state.lines.map((l) => l.text).join('\n');
    expect(text).toContain('ls');
    expect(text).toContain('open');
    expect(text).toContain('theme');
  });

  it('whoami prints a bio line', () => {
    const { state } = runCommand(root, fresh(), 'whoami');
    expect(state.lines.some((l) => l.kind === 'output' && l.text.toLowerCase().includes('backdoor'))).toBe(true);
  });

  it('history prints prior commands', () => {
    let s = fresh();
    s = runCommand(root, s, 'pwd').state;
    s = runCommand(root, s, 'history').state;
    expect(s.lines.some((l) => l.text.includes('pwd'))).toBe(true);
  });
});

describe('terminal power-ups', () => {
  it('grep finds nodes by name or preview', () => {
    const { state } = runCommand(root, fresh(), 'grep lab');
    expect(state.lines.some((l) => l.kind === 'output' && l.text.includes('/lab.md'))).toBe(true);
  });

  it('find is an alias for grep', () => {
    const { state } = runCommand(root, fresh(), 'find blog');
    expect(state.lines.some((l) => l.kind === 'output' && l.text.includes('/blog'))).toBe(true);
  });

  it('cv opens the resume in a window', () => {
    const { effect } = runCommand(root, fresh(), 'cv');
    expect(effect).toEqual({ type: 'open-window', route: '/resume', title: 'resume' });
  });
});
