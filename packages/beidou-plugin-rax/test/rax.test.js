'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const path = require('path');

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
