'use strict';

const path = require('path');
const assert = require('assert');
const globToRegExp = require('glob-to-regexp');
const utils = require('./utils');
const mapHandler = require('./mapping');

const CACHE = Symbol.for('router#cache');

module.exports = (app) => {
  const config = app.config.router;
  const { urlPrefix, root, exclude, mapping, entry, cache = false } = config;
  const { view } = app.config;
  const ext = view.defaultExtension;
  const regexp = typeof exclude === 'string' ? globToRegExp(exclude) : exclude;
  assert(
    regexp instanceof RegExp,
    '`router.exclude` must be RegExp or glob string'
  );

  if (mapping) {
    return mapHandler(app, mapping, config);
  }

  let cached = app[CACHE];
  if (cache && !cached) {
    cached = {};
    app[CACHE] = cached;
  }

  app.get('/(.*)', async function () {
    const originUrl = this.path;
    if (!originUrl.startsWith(urlPrefix)) return;

    const url = originUrl.substr(urlPrefix.length);

    let pageName = cache ? cached[url] : null;
    if (!pageName) {
      const providerRoots = view.root.map(dir => path.join(dir, root));
      pageName = await utils.resolvePath(
        url,
        providerRoots,
        root,
        regexp,
        ext,
        entry
      );
      if (cache && pageName) {
        cached[url] = pageName;
      }
    }

    if (pageName) {
      await this.render(pageName);
    }
  });
};
