'use strict';

const mm = require('egg-mock');

describe('test/beidou.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/test',
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  describe('static string SRR request  ', () => {
    it('simple should status 200', () => app.httpRequest(app.callback())
      .get('/')
      .expect(200));

    it('redux should status 200', () => app.httpRequest(app.callback())
      .get('/redux')
      .expect(200));

    it('redux page should status 200', () => app.httpRequest(app.callback())
      .get('/redux/page')
      .expect(200));

    it('spa should status 200', () => app.httpRequest(app.callback())
      .get('/spa')
      .expect(200));

    it('ssr should status 200', () => app.httpRequest(app.callback())
      .get('/ssr')
      .expect(200));

    it('filepath not`t exsit, should status 500', () => app.httpRequest(app.callback())
      .get('/miss')
      .expect(500));
  });


  describe('render file and default add suffix  ', () => {
    it('simple should status 200 for file suffix', () => app.httpRequest(app.callback())
      .get('/suffix')
      .expect(200));
    it('simple should status 200 for full filepath suffix', () => app.httpRequest(app.callback())
      .get('/suffixpath')
      .expect(200));

  });

});

describe('test/beidou.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/stream',
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  describe('static stream SRR request  ', () => {
    it('simple should status 200', () => app.httpRequest(app.callback())
      .get('/')
      .expect(200));
  });

  describe('renderString Exception  ', () => {
    it('simple should status 500', () => app.httpRequest(app.callback())
      .get('/miss')
      .expect(500));
  });
});
