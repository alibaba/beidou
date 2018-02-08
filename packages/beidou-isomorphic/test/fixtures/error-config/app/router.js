'use strict';

module.exports = (app) => {
  app.get('/sass', app.controller.home.sass);
  app.get('/less', app.controller.home.less);
  app.get('/others', app.controller.home.others);

  app.get('/env', app.controller.global.env);
  app.get('/client', app.controller.global.client);
  app.get('/server', app.controller.global.server);
  app.get('/dev', app.controller.global.dev);

  app.get('/render', app.controller.render.index);
  app.get('/render-alias', app.controller.render.alias);
  app.get('/render-polyfill', app.controller.render.polyfill);
  app.get('/render-not-match-polyfill', app.controller.render.polyfillNotMatch);

  app.get('/fast', app.controller.parallel.fast);
  app.get('/slow', app.controller.parallel.slow);
};
