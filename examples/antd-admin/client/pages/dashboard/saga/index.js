import createSagaMiddleware from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'client/utils/request';
import actions from '../actions';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

function* fetchDashboard() {
  const res = yield axios.get('dashboard');
  if (res.statusText === 'OK') {
    yield put(actions.dashboard.fetchSuccess(res.data));
  } else {
    yield put(actions.dashboard.fetchFailed(res.statusText || 'Request Error'));
  }
}

function* saga() {
  yield takeLatest(actions.dashboard.fetch, fetchDashboard);
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
