import { Node } from "../LinkedList/Node";

export class Stack<T> {
  private head: Node<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.count = 0;
  }

  push(item: T): void {
    const newNode = new Node<T>(item);
    newNode.next = this.head;

    this.head = newNode;
    this.count++;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty!");
    }

    const poppedData = this.head!.value;

    this.head = this.head!.next;
    this.count--;

    return poppedData;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty!");
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
    this.count = 0;
  }
}