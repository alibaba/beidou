'use strict';

const assert = require('assert');
const path = require('path');
const fs = require('fs-extra');
const coffee = require('coffee');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { getRegistry, install } = require('../lib/helper');
const { sleep } = require('./utils');

describe(`test/${path.basename(__filename)}`, () => {
  const beidouBin = require.resolve('../bin/beidou.js');
  const cwd = path.join(__dirname, 'fixtures/test-files');
  const exampleDir = path.join(__dirname, './fixtures/example');

  before(() => {
    rimraf.sync(cwd);
    mkdirp.sync(cwd);
    rimraf.sync(exampleDir);
    mkdirp.sync(exampleDir);
  });

  after(() => {
    rimraf.sync(cwd);
    rimraf.sync(exampleDir);
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
      coffee
        .fork(beidouBin, ['init', '--skipInstall'], {
          cwd,
        })
        .write('\n')
        .expect('code', 0)
        .end(done);
    });

    it('should init boilerplate project in force', (done) => {
      coffee
        .fork(beidouBin, ['init', '--force'], {
          cwd,
        })
        .write('\n')
        .expect('code', 0)
        .end(done);
    });
  });

  describe('start, stop, dev, debug, test, cov commands', () => {
    let app;
   
    const TIME = 10;

    function* stopEggProcess() {
      yield coffee
        .fork(beidouBin, ['stop'], {
          cwd: exampleDir,
        })
        .expect('code', 0)
        .end();
    }

    before(function* () {
      if (!fs.existsSync(path.join(exampleDir, 'package.json'))) {
        fs.copySync(path.join(__dirname, '../../../examples/simple'), exampleDir)
        mkdirp.sync(path.join(exampleDir, 'test'));
        fs.writeFileSync(path.join(exampleDir, 'test/example.test.js'), `
          'use strict';

          const assert = require('assert');
          
          describe('example.test.js', () => {
            it('test', () => {
              assert(1 + 1 === 2);
            });
          });
        `)
        rimraf.sync(path.join(exampleDir, 'node_modules'));
      }

      if (!fs.existsSync(path.join(exampleDir, 'node_modules'))) {
        yield install(exampleDir, yield getRegistry());
      }
      yield stopEggProcess();
    });

    it('should start production mode', function* () {
      app = coffee.fork(beidouBin, ['start', '--port=8080', '--cluster=1'], {
        cwd: exampleDir,
      });
      app.expect('code', 0);
      yield sleep(TIME);
      assert(app.stderr === '');
      assert(
        app.stdout.match(/beidou-core started on http:\/\/127\.0\.0\.1:8080/)
      );
      yield stopEggProcess();
    });

    it('should stop beidou process', function* () {
      app = coffee.fork(beidouBin, ['start'], {
        cwd: exampleDir,
      });
      app.expect('code', 0);
      yield sleep(TIME);
      yield coffee
        .fork(beidouBin, ['stop'], {
          cwd: exampleDir,
        })
        .expect('stdout', /got master pid \["\d+\"\]/)
        .expect('stdout', /stopping egg application/)
        .expect('code', 0)
        .end();
    });

    it('should run dev mode', function* () {
      const devApp = coffee
        .fork(beidouBin, ['dev'], {
          cwd: exampleDir,
        });
      devApp.expect('code', 0);
      yield sleep(TIME);
      devApp.expect('stdout', /beidou-core started on http:\/\/127\.0\.0\.1:6001/)
      yield stopEggProcess();
    });

    it('should run debug mode', function* () {
      const debugApp = coffee
        .fork(beidouBin, ['debug'], {
          cwd: exampleDir,
        });
      debugApp.expect('code', 0);
      yield sleep(TIME);
      debugApp.expect('stdout', /beidou-core started on http:\/\/127\.0\.0\.1:6001/)

      yield stopEggProcess();
    });

    it('should run test command', () => {
      coffee
        .fork(beidouBin, ['test'], {
          cwd: exampleDir,
        })
        .expect('stdout', /passing/)
        .expect('code', 0)
        .end();
    });

    it('should run cov command', () => {
      coffee
        .fork(beidouBin, ['cov'], {
          cwd: exampleDir,
        })
        .expect('stdout', /passing/)
        .expect('code', 0)
        .end();
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
  });
});
