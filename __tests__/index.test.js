import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json files difference', () => {
  const fixturePath = getFixturePath('expected.json.txt');
  const expected = fs.readFileSync(fixturePath, 'utf-8');
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(genDiff(before, after)).toBe(expected);
});

test('yml files difference', () => {
  const fixturePath = getFixturePath('expected.yaml.txt');
  const expected = fs.readFileSync(fixturePath, 'utf-8');
  const before = getFixturePath('before.yaml');
  const after = getFixturePath('after.yaml');
  expect(genDiff(before, after)).toBe(expected);
});
