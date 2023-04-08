import { expect } from 'chai';
import { TreeNode } from '../common/tree';
import { dfs } from './dfs';

const tree1: TreeNode<string> = new TreeNode<string>('A', [new TreeNode('B'), new TreeNode('C'), new TreeNode('D')]);
tree1.children[0].children = [new TreeNode('E'), new TreeNode('F', [new TreeNode('I'), new TreeNode('J')])];
tree1.children[2].children = [new TreeNode('G', [new TreeNode('K')]), new TreeNode('H')];
/**
 *    tree1 has form
 *               A
 *           /   |   \
 *         B     C    D
 *       /   \       / \
 *     E      F     G   H
 *           / \     \
 *          I  J      K
 *
 */

const tree2: TreeNode<string> = new TreeNode('A');
tree2.children = [new TreeNode('B')];
tree2.children[0].children = [new TreeNode('C')];
tree2.children[0].children[0].children = [new TreeNode('D')];

/**
 *  tree2 has form
 *      A
 *      |
 *      B
 *      |
 *      C
 *      |
 *      D
 */

describe('dfs', () => {
  describe.each([
    {
      tree: tree1,
      expectedVisits: ['A', 'B', 'E', 'F', 'I', 'J', 'C', 'D', 'G', 'K', 'H']
    },
    {
      tree: tree2,
      expectedVisits: ['A', 'B', 'C', 'D']
    }
  ])('dfs($tree)', ({ tree, expectedVisits }) => {
    test(`returns ${expectedVisits}`, () => {
      const actualVisits: string[] = dfs<string>(tree);
      expect(actualVisits).to.eql(expectedVisits);
    });
  });
});
