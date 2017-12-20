
const assert = require('assert');
const mm = require('egg-mock');
const should = require('should');
const request = require('supertest');
const utils = require('../../../utils');

describe('test/lib/core/worker/worker.test.js', () => {
  let app;
  before(() => {
    app = utils.createApp('apps/worker');
    return app.ready();
  });
  after(() => app.close());

  describe('app.beidouDeprecate()', () => {
    it('should get deprecate with namespace beidou', async () => {
      const deprecate = app.beidouDeprecate;
      assert(deprecate._namespace === 'beidou');
      assert(deprecate === app.beidouDeprecate);
    });
  });
});
