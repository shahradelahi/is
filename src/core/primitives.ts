import { primitiveTypeNames } from '../typings';
import type { Falsy, Primitive, PrimitiveTypeName } from '../typings';

export function isPrimitiveTypeName(name: unknown): name is PrimitiveTypeName {
  return primitiveTypeNames.includes(name as PrimitiveTypeName);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

export function isBigint(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isNan(value: unknown): value is number {
  return Number.isNaN(value);
}

export function isPrimitive(value: unknown): value is Primitive {
  return isNull(value) || isPrimitiveTypeName(typeof value);
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

export function isTruthy<T>(value: T | Falsy): value is T {
  return Boolean(value);
}

export function isFalsy(value: unknown): value is Falsy {
  return !value;
}
