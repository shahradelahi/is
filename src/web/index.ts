import { typeOf } from '@se-oss/typeof';

import { isObject, isPlainObject } from '../core/objects';
import { isString } from '../core/primitives';
import type { URLString } from '../typings';

const NODE_TYPE_ELEMENT = 1;

const DOM_PROPERTIES_TO_CHECK: Array<keyof HTMLElement> = [
  'innerHTML',
  'ownerDocument',
  'style',
  'attributes',
  'nodeValue',
];

export function isHtmlElement(value: unknown): value is HTMLElement {
  if (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement) {
    return true;
  }

  return (
    isObject(value) &&
    (value as HTMLElement).nodeType === NODE_TYPE_ELEMENT &&
    isString((value as HTMLElement).nodeName) &&
    !isPlainObject(value) &&
    DOM_PROPERTIES_TO_CHECK.every((property) => property in value)
  );
}

export function isBlob(value: unknown): value is Blob {
  return typeOf(value) === 'blob';
}

export function isFormData(value: unknown): value is FormData {
  return typeOf(value) === 'formdata';
}

export function isUrlSearchParams(value: unknown): value is URLSearchParams {
  return typeOf(value) === 'urlsearchparams';
}

export function isUrlInstance(value: unknown): value is URL {
  return typeOf(value) === 'url';
}

export function isUrlString(value: unknown): value is URLString {
  if (!isString(value)) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isIpv4(value: unknown): boolean {
  if (!isString(value)) return false;
  const parts = value.split('.');
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const n = Number(part);
    return n >= 0 && n <= 255 && String(n) === part;
  });
}

export function isIpv6(value: unknown): boolean {
  if (!isString(value)) return false;
  const regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return regex.test(value);
}

export function isHexColor(value: unknown): boolean {
  if (!isString(value)) return false;
  return /^#([A-Fa-f0-9]{3}){1,2}$|^#([A-Fa-f0-9]{4}){1,2}$/.test(value);
}
