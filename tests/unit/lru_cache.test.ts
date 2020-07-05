import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { LRUCache } from '../../src/storage/LRUCache.ts';

Deno.test({
  name: 'LRU Cache test case 1',
  fn(): void {
    const LRU = new LRUCache<number, number>(1);
    LRU.put(2, 1);
    assertEquals(LRU.get(2), 1);
    LRU.put(3, 2);
    assertEquals(LRU.get(2), undefined);
    assertEquals(LRU.get(3), 2);
  },
});

Deno.test({
  name: 'LRU Cache test case 2',
  fn(): void {
    const LRU = new LRUCache<number, number>(10);
    for (let i = 0; i < 10; ++i) {
      LRU.put(i, i);
    }
    assertEquals(LRU.get(0), 0);
    LRU.put(10, 100);
    assertEquals(LRU.get(1), undefined);
    LRU.put(2, 4);
    assertEquals(LRU.get(2), 4);
    LRU.put(11, 200);
    assertEquals(LRU.get(3), undefined);
    LRU.put(3, 4);
    LRU.put(3, 42);
    assertEquals(LRU.get(3), 42);
    assertEquals(LRU.get(4), undefined);
  },
});
