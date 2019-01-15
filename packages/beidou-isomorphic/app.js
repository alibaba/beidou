'use strict';

const { basicPolyfill, setGlobal } = require('./lib/polyfill');
const isomorphic = require('./lib/isomorphic');

module.exports = (app) => {
  const config = app.config.isomorphic;
  // set global variables
  setGlobal(app.config.env || /* istanbul ignore next */ app.loader.serverEnv);

  // jsdom polyfill, enabled by default
  config.polyfill && basicPolyfill();

  // // babel-register
  // const { babel } = config;

  // const babelrcConfigFile = path.join(app.baseDir, '.node.babelrc');
  // const babelrcJSFile = path.join(app.baseDir, '.node.babelrc.js');
  // let customConfig = null;
  // // try to load server-side babelrc file named `.node.babelrc` or `.node.babelrc.js`
  // if (fs.existsSync(babelrcConfigFile)) {
  //   const raw = fs.readFileSync(babelrcConfigFile);
  //   customConfig = JSON.parse(raw);
  // }

  // if (fs.existsSync(babelrcJSFile)) {
  //   customConfig = require(babelrcJSFile);
  // }

  // if (babel) {
  //   let final = babel;
  //   if (customConfig) {
  //     final = Object.assign(babel, customConfig);
  //   }
  //   require('@babel/register')(final);
  // }

  // isomorphic register
  isomorphic(app);
};
