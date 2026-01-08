import fs, { mkdtempSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import Stream from 'node:stream';
import { expect, test } from 'vitest';

import is from '../index';

const tempDir = mkdtempSync('rx');
const tempFile = path.join(tempDir, 'temp');
writeFileSync(tempFile, '');
process.on('beforeExit', () => fs.unlinkSync(tempDir));

test('is.asyncGenerator supplemental', () => {
  const fixture = (async function* () {
    yield 4;
  })();
  if (is.asyncGenerator(fixture)) {
    expect(is.function(fixture.next)).toBe(true);
  }
});

test('is.nodeStream', () => {
  expect(is.nodeStream(fs.createReadStream('README.md'))).toBe(true);
  expect(is.nodeStream(fs.createWriteStream(tempFile))).toBe(true);
  expect(is.nodeStream(new net.Socket())).toBe(true);
  expect(is.nodeStream(new Stream.Duplex())).toBe(true);
  expect(is.nodeStream(new Stream.PassThrough())).toBe(true);
  expect(is.nodeStream(new Stream.Readable())).toBe(true);
  expect(is.nodeStream(new Stream.Transform())).toBe(true);
  expect(is.nodeStream(new Stream.Stream())).toBe(true);
  expect(is.nodeStream(new Stream.Writable())).toBe(true);
  expect(is.nodeStream({})).toBe(false);
});
