/* global describe: true */
/* global afterEach: true */
/* global before: true */
/* global after: true */
/* global it: true */

const path = require('path');
// const fs = require('fs');
// const exec = require('child_process').exec;
const request = require('supertest');
const mm = require('egg-mock');
const chai = require('chai');

const expect = chai.expect;
const framework = path.join(__dirname, '../../beidou-core/');
const plugin = 'webpack';

describe('test/plugin.test.js', () => {
  describe('use default webpack config', () => {
    let app;
    before((done) => {
      app = mm.cluster({
        baseDir: './default-webpack-config',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should get output for single file entry', (done) => {
      request(app.callback())
        .get('/build/index.js')
        .expect(200, done);
    });

    it('should get output for directories entry', (done) => {
      request(app.callback())
        .get('/build/foo.js')
        .expect(200, done);
    });

    it('should get 404 when request a non-existent folder', (done) => {
      request(app.callback())
        .get('/build/')
        .expect(404, done);
    });
  });

  describe('use customized webpack config', () => {
    let app;
    before((done) => {
      app = mm.cluster({
        baseDir: './custom-webpack-config',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should get output file by customized config', (done) => {
      request(app.callback())
        .get('/build/main.js')
        .expect(200, done);
    });

    it('should get 404 when request a non-existent folder', (done) => {
      request(app.callback())
        .get('/build/')
        .expect(404, done);
    });
  });

  describe('config publicPath', () => {
    let app;
    before((done) => {
      app = mm.cluster({
        baseDir: './config-publicPath',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    // request to /static avaliable
    it('should get static file by publicPath config', (done) => {
      request(app.callback())
        .get('/static/main.js')
        .expect(200, done);
    });

    // request to /build not avaliable
    it('should get 404 when try to get build file of default webpack config', (done) => {
      request(app.callback())
        .get('/build/main.js')
        .expect(404, done);
    });

    // router work
    it('should router work', (done) => {
      request(app.callback())
        .get('/test')
        .expect('test')
        .expect(200, done);
    });
  });

  describe('config path and enable HMR', () => {
    let app;
    before((done) => {
      app = mm.cluster({
        baseDir: './hot-module-reload',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should get event-stream response', (done) => {
      const server = app.callback();
      const urllib = require('urllib');

      urllib.request(`127.0.0.1:${server.port}/__webpack_hmr`, {
        streaming: true,
      }, (err, data, res) => {
        expect(res.statusCode).to.equal(200);
        const isEventStream = /event-stream/i.test(res.headers['content-type']);
        expect(isEventStream).to.equal(true);
        done();
      });
    });
  });

  // describe('webpack build', () => {
  //   const cwd = path.join(__dirname, './fixtures/webpack-build');
  //   const src = path.join(__dirname, '../bin/build.js');
  //   const bin = path.join(__dirname, './fixtures/webpack-build/build');

  //   before((done) => {
  //     fs.writeFileSync(bin, fs.readFileSync(src));
  //     exec(`chmod +x ${bin}`, () => {
  //       exec(bin, { cwd }, done);
  //     });
  //   });

  //   after(() => {
  //     fs.unlinkSync(bin);
  //   });

  //   afterEach(mm.restore);

  //   it('should exist output files', (done) => {
  //     const exist = fs.existsSync(path.join(__dirname, './fixtures/webpack-build/build/index.js'));
  //     expect(exist).to.equal(true);
  //     done();
  //   });
  // });
});
