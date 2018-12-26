'use strict';

const path = require('path');
const mm = require('egg-mock');

describe('test/lib/core/worker/worker.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'worker',
      customEgg: path.join(__dirname, '../'),
      cache: false,
    });

    return app.ready();
  });

  after(() => app.close());

  it('should app start ok', () => {
    app.httpRequest()
      .get('/')
      .expect(200);
  });
});
