'use strict'; // eslint-disable-line

module.exports = (app) => {
  app.get('/', app.controller.origin);
};
