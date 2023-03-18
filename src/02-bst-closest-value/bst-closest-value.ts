import { Tree, TreeNode } from '../common/tree';

/**
 * Finds the closest value in a binary search tree to a given target value.
 * Average O(log(n)) time | O(log(n)) space
 * Worst (unbalanced tree) O(n) time | O(n) space
 * @param bst A binary search tree
 * @param targetValue The number we are trying to find the closest tree node value to
 * @returns The closest value found in the tree to @param targetValue
 */
export function bstFindClosestValue(bst: Tree<number>, targetValue: number): number {
  let closestValueFound: number = Number.POSITIVE_INFINITY;
  let currentNode: TreeNode<number> | null = bst.root;
  while (currentNode) {
    const nodeValueDistanceToTarget: number = Math.abs(currentNode.value - targetValue);
    const closestValueDistanceToTarget: number = Math.abs(closestValueFound - targetValue);
    if (nodeValueDistanceToTarget < closestValueDistanceToTarget) {
      closestValueFound = currentNode.value;
    }
    if (currentNode.value > targetValue) {
      currentNode = currentNode.left;
    } else if (currentNode.value < targetValue) {
      currentNode = currentNode.right;
    } else {
      break;
    }
  }
  return closestValueFound;
}
