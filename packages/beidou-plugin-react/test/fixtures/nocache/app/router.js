'use strict';

module.exports = app => {
  app.get('/', app.controller.home.jsxtpl);
  app.get('/jstpl', app.controller.home.jstpl);
  app.get('/notfound', app.controller.home.notFound);
  app.get('/notimplemented', app.controller.home.notImplemented);
  app.get('/client', app.controller.home.client);
  app.get('/cdn', app.controller.home.cdn);
  app.get('/cdn-supply', app.controller.home.cdnSupply);
  app.get('/app-helper', app.controller.home.appHelper);
  app.get('/combo', app.controller.home.combo);
  app.get('/combo-supply', app.controller.home.comboSupply);
  app.get('/local-resource', app.controller.home.localResource);
};
