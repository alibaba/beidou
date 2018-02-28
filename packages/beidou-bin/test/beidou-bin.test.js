'use strict';

const path = require('path');
const fs = require('fs');
const coffee = require('coffee');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('test/beidou-bin.test.js', () => {
  const beidouBin = require.resolve('../bin/beidou-bin.js');
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
        .fork(beidouBin, ['--version'], {
          cwd,
        })
        .expect('stdout', /\d+\.\d+\.\d+/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help', (done) => {
      coffee
        .fork(beidouBin, ['--help'], {
          cwd,
        })
        .expect('stdout', /Usage: .*beidou.* \[command] \[options]/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help when command not exists', (done) => {
      coffee
        .fork(beidouBin, ['not-exists'], {
          cwd,
        })
        .expect('stdout', /start/)
        .expect('stdout', /stop/)
        .expect('stdout', /dev/)
        .expect('stdout', /build/)
        .expect('code', 0)
        .end(done);
    });
  });

  // describe('start, stop commands', () => {
  //   it('should start production mode', (done) => {
  //     coffee.fork(beidouBin, ['start'], {
  //       cwd
  //     })
  //       .expect('stdout', /app started/)
  //       .expect('code', 0)
  //       .end(done);
  //   });

  //   it('should stop beidou process', (done) => {
  //     coffee.fork(beidouBin, ['stop'], {
  //       cwd
  //     })
  //     .expect('stdout', /app stopped/)
  //     .expect('code', 0)
  //     .end(done);
  //   });
  // });

  describe('beidou-build command', () => {
    const env = Object.create(process.env);

    env.NODE_ENV = 'local';

    function copyBuildFile(targetName) {
      const srcPath = path.join(__dirname, 'fixtures/beidou-build');
      const dstDir = path.join(cwd, 'node_modules/.bin');
      const dstPath = path.join(dstDir, targetName);
      mkdirp.sync(dstDir);
      fs.copyFileSync(srcPath, dstPath);
      fs.chmodSync(dstPath, '755');
    }

    it('should run beidou-build script', (done) => {
      copyBuildFile('beidou-build');
      coffee
        .fork(beidouBin, ['build'], {
          cwd,
          env,
        })
        .expect('stdout', /Build finished/)
        .end(done);
    });

    it('should run webpack-build script with target node', (done) => {
      copyBuildFile('webpack-build');
      coffee
        .fork(beidouBin, ['build', '--target=node'], {
          cwd,
          env,
        })
        .expect('stdout', /Build finished/)
        .end(done);
    });

    it('should throw error', (done) => {
      rimraf.sync(path.join(cwd, 'node_modules/.bin'));
      coffee
        .fork(beidouBin, ['build'], {
          cwd,
          env,
        })
        .expect('stderr', /no build bin file found in:/)
        .end(done);
    });
  });
});
