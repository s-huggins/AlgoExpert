import { Tree, TreeNode } from '../common/tree';
import { branchSums, branchSumsV2 } from './branch-sums';

const tree1: Tree<number> = new Tree<number>(new TreeNode(1));
tree1.root.left = new TreeNode(2, new TreeNode(4), new TreeNode(5));
tree1.root.left.left = new TreeNode(4, new TreeNode(8), new TreeNode(9));
tree1.root.left.right = new TreeNode(5, new TreeNode(10), null);
tree1.root.right = new TreeNode(3, new TreeNode(6), new TreeNode(7));

/**
 *    tree has form
 *              1
 *           /     \
 *         2        3
 *       /   \    /  \
 *     4       5 6    7
 *    / \     /
 *   8   9  10
 *
 */

const tree2: Tree<number> = new Tree<number>(new TreeNode(1));
tree2.root.right = new TreeNode(2);
tree2.root.right.right = new TreeNode(3);
tree2.root.right.right.right = new TreeNode(4);

/**
 *  bst2 has form
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
      tree: new Tree(new TreeNode(1)),
      expectedBranchSums: [1]
    }
  ])('branchSums($tree)', ({ tree, expectedBranchSums }) => {
    test(`returns ${expectedBranchSums}`, () => {
      expect(new Set(branchSums(tree))).toEqual(new Set(expectedBranchSums));
      expect(new Set(branchSumsV2(tree))).toEqual(new Set(expectedBranchSums));
    });
  });
});
