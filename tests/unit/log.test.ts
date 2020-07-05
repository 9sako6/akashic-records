import { assert, assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { Log } from '../../src/storage/Log.ts';

Deno.test({
  name: 'log',
  fn(): void {
    const operator = 'INSERT';
    const columnId = 777;
    const value = 'Sushi!';
    const log = new Log(operator, columnId, value);
    assert(log);
    // const decodedLog = log.decode();
    // expect(decodedLog.operator).toEqual(operator);
    // expect(decodedLog.columnId).toEqual(columnId);
    // expect(decodedLog.value).toEqual(value);
  },
});
