/**
 * master 启动相关单元测试
 */

'use strict';

/**
 * Module dependencies.
 */

const mm = require('egg-mock');
const require_hacker = require('require-hacker');
const utils = require('../utils');

describe('test/lib/beidou.test.js', function() {

  beforeEach(() => {
    mm.consoleLevel('NONE');
  });

  afterEach(() => {
    mm.restore();
    // 清除全局require hook, 避免干扰其它测试用例
    require_hacker.occupied_file_extensions = new Set();
  });

  describe('Master start fail', function() {
    let master;

    after(function() {
      master.close();
    });

    it('should master exit with 1', function(done) {
      master = utils.startMaster('apps/master-worker-start-fail', { coverage: true });
      master.expect('code', 1).ready(done);
    });
  });

  describe('Master started success', function() {
    let app;

    afterEach(function() {
      app.close();
    });

    it('should stdout message include "Beidou started"', function(done) {
      app = utils.startMaster('apps/master-worker-start-success', { coverage: true });
      app.expect('stdout', /Beidou started/).ready(done);
    });
  });
});
