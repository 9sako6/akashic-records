import { Log } from './Log';

export class Page {
  readonly PAGE_SIZE = 4096; // fixed-size (4 KiB)
  readonly data: Array<Log> = [];
  buffer = new Uint8Array(this.PAGE_SIZE);
  offset = 0;

  insertLog(log: Log): boolean {
    if (this.offset + log.buffer.byteLength < this.PAGE_SIZE) {
      this.data.push(log);
      return true;
    } else {
      return false;
    }
  }
  encode(): Uint8Array {
    this.data.forEach(log => {
      this.buffer.set(log.buffer, this.offset);
      this.offset += log.buffer.byteLength;
    });
    return this.buffer;
  }
}
