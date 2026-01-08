import { expect, test } from 'vitest';

import is from '../index';

test('is.nonEmptyArray', () => {
  expect(is.nonEmptyArray([1, 2, 3])).toBe(true);
  expect(is.nonEmptyArray([])).toBe(false);
  expect(is.nonEmptyArray(new Array())).toBe(false); // eslint-disable-line @typescript-eslint/no-array-constructor

  {
    const strings = ['☕', 'coffee'] as string[] | undefined;
    const function_ = (value: string) => value;

    if (is.nonEmptyArray(strings)) {
      const value = strings[0];
      function_(value);
    }
  }

  {
    const mixed = ['☕', 'coffee', 1, 2];
    const function_ = (value: string | number) => value;

    if (is.nonEmptyArray(mixed)) {
      const value = mixed[0];
      function_(value);
    }
  }

  {
    const arrays = [['☕'], ['coffee']];
    const function_ = (value: string[]) => value;

    if (is.nonEmptyArray(arrays)) {
      const value = arrays[0];
      function_(value);
    }
  }
});

test('is.nonEmptySet', () => {
  const temporarySet = new Set();
  expect(is.nonEmptySet(temporarySet)).toBe(false);

  temporarySet.add(1);
  expect(is.nonEmptySet(temporarySet)).toBe(true);
});

test('is.nonEmptyMap', () => {
  const temporaryMap = new Map();
  expect(is.nonEmptyMap(temporaryMap)).toBe(false);

  temporaryMap.set('coffee', '☕');
  expect(is.nonEmptyMap(temporaryMap)).toBe(true);
});
