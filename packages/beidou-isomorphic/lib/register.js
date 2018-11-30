const path = require('path');
const fs = require('fs');
const debug = require('debug')('beidou:isomorphic:register');

module.exports = (options) => {
  debug(options);

  // for basic typescript support
  // make sure egg will load .ts files
  process.env.EGG_TYPESCRIPT = 'true';

  // babel-register
  const { baseDir } = options;

  // read package.json babel options
  const pkgJson = require(path.join(baseDir, 'package.json'));
  const config = pkgJson.babel;
  const enable = config !== false;

  const defaultConfig = {
    presets: ['babel-preset-beidou-server'].map(require.resolve),
    babelrc: false,
    extensions: ['.es6', '.es', '.jsx', '.mjs'],
    cache: true,
  };

  const babelrcConfigFile = path.join(baseDir, '.node.babelrc');
  const babelrcJSFile = path.join(baseDir, '.node.babelrc.js');
  let customConfig = null;

  // try to load server-side babelrc file named
  // `.node.babelrc` or `.node.babelrc.js`
  if (fs.existsSync(babelrcConfigFile)) {
    const raw = fs.readFileSync(babelrcConfigFile);
    customConfig = JSON.parse(raw);
  }

  if (fs.existsSync(babelrcJSFile)) {
    customConfig = require(babelrcJSFile);
  }

  if (enable) {
    customConfig = customConfig || {};
    const final = Object.assign({}, defaultConfig, customConfig);
    debug('babel register with config: %j', final);
    require('@babel/register')(final);
  }
};
