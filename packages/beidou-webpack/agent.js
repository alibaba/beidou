'use strict';

const chokidar = require('chokidar');
const equal = require('deep-equal');
const debug = require('debug')('beidou:webpack');
const helper = require('./lib/utils');
const entryLoader = require('./lib/loader/entry-loader');

module.exports = (agent) => {
  helper.injectPlugin(agent);

  // start webpack server util agent ready
  agent.ready(() => {
    const { logger } = agent;
    const config = agent.config.webpack;

    debug('create webpack server with config: %O', config);
    const webpackConfig = helper.getWebpackConfig(agent, config);
    debug('Webpack config: %O', webpackConfig);
    // const webpackServer = http.createServer(agent.callback());

    const port = webpackConfig.devServer.port || 0;
    helper.startServer(webpackConfig, port, logger, agent);

    function watcher() {
      const updatedEntry = entryLoader(agent, webpackConfig.devServer, true);
      if (!equal(updatedEntry, webpackConfig.entry)) {
        webpackConfig.entry = updatedEntry;
        helper.restartServer(webpackConfig, port, logger, agent);
        logger.info('[webpack:watcher] entry updated');
      }
    }

    chokidar
      .watch(agent.config.client, {
        ignored: /(^|[/\\])\../,
        persistent: true,
        ignoreInitial: true,
      })
      .on('add', watcher)
      .on('addDir', watcher)
      .on('unlinkDir', watcher)
      .on('unlink', watcher);

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
      data = `${data}`.trim().toLowerCase();

      // if the keys entered match the restartable value, then restart!
      if (data === 'rs') {
        helper.restartServer(webpackConfig, port, logger, agent);
      }
    });

    // close server when exit
    process.on('exit', () => {
      helper.closeServer(agent);
    });
  });
};
