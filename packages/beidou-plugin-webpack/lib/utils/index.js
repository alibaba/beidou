'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const colorz = require('colorz');
const { stringify } = require('q-i');
const boxen = require('boxen');
const FallbackPort = require('fallback-port');
const debug = require('debug')('beidou:plugin:webpack');
const IsomorphicPlugin = require('../plugin/isomorphic');
const entryLoader = require('../loader/entry-loader');

const symbol = Symbol.for('webpackServer');

function getAvaliablePort(defaultPort, app) {
  const fallback = new FallbackPort(defaultPort);
  const port = fallback.getPort();
  if (port !== defaultPort) {
    app.logger.warn(
      '[webpack] port %s is in used, use %s instead',
      defaultPort,
      port
    );
  }
  return port;
}

const getWebpackConfig = (options, app) => {
  options = options || {};
  const loadFile = app.loader.loadFile.bind(app.loader);
  const isDev = app.config.env !== 'prod';
  let webpackConfig = null;

  const defaultConfigPath = path.join(
    __dirname,
    '../../config/webpack.default.config.js'
  );

  // make sure the port assigned is available
  let defaultPort = 6002;
  const portAssigned = options.devServer && options.devServer.port;
  if (portAssigned) {
    defaultPort = options.devServer.port;
  }

  defaultPort = getAvaliablePort(defaultPort, app);
  if (portAssigned) {
    options.devServer.port = defaultPort;
  }

  const entry = entryLoader(app, options.devServer, isDev);
  debug('entry auto load as below:\n%o', entry);

  webpackConfig = loadFile(defaultConfigPath, app, entry, isDev);

  // custom config exists
  if (options.config && fs.existsSync(options.config)) {
    debug('custom config found at %s', options.config);
    webpackConfig = loadFile(options.config, app, webpackConfig, isDev);
  }

  // make sure devServer is provided
  if (!webpackConfig.devServer) {
    webpackConfig.devServer = {
      contentBase: false,
    };
  }

  const devServer = webpackConfig.devServer;
  if (!devServer.port) {
    devServer.port = defaultPort;
  }

  if (devServer.contentBase !== false) {
    app.logger.warn(
      '[webpack] devServer.contentBase: %s, if webpack.devServer.contentBase is not false may cause beidou server unreachable',
      devServer.contentBase
    );
    devServer.contentBase = false;
  }

  if (!devServer.publicPath) {
    devServer.publicPath = webpackConfig.output.publicPath || '/build';
  }

  return webpackConfig;
};

const injectPlugin = (app) => {
  app.IsomorphicPlugin = IsomorphicPlugin;
};

const printEntry = function (entry) {
  console.log(
    boxen(
      `${colorz.magenta('Auto Load Webpack Entry:')}\n\n${stringify(entry)}`,
      {
        padding: 1,
        borderStyle: 'double',
        borderColor: 'yellow',
        float: 'left',
      }
    )
  );
};

const startServer = (config, port, logger, agent) => {
  if (agent[symbol]) {
    throw new Error('Multi webpack dev server instance found');
  }

  const compiler = webpack(config);
  let lastCompileResult = false;
  compiler.plugin('done', ({ compilation }) => {
    const ok = compilation.errors.length === 0;
    ok &&
      !lastCompileResult &&
      logger.info('[webpack]', colorz.green('compile done'));
    lastCompileResult = ok;
  });

  const server = new WebpackDevServer(compiler, config.devServer);

  server.middleware.waitUntilValid(() => {
    logger.info('[webpack] webpack server start, listen on port: %s', port);
    printEntry(config.entry);
    process.send({ action: 'webpack-server-ready', to: 'app', data: { port } });
    // tell worker process what the server port is
    const portMessageHandler = (info) => {
      if (info.action === 'ask-for-webpack-server-port') {
        process.send({
          action: 'webpack-server-ready',
          to: 'app',
          data: { port },
        });
      }
    };

    process.on('message', portMessageHandler);
    server._removeListener = function () {
      process.removeListener('message', portMessageHandler);
    };
  });
  server.listen(port, '0.0.0.0', (err) => {
    if (err) {
      logger.error('[Beidou Agent] webpack server start failed,', err);
      return;
    }
  });
  return server;
};
const closeServer = function (agent) {
  if (agent[symbol]) {
    const server = agent[symbol];
    server.close();
    agent[symbol] = null;
    server._removeListener && server._removeListener();
  }
};

const restartServer = function (config, port, logger, agent) {
  logger.info('[webpack-dev-server] auto restart');
  closeServer(agent);
  exports.startServer(config, port, logger, agent);
};

exports.startServer = startServer;
exports.closeServer = closeServer;
exports.injectPlugin = injectPlugin;
exports.restartServer = restartServer;
exports.printEntry = printEntry;
exports.getWebpackConfig = getWebpackConfig;
