'use strict';

module.exports = view => next =>
  async function (args) {
    // clean cache
    if (!view.config.cache) {
      const roots = view.app.config.view.root;
      const regexp = new RegExp(`(${roots.join('|')})`);
      for (const mod of Object.keys(require.cache)) {
        if (regexp.test(require.cache[mod].filename)) {
          delete require.cache[mod];
        }
      }
    }
    await next(args);
  };
