'use strict';

const basicPolyfill = require('./lib/polyfill').basicPolyfill;
// basic polyfill
basicPolyfill();

function setGlobal(ENV) {
  global.__ENV__ = ENV;
  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DEVELOPMENT__ = ENV !== 'production';
  global.__DEV__ = ENV === 'local';
}


module.exports = (app) => {
  // set global variables
  setGlobal(app.config.env || /* istanbul ignore next */ app.loader.serverEnv);

  // add isomorphic polyfill middleware
  // app.config.coreMiddleware.push('isomorphicPolyfill');
};
