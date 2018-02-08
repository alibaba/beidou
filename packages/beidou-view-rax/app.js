'use strict';

const RaxView = require('./lib/rax-view');

module.exports = (app) => {
  app.view.use('rax', RaxView);
  app[Symbol.for('egg#view')] = RaxView;
};
