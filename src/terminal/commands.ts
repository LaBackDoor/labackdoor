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

export const COMMANDS: Record<string, Handler> = { cd, clear, ls, pwd };

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
