'use strict';

import { EggAppInfo} from 'beidou';
import { Configuration } from 'webpack';

export default (app: EggAppInfo, defaultConfig: Configuration ): Configuration => {
  defaultConfig.module.rules.push({
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre'
  })

  return defaultConfig;
};
