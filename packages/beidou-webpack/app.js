'use strict';

const helper = require('./lib/utils');

module.exports = (app) => {
  // ensure webpack middleware works before custom middleware
  const parser = 'bodyParser';
  const mws = app.config.coreMiddleware;
  mws.unshift('webpack');
  const position = mws.indexOf(parser);
  mws.splice(position, 1);
  mws.unshift(parser);

  helper.injectPlugin(app);

  process.on('message', (msg) => {
    if (msg.action === 'webpack-server-ready') {
      // receive port message from agent
      app.webpackServerPort = msg.data.port;
      app.emit('webpack-server-ready');
    }
  });
  // ask agent for webpack port
  process.send &&
    process.send({
      action: 'ask-for-webpack-server-port',
      to: 'agent',
    });
};
