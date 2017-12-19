import createSagaMiddleware from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'client/utils/request';
import queryString from 'query-string';
import actions from '../actions';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

function* login({ payload: { username, password } }) {
  yield put(actions.loading());
  const res = yield axios.post('login', {
    username,
    password,
  });
  if (res.statusText === 'OK' && res.data.success) {
    yield put(actions.logined());
    setTimeout(() => {
      window.location.href = queryString.parse(window.location.search).r;
    }, 1000);
  } else {
    yield put(actions.rejected(res.data.message || 'Error password or username'));
  }
}

function* saga() {
  yield takeLatest(actions.login, login);
}

// entry point
export const run = () => {
  sagaMiddleware.run(saga);
};

export default {
  saga,
  sagaMiddleware,
  run,
};
