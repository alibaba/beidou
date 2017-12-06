module.exports = view => next => function* (args) {
  // clean cache
  if (!view.config.cache) {
    Object.keys(require.cache).forEach((module) => {
      if (new RegExp(args.filepath).test(require.cache[module].filename)) {
        delete require.cache[module];
      }
    });
  }
  yield next(args);
};
