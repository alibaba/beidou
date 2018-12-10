'use strict';

/**
 * config.react = {
 *   extname: 'jsx',
 *   beautify: false,
 *   cache: true,
 *   internals: false,
 *   doctype: '<!DOCTYPE html>',
 * };
 */
const assert = require('assert');
const should = require('should');
const request = require('supertest');
const mm = require('egg-mock');
const path = require('path');
const fs = require('fs');

const framework = path.join(__dirname, '../../beidou-core/');
const customDoctype =
  '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
const stdDoctype = '<!DOCTYPE html>';
const sourceHTML =
  '<html><head><title>test</title></head><body><div id="container"><div><div>hello world</div></div></div><script>window.__INITIAL_STATE__={"name":"hello world"}</script></body></html>';
const changedHTML =
  '<html><head><title>test</title></head><body><div id="container"><div><div>hello world</div></div></div><script>window.__INITIAL_STATE__={"name":"hello world"}</script></body></html>';

const changedTpl = `
  'use strict';
  const React = require('react');
  const ReactRedux = require('react-redux');
  const Container = require('../../../client/container');
  const Layout = require('../layout');

  module.exports = (props) => {
    const Provider = ReactRedux.Provider;
    const newProps = Object.assign({}, props);
    newProps.title = 'test';
    return (
        <Layout {...newProps}>
            <Provider store={ props.store }>
              <Container />
            </Provider>
        </Layout>
    );
  }
`;

