// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportContact from '../../../app/service/contact';

declare module 'beidou' {
  interface IService {
    contact: ExportContact;
  }
}
