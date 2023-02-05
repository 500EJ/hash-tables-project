function stringToObject(str: string): Record<string, number> {
  const object: Record<string, number> = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i]!;
    if (object[char] == undefined) {
      object[char] = 0;
    } else {
      object[char]++;
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
  set1.forEach(n => if (set2.has(n)) numbers.push(n))
  return numbers;
}

export function duplicate(arr) {
  // Your code here
}

export function twoSum(nums, target) {
  // Your code here
}

export function wordPattern(pattern, strings) {
  // Your code here
}
