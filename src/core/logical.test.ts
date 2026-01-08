import { expect, test } from 'vitest';

import is, { type Predicate } from '../index';

test('is.any', () => {
  expect(is.any(is.string, {}, true, '☕')).toBe(true);
  expect(is.any(is.object, false, {}, 'coffees')).toBe(true);
  expect(is.any(is.boolean, '☕', [], 3)).toBe(false);
  expect(is.any(is.integer, true, 'lol', {})).toBe(false);
  expect(is.any([is.string, is.number], {}, true, '☕')).toBe(true);
  expect(is.any([is.boolean, is.number], 'coffees', [], new Map())).toBe(false);
  expect(typeof is.any([is.string, is.number])).toBe('function');

  expect(() => {
    is.any(null as any, true);
  }).toThrow();

  expect(() => {
    is.any([], 'value');
  }).toThrow();

  expect(() => {
    is.any(is.string);
  }).toThrow();
});

test('is.all', () => {
  expect(is.all(is.object, {}, new Set(), new Map())).toBe(true);
  expect(is.all(is.boolean, true, false)).toBe(true);
  expect(is.all(is.string, '☕', [])).toBe(false);
  expect(is.all(is.set, new Map(), {})).toBe(false);

  expect(is.all(is.array, ['1'], ['2'])).toBe(true);
  expect(is.all([is.string, is.nonEmptyString], '☕', 'coffees')).toBe(true);
  expect(is.all([is.string, is.number], '☕')).toBe(false);

  expect(() => {
    is.all(null as any, true);
  }).toThrow();

  expect(() => {
    is.all([], 'value');
  }).toThrow();

  expect(() => {
    is.all(is.string);
  }).toThrow();
});

test('is.any as predicate factory', () => {
  // Returns a type guard function when called with only predicates
  const isStringOrNumber = is.any([is.string, is.number]);
  expect(typeof isStringOrNumber).toBe('function');
  expect(isStringOrNumber('hello')).toBe(true);
  expect(isStringOrNumber(123)).toBe(true);
  expect(isStringOrNumber(true)).toBe(false);
  expect(isStringOrNumber({})).toBe(false);

  // Type narrowing works correctly
  const value: unknown = 'test';
  if (isStringOrNumber(value)) {
    // TypeScript should narrow to string | number
    const narrowed: string | number = value;
    expect(typeof narrowed).toMatch(/string|number/);
  }

  // Works with is.optional
  expect(is.optional(undefined, is.any([is.string, is.number]))).toBe(true);
  expect(is.optional('test', is.any([is.string, is.number]))).toBe(true);
  expect(is.optional(42, is.any([is.string, is.number]))).toBe(true);
  expect(is.optional(true, is.any([is.string, is.number]))).toBe(false);

  const predicateArray: Predicate[] = [is.string, is.number];
  const isStringOrNumberFromArray = is.any(predicateArray);
  expect(typeof isStringOrNumberFromArray).toBe('function');
  expect(isStringOrNumberFromArray('hello')).toBe(true);
  expect(isStringOrNumberFromArray(123)).toBe(true);
  expect(isStringOrNumberFromArray(true)).toBe(false);

  // Type narrowing with is.optional
  const optionalValue: unknown = undefined;
  if (is.optional(optionalValue, is.any([is.string, is.number]))) {
    // TypeScript should narrow to string | number | undefined
    const narrowed: string | number | undefined = optionalValue;
    expect(typeof narrowed).toMatch(/undefined|string|number/);
  }

  // Works with more predicates
  const isStringOrNumberOrBoolean = is.any([is.string, is.number, is.boolean]);
  expect(isStringOrNumberOrBoolean('hello')).toBe(true);
  expect(isStringOrNumberOrBoolean(123)).toBe(true);
  expect(isStringOrNumberOrBoolean(true)).toBe(true);
  expect(isStringOrNumberOrBoolean({})).toBe(false);

  expect(() => {
    is.any([is.string, 123 as any]);
  }).toThrow();
});

test('is.all as predicate factory', () => {
  // Returns a type guard function when called with only predicates
  const isArrayAndNonEmpty = is.all([is.array, is.nonEmptyArray]);
  expect(typeof isArrayAndNonEmpty).toBe('function');
  expect(isArrayAndNonEmpty(['hello'])).toBe(true);
  expect(isArrayAndNonEmpty([])).toBe(false);
  expect(isArrayAndNonEmpty('hello')).toBe(false);

  // Type narrowing works correctly
  const value: unknown = ['test'];
  if (isArrayAndNonEmpty(value)) {
    // TypeScript should narrow to the intersection type
    expect(Array.isArray(value)).toBe(true);
    expect(value.length > 0).toBe(true);
  }

  // Works with is.optional
  expect(is.optional(undefined, is.all([is.object, is.plainObject]))).toBe(true);
  expect(is.optional({ foo: 'bar' }, is.all([is.object, is.plainObject]))).toBe(true);
  expect(is.optional([], is.all([is.object, is.plainObject]))).toBe(false);

  expect(() => {
    is.all([is.string, 123 as any]);
  }).toThrow();
});

test('is.optional', () => {
  expect(is.optional(undefined, is.string)).toBe(true);
  expect(is.optional('☕', is.string)).toBe(true);
  expect(is.optional(123, is.string)).toBe(false);
  expect(is.optional(null, is.string)).toBe(false);
});
