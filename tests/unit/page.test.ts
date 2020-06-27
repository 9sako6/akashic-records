import { Page } from '@/src/storage/Page';
import { Log } from '@/src/storage/Log';

test('should fail to insert a log which buffer size is more than 4KiB', () => {
  const log = new Log('DELETE', 1, 'test', 4097);
  const page = new Page();
  expect(page.insertLog(log)).toBe(false);
});
