import React from 'react';
import routes from './config';
import config from '../config';
import * as allIcons from '@ant-design/icons/es';
/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */

export function flattenRoute(routeList, deep, auth) {
  const result = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];

    result.push({
      ...route,
      auth: typeof route.auth !== 'undefined' ? route.auth : auth,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth));
    }
  }
  console.log(result)
  return result;
}

function getLayoutRouteList() {
  return flattenRoute(routes, false, false);
}

function getBusinessRouteList() {
  const routeList = routes.filter(route => route.path === '/');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, true);
  }
  return [];
}

function getSystemRouteList() {
  const routeList = routes.filter(route => route.path === '/account');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, false);
  }
  return [];
}

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 / 路由下的业务路由
 */

export const layoutRouteList = getLayoutRouteList();

export const businessRouteList = getBusinessRouteList();

export const systemRouteList = getSystemRouteList();

function findRoutesByPaths(pathList, routeList) {
  return routeList.filter(
    (child) => pathList.indexOf(child.path) !== -1,
  );
}

export function getPageTitle(routeList) {
  const route = routeList.find(child => child.path === window.location.pathname);

  return route ? route.meta.title : '';
}

export function getPagePathList(pathname) {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
}

/**
 * 只有业务路由会有面包屑
 */
export function getBreadcrumbs() {
  return findRoutesByPaths(getPagePathList(), businessRouteList);
}


// 菜单图标
const toHump = (name) =>
  name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());

export const formatterIcon = (data) => {
  data.forEach(item => {
    if (item.meta.icon) {
      const { icon } = item.meta;
      const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
      const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];

      if (NewIcon) {
        try {
          // eslint-disable-next-line no-param-reassign
          item.meta.icon = React.createElement(NewIcon);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    }

    if (item.routes || item.children) {
      const children = formatterIcon(item.routes || item.children); // Reduce memory usage
      // eslint-disable-next-line no-param-reassign
      item.children = children;
    }
  });
  return data;
};