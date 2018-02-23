'use strict';

const url = require('url');
const request = require('request');
const debug = require('debug')('beidou:webpack');

module.exports = function (options, app) {
  return async function (ctx, next) {
    if (!app.webpackServerPort) return await next();
    let webpackUrl = ctx.request.href.replace(
      url.parse(ctx.request.href).port,
      app.webpackServerPort
    );

    // force to use `http` protocol, because webpack does not support https
    webpackUrl = webpackUrl.replace(/^https/, 'http');
    const webpackRequest = request(webpackUrl);
    const notFound = await new Promise((resolve) => {
      webpackRequest.on('response', function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          debug('redirect request to webpack with url: %s', webpackUrl);
          ctx.res.statusCode = res.statusCode;
          for (const key in res.headers) {
            ctx.res.setHeader(key, res.headers[key]);
          }
          res.pipe(ctx.res).on('finish', resolve);
          return;
        }
        this.abort();
        resolve(true);
      });
    });
    if (notFound) {
      await next();
    }
  };
};
