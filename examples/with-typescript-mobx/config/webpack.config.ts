'use strict';

export default (app, defaultConfig, dev) => {
  // * customize your webpack config;
  //
  // * check your current config at `/run/webpack.local.json`
  // once after server started.

  // config easier with WebpackFacotry
  const factory = app.webpackFactory;

  const DefinePlugin = factory.getPlugin('DefinePlugin');
  DefinePlugin.options = {
    '__ENV__': JSON.stringify(dev ? 'local' : 'prod'),
    '__CLIENT__': true,
    '__SERVER__': false,
    '__DEVELOPMENT__': false,
    '__DEVTOOLS__': false,
    'process.env': {
      NODE_ENV: JSON.stringify(dev ? 'development' : 'production'),
    },
  };

  defaultConfig = factory.getConfig();

  defaultConfig.externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@alifd/next': 'Next',
  };

  defaultConfig.devtool = 'source-map';

  return defaultConfig;
};
