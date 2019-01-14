'use strict';

module.exports = app => {
  app.get('home', '/', 'home.index');
  app.get('redux', '/redux', 'redux.index');
  app.get('spa', '/spa', 'spa.index');
};
