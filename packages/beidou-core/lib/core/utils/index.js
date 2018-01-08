'use strict';

/**
 * utils
 */

const assert = require('assert');
const fs = require('fs');
/**
 * check module existence
 * @method Util#existsModule
 * @param {String} path - module path
 * @return {boolean} return `true` if exist.
 */
exports.existsModule = function (path) {
  return fs.existsSync(path);
};

/**
 * try require a module
 *
 * @param {String} modulePath
 * @param {Boolean} required
 * @param {Object|String} defaultValue
 * @return {Object}
 */
exports.tryRequire = function (modulePath, required, defaultValue) {
  const exist = exports.existsModule(modulePath);
  if (required) {
    assert(exist, `${modulePath} must exists`);
  }

  if (exist) {
    return require(modulePath);
  }
  return defaultValue || {};
};
