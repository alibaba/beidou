'use strict';

module.exports = (app) => {
  app.get('home', '/', 'home.index');
  app.get('redux', '/redux', 'redux.index');
  app.get('redux/page', '/redux/page', 'redux.page');
  app.get('spa', '/spa', 'spa.index');
  app.get('miss', '/miss', 'home.miss');
};
