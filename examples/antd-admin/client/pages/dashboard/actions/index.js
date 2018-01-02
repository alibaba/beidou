import { createActions } from 'redux-actions';

export default createActions({
  COMMON: {
    SIDER_FOLD: undefined,
    TOGGLE_THEME: theme => ({ theme }),
  },
  DASHBOARD: {
    FETCH: undefined,
    FETCH_SUCCESS: dashboard => ({ dashboard }),
    FETCH_FAILED: undefined,
  },
  USER: {
    FETCH_SUCCESS: list => ({ list }),
    SHOW_MODAL: modalType => ({ modalType }),
    HIDE_MODAL: undefined,
    CREATE: data => ({ data }),
    CREATE_SUCCESS: user => ({ user }),
    DELETE: user => ({ user }),
    DELETE_FROM_LIST: user => ({ user }),
    SWITCH_IS_MOTION: undefined,
  },
});
