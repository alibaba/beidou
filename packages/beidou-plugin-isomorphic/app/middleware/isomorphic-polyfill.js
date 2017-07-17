// 'use strict';

const fullPolyfill = require('../../lib/polyfill').fullPolyfill;
const debug = require('debug')('isomorphic-polyfill');

function* noMatch(next) {
  fullPolyfill(this);
  yield next;
}

module.exports = (options, app) => {
  const pulginOptions = app.config.isomorphic;
  // default set fullPolyfill for all request
  if (pulginOptions.match === 'NO_MATCH') {
    return noMatch;
  }

  if (typeof pulginOptions.match === 'string') {
    pulginOptions.match = new RegExp(pulginOptions.match);
  }

  if (!(pulginOptions.match instanceof RegExp)) {
    debug('[isomorphic-polyfill] wrong config in config.%s.js, isomorphic.match should be string or regular expression.', app.serverEnv);
    return noMatch;
  }
  return function* (next) {
    // matched, set fullPolyfill
    if (pulginOptions.match.test(this.request.path)) {
      fullPolyfill(this);
      yield next;
      return;
    }
    // set basic polyfill
    yield next;
  };
};
