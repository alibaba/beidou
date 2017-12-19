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
    SHOW_MODAL: modalType => ({ modalType }),
    HIDE_MODAL: undefined,
    CREATE: data => ({ data }),
  },
});
