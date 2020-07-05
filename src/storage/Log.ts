type Operator = 'INSERT' | 'DELETE' | 'UPDATE' | 'UNKNOWN';

type Value = string | boolean | number;

type LogData = {
  operator: Operator;
  columnId: number;
  value: Value;
};

export class Log {
  data: LogData;
  buffer: Uint8Array;
  byteLength: number;
  private encoder = new TextEncoder();
  private decoder = new TextDecoder('utf-8');

  constructor(operator: Operator, columnId: number, value: Value) {
    this.data = { operator, columnId, value };
    this.buffer = this.encoder.encode(JSON.stringify(this.data));
    this.byteLength = this.buffer.byteLength;
  }
}
