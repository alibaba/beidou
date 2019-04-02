'use strict';

const assert = require('assert');
const path = require('path');
const mock = require('egg-mock');

const utils = require('../lib/utils');
const BaseView = require('../index');

const framework = path.join(__dirname, '../../beidou-core/');

describe('test/view.test.js', () => {
  it('utils', () => {
    const { concatUrl } = utils;
    assert(
      concatUrl('http://beidou.net', 'docs', 'quickstart') ===
      'http://beidou.net/docs/quickstart'
    );
    assert(
      concatUrl('/root/', '/docs/', '/quickstart/') === '/root/docs/quickstart/'
    );
  });

  describe('Base view', () => {
    let app;

    before(() => {
      app = mock.app({
        baseDir: './base-app',
        framework,
      });
    });
    after(() => {
      app.close();
    });

    it('class exist', () => {
      assert(BaseView);
    });

    const getView = (ctx) => {
      const view = new BaseView(ctx, {
        beautify: true,
        cache: false,
        doctype: '<!DOCTYPE html>',
        middlewares: [
          'cache',
          'initialprops',
          'redux',
          'partial',
          'mock',
          'doctype',
          'beautify',
        ],
      });

      return view;
    };

    it('render', async () => {
      const ctx = app.mockContext();
      const view = getView(ctx);

      assert(view.ctx === ctx);

      try {
        view.renderElement();
      } catch (e) {
        assert(e instanceof Error);
      }

      BaseView.prototype.renderElement = function () {
        return 'test string';
      };

      const indexPath = path.join(
        __dirname,
        'fixtures/base-app/client/index.jsx'
      );
      const result = await view.render(indexPath, { ctx });
      // See fixture/base-app/app/view-middlewares/mock.js
      assert(result === 'mock data');
    });

    it('asset helper', () => {
      const ctx = app.mockContext();
      const asset = ctx.helper[Symbol.for('beidou#asset')].bind(ctx.helper);
      let url = asset('index.js', {
        assetPath: 'build',
      });
      assert(url === 'build/index.js');

      url = asset('index.js', {
        host: 'http://127.0.0.1',
        assetPath: 'build',
      });
      assert(url === 'http://127.0.0.1/build/index.js');

      url = asset('index.js', {
        host: '127.0.0.1',
        assetPath: 'build',
      });
      assert(url === 'http://127.0.0.1/build/index.js');
    });
  });

  describe('UseHashAsset view', () => {
    let app;

    before((done) => {
      mock.env('local');
      app = mock.app({
        baseDir: './use-hash-asset-app',
        framework,
      });
      app.ready(done);
    });
    after(() => {
      app.close();
    });

    it('should use asset without hash in local env', () => {
      const ctx = app.mockContext();
      const asset = ctx.helper[Symbol.for('beidou#asset')].bind(ctx.helper);
      let url = asset('index.js', {
        assetPath: 'build',
      });
      assert(url === 'build/index.js');

      url = asset('index.js', {
        host: 'http://127.0.0.1',
        assetPath: 'build',
      });
      assert(url === 'http://127.0.0.1/build/index.js');

      url = asset('index.js', {
        host: '127.0.0.1',
        assetPath: 'build',
      });
      assert(url === 'http://127.0.0.1/build/index.js');
    });
  });

  describe('UseHashAsset view', () => {
    let app;

    before((done) => {
      mock.env('prod');
      app = mock.app({
        baseDir: './use-hash-asset-app',
        framework,
      });
      app.ready(done);
    });
    after(() => {
      app.close();
    });

    it('should use asset with hash in local env', () => {
      const ctx = app.mockContext();
      const asset = ctx.helper[Symbol.for('beidou#asset')].bind(ctx.helper);
      let url = asset('index.js', {
        assetPath: 'build',
      });
      assert(url === '/build/index_ec3f4aa7.js');

      url = asset('index.js', {
        host: 'http://127.0.0.1',
        assetPath: 'build',
      });
      assert(url === '/build/index_ec3f4aa7.js');

      url = asset('index.js', {
        host: '127.0.0.1',
        assetPath: 'build',
      });
      assert(url === '/build/index_ec3f4aa7.js');

      url = asset('index.js');
      assert(url === '/build/index_ec3f4aa7.js');
    });
  });

  describe('With HashAssetPath view', () => {
    let app;

    before((done) => {
      mock.env('prod');
      app = mock.app({
        baseDir: './with-hash-asset-path',
        framework,
      });
      app.ready(done);
    });
    after(() => {
      app.close();
    });

    it('should use asset with hash in local env', () => {
      const ctx = app.mockContext();
      const asset = ctx.helper[Symbol.for('beidou#asset')].bind(ctx.helper);
      let url = asset('index.js', {
        assetPath: 'build',
      });
      assert(url === '/build/index_ec3f4aa7.js');

      url = asset('index.js', {
        host: 'http://127.0.0.1',
        assetPath: 'build',
      });
      assert(url === '/build/index_ec3f4aa7.js');

      url = asset('index.js', {
        host: '127.0.0.1',
        assetPath: 'build',
      });
      assert(url === '/build/index_ec3f4aa7.js');

      url = asset('index.js');
      assert(url === '/build/index_ec3f4aa7.js');
    });
  });
});
