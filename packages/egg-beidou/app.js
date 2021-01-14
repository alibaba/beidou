'use strict';

const { basicPolyfill, setGlobal } = require('beidou-isomorphic/lib/polyfill');

module.exports = (app) => {
  basicPolyfill();
  setGlobal(app.config.env);
};
