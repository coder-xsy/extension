'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + '/popup/index.js',
      contentScript: PATHS.src + '/content/index.js',
      background: PATHS.src + '/background/index.js',
      option: PATHS.src + '/option/index.js'
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
