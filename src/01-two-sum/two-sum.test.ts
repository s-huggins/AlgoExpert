import { twoSum, twoSumV2 } from './two-sum';

describe('two-sum', () => {
  describe.each([
    { values: [3, 5, -4, 8, 11, 1, -1, 6], target: 10, expected: [11, -1] },
    { values: [3, 5, -4, 8, 11, 1, 6], target: 10, expected: null },
    { values: [6, 4, 7, 3, 11, 1, 6], target: 10, expected: [6, 4] }
  ])('twoSum($values, $target)', ({ values, target, expected }) => {
    test(`returns ${expected}`, () => {
      expect(twoSum(values, target)).toEqual(expected);
    });
  });

  describe.each([
    { values: [3, 5, -4, 8, 11, 1, -1, 6], target: 10, expected: [-1, 11] },
    { values: [3, 5, -4, 8, 11, 1, 6], target: 10, expected: null },
    { values: [6, 4, 7, 3, 11, 1, 6], target: 10, expected: [3, 7] }
  ])('twoSumV2($values, $target)', ({ values, target, expected }) => {
    test(`returns ${expected}`, () => {
      expect(twoSumV2(values, target)).toEqual(expected);
    });
  });
});
