// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportDate from '../../../app/service/date';

declare module 'beidou' {
  interface IService {
    date: ExportDate;
  }
}
