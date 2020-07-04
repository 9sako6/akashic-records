import { BufferPool } from './BufferPool';
import { DiskManager } from './DiskManager';

export class Storage {
  bufferPool: BufferPool;
  diskManager: DiskManager;
  constructor() {
    this.bufferPool = new BufferPool();
    this.diskManager = new DiskManager();
  }
}
