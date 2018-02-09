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
    assert(concatUrl('http://beidou.net', 'docs', 'quickstart') === 'http://beidou.net/docs/quickstart');
    assert(concatUrl('/root/', '/docs/', '/quickstart/') === '/root/docs/quickstart/');
  });

  describe('Base view', () => {
    let app;

    before(() => {
      app = mock.app({
        baseDir: './base-app',
        framework
      });
    });
    after(() => {
      app.close();
    })

    it('class exist', () => {
      assert(BaseView);
    });

    const getView = (ctx) => {
      const view = new BaseView(ctx, {
        beautify: true,
        cache: false,
        doctype: '<!DOCTYPE html>',
        middlewares: ['cache', 'redux', 'partial', 'mock', 'doctype', 'beautify']
      });

      return view;
    };

    it('render', async () => {
      const ctx = app.mockContext();
      let view = getView(ctx);

      assert(view.ctx === ctx);

      try {
        view.renderElement();
      } catch (e) {
        assert(e instanceof Error);
      }

      BaseView.prototype.renderElement = function() {
        return 'test string';
      }

      const indexPath = path.join(__dirname, 'fixtures/base-app/client/index.jsx');
      const result = await view.render(indexPath, { ctx });
      // See fixture/base-app/app/view-middlewares/mock.js
      assert('mock data' === result);
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

});
