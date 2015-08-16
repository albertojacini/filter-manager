/**
 * Babel Starter Kit | https://github.com/kriasoft/babel-starter-kit
 * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
 */

import del from 'del';
import fs from './utils/fs';
import { rootDir } from './config';

// Clean output directories
const cleanup = async () => new Promise((resolve) => {
  del(['build/*', 'lib/*', '!build/.git'], { dot: true }, async () => {
    await fs.makeDir('build');
    await fs.makeDir('lib');
    resolve();
  });
});

// Compile the source code into a distributable format
const src = async () => {
  const babel = require('babel');
  const files = await fs.getFiles('src');

  for (let file of files) {
    let source = await fs.readFile('src/' + file);
    let result = babel.transform(source);
    await fs.writeFile('lib/' + file, result.code);
    await fs.writeFile('lib/' + file.substr(0, file.length - 3) + '.babel.js', source);
  }
};

// Run all build steps in sequence
(async () => {
  try {
    console.log('clean');
    await cleanup();
    console.log('compile src');
    await src();
  } catch (err) {
    console.error(err.stack);
  }
})();
