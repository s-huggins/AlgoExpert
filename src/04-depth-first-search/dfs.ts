import { TreeNode } from '../common/tree';

/**
 * Recursive depth-first traversal of a tree structure.
 * For vertex count V & edge count E, runs in O(V + E) time | O(V) space.
 * @param tree Root node of a tree from which to begin a depth-first traversal.
 * @returns The array of node values traversed, ordered according to the sequence they were visited in.
 */
export function dfs<T>(tree: TreeNode<T>): T[] {
  return dfsHelper(tree);
}

function dfsHelper<T>(node: TreeNode<T>, visits: T[] = []): T[] {
  let visited = [...visits];
  if (node) {
    visited.push(node.value);
    for (const childNode of node.children) {
      visited = dfsHelper(childNode, visited);
    }
  }
  return visited;
}
