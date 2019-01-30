/**
 * default config file
 * extended by any other config.{env}.js
 */

import path from 'path';
import { Application, EggAppConfig, PowerPartial } from 'beidou';

export default (appInfo: Application): any => {
  const config = {} as PowerPartial<EggAppConfig>;
  config.keys = '7ca1003bbf002';
  config.webpack = {
    // your webpack config file
    custom: {
      configPath: require.resolve(path.resolve(__dirname, './webpack.config')),
    },
    // resolve: {
    //   extensions: [ '.json', '.js', '.jsx', '.ts', '.tsx' ],
    //   alias: {
    //     client: path.join(appInfo.baseDir, 'client'),
    //   },
    // },
  };

  config.router = {
    root: 'pages',
  };

  config.react = {
    cache: true,
  };

  config.static = {
    prefix: '/build/',
    dir: path.join(__dirname, '../build'),
  };

  config.sequelize = {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
  };

  return config;
};
