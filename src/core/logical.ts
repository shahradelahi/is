import type { ArrayMethod, Predicate, TypeGuard } from '../typings';
import { isFunction } from './functions';
import { isUndefined } from './primitives';

function validatePredicateArray(predicateArray: readonly Predicate[], allowEmpty: boolean) {
  if (predicateArray.length === 0) {
    if (!allowEmpty) {
      throw new TypeError('Invalid predicate array');
    }
    return;
  }

  for (const predicate of predicateArray) {
    if (!isFunction(predicate)) {
      throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
  }
}

function predicateOnArray(method: ArrayMethod, predicate: Predicate, values: unknown[]) {
  if (!isFunction(predicate)) {
    throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
  }

  if (values.length === 0) {
    throw new TypeError('Invalid number of values');
  }

  return method.call(values, predicate);
}

export function isAll<T1>(predicates: [TypeGuard<T1>]): TypeGuard<T1>;
export function isAll<T1, T2>(predicates: [TypeGuard<T1>, TypeGuard<T2>]): TypeGuard<T1 & T2>;
export function isAll<T1, T2, T3>(
  predicates: [TypeGuard<T1>, TypeGuard<T2>, TypeGuard<T3>]
): TypeGuard<T1 & T2 & T3>;
export function isAll<T1, T2, T3, T4>(
  predicates: [TypeGuard<T1>, TypeGuard<T2>, TypeGuard<T3>, TypeGuard<T4>]
): TypeGuard<T1 & T2 & T3 & T4>;
export function isAll<T1, T2, T3, T4, T5>(
  predicates: [TypeGuard<T1>, TypeGuard<T2>, TypeGuard<T3>, TypeGuard<T4>, TypeGuard<T5>]
): TypeGuard<T1 & T2 & T3 & T4 & T5>;
export function isAll(predicates: ReadonlyArray<TypeGuard<unknown>>): TypeGuard<unknown>;
export function isAll(predicates: readonly Predicate[]): Predicate;
export function isAll(predicate: Predicate | readonly Predicate[], ...values: unknown[]): boolean;
export function isAll(
  predicate: Predicate | readonly Predicate[],
  ...values: unknown[]
): boolean | Predicate {
  if (Array.isArray(predicate)) {
    const predicateArray = predicate as readonly Predicate[];
    validatePredicateArray(predicateArray, values.length === 0);

    const combinedPredicate = (value: unknown) =>
      predicateArray.every((singlePredicate) => singlePredicate(value));
    if (values.length === 0) {
      return combinedPredicate;
    }

    return predicateOnArray(Array.prototype.every, combinedPredicate, values);
  }

  return predicateOnArray(Array.prototype.every, predicate as Predicate, values);
}

export function isAny<T1>(predicates: [TypeGuard<T1>]): TypeGuard<T1>;
export function isAny<T1, T2>(predicates: [TypeGuard<T1>, TypeGuard<T2>]): TypeGuard<T1 | T2>;
export function isAny<T1, T2, T3>(
  predicates: [TypeGuard<T1>, TypeGuard<T2>, TypeGuard<T3>]
): TypeGuard<T1 | T2 | T3>;
export function isAny<T1, T2, T3, T4>(
  predicates: [TypeGuard<T1>, TypeGuard<T2>, TypeGuard<T3>, TypeGuard<T4>]
): TypeGuard<T1 | T2 | T3 | T4>;
export function isAny<T1, T2, T3, T4, T5>(
  predicates: [TypeGuard<T1>, TypeGuard<T2>, TypeGuard<T3>, TypeGuard<T4>, TypeGuard<T5>]
): TypeGuard<T1 | T2 | T3 | T4 | T5>;
export function isAny(predicates: ReadonlyArray<TypeGuard<unknown>>): TypeGuard<unknown>;
export function isAny(predicates: readonly Predicate[]): Predicate;
export function isAny(predicate: Predicate | readonly Predicate[], ...values: unknown[]): boolean;
export function isAny(
  predicate: Predicate | readonly Predicate[],
  ...values: unknown[]
): boolean | Predicate {
  if (Array.isArray(predicate)) {
    const predicateArray = predicate as readonly Predicate[];
    validatePredicateArray(predicateArray, values.length === 0);

    const combinedPredicate = (value: unknown) =>
      predicateArray.some((singlePredicate) => singlePredicate(value));
    if (values.length === 0) {
      return combinedPredicate;
    }

    return predicateOnArray(Array.prototype.some, combinedPredicate, values);
  }

  return predicateOnArray(Array.prototype.some, predicate as Predicate, values);
}

export function isOptional<T>(
  value: unknown,
  predicate: (value: unknown) => value is T
): value is T | undefined {
  return isUndefined(value) || predicate(value);
}
