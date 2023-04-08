import { BinaryTree, BinaryTreeNode } from '../common/binary-tree';
import { branchSums, branchSumsV2 } from './branch-sums';

const tree1: BinaryTree<number> = new BinaryTree<number>(new BinaryTreeNode(1));
tree1.root.left = new BinaryTreeNode(2, new BinaryTreeNode(4), new BinaryTreeNode(5));
tree1.root.left.left = new BinaryTreeNode(4, new BinaryTreeNode(8), new BinaryTreeNode(9));
tree1.root.left.right = new BinaryTreeNode(5, new BinaryTreeNode(10), null);
tree1.root.right = new BinaryTreeNode(3, new BinaryTreeNode(6), new BinaryTreeNode(7));

/**
 *    tree1 has form
 *              1
 *           /     \
 *         2        3
 *       /   \    /  \
 *     4       5 6    7
 *    / \     /
 *   8   9  10
 *
 */

const tree2: BinaryTree<number> = new BinaryTree<number>(new BinaryTreeNode(1));
tree2.root.right = new BinaryTreeNode(2);
tree2.root.right.right = new BinaryTreeNode(3);
tree2.root.right.right.right = new BinaryTreeNode(4);

/**
 *  tree2 has form
 *      1
 *       \
 *        2
 *         \
 *          3
 *           \
 *            4
 */

describe('branch-sums', () => {
  describe.each([
    {
      tree: tree1,
      expectedBranchSums: [16, 15, 18, 10, 11]
    },
    {
      tree: tree2,
      expectedBranchSums: [10]
    },
    {
      tree: new BinaryTree(new BinaryTreeNode(1)),
      expectedBranchSums: [1]
    }
  ])('branchSums($tree)', ({ tree, expectedBranchSums }) => {
    test(`returns ${expectedBranchSums}`, () => {
      expect(new Set(branchSums(tree))).toEqual(new Set(expectedBranchSums));
      expect(new Set(branchSumsV2(tree))).toEqual(new Set(expectedBranchSums));
    });
  });
});
