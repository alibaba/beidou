'use strict'; // eslint-disable-line

const autoContrller = require('./auto-controller.js');

module.exports = (app) => {
  app.get('/(.*)', function* () {
    yield autoContrller(this, app);
  });
};
