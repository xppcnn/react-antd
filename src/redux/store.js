import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import history from '@utils/history';
import { routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();

const routerWare = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerWare));
const store = createStore(reducers, enhancer);

sagaMiddleware.run(sagas);

export default store;
