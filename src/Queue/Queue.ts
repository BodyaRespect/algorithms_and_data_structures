import { Node } from "../LinkedList/Node";

export class Queue<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  enqueue(item: T): void {
    const newNode = new Node<T>(item);
  
    if (this.tail) {
      this.tail.next = newNode;
    }
  
    this.tail = newNode;

    if (this.head === null) {
      this.head = newNode;
    }

    this.count++;
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty!");
    }
  
    const removedData = this.head!.value;
    this.head = this.head!.next;

    if (this.head === null) {
      this.tail = null;
    }

    this.count--;
  
    return removedData;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty!");
    }

    return this.head!.value;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  size(): number {
    return this.count;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
}