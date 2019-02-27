'use strict';

import * as path from 'path';
import { EggAppConfig, PowerPartial, EggAppInfo } from 'beidou';

// 应用本身的配置 Scheme
export interface StaticConfig {
  static: {
    dir: ({ prefix: string, dir: string })[]
  };
}


export default (appInfo: EggAppInfo): any => {
  const config = {} as PowerPartial<EggAppConfig & StaticConfig>;

  config.keys = 'secret';

  config.view = {
    defaultExtension: '.tsx'
  };

  config.router = {
    exts: ['.jsx', '.ts', '.tsx'],
    entry: 'index',
  };

  config.isomorphic = {
    // babel: false,
  };

  config.webpack = {
    // your webpack config file
    custom: {
      // configPath: path.resolve(__dirname, './webpack.config.ts'),
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(__dirname, '../client'),
      },
    },
  }

  config.static = {
    dir: [
      {
        prefix: '/public',
        dir: path.join(appInfo.baseDir, '/app/public'),
      },
      {
        prefix: '/build',
        dir: path.join(appInfo.baseDir, '/build'),
      },
    ],
  }
  return config;
};
