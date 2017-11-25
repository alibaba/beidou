'use strict'; // eslint-disable-line

module.exports = (app) => {
  app.get('/', 'origin.render');
  app.get('/csr', 'partCsr.render');
  app.get('/cache', 'cache.render');
  app.get('/react16', 'react16.render');
  app.get('/react16Csr', 'react16Csr.render');
};
