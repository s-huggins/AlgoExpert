export class BinaryTreeNode<T> {
  constructor(public value: T, public left: BinaryTreeNode<T> = null, public right: BinaryTreeNode<T> = null) {}
}

export class BinaryTree<T> {
  constructor(public root: BinaryTreeNode<T>) {}
}
