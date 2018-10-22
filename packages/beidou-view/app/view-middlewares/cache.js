'use strict';

const escapeStringRegexp = require('escape-string-regexp');

module.exports = async function (viewCtx, next) {
  // clean cache
  if (!viewCtx.options.cache) {
    const roots = viewCtx.config.view.root.map(item =>
      escapeStringRegexp(item)
    );
    const regexp = new RegExp(`(${roots.join('|')})`);
    for (const mod of Object.keys(require.cache)) {
      if (regexp.test(require.cache[mod].filename)) {
        delete require.cache[mod];
      }
    }
  }
  await next();
};
