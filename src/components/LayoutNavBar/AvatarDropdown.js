import React, { memo, useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import { clearSideBarRoutes } from '@redux/reducers/app';
// import { setUserInfo } from '@redux/reducers/user';
import { removeLocalStore } from '@utils/auth';

function renderManageUser(onMenuClick) {
  return (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
}

function AvatarDropdown(props) {
  const { userInfo } = props;
  const history = useHistory();

  const onMenuClick = useCallback(({ key }) => {
    // console.log(key);
    message.success(key);
    if (key === 'logout') {
      removeLocalStore('TOKEN');
      // props.dispatch({
      //   type: 'SET_USER_LOGOUT',
      //   payload: { token: '', account: '', avatar: '', mobile: '', id: 0, role: 0 }
      // });
      props.clearSideBarRoutes();
      history.replace('/account/login');
    }
  }, []);

  return (
    <NavDropdown overlay={renderManageUser(onMenuClick)} trigger={['hover']}>
      <div className="layout__navbar__account">
        <Avatar
          size="small"
          className="layout__navbar__avatar"
          src={userInfo?.avatar}
          alt="avatar"
        />
        <span className="layout__navbar__username">{userInfo?.username}</span>
      </div>
    </NavDropdown>
  );
}

export default connect(({ app: { userInfo } }) => ({ userInfo }), {
  clearSideBarRoutes,
})(memo(AvatarDropdown));
