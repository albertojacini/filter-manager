/**
 * Babel Starter Kit | https://github.com/kriasoft/babel-starter-kit
 * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
 */

import browserify from 'browserify';
import babelify from 'babelify';
import fs from './fs';

const js = async (options) => new Promise((resolve, reject) => {
  options = options || {};
  browserify('docs/js/main.js', {
    debug: !!options.debug,
    transform: [babelify]
  }).bundle((err, buffer) => {
    if (err) {
      reject(err);
    } else {
      resolve(buffer.toString('utf8'));
    }
  });
});

export default { js };
