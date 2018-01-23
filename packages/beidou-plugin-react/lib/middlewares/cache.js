'use strict';

module.exports = view => next =>
  async function (args) {
    // clean cache
    if (!view.config.cache) {
      const roots = view.app.config.view.root;
      const regexp = new RegExp(`(${roots.join('|')})`);
      Object.keys(require.cache).forEach((module) => {
        if (regexp.test(require.cache[module].filename)) {
          delete require.cache[module];
        }
      });
    }
    await next(args);
  };
