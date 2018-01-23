'use strict';

module.exports.index = async function () {
  await this.render('index', {});
};

module.exports.alias = async function () {
  await this.render('resolve', {});
};

module.exports.polyfill = async function () {
  await this.render('polyfill', {});
};

module.exports.polyfillNotMatch = async function () {
  await this.render('polyfill-not-match', {});
};
