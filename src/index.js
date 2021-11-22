import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import parse from './parsers.js';

const getType = (pathToFile) => path.extname(pathToFile).slice(1);
const getData = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const getKeys = (data1, data2) => _.sortBy(
  _.uniq([..._.keys(data1), ..._.keys(data2)]),
);

const getDifference = (keys, data1, data2) => keys.reduce((acc, key) => {
  if (data1[key] === data2[key]) {
    return [...acc, `    ${key}: ${data2[key]}`];
  }
  if (_.has(data1, key) && !_.has(data2, key)) {
    return [...acc, `  - ${key}: ${data1[key]}`];
  }
  if (!_.has(data1, key) && _.has(data2, key)) {
    return [...acc, `  + ${key}: ${data2[key]}`];
  }
  return [...acc, `  + ${key}: ${data2[key]}`, `  - ${key}: ${data1[key]}`];
}, []);

export default (firstConfig, secondConfig) => {
  const type1 = getType(firstConfig);
  const type2 = getType(secondConfig);
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const parsedData1 = parse(type1, data1);
  const parsedData2 = parse(type2, data2);
  const keysOfConfigFiles = getKeys(parsedData1, parsedData2);
  const difference = getDifference(keysOfConfigFiles, parsedData1, parsedData2);
  return `{\n${difference.join('\n')}\n}`;
};
