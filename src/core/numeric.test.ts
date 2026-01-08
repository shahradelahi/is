import { expect, test } from 'vitest';

import is from '../index';

test('is.finite', () => {
  expect(is.finite(123)).toBe(true);
  expect(is.finite(0)).toBe(true);
  expect(is.finite(-123.45)).toBe(true);
  expect(is.finite(Number.POSITIVE_INFINITY)).toBe(false);
  expect(is.finite(Number.NEGATIVE_INFINITY)).toBe(false);
  expect(is.finite(NaN)).toBe(false);
});

test('is.positiveNumber', () => {
  expect(is.positiveNumber(6)).toBe(true);
  expect(is.positiveNumber(1.4)).toBe(true);
  expect(is.positiveNumber(Number.POSITIVE_INFINITY)).toBe(true);

  expect(is.positiveNumber(0)).toBe(false);
  expect(is.positiveNumber(-0)).toBe(false);
  expect(is.positiveNumber(-6)).toBe(false);
  expect(is.positiveNumber(-1.4)).toBe(false);
  expect(is.positiveNumber(Number.NEGATIVE_INFINITY)).toBe(false);
});

test('is.negativeNumber', () => {
  expect(is.negativeNumber(-6)).toBe(true);
  expect(is.negativeNumber(-1.4)).toBe(true);
  expect(is.negativeNumber(Number.NEGATIVE_INFINITY)).toBe(true);

  expect(is.negativeNumber(0)).toBe(false);
  expect(is.negativeNumber(-0)).toBe(false);
  expect(is.negativeNumber(6)).toBe(false);
  expect(is.negativeNumber(1.4)).toBe(false);
  expect(is.negativeNumber(Number.POSITIVE_INFINITY)).toBe(false);
});

test('is.integer supplemental', () => {
  expect(is.integer(1.4)).toBe(false);
});

test('is.safeInteger supplemental', () => {
  expect(is.safeInteger(2 ** 53)).toBe(false);
  expect(is.safeInteger(-(2 ** 53))).toBe(false);
});

test('is.inRange', () => {
  const x = 3;

  expect(is.inRange(x, [0, 5])).toBe(true);
  expect(is.inRange(x, [5, 0])).toBe(true);
  expect(is.inRange(x, [-5, 5])).toBe(true);
  expect(is.inRange(x, [5, -5])).toBe(true);
  expect(is.inRange(x, [4, 8])).toBe(false);
  expect(is.inRange(-7, [-5, -10])).toBe(true);
  expect(is.inRange(-5, [-5, -10])).toBe(true);
  expect(is.inRange(-10, [-5, -10])).toBe(true);

  expect(is.inRange(x, 10)).toBe(true);
  expect(is.inRange(0, 0)).toBe(true);
  expect(is.inRange(-2, -3)).toBe(true);
  expect(is.inRange(x, 2)).toBe(false);
  expect(is.inRange(-3, -2)).toBe(false);

  expect(() => {
    // @ts-expect-error invalid argument
    is.inRange(0, []);
  }).toThrow();

  expect(() => {
    // @ts-expect-error invalid argument
    is.inRange(0, [5]);
  }).toThrow();

  expect(() => {
    // @ts-expect-error invalid argument
    is.inRange(0, [1, 2, 3]);
  }).toThrow();
});

test('is.evenInteger', () => {
  for (const element of [-6, 2, 4]) {
    expect(is.evenInteger(element)).toBe(true);
  }

  for (const element of [-3, 1, 5]) {
    expect(is.evenInteger(element)).toBe(false);
  }
});

test('is.oddInteger', () => {
  for (const element of [-5, 7, 13]) {
    expect(is.oddInteger(element)).toBe(true);
  }

  for (const element of [-8, 8, 10]) {
    expect(is.oddInteger(element)).toBe(false);
  }
});

test('is.validLength', () => {
  expect(is.validLength(1)).toBe(true);
  expect(is.validLength(0)).toBe(true);
  expect(is.validLength(-1)).toBe(false);
  expect(is.validLength(0.1)).toBe(false);
});
