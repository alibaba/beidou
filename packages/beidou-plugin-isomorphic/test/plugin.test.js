/* global describe: true */
/* global afterEach: true */
/* global before: true */
/* global after: true */
/* global it: true */

'use strict';

const path = require('path');
const request = require('supertest');
const mm = require('egg-mock');

const frameworkPath = path.join(__dirname, '../../beidou-core/');

describe('test/plugin.test.js', () => {
  describe('GET isomorphic resources', () => {
    let app;

    before((done) => {
      mm.consoleLevel('NONE');
      app = mm.cluster({
        coverage: true,
        baseDir: './isomorphic-app/',
        plugin: 'isomorphic',
        framework: frameworkPath
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(() => {
      mm.restore();
    }
    );

    it('should return empty content: {}', (done) => {
      request(app.callback())
        .get('/others')
        .expect('{}')
        .expect(200, done);
    });
  });


  describe('validate global variables', () => {
    let app;

    before((done) => {
      mm.consoleLevel('NONE');
      app = mm.app({
        baseDir: './isomorphic-app/',
        plugin: 'isomorphic',
        framework: frameworkPath
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });


    afterEach(() => {
      mm.restore();
    }
    );

    it('should return global variable __ENV__ equal to app.loader.serverEnv', (done) => {
      request(app.callback())
        .get('/env')
        .expect(app.loader.serverEnv)
        .expect(200, done);
    });

    it('should return global variable __SERVER__ equal to true', (done) => {
      request(app.callback())
        .get('/server')
        .expect('true')
        .expect(200, done);
    });

    it('should return global variable __CLIENT__ equal to false', (done) => {
      request(app.callback())
        .get('/client')
        .expect('false')
        .expect(200, done);
    });

    it('should return global variable __DEV__ equal to false in prod env', (done) => {
      mm.consoleLevel('NONE');
      mm.env('prod');
      request(app.callback())
        .get('/dev')
        .expect('false')
        .expect(200, () => {
          done();
        });
    });

    it('should return global variable __DEV__ equal to true in local env', (done) => {
      mm.consoleLevel('NONE');
      mm.env('local');
      request(app.callback())
        .get('/dev')
        .expect('true')
        .expect(200, () => {
          done();
        });
    });
  });

  // describe('render with fullPolyfill', () => {
  //   let app;
  //   before((done) => {
  //     app = mm.cluster({
  //       baseDir: './isomorphic-app/',
  //       plugin: 'isomorphic',
  //       framework: frameworkPath
  //     });
  //     app.ready(done);
  //   });

  //   after(() => {
  //     app.close();
  //   });
  //   afterEach(mm.restore);
  //   it('should return correct BOM property with fullPolyfill', (done) => {
  //     request(app.callback())
  //       .get('/render-polyfill?a=b&c=d')
  //       .expect(/href: http:\/\/127\.0\.0\.1:\d*\/render-polyfill\?a=b&amp;c=d/)
  //       .expect(/pathname: \/render-polyfill/)
  //       .expect(/search: \?a=b&amp;c=d/) // &amp; 为&，supertest编码了
  //       .expect(200, done);
  //   });


  //   it('should return correct BOM property with not-match-polyfill', (done) => {
  //     request(app.callback())
  //       .get('/render-not-match-polyfill?a=b&c=d')
  //       .expect(/href: http:\/\/127\.0\.0\.1:\d*\/render-not-match-polyfill\?a=b&amp;c=d/)
  //       .expect(/pathname: \/render-not-match-polyfill/)
  //       .expect(/search: \?a=b&amp;c=d/) // &amp; 为&，supertest编码了
  //       .expect(200, done);
  //   });
  // });

  // describe('render with fullPolyfill when get wrong match config', () => {
  //   let app;
  //   before((done) => {
  //     app = mm.cluster({
  //       baseDir: './isomorphic-app/',
  //       plugin: 'isomorphic',
  //       framework: frameworkPath
  //     });
  //     app.ready(done);
  //   });

  //   after(() => {
  //     app.close();
  //   });

  //   afterEach(() => {
  //     mm.restore();
  //   });

  //   it('should return correct BOM property with fullPolyfill', (done) => {
  //     request(app.callback())
  //       .get('/render-polyfill?a=b&c=d')
  //       .expect(/href: http:\/\/127\.0\.0\.1:\d*\/render-polyfill\?a=b&amp;c=d/)
  //       .expect(/pathname: \/render-polyfill/)
  //       .expect(/search: \?a=b&amp;c=d/) // &amp; 为&，supertest编码了
  //       .expect(200, done);
  //   });

  //   it('should return correct BOM property with fullPolyfill', (done) => {
  //     request(app.callback())
  //       .get('/render-not-match-polyfill?a=b&c=d')
  //       .expect(/href: http:\/\/127\.0\.0\.1:\d*\/render-not-match-polyfill\?a=b&amp;c=d/)
  //       .expect(/pathname: \/render-not-match-polyfill/)
  //       .expect(/search: \?a=b&amp;c=d/) // &amp; 为&，supertest编码了
  //       .expect(200, done);
  //   });
  // });

  // describe('render with match polyfill(RegExp)', () => {
  //   let app;
  //   before((done) => {
  //     app = mm.cluster({
  //       baseDir: './isomorphic-app/',
  //       plugin: 'isomorphic',
  //       framework: frameworkPath
  //     });
  //     app.ready(done);
  //   });
  //   after(() => {
  //     app.close();
  //   });

  //   afterEach(() => {
  //     mm.restore();
  //   });

  //   it('should return correct BOM property when matched', (done) => {
  //     request(app.callback())
  //       .get('/render-polyfill?a=b&c=d')
  //       .expect(/href: http:\/\/127\.0\.0\.1:\d*\/render-polyfill\?a=b&amp;c=d/)
  //       .expect(/pathname: \/render-polyfill/)
  //       .expect(/search: \?a=b&amp;c=d/) // &amp; 为&，supertest编码了
  //       .expect(200, done);
  //   });

  //   it('should return correct BOM property when not match', (done) => {
  //     request(app.callback())
  //       .get('/render-not-match-polyfill?a=b&c=d')
  //       .expect(/Not Match/)
  //       .expect(200, done);
  //   });
  // });

  // describe('render with match polyfill(string)', () => {
  //   let app;
  //   before((done) => {
  //     app = mm.cluster({
  //       baseDir: './isomorphic-app/',
  //       plugin: 'isomorphic',
  //       framework: frameworkPath
  //     });
  //     app.ready(done);
  //   });
  //   after(() => {
  //     app.close();
  //   });

  //   afterEach(() => {
  //     mm.restore();
  //   });

  //   it('should return correct BOM property when matched', (done) => {
  //     request(app.callback())
  //       .get('/render-polyfill?a=b&c=d')
  //       .expect(/href:http: \/\/127\.0\.0\.1:\d*\/render-polyfill\?a=b&amp;c=d/)
  //       .expect(/pathname: \/render-polyfill/)
  //       .expect(/search: \?a=b&amp;c=d/) // &amp; 为&，supertest编码了
  //       .expect(200, done);
  //   });

  //   it('should return correct BOM property when not match', (done) => {
  //     request(app.callback())
  //       .get('/render-not-match-polyfill?a=b&c=d')
  //       .expect(/Not Match/)
  //       .expect(200, done);
  //   });
  // });

  // describe('render with parallel request', () => {
  //   let app;
  //   before((done) => {
  //     app = mm.cluster({
  //       baseDir: './isomorphic-app/',
  //       plugin: 'isomorphic',
  //       framework: frameworkPath
  //     });
  //     app.ready(done);
  //   });
  //   after(() => {
  //     app.close();
  //   });

  //   afterEach(() => {
  //     mm.restore();
  //   });

  //   it('should return correct global property when request in parallel', (done) => {
  //     const fast = new Promise((resolve) => {
  //       setTimeout(() => {
  //         request(app.callback())
  //           .get('/fast')
  //           .expect(/\/fast/i)
  //           .expect(200, fulfill(resolve));
  //       }, 200);
  //     });
  //     const slow = new Promise((resolve) => {
  //       request(app.callback())
  //           .get('/slow')
  //           .expect(/\/slow/i)
  //           .expect(200, fulfill(resolve));
  //     });
  //     Promise.all([slow, fast]).then(() => {
  //       done();
  //     });
  //   });
  // });
});
