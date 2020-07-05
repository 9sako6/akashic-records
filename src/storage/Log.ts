import { createRequire } from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);
const bson = require('bson')

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
  constructor(operator: Operator, columnId: number, value: Value) {
    this.data = { operator, columnId, value };
    this.buffer = bson.serialize(this.data);
    this.byteLength = this.buffer.byteLength;
  }
}
