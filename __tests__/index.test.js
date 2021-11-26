import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, extension) => path
  .join(__dirname, '..', '__fixtures__', `${filename}${extension}`);

const types = ['.json', '.yaml'];

test.each(types)(
  '%#  %j',
  (type) => {
    const fixturePath1 = getFixturePath('file1', type);
    const fixturePath2 = getFixturePath('file2', type);
    const pathToExpected = getFixturePath('expected.stylish', '.txt');
    const expectedData = fs.readFileSync(pathToExpected, 'utf-8');
    expect(genDiff(fixturePath1, fixturePath2)).toBe(expectedData);
  },
);
