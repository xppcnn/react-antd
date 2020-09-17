import React, { memo } from 'react';
import { Badge } from 'antd';
import { GithubOutlined, BellOutlined } from '@ant-design/icons';



function SwtichIcon({ icon }) {
  if (icon === 'github') {
    return <GithubOutlined />;
  }

  if (icon === 'bell') {
    return <BellOutlined />;
  }

  return null;
}

function NavBarItem({ className, onClick, icon, ...badge }) {
  return (
    <div className={className} onClick={onClick}>
      <Badge {...badge} style={{ boxShadow: 'none' }}>
        <div style={{ padding: '5px', fontSize: '16px' }}>
          <SwtichIcon icon={icon}></SwtichIcon>
        </div>
      </Badge>
    </div>
  );
}

export default memo(NavBarItem);
