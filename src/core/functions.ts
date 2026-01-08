import { typeOf } from '@se-oss/typeof';

import type { Class } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isAsyncFunction<T = unknown>(
  value: unknown
): value is (...arguments_: any[]) => Promise<T> {
  return typeOf(value) === 'asyncfunction';
}

export function isGeneratorFunction(value: unknown): value is GeneratorFunction {
  return typeOf(value) === 'generatorfunction';
}

export function isAsyncGeneratorFunction(
  value: unknown
): value is (...arguments_: any[]) => Promise<unknown> {
  return typeOf(value) === 'asyncgeneratorfunction';
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isBoundFunction(value: unknown): value is Function {
  return isFunction(value) && !Object.hasOwn(value, 'prototype');
}

export function isClass<T = unknown>(value: unknown): value is Class<T> {
  return isFunction(value) && /^class(\s+|{)/.test(value.toString());
}
