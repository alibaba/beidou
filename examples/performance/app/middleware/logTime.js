module.exports = (options, app) => function* (next) {
  const st = Date.now();
  yield next;
  app.logger.info('render time2:', Date.now() - st);
};
