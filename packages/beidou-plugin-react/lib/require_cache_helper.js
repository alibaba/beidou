'use strict';

const path = require('path');
const escapeRegExp = require('lodash/escapeRegExp');
/**
 * create a match function for cache clean
 *
 * @param {Mixed} input path or array of pathes
 * @return {Function} func
 */
exports.createMatchFunction = (input) => {
  input = input.map((item) => {
    return typeof item === 'string'
      ? new RegExp(`^${escapeRegExp(path.normalize(item))}`)    // normalize path
      :  /* istanbul ignore next */ item;
  });

  return function match(file) {
    for (let i = 0; i < input.length; i += 1) {
      if (input[i].test(file)) return true;
    }
    return false;
  };
};

/**
 * Remove all files from the module cache that are in the view folder.
 *
 * @param {Function} match match func
 * @return {undefined}
 */
exports.cleanCache = (match) => {
  Object.keys(require.cache).forEach((module) => {
    if (match(require.cache[module].filename)) {
      delete require.cache[module];
    }
  });
};
