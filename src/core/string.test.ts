import { expect, test } from 'vitest';

import is from '../index';

test('is.json', () => {
  expect(is.json('{"a":1}')).toBe(true);
  expect(is.json('[1,2,3]')).toBe(true);
  expect(is.json('true')).toBe(true);
  expect(is.json('null')).toBe(true);
  expect(is.json('{"a":1')).toBe(false);
  expect(is.json(null)).toBe(false);
  expect(is.json(123)).toBe(false);
});

test('is.base64', () => {
  expect(is.base64('SGVsbG8gd29ybGQ=')).toBe(true);
  expect(is.base64('YQ==')).toBe(true);
  expect(is.base64('invalid')).toBe(false);
  expect(is.base64('')).toBe(false);
  expect(is.base64(123)).toBe(false);
});

test('is.numericString supplemental', () => {
  expect(is.numericString('')).toBe(false);
  expect(is.numericString(' ')).toBe(false);
  expect(is.numericString(' \t\t\n')).toBe(false);
  expect(is.numericString(1)).toBe(false);
});

test('is.emptyString supplemental', () => {
  expect(is.emptyString('☕')).toBe(false);
});

test('is.emptyStringOrWhitespace supplemental', () => {
  expect(is.emptyStringOrWhitespace('  ')).toBe(true);
  expect(is.emptyStringOrWhitespace('☕')).toBe(false);
  expect(is.emptyStringOrWhitespace('coffee')).toBe(false);

  let value = 'test'; // eslint-disable-line prefer-const -- can't use `const` here because then it will be inferred as `never` in the `if` block
  if (is.emptyStringOrWhitespace(value)) {
    value.charAt(0); // Should be inferred as `'' | Whitespace` and not `never`
  } else {
    value.charAt(0); // Should be inferred as `string` and not `never`
  }
});

test('is.nonEmptyString', () => {
  expect(is.nonEmptyString('')).toBe(false);
  expect(is.nonEmptyString(String())).toBe(false);
  expect(is.nonEmptyString('☕')).toBe(true);
});

test('is.nonEmptyStringAndNotWhitespace', () => {
  expect(is.nonEmptyStringAndNotWhitespace(' ')).toBe(false);
  expect(is.nonEmptyStringAndNotWhitespace('☕')).toBe(true);

  for (const value of [null, undefined, 5, Number.NaN, {}, []]) {
    expect(is.nonEmptyStringAndNotWhitespace(value)).toBe(false);
  }
});

test('is.whitespaceString', () => {
  expect(is.whitespaceString(' ')).toBe(true);
  expect(is.whitespaceString('   ')).toBe(true);
  expect(is.whitespaceString(' 　 ')).toBe(true);
  expect(is.whitespaceString('\u3000')).toBe(true);
  expect(is.whitespaceString('　')).toBe(true);
  expect(is.whitespaceString('')).toBe(false);
  expect(is.whitespaceString('-')).toBe(false);
  expect(is.whitespaceString(' hi ')).toBe(false);
});
