'use strict';

module.exports.index = function* () {
  yield this.render('index', {});
};

module.exports.alias = function* () {
  yield this.render('resolve', {});
};

module.exports.polyfill = function* () {
  yield this.render('polyfill', {});
};

module.exports.polyfillNotMatch = function* () {
  yield this.render('polyfill-not-match', {});
};
