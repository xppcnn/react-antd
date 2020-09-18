/**
 * @description  异步调度中心
 * @author xwl
 * @date 2020/09/11
 */
// saga 模块化引入
import { all } from 'redux-saga/effects';
import { demoSagas } from './demo';
import { loginSagas } from './login';
import { appSagas } from './app';


// 单一进入点，一次启动所有 Saga
export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...demoSagas,
    ...appSagas
  ]);
}