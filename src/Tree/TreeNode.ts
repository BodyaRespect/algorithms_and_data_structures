export class TreeNode<T> {
  public value: T;
  public children: TreeNode<T>[];
  public parent: TreeNode<T> | null;

  constructor(value: T, parent: TreeNode<T> | null = null) {
    this.value = value;
    this.children = [];
    this.parent = parent;
  }

  addChild(child: TreeNode<T>): void {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child: TreeNode<T>): boolean {
    const index = this.children.indexOf(child);

    if (index > -1) {
      this.children.splice(index, 1);
      child.parent = null;

      return true;
    }

    return false;
  }
}
