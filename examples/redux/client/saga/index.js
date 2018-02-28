import createSagaMiddleware from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

function* greet() {
  yield put(actions.success('everyone'));
}

function* mySaga() {
  yield takeLatest(actions.greet, greet);
}

export default mySaga;

// entry point
export const run = () => {
  sagaMiddleware.run(mySaga);
};
