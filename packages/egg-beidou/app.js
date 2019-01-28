'use strict';

const BeidouView = require('./lib/beidou');
const { basicPolyfill, setGlobal } = require('beidou-isomorphic/lib/polyfill');

module.exports = (app) => {
  basicPolyfill();
  setGlobal(app.config.env);
  app.view.use('beidou', BeidouView);
};
