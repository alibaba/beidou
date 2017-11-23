module.exports = () => function* (next) {
  const st = Date.now();
  yield next;
  // app.logger.info('render time:', Date.now() - st);
  // for performance test, use console.log instead
  console.log('render time:', Date.now() - st);
};
