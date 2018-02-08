'use strict';

exports.isAsyncFunc = fn =>
  !!fn && fn.constructor && fn.constructor.name === 'AsyncFunction';

exports.isPromise = obj =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';
