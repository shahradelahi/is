import { JSDOM } from 'jsdom';
import { expect, expectTypeOf, test } from 'vitest';

import is, { type URLString } from '../index';

const { window } = new JSDOM();
const { document } = window;

test('is.ipv4', () => {
  expect(is.ipv4('127.0.0.1')).toBe(true);
  expect(is.ipv4('192.168.1.1')).toBe(true);
  expect(is.ipv4('0.0.0.0')).toBe(true);
  expect(is.ipv4('255.255.255.255')).toBe(true);
  expect(is.ipv4('256.0.0.1')).toBe(false);
  expect(is.ipv4('1.2.3')).toBe(false);
  expect(is.ipv4('a.b.c.d')).toBe(false);
});

test('is.ipv6', () => {
  expect(is.ipv6('::1')).toBe(true);
  expect(is.ipv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
  expect(is.ipv6('2001:db8:85a3:0:0:8a2e:370:7334')).toBe(true);
  expect(is.ipv6('2001:db8:85a3::8a2e:370:7334')).toBe(true);
  expect(is.ipv6('invalid')).toBe(false);
  expect(is.ipv6('127.0.0.1')).toBe(false);
});

test('is.hexColor', () => {
  expect(is.hexColor('#fff')).toBe(true);
  expect(is.hexColor('#ffffff')).toBe(true);
  expect(is.hexColor('#000000')).toBe(true);
  expect(is.hexColor('#ABCDEF')).toBe(true);
  expect(is.hexColor('fff')).toBe(false);
  expect(is.hexColor('#ffff')).toBe(true); // with alpha
  expect(is.hexColor('#ffffffff')).toBe(true); // with alpha
  expect(is.hexColor('#invalid')).toBe(false);
});

test('is.urlInstance', () => {
  const url = new URL('https://example.com');
  expect(is.urlInstance(url)).toBe(true);
  expect(is.urlInstance({})).toBe(false);
  expect(is.urlInstance(undefined)).toBe(false);
  expect(is.urlInstance(null)).toBe(false);
});

test('is.urlString', () => {
  const url = 'https://example.com';
  expect(is.urlString(url)).toBe(true);
  expect(is.urlString(new URL(url))).toBe(false);
  expect(is.urlString({})).toBe(false);
  expect(is.urlString(undefined)).toBe(false);
  expect(is.urlString(null)).toBe(false);
});

// Type test for urlString narrowing fix (issue #212)
(() => {
  const value: unknown = 'test';

  if (is.urlString(value)) {
    expectTypeOf(value).toEqualTypeOf<URLString>();
    expectTypeOf(value).toMatchTypeOf<string>();
  } else {
    expectTypeOf(value).toEqualTypeOf<unknown>();

    if (typeof value === 'string') {
      expectTypeOf(value).toEqualTypeOf<string>();
    }
  }
})();

test('is.htmlElement supplemental', () => {
  expect(is.htmlElement({ nodeType: 1, nodeName: 'div' })).toBe(false);

  const tagNames = ['div', 'input', 'span', 'img', 'canvas', 'script'] as const;

  for (const tagName of tagNames) {
    const element = document.createElement(tagName);
    expect(is(element)).toBe('HTMLElement');
  }
});

test('is.formData supplemental', () => {
  const data = new window.FormData();
  expect(is.formData(data)).toBe(true);
  expect(is.formData({})).toBe(false);
  expect(is.formData(undefined)).toBe(false);
  expect(is.formData(null)).toBe(false);
});

test('is.urlSearchParams', () => {
  const searchParameters = new URLSearchParams();
  expect(is.urlSearchParams(searchParameters)).toBe(true);
  expect(is.urlSearchParams({})).toBe(false);
  expect(is.urlSearchParams(undefined)).toBe(false);
  expect(is.urlSearchParams(null)).toBe(false);
});
