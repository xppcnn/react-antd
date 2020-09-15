
import { put, call, fork, take,takeEvery } from 'redux-saga/effects';
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));



function* incrementAsync() {
  // 延迟 1s 在执行 + 1操作
  yield call(delay, 2000);
  yield put({ type: 'INCREMENT' });
}

export function* increment() {
  yield takeEvery('INCREMENTASYNC', incrementAsync)
}

export const demoSagas = [
  fork(increment),
];
  