// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportMain from '../../../app/controller/main';
import ExportApiUser from '../../../app/controller/api/user';

declare module 'beidou' {
  interface IController {
    main: ExportMain;
    api: {
      user: ExportApiUser;
    }
  }
}
