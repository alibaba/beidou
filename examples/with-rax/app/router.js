'use strict';

module.exports = (app) => {
  app.get('/test', app.controller.home.index);
};
