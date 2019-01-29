'use strict';

module.exports = (app) => {
  app.get('home', '/', 'home.index');
  app.get('miss', '/miss', 'home.miss');
};
