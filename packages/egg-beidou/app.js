'use strict';

const Beidou = require('./lib/beidou');

module.exports = (app) => {
  const beidou = new Beidou(app);
  app.beidou = beidou;
};
