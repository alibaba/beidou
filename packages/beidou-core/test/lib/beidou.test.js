'use strict';

const mm = require('egg-mock');
const utils = require('../utils');

describe('test/lib/beidou.test.js', function() {

  beforeEach(() => {
    mm.consoleLevel('NONE');
  });

  afterEach(() => {
    mm.restore();
  });

  describe('Master start fail', function() {
    let master;

    after(function() {
      master.close();
    });

    it('should master exit with 1', function(done) {
      master = utils.startMaster('apps/master-worker-start-fail', { coverage: true });
      master.expect('code', 1).ready(done);
    });
  });

  describe('Master started success', function() {
    let app;

    afterEach(function() {
      app.close();
    });

    it('should stdout message include "Beidou started"', function(done) {
      app = utils.startMaster('apps/master-worker-start-success', { coverage: true });
      app.expect('stdout', /Beidou started/).ready(done);
    });
  });
});
