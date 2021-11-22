import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fixturePath = getFixturePath('expected.txt');
const expected = fs.readFileSync(fixturePath, 'utf-8');

test('json files difference', () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  expect(genDiff(before, after)).toBe(expected);
});
