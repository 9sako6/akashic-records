import * as util from 'util';

type Operator = 'INSERT' | 'DELETE' | 'UPDATE' | 'UNKNOWN';
type CharCode = number;

export class Log {
  buffer: Uint8Array;
  readonly COLUMN_ID_SIZE: number = 4;
  BUFFER_SIZE: number;
  /**
   * setting buffer
   */
  constructor(operator: Operator, columnId: number, value: string, size: number) { // TODO: when DELETE, value is not necessary
    // operator: 1 byte
    // columnId: `this.COLUMN_ID_SIZE` bytes
    // value: size bytes
    // EOL: 1 byte
    this.BUFFER_SIZE = 2 + size + this.COLUMN_ID_SIZE; // TODO: when buffer_size > page_size
    this.buffer = new Uint8Array(new ArrayBuffer(this.BUFFER_SIZE));

    this.buffer.set([
      this.operatorId(operator),
      ...this.string2buffer(String(columnId).padStart(this.COLUMN_ID_SIZE, '0')),
      ...this.string2buffer(value),
    ]);
    this.buffer.set(this.string2buffer('\n'), this.BUFFER_SIZE - 1);
  }

  string2buffer(source: string): Array<CharCode> {
    return Array.from({ length: source.length }, (_, i) => i)
      .map((offset: number) => source.codePointAt(offset)!);
  }

  buffer2string(buffer: Uint8Array): string {
    return new util.TextDecoder('utf-8').decode(buffer).replace(/\0/g, '');
  }

  operatorId(operator: Operator): number {
    switch (operator) {
      case 'INSERT':
        return 1;
      case 'DELETE':
        return 2;
      case 'UPDATE':
        return 3;
      default:
        return 4;
    }
  }

  operatorName(operatorId: number): Operator {
    switch (operatorId) {
      case 1:
        return 'INSERT';
      case 2:
        return 'DELETE';
      case 3:
        return 'UPDATE';
      default:
        return 'UNKNOWN';
    }
  }

  decode() {
    const columnIdBuf = this.buffer.slice(1, 1 + this.COLUMN_ID_SIZE);
    const valueBuf = this.buffer.slice(1 + this.COLUMN_ID_SIZE, this.BUFFER_SIZE - 1);
    return {
      operator: this.operatorName(this.buffer[0]),
      columnId: Number(this.buffer2string(columnIdBuf)),
      value: this.buffer2string(valueBuf),
    };
  }
}
