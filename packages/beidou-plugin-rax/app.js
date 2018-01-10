'use strict';

const view = require('./lib/rax-view');

module.exports = (app) => {
  app.view.use('rax', view);
  app[Symbol.for('egg#view')] = view;
};
