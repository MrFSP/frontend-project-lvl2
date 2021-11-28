import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, extension) => path
  .join(__dirname, '..', '__fixtures__', `${filename}${extension}`);

const extensions = ['.json', '.yaml'];
const typeOfCall = [
  { fileName: 'expected.stylish' },
  { format: 'stylish', fileName: 'expected.stylish' },
  { format: 'plain', fileName: 'expected.plain' },
];

const types = extensions
  .flatMap((extension) => typeOfCall
    .flatMap((type) => ({ extension, type })));

test.each(types)(
  '%#  %j',
  (iter) => {
    const { extension, type } = iter;
    const { format, fileName } = type;
    const fixturePath1 = getFixturePath('file1', extension);
    const fixturePath2 = getFixturePath('file2', extension);
    const pathToExpected = getFixturePath(fileName, '.txt');
    const expectedData = fs.readFileSync(pathToExpected, 'utf-8');
    expect(genDiff(fixturePath1, fixturePath2, format)).toBe(expectedData);
  },
);
