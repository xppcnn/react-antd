import React from 'react';
/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes = [
  {
    path: '/account',
    component: React.lazy(() => import('../layout/UserLayout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/account/login',
    children: [
      {
        path: '/account/login',
        component: React.lazy(() => import('../pages/Sys/Login')),
        meta: {
          title: '登录',
        },
      },
      // {
      //   path: '/system/register',
      //   component: React.lazy(() => import('../views/system/register')),
      //   meta: {
      //     title: '注册',
      //   },
      // },
      // {
      //   path: '/system/register-result/:id',
      //   auth: false,
      //   component: React.lazy(() => import('../views/system/registerResult')),
      //   meta: {
      //     title: '注册结果',
      //   },
      // },
      // {
      //   path: '/system/recovery-pwd',
      //   auth: false,
      //   component: React.lazy(() => import('../views/system/recoveryPwd')),
      //   meta: {
      //     title: '重置密码',
      //   },
      // },
    ],
  },
  {
    path: '/',
    component: React.lazy(() => import('../layout/BaseLayout')),
    meta: {
      title: '首页',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: 'dashborad',
        },
        component: React.lazy(() => import('../pages/Sys/Demo')),
      },

      // 以下菜单为系统权限管理
      {
        path: '/auth',
        meta: {
          title: '权限管理',
          icon: 'setting',
        },
        redirect: '/auth/menu',
        children: [
          {
            path: '/auth/menu',
            meta: {
              title: '菜单管理',
              icon: 'menu',
            },
            component: React.lazy(() => import('../pages/Sys/Demo')),
          },
          {
            path: '/auth/role',
            meta: {
              title: '角色管理',
              icon: 'team',
            },
            component: React.lazy(() => import('../pages/Sys/Demo')),
          },
          // {
          //   path: '/auth/user',
          //   meta: {
          //     title: '用户管理',
          //     icon: 'user',
          //   },
          //   component: React.lazy(() => import('../pages/Sys/Demo')),
          // },
        ],
      },

      // 以下的路由改动请小心，涉及权限校验模块
      {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            auth: false,
            component: React.lazy(() => import('../pages/Error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            auth: false,
            component: React.lazy(() => import('../pages/Error/403')),
            meta: {
              title: '暂无权限',
            },
          },
        ],
      },
      {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
      },
    ],
  },
];

export default routes;