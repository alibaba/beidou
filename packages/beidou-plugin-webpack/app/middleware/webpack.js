'use strict'; // eslint-disable-line

const request = require('request');
const escapeRegExp = require('lodash/escapeRegExp');
// const debug = require('debug')('beidou-plugin:webpack');
const helper = require('../../lib/utils/index');

function getPortByHost(host) {
  const splits = host.split(':');
  /* istanbul ignore else */
  if (splits.length > 1) {
    return splits[1];
  }
  return '';
}

module.exports = function (options, app) {
  const config = helper.getWebpackConfig(options, app);
  const logger = app.coreLogger;
  return function* (next) {
    const publicPath = options.publicPath || config.output.publicPath;
    let validPath = [];
    if (options.hmr && options.hmr.path) {
      validPath.push(options.hmr.path);
    }
    validPath = validPath.concat(options.path);
    // transfer assets request to webpack server of agent
    if (new RegExp(`^${escapeRegExp(publicPath)}`).test(this.request.path)
      || validPath.indexOf(this.request.path) !== -1) {
      let resUrl = this.request.href.replace(getPortByHost(this.request.host), app.webpackServerPort);
      if (this.request.protocol === 'https') {
        resUrl = resUrl.replace('https', 'http');
      }
      this.body = this.req.pipe(request(resUrl))
        .on('error', (err) => {
          logger.error(err);
        })
        .pipe(this.res);
      return;
    }
    yield next;
  };
};
