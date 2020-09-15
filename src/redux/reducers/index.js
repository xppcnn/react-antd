import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux'
import history from '@utils/history'
import user from './login';
import demo from './demo';
import settings from './setting';
import app from './app';

const rootReducer = combineReducers({
  router: connectRouter(history),
  user,
  demo,
  app,
  settings,
})

export default rootReducer