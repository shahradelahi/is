import { Buffer } from 'node:buffer';
import Stream from 'node:stream';
import { inspect } from 'node:util';
import { JSDOM } from 'jsdom';
import { Observable } from 'rxjs';
import { describe, expect, test } from 'vitest';

import is from '.';

const { window } = new JSDOM();
const { document } = window;

const typeFixtures = [
  { val: undefined, method: 'undefined', tag: 'undefined' },
  { val: null, method: 'null', tag: 'null' },
  { val: '☕', method: 'string', tag: 'string' },
  { val: 123, method: 'number', tag: 'number' },
  { val: NaN, method: 'nan', tag: 'NaN' },
  { val: 1n, method: 'bigint', tag: 'bigint' },
  { val: true, method: 'boolean', tag: 'boolean' },
  { val: Symbol('☕'), method: 'symbol', tag: 'symbol' },
  { val: [1, 2], method: 'array', tag: 'Array' },
  { val: { x: 1 }, method: 'plainObject', tag: 'Object' },
  { val: function () {}, method: 'function', tag: 'Function' },
  { val: async function () {}, method: 'asyncFunction', tag: 'Function' },
  { val: function* () {}, method: 'generatorFunction', tag: 'Function' },
  { val: async function* () {}, method: 'asyncGeneratorFunction', tag: 'Function' },
  { val: (function* () {})(), method: 'generator', tag: 'Generator' },
  { val: (async function* () {})(), method: 'asyncGenerator', tag: 'AsyncGenerator' },
  { val: Buffer.from('☕'), method: 'buffer', tag: 'Buffer' },
  { val: new window.Blob(), method: 'blob', tag: 'Blob' },
  { val: /\w/, method: 'regExp', tag: 'RegExp' },
  { val: new Date(), method: 'date', tag: 'Date' },
  { val: new Error('☕'), method: 'error', tag: 'Error' },
  { val: Promise.resolve(), method: 'nativePromise', tag: 'Promise' },
  { val: new Map(), method: 'map', tag: 'Map' },
  { val: new Set(), method: 'set', tag: 'Set' },
  { val: new WeakSet(), method: 'weakSet', tag: 'WeakSet' },
  { val: new window.WeakRef({}), method: 'weakRef', tag: 'WeakRef' },
  { val: new WeakMap(), method: 'weakMap', tag: 'WeakMap' },
  { val: new Int8Array(), method: 'int8Array', tag: 'Int8Array' },
  { val: new Uint8Array(), method: 'uint8Array', tag: 'Uint8Array' },
  { val: new Uint8ClampedArray(), method: 'uint8ClampedArray', tag: 'Uint8ClampedArray' },
  { val: new Int16Array(), method: 'int16Array', tag: 'Int16Array' },
  { val: new Uint16Array(), method: 'uint16Array', tag: 'Uint16Array' },
  { val: new Int32Array(), method: 'int32Array', tag: 'Int32Array' },
  { val: new Uint32Array(), method: 'uint32Array', tag: 'Uint32Array' },
  { val: new Float32Array(), method: 'float32Array', tag: 'Float32Array' },
  { val: new Float64Array(), method: 'float64Array', tag: 'Float64Array' },
  { val: new BigInt64Array(), method: 'bigInt64Array', tag: 'BigInt64Array' },
  { val: new BigUint64Array(), method: 'bigUint64Array', tag: 'BigUint64Array' },
  { val: new ArrayBuffer(10), method: 'arrayBuffer', tag: 'ArrayBuffer' },
  { val: new DataView(new ArrayBuffer(10)), method: 'dataView', tag: 'DataView' },
  { val: document.createElement('div'), method: 'htmlElement', tag: 'HTMLElement' },
  { val: new Observable(), method: 'observable', tag: 'Observable' },
  { val: new window.FormData(), method: 'formData', tag: 'FormData' },
  { val: new URLSearchParams(), method: 'urlSearchParams', tag: 'URLSearchParams' },
  { val: new URL('https://example.com'), method: 'urlInstance', tag: 'URL' },
] as const;

describe('Type Detection (is(value))', () => {
  test.each(typeFixtures)('is($method fixture) returns "$tag"', ({ val, tag }) => {
    expect(is(val)).toBe(tag);
  });
});

describe('Exclusivity Matrix', () => {
  const overlaps = new Map<string, string[]>([
    ['int8Array', ['typedArray', 'object']],
    ['uint8Array', ['typedArray', 'object']],
    ['uint8ClampedArray', ['typedArray', 'object']],
    ['int16Array', ['typedArray', 'object']],
    ['uint16Array', ['typedArray', 'object']],
    ['int32Array', ['typedArray', 'object']],
    ['uint32Array', ['typedArray', 'object']],
    ['float32Array', ['typedArray', 'object']],
    ['float64Array', ['typedArray', 'object']],
    ['bigInt64Array', ['typedArray', 'object']],
    ['bigUint64Array', ['typedArray', 'object']],
    ['plainObject', ['object']],
    ['array', ['object']],
    ['map', ['object']],
    ['set', ['object']],
    ['weakSet', ['object']],
    ['weakMap', ['object']],
    ['weakRef', ['object']],
    ['date', ['object']],
    ['error', ['object']],
    ['regExp', ['object']],
    ['nativePromise', ['promise', 'object']],
    ['asyncFunction', ['function']],
    ['generatorFunction', ['function']],
    ['asyncGeneratorFunction', ['function']],
    ['generator', ['object']],
    ['asyncGenerator', ['object']],
    ['buffer', ['uint8Array', 'object', 'typedArray']],
  ]);

  typeFixtures.forEach((correct) => {
    describe(`Value: ${correct.method}`, () => {
      typeFixtures.forEach((other) => {
        const isSame = correct.method === other.method;
        const isOverlap = overlaps.get(correct.method)?.includes(other.method) ?? false;
        const expected = isSame || isOverlap;

        test(`is.${other.method}() should be ${expected}`, () => {
          // @ts-expect-error - Dynamic access
          const result = is[other.method](correct.val);
          expect(
            result,
            `is.${other.method}() should be ${expected}. Fixture: ${inspect(correct.val)}`
          ).toBe(expected);
        });
      });
    });
  });
});

describe('Node.js Specific Exclusivity', () => {
  test('is.nodeStream exclusivity', () => {
    const stream = new Stream.Readable();
    expect(is.nodeStream(stream)).toBe(true);
    expect(is.observable(stream)).toBe(false);
  });
});
