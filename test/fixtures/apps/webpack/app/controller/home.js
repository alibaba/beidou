'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// webpack 工作路径
const basePath = path.join(__dirname, '../../');

function compileFile(webpackConfig) {
  const promise = new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            hasError: stats.hasErrors(),
            hasWarning: stats.hasWarnings()
          });
        }
    });
  });
  return promise;
}

exports.index = function* () {
  const type = this.request.query.type;
  let body;
  let webpackConfig;
  const originCwd = process.cwd;
  Object.defineProperty(process, 'cwd', {
    value: () => {
      return basePath;
    }
  });
  if (type === 'dev') {
    webpackConfig = require('../../../../../../lib/core/webpack/webpack.config.dev.js');
  } else {
    webpackConfig = require('../../../../../../lib/core/webpack/webpack.config.prod.js');
  }
  webpackConfig.resolveLoader = { root: path.join(originCwd(), './node_modules')};
  Object.defineProperty(process, 'cwd', {
    value: originCwd
  });
  body = yield compileFile(webpackConfig);
  this.body = body;
  // this.body = process.cwd();
}

exports.isomorphic = function* () {
  try {
    const body = require(path.join(__dirname, '../../client/pages/home/index'));
    this.body = body;
  } catch (e) {
    this.body = `${e.stack}`;
  }
}

