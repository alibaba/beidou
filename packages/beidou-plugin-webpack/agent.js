'use strict'; // eslint-disable-line

const http = require('http');
const webpack = require('webpack');
const middleware = require('./lib/agent-middleware');
const helper = require('./lib/utils/index');

module.exports = (agent) => {
  const logger = agent.coreLogger;
  // start webpack server util agent ready
  agent.ready(() => {
    const config = agent.config.webpack;
    const webpackConfig = helper.getWebpackConfig(config, agent);
    const compiler = webpack(webpackConfig);
    const mw = middleware(compiler, config, agent);
    agent.use(mw);

    // hrm middleware
    const hmr = config.hmr;
    if (hmr.enable) {
      agent.use(require('koa-webpack-hot-middleware')(compiler, {
        path: hmr.path, heartbeat: hmr.heartbeat || 10 * 1000
      }));
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
      const msg = {
        port: webpackServer.address().port
      };

      process.send({ action: 'webpack-server-ready', to: 'app', data: msg });
      // tell worker process what the server port is
      process.on('message', (info) => {
        if (info.action === 'ask-for-webpack-server-port') {
          process.send({ action: 'webpack-server-ready', to: 'app', data: { port: msg.port } });
        }
      });
    });
    webpackServer.on('error', (err) => {
      /* istanbul ignore next */ throw err;
    });
  });
};
