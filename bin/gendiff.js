#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

const { version, description } = json;

const program = new Command();

program
  .description(description)
  .version(`gendiff version: ${version}`, '-v, --version', 'output the version number');

program.parse();
