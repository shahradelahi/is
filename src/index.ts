import { isBuffer, isNodeStream } from './core/node';
import { typeOf } from '@se-oss/typeof';

import {
  isEmptyArray,
  isEmptyMap,
  isEmptyObject,
  isEmptySet,
  isNonEmptyArray,
  isNonEmptyMap,
  isNonEmptyObject,
  isNonEmptySet,
} from './core/collections';
import {
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isBoundFunction,
  isClass,
  isFunction,
  isGeneratorFunction,
} from './core/functions';
import { isAll, isAny, isOptional } from './core/logical';
import {
  isArrayLike,
  isAsyncGenerator,
  isAsyncIterable,
  isDirectInstanceOf,
  isEnumCase,
  isGenerator,
  isIterable,
  isObservable,
  isPropertyKey,
  isTupleLike,
  isValidDate,
} from './core/misc';
import {
  isEvenInteger,
  isFinite,
  isInfinite,
  isInRange,
  isInteger,
  isNegativeNumber,
  isOddInteger,
  isPositiveNumber,
  isSafeInteger,
  isValidLength,
} from './core/numeric';
import {
  isArray,
  isArrayBuffer,
  isBigInt64Array,
  isBigUint64Array,
  isDataView,
  isDate,
  isError,
  isFloat32Array,
  isFloat64Array,
  isInt8Array,
  isInt16Array,
  isInt32Array,
  isMap,
  isNativePromise,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isSet,
  isSharedArrayBuffer,
  isTypedArray,
  isUint8Array,
  isUint8ClampedArray,
  isUint16Array,
  isUint32Array,
  isWeakMap,
  isWeakRef,
  isWeakSet,
} from './core/objects';
import {
  isBigint,
  isBoolean,
  isFalsy,
  isNan,
  isNull,
  isNullOrUndefined,
  isNumber,
  isPrimitive,
  isString,
  isSymbol,
  isTruthy,
  isUndefined,
} from './core/primitives';
import {
  isBase64,
  isEmptyString,
  isEmptyStringOrWhitespace,
  isJson,
  isNonEmptyString,
  isNonEmptyStringAndNotWhitespace,
  isNumericString,
  isWhitespaceString,
} from './core/string';
import type { ObjectTypeName, TypeName } from './typings';
import {
  isBlob,
  isFormData,
  isHexColor,
  isHtmlElement,
  isIpv4,
  isIpv6,
  isUrlInstance,
  isUrlSearchParams,
  isUrlString,
} from './web';

const typeNameMapping = {
  array: 'Array',
  arraybuffer: 'ArrayBuffer',
  asyncfunction: 'AsyncFunction',
  asyncgenerator: 'AsyncGenerator',
  asyncgeneratorfunction: 'AsyncGeneratorFunction',
  blob: 'Blob',
  biguint64array: 'BigUint64Array',
  bigint64array: 'BigInt64Array',
  buffer: 'Buffer',
  dataview: 'DataView',
  date: 'Date',
  error: 'Error',
  float32array: 'Float32Array',
  float64array: 'Float64Array',
  formdata: 'FormData',
  function: 'Function',
  generator: 'Generator',
  generatorfunction: 'GeneratorFunction',
  int16array: 'Int16Array',
  int32array: 'Int32Array',
  int8array: 'Int8Array',
  map: 'Map',
  object: 'Object',
  promise: 'Promise',
  regexp: 'RegExp',
  set: 'Set',
  sharedarraybuffer: 'SharedArrayBuffer',
  uint16array: 'Uint16Array',
  uint32array: 'Uint32Array',
  uint8array: 'Uint8Array',
  uint8clampedarray: 'Uint8ClampedArray',
  url: 'URL',
  urlsearchparams: 'URLSearchParams',
  weakmap: 'WeakMap',
  weakref: 'WeakRef',
  weakset: 'WeakSet',
} as const;

const getTypeName = (value: unknown): ObjectTypeName | undefined => {
  const type = typeOf(value);

  if (type in typeNameMapping) {
    return typeNameMapping[type as keyof typeof typeNameMapping];
  }

  if (type.startsWith('html') && type.endsWith('element') && isHtmlElement(value)) {
    return 'HTMLElement';
  }

  return undefined;
};

const typeMap = {
  undefined: 'undefined',
  string: 'string',
  boolean: 'boolean',
  function: 'Function',
  bigint: 'bigint',
  symbol: 'symbol',
} as const;

