import { expect, test } from 'vitest';

import is, { type Primitive } from '../index';

test('is.truthy', () => {
  expect(is.truthy('coffee')).toBe(true);
  expect(is.truthy('☕')).toBe(true);
  expect(is.truthy(new Set())).toBe(true);
  expect(is.truthy(Symbol('☕'))).toBe(true);
  expect(is.truthy(true)).toBe(true);
  expect(is.truthy(1)).toBe(true);
  expect(is.truthy(1n)).toBe(true);
  expect(is.truthy(BigInt(1))).toBe(true);
});

test('is.falsy', () => {
  expect(is.falsy(false)).toBe(true);
  expect(is.falsy(0)).toBe(true);
  expect(is.falsy('')).toBe(true);
  expect(is.falsy(null)).toBe(true);
  expect(is.falsy(undefined)).toBe(true);
  expect(is.falsy(Number.NaN)).toBe(true);
  expect(is.falsy(0n)).toBe(true);
  expect(is.falsy(BigInt(0))).toBe(true);
});

test('is.primitive', () => {
  const primitives: Primitive[] = [
    undefined,
    null,
    '☕',
    6,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    true,
    false,
    Symbol('☕'),
    6n,
  ];

  for (const element of primitives) {
    expect(is.primitive(element)).toBe(true);
  }
});
