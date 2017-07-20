/**
 * agent loader 相关单元测试
 */

'use strict';

/**
 * Module dependencies.
 */

const mm = require('egg-mock');
const require_hacker = require('require-hacker');
const utils = require('../../../utils');

describe('test/lib/core/loaders/agent-worker-loader.test.js', function() {

  afterEach(() => {
    mm.restore();
    // 清除全局require hook, 避免干扰其它测试用例
    require_hacker.occupied_file_extensions = new Set();
  });

  describe('agent loader check devDependencies', function() {
    let master;

    after(function() {
      master.close();
    });

    it('should exit with 1', function(done) {
      master = utils.startMaster('apps/agent-check-devdependencies', { coverage: true });
      master.expect('code', 1).ready(done);
    });
  });
});
