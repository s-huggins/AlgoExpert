import { BinaryTree, BinaryTreeNode } from '../common/binary-tree';
import { bstFindClosestValue } from './bst-closest-value';

const bst1: BinaryTree<number> = new BinaryTree<number>(new BinaryTreeNode(10));
bst1.root.left = new BinaryTreeNode(5, new BinaryTreeNode(2), new BinaryTreeNode(5));
bst1.root.right = new BinaryTreeNode(15, new BinaryTreeNode(13), new BinaryTreeNode(22));
bst1.root.right.left!.right = new BinaryTreeNode(14);

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

const bst2: BinaryTree<number> = new BinaryTree<number>(new BinaryTreeNode(1));
bst2.root.right = new BinaryTreeNode(2);
bst2.root.right.right = new BinaryTreeNode(3);
bst2.root.right.right.right = new BinaryTreeNode(4);

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

describe('bst-closest-value', () => {
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
});
