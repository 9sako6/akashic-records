import { BufferPool } from './BufferPool.ts';
import { DiskManager } from './DiskManager.ts';

export class Storage {
  bufferPool: BufferPool;
  diskManager: DiskManager;

  constructor() {
    this.bufferPool = new BufferPool();
    this.diskManager = new DiskManager();
  }
}
