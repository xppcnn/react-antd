import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter,  } from 'connected-react-router';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import history from '@/utils/history';
// import { setAxiosBase } from '@utils/handleAxios'
import { layoutRouteList } from './router/utils';
import './App.less';

// 设置axios拦截器
// setAxiosBase()


const App = () => {
  console.dir('systemRouteList',layoutRouteList)
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {layoutRouteList.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                redirect={route.redirect}
              />
            ))}
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
