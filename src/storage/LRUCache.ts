import { type } from 'os';

export class LRU extends Map {
  constructor(public capacity: number) {
    super();
    if (capacity <= 0) {
      throw new Error(`Invalid capacity: ${capacity}`);
    }
  }

}
