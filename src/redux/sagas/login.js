import {
  race, put, call, take, fork, takeLatest,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  LOGIN, LOGOUT, UPDATE_PASSWORD, LOGIN_SUCCESS,GET_ACCOUNT_INFO
} from '../actions/actiontype';
import { UPDATE_STATE, HANDLE_SUCCESS, HANDLE_FAILED } from '../actions/app';
import UserService from '@services/user';
import { queryURL } from '@utils/index';

// 或者使用ES6 import


function* doLogin({ username, password }) {
  try {
    // 打开loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    // 发送登录请求
    const response = yield call(UserService.login, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error('登录失败', error);
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: HANDLE_FAILED, payload: error });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

function* doLogout() {
  try {
    // We tell Redux we're in the middle of a request
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    // Similar to above, we try to log out by calling the `logout` function in the
    // `auth` module. If we get an error, we send an appropiate action. If we don't,
    // we return the response.
    // logout request
    yield call(UserService.logout);
    // 显示成功信息
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '退出成功' } });
    // 跳转到登录页面
    console.log('跳转到登陆页面');
    // yield call([history, history.push], '/login');
    yield put(push('/account/login'));
    // yield call(history.push, '/login');
  } catch (error) {
    yield put({ type: HANDLE_FAILED, payload: error });
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

/**
 * 修改密码
 * @param action
 * @yield {Function} cb
 */
function* doUpdatePassword(action) {
  try {
    // 显示loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    const { oldPassword, newPassword } = action.payload;
    // 修改密码
    yield call(UserService.updatePassword, {
      oldPassword,
      newPassword,
    });
    // 隐藏模态框
    yield put({ type: UPDATE_STATE, payload: { modalVisible: false } });
    // 显示成功信息
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '修改成功' } });
    // 跳转到登录页面
    yield put(push('/login'));
  } catch (error) {
    console.error('修改失败：', error);
    yield put({ type: HANDLE_FAILED, payload: error });
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

export function* logout() {
  yield takeLatest(LOGOUT, doLogout);
}

export function* login() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    try {
      // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
      const request = yield take(LOGIN);
      const { username, password } = request.payload;
      // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
      // lead to a race condition. This is unlikely, but just in case, we call `race` which
      // returns the "winner", i.e. the one that finished first
      const winner = yield race({
        auth: call(doLogin, { username, password }),
        logout: take(LOGOUT),
      });
      // If `authorize` was the winner...
      if (winner.auth) {
        // ...we send Redux appropiate actions
        yield put({ type: LOGIN_SUCCESS, payload: winner.auth.data }); // User is logged in (authorized)
        yield put({ type: GET_ACCOUNT_INFO, payload: winner.auth.data }); // User is logged in (authorized)
        // yield put({ type: RESET_LOGIN_FORM, }); // Clear form
        // 显示loading 防止跳转过程中频繁提交表单
        yield put({ type: UPDATE_STATE, payload: { loading: true } });
        yield new Promise((resolve) => {
          setTimeout(() => {
            let redirect = queryURL('redirect');
            redirect = ((redirect && redirect.indexOf('/login') === -1) && redirect) || '/home';
            // 跳转
            if (redirect.indexOf('http') !== -1) window.location.href = decodeURIComponent(redirect);
            else {
              window.location.href = redirect;
              // 此法存在bug，httpUtil 不会重新实例化
              // yield put(push(redirect));
            }
            resolve();
          }, 1000);
        });
        // 隐藏loading
        yield put({ type: UPDATE_STATE, payload: { loading: false } });
      }
    } catch (error) {
      console.error('登录失败', error);
      // If we get an error we send Redux the appropiate action and return
      yield put({ type: HANDLE_FAILED, payload: error });
    }
  }
}


export function* updatePassword() {
  yield takeLatest(UPDATE_PASSWORD, doUpdatePassword);
}

export const loginSagas = [
  fork(login),
  fork(logout),
  fork(updatePassword),
];