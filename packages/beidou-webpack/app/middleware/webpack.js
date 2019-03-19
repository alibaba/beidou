'use strict';

const URL = require('url-parse');
const request = require('request');
const debug = require('debug')('beidou-webpack');
const mm = require('micromatch');

module.exports = function (options, app) {
  return async function (ctx, next) {
    const originUrl = `http://${ctx.host}${ctx.request.url}`;
    const url = new URL(originUrl);
    url.set('port', app.webpackServerPort);
    const webpackUrl = url.href;

    const requestOptions = {
      method: ctx.method,
      uri: webpackUrl,
      // body: JSON.stringify(ctx.request.body),
      headers: ctx.headers,
    };

    const webpackRequest = request(requestOptions);

    if (options.custom && options.custom.proxy) {
      const rule = options.custom.proxy;
      if (mm.isMatch(ctx.path, rule)) {
        ctx.body = ctx.req.pipe(webpackRequest);
        return;
      }
    }
    const notFound = await new Promise((resolve) => {
      webpackRequest.on('response', function (res) {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          debug('redirect request to webpack with url: %s', webpackUrl);
          ctx.res.statusCode = res.statusCode;
          /* eslint-disable guard-for-in */
          for (const key in res.headers) {
            ctx.res.setHeader(key, res.headers[key]);
          }
          res.pipe(ctx.res).on('finish', resolve);
          return;
        }
        this.abort();
        resolve(true);
      });

      // catch error
      webpackRequest.on('error', () => {
        resolve(true);
      });
    });
    if (notFound) {
      await next();
    }
  };
};
