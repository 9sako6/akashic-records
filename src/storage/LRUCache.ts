type INode<Key, Value> = Partial<{
  nextNode: INode<Key, Value>;
  prevNode: INode<Key, Value>;
  key: Key;
  value: Value;
}>;

class LinkedList<Key, Value> {
  private nodeMap: Map<Key, INode<Key, Value>>;
  private headNode: INode<Key, Value> = {};
  private tailNode: INode<Key, Value> = {};
  constructor() {
    this.nodeMap = new Map<Key, INode<Key, Value>>();
    this.headNode.prevNode = this.tailNode;
    this.tailNode.nextNode = this.headNode;
  }

  moveLatest(key: Key): INode<Key, Value> | false {
    const latestNode = this.nodeMap.get(key);
    const prevNode = latestNode?.prevNode;
    const nextNode = latestNode?.nextNode;
    if (!latestNode || !prevNode || !nextNode) return false;
    prevNode.nextNode = nextNode;
    nextNode.prevNode = prevNode;

    const secondLatestNode = this.headNode.prevNode!;
    secondLatestNode.nextNode = this.headNode.prevNode = latestNode;
    latestNode.prevNode = secondLatestNode;
    latestNode.nextNode = this.headNode;
    return latestNode;
  }

  setLatest(key: Key, value: Value): INode<Key, Value> | false {
    const latestNode = this.moveLatest(key);
    if (!latestNode) return false;

    latestNode.value = value;
    return latestNode;
  }

  add(key: Key, value: Value): INode<Key, Value> | false {
    const secondLatestNode = this.headNode.prevNode;
    if (!secondLatestNode) return false;
    const newNode: INode<Key, Value> = {
      key,
      value,
      nextNode: this.headNode,
      prevNode: secondLatestNode,
    };
    this.headNode.prevNode = secondLatestNode.nextNode = newNode;
    this.nodeMap.set(key, newNode);
    return newNode;
  }

  removeOldest(): INode<Key, Value> | false {
    if (this.tailNode.nextNode === this.headNode) return false;

    const oldestNode = this.tailNode.nextNode;
    const secondOldestNode = oldestNode?.nextNode;
    if (!oldestNode || !oldestNode.key || !secondOldestNode) return false;

    this.tailNode.nextNode = secondOldestNode;
    secondOldestNode.prevNode = this.tailNode;
    oldestNode.prevNode = oldestNode.nextNode = undefined;
    this.nodeMap.delete(oldestNode.key);
    return oldestNode;
  }
}

export class LRUCache<Key, Value> {
  public length = 0;
  private cache = new Map<Key, Value>();
  private linkedList = new LinkedList<Key, Value>();
  constructor(public capacity: number) {
    if (capacity < 0) throw new Error(`Invalid capacity: ${capacity}`);
  }

  get(key: Key): Value | undefined {
    if (this.cache.has(key) && this.linkedList.moveLatest(key)) {
      return this.cache.get(key);
    } else {
      return undefined;
    }
  }

  put(key: Key, value: Value): boolean {
    if (this.cache.has(key)) {
      this.setLatest(key, value);
    } else {
      this.add(key, value);
      if (this.capacity >= this.length + 1) {
        this.length++;
      } else {
        this.removeOldest();
      }
    }
    return true;
  }

  private removeOldest(): boolean {
    const oldestNode = this.linkedList.removeOldest();
    if (!oldestNode || !oldestNode.key) return false;
    return this.cache.delete(oldestNode.key);
  }

  private add(key: Key, value: Value): boolean {
    if (!this.linkedList.add(key, value)) return false;
    this.cache.set(key, value);
    return true;
  }

  private setLatest(key: Key, value: Value): boolean {
    if (!this.linkedList.setLatest(key, value)) return false;
    this.cache.set(key, value);
    return true;
  }
}
