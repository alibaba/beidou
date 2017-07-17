

'use strict';

const path = require('path');
const mm = require('egg-mock');
const require_hacker = require('require-hacker');
const basePath = path.join(__dirname, '../../../..');

mm.consoleLevel('NONE');
describe('test/lib/core/loaders/aone-loader.test.js', function() {
  afterEach(() => {
    mm.restore();
    // 清除全局require hook, 避免干扰其它测试用例
    require_hacker.occupied_file_extensions = new Set();
  });

  before(function() {
  });
  const AoneLoader = require(`${basePath}/lib/core/loaders/aone-loader.js`);
  describe('not Aone environment', function() {
    const aoneLoader = new AoneLoader({ baseDir: basePath });
    it('should return empty object {} when aoneEnv.json does not exist', function() {
      aoneLoader.aoneEnv.should.be.Object;
      aoneLoader.aoneEnv.hasOwnProperty().should.equal(false);
    });

  });
  describe('Aone environment', function() {
    const aoneLoader = new AoneLoader({ baseDir: `${basePath}/test/fixtures/apps/aone-loader-node-only` });
    it('should return an object and have appDeployType propterty', function() {
      aoneLoader.aoneEnv.should.be.Object;
      aoneLoader.aoneEnv.should.have.ownProperty('appDeployType', 'NODEJS');
    });
  });
});
