const path = require('path');
const assert = require('assert');
const pathToRegexp = require('path-to-regexp');
const utils = require('./utils');
const mapHandler = require('./mapping');


module.exports = (app) => {
  const config = app.config.router;
  const { urlPrefix, root, exclude, mapping, entry, cache = false } = config;
  const view = app.config.view;
  const ext = view.defaultExtension;
  const regexp = typeof exclude === 'string' ? pathToRegexp(exclude) : exclude;
  assert(regexp instanceof RegExp, '`router.exclude` must be RegExp or String which turned by path-to-regexp');

  if (mapping) {
    return mapHandler(app, mapping, config);
  }

  app.get('/(.*)', function* () {
    const originUrl = this.path;
    if (!originUrl.startsWith(urlPrefix)) return;

    const url = originUrl.substr(urlPrefix.length);

    let pageName = utils.cached(url);
    if (!pageName) {
      const providerRoots = view.root.map(dir => path.join(dir, root));
      pageName = yield utils.resolvePath(url, providerRoots, root, exclude, ext, entry);
      cache && pageName && utils.putCache(url, pageName);
    }

    if (pageName) {
      yield this.render(pageName);
    }
  });
};

