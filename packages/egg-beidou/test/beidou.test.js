'use strict';
const path = require('path');
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

  describe('request success ' , ()=>{
    it('simple should status 200', () => {
      return app.httpRequest(app.callback())
        .get('/')
        .expect(200);
    });

    it('redux should status 200', () => {
      return app.httpRequest(app.callback())
        .get('/redux')
        .expect(200);
    });

    it('spa should status 200', () => {
      return app.httpRequest(app.callback())
        .get('/spa')
        .expect(200);
    });
  })
  
});
