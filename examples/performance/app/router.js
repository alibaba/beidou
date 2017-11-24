'use strict'; // eslint-disable-line

module.exports = (app) => {
  app.get('/', 'origin.render');
  app.get('/class', 'class.render');
  app.get('/csr', 'partCsr.render');
};
