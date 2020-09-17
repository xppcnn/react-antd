import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux'
// import history from '@utils/history'
import user from './login';
import demo from './demo';
import settings from './setting';
import app from './app';
import notices from './notice';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user,
  demo,
  app,
  settings,
  notices
})

export default rootReducer