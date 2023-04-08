export class TreeNode<T> {
  constructor(public value: T, public children: TreeNode<T>[] = []) {}
}
