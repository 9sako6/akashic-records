import { LRUCache } from '@/src/storage/LRUCache';

it('LRUCache corner case 1', () => {
  const cache = new LRUCache<number, number>(0);
  expect(cache.get(1)).toEqual(undefined);
  cache.put(1, 4);
  cache.put(1, 5);
  cache.put(2, 3);
  expect(cache.get(1)).toEqual(undefined);
  expect(cache.get(2)).toEqual(undefined);
});

it('LRUCache test case 1', () => {
  const cache = new LRUCache<number, number>(10);
  for (let i = 0; i < 10; ++i) {
    cache.put(i, i);
  }
  expect(cache.get(0)).toEqual(0);
  cache.put(10, 100);
  expect(cache.get(1)).toEqual(undefined);
  cache.put(2, 4);
  expect(cache.get(2)).toEqual(4);
  cache.put(11, 200);
  expect(cache.get(3)).toEqual(undefined);
  cache.put(3, 42);
  expect(cache.get(3)).toEqual(42);
  expect(cache.get(4)).toEqual(undefined);
});
