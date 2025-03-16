import { TreeNode } from './TreeNode';

export class Tree<T> {
  public root: TreeNode<T> | null;

  constructor(rootValue?: T) {
    this.root = rootValue ? new TreeNode<T>(rootValue) : null;
  }

  traverseDFS(node: TreeNode<T> | null = this.root, visit: (node: TreeNode<T>) => void): void {
    if (!node) return;

    visit(node);

    for (const child of node.children) {
      this.traverseDFS(child, visit);
    }
  }

  findNode(value: T): TreeNode<T> | null {
    let found: TreeNode<T> | null = null;

    this.traverseDFS(this.root, (node) => {
      if (node.value === value && found === null) {
        found = node;
      }
    });

    return found;
  }

  addNode(value: T, parentValue: T): boolean {
    const parentNode = this.findNode(parentValue);

    if (!parentNode) return false;

    const newNode = new TreeNode<T>(value);
    parentNode.addChild(newNode);

    return true;
  }

  removeNode(value: T): boolean {
    const nodeToRemove = this.findNode(value);

    if (!nodeToRemove) return false;

    const parent = nodeToRemove.parent;

    if (parent) {
      parent.removeChild(nodeToRemove);
    } else {
      this.root = null;
    }

    return true;
  }

  getNodes(): TreeNode<T>[] {
    const nodes: TreeNode<T>[] = [];

    this.traverseDFS(this.root, (node) => {
      nodes.push(node);
    });

    return nodes;
  }

  size(): number {
    let size = 0;

    this.traverseDFS(this.root, () => {
      size++;
    });

    return size;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  clear(): void {
    this.root = null;
  }

  printTree(): void {
    this.traverseDFS(this.root, (node) => {
      console.log(node.value);
    });
  }
}
