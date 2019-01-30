/**
 * config file for local
 *
 * @extends /config/config.default.js
 */

import { EggAppConfig, PowerPartial } from 'beidou';
// import { join } from 'path';

export default (): any => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.static = {
    maxAge: 0,
    buffer: false,
    dynamic: true,
    // dir: [ join(__dirname, '../build'), join(__dirname, '../test') ],
  };

  config.react = {
    assetHost: null,
    cache: false,
  };

  return config;
};
