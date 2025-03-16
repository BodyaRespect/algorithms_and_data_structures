import { Tree } from './../Tree/Tree';
import { TreeNode } from './../Tree/TreeNode';
import { Entry } from './Entry';

export class Map<K, V> {
  private tree: Tree<Entry<K, V>>;

  constructor() {
    this.tree = new Tree<Entry<K, V>>();
  }

  private findEntryNode(key: K): TreeNode<Entry<K, V>> | null {
    let found: TreeNode<Entry<K, V>> | null = null;

    this.tree.traverseDFS(this.tree.root, (node) => {
      if (node.value.key === key && found === null) {
        found = node;
      }
    });

    return found;
  }

  set(key: K, value: V): void {
    const node = this.findEntryNode(key);

    if (node) {
      node.value.value = value;
    } else {
      const newEntry: Entry<K, V> = { key, value };
      const newNode = new TreeNode<Entry<K, V>>(newEntry);

      if (this.tree.root) {
        this.tree.root.addChild(newNode);
      } else {
        this.tree.root = newNode;
      }
    }
  }

  get(key: K): V | null {
    const node = this.findEntryNode(key);

    if (node) {
      return node.value.value;
    }
  
    return null;
  }

  has(key: K): boolean {
    return this.findEntryNode(key) !== null;
  }

  delete(key: K): boolean {
    const nodeToRemove = this.findEntryNode(key);

    if (!nodeToRemove) return false;

    const parent = nodeToRemove.parent;

    if (parent) {
      parent.removeChild(nodeToRemove);
    } else {
      this.tree.root = null;
    }

    return true;
  }

  clear(): void {
    this.tree.clear();
  }

  size(): number {
    return this.tree.size();
  }

  printMap(): void {
    this.tree.traverseDFS(this.tree.root, (node) => {
      console.log(`Key: ${node.value.key}, Value: ${node.value.value}`);
    });
  }
}
