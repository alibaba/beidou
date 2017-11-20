

const mm = require('egg-mock');
const utils = require('../../../utils');

describe('test/lib/core/loaders/agent-worker-loader.test.js', function() {

  afterEach(() => {
    mm.restore();
  });

  describe('agent loader check devDependencies', function() {
    let master;

    after(function() {
      master.close();
    });

    it('should exit with 1', function(done) {
      master = utils.startMaster('apps/agent-check-devdependencies', { coverage: true });
      master.expect('code', 1).ready(done);
    });
  });
});
