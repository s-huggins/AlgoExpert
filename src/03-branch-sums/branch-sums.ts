import { Tree, TreeNode } from '../common/tree';

/**
 * Computes the branch sums, which are found by summing the node values found along a path from the root to a node with no children.
 * O(n) time | O(n) space
 * @param tree A binary tree
 * @returns An array of all branch sums in the tree
 */
export function branchSums(tree: Tree<number>): number[] {
  // mutated by recursive calls
  const branchSums: number[] = [];
  branchSumsHelper(tree.root, 0, branchSums);
  return branchSums;
}

function branchSumsHelper(node: TreeNode<number> | null, runningBranchSum: number, completeBranchSums: number[]) {
  if (!node) {
    return;
  }

  runningBranchSum += node.value;

  if (!node.left && !node.right) {
    completeBranchSums.push(runningBranchSum);
    return;
  }

  branchSumsHelper(node.left, runningBranchSum, completeBranchSums);
  branchSumsHelper(node.right, runningBranchSum, completeBranchSums);
}

// V2 does not mutate the running sums array
/**
 * Computes the branch sums, which are found by summing the node values found along a path from the root to a node with no children.
 * O(n) time | O(n) space
 * @param tree A binary tree
 * @returns An array of all branch sums in the tree
 */
export function branchSumsV2(tree: Tree<number>): number[] {
  return branchSumsHelperV2(tree.root);
}

function branchSumsHelperV2(node: TreeNode<number> | null): number[] {
  let branchSums: number[] = [];
  if (node) {
    if (!node.left && !node.right) {
      branchSums = [...branchSums, node.value];
    }

    if (node.left) {
      const leftChildBranchSums: number[] = branchSumsHelperV2(node.left);
      const leftBranchSums: number[] = leftChildBranchSums.map((branchSum: number) => branchSum + node.value);
      branchSums = [...branchSums, ...leftBranchSums];
    }

    if (node.right) {
      const rightChildBranchSums: number[] = branchSumsHelperV2(node.right);
      const rightBranchSums: number[] = rightChildBranchSums.map((branchSum: number) => branchSum + node.value);
      branchSums = [...branchSums, ...rightBranchSums];
    }
  }
  return branchSums;
}
