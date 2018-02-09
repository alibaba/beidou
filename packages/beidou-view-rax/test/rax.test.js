'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const path = require('path');
const RaxView = require('../lib/rax-view');

const framework = path.join(__dirname, '../../beidou-core/');

describe('Rax render test', () => {
  let app;

  describe('basic render', () => {
    before(() => {
      app = mock.cluster({
        baseDir: './normal',
        framework,
      })
      return app.ready();
    });

    afterEach(mock.restore);

    it('should render index', async function () {
      await app.httpRequest()
        .get('/')
        .expect(200)
        .expect(/Beidou with Rax/);
    });

    it('should render inline style', async function () {
      await app.httpRequest()
        .get('/inline-style')
        .expect(200)
        .expect(/Inline style/);
    });

    let renderApp;
    before(() => {
      renderApp = mock.app({
        baseDir: './normal',
        framework
      });
      return renderApp.ready();
    });

    it('should throw error', async () => {

      const ctx = renderApp.mockContext();
      const raxView = new RaxView(ctx);
      try {
        await raxView.renderString();
      } catch (e) {
        assert(e instanceof Error);
      }
    });
  });

  describe('getStore, getPartial', () => {
    before(() => {
      app = mock.cluster({
        baseDir: './redux-partial',
        framework,
      })
      return app.ready();
    });

    afterEach(mock.restore);

    it('partial render', async function () {
      await app.httpRequest()
        .get('/')
        .expect(200)
        .expect(/Partial render/);
    });
  });
});
