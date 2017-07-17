

'use strict';

const path = require('path');
const require_hacker = require('require-hacker');
const basePath = path.join(__dirname, '../../../..');
const fixtures = path.join(basePath, '/test/fixtures');

describe('test/lib/core/utils/index.test.js', function() {
  const utils = require(`${basePath}/lib/core/utils/index`);

  afterEach(() => {
    // 清除全局require hook, 避免干扰其它测试用例
    require_hacker.occupied_file_extensions = new Set();
  });

  describe('existsModule', function() {

    it('should return false when module does not exist', function() {
      utils.existsModule('/AN_NON_EXIST_MODULE').should.equal(false);
    });

    it('should return true when module exists', function() {
      utils.existsModule(`${fixtures}/lib/utils/`).should.equal(true);
    });

  });

  describe('tryRequire function', function() {

    it('should return empty object when module does not exist', function() {
      utils.tryRequire('/AN_NON_EXIST_MODULE').should.be.Object;
      utils.tryRequire('/AN_NON_EXIST_MODULE').hasOwnProperty().should.equal(false);
    });

    it('should return {test: true} when module exists', function() {
      utils.tryRequire(`${fixtures}/lib/utils/`).should.have.property('test', true);
    });

    it('assert module must exists', function() {
      utils.tryRequire(`${fixtures}/lib/utils/`, true).should.have.property('test', true);
    });

  });

});
