import { Page } from './Page.ts';

export class BufferPool {
  frame: Array<Page> = [];
  pageTable = {};
}
