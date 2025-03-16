import { Node } from './Node';

export class LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public append(value: T): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  public prepend(value: T): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  public getFirstElement(): T | null {
    return this.head ? this.head.value : null;
  }
  
  public getLastElement(): T | null {
    return this.tail ? this.tail.value : null;
  }

  public getByIndex(index: number): T | null {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current = this.head as Node<T>;

    for (let i = 0; i < index; i++) {
      current = current.next as Node<T>;
    }

    return current.value;
  }

  public delete(value: T): void {
    if (!this.head) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;

      if (!this.head) {
        this.tail = null;
      }

      return;
    }

    let current = this.head as Node<T>;

    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.length--;

        if (!current.next) {
          this.tail = current;
        }

        return;
      }

      current = current.next;
    }
  }

  public size(): number {
    return this.length;
  }

  public clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    let current: Node<T> | null = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  public serializeToArray(): T[] {
    const result: T[] = [];
    let current: Node<T> | null = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }
}
