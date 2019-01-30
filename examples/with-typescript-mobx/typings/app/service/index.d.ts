// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportUser from '../../../app/service/user';

declare module 'beidou' {
  interface IService {
    user: ExportUser;
  }
}
