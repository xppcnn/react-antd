import React, { memo } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import userApi from '@services/user';
import TransitionMain from '../components/TransitionMain';
import { setSideBarRoutes } from '@redux/reducers/app';
import { formatterIcon } from '../router/utils'

function formatMenuToRoute(menus){
  const result = [];

  menus.forEach(menu => {
    const route = {
      path: menu.url,
      meta: {
        title: menu.name,
        icon: menu.icon,
      },
    };
    if (menu.children) {
      route.children = formatMenuToRoute(menu.children);
    }
    result.push(route);
  });

  return result;
}

function AsyncRoutes(props) {
  if (!props.init) {
    userApi.getMenu()
      .then(({ data }) => {
        props.setSideBarRoutes(formatterIcon(formatMenuToRoute(data.menu)));
      })
      .catch(() => {});

    return <Spin className="layout__loading" />;
  }

  return <TransitionMain>{props.children}</TransitionMain>;
}

export default connect(({ app }) => ({ init: app.init }), { setSideBarRoutes })(
  memo(AsyncRoutes),
);
