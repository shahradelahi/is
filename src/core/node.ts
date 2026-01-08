import { typeOf } from '@se-oss/typeof';

import type { NodeBuffer, NodeStream } from '../typings';
import { isFunction } from './functions';
import { isObservable } from './misc';
import { isObject } from './objects';

/**
 Note: [Prefer using `Uint8Array` instead of `Buffer`.](https://sindresorhus.com/blog/goodbye-nodejs-buffer)
 */
export function isBuffer(value: unknown): value is NodeBuffer {
  return typeOf(value) === 'buffer';
}

export function isNodeStream(value: unknown): value is NodeStream {
  return isObject(value) && isFunction((value as NodeStream).pipe) && !isObservable(value);
}
