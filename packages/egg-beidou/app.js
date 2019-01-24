'use strict';

const Beidou = require('./lib/beidou');
const { basicPolyfill, setGlobal } = require('beidou-isomorphic/lib/polyfill');

module.exports = (app) => {
  basicPolyfill();
  setGlobal(app.config.env);
  const beidou = new Beidou({ app });
  app.beidou = beidou;
};
