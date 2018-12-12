// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import { EggAppConfig } from 'beidou-core';
import ExportConfigDefault from '../../config/config.default';
import ExportConfigProd from '../../config/config.prod';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type ConfigProd = ReturnType<typeof ExportConfigProd>;
type NewEggAppConfig = EggAppConfig & ConfigDefault & ConfigProd;

declare module 'beidou-core' {
  interface Application {
    config: NewEggAppConfig;
  }

  interface Controller {
    config: NewEggAppConfig;
  }

  interface Service {
    config: NewEggAppConfig;
  }
}