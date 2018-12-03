import { ReactNode, Component } from 'react';

export interface ReactViewProps<C, H> {
  ctx: C;
  helper: H;
  [key: string]: any;
}

