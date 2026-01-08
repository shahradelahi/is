import { isArray, isMap, isObject, isSet } from './objects';

export function isEmptyArray(value: unknown): value is never[] {
  return isArray(value) && value.length === 0;
}

export function isNonEmptyArray<T = unknown, Item = unknown>(
  value: T | Item[]
): value is [Item, ...Item[]] {
  return isArray(value) && value.length > 0;
}

export function isEmptyMap(value: unknown): value is Map<never, never> {
  return isMap(value) && value.size === 0;
}

export function isNonEmptyMap<Key = unknown, Value = unknown>(
  value: unknown
): value is Map<Key, Value> {
  return isMap(value) && value.size > 0;
}

export function isEmptySet(value: unknown): value is Set<never> {
  return isSet(value) && value.size === 0;
}

export function isNonEmptySet<T = unknown>(value: unknown): value is Set<T> {
  return isSet(value) && value.size > 0;
}

export function isEmptyObject<Key extends keyof any = string>(
  value: unknown
): value is Record<Key, never> {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length === 0;
}

export function isNonEmptyObject<Key extends keyof any = string, Value = unknown>(
  value: unknown
): value is Record<Key, Value> {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length > 0;
}
