import createSagaMiddleware, { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

export const sagaMiddleware = createSagaMiddleware();

export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function run() {
  sagaMiddleware.run(rootSaga);
}
