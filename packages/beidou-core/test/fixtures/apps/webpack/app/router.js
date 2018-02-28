'use strict';

module.exports = (app) => {
  app.get('/home', app.controller.home.index);
  app.get('/isomorphic', app.controller.home.isomorphic);
};
