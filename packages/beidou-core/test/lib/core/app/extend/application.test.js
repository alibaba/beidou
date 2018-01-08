'use strict';

const mm = require('egg-mock');
const should = require('should');
const request = require('supertest');
const utils = require('../../../../utils');


describe('test/lib/core/app/extend/application.test.js', function() {

  describe('app.config.env', () => {

    let app;
    before(done => {
      mm.restore();
      mm.consoleLevel('NONE');
      app = utils.createApp('apps/extend-application');
      return app.ready(done);
    });

    after(function() {
      app.close();
    });

    afterEach(() => {
      mm.restore();
    });

    it('should alias app.config.env => app.loader.serverEnv', (done) => {
      should.equal(app.config.env, app.loader.serverEnv);
      done();
    });

    it('should get current serverEnv: unittest', function(done) {
      should.equal(app.config.env, 'unittest');
      done();
    });
  });

});
