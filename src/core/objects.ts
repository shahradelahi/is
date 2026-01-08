import { typeOf } from '@se-oss/typeof';

import type { TypedArray } from '../typings';
import { isFunction } from './functions';
import { isNull } from './primitives';

export function isObject(value: unknown): value is object {
  return !isNull(value) && (typeof value === 'object' || isFunction(value));
}

export function isPlainObject<Value = unknown>(
  value: unknown
): value is Record<PropertyKey, Value> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}

export function isArray<T = unknown>(
  value: unknown,
  assertion?: (value: T) => value is T
): value is T[] {
  if (!Array.isArray(value)) {
    return false;
  }

  if (!isFunction(assertion)) {
    return true;
  }

  return value.every((element) => assertion(element as T));
}

export function isMap<Key = unknown, Value = unknown>(value: unknown): value is Map<Key, Value> {
  return typeOf(value) === 'map';
}

export function isSet<T = unknown>(value: unknown): value is Set<T> {
  return typeOf(value) === 'set';
}

export function isWeakMap<Key extends object = object, Value = unknown>(
  value: unknown
): value is WeakMap<Key, Value> {
  return typeOf(value) === 'weakmap';
}

export function isWeakSet(value: unknown): value is WeakSet<object> {
  return typeOf(value) === 'weakset';
}

export function isWeakRef(value: unknown): value is WeakRef<object> {
  return typeOf(value) === 'weakref';
}

export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return typeOf(value) === 'arraybuffer';
}

export function isSharedArrayBuffer(value: unknown): value is SharedArrayBuffer {
  return typeOf(value) === 'sharedarraybuffer';
}

export function isDataView(value: unknown): value is DataView {
  return typeOf(value) === 'dataview';
}

const typedArrayTypes = new Set([
  'buffer',
  'int8array',
  'uint8array',
  'uint8clampedarray',
  'int16array',
  'uint16array',
  'int32array',
  'uint32array',
  'float32array',
  'float64array',
  'bigint64array',
  'biguint64array',
]);

export function isTypedArray(value: unknown): value is TypedArray {
  return typedArrayTypes.has(typeOf(value));
}

export function isInt8Array(value: unknown): value is Int8Array {
  return typeOf(value) === 'int8array';
}

export function isUint8Array(value: unknown): value is Uint8Array {
  const type = typeOf(value);
  return type === 'uint8array' || type === 'buffer';
}

export function isUint8ClampedArray(value: unknown): value is Uint8ClampedArray {
  return typeOf(value) === 'uint8clampedarray';
}

export function isInt16Array(value: unknown): value is Int16Array {
  return typeOf(value) === 'int16array';
}

export function isUint16Array(value: unknown): value is Uint16Array {
  return typeOf(value) === 'uint16array';
}

export function isInt32Array(value: unknown): value is Int32Array {
  return typeOf(value) === 'int32array';
}

export function isUint32Array(value: unknown): value is Uint32Array {
  return typeOf(value) === 'uint32array';
}

export function isFloat32Array(value: unknown): value is Float32Array {
  return typeOf(value) === 'float32array';
}

export function isFloat64Array(value: unknown): value is Float64Array {
  return typeOf(value) === 'float64array';
}

export function isBigInt64Array(value: unknown): value is BigInt64Array {
  return typeOf(value) === 'bigint64array';
}

export function isBigUint64Array(value: unknown): value is BigUint64Array {
  return typeOf(value) === 'biguint64array';
}

export function isRegExp(value: unknown): value is RegExp {
  return typeOf(value) === 'regexp';
}

export function isDate(value: unknown): value is Date {
  return typeOf(value) === 'date';
}

export function isError(value: unknown): value is Error {
  return typeOf(value) === 'error';
}

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return isNativePromise(value) || hasPromiseApi(value);
}

export function isNativePromise<T = unknown>(value: unknown): value is Promise<T> {
  return typeOf(value) === 'promise';
}

export function hasPromiseApi<T = unknown>(value: unknown): value is Promise<T> {
  return isFunction((value as Promise<T>)?.then) && isFunction((value as Promise<T>)?.catch);
}
