'use strict';

const ReactView = require('./lib/react-view');
const ReactDOMServer = require('react-dom/server');

module.exports = (app) => {
  app.viewEngine = ReactDOMServer;

  app.view.use('react', ReactView);

  app[Symbol.for('egg#view')] = ReactView;
};
