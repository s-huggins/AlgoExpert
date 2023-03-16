import { bstFindClosestValue } from './bst-closest-value';
import { Tree, TreeNode } from './tree';

const bst1: Tree<number> = new Tree<number>(new TreeNode(10));
bst1.root.left = new TreeNode(5, new TreeNode(2), new TreeNode(5));
bst1.root.right = new TreeNode(15, new TreeNode(13), new TreeNode(22));
bst1.root.right.left!.right = new TreeNode(14);

/**
 *  bst1 has form
 *       10
 *      /  \
 *     5    15
 *    / \   / \
 *   2   5 13 22
 *          \
 *           14
 */

const bst2: Tree<number> = new Tree<number>(new TreeNode(1));
bst2.root.right = new TreeNode(2);
bst2.root.right.right = new TreeNode(3);
bst2.root.right.right.right = new TreeNode(4);

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

describe.each([
  {
    bst: bst1,
    target: 15,
    expected: 15
  },
  {
    bst: bst1,
    target: 21,
    expected: 22
  },
  {
    bst: bst1,
    target: 12,
    expected: 13
  },
  {
    bst: bst1,
    target: 14,
    expected: 14
  },
  {
    bst: bst1,
    target: 100,
    expected: 22
  },
  {
    bst: bst1,
    target: -100,
    expected: 2
  },
  {
    bst: bst2,
    target: 1,
    expected: 1
  },
  {
    bst: bst2,
    target: 5,
    expected: 4
  }
])('bstFindClosestValue($bst, $target)', ({ bst, target, expected }) => {
  test(`returns ${expected}`, () => {
    expect(bstFindClosestValue(bst, target)).toEqual(expected);
  });
});
