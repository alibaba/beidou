'use strict'; // eslint-disable-line

/**
 * Module dependencies.
 */

module.exports = (app) => {
  // ensure webpack middleware works before custom middleware
  app.config.coreMiddleware.unshift('webpack');

  process.on('message', (msg) => {
    if (msg.action === 'webpack-server-ready') {
      // receive port message from agent
      app.webpackServerPort = msg.data.port;
    }
  });
  // ask agent for webpack port
  process.send && process.send({
    action: 'ask-for-webpack-server-port',
    to: 'agent'
  });
};
