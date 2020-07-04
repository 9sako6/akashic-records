class Node<Key, Value> {
  public nextNode: Node<Key, Value> | undefined;
  public prevNode: Node<Key, Value> | undefined;
  constructor(public key: Key, public value: Value) {
    this.nextNode = undefined;
    this.prevNode = undefined;
  }
}

class StaticNode extends Node<any, any> { // TODO: fix
  constructor(key: 'head' | 'tail') {
    super(key, null);
  }
}

export class LRUCache<Key, Value> {
  private cache: Map<Key, Value>;
  private nodeMap: Map<Key, Node<Key, Value>>;
  private length = 0;
  private headNode: StaticNode;
  private tailNode: StaticNode;
  constructor(public capacity: number) {
    this.cache = new Map<Key, Value>();
    this.nodeMap = new Map<Key, Node<Key, Value>>();
    // set head and tail of LinkedList
    this.headNode = new StaticNode('head');
    this.tailNode = new StaticNode('tail');
    this.headNode.prevNode = this.tailNode;
    this.tailNode.nextNode = this.tailNode;
  }

  get(key: Key): Value | undefined {
    if (this.cache.has(key)) {
      this.moveLatest(key);
      return this.cache.get(key);
    } else {
      return undefined;
    }
  }

  put(key: Key, value: Value): void {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      const newNode = this.moveLatest(key);
      newNode.value = value;
    } else {
      this.cache.set(key, value);
      this.nodeMap.set(key, this.add(key, value));
      if (this.capacity >= this.length + 1) {
        this.length++;
      } else {
        this.removeOldest();
      }
    }
  }

  private moveLatest(key: Key): Node<Key, Value> {
    const latestNode = this.nodeMap.get(key)!; // TODO: fix
    const prevNode = latestNode.prevNode!;
    const nextNode = latestNode.nextNode!;
    prevNode.nextNode = nextNode;
    nextNode.prevNode = prevNode;

    const semiLatestNode = this.headNode.prevNode!;
    semiLatestNode.nextNode = latestNode;
    latestNode.prevNode = semiLatestNode;
    latestNode.nextNode = this.headNode;
    this.headNode.prevNode = latestNode;
    return latestNode;
  }

  private add(key: Key, value: Value): Node<Key, Value> {
    const newNode = new Node<Key, Value>(key, value);
    const semiLatestNode = this.headNode.prevNode!;
    this.headNode.prevNode = newNode;
    newNode.nextNode = this.headNode;

    semiLatestNode.nextNode = newNode;
    newNode.prevNode = semiLatestNode;
    return newNode;
  }

  private removeOldest() {
    if (this.tailNode.nextNode === this.headNode) {
      return false;
    }

    const oldestNode = this.tailNode.nextNode!; // TODO: fix
    const semiOldestNode = oldestNode.nextNode!;
    this.tailNode.nextNode = semiOldestNode;
    semiOldestNode.prevNode = this.tailNode;

    oldestNode.prevNode = undefined;
    oldestNode.nextNode = undefined;

    this.cache.delete(oldestNode.key);
    this.nodeMap.delete(oldestNode.key);
  }
}
