export type WindowStatus = 'open' | 'minimized' | 'maximized';

export interface WindowState {
  route: string;
  title: string;
  status: WindowStatus;
}
