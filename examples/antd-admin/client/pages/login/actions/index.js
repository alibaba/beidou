import { createActions } from 'redux-actions';

export default createActions({
  FIELD_CHANGE: fields => ({ fields }),
  LOADING: undefined,
  LOGIN: ({ username, password }) => ({ username, password }),
  LOGINED: undefined,
  REJECTED: message => ({ message }),
});
