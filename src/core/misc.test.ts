import { expect, expectTypeOf, test } from 'vitest';

import is from '../index';

test('is.enumCase', () => {
  enum NonNumericalEnum {
    Key1 = 'key1',
    Key2 = 'key2',
  }

  expect(is.enumCase('key1', NonNumericalEnum)).toBe(true);
  expect(is.enumCase('invalid', NonNumericalEnum)).toBe(false);
});

test('is.directInstanceOf', () => {
  class ErrorSubclassFixture extends Error {}
  const error = new Error('fixture');
  const errorSubclass = new ErrorSubclassFixture();

  expect(is.directInstanceOf(error, Error)).toBe(true);
  expect(is.directInstanceOf(errorSubclass, ErrorSubclassFixture)).toBe(true);

  expect(is.directInstanceOf(error, ErrorSubclassFixture)).toBe(false);
  expect(is.directInstanceOf(errorSubclass, Error)).toBe(false);

  expect(is.directInstanceOf(undefined, Error)).toBe(false);
  expect(is.directInstanceOf(null, Error)).toBe(false);
});

test('is.iterable', () => {
  expect(is.iterable('')).toBe(true);
  expect(is.iterable([])).toBe(true);
  expect(is.iterable(new Map())).toBe(true);
  expect(is.iterable(null)).toBe(false);
  expect(is.iterable(undefined)).toBe(false);
  expect(is.iterable(0)).toBe(false);
  expect(is.iterable(Number.NaN)).toBe(false);
  expect(is.iterable(Number.POSITIVE_INFINITY)).toBe(false);
  expect(is.iterable({})).toBe(false);
});

test('is.asyncIterable', () => {
  expect(
    is.asyncIterable({
      [Symbol.asyncIterator]() {},
    })
  ).toBe(true);

  expect(is.asyncIterable(null)).toBe(false);
  expect(is.asyncIterable(undefined)).toBe(false);
  expect(is.asyncIterable(0)).toBe(false);
  expect(is.asyncIterable(Number.NaN)).toBe(false);
  expect(is.asyncIterable(Number.POSITIVE_INFINITY)).toBe(false);
  expect(is.asyncIterable({})).toBe(false);
});

test('is.arrayLike', () => {
  (function () {
    // eslint-disable-next-line prefer-rest-params
    expect(is.arrayLike(arguments)).toBe(true);
  })();

  expect(is.arrayLike([])).toBe(true);
  expect(is.arrayLike('coffee')).toBe(true);

  expect(is.arrayLike({})).toBe(false);
  expect(is.arrayLike(() => {})).toBe(false);
  expect(is.arrayLike(new Map())).toBe(false);
});

test('is.tupleLike', () => {
  (function () {
    // eslint-disable-next-line prefer-rest-params
    expect(is.tupleLike(arguments, [])).toBe(false);
  })();

  expect(is.tupleLike([], [])).toBe(true);
  expect(
    is.tupleLike(
      [1, '2', true, {}, [], undefined, null],
      [is.number, is.string, is.boolean, is.object, is.array, is.undefined, is.nullOrUndefined]
    )
  ).toBe(true);
  expect(is.tupleLike('coffee', [is.string])).toBe(false);

  expect(is.tupleLike({}, [])).toBe(false);
  expect(is.tupleLike(() => {}, [is.function])).toBe(false);
  expect(is.tupleLike(new Map(), [is.map])).toBe(false);

  {
    const tuple = [[false, 'coffee'], 'string', true];

    if (is.tupleLike(tuple, [is.array, is.string, is.boolean])) {
      if (is.tupleLike(tuple[0], [is.boolean, is.string])) {
        const value = tuple[0][1];
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    }
  }

  {
    const tuple = [{ isTest: true }, '1', true, null];

    if (is.tupleLike(tuple, [is.nonEmptyObject, is.string, is.boolean, is.null])) {
      const value = tuple[0];
      expectTypeOf(value).toEqualTypeOf<Record<string | number | symbol, unknown>>();
    }
  }

  {
    const tuple = [1, '1', true, null, undefined];

    if (is.tupleLike(tuple, [is.number, is.string, is.boolean, is.undefined, is.null])) {
      const numericValue = tuple[0];
      const stringValue = tuple[1];
      const booleanValue = tuple[2];
      const undefinedValue = tuple[3];
      const nullValue = tuple[4];
      expectTypeOf(numericValue).toEqualTypeOf<number>();
      expectTypeOf(stringValue).toEqualTypeOf<string>();
      expectTypeOf(booleanValue).toEqualTypeOf<boolean>();
      expectTypeOf(undefinedValue).toEqualTypeOf<undefined>();
      expectTypeOf(nullValue).toEqualTypeOf<null>();
    }
  }
});

test('is.propertyKey', () => {
  expect(is.propertyKey('key')).toBe(true);
  expect(is.propertyKey(42)).toBe(true);
  expect(is.propertyKey(Symbol(''))).toBe(true);

  expect(is.propertyKey(null)).toBe(false);
  expect(is.propertyKey(undefined)).toBe(false);
  expect(is.propertyKey(true)).toBe(false);
  expect(is.propertyKey({})).toBe(false);
  expect(is.propertyKey([])).toBe(false);
  expect(is.propertyKey(new Map())).toBe(false);
  expect(is.propertyKey(new Set())).toBe(false);
});

test('is.validDate', () => {
  expect(is.validDate(new Date())).toBe(true);
  expect(is.validDate(new Date('x'))).toBe(false);
});
