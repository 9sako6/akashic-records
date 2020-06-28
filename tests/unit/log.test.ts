import { Log } from '@/src/storage/Log';

test('', () => {
  const operator = 'INSERT';
  const columnId = 777;
  const value = 'Sushi!';
  const log = new Log(operator, columnId, value);
  expect(log).toBeTruthy();
  // const decodedLog = log.decode();
  // expect(decodedLog.operator).toEqual(operator);
  // expect(decodedLog.columnId).toEqual(columnId);
  // expect(decodedLog.value).toEqual(value);
});
