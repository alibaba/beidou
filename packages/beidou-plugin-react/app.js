'use strict';

const ReactView = require('./lib/react-view');
const ReactDOMServer = require('react-dom/server');

module.exports = (app) => {
  if (app.plugins.rax.enable) {
    app.coreLogger.warn('Detect beidou view plugin rax, view plugin react exits');
    app.plugins.react.enable = false;
    return;
  }

  app.viewEngine = ReactDOMServer;

  app.view.use('react', ReactView);

  app[Symbol.for('egg#view')] = ReactView;
};
