'use strict';

const assert = require('assert');
const util = require('util');

const debug = util.debuglog('beidou-plugin-router');

module.exports = function (app, mapping) {
  assert(typeof mapping === 'object', 'router.mapping must be a plain object');
  registerFromMap(app, mapping);
};

function registerFromMap(app, target, parent = '') {
  if (typeof target === 'object' && !Array.isArray(target)) {
    Object.keys(target).forEach((key) => {
      registerFromMap(app, target[key], `${parent}/${key}`);
    });
  } else if (typeof target === 'string' || Array.isArray(target)) {
    register(app, parent, target);
  }
}

function register(app, url, method) {
  if (!Array.isArray(method)) {
    method = [method];
  }
  debug('register router for %s, with method: %j', url, method);
  app.router.register(url, method, handler);
}

function* handler() {
  const config = this.app.config.router;
  const { entry } = config;
  const url = /\/$/.test(this.url) ? this.url + entry : this.url;
  yield this.render(url);
}
