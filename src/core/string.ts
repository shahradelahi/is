import type { NonEmptyString, Whitespace } from '../typings';
import { isString } from './primitives';

export function isEmptyString(value: unknown): value is '' {
  return isString(value) && value.length === 0;
}

export function isWhitespaceString(value: unknown): value is Whitespace {
  return isString(value) && /^\s+$/.test(value);
}

export function isEmptyStringOrWhitespace(value: unknown): value is '' | Whitespace {
  return isEmptyString(value) || isWhitespaceString(value);
}

export function isNonEmptyString(value: unknown): value is NonEmptyString {
  return isString(value) && value.length > 0;
}

export function isNonEmptyStringAndNotWhitespace(value: unknown): value is NonEmptyString {
  return isString(value) && !isEmptyStringOrWhitespace(value);
}

export function isNumericString(value: unknown): value is `${number}` {
  return isString(value) && !isEmptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
}

export function isJson(value: unknown): boolean {
  if (!isString(value)) return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function isBase64(value: unknown): boolean {
  if (!isString(value) || value.length === 0 || value.length % 4 !== 0) return false;
  try {
    return btoa(atob(value)) === value;
  } catch {
    return false;
  }
}