function detect(value: unknown): TypeName {
  if (value === null) {
    return 'null';
  }

  const nativeType = typeof value;
  if (nativeType in typeMap) {
    return typeMap[nativeType as keyof typeof typeMap];
  }

  if (nativeType === 'number') {
    return Number.isNaN(value) ? 'NaN' : 'number';
  }

  if (isObservable(value)) {
    return 'Observable';
  }

  if (isArray(value)) {
    return 'Array';
  }

  if (isBuffer(value)) {
    return 'Buffer';
  }

  const tagType = getTypeName(value);
  if (tagType && tagType !== 'Object') {
    return tagType;
  }

  if (isPromise(value)) {
    return 'Promise';
  }

  if (value instanceof String || value instanceof Boolean || value instanceof Number) {
    throw new TypeError("Please don't use object wrappers for primitive types");
  }

  return 'Object';
}

export const is = Object.assign(detect, {
  all: isAll,
  any: isAny,
  array: isArray,
  arrayBuffer: isArrayBuffer,
  arrayLike: isArrayLike,
  asyncFunction: isAsyncFunction,
  asyncGenerator: isAsyncGenerator,
  asyncGeneratorFunction: isAsyncGeneratorFunction,
  asyncIterable: isAsyncIterable,
  base64: isBase64,
  bigint: isBigint,
  bigInt64Array: isBigInt64Array,
  bigUint64Array: isBigUint64Array,
  blob: isBlob,
  boolean: isBoolean,
  boundFunction: isBoundFunction,
  buffer: isBuffer,
  class: isClass,
  dataView: isDataView,
  date: isDate,
  detect,
  directInstanceOf: isDirectInstanceOf,
  emptyArray: isEmptyArray,
  emptyMap: isEmptyMap,
  emptyObject: isEmptyObject,
  emptySet: isEmptySet,
  emptyString: isEmptyString,
  emptyStringOrWhitespace: isEmptyStringOrWhitespace,
  enumCase: isEnumCase,
  error: isError,
  evenInteger: isEvenInteger,
  falsy: isFalsy,
  finite: isFinite,
  float32Array: isFloat32Array,
  float64Array: isFloat64Array,
  formData: isFormData,
  function: isFunction,
  generator: isGenerator,
  generatorFunction: isGeneratorFunction,
  hexColor: isHexColor,
  htmlElement: isHtmlElement,
  infinite: isInfinite,
  inRange: isInRange,
  int16Array: isInt16Array,
  int32Array: isInt32Array,
  int8Array: isInt8Array,
  integer: isInteger,
  ipv4: isIpv4,
  ipv6: isIpv6,
  iterable: isIterable,
  json: isJson,
  map: isMap,
  nan: isNan,
  nativePromise: isNativePromise,
  negativeNumber: isNegativeNumber,
  nodeStream: isNodeStream,
  nonEmptyArray: isNonEmptyArray,
  nonEmptyMap: isNonEmptyMap,
  nonEmptyObject: isNonEmptyObject,
  nonEmptySet: isNonEmptySet,
  nonEmptyString: isNonEmptyString,
  nonEmptyStringAndNotWhitespace: isNonEmptyStringAndNotWhitespace,
  null: isNull,
  nullOrUndefined: isNullOrUndefined,
  number: isNumber,
  numericString: isNumericString,
  object: isObject,
  observable: isObservable,
  oddInteger: isOddInteger,
  optional: isOptional,
  plainObject: isPlainObject,
  positiveNumber: isPositiveNumber,
  primitive: isPrimitive,
  promise: isPromise,
  propertyKey: isPropertyKey,
  regExp: isRegExp,
  safeInteger: isSafeInteger,
  set: isSet,
  sharedArrayBuffer: isSharedArrayBuffer,
  string: isString,
  symbol: isSymbol,
  truthy: isTruthy,
  tupleLike: isTupleLike,
  typedArray: isTypedArray,
  uint16Array: isUint16Array,
  uint32Array: isUint32Array,
  uint8Array: isUint8Array,
  uint8ClampedArray: isUint8ClampedArray,
  undefined: isUndefined,
  urlInstance: isUrlInstance,
  urlSearchParams: isUrlSearchParams,
  urlString: isUrlString,
  validDate: isValidDate,
  validLength: isValidLength,
  weakMap: isWeakMap,
  weakRef: isWeakRef,
  weakSet: isWeakSet,
  whitespaceString: isWhitespaceString,
});

export default is;

export * from './core/collections';
export * from './core/functions';
export * from './core/logical';
export * from './core/misc';
export * from './core/node';
export * from './core/numeric';
export * from './core/objects';
export * from './core/primitives';
export * from './core/string';
export * from './web';

export type {
  ArrayLike,
  AssertionTypeDescription,
  Class,
  NodeStream,
  ObservableLike,
  Predicate,
  Primitive,
  TypedArray,
  TypeName,
  URLString,
} from './typings';
