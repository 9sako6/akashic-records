import { Page } from './Page';

export class BufferPool {
  frame: Array<Page> = [];
  pageTable = {};
}
