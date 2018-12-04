'use strict';
import * as path from 'path';

export default () => {
  return {
    keys: 'secret',
    react: {
      assetPath: '/build',
    },

    view: {
      defaultExtension: '.tsx',
    },
    router: {
      entry: 'page',
      exts: ['.tsx'],
    },
    webpack: {
      // your webpack config file
      custom: {
        configPath: path.resolve(__dirname, './webpack.config.ts'),
      },
      devServer: {
        publicPath: '/build/',
      },
      resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
          client: path.join(__dirname, '../client'),
        },
      },
    },
  };
};
