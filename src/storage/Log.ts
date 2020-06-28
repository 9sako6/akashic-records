import * as bson from 'bson';

type Operator = 'INSERT' | 'DELETE' | 'UPDATE' | 'UNKNOWN';

type Value = string | boolean | number;

type LogData = {
  operator: Operator;
  columnId: number;
  value: Value;
};

export class Log {
  data: LogData;
  buffer: Buffer;
  byteLength: number;
  constructor(operator: Operator, columnId: number, value: Value) {
    this.data = { operator, columnId, value };
    this.buffer = bson.serialize(this.data);
    this.byteLength = this.buffer.byteLength;
  }
}
