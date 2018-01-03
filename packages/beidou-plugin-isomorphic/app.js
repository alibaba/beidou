'use strict';

const basicPolyfill = require('./lib/polyfill').basicPolyfill;
const isomorphic = require('./lib/isomorphic');

/**
 * inject env variables into global
 * used to seperate server side code from client side
 * @param {*} ENV dev/production
 */
function setGlobal(ENV) {
  global.__ENV__ = ENV;
  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DEVELOPMENT__ = ENV !== 'production';
  global.__DEV__ = ENV === 'local';
}

module.exports = (app) => {
  const config = app.config.isomorphic;
  // set global variables
  setGlobal(app.config.env || /* istanbul ignore next */ app.loader.serverEnv);

  // jsdom polyfill, enabled by default
  config.polyfill && basicPolyfill();
  // babel-register
  const babel = config.babel;

  babel && require('babel-register')(babel);

  // isomorphic register
  isomorphic(app);
};
