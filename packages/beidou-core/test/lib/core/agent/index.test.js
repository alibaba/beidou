
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const should = require('should');
const mm = require('egg-mock');
const utils = require('../../../utils');
const fixtures = path.join(__dirname, '../../../fixtures');
const Agent = require('../../../../index').Agent;

describe('test/lib/core/agent/index.test.js', function() {

  beforeEach(() => {
    mm.consoleLevel('NONE');
  });

  afterEach(() => {
    mm.restore();
  });

  describe('agent dump config success', function() {
    let agent;

    before(() => {
      rimraf.sync(path.join(fixtures, 'apps/agent-dump-config-success/run'));
      agent = new Agent({
        baseDir: path.join(fixtures, 'apps/agent-dump-config-success'),
      });
    });

    it('should get dump info', function(done) {
      should.exist(agent.config.rundir);

      setTimeout(() => {
        const dumpFile = fs.readdirSync(path.join(fixtures, 'apps/agent-dump-config-success/run'));
        should.notEqual(dumpFile.length, 0);
        const config = JSON.parse(fs.readFileSync(path.join(fixtures, 'apps/agent-dump-config-success/run', dumpFile[0])));
        should.equal(config.config.pkg.name, 'agent-dump-config-success');
        done();
      }, 1500);
    });
  });

  describe('agent dump config fail', function() {
    let master;

    after(function() {
      master.close();
    });

    it('should exit with 1', function(done) {
      master = utils.startMaster('apps/agent-dump-config-fail', { coverage: true });
      master.expect('code', 1).ready(done);
    });
  });
});
