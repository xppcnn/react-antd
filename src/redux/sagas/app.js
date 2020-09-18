import {
  put, call, take, fork, takeLatest,
} from 'redux-saga/effects';
import { UPDATE_STATE, SET_USER_INFO, HANDLE_FAILED, GET_CURRENT_USER } from '../actions/app';
import UserService from '@services/user';

// 或者使用ES6 import


function* getCurrentUser() {
  try {
    // 打开loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    // 发送登录请求
    const response = yield call(UserService.getCurrentUser);
    yield put({type: SET_USER_INFO, payload: response.data })
    return response;
  } catch (error) {
    console.error('获取登录信息失败', error);
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: HANDLE_FAILED, payload: error });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUser);
}

export const appSagas = [
  fork(watchGetCurrentUser),
];