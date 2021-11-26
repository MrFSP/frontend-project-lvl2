import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import compareData from './comparison.js';
import render from './stylish.js';

const getType = (pathToFile) => path.extname(pathToFile).slice(1);
const getData = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (firstConfig, secondConfig) => {
  const type1 = getType(firstConfig);
  const type2 = getType(secondConfig);
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const parsedData1 = parse(type1, data1);
  const parsedData2 = parse(type2, data2);
  const comparedData = compareData(parsedData1, parsedData2);
  return render(comparedData);
};
