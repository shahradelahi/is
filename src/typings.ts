/**
 Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
 */
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 Matches a [`class` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
 */
type Constructor<T, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;

/**
 Matches a [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
 */
export type Class<T, Arguments extends unknown[] = any[]> = Constructor<T, Arguments> & {
  prototype: T;
};

/**
 Matches any [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), like `Uint8Array` or `Float64Array`.
 */
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}

/**
 Matches a value that is like an [Observable](https://github.com/tc39/proposal-observable).
 */
export type ObservableLike = {
  subscribe(observer: (value: unknown) => void): void;
  [Symbol.observable](): ObservableLike;
};

export type Falsy = false | 0 | 0n | '' | null | undefined;

export type WeakRef<T extends object> = {
  readonly [Symbol.toStringTag]: 'WeakRef';
  deref(): T | undefined;
};

export type ArrayLike<T> = {
  readonly [index: number]: T;
  readonly length: number;
};

export type NodeStream = {
  pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T;
} & NodeJS.EventEmitter;

export type Predicate = (value: unknown) => boolean;

export type NonEmptyString = string & { 0: string };

export type Whitespace = ' ';

export type URLString = string & { readonly __brand: 'UrlString' };

export type ArrayMethod = (
  function_: (value: unknown, index: number, array: unknown[]) => boolean,
  thisArgument?: unknown
) => boolean;

export type ExtractFromGlobalConstructors<Name extends string> = Name extends string
  ? typeof globalThis extends Record<Name, new (...arguments_: any[]) => infer T>
    ? T
    : never
  : never;

export type NodeBuffer = ExtractFromGlobalConstructors<'Buffer'>;

export const typedArrayTypeNames = [
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
] as const;

export const objectTypeNames = [
  'Function',
  'Generator',
  'AsyncGenerator',
  'GeneratorFunction',
  'AsyncGeneratorFunction',
  'AsyncFunction',
  'Observable',
  'Array',
  'Buffer',
  'Blob',
  'Object',
  'RegExp',
  'Date',
  'Error',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'WeakRef',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Promise',
  'URL',
  'FormData',
  'URLSearchParams',
  'HTMLElement',
  'NaN',
  ...typedArrayTypeNames,
] as const;

export type ObjectTypeName = (typeof objectTypeNames)[number];

export const primitiveTypeNames = [
  'null',
  'undefined',
  'string',
  'number',
  'bigint',
  'boolean',
  'symbol',
] as const;

export type PrimitiveTypeName = (typeof primitiveTypeNames)[number];

export type TypeName = ObjectTypeName | PrimitiveTypeName;

export const assertionTypeDescriptions = [
  'positive number',
  'negative number',
  'Class',
  'string with a number',
  'null or undefined',
  'Iterable',
  'AsyncIterable',
  'native Promise',
  'EnumCase',
  'string with a URL',
  'truthy',
  'falsy',
  'primitive',
  'integer',
  'plain object',
  'TypedArray',
  'array-like',
  'tuple-like',
  'Node.js Stream',
  'infinite number',
  'empty array',
  'non-empty array',
  'empty string',
  'empty string or whitespace',
  'non-empty string',
  'non-empty string and not whitespace',
  'empty object',
  'non-empty object',
  'empty set',
  'non-empty set',
  'empty map',
  'non-empty map',
  'PropertyKey',
  'even integer',
  'odd integer',
  'T',
  'in range',
  'predicate returns truthy for any value',
  'predicate returns truthy for all values',
  'valid Date',
  'valid length',
  'whitespace string',
  'json',
  'base64',
  'ipv4',
  'ipv6',
  'finite',
  'hexColor',
  ...objectTypeNames,
  ...primitiveTypeNames,
] as const;

export type AssertionTypeDescription = (typeof assertionTypeDescriptions)[number];

export type TypeGuard<T> = (value: unknown) => value is T;

export type ResolveTypesOfTypeGuardsTuple<
  TypeGuardsOfT,
  ResultOfT extends unknown[] = [],
> = TypeGuardsOfT extends [TypeGuard<infer U>, ...infer TOthers]
  ? ResolveTypesOfTypeGuardsTuple<TOthers, [...ResultOfT, U]>
  : TypeGuardsOfT extends undefined[]
    ? ResultOfT
    : never;
