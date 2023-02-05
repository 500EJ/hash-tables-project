function stringToObject(str: string): Record<string, number> {
  const object: Record<string, number> = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char !== undefined) {
      if (object[char] == undefined) {
        object[char] = 0;
      } else {
        object[char]++;
      }
    }
  }
  return object;
}

export function anagrams(str1: string, str2: string): boolean {
  const [str1Obj, str2Obj] = [stringToObject(str1), stringToObject(str2)];
  const strObj = str1.length > str2.length ? str1Obj : str2Obj;
  for (const char in strObj) {
    if (str1Obj[char] !== str2Obj[char]) return false;
  }
  return true;
}

export function commonElements(arr1: number[], arr2: number[]): number[] {
  const [set1, set2] = [new Set(arr1), new Set(arr2)];
  const numbers: number[] = [];
  set1.forEach(n => set2.has(n) && numbers.push(n));
  return numbers;
}

export function duplicate(arr: number[]): number {
  const set = new Set<number>();
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    if (n !== undefined) {
      if (set.has(n)) return n;
      set.add(n);
    }
  }
  throw new Error("No duplicate found");
}

export function twoSum(nums: number[], target: number): boolean {
  const numbers: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num !== undefined) {
      if (numbers[num]) {
        numbers[num]++;
      } else {
        numbers[num] = 1;
      }
    }
  }
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num !== undefined) {
      const targetNumber = numbers[target - num];
      if (
        targetNumber &&
        ((target - num === num && targetNumber >= 2) || target - num !== num)
      ) {
        return true;
      }
    }
  }
  return false;
}

export function wordPattern(pattern: string, strings: string[]): boolean {
  const object: Record<string, string> = {};
  const chars = new Set<string>();
  for (let i = 0; i < pattern.length; i++) {
    const [char, word] = [pattern[i], strings[i]];
    if (!char || !word) return false;
    if (
      (object[word] && char !== object[word]) ||
      (!object[word] && chars.has(char))
    ) {
      return false;
    } else if (!object[word] && !chars.has(char)) {
      object[word] = char;
      chars.add(char);
    }
  }
  return true;
}
