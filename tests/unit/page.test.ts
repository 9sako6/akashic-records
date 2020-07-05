import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { Page } from '../../src/storage/Page.ts';
import { Log } from '../../src/storage/Log.ts';

Deno.test({
  name: 'should fail to insert a log which buffer size is more than 4KiB',
  fn(): void {
    const log = new Log('DELETE', 1, 'a'.repeat(4096));
    const page = new Page();
    assertEquals(page.insertLog(log), false);
  },
});
