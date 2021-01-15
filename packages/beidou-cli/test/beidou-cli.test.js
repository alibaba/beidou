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

  function* stopEggProcess(cwd) {
    yield coffee
      .fork(beidouBin, ['stop'], {
        cwd,
      })
      .expect('code', 0)
      .end();
  }

  function* prepareFiles(cwd) {
    if (!fs.existsSync(path.join(cwd, 'package.json'))) {
      fs.copySync(path.join(__dirname, '../../../examples/simple'), cwd);
      rimraf.sync(path.join(cwd, 'node_modules'), { recursive: true });
    }

    if (!fs.existsSync(path.join(cwd, 'node_modules'))) {
      yield install(cwd, yield getRegistry());
    }
  }

  describe('global options', () => {
    const cwd = __dirname;

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
    const cwd = path.join(__dirname, './fixtures/init');
    before(() => {
      rimraf.sync(cwd, { recursive: true });
      mkdirp.sync(cwd);
    });

    after(() => {
      rimraf.sync(cwd, { recursive: true });
    });


    it('should init boilerplate project', (done) => {
      coffee
        .fork(beidouBin, ['init', '--skipInstall'], {
          cwd,
        })
        .write('\n')
        .expect('code', 0)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });

    it('should init boilerplate project in force', (done) => {
      coffee
        .fork(beidouBin, ['init', '--force'], {
          cwd,
        })
        .write('\n')
        .expect('code', 0)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });
  });

  describe('start, stop, dev, debug, test, cov commands', () => {
    let app;

    const TIME = 10;

    const cwd = path.join(__dirname, './fixtures/running');
    before(function* () {
      yield prepareFiles(cwd);
      mkdirp.sync(path.join(cwd, 'test'));
      fs.writeFileSync(path.join(cwd, 'test/example.test.js'), `
        'use strict';

        const assert = require('assert');
        
        describe('example.test.js', () => {
          it('test', () => {
            assert(1 + 1 === 2);
          });
        });
      `);
    });

    after(function* () {
      yield sleep(TIME);
      rimraf.sync(cwd, { recursive: true });
    });

    it('should start production mode', function* () {
      app = coffee.fork(beidouBin, ['start', '--port=8080', '--cluster=1'], {
        cwd,
      });
      app.expect('code', 0);
      yield sleep(TIME);
      assert(app.stderr === '');
      assert(
        app.stdout.match(/beidou-core started on http:\/\/127\.0\.0\.1:8080/)
      );
      yield stopEggProcess(cwd);
    });

    it('should stop beidou process', function* () {
      app = coffee.fork(beidouBin, ['start'], {
        cwd,
      });
      app.expect('code', 0);
      yield sleep(TIME);
      yield coffee
        .fork(beidouBin, ['stop'], {
          cwd,
        })
        .expect('stdout', /got master pid \["\d+\"\]/)
        .expect('stdout', /stopping egg application/)
        .expect('code', 0)
        .end();
    });

    it('should run dev mode', function* () {
      const devApp = coffee
        .fork(beidouBin, ['dev'], {
          cwd,
        });
      devApp.expect('code', 0);
      yield sleep(TIME);
      devApp.expect('stdout', /beidou-core started on http:\/\/127\.0\.0\.1:6001/);
      yield stopEggProcess(cwd);
    });

    it('should run debug mode', function* () {
      const debugApp = coffee
        .fork(beidouBin, ['debug'], {
          cwd,
        });
      debugApp.expect('code', 0);
      yield sleep(TIME);
      debugApp.expect('stdout', /beidou-core started on http:\/\/127\.0\.0\.1:6001/);

      yield stopEggProcess(cwd);
    });

    it('should run test command', () => {
      coffee
        .fork(beidouBin, ['test'], {
          cwd,
        })
        .expect('stdout', /passing/)
        .expect('code', 0)
        .end();
    });

    it('should run cov command', () => {
      coffee
        .fork(beidouBin, ['cov'], {
          cwd,
        })
        .expect('stdout', /passing/)
        .expect('code', 0)
        .end();
    });
  });

  describe('build command', () => {
    const env = Object.create(process.env);

    env.NODE_ENV = 'production';


    const cwd = path.join(__dirname, './fixtures/build');

    before(function* () {
      yield prepareFiles(cwd);
    });

    after(() => {
      rimraf.sync(cwd, { recursive: true });
    });

    it('should run beidou-build script', (done) => {
      coffee
        .fork(beidouBin, ['build'], {
          cwd,
          env,
        })
        .expect('code', 0)
        .expect('stdout', /Build finished/)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });

    it('should run webpack-build script with target node', (done) => {
      coffee
        .fork(beidouBin, ['build', '--target=node'], {
          cwd,
          env,
        })
        .expect('code', 0)
        .expect('stdout', /Build finished/)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });
  });


  describe('should run pack command', () => {
    const webpackPath = path.join(__dirname, '../../beidou-webpack/node_modules/webpack');
    const webpackConfig = path.join(__dirname, './fixtures/configs/webpack.config.js');
    const buildPath = path.join(__dirname, './fixtures/build');
    after(() => {
      rimraf.sync(buildPath, { recursive: true });
    });
    it('should run pack script', (done) => {
      coffee
        .fork(beidouBin, ['pack', `--config=${webpackConfig}`, `--webpack=${webpackPath}`])
        .expect('stdout', /Build finished/)
        .expect('code', 0)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });

    it('pack command exception for custom path', (done) => {
      coffee
        .fork(beidouBin, ['pack', `--webpack=${webpackPath}`])
        .expect('stdout', /Custom webpack path error/)
        .expect('code', 0)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });

    it('pack command exception for webpack dependence', (done) => {
      coffee
        .fork(beidouBin, ['pack'])
        .expect('stdout', /webpack dependence/)
        .expect('code', 0)
        .end((err, ret) => {
          console.error(err);
          console.log(ret);
          done();
        });
    });
  });
});
