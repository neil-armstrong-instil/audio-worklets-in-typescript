export function repeatMap<T>(iterations: number, callback: (index: number) => T): T[] {
  const list: T[] = [];
  for (let i = 0; i < iterations; i++) {
    list.push(callback(i));
  }
  return list;
}