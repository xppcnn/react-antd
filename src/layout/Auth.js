import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import store from '@redux/store';
import { businessRouteList } from '../router/utils';
import { getLocalStore } from '../utils/auth';


function checkAuth(location){
  // redux 中的 routes 同时负责渲染 sidebar
  const { flattenRoutes } = store.getState().app;

  // 判断当前访问路由是否在系统路由中, 不存在直接走最后默认的 404 路由
  const route = businessRouteList.find(child => child.path === location.pathname);
  
  if (!route) {
    return true;
  }

  if (route.redirect) {
    return true;
  }

  if (route.auth === false) {
    return true;
  }

  // 路由存在于系统中，查看该用户是否有此路由权限
  if (!flattenRoutes.find(child => child.path === location.pathname)) {
    return false;
  }

  return true;
}

function Auth(props) {
  // 未登录
  if (!getLocalStore('TOKEN')) {
    return (
      <Redirect
        to='/account/login'
      />
    );
  }

  // 检查授权
  if (!checkAuth(props.location)) {
    return <Redirect to="/error/403" push />;
  }

  if (props.route.redirect) {
    return <Redirect to={props.route.redirect} push />;
  }

  return <>{props.children}</>;
}

export default memo(Auth);
