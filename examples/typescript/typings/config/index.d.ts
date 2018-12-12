// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou-core';
import { EggAppConfig } from 'beidou-core';
import ExportConfigDefault from '../../config/config.default';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
declare module 'beidou-core' {
  type NewEggAppConfig = ConfigDefault;
  interface EggAppConfig extends NewEggAppConfig { }
}