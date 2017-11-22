'use strict'; // eslint-disable-line

module.exports = (app) => {
  app.get('/', 'index.origin');
  app.get('/min', 'index.origin');
};
