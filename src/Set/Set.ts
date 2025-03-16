import { Map } from '../Map/Map';

export class Set<T> {
  private map = new Map<T, boolean>();

  constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const item of iterable) {
        this.add(item);
      }
    }
  }

  add(value: T): this {
    this.map.set(value, true);

    return this;
  }

  has(value: T): boolean {
    return this.map.has(value);
  }
  
  delete(value: T): boolean {
    return this.map.delete(value);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size();
  }
}