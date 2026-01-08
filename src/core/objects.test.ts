import { expect, test } from 'vitest';

import is, { type TypedArray } from '../index';

test('is.array supplemental', () => {
  expect(is.array([1, 2, 3], is.number)).toBe(true);
  expect(is.array([1, '2', 3], is.number)).toBe(false);

  expect(() => {
    const x: unknown[] = [1, 2, 3];
    if (is.array<number>(x, is.number)) {
      x[0]?.toFixed(0);
    }
  }).not.toThrow();
});

test('is.typedArray', () => {
  const typedArrays: TypedArray[] = [
    new Int8Array(),
    new Uint8Array(),
    new Uint8ClampedArray(),
    new Uint16Array(),
    new Int32Array(),
    new Uint32Array(),
    new Float32Array(),
    new Float64Array(),
    new BigInt64Array(),
    new BigUint64Array(),
  ];

  for (const item of typedArrays) {
    expect(is.typedArray(item)).toBe(true);
  }

  expect(is.typedArray(new ArrayBuffer(1))).toBe(false);
  expect(is.typedArray([])).toBe(false);
  expect(is.typedArray({})).toBe(false);
});

test('is.emptyObject', () => {
  expect(is.emptyObject({})).toBe(true);
  expect(is.emptyObject(new Object())).toBe(true);
  expect(is.emptyObject({ coffee: '☕' })).toBe(false);
});

test('is.nonEmptyObject', () => {
  const foo = {};
  is.nonEmptyObject(foo);

  expect(is.nonEmptyObject({})).toBe(false);
  expect(is.nonEmptyObject(new Object())).toBe(false);
  expect(is.nonEmptyObject({ coffee: '☕' })).toBe(true);
});
