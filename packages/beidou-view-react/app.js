'use strict';

const ReactView = require('./lib/react-view');

module.exports = (app) => {
  if (app.plugins.rax && app.plugins.rax.enable) {
    app.coreLogger.warn(
      'Detect beidou view plugin rax, view plugin react exits'
    );
    app.plugins.react.enable = false;
    return;
  }

  app.view.use('react', ReactView);

  app[Symbol.for('egg#view')] = ReactView;
};
