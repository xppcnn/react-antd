import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Menu } from 'antd';
import Helmet from 'react-helmet';
import Logo from '../SidebarLogo';
import renderMenu from '../SideMenu';
import './index.less';
import { getPagePathList, businessRouteList, getPageTitle } from '../../router/utils';

function LayoutSideBar({ location, theme, layout, sidebar, routes }) {
  const inlineCollapsed = {};

  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebar.opened;
  }
  const title = getPageTitle(businessRouteList);
  const { pathname } = location;
  return (
    <aside
      className={classnames(
        'layout__side-bar',
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          'layout__side-bar--close': !sidebar.opened && layout === 'side',
        }
      )}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!sidebar.opened} layout={layout} />
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={
            layout === 'side' && sidebar.opened ? getPagePathList(pathname) : []
          }
          mode={layout === 'side' ? 'inline' : 'horizontal'}
          theme={theme}
          {...inlineCollapsed}
        >
          {routes.map((menu) => renderMenu(menu))}
        </Menu>
      </div>
    </aside>
  );
}

export default connect(
  ({ router: { location }, settings, app: { sidebar, routes, init } }) => ({
    ...settings,
    location,
    sidebar,
    routes,
    init,
  })
)(LayoutSideBar);
