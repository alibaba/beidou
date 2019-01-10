const path = require('path');
const fs = require('fs');
const debug = require('debug')('beidou:isomorphic:register');

module.exports = (options) => {
  debug(options);

  // babel-register
  const { baseDir } = options;

  // read package.json babel options
  const pkgJson = require(path.join(baseDir, 'package.json'));
  const { config = {} } = pkgJson;
  const enable = config.babel !== false;
  const extensions = ['.js', '.es6', '.es', '.jsx', '.mjs'];
  if (config.typescript) {
    // for basic typescript support
    // make sure egg will load .ts files
    process.env.EGG_TYPESCRIPT = 'true';
    extensions.push('.ts');
    extensions.push('.tsx');
  }

  const defaultConfig = {
    presets: [
      [
        require.resolve('babel-preset-beidou-server'),
        {
          typescript: config.typescript,
        },
      ],
    ],
    ignore: [/node_modules/],
    babelrc: false,
    extensions,
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
