import { expect, test } from 'vitest';

import is from '../index';

test('is.boundFunction supplemental', () => {
  expect(is.boundFunction(function () {})).toBe(false);
});

test('is.asyncFunction supplemental', () => {
  const fixture = async () => {};
  if (is.asyncFunction(fixture)) {
    expect(is.function(fixture().then)).toBe(true);
  }
});

test('is.asyncGeneratorFunction supplemental', () => {
  const fixture = async function* () {
    yield 4;
  };

  if (is.asyncGeneratorFunction(fixture)) {
    expect(is.function(fixture().next)).toBe(true);
  }
});

test('is.class', () => {
  class Foo {}

  // Note: Using new Function to prevent whitespace modifications in tsimp
  const minifiedClass = new Function('return class{};');

  const classDeclarations = [Foo, class Bar extends Foo {}, minifiedClass()];

  for (const classDeclaration of classDeclarations) {
    expect(is.class(classDeclaration)).toBe(true);
  }
});
