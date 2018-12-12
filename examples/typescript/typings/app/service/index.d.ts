// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou-core';
import ExportDate from '../../../app/service/date';

declare module 'beidou-core' {
  interface IService {
    date: ExportDate;
  }
}
