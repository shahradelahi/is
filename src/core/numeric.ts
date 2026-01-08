import { isArray } from './objects';
import { isNumber } from './primitives';

export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value);
}

export function isInfinite(value: unknown): value is number {
  return value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

export function isNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value < 0;
}

function isAbsoluteModule2(remainder: 0 | 1) {
  return (value: unknown): value is number => isInteger(value) && Math.abs(value % 2) === remainder;
}

export function isEvenInteger(value: unknown): value is number {
  return isAbsoluteModule2(0)(value);
}

export function isOddInteger(value: unknown): value is number {
  return isAbsoluteModule2(1)(value);
}

export function isInRange(value: number, range: number | [number, number]): value is number {
  if (isNumber(range)) {
    return value >= Math.min(0, range) && value <= Math.max(range, 0);
  }

  if (isArray(range) && range.length === 2) {
    return value >= Math.min(...(range as number[])) && value <= Math.max(...(range as number[]));
  }

  throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
}

export function isValidLength(value: unknown): value is number {
  return isSafeInteger(value) && value >= 0;
}

export function isFinite(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}
