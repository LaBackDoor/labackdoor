import type { VfsDir, VfsNode } from '@/vfs/types';
import { normalizePath, findNode } from '@/vfs/resolve';
import type { CommandContext, Effect, Handler, HandlerResult, OutputLine, ShellState, CommandResult } from './types';

export function formatPrompt(cwd: string): string {
  const display = cwd === '/' ? '~' : '~' + cwd;
  return `visitor@labackdoor:${display}$ `;
}

function out(text: string): OutputLine {
  return { kind: 'output', text };
}
function err(text: string): OutputLine {
  return { kind: 'error', text };
}

function resolve(ctx: CommandContext, arg: string | undefined, fallback: string): VfsNode | null {
  const path = normalizePath(ctx.state.cwd, arg ?? fallback);
  return findNode(ctx.root, path);
}

const ls: Handler = (args, ctx) => {
  const target = resolve(ctx, args[0], '.');
  if (!target) return { output: [err(`ls: ${args[0]}: No such file or directory`)] };
  if (target.type === 'file') return { output: [out(target.name)] };
  if (target.children.length === 0) return {};
  const names = target.children.map((c) => (c.type === 'dir' ? c.name + '/' : c.name));
  return { output: [out(names.join('  '))] };
};

const cd: Handler = (args, ctx) => {
  if (!args[0]) return { cwd: '/' };
  const path = normalizePath(ctx.state.cwd, args[0]);
  const node = findNode(ctx.root, path);
  if (!node) return { output: [err(`cd: ${args[0]}: No such file or directory`)] };
  if (node.type !== 'dir') return { output: [err(`cd: ${args[0]}: Not a directory`)] };
  return { cwd: path };
};

const pwd: Handler = (_args, ctx) => ({ output: [out(ctx.state.cwd)] });

const clear: Handler = () => ({ clear: true });

const cat: Handler = (args, ctx) => {
  if (!args[0]) return { output: [err('cat: missing operand')] };
  const node = resolve(ctx, args[0], '.');
  if (!node) return { output: [err(`cat: ${args[0]}: No such file or directory`)] };
  if (node.type === 'dir') return { output: [err(`cat: ${args[0]}: Is a directory`)] };
  return { output: node.preview.split('\n').map(out) };
};

const open: Handler = (args, ctx) => {
  const node = resolve(ctx, args[0], '.');
  if (!node) return { output: [err(`open: ${args[0]}: No such file or directory`)] };
  if (!node.route) return { output: [err(`open: ${args[0] ?? '.'}: nothing to open here`)] };
  return { effect: { type: 'open-window', route: node.route, title: node.name || node.route } };
};

const theme: Handler = (args) => {
  const choice = args[0];
  if (choice === 'light' || choice === 'dark' || choice === 'system') {
    return { output: [out(`theme set to ${choice}`)], effect: { type: 'theme', choice } };
  }
  return { output: [err('usage: theme <light|dark|system>')] };
};

const whoami: Handler = () => ({
  output: [out('Abanisenioluwa — founder, la backdoor. systems & malware, AI security, IDS.')],
});

const history: Handler = (_args, ctx) =>
  ctx.state.history.length === 0
    ? {}
    : { output: ctx.state.history.map((h, i) => out(`${String(i + 1).padStart(4)}  ${h}`)) };

const neofetch: Handler = () => ({
  output: [
    '   _       _                _      _                 ',
    '  | | __ _| |__   __ _  ___| | ___| | ___   ___  _ __',
    '  | |/ _` | "_ \\ / _` |/ __| |/ / _ | / _ \\ / _ \\| "__|',
    '  | | (_| | |_) | (_| | (__|   <  __/ | (_) | (_) | |  ',
    '  |_|\\__,_|_.__/ \\__,_|\\___|_|\\_\\___|_|\\___/ \\___/|_|  ',
    '',
    '  lab .......... la backdoor',
    '  focus ........ systems & malware · AI security · IDS',
    '  shell ........ labsh 1.0 (web)',
    '  uptime ....... always researching',
  ].map(out),
});

const secret: Handler = () => ({
  output: [out('you found it. the best backdoor is a well-read README. `open blog`.')],
});

function walkVfs(node: VfsNode, acc: VfsNode[]): void {
  acc.push(node);
  if (node.type === 'dir') for (const c of node.children) walkVfs(c, acc);
}

const grep: Handler = (args, ctx) => {
  const term = args.join(' ').trim().toLowerCase();
  if (!term) return { output: [err('usage: grep <term>')] };
  const all: VfsNode[] = [];
  for (const c of ctx.root.children) walkVfs(c, all);
  const hits = all.filter(
    (n) => n.name.toLowerCase().includes(term) || (n.type === 'file' && n.preview.toLowerCase().includes(term)),
  );
  if (hits.length === 0) return { output: [out(`no matches for "${term}"`)] };
  return { output: hits.slice(0, 25).map((n) => out(`${n.path}${n.type === 'dir' ? '/' : ''}`)) };
};

const cv: Handler = () => ({
  output: [out('opening resume…')],
  effect: { type: 'open-window', route: '/resume', title: 'resume' },
});

const help: Handler = () => {
  const rows: Array<[string, string]> = [
    ['ls [path]', 'list directory contents'],
    ['cd [path]', 'change directory (no arg = home)'],
    ['pwd', 'print working directory'],
    ['cat <file>', 'show a file preview'],
    ['open <path>', 'open the real page for a file/section'],
    ['grep <term>', 'search the filesystem (alias: find)'],
    ['cv', 'open the resume / CV'],
    ['theme <light|dark|system>', 'switch color theme'],
    ['whoami', 'about the author'],
    ['history', 'show command history'],
    ['clear', 'clear the screen'],
    ['neofetch', 'lab banner'],
    ['help', 'show this help'],
  ];
  return { output: rows.map(([c, d]) => out(`  ${c.padEnd(28)}${d}`)) };
};

export const COMMANDS: Record<string, Handler> = {
  cat,
  cd,
  clear,
  cv,
  find: grep,
  grep,
  help,
  history,
  ls,
  neofetch,
  open,
  pwd,
  resume: cv,
  secret,
  theme,
  whoami,
};

export const COMMAND_NAMES: string[] = Object.keys(COMMANDS).sort();

export function welcomeLines(): OutputLine[] {
  return [
    out('la backdoor // security research lab'),
    out("type `help` to get started, or `ls` to look around."),
  ];
}

export function runCommand(root: VfsDir, state: ShellState, raw: string): CommandResult {
  const input = raw.trim();
  const echo: OutputLine = { kind: 'input', text: formatPrompt(state.cwd) + raw };

  if (input === '') {
    return { state: { ...state, lines: [...state.lines, echo] }, effect: { type: 'none' } };
  }

  const history = [...state.history, input];
  const [cmd, ...args] = input.split(/\s+/);
  const handler = COMMANDS[cmd];

  if (!handler) {
    const error = err(`command not found: ${cmd} (try \`help\`)`);
    return { state: { ...state, lines: [...state.lines, echo, error], history }, effect: { type: 'none' } };
  }

  const r: HandlerResult = handler(args, { root, state });

  if (r.clear) {
    return { state: { ...state, lines: [], history }, effect: { type: 'none' } };
  }

  const effect: Effect = r.effect ?? { type: 'none' };
  const cwd = r.cwd ?? state.cwd;
  const lines = [...state.lines, echo, ...(r.output ?? [])];
  return { state: { ...state, cwd, lines, history }, effect };
}
