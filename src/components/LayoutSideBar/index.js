import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Menu } from 'antd';
// import Logo from '../SidebarLogo';
// import renderMenu from '../SideMenu';
import './index.less';
// import { getPagePathList } from '../../router/utils';


function LayoutSideBar({ theme, layout, sidebar, routes }) {
  const inlineCollapsed = {};

  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebar.opened;
  }

  const { pathname } = window.location;

  return (
    <aside
      className={classnames(
        'layout__side-bar',
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          'layout__side-bar--close': !sidebar.opened && layout === 'side',
        },
      )}
    >
      {/* <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!sidebar.opened} layout={layout} />
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={layout === 'side' && sidebar.opened ? getPagePathList(pathname) : []}
          mode={layout === 'side' ? 'inline' : 'horizontal'}
          theme={theme}
          {...inlineCollapsed}
        >
          {routes.map((menu) => renderMenu(menu))}
        </Menu>
      </div> */}
      <>jjjjjj</>
    </aside>
  );
}

export default connect(({ settings, app: { sidebar, routes, init } }) => ({
  ...settings,
  sidebar,
  routes,
  init,
}))(LayoutSideBar);
