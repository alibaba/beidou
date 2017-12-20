import { combineReducers } from 'redux';

import common from './common';
import dashboard from './dashboard';
import user from './user';

export default combineReducers({
  common,
  dashboard,
  user,
});
