/**
 * app worker 相关单元测试
 */

'use strict';

/**
 * Module dependencies.
 */

const path = require('path');
const should = require('should');
const mm = require('egg-mock');
const require_hacker = require('require-hacker');
const fixtures = path.join(__dirname, '../../../fixtures');
const Application = require('../../../../index').Application;

describe('test/lib/core/loaders/app-worker-loader.test.js', function() {
  beforeEach(() => {
    mm.consoleLevel('NONE');
  });

  afterEach(() => {
    mm.restore();
    // 清除全局require hook, 避免干扰其它测试用例
    require_hacker.occupied_file_extensions = new Set();
  });

  describe('agent loader load assetsInfo', function() {
    let app;

    before(() => {
      app = new Application({
        baseDir: path.join(fixtures, 'apps/app-load-assetsinfo'),
      });
    });

    after(() => {
      app.close();
    });

    it('should get assetsInfo config /beidou/beidou-template/1.0.0/', function(done) {
      should.equal(app.config.assetsInfo.cdnRoot, '/beidou/beidou-template/1.0.0/');
      done();
    });
  });

  describe('agent loader load assetsInfo useing package.json', function() {
    let app;

    before(() => {
      app = new Application({
        baseDir: path.join(fixtures, 'apps/app-load-assetsinfo-use-pkg'),
      });
    });

    after(() => {
      app.close();
    });

    it('should get assetsInfo config /beidou/app-load-assetsinfo-use-pkg/1.0.0/', function(done) {
      should.equal(app.config.assetsInfo.cdnRoot, '/beidou/app-load-assetsinfo-use-pkg/1.0.0/');
      done();
    });
  });

  describe('agent loader load assetsInfo useing package.json without assetsConfig', function() {
    let app;

    before(() => {
      app = new Application({
        baseDir: path.join(fixtures, 'apps/app-load-assetsinfo-no-assets-config'),
      });
    });

    after(() => {
      app.close();
    });

    it('should get assetsInfo config //app-load-assetsinfo-no-assets-config/1.0.0/', function(done) {
      should.equal(app.config.assetsInfo.cdnRoot, '//app-load-assetsinfo-no-assets-config/1.0.0/');
      done();
    });
  });

  describe('agent loader load assetsInfo useing webpack out when in local mode', function() {
    let app;

    before(() => {
      app = new Application({
        baseDir: path.join(fixtures, 'apps/app-load-assetsinfo-local'),
      });
    });

    after(() => {
      app.close();
    });

    it('should get assetsInfo config //app-load-assetsinfo-local/1.0.0/', function(done) {
      should.equal(app.config.assetsInfo.cdnRoot, '//app-load-assetsinfo-local/1.0.0/');
      done();
    });
  });
});
