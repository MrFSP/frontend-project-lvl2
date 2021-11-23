#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import fs from 'fs';
import genDiff from '../src/index.js';

const json = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

const { version, description } = json;

const program = new Command();

program
  .description(description)
  .version(
    `gendiff version: ${version}`,
    '-v, --version',
    'output the version number',
  )
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig);
    console.log(result);
    return result;
  })
  .option(
    '-f, --format [type]',
    'Choose output format.\n\t\t       Types: simple, plain, json.\n\t\t      ',
    'simple',
  );

program.parse();
