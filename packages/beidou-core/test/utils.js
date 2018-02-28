'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');
const mm = require('egg-mock');

const fixtures = path.join(__dirname, 'fixtures');
const eggPath = path.join(__dirname, '..');

exports.createApp = function (name, options) {
  options = formatOptions(name, options);
  return mm.app(options);
};

/**
 * 以 cluster 模式启动 app
 *
 * @param {String} name cluster name.
 * @param {Object} options
 *  - {String} [antxpath] - antx path
 * @return {App} app Application object.
 */
exports.startMaster = function (name, options) {
  options = formatOptions(name, options);
  return mm.cluster(options);
};

exports.getFilepath = function (name) {
  return path.join(fixtures, name);
};

exports.getJSON = function (name) {
  return JSON.parse(fs.readFileSync(exports.getFilepath(name)));
};

// context helper, come from https://github.com/koajs/koa/blob/master/test/context.js
exports.createContext = function (ctx, cb) {
  const app = exports.createApp('apps/alipay-demo');
  return new Promise((resolve, reject) => {
    app.ready(() => {
      const mockCtx = app.mockContext(ctx);
      if (cb) cb(mockCtx);
      resolve(mockCtx);
    });

    app.on('error', (err) => {
      reject(err);
    });
  });
};

exports.createRequest = function (ctx, cb) {
  return new Promise((resolve, reject) => {
    exports.createContext(ctx).then(
      (mockCtx) => {
        const req = mockCtx.request;
        if (cb) cb(req);
        resolve(req);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

exports.createResponse = function (ctx, cb) {
  return new Promise((resolve, reject) => {
    exports.createContext(ctx).then(
      (mockCtx) => {
        const res = mockCtx.response;
        if (cb) cb(res);
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

function formatOptions(name, options) {
  return Object.assign(
    {},
    {
      baseDir: name,
      customEgg: eggPath,
      cache: false,
    },
    options
  );
}
