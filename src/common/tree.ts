export class TreeNode<T> {
  constructor(public value: T, public left: TreeNode<T> | null = null, public right: TreeNode<T> | null = null) {}
}

export class Tree<T> {
  constructor(public root: TreeNode<T>) {}
}
