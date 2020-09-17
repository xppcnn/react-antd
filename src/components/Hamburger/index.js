import React, { memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less';


function Hamburger({ isActive, onTrigger }) {
  return (
    <div className="layout__nav-bar__hamburger" onClick={onTrigger}>
      {isActive ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
}

export default memo(Hamburger);