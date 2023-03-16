/**
 * Two Sum, O(n) time | O(n) space
 * @param values A list of numbers
 * @param targetSum The target sum to reach by the addition of two distinct elements in the list
 * @returns The first two elements found by a left-right traversal which add to @param targetSum, if such exist; otherwise, null
 */
export function twoSum(values: number[], targetSum: number): [number, number] | null {
  const valuesSeen: Set<number> = new Set<number>();
  let summands: [number, number] | null = null;
  for (const currentValue of values) {
    const diffFromTarget: number = targetSum - currentValue;
    if (valuesSeen.has(diffFromTarget)) {
      summands = [diffFromTarget, currentValue];
      break;
    }
    valuesSeen.add(currentValue);
  }
  return summands;
}

/**
 * Two Sum, O(nlog(n)) time | O(1) space
 * @param values A list of numbers
 * @param targetSum The target sum to reach by the addition of two distinct elements in the list
 * @returns The first two elements found by the two-pointers technique on a sorted copy of the array which add to @param targetSum, if such exist; otherwise, null
 */
export function twoSumV2(values: number[], targetSum: number): [number, number] | null {
  const sortedValues: number[] = [...values].sort((n1, n2) => n1 - n2);
  let leftIndex: number = 0;
  let rightIndex: number = sortedValues.length - 1;
  let summands: [number, number] | null = null;
  while (leftIndex < rightIndex) {
    const currentSum: number = sortedValues[leftIndex] + sortedValues[rightIndex];
    if (currentSum === targetSum) {
      summands = [sortedValues[leftIndex], sortedValues[rightIndex]];
      break;
    } else if (currentSum < targetSum) {
      leftIndex++;
    } else {
      rightIndex--;
    }
  }
  return summands;
}
