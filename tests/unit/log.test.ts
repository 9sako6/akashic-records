import { Log } from '@/src/storage/Log';

test('should decode', () => {
  const operator = 'INSERT';
  const columnId = 777;
  const value = 'Sushi!';
  const size = 16;
  const log = new Log(operator, columnId, value, size);
  const decodedLog = log.decode();
  expect(decodedLog.operator).toEqual(operator);
  expect(decodedLog.columnId).toEqual(columnId);
  expect(decodedLog.value).toEqual(value);
});
