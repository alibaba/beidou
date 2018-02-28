/**
 * ContextLogger 性能测试
 */

'use strict';

/**
 * Module dependencies.
 */

const ContextLogger = require('../../lib/core/context_logger');
const utils = require('../utils');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');

const app = utils.createApp('apps/alipay-demo');
app.config.env = 'prod';
app.loggers.coreLogger._stdoutLevel = 10000;
// mock logger._stream.write
app.loggers.logger._stream.write = function () {};
app.loggers.coreLogger._stream.write = function () {};

const ctx = app.mockContext();
const logger = ctx.logger;
const err = new Error('logger error');
const suite = new Benchmark.Suite();

suite

  .add('new ContextLogger(name, ctx).info()', () => {
    const log = new ContextLogger('logger', ctx);
    log.info('foo %s, now %d, oaoaoa', 'bar', 123);
  })
  .add('ctx.logger.paddingMessage', () => {
    const paddingMessage = ctx.logger.paddingMessage;
  })
  .add('ctx.logger.info()', () => {
    ctx.logger.info('foo %s, now %d, oaoaoa', 'bar', 123);
  })
  .add('logger.info()', () => {
    logger.info('foo %s, now %d, oaoaoa', 'bar', 123);
  })
  .add('ctx.coreLogger.info()', () => {
    ctx.coreLogger.info('foo %s, now %d, oaoaoa', 'bar', 123);
  })

  .add('ctx.logger.warn()', () => {
    ctx.logger.warn('logger warn foo %s, now %d, oaoaoa', 'bar', 123);
  })
  .add('ctx.coreLogger.warn()', () => {
    ctx.coreLogger.warn('coreLogger warn foo %s, now %d, oaoaoa', 'bar', 123);
  })

  .add('ctx.logger.error()', () => {
    ctx.logger.error(err);
  })
  .add('ctx.coreLogger.error()', () => {
    ctx.coreLogger.error(err);
  })

  .on('cycle', (event) => {
    benchmarks.add(event.target);
  })
  .on('start', () => {
    console.log(
      '\n  node version: %s, date: %s\n  Starting...',
      process.version,
      Date()
    );
  })
  .on('complete', () => {
    benchmarks.log();
    process.exit(0);
  })
  .run({ async: false });
