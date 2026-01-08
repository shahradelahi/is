import type {
  ArrayLike,
  Class,
  ObservableLike,
  ResolveTypesOfTypeGuardsTuple,
  TypeGuard,
} from '../typings';
import { isFunction } from './functions';
import { isAny } from './logical';
import { isSafeInteger } from './numeric';
import { isArray, isDate } from './objects';
import { isNan, isNullOrUndefined, isNumber, isString, isSymbol } from './primitives';

export function isObservable(value: unknown): value is ObservableLike {
  if (!value) {
    return false;
  }

  if (Symbol.observable !== undefined && value === (value as any)[Symbol.observable]?.()) {
    return true;
  }

  if (value === (value as any)['@@observable']?.()) {
    return true;
  }

  return false;
}

export function isIterable<T = unknown>(value: unknown): value is Iterable<T> {
  return isFunction((value as Iterable<T>)?.[Symbol.iterator]);
}

export function isAsyncIterable<T = unknown>(value: unknown): value is AsyncIterable<T> {
  return isFunction((value as AsyncIterable<T>)?.[Symbol.asyncIterator]);
}

export function isGenerator(value: unknown): value is Generator {
  return (
    isIterable(value) &&
    isFunction((value as Generator)?.next) &&
    isFunction((value as Generator)?.throw)
  );
}

export function isAsyncGenerator(value: unknown): value is AsyncGenerator {
  return (
    isAsyncIterable(value) &&
    isFunction((value as AsyncGenerator).next) &&
    isFunction((value as AsyncGenerator).throw)
  );
}

export function isEnumCase<T = unknown>(value: unknown, targetEnum: T): value is T[keyof T] {
  return Object.values(targetEnum as any).includes(value as string);
}

export function isDirectInstanceOf<T>(instance: unknown, class_: Class<T>): instance is T {
  if (instance === undefined || instance === null) {
    return false;
  }

  return Object.getPrototypeOf(instance) === class_.prototype;
}

export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !isNan(Number(value));
}

export function isArrayLike<T = unknown>(value: unknown): value is ArrayLike<T> {
  return (
    !isNullOrUndefined(value) &&
    !isFunction(value) &&
    isSafeInteger((value as ArrayLike<T>).length) &&
    (value as ArrayLike<T>).length >= 0
  );
}

export function isTupleLike<T extends Array<TypeGuard<unknown>>>(
  value: unknown,
  guards: [...T]
): value is ResolveTypesOfTypeGuardsTuple<T> {
  if (isArray(guards) && isArray(value) && guards.length === value.length) {
    return guards.every((guard, index) => guard(value[index]));
  }

  return false;
}

export function isPropertyKey(value: unknown): value is PropertyKey {
  return isAny([isString, isNumber, isSymbol] as any, value);
}
