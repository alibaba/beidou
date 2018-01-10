'use strict';

const http = require('http');
const webpack = require('webpack');
const debug = require('debug')('beidou:plugin:webpack');
const middleware = require('./lib/middleware/agent-middleware');
const helper = require('./lib/utils');

module.exports = (agent) => {
  const logger = agent.coreLogger;
  helper.injectEntryAndPlugin(agent);

  // start webpack server util agent ready
  agent.ready(() => {
    const config = agent.config.webpack;

    debug('create webpack server with config: %o', config);

    const webpackConfig = helper.getWebpackConfig(config, agent);
    debug('Webpack config: %O', webpackConfig);
    const compiler = webpack(webpackConfig);
    const mw = middleware(compiler, config, agent);
    agent.use(mw);

    // hrm middleware
    const hmr = config.hmr;
    if (hmr) {
      agent.use(require('koa-webpack-hot-middleware')(compiler, hmr));
    }

    const webpackServer = http.createServer(agent.callback());
    // use random port to avoid port conflict
    webpackServer.listen(0);
    webpackServer.on('listening', (err) => {
      /* istanbul ignore if */
      if (err) {
        logger.error('[Beidou Agent] webpack server start failed,', err);
        return;
      }
      const port = webpackServer.address().port;
      const msg = {
        port,
      };
      logger.info('webpack server start, listen on port: %s', port);

      process.send({ action: 'webpack-server-ready', to: 'app', data: msg });
      // tell worker process what the server port is
      process.on('message', (info) => {
        if (info.action === 'ask-for-webpack-server-port') {
          process.send({
            action: 'webpack-server-ready',
            to: 'app',
            data: { port: msg.port },
          });
        }
      });
    });
    webpackServer.on('error', (err) => {
      /* istanbul ignore next */ throw err;
    });
  });
};
