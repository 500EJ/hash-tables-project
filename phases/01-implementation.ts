class KeyValuePair {
  key: string;
  value: any;
  next: KeyValuePair | null;

  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)
  capacity: number;
  data: Array<KeyValuePair | null>;
  count: number;

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key: string): number {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key: string): number {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    // Your code here
  }

  read(key) {
    // Your code here
  }

  resize() {
    // Your code here
  }

  delete(key) {
    // Your code here
  }
}

export default HashTable;
