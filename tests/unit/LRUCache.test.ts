import { LRUCache } from '@/src/storage/LRUCache';

it('LRUCache corner case 1', () => {
  const LRU = new LRUCache<number, number>(0);
  expect(LRU.get(1)).toEqual(undefined);
  LRU.put(1, 4);
  LRU.put(1, 5);
  LRU.put(2, 3);
  expect(LRU.get(1)).toEqual(undefined);
  expect(LRU.get(2)).toEqual(undefined);
});

it('LRUCache corner case 2', () => {
  const LRU = new LRUCache<number, number>(1);
  LRU.put(2, 1);
  expect(LRU.get(2)).toEqual(1);
  LRU.put(3, 2);
  expect(LRU.get(2)).toEqual(undefined);
  expect(LRU.get(3)).toEqual(2);
});

it('LRUCache test case 1', () => {
  const LRU = new LRUCache<number, number>(10);
  for (let i = 0; i < 10; ++i) {
    LRU.put(i, i);
  }
  expect(LRU.get(0)).toEqual(0);
  LRU.put(10, 100);
  expect(LRU.get(1)).toEqual(undefined);
  LRU.put(2, 4);
  expect(LRU.get(2)).toEqual(4);
  LRU.put(11, 200);
  expect(LRU.get(3)).toEqual(undefined);
  LRU.put(3, 4);
  LRU.put(3, 42);
  expect(LRU.get(3)).toEqual(42);
  expect(LRU.get(4)).toEqual(undefined);
  expect(LRU.length).toEqual(10);
});
