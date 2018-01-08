'use strict';

const normalizeUrl = require('normalizeurl');
const isGeneratorFunction = require('is-generator-function');

exports.concatUrl = function (...pathes) {
  const result = pathes.reduce((pre, next) => {
    if (!pre) return next;
    let slash = 0;
    next[0] === '/' && (slash += 1);
    pre.charAt(pre.length - 1) === '/' && (slash += 1);
    if (slash === 2) {
      return pre + next.substr(1);
    } else if (slash === 1) {
      return pre + next;
    }
    return `${pre}/${next}`;
  });

  return normalizeUrl(result);
};

exports.normalizeUrl = normalizeUrl;

exports.isGenerator = isGeneratorFunction;

exports.compose = function (...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};
