export class Heap<T> {
  private data: T[] = [];

  constructor(private comparator: (a: T, b: T) => boolean) {}

  public peek(): T | null {
    return this.data.length === 0 ? null : this.data[0];
  }

  public push(value: T): void {
    this.data.push(value);
    this.BubbleUp();
  }

  public pop(): T | null {
    if (this.data.length === 0) {
      return null;
    }

    const top = this.data[0];
    const end = this.data.pop()!;

    if (this.data.length > 0) {
      this.data[0] = end;
      this.BubbleDown();
    }

    return top;
  }

  public size(): number {
    return this.data.length;
  }

  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  public toArray(): T[] {
    return [...this.data];
  }

  private BubbleUp(): void {
    let index = this.data.length - 1;
    const element = this.data[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.data[parentIndex];

      if (this.comparator(parent, element)) break;

      this.data[index] = parent;
      index = parentIndex;
    }

    this.data[index] = element;
  }

  private BubbleDown(): void {
    let index = 0;
    const length = this.data.length;
    const element = this.data[0];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swapIdx = -1;

      if (leftChildIdx < length) {
        if (!this.comparator(element, this.data[leftChildIdx])) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        const shouldSwap =
          swapIdx === -1
            ? !this.comparator(element, this.data[rightChildIdx])
            : !this.comparator(this.data[leftChildIdx], this.data[rightChildIdx]);

        if (shouldSwap) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === -1) break;

      this.data[index] = this.data[swapIdx];
      index = swapIdx;
    }

    this.data[index] = element;
  }
}
