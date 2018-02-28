'use strict';

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const coffee = require('coffee');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { getRegistry, install } = require('../lib/helper');
const { cleanup, sleep } = require('./utils');

describe(`test/${path.basename(__filename)}`, () => {
  const beidouBin = require.resolve('../bin/beidou.js');
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
    it('should show version', done => {
      coffee.fork(beidouBin, ['--version'], {
          cwd
        })
        .expect('stdout', /\d+\.\d+\.\d+/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help', done => {
      coffee.fork(beidouBin, ['--help'], {
          cwd
        })
        .expect('stdout', /Usage: .*beidou.* \[command] \[options]/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help when command not exists', done => {
      coffee.fork(beidouBin, ['not-exists'], {
          cwd
        })
        .expect('stdout', /build/)
        .expect('stdout', /cov/)
        .expect('stdout', /debug/)
        .expect('stdout', /dev/)
        .expect('stdout', /init/)
        .expect('stdout', /start/)
        .expect('stdout', /stop/)
        .expect('stdout', /test/)
        .expect('code', 0)
        .end(done);
    });
  });

  describe('init commands', () => {
    it('should init boilerplate project', (done) => {
      coffee.fork(beidouBin, ['init'], {
          cwd
        })
        .write('\n')
        .expect('code', 0)
        .end(done);
    });
  });

  describe('start and stop commands', () => {
    let app;
    const exampleDir = path.join(__dirname, './fixtures/example');

    before(async () => {
      if (!fs.existsSync(path.join(exampleDir, 'node_modules'))) {
        await install(exampleDir, await getRegistry());
      }
      await cleanup(exampleDir);
    });

    after(async () => {
      app.proc.kill('SIGTERM');
      await cleanup(exampleDir);
    });

    it('should start production mode', async () => {
      app = coffee.fork(beidouBin, ['start', '--port=8080', '--cluster=1'], {
        cwd: exampleDir,
      })
      app.expect('code', 0);
      await sleep(10);
      assert(app.stderr === '');
      assert(app.stdout.match(/beidou-core started on http:\/\/127\.0\.0\.1:8080/));
    });

    it('should stop beidou process', (done) => {
      coffee.fork(beidouBin, ['stop'], {
        cwd: exampleDir,
      })
      .expect('stdout', /stopped/)
      .expect('code', 0)
      .end(done);
    });
  });

  describe('build command', () => {
    const env = Object.create(process.env);

    env.NODE_ENV = 'production';

    function copyBuildFile(targetName) {
      const srcPath = path.join(__dirname, 'fixtures/beidou-build');
      const dstDir = path.join(cwd, 'node_modules/.bin');
      const dstPath = path.join(dstDir, targetName);
      mkdirp.sync(dstDir);
      fs.copyFileSync(srcPath, dstPath);
      fs.chmodSync(dstPath, '755');
    }

    it('should run beidou-build script', done => {
      copyBuildFile('beidou-build');
      coffee.fork(beidouBin, ['build'], {
          cwd,
          env,
        })
        .expect('stdout', /Build finished/)
        .end(done);
    });

    it('should run webpack-build script with target node', done => {
      copyBuildFile('webpack-build');
      coffee.fork(beidouBin, ['build', '--target=node'], {
          cwd,
          env,
        })
        .expect('stdout', /Build finished/)
        .end(done);
    });

    it('should throw error', done => {
      rimraf.sync(path.join(cwd, 'node_modules/.bin'));
      coffee.fork(beidouBin, ['build'], {
          cwd,
          env,
        })
        .expect('stderr', /Error: Cannot find module/)
        .end(done);
    });
  });
});
