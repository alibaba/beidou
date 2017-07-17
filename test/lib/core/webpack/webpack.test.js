/* global describe: true */
/* global afterEach: true */
/* global before: true */
/* global after: true */
/* global it: true */

'use strict';

const require_hacker = require('require-hacker');
const mm = require('egg-mock');
const request = require('supertest');
const utils = require('../../../utils');

describe('test/lib/core/webpack/webpack.test.js', () => {
  afterEach(() => {
    mm.restore();
    // 清除全局require hook, 避免干扰其它测试用例
    require_hacker.occupied_file_extensions = new Set();
  });

  describe('webpack', () => {
    let app;
    before((done) => {
      mm.consoleLevel('NONE');
      app = utils.createApp('apps/webpack');
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    it('file compiled with no errors no warnings with prod config', (done) => {
      request(app.callback())
        .get('/home')
        .expect('{"hasError":false,"hasWarning":false}')
        .expect(200, done);
    });

    it('file compiled with no errors no warnings with dev config', (done) => {
      request(app.callback())
        .get('/home?type=dev')
        .expect('{"hasError":false,"hasWarning":false}')
        .expect(200, done);
    });

    it('require client file in server side', (done) => {
      request(app.callback())
        .get('/isomorphic')
        .expect('{"default":{"a":"test client"}}')
        .expect(200, done);
    });
  });
});
