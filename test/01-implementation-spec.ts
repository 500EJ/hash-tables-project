import { expect } from "chai";

import HashTable from "../phases/01-implementation.js";

describe("Phase 1 - Hash table implementation", function () {
  let hashTable: HashTable;

  beforeEach(function () {
    hashTable = new HashTable(2);
  });

  it("has count, capacity, and data properties", function () {
    expect(hashTable.count).to.equal(0);
    expect(hashTable.capacity).to.equal(2);
    expect(hashTable.data).to.deep.equal([null, null]);
  });

  it("can be initialized to different size", function () {
    hashTable = new HashTable(4);

    expect(hashTable.count).to.equal(0);
    expect(hashTable.capacity).to.equal(4);
    expect(hashTable.data).to.deep.equal([null, null, null, null]);
  });

  it("can insert a key/value pair", function () {
    hashTable = new HashTable(4);

    hashTable.insert("key1", "value1");
    hashTable.insert("key2", "value2");
    hashTable.insert("key3", "value3");

    const data2 = hashTable.data[2]!;
    const data3 = hashTable.data[3]!;
    const data0 = hashTable.data[0]!;

    expect(data2.key).to.equal("key1");
    expect(data3.key).to.equal("key2");
    expect(data0.key).to.equal("key3");

    expect(data2.value).to.equal("value1");
    expect(data3.value).to.equal("value2");
    expect(data0.value).to.equal("value3");

    expect(hashTable.count).to.equal(3);
  });

  it("can insert and handle hash collisions", function () {
    expect(hashTable.capacity).to.equal(2);

    hashTable.insert("key2", "value2");
    hashTable.insert("key4", "value4");

    const data1 = hashTable.data[1]!;

    expect(data1.next!.key).to.equal("key2");
    expect(data1.key).to.equal("key4");

    expect(data1.next!.value).to.equal("value2");
    expect(data1.value).to.equal("value4");
  });

  it("can insert and handle same key, value updates", function () {
    hashTable = new HashTable(6);

    hashTable.insert("key4", "value4");
    hashTable.insert("key13", "value13");
    hashTable.insert("key19", "value19");

    let data3 = hashTable.data[3]!;

    expect(data3.key).to.equal("key19");
    expect(data3.value).to.equal("value19");
    expect(data3.next!.key).to.equal("key13");
    expect(data3.next!.value).to.equal("value13");
    expect(data3.next!.next!.key).to.equal("key4");
    expect(data3.next!.next!.value).to.equal("value4");

    hashTable.insert("key13", "value20000");
    data3 = hashTable.data[3]!;

    expect(data3.next!.key).to.equal("key13");
    expect(data3.next!.value).to.equal("value20000");
  });

  it("can read an inserted key/value pair", function () {
    hashTable = new HashTable(4);

    hashTable.insert("key1", "value1");
    hashTable.insert("key2", "value2");
    hashTable.insert("key3", "value3");

    expect(hashTable.read("key1")).to.equal("value1");
    expect(hashTable.read("key2")).to.equal("value2");
    expect(hashTable.read("key3")).to.equal("value3");

    expect(hashTable.read("key5")).to.equal(undefined);
  });

  it("can read an inserted key/value pair including collisions", function () {
    expect(hashTable.capacity).to.equal(2);

    hashTable.insert("key1", "value1");
    hashTable.insert("key2", "value2");
    hashTable.insert("key3", "value3");
    hashTable.insert("key5", "value5");
    hashTable.insert("key9", "value9");
    hashTable.insert("key10", "value10");

    expect(hashTable.read("key1")).to.equal("value1");
    expect(hashTable.read("key2")).to.equal("value2");
    expect(hashTable.read("key3")).to.equal("value3");
    expect(hashTable.read("key5")).to.equal("value5");
    expect(hashTable.read("key9")).to.equal("value9");
    expect(hashTable.read("key10")).to.equal("value10");

    expect(hashTable.read("key20")).to.equal(undefined);
  });

  it("can double in size while retaining data", function () {
    hashTable.insert("key1", "value1");
    hashTable.insert("key2", "value2");
    hashTable.insert("key3", "value3");

    let capacity = hashTable.capacity;

    hashTable.resize();

    expect(hashTable.count).to.equal(3);
    expect(hashTable.capacity).to.equal(capacity * 2);
    expect(hashTable.data.length).to.equal(capacity * 2);

    expect(hashTable.read("key1")).to.equal("value1");
    expect(hashTable.read("key2")).to.equal("value2");
    expect(hashTable.read("key3")).to.equal("value3");
  });

  it("can write and read 25 thousand values in under 1 second", function () {
    const target = 25000;

    const timeout = 1000;
    let startTime = Date.now();

    // Insert key/value pairs
    for (let i = 0; i < target; i++) {
      hashTable.insert(`k-${i}`, `v-${i}`);

      if (Date.now() - startTime > timeout) {
        expect(i).to.be.above(target);
        break;
      }
    }

    // // Read key/value pairs
    startTime = Date.now();
    for (let i = 0; i < target; i++) {
      expect(hashTable.read(`k-${i}`)).to.equal(`v-${i}`);

      if (Date.now() - startTime > timeout) {
        expect(i).to.be.above(target);
      }
    }

    expect(hashTable.count).to.equal(target);
  });

  it("can delete a Key Value Pair", () => {
    hashTable.insert("key1", "value1");
    hashTable.insert("key2", "value2");
    hashTable.insert("key3", "value3");
    hashTable.insert("key5", "value5");
    hashTable.insert("key9", "value9");
    hashTable.insert("key10", "value10");

    // check for values
    expect(hashTable.read("key2")).to.equal("value2");
    expect(hashTable.read("key9")).to.equal("value9");
    expect(hashTable.read("key10")).to.equal("value10");

    expect(hashTable.count).to.equal(6);

    // delete key value pairs
    hashTable.delete("key2");
    hashTable.delete("key9");
    hashTable.delete("key10");

    // check for values
    expect(hashTable.read("key1")).to.equal("value1");
    expect(hashTable.read("key3")).to.equal("value3");
    expect(hashTable.read("key5")).to.equal("value5");

    expect(hashTable.read("key2")).to.equal(undefined);
    expect(hashTable.read("key9")).to.equal(undefined);
    expect(hashTable.read("key10")).to.equal(undefined);

    expect(hashTable.count).to.equal(3);

    // return string if key doesn't exist
    expect(hashTable.delete("key2")).to.equal("Key not found");
    expect(hashTable.delete("key10")).to.equal("Key not found");
  });
});
