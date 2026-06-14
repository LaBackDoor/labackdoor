import type { VfsDir } from '@/vfs/types';

export interface OutputLine {
  kind: 'input' | 'output' | 'error';
  text: string;
}

export type Effect =
  | { type: 'none' }
  | { type: 'navigate'; route: string }
  | { type: 'theme'; choice: 'light' | 'dark' | 'system' };

export interface ShellState {
  cwd: string;
  lines: OutputLine[];
  history: string[];
}

export interface CommandResult {
  state: ShellState;
  effect: Effect;
}

export interface CommandContext {
  root: VfsDir;
  state: ShellState;
}

export interface HandlerResult {
  output?: OutputLine[];
  effect?: Effect;
  cwd?: string;
  clear?: boolean;
}

export type Handler = (args: string[], ctx: CommandContext) => HandlerResult;
