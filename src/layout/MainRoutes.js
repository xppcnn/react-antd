import React, { useMemo, memo } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import Auth from './Auth';
import { businessRouteList, getPageTitle } from '../router/utils';
import AsyncRoutes from './AsyncRoutes';

function renderRoute(route) {
  const title = getPageTitle(businessRouteList);
  
  const { component: Component } = route;

  return (
    <Route
      key={route.path}
      exact={route.path !== '*'}
      path={route.path}
      render={props => (
        <Auth {...props} route={route}>
          <Component {...props} />
        </Auth>
      )}
    ></Route>
  );
}

function renderRouteList() {
  const result = [];

  businessRouteList.forEach((child) => {
    result.push(renderRoute(child));
  });

  return result;
}

function MainRoutes() {
  const routeList = useMemo(() => renderRouteList(), []);

  return <AsyncRoutes>{routeList}</AsyncRoutes>;
}

export default memo(MainRoutes);