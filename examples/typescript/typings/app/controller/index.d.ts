// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou-core';
import ExportHome from '../../../app/controller/home';

declare module 'beidou-core' {
  interface IController {
    home: ExportHome;
  }
}