describe('test/react.test.js', () => {
  describe('view render cache', () => {
    let app;
    let cacheApp;
    const demoViewPath = path.join(
      __dirname,
      './fixtures/nocache/app/views/home'
    );
    const cacheViewPath = path.join(
      __dirname,
      './fixtures/cache/app/views/home'
    );
    const demoTmpFile = path.join(demoViewPath, 'index.jsx');
    const cacheTmpFile = path.join(cacheViewPath, 'index.jsx');

    const cpFile = () => {
      fs.writeFileSync(
        demoTmpFile,
        fs.readFileSync(path.join(demoViewPath, 'index.default.jsx'))
      );
      fs.writeFileSync(
        cacheTmpFile,
        fs.readFileSync(path.join(cacheViewPath, 'index.default.jsx'))
      );
    };

    const delFiles = () => {
      fs.unlinkSync(demoTmpFile);
      fs.unlinkSync(cacheTmpFile);
    };

    before(async () => {
      app = mm.app({
        baseDir: './nocache',
        framework,
      });
      cacheApp = mm.app({
        baseDir: './cache',
        framework,
      });

      cpFile();
      await Promise.all([app.ready(), cacheApp.ready()]);
    });

    after(() => {
      app.close();
      cacheApp.close();
      delFiles();
    });

    afterEach(mm.restore);

    it('should return home page tpl with hello world', (done) => {
      request(app.callback())
        .get('/')
        .expect(stdDoctype + sourceHTML)
        .expect(200, done);
    });

    it('should throw error when view tpl not found', (done) => {
      request(app.callback())
        .get('/notfound')
        .expect(/no such file or directory/)
        .expect(404, done);
    });

    it('should return right DOCTYPE with different config', (done) => {
      mm(app.config.react, 'doctype', customDoctype);
      request(app.callback())
        .get('/')
        .expect(customDoctype + sourceHTML)
        .expect(200, done);
    });

    it('should return with static', (done) => {
      mm(app.config.react, 'static', false);
      request(app.callback())
        .get('/')
        .expect(/data-reactroot/)
        .expect(200, done);
    });

    it('should return right tpl when extname config changed', (done) => {
      mm(app.config.view, 'defaultExtension', '.js');
      request(app.callback())
        .get('/jstpl')
        .expect(stdDoctype + sourceHTML)
        .expect(200, done);
    });

    it('should return right tpl when render client component', (done) => {
      mm(app.config.react, 'extname', 'js');
      request(app.callback())
        .get('/client')
        .expect(stdDoctype + sourceHTML)
        .expect(200, done);
    });

    // it('should return beautify html when set beautify to true', (done) => {
    //   mm(app.config.react, 'beautify', true);
    //   request(app.callback())
    //     .get('/')
    //     .expect(stdDoctype + beautifyHTML)
    //     .expect(200, done);
    // });

    it('should return not implemented when call renderString()', (done) => {
      request(app.callback())
        .get('/notimplemented')
        .expect(/not implemented yet/)
        .expect(200, done);
    });

    it('should return changedTpl when tpl changed', (done) => {
      mm(app.config.react, 'cache', false);
      mm(app.config.view, 'cache', false);
      request(app.callback())
        .get('/')
        .expect(stdDoctype + sourceHTML)
        .expect(200)
        .end((err) => {
          should.not.exist(err);
          fs.writeFile(demoTmpFile, changedTpl, (err2) => {
            should.not.exist(err2);
            setTimeout(() => {
              request(app.callback())
                .get('/')
                .expect(stdDoctype + changedHTML)
                .expect(200, done);
            }, 500);
          });
        });
    });

    it('should return unchangedTpl when tpl changed but cache is open', (done) => {
      request(cacheApp.callback())
        .get('/')
        .expect(stdDoctype + sourceHTML)
        .expect(200)
        .end((err) => {
          should.not.exist(err);
          fs.writeFile(cacheTmpFile, changedTpl, (err2) => {
            should.not.exist(err2);
            setTimeout(() => {
              request(cacheApp.callback())
                .get('/')
                .expect(stdDoctype + sourceHTML)
                .expect(200, done);
            }, 500);
          });
        });
    });

    it('should return correct host', (done) => {
      mm(app.config.react, 'assetHost', 'static.example.com');
      request(app.callback())
        .get('/cdn')
        .expect(/static\.example\.com\/build\/main\.js/)
        .expect(200, done);
    });

    it('should return correct resourcePath when host is not set', (done) => {
      mm(app.config.react, 'host', '');
      request(app.callback())
        .get('/cdn')
        .expect(/\/main\.js/)
        .expect(200, done);
    });

    it('should get resource path without domain name', (done) => {
      mm(app.config.react, 'assetHost', '');
      request(app.callback())
        .get('/local-resource')
        .expect(/<body>\/build\/main\.js<\/body>/)
        .expect(200, done);
    });
  });

  describe('view render middlewares', () => {
    let app;

    before(async () => {
      app = mm.app({
        baseDir: './partial',
        framework,
      });

      await app.ready();
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should return view content with partial render', (done) => {
      request(app.callback())
        .get('/')
        .expect(/hello/)
        .expect(200, done);
    });

    it('should return view content with partial render in array', (done) => {
      request(app.callback())
        .get('/array')
        .expect(/hello/)
        .expect(200, done);
    });

    it('should return store content when `getStore()` method provided', (done) => {
      request(app.callback())
        .get('/redux')
        .expect(/title/)
        .expect(200, done);
    });

    it('should return asset url generated by `helper.asset()`', (done) => {
      request(app.callback())
        .get('/helper')
        .expect(/\/\/test\.cdn\.com\/version\/unit.css/)
        .expect(200, done);
    });
  });

  describe('stream render', () => {
    let app;

    before(async () => {
      app = mm.app({
        baseDir: './stream',
        framework,
      });

      await app.ready();
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should ok in normal mode', (done) => {
      request(app.callback())
        .get('/')
        .expect(/hello/)
        .expect(200, done);
    });

    it('should ok in stream mode', (done) => {
      request(app.callback())
        .get('/?stream=1')
        .expect(/hello/)
        .expect(200, done);
    });

    it('should return empty container when `disable=true`', (done) => {
      request(app.callback())
        .get('/?disable=1')
        .expect(/<div><\/div>/)
        .expect(200, done);
    });
  });
});
