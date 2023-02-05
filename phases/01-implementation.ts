class KeyValuePair {
  key: string;
  value: any;
  next: KeyValuePair | null;

  constructor(key: string, value: any) {
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

  insert(key: string, value: any): void {
    if (this.count / this.capacity >= 0.7) this.resize();
    const index = this.hashMod(key);
    if (this.data[index] == null) {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
      return;
    }
    let current = this.data[index];
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }
    const pair = new KeyValuePair(key, value);
    pair.next = this.data[index] ?? null;
    this.data[index] = pair;
    this.count++;
  }

  read(key: string): any {
    let current = this.data[this.hashMod(key)];
    while (current) {
      if (current.key === key) return current.value;
      current = current.next;
    }
  }

  resize(): void {
    const oldData = this.data;
    this.count = 0;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    for (let i = 0; i < oldData.length; i++) {
      let current = oldData[i];
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    }
  }

  delete(key: string): "Key not found" | void {
    let current = this.data[this.hashMod(key)];
    if (current && current.key === key) {
      this.data[this.hashMod(key)] = current.next;
      this.count--;
      return;
    }
    while (current) {
      if (current.next && current.next.key === key) {
        current.next = current.next.next;
        this.count--;
        return;
      }
      current = current.next;
    }
    if (current == null) return "Key not found";
  }
}

export default HashTable;
