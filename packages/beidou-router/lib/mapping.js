'use strict';

const assert = require('assert');
const util = require('util');

const debug = util.debuglog('beidou-router');

module.exports = function (app, mapping) {
  assert(typeof mapping === 'object', 'router.mapping must be a plain object');
  registerFromMap(app, mapping);
};

function registerFromMap(app, target, parent = '') {
  if (typeof target === 'object' && !Array.isArray(target)) {
    for (const key of Object.keys(target)) {
      registerFromMap(app, target[key], `${parent}/${key}`);
    }
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

async function handler() {
  const { entry } = this.app.config.router;
  const url = /\/$/.test(this.url) ? this.url + entry : this.url;
  await this.render(url);
}
