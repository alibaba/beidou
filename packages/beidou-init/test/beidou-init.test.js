'use strict';

const path = require('path');
const coffee = require('coffee');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('test/beidou-init.test.js', () => {
  const beidou = require.resolve('../bin/beidou.js');
  const cwd = path.join(__dirname, 'fixtures/test-files');

  before(() => {
    rimraf.sync(cwd);
    mkdirp.sync(cwd);
  });

  after(() => {
    rimraf.sync(cwd);
    mkdirp.sync(cwd);
  });

  describe('global options', () => {
    it('should show version', (done) => {
      coffee
        .fork(beidou, ['--version'], {
          cwd,
        })
        .expect('stdout', /\d+\.\d+\.\d+/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help', (done) => {
      coffee
        .fork(beidou, ['--help'], {
          cwd,
        })
        .expect('stdout', /Usage: .*beidou.* \[command] \[options]/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help when command not exists', (done) => {
      coffee
        .fork(beidou, ['not-exists'], {
          cwd,
        })
        .expect('stdout', /init.*\n/)
        .expect('code', 0)
        .end(done);
    });
  });

  describe('project init', () => {
    const beidou = require.resolve('../bin/beidou.js');
    const cwd = path.join(__dirname, 'fixtures/test-files');

    it('should init boilerplate project', (done) => {
      coffee
        .fork(beidou, ['init'], {
          cwd,
        })
        .write('\n')
        .expect('code', 0)
        .end(done);
    });
  });
});
