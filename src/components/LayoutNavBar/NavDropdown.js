import React, { memo } from 'react';
import { Dropdown } from 'antd';
function NavDropDown(props) {
  return <Dropdown {...props}>{props.children}</Dropdown>;
}

export default memo(NavDropDown);
