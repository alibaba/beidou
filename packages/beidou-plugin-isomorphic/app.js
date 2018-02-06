'use strict';

const basicPolyfill = require('./lib/polyfill').basicPolyfill;
const isomorphic = require('./lib/isomorphic');

/**
 * inject env variables into global
 * used to separate server side code from client side
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
  const { babel } = config;

  if (babel) {
    const finalConfig = {
      ...babel,
      ignore(filename) {
        if (/test/.test(filename) && !/.test.js/.test(filename)) {
          return false;
        }

        // Always ignore beidou code
        if (/beidou-/.test(filename)) {
          return true;
        }

        const oriIgnore = babel.ignore;
        if (oriIgnore instanceof RegExp) {
          return oriIgnore.test(filename);
        } else if (typeof oriIgnore === 'function') {
          return oriIgnore(filename);
        }
        return false;
      },
    };

    require('babel-register')(finalConfig);
  }

  // const babel = config.babel;

  // babel && require('babel-register')(babel);

  // isomorphic register
  isomorphic(app);
};
