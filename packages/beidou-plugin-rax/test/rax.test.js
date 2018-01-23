'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const path = require('path');

const framework = path.join(__dirname, '../../beidou-core/');

describe('Basic test', () => {
  let app;

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
